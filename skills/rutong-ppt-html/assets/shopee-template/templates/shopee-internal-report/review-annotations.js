(() => {
  if (window.__shopeeReviewAnnotationsInstalled) return;
  window.__shopeeReviewAnnotationsInstalled = true;

  const stage = document.querySelector("[data-deck-stage]");
  if (!stage) return;

  const STORAGE_VERSION = stage.dataset.storageVersion || "v1";
  const STORAGE_KEY = `shopee-html-review:${STORAGE_VERSION}:${location.pathname}`;
  const REVIEW_RUNTIME_ATTR = "data-review-runtime";
  let reviewMode = false;
  let comments = readComments();
  let commentModal = null;

  function orderedSlides() {
    return Array.from(document.querySelectorAll(".slide"))
      .map((slide, domIndex) => ({
        slide,
        domIndex,
        sequence: Number(slide.dataset.sequence || domIndex + 1)
      }))
      .sort((a, b) => (a.sequence - b.sequence) || (a.domIndex - b.domIndex))
      .map((entry) => entry.slide);
  }

  function currentSlide() {
    return orderedSlides().find((slide) => !slide.hidden && slide.getAttribute("aria-hidden") !== "true") || orderedSlides()[0] || null;
  }

  function readComments() {
    try {
      const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      if (Array.isArray(raw)) return raw;
      if (Array.isArray(raw.comments)) return raw.comments;
    } catch {
      // Ignore corrupt local review data.
    }
    return [];
  }

  function saveComments() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(comments));
    renderReview();
  }

  function slideMeta(slide) {
    const slides = orderedSlides();
    return {
      slideIndex: slides.indexOf(slide) + 1,
      slideId: slide?.id || "",
      slideSequence: Number(slide?.dataset.sequence || slides.indexOf(slide) + 1),
      layoutId: slide?.dataset.layoutId || ""
    };
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function pointToPct(slide, event) {
    const rect = slide.getBoundingClientRect();
    return {
      x: clamp(((event.clientX - rect.left) / rect.width) * 100, 0, 100),
      y: clamp(((event.clientY - rect.top) / rect.height) * 100, 0, 100)
    };
  }

  function normalizeRect(start, end) {
    const x = Math.min(start.x, end.x);
    const y = Math.min(start.y, end.y);
    const width = Math.abs(start.x - end.x);
    const height = Math.abs(start.y - end.y);
    if (width < 0.8 && height < 0.8) {
      return {
        x: clamp(start.x - 3, 0, 94),
        y: clamp(start.y - 3, 0, 94),
        width: 6,
        height: 6
      };
    }
    return {
      x: clamp(x, 0, 100),
      y: clamp(y, 0, 100),
      width: clamp(width, 1, 100 - x),
      height: clamp(height, 1, 100 - y)
    };
  }

  function describeTarget(target) {
    const element = target?.nodeType === 1 ? target : target?.parentElement;
    if (!element) return null;
    const editable = element.closest("[data-slot], [data-editable-id], [contenteditable='true']");
    const useful = editable || element.closest(".slide") || element;
    const text = (useful.textContent || "").replace(/\s+/g, " ").trim().slice(0, 120);
    return {
      tag: useful.tagName ? useful.tagName.toLowerCase() : "",
      dataSlot: useful.dataset?.slot || "",
      editableId: useful.dataset?.editableId || "",
      className: String(useful.className || "").split(/\s+/).filter(Boolean).slice(0, 4).join(" "),
      text
    };
  }

  function ensureStyles() {
    if (document.getElementById("review-annotations-styles")) return;
    const style = document.createElement("style");
    style.id = "review-annotations-styles";
    style.setAttribute(REVIEW_RUNTIME_ATTR, "true");
    style.textContent = `
      body.review-mode .slide:not([hidden]) {
        cursor: crosshair;
      }
      [data-review-toolbar] {
        width: max-content;
        max-width: min(1120px, calc(100vw - 32px));
        margin: -6px auto 20px;
        display: flex;
        gap: 8px;
        align-items: center;
        padding: 8px 10px;
        border: 1px solid rgba(32, 35, 37, .16);
        border-radius: 999px;
        background: rgba(255, 255, 255, .94);
        box-shadow: 0 10px 30px rgba(32, 35, 37, .12);
        color: #202325;
        font-family: "Roboto", "Noto Sans SC", Arial, sans-serif;
        font-size: 12px;
        font-weight: 800;
      }
      [data-review-toolbar] button {
        border: 0;
        border-radius: 999px;
        padding: 7px 10px;
        color: #fff;
        background: #113366;
        font: inherit;
        cursor: pointer;
      }
      [data-review-toolbar] button[data-review-action="toggle"][aria-pressed="true"] {
        background: #ee4d2d;
      }
      [data-review-toolbar] button[data-review-action="clear"] {
        background: #757575;
      }
      [data-review-status] {
        color: #757575;
        min-width: 136px;
      }
      [data-review-layer] {
        position: absolute;
        inset: 0;
        z-index: 1200;
        pointer-events: none;
      }
      [data-review-mark],
      [data-review-draft] {
        position: absolute;
        border: 2px solid #0053de;
        border-radius: 7px;
        background: rgba(0, 83, 222, .08);
        box-shadow: 0 0 0 9999px rgba(17, 51, 102, .018);
      }
      [data-review-mark] {
        pointer-events: auto;
        cursor: pointer;
      }
      [data-review-mark]:hover {
        border-color: #ee4d2d;
        background: rgba(238, 77, 45, .1);
      }
      [data-review-badge] {
        position: absolute;
        left: -12px;
        top: -12px;
        min-width: 24px;
        height: 24px;
        display: grid;
        place-items: center;
        padding: 0 6px;
        border: 2px solid #ffffff;
        border-radius: 999px;
        background: #ee4d2d;
        color: #ffffff;
        font-size: 11px;
        font-weight: 900;
        line-height: 1;
        box-shadow: 0 4px 12px rgba(16, 16, 16, .2);
      }
      [data-review-draft] {
        border-color: #ee4d2d;
        border-style: dashed;
        background: rgba(238, 77, 45, .08);
      }
      [data-review-modal] {
        position: fixed;
        z-index: 20000;
        width: 300px;
        padding: 10px;
        border: 1px solid rgba(32, 35, 37, .14);
        border-radius: 10px;
        background: #ffffff;
        box-shadow: 0 18px 50px rgba(16, 16, 16, .22);
        font-family: "Roboto", "Noto Sans SC", Arial, sans-serif;
      }
      [data-review-modal] textarea {
        width: 100%;
        min-height: 84px;
        resize: vertical;
        border: 1px solid #eeeff2;
        border-radius: 8px;
        padding: 8px;
        color: #202325;
        font: 13px/1.4 "Roboto", "Noto Sans SC", Arial, sans-serif;
      }
      [data-review-modal-actions] {
        display: flex;
        gap: 8px;
        justify-content: flex-end;
        margin-top: 8px;
      }
      [data-review-modal] button {
        border: 0;
        border-radius: 999px;
        padding: 7px 10px;
        color: #fff;
        background: #113366;
        font-size: 12px;
        font-weight: 800;
        cursor: pointer;
      }
      [data-review-modal] button[data-review-modal-action="delete"],
      [data-review-modal] button[data-review-modal-action="cancel"] {
        background: #757575;
      }
      [data-review-list] {
        width: min(1120px, calc(100vw - 32px));
        margin: -12px auto 24px;
        display: none;
        gap: 8px;
        flex-wrap: wrap;
        font-family: "Roboto", "Noto Sans SC", Arial, sans-serif;
      }
      body.review-mode [data-review-list] {
        display: flex;
      }
      [data-review-list-item] {
        max-width: 360px;
        display: flex;
        gap: 8px;
        align-items: flex-start;
        padding: 8px 10px;
        border: 1px solid #eeeff2;
        border-radius: 9px;
        background: #ffffff;
        box-shadow: 0 6px 18px rgba(32, 35, 37, .08);
        color: #202325;
        font-size: 12px;
        line-height: 1.35;
      }
      [data-review-list-item] b {
        color: #ee4d2d;
      }
    `;
    document.head.appendChild(style);
  }

  function installToolbar() {
    if (document.querySelector("[data-review-toolbar]")) return;
    const toolbar = document.createElement("div");
    toolbar.dataset.reviewToolbar = "true";
    toolbar.setAttribute(REVIEW_RUNTIME_ATTR, "true");
    toolbar.innerHTML = `
      <button type="button" data-review-action="toggle" aria-pressed="false">Review</button>
      <span data-review-status>0 comments</span>
      <button type="button" data-review-action="export">Export comments</button>
      <button type="button" data-review-action="clear">Clear</button>
    `;
    const list = document.createElement("div");
    list.dataset.reviewList = "true";
    list.setAttribute(REVIEW_RUNTIME_ATTR, "true");
    document.body.appendChild(toolbar);
    document.body.appendChild(list);

    toolbar.addEventListener("click", (event) => {
      const action = event.target.closest("[data-review-action]")?.dataset.reviewAction;
      if (action === "toggle") setReviewMode(!reviewMode);
      if (action === "export") exportComments();
      if (action === "clear") clearComments();
    });
  }

  function setReviewMode(next) {
    reviewMode = Boolean(next);
    document.body.classList.toggle("review-mode", reviewMode);
    const toggle = document.querySelector("[data-review-action='toggle']");
    if (toggle) toggle.setAttribute("aria-pressed", String(reviewMode));
    if (!reviewMode) closeModal();
    renderReview();
  }

  function ensureLayer(slide) {
    let layer = slide.querySelector(":scope > [data-review-layer]");
    if (!layer) {
      layer = document.createElement("div");
      layer.dataset.reviewLayer = "true";
      layer.setAttribute(REVIEW_RUNTIME_ATTR, "true");
      layer.contentEditable = "false";
      slide.appendChild(layer);
    }
    return layer;
  }

  function removeLayers() {
    document.querySelectorAll("[data-review-layer]").forEach((node) => node.remove());
  }

  function commentsForSlide(slide) {
    const meta = slideMeta(slide);
    return comments.filter((comment) => comment.slideSequence === meta.slideSequence);
  }

  function positionBox(node, rect) {
    node.style.left = `${rect.x}%`;
    node.style.top = `${rect.y}%`;
    node.style.width = `${rect.width}%`;
    node.style.height = `${rect.height}%`;
  }

  function renderReview() {
    const status = document.querySelector("[data-review-status]");
    if (status) {
      const current = currentSlide();
      const slideCount = current ? commentsForSlide(current).length : 0;
      status.textContent = `${comments.length} comment${comments.length === 1 ? "" : "s"} · ${slideCount} on slide`;
    }

    renderList();
    if (!reviewMode) {
      removeLayers();
      return;
    }

    orderedSlides().forEach((slide) => {
      const layer = ensureLayer(slide);
      layer.innerHTML = "";
      commentsForSlide(slide).forEach((comment) => {
        const mark = document.createElement("button");
        mark.type = "button";
        mark.dataset.reviewMark = comment.id;
        mark.setAttribute(REVIEW_RUNTIME_ATTR, "true");
        mark.title = comment.comment;
        positionBox(mark, comment.rect);
        mark.innerHTML = `<span data-review-badge>${comment.number}</span>`;
        mark.addEventListener("click", (event) => {
          event.preventDefault();
          event.stopPropagation();
          openModal({ slide, rect: comment.rect, existing: comment });
        });
        layer.appendChild(mark);
      });
    });
  }

  function renderList() {
    const list = document.querySelector("[data-review-list]");
    if (!list) return;
    const slide = currentSlide();
    const slideComments = slide ? commentsForSlide(slide) : [];
    list.innerHTML = "";
    slideComments.forEach((comment) => {
      const item = document.createElement("button");
      item.type = "button";
      item.dataset.reviewListItem = comment.id;
      item.setAttribute(REVIEW_RUNTIME_ATTR, "true");
      item.innerHTML = `<b>#${comment.number}</b><span>${escapeHtml(comment.comment)}</span>`;
      item.addEventListener("click", () => openModal({ slide, rect: comment.rect, existing: comment }));
      list.appendChild(item);
    });
  }

  function escapeHtml(value) {
    return String(value || "").replace(/[&<>"']/g, (ch) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    }[ch]));
  }

  function closeModal() {
    commentModal?.remove();
    commentModal = null;
    document.querySelectorAll("[data-review-draft]").forEach((node) => node.remove());
  }

  function openModal({ slide, rect, existing = null, target = null }) {
    closeModal();
    const slideRect = slide.getBoundingClientRect();
    const left = clamp(slideRect.left + (rect.x + rect.width) / 100 * slideRect.width + 12, 12, window.innerWidth - 320);
    const top = clamp(slideRect.top + rect.y / 100 * slideRect.height, 12, window.innerHeight - 170);

    const modal = document.createElement("form");
    modal.dataset.reviewModal = "true";
    modal.setAttribute(REVIEW_RUNTIME_ATTR, "true");
    modal.style.left = `${left}px`;
    modal.style.top = `${top}px`;
    modal.innerHTML = `
      <textarea data-review-comment-input placeholder="Write a comment, e.g. Delete this / Make this number larger">${escapeHtml(existing?.comment || "")}</textarea>
      <div data-review-modal-actions>
        ${existing ? '<button type="button" data-review-modal-action="delete">Delete</button>' : ""}
        <button type="button" data-review-modal-action="cancel">Cancel</button>
        <button type="submit" data-review-modal-action="save">Save</button>
      </div>
    `;
    document.body.appendChild(modal);
    commentModal = modal;
    const input = modal.querySelector("[data-review-comment-input]");
    input.focus();
    input.select();

    modal.addEventListener("submit", (event) => {
      event.preventDefault();
      const text = input.value.trim();
      if (!text) return;
      if (existing) {
        existing.comment = text;
        existing.updatedAt = new Date().toISOString();
      } else {
        const meta = slideMeta(slide);
        comments.push({
          id: `review-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
          number: comments.length + 1,
          comment: text,
          rect,
          target,
          status: "open",
          createdAt: new Date().toISOString(),
          ...meta
        });
      }
      closeModal();
      renumberComments();
      saveComments();
    });

    modal.addEventListener("click", (event) => {
      const action = event.target.closest("[data-review-modal-action]")?.dataset.reviewModalAction;
      if (action === "cancel") closeModal();
      if (action === "delete" && existing) {
        comments = comments.filter((comment) => comment.id !== existing.id);
        closeModal();
        renumberComments();
        saveComments();
      }
    });
  }

  function renumberComments() {
    comments
      .sort((a, b) => (a.slideSequence - b.slideSequence) || String(a.createdAt).localeCompare(String(b.createdAt)))
      .forEach((comment, index) => {
        comment.number = index + 1;
      });
  }

  function startDrawing(event) {
    if (!reviewMode) return;
    if (event.target.closest("[data-review-toolbar], [data-review-modal], [data-review-list], [data-review-mark]")) return;
    const slide = event.target.closest(".slide");
    if (!slide || slide.hidden || slide.getAttribute("aria-hidden") === "true") return;

    event.preventDefault();
    event.stopPropagation();

    const layer = ensureLayer(slide);
    const start = pointToPct(slide, event);
    const target = describeTarget(event.target);
    const draft = document.createElement("div");
    draft.dataset.reviewDraft = "true";
    draft.setAttribute(REVIEW_RUNTIME_ATTR, "true");
    layer.appendChild(draft);

    const move = (moveEvent) => {
      moveEvent.preventDefault();
      const rect = normalizeRect(start, pointToPct(slide, moveEvent));
      positionBox(draft, rect);
    };

    const up = (upEvent) => {
      document.removeEventListener("pointermove", move);
      document.removeEventListener("pointerup", up);
      const rect = normalizeRect(start, pointToPct(slide, upEvent));
      positionBox(draft, rect);
      openModal({ slide, rect, target });
    };

    positionBox(draft, normalizeRect(start, start));
    document.addEventListener("pointermove", move);
    document.addEventListener("pointerup", up, { once: true });
  }

  function exportComments() {
    renumberComments();
    const payload = {
      schema_version: 1,
      kind: "shopee-html-slides-review-comments",
      exported_at: new Date().toISOString(),
      deck: {
        title: document.title || "",
        path: location.pathname,
        storage_version: STORAGE_VERSION,
        total_slides: orderedSlides().length
      },
      comments
    };
    const json = JSON.stringify(payload, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const safeTitle = (document.title || "shopee-deck").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    link.href = url;
    link.download = `${safeTitle || "shopee-deck"}-review-comments.json`;
    link.click();
    URL.revokeObjectURL(url);
    navigator.clipboard?.writeText(json).catch(() => {});
  }

  function clearComments() {
    if (!comments.length) return;
    if (!confirm("Clear all review comments for this local HTML file?")) return;
    comments = [];
    localStorage.removeItem(STORAGE_KEY);
    closeModal();
    renderReview();
  }

  function observeSlideChanges() {
    const observer = new MutationObserver(() => renderReview());
    orderedSlides().forEach((slide) => {
      observer.observe(slide, { attributes: true, attributeFilter: ["hidden", "aria-hidden"] });
    });
  }

  ensureStyles();
  installToolbar();
  document.addEventListener("pointerdown", startDrawing, true);
  observeSlideChanges();
  renumberComments();
  renderReview();
})();
