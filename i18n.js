/* English ⇄ Traditional Chinese switch.
   The page is written in English. In Chinese mode every visible string (text nodes, short
   inline-formatted blocks, tooltips, canvas labels) is looked up in I18N_ZH and replaced.
   Keys are the English text with whitespace collapsed and every number replaced by "#";
   in a value, "#" is filled with the numbers from the live English text in order
   ({0}, {1}… pick them by index instead). Strings that are not in the table stay English. */
(() => {
const ZH = window.I18N_ZH || {};
const NUM = /\d+(?:\.\d+)?/g;
const canon = s => s.replace(/\s+/g, " ").trim().replace(NUM, "#");
const MAP = new Map(Object.keys(ZH).map(k => [canon(k), ZH[k]]));
const PREFIX = Object.entries(window.I18N_ZH_PREFIX || {});      // for labels with a variable tail
const collect = /[?&]i18n-collect\b/.test(location.search) ? (window.__i18nMissing = new Set()) : null;

let lang = "en";
try { if (localStorage.getItem("lang") === "zh") lang = "zh"; } catch(e){}
if (collect) lang = "zh";

function tr(s){
  const k = canon(s);
  if (!/[A-Za-z]/.test(k)) return null;
  const v = MAP.get(k);
  if (v === undefined){
    const p = PREFIX.find(([en]) => k.startsWith(en));
    if (p) return s.replace(p[0], p[1]);
    if (collect) collect.add(k);
    return null;
  }
  const n = s.match(NUM) || [];
  if (/\{\d+\}/.test(v)) return v.replace(/\{(\d+)\}/g, (_, i) => n[+i] ?? "");
  let i = 0;
  return v.replace(/#/g, () => n[i++] ?? "#");
}
const cache = new Map();
function trCached(s){
  if (cache.has(s)) return cache.get(s);
  const t = tr(s);
  if (cache.size > 4000) cache.clear();
  cache.set(s, t);
  return t;
}

/* ---------- DOM ---------- */
const SKIP = /^(SCRIPT|STYLE|TEXTAREA|CANVAS)$/;
const INLINE = /^(B|I|EM|STRONG|SUB|SUP|BR|CODE|SMALL|U)$/;
const ATTRS = ["data-tip", "aria-label", "title", "placeholder"];
const textOrig = new WeakMap();                    // text node → {en, zh}

// a block whose children are only plain formatting tags is translated as one HTML string,
// so the Chinese word order is free
function inlineOnly(el){
  if (!el.firstElementChild) return false;
  for (const d of el.querySelectorAll("*")) if (!INLINE.test(d.tagName) || d.id || d.attributes.length > (d.className ? 1 : 0)) return false;
  return true;
}
function trText(node){
  const s = node.data, o = textOrig.get(node);
  if (o && o.zh === s) return;
  const t = tr(s);
  if (t === null) return;
  const out = s.match(/^\s*/)[0] + t + s.match(/\s*$/)[0];
  textOrig.set(node, {en: s, zh: out});
  node.data = out;
}
function trAttrs(el){
  if (el.hasAttribute("data-i18n-skip")) return;
  for (const a of ATTRS){
    const v = el.getAttribute(a);
    if (!v) continue;
    const o = el.__i18nA && el.__i18nA[a];
    if (o && o.zh === v) continue;
    const t = tr(v);
    if (t === null) continue;
    (el.__i18nA ||= {})[a] = {en: v, zh: t};
    el.setAttribute(a, t);
  }
}
function walk(el){
  if (el.nodeType === 3){ trText(el); return; }
  if (el.nodeType !== 1 || SKIP.test(el.tagName) || el.hasAttribute("data-i18n-skip")) return;
  if (el.attributes.length) trAttrs(el);
  if (el.__i18nZh !== undefined && el.innerHTML === el.__i18nZh) return;
  if (inlineOnly(el)){
    const h = el.innerHTML, t = tr(h);
    if (t !== null){ el.innerHTML = t; el.__i18nEn = h; el.__i18nZh = el.innerHTML; return; }
    if (collect) return;
  }
  for (let c = el.firstChild; c; c = c.nextSibling) walk(c);
}
function restore(el){
  if (el.nodeType === 3){ const o = textOrig.get(el); if (o && o.zh === el.data) el.data = o.en; textOrig.delete(el); return; }
  if (el.nodeType !== 1) return;
  if (el.__i18nA){ for (const a in el.__i18nA){ const o = el.__i18nA[a]; if (el.getAttribute(a) === o.zh) el.setAttribute(a, o.en); } el.__i18nA = null; }
  if (el.__i18nZh !== undefined){
    const same = el.innerHTML === el.__i18nZh;
    if (same) el.innerHTML = el.__i18nEn;
    el.__i18nZh = undefined;
    if (same) return;
  }
  for (let c = el.firstChild; c; c = c.nextSibling) restore(c);
}

const mo = new MutationObserver(recs => {
  if (lang !== "zh") return;
  const todo = new Set();
  for (const r of recs){
    if (r.type === "attributes"){ trAttrs(r.target); continue; }
    let el = r.type === "characterData" ? r.target.parentElement : r.target;
    while (el && INLINE.test(el.tagName) && el.parentElement) el = el.parentElement;
    if (el) todo.add(el);
  }
  for (const el of todo) if (el.isConnected) walk(el);
});

/* ---------- canvas labels ---------- */
const P = CanvasRenderingContext2D.prototype;
["fillText", "strokeText", "measureText"].forEach(m => {
  const orig = P[m];
  P[m] = function(s, ...rest){
    if (lang === "zh" && typeof s === "string"){ const t = trCached(s); if (t !== null) s = t; }
    return orig.call(this, s, ...rest);
  };
});

/* ---------- switch ---------- */
const enTitle = document.title;
function apply(){
  const zh = lang === "zh";
  document.documentElement.lang = zh ? "zh-Hant" : "en";
  document.title = zh ? (tr(enTitle) ?? enTitle) : enTitle;
  const lab = document.getElementById("lang-lab"), btn = document.getElementById("lang");
  if (lab) lab.textContent = zh ? "EN" : "中文";
  if (btn){ btn.setAttribute("aria-label", zh ? "Switch to English" : "切換為中文"); btn.title = zh ? "English" : "中文"; }
  if (zh) walk(document.body); else restore(document.body);
}
function setLang(l){
  lang = l;
  try { localStorage.setItem("lang", l); } catch(e){}
  apply();
}
window.I18N = {tr, get lang(){ return lang; }, setLang};

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("lang");
  if (btn) btn.addEventListener("click", () => setLang(lang === "zh" ? "en" : "zh"));
  apply();
  mo.observe(document.body, {subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ATTRS});
});
})();
