# Repository notes

- Keep the skill provider isolated; its filesystem peer range is intentionally limited to `>=0.2.2-rc.1 <0.2.3` (the 0.2.2 line only), not 0.2.1.
- The client panel targets the DSH 0.2.2-rc.1 public `sidebarRightTabs`/`sidebarRight` and input-trigger APIs; keep the skill submission unclaimed so the existing host skill dispatcher still runs.
- Build the browser entry with `npm run build:client` and include the generated `lib/client.js` in source distributions.
- The panel only embeds loopback preview origins (`localhost`, `127.0.0.1`, `::1`) in a sandboxed iframe.
- Update this file when these repository-specific integration constraints change.

_Last updated: 2026-11-07_
