(() => {
  const slides = Array.from(document.querySelectorAll(".slide"))
    .map((slide, domIndex) => ({
      slide,
      domIndex,
      sequence: Number(slide.dataset.sequence || domIndex + 1)
    }))
    .sort((a, b) => (a.sequence - b.sequence) || (a.domIndex - b.domIndex))
    .map((entry) => entry.slide);
  const stage = document.querySelector("[data-deck-stage]");
  const storageVersion = stage?.dataset?.storageVersion || "v1";
  const legacyStorageKey = `shopee-html-slides:${location.pathname}`;
  const storageKey = `shopee-html-slides:${storageVersion}:${location.pathname}`;
  const layoutStorageKey = `${storageKey}:layout`;
  let index = 0;
  let layoutMode = false;
  let selectedLayoutNode = null;
  // Shopee design-token palette — the only colors the embedded editor offers.
  const TOKEN_COLORS = ["#ee4d2d", "#113366", "#0053de", "#26aa99", "#d0011b", "#ffbb00", "#202325", "#757575", "#ffffff"];
  const FONT_SCALE = [8, 9, 10, 11, 12, 13, 14, 16, 18, 20, 24, 28, 32, 40];
  // Support ?slide=N for per-slide headless screenshots and deep links.
  const slideParam = Number(new URLSearchParams(location.search).get("slide"));
  if (Number.isInteger(slideParam) && slideParam >= 1 && slideParam <= slides.length) {
    index = slideParam - 1;
  }

  function editableNodes() {
    return Array.from(document.querySelectorAll("[contenteditable='true'], [contenteditable='plaintext-only']"));
  }

  function layoutNodes() {
    return Array.from(document.querySelectorAll("[data-layout-editable]"));
  }

  function ensureEditableIds() {
    const slideLocalCounters = new Map();

    editableNodes().forEach((node) => {
      const slide = node.closest(".slide");
      const slideSequence = slide?.dataset?.sequence || String(slides.indexOf(slide) + 1 || "0");
      const layoutId = slide?.dataset?.layoutId || slide?.id || "deck";
      const slideKey = `slide-${slideSequence}:${layoutId}`;
      const slot = node.dataset.slot;

      if (slot) {
        node.dataset.editableId = `${slideKey}:${slot}`;
      } else {
        const nextIndex = (slideLocalCounters.get(slideKey) || 0) + 1;
        slideLocalCounters.set(slideKey, nextIndex);
        node.dataset.editableId = `${slideKey}:editable-${nextIndex}`;
      }

      node.setAttribute("spellcheck", "false");
    });
  }

  function ensureLayoutIds() {
    const slideLocalCounters = new Map();

    layoutNodes().forEach((node) => {
      if (!node.dataset.layoutId) {
        const slide = node.closest(".slide");
        const layoutId = slide?.dataset?.layoutId || slide?.id || "deck";
        const nextIndex = (slideLocalCounters.get(layoutId) || 0) + 1;
        slideLocalCounters.set(layoutId, nextIndex);
        node.dataset.layoutId = `${layoutId}:layout-${nextIndex}`;
      }

      node.setAttribute("tabindex", "0");
      node.setAttribute("title", "Layout Mode: drag to move; drag corner to resize; arrow keys nudge");
    });
  }

  function readSavedLayout() {
    try {
      return JSON.parse(localStorage.getItem(layoutStorageKey) || "{}");
    } catch {
      return {};
    }
  }

  function applyLayoutBox(node, box) {
    if (!box) return;
    ["left", "top", "width", "height"].forEach((prop) => {
      if (box[prop]) node.style[prop] = box[prop];
    });
    if (box.left || box.top) node.style.position = "absolute";
    if (box.rotate) {
      node.style.setProperty("--layout-rotate", box.rotate);
      node.style.transform = `rotate(${box.rotate})`;
    }
    if (box.borderColor) node.style.borderColor = box.borderColor;
    if (box.background) node.style.background = box.background;
    if (box.left) node.style.removeProperty("right");
    if (box.top) node.style.removeProperty("bottom");
  }

  function loadLayoutEdits() {
    const saved = readSavedLayout();
    layoutNodes().forEach((node) => {
      applyLayoutBox(node, saved[node.dataset.layoutId]);
    });
  }

  function saveLayoutEdits() {
    const payload = readSavedLayout();
    layoutNodes().forEach((node) => {
      const touched = node.style.left || node.style.top || node.style.width || node.style.height ||
        node.style.getPropertyValue("--layout-rotate") || node.dataset.layoutColorTouched;
      if (!touched) return;
      payload[node.dataset.layoutId] = {
        left: node.style.left || "",
        top: node.style.top || "",
        width: node.style.width || "",
        height: node.style.height || "",
        rotate: node.style.getPropertyValue("--layout-rotate") || "",
        borderColor: node.dataset.layoutColorTouched ? (node.style.borderColor || "") : "",
        background: node.dataset.layoutColorTouched ? (node.style.background || "") : ""
      };
    });
    localStorage.setItem(layoutStorageKey, JSON.stringify(payload));
    const status = document.querySelector("[data-edit-status]");
    if (status && layoutMode) status.textContent = "Layout saved";
  }

  // Rich-text persistence: the floating text toolbar writes formatting as
  // <span style="..."> / <b> via execCommand, so drafts must round-trip markup,
  // not textContent. Persisted HTML goes through a strict whitelist both on
  // save and on load — unknown tags are unwrapped to their text, and only the
  // inline style properties the text toolbar can produce are kept.
  const RICH_TAGS = new Set(["B", "STRONG", "I", "EM", "U", "S", "SUB", "SUP", "BR", "SPAN", "FONT"]);
  const RICH_STYLE_PROPS = ["color", "font-size", "font-weight", "font-style", "text-decoration", "background-color"];
  const DROP_TAGS = new Set(["SCRIPT", "STYLE", "IFRAME", "OBJECT", "EMBED", "LINK", "META", "TEMPLATE"]);

  function sanitizeRichHtml(html) {
    const tpl = document.createElement("template");
    tpl.innerHTML = String(html == null ? "" : html);
    const scrub = (parent) => {
      Array.from(parent.children).forEach((child) => {
        if (DROP_TAGS.has(child.tagName)) {
          child.remove();
          return;
        }
        scrub(child);
        if (!RICH_TAGS.has(child.tagName)) {
          while (child.firstChild) parent.insertBefore(child.firstChild, child);
          child.remove();
          return;
        }
        const kept = RICH_STYLE_PROPS
          .map((prop) => {
            const value = child.style ? child.style.getPropertyValue(prop) : "";
            return value ? `${prop}:${value}` : "";
          })
          .filter(Boolean)
          .join(";");
        Array.from(child.attributes).forEach((attr) => child.removeAttribute(attr.name));
        if (kept) child.setAttribute("style", kept);
      });
    };
    scrub(tpl.content);
    return tpl.innerHTML;
  }

  function loadEdits() {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey) || "{}");
      editableNodes().forEach((node) => {
        if (Object.prototype.hasOwnProperty.call(saved, node.dataset.editableId)) {
          node.innerHTML = sanitizeRichHtml(saved[node.dataset.editableId]);
        }
      });
    } catch {
      // Ignore corrupt local drafts; the static template remains intact.
    }
  }

  function saveEdits() {
    const payload = {};
    editableNodes().forEach((node) => {
      payload[node.dataset.editableId] = sanitizeRichHtml(node.innerHTML);
    });
    localStorage.setItem(storageKey, JSON.stringify(payload));
    const status = document.querySelector("[data-edit-status]");
    if (status) status.textContent = "Saved";
  }

  function buildExportHtml() {
    const clone = document.documentElement.cloneNode(true);
    clone.querySelectorAll(".slide[hidden]").forEach((node) => node.removeAttribute("hidden"));
    clone.querySelectorAll(".slide[aria-hidden]").forEach((node) => node.removeAttribute("aria-hidden"));
    clone.querySelectorAll("[data-deck-toolbar]").forEach((node) => node.remove());
    clone.querySelectorAll("[data-text-toolbar]").forEach((node) => node.remove());
    clone.querySelectorAll("[data-review-runtime]").forEach((node) => node.remove());
    clone.querySelector("#deck-layout-mode-styles")?.remove();
    clone.querySelector("body")?.classList.remove("layout-mode");
    clone.querySelector("body")?.classList.remove("review-mode");
    clone.querySelectorAll("[data-layout-handle]").forEach((node) => node.remove());
    clone.querySelectorAll(".layout-selected").forEach((node) => node.classList.remove("layout-selected"));
    clone.querySelectorAll("[data-layout-editable]").forEach((node) => {
      node.removeAttribute("title");
      if (node.getAttribute("tabindex") === "0") node.removeAttribute("tabindex");
    });
    return `<!doctype html>\n${clone.outerHTML}`;
  }

  function exportHtml() {
    const html = buildExportHtml();
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const safeTitle = (document.title || "shopee-deck").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    link.href = url;
    link.download = `${safeTitle || "shopee-deck"}-edited.html`;
    link.click();
    URL.revokeObjectURL(url);
  }

  let fileHandle = null;

  async function saveToFile() {
    // Chrome/Edge: write back to a local file via the File System Access API.
    // First save asks the user to pick the target file; later saves reuse the handle.
    if (!window.showSaveFilePicker) {
      exportHtml();
      return;
    }
    const status = document.querySelector("[data-edit-status]");
    try {
      if (!fileHandle) {
        const suggested = decodeURIComponent(location.pathname.split("/").pop() || "deck.html");
        fileHandle = await window.showSaveFilePicker({
          suggestedName: suggested,
          types: [{ description: "HTML deck", accept: { "text/html": [".html"] } }]
        });
      }
      const writable = await fileHandle.createWritable();
      await writable.write(buildExportHtml());
      await writable.close();
      if (status) status.textContent = "Saved to file";
    } catch (err) {
      if (err?.name !== "AbortError" && status) status.textContent = "Save failed — use Export HTML";
    }
  }

  function resetEdits() {
    if (!confirm("Clear saved edits for this local HTML file?")) return;
    localStorage.removeItem(storageKey);
    localStorage.removeItem(legacyStorageKey);
    location.reload();
  }

  function resetLayout() {
    if (!confirm("Clear saved layout adjustments for this local HTML file?")) return;
    localStorage.removeItem(layoutStorageKey);
    location.reload();
  }

  function installToolbar() {
    if (document.querySelector("[data-deck-toolbar]")) return;
    const toolbar = document.createElement("div");
    toolbar.dataset.deckToolbar = "true";
    const swatches = TOKEN_COLORS.map((c) =>
      `<button type="button" data-action="layout-color" data-color="${c}" data-layout-color-action title="Recolor selected annotation" style="background:${c}"></button>`
    ).join("");
    toolbar.innerHTML = `
      <button type="button" data-action="prev">Prev</button>
      <button type="button" data-action="next">Next</button>
      <span data-edit-status>Editable</span>
      <button type="button" data-action="layout" aria-pressed="false">Layout</button>
      <button type="button" data-action="rotate-left" data-layout-rotate-action title="Rotate selected layout object counterclockwise">Rotate -</button>
      <button type="button" data-action="rotate-right" data-layout-rotate-action title="Rotate selected layout object clockwise">Rotate +</button>
      ${swatches}
      <button type="button" data-action="save" title="Write changes back to a local file (Chrome/Edge)">Save</button>
      <button type="button" data-action="export">Export HTML</button>
      <button type="button" data-action="reset">Reset edits</button>
      <button type="button" data-action="reset-layout">Reset layout</button>
    `;
    document.body.appendChild(toolbar);
    toolbar.addEventListener("click", (event) => {
      const action = event.target?.dataset?.action;
      if (action === "prev") go(-1);
      if (action === "next") go(1);
      if (action === "layout") setLayoutMode(!layoutMode);
      if (action === "rotate-left") rotateSelected(-5);
      if (action === "rotate-right") rotateSelected(5);
      if (action === "layout-color") recolorSelected(event.target.dataset.color);
      if (action === "save") saveToFile();
      if (action === "export") exportHtml();
      if (action === "reset") resetEdits();
      if (action === "reset-layout") resetLayout();
    });
  }

  function installLayoutStyles() {
    if (document.getElementById("deck-layout-mode-styles")) return;
    const style = document.createElement("style");
    style.id = "deck-layout-mode-styles";
    style.textContent = `
      body.layout-mode [data-layout-editable] {
        cursor: move !important;
        outline: 1.5px dashed rgba(238, 77, 45, .55);
        outline-offset: 2px;
        user-select: none;
        pointer-events: auto !important;
      }
      body.layout-mode [data-layout-editable].layout-selected {
        outline: 2px solid #0053de;
        outline-offset: 3px;
        z-index: 999 !important;
      }
      [data-layout-handle] {
        position: absolute;
        right: -7px;
        bottom: -7px;
        width: 13px;
        height: 13px;
        border-radius: 4px;
        border: 2px solid #ffffff;
        background: #0053de;
        box-shadow: 0 2px 8px rgba(16, 16, 16, .22);
        cursor: nwse-resize;
        display: none;
        z-index: 20;
      }
      body.layout-mode [data-layout-editable].layout-selected > [data-layout-handle] {
        display: block;
      }
      [data-layout-rotate-action] {
        display: none;
      }
      body.layout-mode [data-layout-rotate-action] {
        display: inline-flex;
      }
      [data-layout-color-action] {
        display: none;
        width: 18px;
        height: 18px;
        min-width: 18px;
        padding: 0;
        border-radius: 50%;
        border: 2px solid #ffffff;
        box-shadow: 0 0 0 1px rgba(16, 16, 16, .18);
        cursor: pointer;
      }
      body.layout-mode [data-layout-color-action] {
        display: inline-block;
      }
      [data-action="layout"][aria-pressed="true"] {
        background: #0053de !important;
        color: #ffffff !important;
      }
    `;
    document.head.appendChild(style);
  }

  function setLayoutMode(nextMode) {
    layoutMode = nextMode;
    document.body.classList.toggle("layout-mode", layoutMode);
    const layoutButton = document.querySelector("[data-action='layout']");
    if (layoutButton) layoutButton.setAttribute("aria-pressed", String(layoutMode));
    const status = document.querySelector("[data-edit-status]");
    if (status) status.textContent = layoutMode ? "Layout mode" : "Editable";
    if (!layoutMode) selectLayoutNode(null);
  }

  function selectLayoutNode(node) {
    if (selectedLayoutNode === node) return;
    if (selectedLayoutNode) selectedLayoutNode.classList.remove("layout-selected");
    selectedLayoutNode = node;
    if (selectedLayoutNode) {
      selectedLayoutNode.classList.add("layout-selected");
      ensureResizeHandle(selectedLayoutNode);
    }
  }

  function ensureResizeHandle(node) {
    if (node.dataset.layoutResize === "false") return;
    if (node.querySelector(":scope > [data-layout-handle]")) return;
    const handle = document.createElement("span");
    handle.dataset.layoutHandle = "true";
    handle.contentEditable = "false";
    handle.setAttribute("aria-hidden", "true");
    node.appendChild(handle);
  }

  function px(value) {
    return `${Math.round(value)}px`;
  }

  function getLayoutRotation(node) {
    const inlineValue = node.style.getPropertyValue("--layout-rotate");
    const computedValue = getComputedStyle(node).getPropertyValue("--layout-rotate");
    const raw = inlineValue || computedValue || "0deg";
    const parsed = parseFloat(raw);
    return Number.isFinite(parsed) ? parsed : 0;
  }

  function rotateSelected(delta) {
    if (!layoutMode || !selectedLayoutNode || !selectedLayoutNode.matches("[data-layout-rotatable]")) return;
    const next = Math.round(getLayoutRotation(selectedLayoutNode) + delta);
    selectedLayoutNode.style.setProperty("--layout-rotate", `${next}deg`);
    selectedLayoutNode.style.transform = `rotate(${next}deg)`;
    saveLayoutEdits();
  }

  function recolorSelected(color) {
    if (!layoutMode || !selectedLayoutNode || !color) return;
    const node = selectedLayoutNode;
    const cs = getComputedStyle(node);
    // Outlined shapes get a border recolor; filled badges/labels get a background recolor.
    const hasBorder = parseFloat(cs.borderTopWidth) > 0;
    const hasFill = cs.backgroundColor && cs.backgroundColor !== "rgba(0, 0, 0, 0)" && cs.backgroundColor !== "transparent";
    if (hasBorder) node.style.borderColor = color;
    if (!hasBorder || (hasFill && node.dataset.layoutColorTarget === "background")) node.style.background = color;
    if (node.dataset.layoutColorTarget === "text") node.style.color = color;
    node.dataset.layoutColorTouched = "true";
    saveLayoutEdits();
  }

  function getLayoutParent(node) {
    return node.offsetParent || node.parentElement || document.body;
  }

  function getStageScale(parent) {
    // If the deck is scaled via CSS transform, screen px != layout px.
    const rectWidth = parent.getBoundingClientRect().width;
    const layoutWidth = parent.offsetWidth || rectWidth;
    return layoutWidth ? rectWidth / layoutWidth : 1;
  }

  function convertNodeToInlineBox(node) {
    const parent = getLayoutParent(node);
    const scale = getStageScale(parent) || 1;
    const parentRect = parent.getBoundingClientRect();
    const rect = node.getBoundingClientRect();
    const cs = getComputedStyle(node);
    const w = node.offsetWidth || rect.width / scale;
    const h = node.offsetHeight || rect.height / scale;
    // For rotated/transformed nodes the client rect is the rotated AABB, so
    // anchor by center instead of the AABB corner to avoid position jumps.
    const centerX = (rect.left + rect.width / 2 - parentRect.left) / scale;
    const centerY = (rect.top + rect.height / 2 - parentRect.top) / scale;
    node.style.left = px(centerX - w / 2);
    node.style.top = px(centerY - h / 2);
    node.style.width = px(w);
    node.style.height = px(h);
    if (cs.position !== "absolute" && cs.position !== "fixed") {
      node.style.position = "absolute";
      node.style.margin = "0";
    }
    node.style.removeProperty("right");
    node.style.removeProperty("bottom");
  }

  function moveNode(node, left, top) {
    // Clamp to the slide canvas, not the immediate container: annotations
    // often live in small wrappers and must be free to hang past them.
    const parent = getLayoutParent(node);
    const slide = node.closest(".slide") || parent;
    const scale = getStageScale(parent) || 1;
    const parentRect = parent.getBoundingClientRect();
    const slideRect = slide.getBoundingClientRect();
    const w = node.offsetWidth || 0;
    const h = node.offsetHeight || 0;
    const minLeft = (slideRect.left - parentRect.left) / scale;
    const minTop = (slideRect.top - parentRect.top) / scale;
    const maxLeft = minLeft + slideRect.width / scale - w;
    const maxTop = minTop + slideRect.height / scale - h;
    node.style.left = px(Math.max(minLeft, Math.min(maxLeft, left)));
    node.style.top = px(Math.max(minTop, Math.min(maxTop, top)));
    node.style.removeProperty("right");
    node.style.removeProperty("bottom");
  }

  function resizeNode(node, width, height) {
    const minWidth = Number(node.dataset.layoutMinWidth || 18);
    const minHeight = Number(node.dataset.layoutMinHeight || 18);
    node.style.width = px(Math.max(minWidth, width));
    node.style.height = px(Math.max(minHeight, height));
  }

  // --- Text style toolbar: bold / font size steps / token text colors -------
  function currentSelectionInEditable() {
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0 || sel.isCollapsed) return null;
    const anchor = sel.anchorNode?.nodeType === 1 ? sel.anchorNode : sel.anchorNode?.parentElement;
    if (!anchor || !anchor.closest("[contenteditable='true'], [contenteditable='plaintext-only']")) return null;
    return sel;
  }

  function selectionFontSize(sel) {
    const el = sel.anchorNode?.nodeType === 1 ? sel.anchorNode : sel.anchorNode?.parentElement;
    return el ? parseFloat(getComputedStyle(el).fontSize) : 13;
  }

  function stepFontSize(direction) {
    const sel = currentSelectionInEditable();
    if (!sel) return;
    const current = selectionFontSize(sel);
    let next;
    if (direction > 0) next = FONT_SCALE.find((s) => s > current + 0.4);
    else next = [...FONT_SCALE].reverse().find((s) => s < current - 0.4);
    if (!next) return;
    // execCommand fontSize=7 marks the range, then the marker <font> tags are
    // swapped for span-with-px so the result matches the design-system scale.
    document.execCommand("styleWithCSS", false, false);
    document.execCommand("fontSize", false, "7");
    document.querySelectorAll("font[size='7']").forEach((font) => {
      const span = document.createElement("span");
      span.style.fontSize = `${next}px`;
      while (font.firstChild) span.appendChild(font.firstChild);
      font.replaceWith(span);
    });
    queueTextSave();
  }

  function applyTextCommand(command, value) {
    if (!currentSelectionInEditable()) return;
    document.execCommand("styleWithCSS", false, true);
    document.execCommand(command, false, value);
    queueTextSave();
  }

  function queueTextSave() {
    clearTimeout(document.__shopeeSaveTimer);
    document.__shopeeSaveTimer = setTimeout(saveEdits, 180);
  }

  function installTextToolbar() {
    if (document.querySelector("[data-text-toolbar]")) return;
    const bar = document.createElement("div");
    bar.dataset.textToolbar = "true";
    const swatches = TOKEN_COLORS.map((c) =>
      `<button type="button" data-text-action="color" data-color="${c}" title="Text color" style="background:${c}"></button>`
    ).join("");
    bar.innerHTML = `
      <button type="button" data-text-action="bold" title="Bold"><b>B</b></button>
      <button type="button" data-text-action="smaller" title="Smaller (design scale)">A-</button>
      <button type="button" data-text-action="larger" title="Larger (design scale)">A+</button>
      ${swatches}
    `;
    const style = document.createElement("style");
    style.id = "deck-text-toolbar-styles";
    style.textContent = `
      [data-text-toolbar] {
        position: fixed;
        display: none;
        gap: 4px;
        align-items: center;
        padding: 6px 8px;
        background: #ffffff;
        border: 1px solid #eeeff2;
        border-radius: 10px;
        box-shadow: 0 8px 24px rgba(16, 16, 16, .18);
        z-index: 9999;
        font-family: inherit;
      }
      [data-text-toolbar] button {
        border: 1px solid #eeeff2;
        background: #ffffff;
        border-radius: 6px;
        min-width: 26px;
        height: 24px;
        font-size: 12px;
        cursor: pointer;
      }
      [data-text-toolbar] button[data-text-action="color"] {
        width: 18px;
        min-width: 18px;
        height: 18px;
        padding: 0;
        border-radius: 50%;
        border: 2px solid #ffffff;
        box-shadow: 0 0 0 1px rgba(16, 16, 16, .18);
      }
    `;
    document.head.appendChild(style);
    document.body.appendChild(bar);

    // pointerdown + preventDefault keeps the text selection alive while clicking.
    bar.addEventListener("pointerdown", (event) => event.preventDefault());
    bar.addEventListener("click", (event) => {
      const action = event.target.closest("[data-text-action]")?.dataset.textAction;
      if (action === "bold") applyTextCommand("bold");
      if (action === "smaller") stepFontSize(-1);
      if (action === "larger") stepFontSize(1);
      if (action === "color") applyTextCommand("foreColor", event.target.dataset.color);
    });

    document.addEventListener("selectionchange", () => {
      if (layoutMode) { bar.style.display = "none"; return; }
      const sel = currentSelectionInEditable();
      if (!sel) { bar.style.display = "none"; return; }
      const rect = sel.getRangeAt(0).getBoundingClientRect();
      if (!rect || (rect.width === 0 && rect.height === 0)) { bar.style.display = "none"; return; }
      bar.style.display = "flex";
      const barWidth = bar.offsetWidth || 260;
      bar.style.left = `${Math.max(8, Math.min(window.innerWidth - barWidth - 8, rect.left + rect.width / 2 - barWidth / 2))}px`;
      bar.style.top = `${Math.max(8, rect.top - 40)}px`;
    });
  }

  function installLayoutEditing() {
    installLayoutStyles();

    document.addEventListener("pointerdown", (event) => {
      if (!layoutMode) return;
      // Never hijack clicks on the toolbars, otherwise Rotate / color buttons
      // deselect the node before their click event can fire.
      if (event.target.closest("[data-deck-toolbar], [data-text-toolbar]")) return;

      const handle = event.target.closest("[data-layout-handle]");
      let node = handle
        ? handle.closest("[data-layout-editable]")
        : event.target.closest("[data-layout-editable]");
      let forcedHandle = null;

      // If a page element covers the selected annotation (higher stacking
      // context), browser hit-testing never reaches it. Route pointer events
      // that land inside the selected node's rect to it manually, so covered
      // annotations stay draggable and resizable.
      if (!node && selectedLayoutNode) {
        const r = selectedLayoutNode.getBoundingClientRect();
        const nearCorner = Math.abs(event.clientX - r.right) <= 12 && Math.abs(event.clientY - r.bottom) <= 12;
        const inside = event.clientX >= r.left - 4 && event.clientX <= r.right + 4 &&
          event.clientY >= r.top - 4 && event.clientY <= r.bottom + 4;
        if (nearCorner && selectedLayoutNode.dataset.layoutResize !== "false") {
          node = selectedLayoutNode;
          forcedHandle = selectedLayoutNode.querySelector(":scope > [data-layout-handle]");
        } else if (inside) {
          node = selectedLayoutNode;
        }
      }

      if (!node) {
        selectLayoutNode(null);
        return;
      }

      const activeHandle = handle || forcedHandle;

      event.preventDefault();
      event.stopPropagation();
      selectLayoutNode(node);
      convertNodeToInlineBox(node);

      const scale = getStageScale(getLayoutParent(node)) || 1;
      const startX = event.clientX;
      const startY = event.clientY;
      const startLeft = parseFloat(node.style.left) || 0;
      const startTop = parseFloat(node.style.top) || 0;
      const startWidth = parseFloat(node.style.width) || node.getBoundingClientRect().width / scale;
      const startHeight = parseFloat(node.style.height) || node.getBoundingClientRect().height / scale;

      const onMove = (moveEvent) => {
        moveEvent.preventDefault();
        const dx = (moveEvent.clientX - startX) / scale;
        const dy = (moveEvent.clientY - startY) / scale;

        if (activeHandle) {
          resizeNode(node, startWidth + dx, startHeight + dy);
        } else {
          moveNode(node, startLeft + dx, startTop + dy);
        }
      };

      const onUp = () => {
        document.removeEventListener("pointermove", onMove);
        document.removeEventListener("pointerup", onUp);
        saveLayoutEdits();
      };

      document.addEventListener("pointermove", onMove);
      document.addEventListener("pointerup", onUp, { once: true });
    }, true);
  }

  function fitDenseTables() {
    document.querySelectorAll("[data-auto-fit-table]").forEach((wrapper) => {
      const table = wrapper.querySelector("table");
      if (!table) return;

      const rows = Array.from(table.rows);
      const rowCount = rows.length;
      const colCount = rows.reduce((max, row) => Math.max(max, row.cells.length), 0);
      const density = rowCount * colCount;

      wrapper.dataset.rows = String(rowCount);
      wrapper.dataset.cols = String(colCount);
      wrapper.classList.toggle("is-wide", colCount >= 10);
      wrapper.classList.toggle("is-very-wide", colCount >= 14);
      wrapper.classList.toggle("is-tall", rowCount >= 13);
      wrapper.classList.toggle("is-ultra-dense", colCount >= 16 || rowCount >= 18 || density >= 190);
      wrapper.style.setProperty("--table-scale", "1");
      wrapper.style.setProperty("--table-scale-y", "1");
    });

    document.querySelectorAll("[data-auto-fit-table]").forEach((wrapper) => {
      const table = wrapper.querySelector("table");
      if (!table || wrapper.clientWidth <= 0 || wrapper.clientHeight <= 0) return;

      table.style.height = "auto";
      const naturalWidth = Math.max(table.scrollWidth, table.getBoundingClientRect().width);
      const naturalHeight = Math.max(table.scrollHeight, table.getBoundingClientRect().height);
      table.style.removeProperty("height");

      if (!naturalWidth || !naturalHeight) return;

      const widthScale = (wrapper.clientWidth - 2) / naturalWidth;
      const heightScale = (wrapper.clientHeight - 2) / naturalHeight;
      let scale = Math.min(widthScale, heightScale);

      if (!Number.isFinite(scale) || scale <= 0) scale = 1;

      scale = Math.max(0.78, Math.min(1.42, scale));
      wrapper.style.setProperty("--table-scale", scale.toFixed(3));

      let verticalScale = heightScale;
      if (!Number.isFinite(verticalScale) || verticalScale <= 0) verticalScale = 1;
      verticalScale = Math.max(0.84, Math.min(1.65, verticalScale));
      wrapper.style.setProperty("--table-scale-y", verticalScale.toFixed(3));
    });
  }

  function fillSlideBlocks() {
    document.querySelectorAll("[data-fill-slide-block]").forEach((block) => {
      const slide = block.closest(".slide");
      const footer = slide?.querySelector(".footer");
      if (!slide || !footer) return;

      block.style.removeProperty("--fill-block-height");

      const blockRect = block.getBoundingClientRect();
      const footerRect = footer.getBoundingClientRect();
      const availableHeight = Math.max(160, Math.floor(footerRect.top - blockRect.top - 14));

      block.style.setProperty("--fill-block-height", `${availableHeight}px`);
    });
  }

  function render() {
    slides.forEach((slide, i) => {
      slide.hidden = i !== index;
      slide.setAttribute("aria-hidden", String(i !== index));
    });

    if (stage) {
      stage.dataset.currentSlide = String(index + 1);
      stage.dataset.totalSlides = String(slides.length);
    }

    fillSlideBlocks();
    fitDenseTables();
  }

  function go(delta) {
    if (!slides.length) return;
    index = Math.max(0, Math.min(slides.length - 1, index + delta));
    render();
  }

  document.addEventListener("keydown", (event) => {
    if (layoutMode && selectedLayoutNode && ["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown", "Escape", "[", "]"].includes(event.key)) {
      event.preventDefault();
      if (event.key === "Escape") {
        selectLayoutNode(null);
        return;
      }

      if (event.key === "[" || event.key === "]") {
        const rotateStep = event.shiftKey ? 15 : 5;
        rotateSelected(event.key === "[" ? -rotateStep : rotateStep);
        return;
      }

      convertNodeToInlineBox(selectedLayoutNode);
      const step = event.shiftKey ? 8 : 1;
      const left = parseFloat(selectedLayoutNode.style.left) || 0;
      const top = parseFloat(selectedLayoutNode.style.top) || 0;
      const dx = event.key === "ArrowRight" ? step : event.key === "ArrowLeft" ? -step : 0;
      const dy = event.key === "ArrowDown" ? step : event.key === "ArrowUp" ? -step : 0;
      moveNode(selectedLayoutNode, left + dx, top + dy);
      saveLayoutEdits();
      return;
    }

    if (event.target?.isContentEditable) return;

    if (event.key === "ArrowRight" || event.key === "PageDown" || event.key === " ") {
      event.preventDefault();
      go(1);
    }

    if (event.key === "ArrowLeft" || event.key === "PageUp") {
      event.preventDefault();
      go(-1);
    }
  });

  document.addEventListener("input", (event) => {
    if (!event.target?.isContentEditable) return;
    const status = document.querySelector("[data-edit-status]");
    if (status) status.textContent = "Saving...";
    if (event.target.closest(".slide")) fillSlideBlocks();
    if (event.target.closest("[data-auto-fit-table]") || event.target.closest(".slide")) fitDenseTables();
    clearTimeout(document.__shopeeSaveTimer);
    document.__shopeeSaveTimer = setTimeout(saveEdits, 180);
  });

  document.addEventListener("paste", (event) => {
    if (!event.target?.isContentEditable) return;
    event.preventDefault();
    const text = event.clipboardData?.getData("text/plain") || "";
    document.execCommand("insertText", false, text);
  });

  ensureEditableIds();
  ensureLayoutIds();
  loadEdits();
  loadLayoutEdits();
  installToolbar();
  installLayoutEditing();
  installTextToolbar();
  render();

  window.addEventListener("resize", () => {
    render();
  });

  document.querySelectorAll(".agenda-item[data-target]").forEach((item) => {
    item.addEventListener("click", (e) => {
      if (e.target.isContentEditable) return;
      const target = document.getElementById(item.dataset.target);
      const idx = slides.indexOf(target);
      if (idx !== -1) { index = idx; render(); }
    });
  });
})();
