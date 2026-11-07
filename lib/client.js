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
		
		// client/preview-url.cjs
		var require_preview_url = __commonJS({
		  "client/preview-url.cjs"(exports, module2) {
		    "use strict";
		    var LOCAL_HOSTS = /* @__PURE__ */ new Set(["localhost", "127.0.0.1", "[::1]"]);
		    function resolveLocalPreviewUrl(value) {
		      const raw = String(value ?? "").trim();
		      if (!raw) throw new Error("\u8BF7\u8F93\u5165\u672C\u673A\u9884\u89C8\u5730\u5740\u3002");
		      let url;
		      try {
		        url = new URL(/^https?:\/\//iu.test(raw) ? raw : `http://${raw}`);
		      } catch {
		        throw new Error("\u5730\u5740\u683C\u5F0F\u65E0\u6548\uFF0C\u8BF7\u586B\u5199 localhost \u9884\u89C8\u5730\u5740\u3002");
		      }
		      if (!["http:", "https:"].includes(url.protocol)) {
		        throw new Error("\u9884\u89C8\u4EC5\u652F\u6301 HTTP \u6216 HTTPS \u5730\u5740\u3002");
		      }
		      if (!LOCAL_HOSTS.has(url.hostname.toLowerCase())) {
		        throw new Error("\u4E3A\u4E86\u5B89\u5168\uFF0C\u9762\u677F\u76EE\u524D\u53EA\u52A0\u8F7D localhost\u3001127.0.0.1 \u6216 ::1 \u672C\u673A\u9884\u89C8\u3002");
		      }
		      if (url.username || url.password) {
		        throw new Error("\u672C\u673A\u9884\u89C8\u5730\u5740\u4E0D\u80FD\u5305\u542B\u7528\u6237\u540D\u6216\u5BC6\u7801\u3002");
		      }
		      return url.href;
		    }
		    module2.exports = { resolveLocalPreviewUrl };
		  }
		});
		
		// client/panel.cjs
		var require_panel = __commonJS({
		  "client/panel.cjs"(exports, module2) {
		    "use strict";
		    var React = require("react");
		    var { resolveLocalPreviewUrl } = require_preview_url();
		    var h = React.createElement;
		    var shellStyle = {
		      height: "100%",
		      minHeight: 0,
		      width: "100%",
		      display: "flex",
		      flexDirection: "column",
		      color: "var(--dsh-text-primary, #202124)",
		      background: "var(--dsh-background, #f7f7f5)",
		      fontFamily: 'var(--dsh-font-family, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif)'
		    };
		    var headerStyle = {
		      padding: "20px 20px 14px",
		      borderBottom: "1px solid rgba(127,127,127,.16)",
		      flex: "0 0 auto"
		    };
		    var titleStyle = { margin: 0, fontSize: 17, lineHeight: 1.3, fontWeight: 650, letterSpacing: "-.02em" };
		    var captionStyle = { margin: "5px 0 0", fontSize: 12, opacity: 0.62 };
		    var formStyle = { padding: "14px 16px 10px", flex: "0 0 auto" };
		    var labelStyle = { display: "block", fontSize: 11, fontWeight: 600, marginBottom: 7, opacity: 0.72 };
		    var rowStyle = { display: "flex", gap: 8 };
		    var inputStyle = {
		      minWidth: 0,
		      flex: 1,
		      height: 36,
		      padding: "0 11px",
		      borderRadius: 8,
		      border: "1px solid rgba(127,127,127,.25)",
		      background: "var(--dsh-surface, #fff)",
		      color: "inherit",
		      fontSize: 12,
		      outline: "none"
		    };
		    var buttonStyle = {
		      flex: "0 0 auto",
		      height: 36,
		      padding: "0 13px",
		      border: 0,
		      borderRadius: 8,
		      background: "var(--dsh-accent, #202124)",
		      color: "var(--dsh-accent-contrast, #fff)",
		      fontSize: 12,
		      fontWeight: 600,
		      cursor: "pointer"
		    };
		    var helperStyle = { margin: "7px 0 0", fontSize: 11, lineHeight: 1.45, opacity: 0.57 };
		    var errorStyle = { margin: "6px 0 0", fontSize: 11, lineHeight: 1.45, color: "#b42318" };
		    var stageStyle = {
		      position: "relative",
		      flex: 1,
		      minHeight: 0,
		      margin: "0 12px 12px",
		      overflow: "hidden",
		      border: "1px solid rgba(127,127,127,.16)",
		      borderRadius: 10,
		      background: "var(--dsh-surface, #fff)"
		    };
		    var emptyStyle = {
		      height: "100%",
		      display: "flex",
		      flexDirection: "column",
		      justifyContent: "center",
		      alignItems: "center",
		      padding: 24,
		      textAlign: "center",
		      boxSizing: "border-box"
		    };
		    var footerStyle = {
		      padding: "0 18px 12px",
		      flex: "0 0 auto",
		      fontSize: 10,
		      lineHeight: 1.45,
		      opacity: 0.52
		    };
		    function DesignPanel() {
		      const [address, setAddress] = React.useState("");
		      const [preview, setPreview] = React.useState("");
		      const [error, setError] = React.useState("");
		      function openPreview(event) {
		        event.preventDefault();
		        try {
		          const next = resolveLocalPreviewUrl(address);
		          setPreview(next);
		          setAddress(next);
		          setError("");
		        } catch (caught) {
		          setError(caught instanceof Error ? caught.message : "\u65E0\u6CD5\u6253\u5F00\u8FD9\u4E2A\u9884\u89C8\u5730\u5740\u3002");
		        }
		      }
		      return h(
		        "main",
		        { style: shellStyle, "data-product-design-panel": "" },
		        h(
		          "header",
		          { style: headerStyle },
		          h("h1", { style: titleStyle }, "\u4EA7\u54C1\u8BBE\u8BA1\u9762\u677F"),
		          h("p", { style: captionStyle }, "\u4E0E\u5DE6\u4FA7\u5BF9\u8BDD\u5E76\u6392\u7684\u539F\u578B\u9884\u89C8\u5DE5\u4F5C\u533A")
		        ),
		        h(
		          "form",
		          { style: formStyle, onSubmit: openPreview },
		          h("label", { style: labelStyle, htmlFor: "pd-local-preview-address" }, "\u672C\u673A\u9884\u89C8\u5730\u5740"),
		          h(
		            "div",
		            { style: rowStyle },
		            h("input", {
		              id: "pd-local-preview-address",
		              type: "text",
		              inputMode: "url",
		              autoComplete: "url",
		              spellCheck: false,
		              value: address,
		              placeholder: "http://localhost:5173",
		              "aria-label": "\u672C\u673A\u9884\u89C8\u5730\u5740",
		              style: inputStyle,
		              onChange: (event) => {
		                setAddress(event.target.value);
		                if (error) setError("");
		              }
		            }),
		            h("button", { type: "submit", style: buttonStyle }, "\u6253\u5F00\u9884\u89C8")
		          ),
		          h("p", { style: helperStyle }, "\u4EC5\u52A0\u8F7D\u672C\u673A localhost \u5730\u5740\uFF1B\u5148\u5728\u539F\u578B\u9879\u76EE\u8FD0\u884C\u5F00\u53D1\u670D\u52A1\u5668\u3002"),
		          error ? h("p", { role: "alert", style: errorStyle }, error) : null
		        ),
		        h(
		          "section",
		          { style: stageStyle, "aria-label": "\u8BBE\u8BA1\u9884\u89C8" },
		          preview ? h("iframe", {
		            key: preview,
		            src: preview,
		            title: "\u672C\u673A\u4EA7\u54C1\u8BBE\u8BA1\u9884\u89C8",
		            sandbox: "allow-scripts allow-forms allow-same-origin",
		            referrerPolicy: "no-referrer",
		            style: { display: "block", width: "100%", height: "100%", border: 0, background: "#fff" }
		          }) : h(
		            "div",
		            { style: emptyStyle },
		            h("div", { style: { fontSize: 14, fontWeight: 600 } }, "\u8BBE\u8BA1\u9884\u89C8\u4F1A\u663E\u793A\u5728\u8FD9\u91CC"),
		            h(
		              "p",
		              { style: { maxWidth: 300, margin: "8px 0 0", fontSize: 12, lineHeight: 1.55, opacity: 0.62 } },
		              "\u5728\u5DE6\u4FA7\u804A\u5929\u4E2D\u63CF\u8FF0\u5E76\u8FED\u4EE3\u8BBE\u8BA1\uFF1B\u542F\u52A8\u672C\u673A\u539F\u578B\u540E\uFF0C\u628A localhost \u5730\u5740\u586B\u5230\u4E0A\u65B9\u5373\u53EF\u5E76\u6392\u67E5\u770B\u3002"
		            )
		          )
		        ),
		        h("footer", { style: footerStyle }, "\u8FD0\u884C /product-design \u540E\uFF0C\u6B64\u9762\u677F\u4F1A\u81EA\u52A8\u6253\u5F00\uFF1B\u804A\u5929\u5185\u5BB9\u4ECD\u7559\u5728\u5DE6\u4FA7\u3002")
		      );
		    }
		    module2.exports = { DesignPanel };
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
		    exports.inject = ["inputTriggers", "sidebarRight", "sidebarRightTabs", "slots"];
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
		        key: DEFINITION_ID
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
