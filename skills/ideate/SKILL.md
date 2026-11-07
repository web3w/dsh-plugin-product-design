---
name: pd-ideate
user-invocable: false
description: "Generate three distinct visual directions for a Product Design brief, as generated images when an image-generation tool is connected or as structured text directions otherwise. Use when the user asks for design variants, visual exploration, remixes, or concept directions from provided context."
---

# Ideate

You're tasked with generating design directions for a user's idea.

Follow the shared Product Design routing guidance in [$product-design](../index/SKILL.md).

## Critical Overrides

- Refer to the plugin router [$product-design](../index/SKILL.md) before proceeding.
- Follow [$critical-overrides](../../references/critical-overrides.md).

## User Context

Before starting, load [$pd-user-context](../user-context/SKILL.md) and run its preflight script when local shell access is available.

Use provided product URLs, design files, screenshots, reference images, codebase paths, Storybook links, tokens, design systems, brand assets, and component refs to align the directions to the design brief.

Do not inspect every saved reference. Inspect only what the current task needs.

## Workflow

Do not generate directions until `$pd-get-context` has satisfied the minimum required design brief.

Before generating:

1. Understand the brief.

- Identify the target: component, screen, feature/workflow, or broad product idea.
- Identify the intended user, product surface, and goal.
- Preserve hard constraints from the user.
- Run `$pd-get-context` if the minimum required design brief isn't satisfied.

2. Resolve context.

- Use provided files, screenshots, links, and visible references.
- In a local workspace, look for nearby design documentation and other local visual context.
- Check likely design context folders such as `user-context`, `storybook/`, `.storybook/`, `design-system/`, `design-systems/`, `tokens/`, `components/`, `app/`, and generated prototype roots.
- In an existing project, look for existing product screenshots, similar flows, Storybook captures, design tokens, and component references before generating. Ask if the user can provide example screens similar to the one they are building if the existing app isn't accessible.

3. Inspect references directly.

- Look at screenshots, images, design frames, app surfaces, or other visual references before generating. Use the session's image reading capability for local image files.
- Do not infer from filenames alone.
- If a named local path or reference is not visible, stop and ask the user to confirm the path, attach the file, start the local app, or point to the correct workspace.

4. Decide the variation mode.

- If useful local design context exists and the user has not asked for a new style, stay within that existing direction.
- If no useful design context exists, or the user asks for broad exploration, vary both concept and visual system.
- For a specific component or existing surface, vary structure, interaction, hierarchy, and emphasis before varying brand style.
- For a broad product idea, explore three meaningfully different product directions.

5. Choose target dimensions.

- Pick the dimensions that best match the user's request and any provided visual reference.
- Mobile app: `390 x 844`.
- Tablet app: `834 x 1194`.
- Desktop app, dashboard, admin, or SaaS: `1440 x 1024`.
- Landing or marketing page: `1440` wide and scrollable.
- Modal, panel, widget, or component: natural container size.
- Provided screenshot, design frame, mockup, or reference image: match its dimensions and aspect ratio when the user wants to continue from that visual.
- Avoid crowding. Make the design fit the chosen dimensions cleanly, with realistic spacing, readable type, and no clipped content.

6. Check for access gaps.

- If a reference or file cannot be accessed because of permissions, missing paths, or suspiciously empty results, stop.
- Name the gap clearly and ask whether to troubleshoot access or continue without that source.
- Do not generate directions while silently ignoring a named reference.

7. Materialize the directions in the design canvas.

- Always create three distinct, self-contained HTML pages under `product-design/boards/`, one file per direction, using inline CSS and no CDN or remote dependencies. The workspace file watcher displays the pages automatically as real rendered boards.
- Use the target dimensions above and include `<meta name="dsh-design-size" content="WIDTHxHEIGHT">` so the canvas can preserve the intended viewport.
- Give each file a stable descriptive name (for example `product-design/boards/quiet-focus.html`) and include CSS custom properties for its actual palette and type tokens. Do not create ASCII art as a substitute for the rendered pages.
- If an image-generation tool is connected, images may be used as inputs or assets; they do not replace the three HTML boards. If no image tool is connected, do not imply one was used.

## Generation Rules (images)

When generating images:

- Generate exactly three independent images unless the user overrides the count.
- Launch each generation independently. Do not batch generations into one combined image.
- Each direction must be its own result. Do not put multiple ideas in one image.
- Give each direction a distinct, descriptive name before generation, but do not call them `option 1/2/3` and do not put planned numeric labels in generation prompts. Parallel results can arrive in a different order from the requests.
- Number options only after all generated-image results are present in the conversation. The only authoritative option order is the order those results are displayed. Ignore planned concept order, request order, batch order, and array indexes.
- Attach provided screenshots, files, app captures, and visual source material as moodboard inspiration when the tool accepts image input.
- When mock data includes dates or time-sensitive information, resolve the exact current date and include it so visible dates are plausible.
- Preserve hard constraints from the brief in every image.
- Only claim a visual reference was attached if the generation call actually received it. If you cannot attach it, say so and ask whether to continue text-only.

## HTML board quality

Each direction must be an actual browser-renderable page, not an outline:

- Show its name and a short design rationale in the assistant message, then implement the main screen with credible hierarchy, realistic spacing, readable text, and a clear primary action.
- Keep each HTML file self-contained: inline CSS and any small JavaScript; use system fonts, CSS shapes, or inline SVG instead of external network assets.
- Include meaningful interactive states where relevant, but keep all behavior local to the page.
- Keep the three pages materially different in layout and visual system. Preserve user-provided product content and never copy unrelated brands or reference content.

## Design Quality Bar (both modes)

- Design a focused primary screen, not a feature inventory. Show the hero use case, one clear primary action, and only one or two supporting actions or content areas. Let the rest of the product exist off-screen.
- Layout priority: spacing/grouping/typography first, then simple dividers, then subtle surface tints, then borders, then shadows last and sparingly.
- Do not default to a centered "app card" on a contrasting page background. Do not put cards inside cards. Do not make every list item its own card.
- Do not make up extraneous features just to fill a UI.
- For mobile app concepts, describe or output app content only — no device bezel, notch, status bar, or home indicator.

## Feedback Loop

If the user gives feedback after seeing directions, update the corresponding HTML board in place and let the canvas refresh it; do not replace all three boards for a single-board change.

If the user selects a direction and gives feedback, keep that board's file path stable and iterate on the actual HTML, CSS, and local interactions.

If the user likes parts of more than one direction, combine those choices into a new or explicitly named board and leave the other boards intact. When the chat does not identify which visible board is selected, ask which board title to revise rather than guessing.

## Output

Create all three HTML boards before handing off. The panel reads the active Session workspace and refreshes on its own; do not ask the user to start a server, paste a port, or open a localhost URL.

After files are written, state that three live pages are visible on the canvas and invite the user to select one by its displayed title or ask for a concrete change. Do not repeat their long descriptions as ASCII alternatives. If they identify a direction by number, use the visible canvas order and map it to the corresponding file path. If a later chat says only “change the selected board” and no title/path is available in the conversation, ask which visible board title they mean before editing.
