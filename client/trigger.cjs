'use strict';

const PANEL_KIND = 'product-design-preview';

/** True only for the leading user-invoked product-design skill token. */
function isProductDesignInvocation(line) {
  return /^\/product-design(?:\s|$)/u.test(String(line ?? '').trimStart());
}

/**
 * Add a non-claiming observer to the slash pipeline. It opens the page when
 * the user confirms `/product-design`, then returns undefined so DSH's
 * normal skill submission still proceeds unchanged.
 * @param {() => void} openPanel - open the plugin's page in the current Session.
 */
function createProductDesignTrigger(openPanel) {
  return {
    trigger: '/',
    name: 'product-design-panel-hook',
    order: 100,
    showGroupTitle: false,
    async candidates() { return []; },
    onPick({ candidate }) {
      if (candidate?.name === 'product-design') openPanel();
      return { text: `/${candidate?.name ?? 'product-design'} ` };
    },
    matchSpace(_session, token) {
      if (token === '/product-design') openPanel();
      // Do not claim the token: the regular skill source owns the prompt.
      return undefined;
    },
    async matchEnter(_session, line) {
      if (isProductDesignInvocation(line)) openPanel();
      // Returning undefined preserves the host's normal skill dispatch.
      return undefined;
    },
  };
}

module.exports = { PANEL_KIND, createProductDesignTrigger, isProductDesignInvocation };
