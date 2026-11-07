'use strict';

const { DesignPanel } = require('./panel.cjs');
const { PANEL_KIND, createProductDesignTrigger } = require('./trigger.cjs');

const DEFINITION_ID = 'dsh-plugin-product-design/right-panel';

/** Browser client module entry for DSH Desktop/Web. */
exports.name = 'dsh-plugin-product-design-client';
exports.inject = ['inputTriggers', 'sidebarRight', 'sidebarRightTabs', 'slots', 'remote', 'remote.workspaceFiles'];

/** @param {object} ctx DSH browser client context */
exports.apply = function apply(ctx) {
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
    priority: 'extension',
    keepMounted: true,
    title: () => '产品设计',
  }), 'product-design: right panel type');

  ctx.effect(() => ctx.slots.inject('sidebar.right.pane.tab', () => ctx.slots.register({
    name: 'sidebar.right.pane.tab',
    key: DEFINITION_ID,
    inject: (sessionId) => ({
      sessionId,
      listWorkspace: (path, signal) => ctx.remote.workspaceFiles.list(sessionId, path, signal),
      statWorkspace: (path, signal) => ctx.remote.workspaceFiles.stat(sessionId, path, signal),
      readWorkspace: (path, options, signal) => ctx.remote.workspaceFiles.readBytes(sessionId, path, options, signal),
      readAsset: (sessionIdArg, path, options, signal) => ctx.remote.workspaceFiles.readBytes(sessionId, path, options, signal),
    }),
  }, DesignPanel)), 'product-design: right panel body');

  const trigger = createProductDesignTrigger(openPanel);
  ctx.effect(() => ctx.inputTriggers.registerSource(trigger), 'product-design: open panel on skill invocation');
};
