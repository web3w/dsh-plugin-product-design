window.__ModuleLoader__.load({
	id: "dsh-plugin-product-design",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		var __create = Object.create;
		var __defProp = Object.defineProperty;
		var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
		var __getOwnPropNames = Object.getOwnPropertyNames;
		var __getProtoOf = Object.getPrototypeOf;
		var __hasOwnProp = Object.prototype.hasOwnProperty;
		var __commonJS = (cb, mod) => function __require() {
		  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
		};
		var __export = (target, all) => {
		  for (var name2 in all)
		    __defProp(target, name2, { get: all[name2], enumerable: true });
		};
		var __copyProps = (to, from, except, desc) => {
		  if (from && typeof from === "object" || typeof from === "function") {
		    for (let key of __getOwnPropNames(from))
		      if (!__hasOwnProp.call(to, key) && key !== except)
		        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
		  }
		  return to;
		};
		var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
		  // If the importer is in node compatibility mode or this is not an ESM
		  // file that has been converted to a CommonJS file using a Babel-
		  // compatible transform (i.e. "__esModule" has not been set), then set
		  // "default" to the CommonJS "module.exports" for node compatibility.
		  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
		  mod
		));
		var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
		
		// client/panel.cjs
		var require_panel = __commonJS({
		  "client/panel.cjs"(exports, module2) {
		    "use strict";
		    var React = require("react");
		    var h = React.createElement;
		    var ROOT_PATH = ".";
		    var MAX_DIRECTORIES = 50;
		    var MAX_HTML_FILES = 32;
		    var IGNORE_DIRECTORIES = /* @__PURE__ */ new Set([".git", "node_modules", "dist", "build", ".next", ".vite", "coverage"]);
		    function fileTitle(path) {
		      const basename = String(path).split("/").pop() || path;
		      return basename.replace(/\.(?:html?)$/iu, "").replace(/[-_]+/gu, " ").replace(/\b\w/gu, (char) => char.toUpperCase());
		    }
		    function isHtmlPath(path) {
		      return /\.html?$/iu.test(String(path));
		    }
		    function collectHtmlPaths(listings, limit = MAX_HTML_FILES) {
		      const paths = [];
		      const queue = [ROOT_PATH];
		      const visited = /* @__PURE__ */ new Set();
		      while (queue.length && visited.size < MAX_DIRECTORIES && paths.length < limit) {
		        const directory = queue.shift();
		        if (visited.has(directory)) continue;
		        visited.add(directory);
		        const listing = listings[directory];
		        if (!listing || !Array.isArray(listing.entries)) continue;
		        for (const entry of listing.entries) {
		          if (!entry || typeof entry.name !== "string") continue;
		          const path = directory === ROOT_PATH ? entry.name : `${directory}/${entry.name}`;
		          if (entry.type === "directory" && !IGNORE_DIRECTORIES.has(entry.name) && !entry.name.startsWith(".")) queue.push(path);
		          else if (entry.type === "file" && isHtmlPath(entry.name)) paths.push(path);
		          if (paths.length >= limit) break;
		        }
		      }
		      return [...new Set(paths)].sort((a, b) => {
		        const aName = a.split("/").pop().toLowerCase();
		        const bName = b.split("/").pop().toLowerCase();
		        const priority = (name2) => name2 === "settings.html" ? 0 : name2 === "index.html" ? 1 : 2;
		        return priority(aName) - priority(bName) || a.localeCompare(b);
		      });
		    }
		    function viewportOf(source) {
		      const explicit = /<meta\s+name=["']dsh-design-size["']\s+content=["'](\d+)\s*[x×]\s*(\d+)["']/iu.exec(source);
		      if (explicit) return { width: Math.min(1920, Number(explicit[1])), height: Math.min(1600, Number(explicit[2])) };
		      const viewport = /<meta\s+name=["']viewport["'][^>]*content=["'][^"']*(?:width\s*=\s*device-width|initial-scale)[^"']*["']/iu.test(source);
		      if (viewport) return { width: 390, height: 844 };
		      const minWidth = /min-width\s*:\s*(\d+)\s*px/iu.exec(source);
		      const width = minWidth ? Math.max(960, Math.min(1440, Number(minWidth[1]))) : 1280;
		      return { width, height: width >= 960 ? 820 : 900 };
		    }
		    function cssTokens(source) {
		      const tokens = /* @__PURE__ */ new Map();
		      const pattern = /(--[\w-]+)\s*:\s*([^;{}]+?)\s*(?:;|(?=\}))/gu;
		      let match;
		      while ((match = pattern.exec(String(source))) !== null) {
		        const name2 = match[1].trim();
		        const value = match[2].trim();
		        if (name2.startsWith("--") && value && !tokens.has(name2)) tokens.set(name2, value);
		      }
		      return [...tokens].slice(0, 48).map(([name2, value]) => ({ name: name2, value }));
		    }
		    function escapeHtml(value) {
		      return String(value).replace(/[&<>"']/gu, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
		    }
		    function designSystemHtml(tokens, pages) {
		      const colours = tokens.filter((token) => /#(?:[\da-f]{3,8})\b|\brgb\(|\bhsl\(/iu.test(token.value));
		      const typography = tokens.filter((token) => /font|type|line|radius|space|shadow|weight/iu.test(token.name));
		      const palette = colours.length ? colours : tokens;
		      const chips = palette.slice(0, 14).map((token) => {
		        const swatch = /^(?:#[\da-f]{3,8}|rgb\(|hsl\()/iu.test(token.value) ? `<span class="swatch" style="background:${escapeHtml(token.value)}"></span>` : '<span class="swatch neutral"></span>';
		        return `<div class="token">${swatch}<div><b>${escapeHtml(token.name)}</b><small>${escapeHtml(token.value)}</small></div></div>`;
		      }).join("");
		      const typeRows = (typography.length ? typography : tokens.slice(0, 8)).map((token) => `<div class="type-row"><span>${escapeHtml(token.name)}</span><b style="font-size:${/font-size|type-size/iu.test(token.name) ? escapeHtml(token.value) : "14px"}">${escapeHtml(token.value)}</b></div>`).join("");
		      const pageRows = pages.map((page) => `<li>${escapeHtml(fileTitle(page))}<code>${escapeHtml(page)}</code></li>`).join("");
		      return `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Design system</title><style>
		    *{box-sizing:border-box}body{margin:0;background:#f6f7fa;color:#171b27;font:14px/1.45 Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;padding:30px}header{display:flex;justify-content:space-between;align-items:end;border-bottom:1px solid #dfe3eb;padding-bottom:18px;margin-bottom:24px}h1{margin:3px 0;font-size:28px;letter-spacing:-.04em}h2{font-size:15px;margin:0 0 14px}.eyebrow{font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:#6b7280}.meta{font-size:11px;color:#778093}.grid{display:grid;grid-template-columns:1fr 1fr;gap:22px}.section{background:white;border:1px solid #e3e6ed;border-radius:13px;padding:18px}.tokens{display:grid;grid-template-columns:1fr 1fr;gap:10px}.token{min-width:0;border:1px solid #eef0f4;border-radius:9px;padding:8px;display:flex;gap:8px;align-items:center}.swatch{width:31px;height:31px;border-radius:7px;flex:none;border:1px solid #0001}.swatch.neutral{background:linear-gradient(135deg,#dce4f5,#d7f5e9)}.token b,.token small{display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.token b{font-size:10px}.token small{font-size:10px;color:#747c8b;margin-top:2px}.type-row{display:flex;justify-content:space-between;gap:12px;border-bottom:1px solid #eff1f4;padding:11px 0;font-size:11px;color:#707789}.type-row b{text-align:right;color:#1c2230}.pages{grid-column:1/-1}.pages ul{list-style:none;padding:0;margin:0}.pages li{display:flex;justify-content:space-between;padding:9px 0;border-bottom:1px solid #eff1f4;font-size:12px}.pages code{color:#707789;font-size:10px}@media(max-width:600px){body{padding:18px}.grid{grid-template-columns:1fr}.pages{grid-column:auto}}
		    </style></head><body><header><div><div class="eyebrow">Product design \xB7 live tokens</div><h1>Design system</h1></div><div class="meta">Generated from ${pages.length} workspace page${pages.length === 1 ? "" : "s"}</div></header><main class="grid"><section class="section"><h2>Color & surface</h2><div class="tokens">${chips || '<p class="meta">\u9875\u9762\u5C1A\u65E0 CSS \u81EA\u5B9A\u4E49\u53D8\u91CF</p>'}</div></section><section class="section"><h2>Type & rhythm</h2>${typeRows || '<p class="meta">\u4ECE\u9875\u9762 CSS \u8BFB\u53D6\u7684\u89C4\u8303\u5C06\u5728\u8FD9\u91CC\u663E\u793A</p>'}</section><section class="section pages"><h2>Canvas pages</h2><ul>${pageRows}</ul></section></main></body></html>`;
		    }
		    function addSandboxPolicy(html) {
		      const policy = `<meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src data: blob:; style-src 'unsafe-inline' data:; font-src data:; script-src 'unsafe-inline'; connect-src 'none'; form-action 'none'; object-src 'none'; frame-src 'none'; base-uri 'none'">`;
		      if (/<head\b[^>]*>/iu.test(html)) return html.replace(/<head\b[^>]*>/iu, (match) => `${match}<meta charset="utf-8">${policy}`);
		      return `<!doctype html><html><head><meta charset="utf-8">${policy}</head><body>${html}</body></html>`;
		    }
		    function safeRelativeAsset(value) {
		      const raw = String(value ?? "").trim();
		      if (!raw || /^(?:[a-z][a-z\d+.-]*:|\/\/|\/|#)/iu.test(raw) || raw.includes("..") || raw.includes("\\")) return false;
		      return true;
		    }
		    function bytesToBase64(bytes) {
		      let binary = "";
		      const chunk = 32768;
		      for (let i = 0; i < bytes.length; i += chunk) binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
		      return btoa(binary);
		    }
		    var MIME_BY_EXTENSION = { png: "image/png", jpg: "image/jpeg", jpeg: "image/jpeg", webp: "image/webp", gif: "image/gif", svg: "image/svg+xml", avif: "image/avif", woff: "font/woff", woff2: "font/woff2", ttf: "font/ttf" };
		    async function preparePreviewHtml(source, filePath, readBytes, sessionId, signal) {
		      let html = String(source);
		      const assetReads = /* @__PURE__ */ new Map();
		      const readAsset = async (path) => {
		        if (!safeRelativeAsset(path)) return void 0;
		        const clean = path.split(/[?#]/u)[0];
		        if (!clean) return void 0;
		        if (!assetReads.has(clean)) assetReads.set(clean, Promise.resolve().then(() => readBytes(sessionId, clean, { baseFile: filePath }, signal)));
		        try {
		          return await assetReads.get(clean);
		        } catch {
		          return void 0;
		        }
		      };
		      const linkPattern = /<link\b([^>]*?)>/giu;
		      const links = [...html.matchAll(linkPattern)];
		      for (const match of links) {
		        const attrs = match[1];
		        if (!/\brel\s*=\s*["']?stylesheet\b/iu.test(attrs)) continue;
		        const href = /\bhref\s*=\s*(["'])(.*?)\1/iu.exec(attrs)?.[2];
		        if (!href || !safeRelativeAsset(href)) continue;
		        const asset = await readAsset(href);
		        if (!asset?.data) continue;
		        const css2 = new TextDecoder("utf-8", { fatal: true }).decode(asset.data).replace(/<\/style/giu, "<\\/style");
		        html = html.replace(match[0], `<style data-product-design-asset="${escapeHtml(href)}">${css2}</style>`);
		      }
		      const imagePattern = /(<(?:img|source)\b[^>]*?\bsrc\s*=\s*)(["'])([^"']+)\2/giu;
		      const images = [...html.matchAll(imagePattern)];
		      for (const match of images) {
		        const src = match[3];
		        if (!safeRelativeAsset(src)) continue;
		        const asset = await readAsset(src);
		        if (!asset?.data) continue;
		        const extension = src.split(/[?#]/u)[0].split(".").pop()?.toLowerCase();
		        const mime = MIME_BY_EXTENSION[extension] ?? "application/octet-stream";
		        const dataUrl = `data:${mime};base64,${bytesToBase64(asset.data)}`;
		        html = html.replace(match[0], `${match[1]}${match[2]}${dataUrl}${match[2]}`);
		      }
		      return addSandboxPolicy(html);
		    }
		    function boardFrame(board, className, onLoad) {
		      const { width, height } = board.viewport;
		      const scale = Math.min(1, 220 / width);
		      return h(
		        "div",
		        { className: className || "pd-frame-viewport", style: { width: Math.round(width * scale), height: Math.round(height * scale), overflow: "hidden", background: "#fff" } },
		        h("iframe", {
		          key: `${board.path}:${board.version}`,
		          srcDoc: board.previewHtml,
		          title: `${board.title} design preview`,
		          sandbox: "allow-scripts allow-forms",
		          referrerPolicy: "no-referrer",
		          onLoad,
		          style: { display: "block", width, height, border: 0, transform: `scale(${scale})`, transformOrigin: "top left", background: "#fff" }
		        })
		      );
		    }
		    var css = `
		  .pd-root{height:100%;min-height:0;width:100%;display:flex;flex-direction:column;color:#202432;background:#f7f8fa;font:12px/1.45 Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;overflow:hidden}
		  .pd-top{height:52px;flex:none;display:flex;align-items:center;justify-content:space-between;padding:0 14px;border-bottom:1px solid #e5e7ec;background:#fbfcfd;gap:10px}
		  .pd-brand{min-width:0}.pd-title{font-size:13px;font-weight:700;letter-spacing:-.02em}.pd-subtitle{color:#858b98;font-size:10px;margin-top:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
		  .pd-tools{display:flex;gap:4px;align-items:center;flex:none}.pd-tool,.pd-mode{border:1px solid transparent;border-radius:7px;background:transparent;color:#505867;height:28px;padding:0 8px;cursor:pointer;font:inherit;white-space:nowrap}.pd-tool:hover,.pd-mode:hover{background:#eef0f4}.pd-tool:disabled{opacity:.4;cursor:default}.pd-mode.active{background:#e7eafe;color:#4146b6;border-color:#d7dbfc;font-weight:650}
		  .pd-toolbar{height:42px;flex:none;display:flex;align-items:center;gap:8px;padding:0 12px;border-bottom:1px solid #eceef2;background:#fff;overflow:hidden}.pd-toolbar .pd-count{color:#818795;margin-left:auto;white-space:nowrap;font-size:10px}.pd-sep{height:18px;width:1px;background:#e5e7ec;margin:0 3px}
		  .pd-stage{position:relative;flex:1;min-height:0;overflow:hidden;background-color:#f8f9fb;background-image:radial-gradient(#cbd0db 0.75px,transparent .75px);background-size:17px 17px;touch-action:none}
		  .pd-canvas{position:absolute;left:0;top:0;display:grid;grid-template-columns:repeat(2, minmax(0, 220px));align-content:start;gap:17px;padding:22px;transform-origin:0 0;will-change:transform;user-select:none}
		  .pd-board{width:220px;border:1px solid #dfe3e9;background:#fff;border-radius:10px;overflow:hidden;box-shadow:0 3px 12px #2221;transition:border-color .12s,box-shadow .12s;cursor:pointer}
		  .pd-board.selected{border:2px solid #575ddd;box-shadow:0 0 0 3px #5a5fe022,0 5px 18px #2222}.pd-board-head{height:39px;padding:6px 9px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #eceef2;background:#fff;gap:7px}.pd-board-name{font-size:10px;font-weight:700;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.pd-board-path{font-size:9px;color:#9a9eaa;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.pd-board-preview{display:flex;justify-content:center;align-items:flex-start;background:#f0f2f5;overflow:hidden}.pd-frame-viewport iframe{pointer-events:none}
		  .pd-empty,.pd-error{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;padding:24px;text-align:center;color:#686f7e}.pd-empty-inner{max-width:300px}.pd-empty strong{font-size:14px;color:#272c38;display:block;margin-bottom:7px}.pd-empty p{margin:0;line-height:1.7}.pd-error{color:#b42318}
		  .pd-inspector{position:absolute;bottom:12px;left:50%;transform:translateX(-50%);height:32px;display:flex;align-items:center;gap:4px;padding:3px;border:1px solid #dfe3ea;border-radius:10px;background:#fffffff0;box-shadow:0 3px 12px #1112;backdrop-filter:blur(10px)}.pd-inspector button{border:0;background:transparent;border-radius:7px;min-width:26px;height:25px;cursor:pointer;color:#343a47}.pd-inspector button:hover{background:#edf0f5}.pd-inspector .pd-zoom{min-width:45px;font-size:10px}
		  .pd-viewer{flex:1;min-height:0;display:flex;flex-direction:column;background:#fff}.pd-viewer-bar{height:34px;flex:none;border-bottom:1px solid #e6e8ed;padding:0 10px;display:flex;align-items:center;justify-content:space-between;color:#7a808b;font-size:10px}.pd-viewer-body{flex:1;min-height:0;overflow:auto;background:#eef0f4;display:flex;justify-content:center;align-items:center;padding:15px}.pd-large-frame iframe{pointer-events:auto;transform-origin:top left}.pd-code{flex:1;min-height:0;overflow:auto;background:#171a22;color:#dfe5f1;font:11px/1.6 ui-monospace,SFMono-Regular,Menlo,monospace;padding:15px;white-space:pre;tab-size:2;user-select:text}
		  .pd-status{position:absolute;right:10px;top:10px;color:#707788;background:#ffffffdf;border:1px solid #e3e5ea;border-radius:7px;padding:5px 8px;font-size:9px;pointer-events:none}
		  .pd-modal{position:absolute;inset:0;z-index:5;background:#10131be8;display:flex;align-items:center;justify-content:center;padding:18px}.pd-modal-card{position:relative;max-width:100%;max-height:100%;background:#fff;border-radius:10px;overflow:auto;box-shadow:0 15px 45px #0008}.pd-modal-close{position:fixed;right:22px;top:22px;background:#fff;border:0;border-radius:50%;height:32px;width:32px;cursor:pointer;font-size:18px}
		  @media(max-width:440px){.pd-canvas{grid-template-columns:repeat(2, minmax(0, 1fr));padding:12px;gap:10px}.pd-board{width:100%}.pd-board-preview{min-height:100px}.pd-board-head{padding:5px}.pd-top{padding:0 9px}.pd-tools .pd-tool{padding:0 5px}}
		`;
		    function DesignPanel(props) {
		      const { sessionId, listWorkspace, statWorkspace, readWorkspace, readAsset } = props;
		      const [boards, setBoards] = React.useState([]);
		      const [selected, setSelected] = React.useState("");
		      const [view, setView] = React.useState("canvas");
		      const [scale, setScale] = React.useState(0.88);
		      const [position, setPosition] = React.useState({ x: 0, y: 0 });
		      const [drag, setDrag] = React.useState(null);
		      const [loading, setLoading] = React.useState(true);
		      const [error, setError] = React.useState("");
		      const [modal, setModal] = React.useState(false);
		      const [, setTick] = React.useState(0);
		      const refreshLock = React.useRef(false);
		      const boardCache = React.useRef(/* @__PURE__ */ new Map());
		      const workspaceTab = props.useTabInfo ? props.useTabInfo() : void 0;
		      const signal = workspaceTab?.tab?.signal;
		      const activeBoard = boards.find((board) => board.path === selected) ?? boards[0];
		      const refresh = React.useCallback(async () => {
		        if (!sessionId || !listWorkspace || !statWorkspace || !readWorkspace || refreshLock.current || signal?.aborted) return;
		        refreshLock.current = true;
		        setLoading((current) => current && boards.length === 0);
		        setError("");
		        try {
		          const listings = {};
		          const queue = [ROOT_PATH];
		          const visited = /* @__PURE__ */ new Set();
		          while (queue.length && visited.size < MAX_DIRECTORIES) {
		            const directory = queue.shift();
		            if (visited.has(directory)) continue;
		            visited.add(directory);
		            const listing = await listWorkspace(directory, signal);
		            listings[directory] = listing;
		            for (const entry of listing.entries ?? []) {
		              if (entry.type === "directory" && !IGNORE_DIRECTORIES.has(entry.name) && !entry.name.startsWith(".")) queue.push(directory === ROOT_PATH ? entry.name : `${directory}/${entry.name}`);
		            }
		          }
		          const paths = collectHtmlPaths(listings);
		          const nextBoards = [];
		          for (const path of paths) {
		            if (signal?.aborted) return;
		            try {
		              const metadata = await statWorkspace(path, signal);
		              const cached = boardCache.current.get(path);
		              if (cached?.version === metadata.version) {
		                nextBoards.push(cached);
		                continue;
		              }
		              const response = await readWorkspace(path, {}, signal);
		              const source = new TextDecoder("utf-8", { fatal: true }).decode(response.data);
		              const previewHtml = await (readAsset ? preparePreviewHtml(source, path, readAsset, sessionId, signal) : Promise.resolve(addSandboxPolicy(source)));
		              const board = { path, title: fileTitle(path), version: metadata.version, source, previewHtml, viewport: viewportOf(source), virtual: false };
		              boardCache.current.set(path, board);
		              nextBoards.push(board);
		            } catch (readError) {
		              if (signal?.aborted) return;
		              if (!error) setError(`\u65E0\u6CD5\u8BFB\u53D6 ${path}\uFF1A${readError instanceof Error ? readError.message : String(readError)}`);
		            }
		          }
		          const currentPaths = new Set(paths);
		          for (const cachedPath of boardCache.current.keys()) if (!currentPaths.has(cachedPath)) boardCache.current.delete(cachedPath);
		          if (nextBoards.length) {
		            const sourceByPath = nextBoards.filter((board) => !board.virtual).map((board) => board.source);
		            const tokens = cssTokens(sourceByPath.join("\n"));
		            const systemPath = "product-design/design-system (auto)";
		            const systemSource = designSystemHtml(tokens, nextBoards.map((board) => board.path));
		            const systemBoard = {
		              path: systemPath,
		              title: "Design system",
		              version: `${nextBoards.map((board) => board.version).join("|")}:${tokens.length}`,
		              source: systemSource,
		              previewHtml: addSandboxPolicy(systemSource),
		              viewport: { width: 1280, height: 820 },
		              virtual: true
		            };
		            nextBoards.push(systemBoard);
		            setBoards(nextBoards);
		            setSelected((current) => nextBoards.some((board) => board.path === current) ? current : nextBoards[0].path);
		          } else {
		            setBoards([]);
		            setSelected("");
		          }
		        } catch (loadError) {
		          if (!signal?.aborted) setError(loadError instanceof Error ? loadError.message : String(loadError));
		        } finally {
		          if (!signal?.aborted) setLoading(false);
		          refreshLock.current = false;
		        }
		      }, [sessionId, listWorkspace, statWorkspace, readWorkspace, readAsset, signal, boards.length, error]);
		      React.useEffect(() => {
		        void refresh();
		        const timer = setInterval(() => {
		          void refresh();
		        }, 2200);
		        return () => clearInterval(timer);
		      }, [refresh]);
		      React.useEffect(() => {
		        if (typeof window === "undefined") return void 0;
		        const onKey = (event) => {
		          if (event.key === "Escape") setModal(false);
		        };
		        window.addEventListener("keydown", onKey);
		        return () => window.removeEventListener("keydown", onKey);
		      }, []);
		      const changeScale = (factor) => setScale((value) => Math.max(0.35, Math.min(1.6, Math.round(value * factor * 100) / 100)));
		      const onCanvasDown = (event) => {
		        if (event.button !== 0 || event.target.closest("[data-board-card]")) return;
		        setDrag({ pointerId: event.pointerId, x: event.clientX, y: event.clientY, originX: position.x, originY: position.y });
		        event.currentTarget.setPointerCapture?.(event.pointerId);
		      };
		      const onCanvasMove = (event) => {
		        if (!drag || drag.pointerId !== event.pointerId) return;
		        setPosition({ x: drag.originX + event.clientX - drag.x, y: drag.originY + event.clientY - drag.y });
		      };
		      const onCanvasUp = (event) => {
		        if (drag?.pointerId === event.pointerId) setDrag(null);
		      };
		      const copyCode = async () => {
		        try {
		          await navigator.clipboard.writeText(activeBoard?.source ?? "");
		          setTick((value) => value + 1);
		        } catch {
		          setError("\u590D\u5236\u5931\u8D25\uFF1B\u53EF\u4EE5\u5728\u4EE3\u7801\u89C6\u56FE\u4E2D\u624B\u52A8\u9009\u62E9\u5E76\u590D\u5236\u3002");
		        }
		      };
		      const boardCards = boards.map((board) => h(
		        "article",
		        {
		          key: board.path,
		          "data-board-card": "",
		          className: `pd-board${board.path === selected ? " selected" : ""}`,
		          role: "button",
		          tabIndex: 0,
		          "aria-pressed": board.path === selected,
		          onClick: () => setSelected(board.path),
		          onDoubleClick: () => {
		            setSelected(board.path);
		            setView("preview");
		          },
		          onKeyDown: (event) => {
		            if (event.key === "Enter" || event.key === " ") {
		              event.preventDefault();
		              setSelected(board.path);
		            }
		          }
		        },
		        h(
		          "header",
		          { className: "pd-board-head" },
		          h("div", { style: { minWidth: 0 } }, h("div", { className: "pd-board-name" }, board.title), h("div", { className: "pd-board-path" }, board.path)),
		          h("span", { style: { flex: "none", fontSize: 9, color: board.virtual ? "#6267c8" : "#8b91a0" } }, board.virtual ? "TOKENS" : "HTML")
		        ),
		        h("div", { className: "pd-board-preview", onDoubleClick: () => {
		          setSelected(board.path);
		          setModal(true);
		        } }, boardFrame(board, "pd-frame-viewport"))
		      ));
		      let stageContent;
		      if (view === "code" && activeBoard) {
		        stageContent = h(
		          "section",
		          { className: "pd-viewer" },
		          h("div", { className: "pd-viewer-bar" }, h("span", null, activeBoard.path), h("button", { className: "pd-tool", type: "button", onClick: copyCode }, "\u590D\u5236\u4EE3\u7801")),
		          h("pre", { className: "pd-code" }, activeBoard.source)
		        );
		      } else if (view === "preview" && activeBoard) {
		        const fit = Math.min(1, 500 / activeBoard.viewport.width, 650 / activeBoard.viewport.height);
		        stageContent = h(
		          "section",
		          { className: "pd-viewer" },
		          h("div", { className: "pd-viewer-bar" }, h("span", null, `${activeBoard.title} \xB7 ${activeBoard.viewport.width} \xD7 ${activeBoard.viewport.height}`), h("button", { className: "pd-tool", type: "button", onClick: () => setModal(true) }, "\u653E\u5927")),
		          h("div", { className: "pd-viewer-body" }, h(
		            "div",
		            { className: "pd-large-frame", style: { width: Math.round(activeBoard.viewport.width * fit), height: Math.round(activeBoard.viewport.height * fit), overflow: "hidden", boxShadow: "0 5px 24px #141a2933" } },
		            h("iframe", { key: `${activeBoard.path}:${activeBoard.version}`, title: `${activeBoard.title} enlarged preview`, srcDoc: activeBoard.previewHtml, sandbox: "allow-scripts allow-forms", referrerPolicy: "no-referrer", style: { display: "block", border: 0, width: activeBoard.viewport.width, height: activeBoard.viewport.height, transform: `scale(${fit})`, transformOrigin: "top left", background: "#fff" } })
		          ))
		        );
		      } else if (boards.length) {
		        stageContent = h(
		          React.Fragment,
		          null,
		          h("div", { className: "pd-canvas", style: { transform: `translate(${position.x}px,${position.y}px) scale(${scale})` } }, boardCards),
		          h(
		            "div",
		            { className: "pd-inspector" },
		            h("button", { title: "\u7F29\u5C0F", type: "button", onClick: () => changeScale(0.85) }, "\u2212"),
		            h("button", { className: "pd-zoom", title: "\u91CD\u7F6E\u7F29\u653E", type: "button", onClick: () => {
		              setScale(0.88);
		              setPosition({ x: 0, y: 0 });
		            } }, `${Math.round(scale * 100)}%`),
		            h("button", { title: "\u653E\u5927", type: "button", onClick: () => changeScale(1.18) }, "+"),
		            h("button", { title: "\u5C45\u4E2D\u753B\u5E03", type: "button", onClick: () => setPosition({ x: 0, y: 0 }) }, "\u2316")
		          )
		        );
		      } else {
		        stageContent = h("div", { className: "pd-empty" }, h(
		          "div",
		          { className: "pd-empty-inner" },
		          h("strong", null, loading ? "\u6B63\u5728\u67E5\u627E\u8BBE\u8BA1\u9875\u9762\u2026" : "\u751F\u6210\u540E\uFF0C\u753B\u677F\u4F1A\u81EA\u52A8\u51FA\u73B0\u5728\u8FD9\u91CC"),
		          h("p", null, loading ? "\u6B63\u5728\u8BFB\u53D6\u5F53\u524D\u4F1A\u8BDD\u5DE5\u4F5C\u533A\u4E2D\u7684 HTML \u9875\u9762\u3002" : "\u5728\u5DE6\u4FA7\u5BF9\u8BDD\u91CC\u63CF\u8FF0\u754C\u9762\u540E\uFF0C\u751F\u6210\u5230\u5DE5\u4F5C\u533A\u7684 HTML \u4F1A\u81EA\u52A8\u5C55\u793A\u4E3A\u753B\u677F\uFF1B\u65E0\u9700\u542F\u52A8\u670D\u52A1\u5668\u6216\u586B\u5199 localhost\u3002"),
		          error ? h("p", { role: "alert", style: { color: "#b42318", marginTop: 10 } }, error) : null,
		          !loading ? h("button", { className: "pd-tool", type: "button", onClick: () => {
		            setLoading(true);
		            void refresh();
		          } }, "\u91CD\u65B0\u626B\u63CF\u5DE5\u4F5C\u533A") : null
		        ));
		      }
		      return h(
		        "main",
		        { className: "pd-root", "data-product-design-panel": "" },
		        h("style", null, css),
		        h(
		          "header",
		          { className: "pd-top" },
		          h("div", { className: "pd-brand" }, h("div", { className: "pd-title" }, "\u4EA7\u54C1\u8BBE\u8BA1\u753B\u5E03"), h("div", { className: "pd-subtitle" }, activeBoard ? `\u5F53\u524D\u9009\u4E2D \xB7 ${activeBoard.title}` : "\u5BF9\u8BDD\u751F\u6210\u7684\u9875\u9762\u4F1A\u81EA\u52A8\u51FA\u73B0\u5728\u753B\u5E03\u4E0A")),
		          h("div", { className: "pd-tools" }, h("button", { type: "button", className: "pd-tool", title: "\u626B\u63CF\u65B0\u751F\u6210\u7684\u9875\u9762", onClick: () => {
		            setLoading(true);
		            void refresh();
		          } }, "\u21BB"))
		        ),
		        h(
		          "nav",
		          { className: "pd-toolbar", "aria-label": "\u8BBE\u8BA1\u753B\u5E03\u5DE5\u5177" },
		          h("button", { type: "button", className: `pd-mode${view === "canvas" ? " active" : ""}`, onClick: () => setView("canvas") }, "\u753B\u5E03"),
		          h("button", { type: "button", className: `pd-mode${view === "preview" ? " active" : ""}`, disabled: !activeBoard, onClick: () => setView("preview") }, "\u9884\u89C8"),
		          h("button", { type: "button", className: `pd-mode${view === "code" ? " active" : ""}`, disabled: !activeBoard, onClick: () => setView("code") }, "\u4EE3\u7801"),
		          h("span", { className: "pd-sep" }),
		          h("span", { className: "pd-count" }, boards.length ? `${boards.filter((board) => !board.virtual).length} \u4E2A\u9875\u9762 \xB7 ${boards.some((board) => board.virtual) ? "\u542B\u89C4\u8303\u753B\u677F" : "\u5DE5\u4F5C\u533A\u626B\u63CF"}` : "\u7B49\u5F85\u8BBE\u8BA1\u6587\u4EF6")
		        ),
		        h(
		          "section",
		          {
		            className: "pd-stage",
		            "aria-label": "\u591A\u753B\u677F\u8BBE\u8BA1\u753B\u5E03",
		            onPointerDown: onCanvasDown,
		            onPointerMove: onCanvasMove,
		            onPointerUp: onCanvasUp,
		            onPointerCancel: onCanvasUp,
		            onWheel: (event) => {
		              if (event.ctrlKey || event.metaKey) {
		                event.preventDefault();
		                changeScale(event.deltaY < 0 ? 1.08 : 0.92);
		              }
		            }
		          },
		          stageContent,
		          loading && boards.length ? h("div", { className: "pd-status" }, "\u540C\u6B65\u5DE5\u4F5C\u533A\u2026") : null,
		          !loading && error && boards.length ? h("div", { className: "pd-status", role: "status", title: error, style: { color: "#b42318" } }, "\u90E8\u5206\u9875\u9762\u672A\u80FD\u8BFB\u53D6") : null,
		          modal && activeBoard ? h(
		            "div",
		            { className: "pd-modal", role: "dialog", "aria-modal": true, "aria-label": `${activeBoard.title} \u653E\u5927\u9884\u89C8`, onClick: () => setModal(false) },
		            h("button", { type: "button", className: "pd-modal-close", onClick: () => setModal(false), "aria-label": "\u5173\u95ED\u653E\u5927\u9884\u89C8" }, "\xD7"),
		            h(
		              "div",
		              { className: "pd-modal-card", onClick: (event) => event.stopPropagation(), style: { width: activeBoard.viewport.width, height: activeBoard.viewport.height } },
		              h("iframe", { key: `${activeBoard.path}:${activeBoard.version}:modal`, title: `${activeBoard.title} large preview`, srcDoc: activeBoard.previewHtml, sandbox: "allow-scripts allow-forms", referrerPolicy: "no-referrer", style: { display: "block", border: 0, width: activeBoard.viewport.width, height: activeBoard.viewport.height, background: "#fff" } })
		            )
		          ) : null
		        )
		      );
		    }
		    module2.exports = { DesignPanel, collectHtmlPaths, cssTokens, designSystemHtml, isHtmlPath, viewportOf, preparePreviewHtml, addSandboxPolicy, safeRelativeAsset, fileTitle };
		  }
		});
		
		// client/trigger.cjs
		var require_trigger = __commonJS({
		  "client/trigger.cjs"(exports, module2) {
		    "use strict";
		    var PANEL_KIND = "product-design-preview";
		    function isProductDesignInvocation(line) {
		      return /^\/product-design(?:\s|$)/u.test(String(line ?? "").trimStart());
		    }
		    function createProductDesignTrigger(openPanel) {
		      return {
		        trigger: "/",
		        name: "product-design-panel-hook",
		        order: 100,
		        showGroupTitle: false,
		        async candidates() {
		          return [];
		        },
		        onPick({ candidate }) {
		          if (candidate?.name === "product-design") openPanel();
		          return { text: `/${candidate?.name ?? "product-design"} ` };
		        },
		        matchSpace(_session, token) {
		          if (token === "/product-design") openPanel();
		          return void 0;
		        },
		        async matchEnter(_session, line) {
		          if (isProductDesignInvocation(line)) openPanel();
		          return void 0;
		        }
		      };
		    }
		    module2.exports = { PANEL_KIND, createProductDesignTrigger, isProductDesignInvocation };
		  }
		});
		
		// client/index.cjs
		var require_index = __commonJS({
		  "client/index.cjs"(exports) {
		    "use strict";
		    var { DesignPanel } = require_panel();
		    var { PANEL_KIND, createProductDesignTrigger } = require_trigger();
		    var DEFINITION_ID = "dsh-plugin-product-design/right-panel";
		    exports.name = "dsh-plugin-product-design-client";
		    exports.inject = ["inputTriggers", "sidebarRight", "sidebarRightTabs", "slots", "remote", "remote.workspaceFiles"];
		    exports.apply = function apply2(ctx) {
		      const openPanel = () => {
		        try {
		          ctx.sidebarRight.openTab(PANEL_KIND);
		        } catch (error) {
		          ctx.logger?.warn?.(`product-design: could not open design panel: ${error instanceof Error ? error.message : String(error)}`);
		        }
		      };
		      ctx.effect(() => ctx.sidebarRightTabs.register({
		        id: DEFINITION_ID,
		        kind: PANEL_KIND,
		        priority: "extension",
		        keepMounted: true,
		        title: () => "\u4EA7\u54C1\u8BBE\u8BA1"
		      }), "product-design: right panel type");
		      ctx.effect(() => ctx.slots.inject("sidebar.right.pane.tab", () => ctx.slots.register({
		        name: "sidebar.right.pane.tab",
		        key: DEFINITION_ID,
		        inject: (sessionId) => ({
		          sessionId,
		          listWorkspace: (path, signal) => ctx.remote.workspaceFiles.list(sessionId, path, signal),
		          statWorkspace: (path, signal) => ctx.remote.workspaceFiles.stat(sessionId, path, signal),
		          readWorkspace: (path, options, signal) => ctx.remote.workspaceFiles.readBytes(sessionId, path, options, signal),
		          readAsset: (sessionIdArg, path, options, signal) => ctx.remote.workspaceFiles.readBytes(sessionId, path, options, signal)
		        })
		      }, DesignPanel)), "product-design: right panel body");
		      const trigger = createProductDesignTrigger(openPanel);
		      ctx.effect(() => ctx.inputTriggers.registerSource(trigger), "product-design: open panel on skill invocation");
		    };
		  }
		});
		
		// client/entry.mjs
		var entry_exports = {};
		__export(entry_exports, {
		  apply: () => apply,
		  inject: () => inject,
		  name: () => name
		});
		module.exports = __toCommonJS(entry_exports);
		var import_index = __toESM(require_index(), 1);
		var name = import_index.default.name;
		var inject = import_index.default.inject;
		var apply = import_index.default.apply;
		
		return module.exports;
	}
});
