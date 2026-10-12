# Mill Alley Tracker

An interactive checklist and production guide for **Derelict Mill Alley**, a 15-week environment art project built on a AAA pipeline (Blender, Marmoset Toolbag, Unreal Engine 5).

- **Today** — today's task, catch-up list for missed days, overall progress, countdown to the next milestone. Wednesdays and Thursdays show as days off.
- **Schedule** — all 75 workdays (Oct 19, 2026 – Jan 31, 2027) grouped by week, with a to-scale phase timeline, checkboxes, per-day notes and filters.
- **Guide** — overview, reference and 1:1 scale breakdown, modular kit (31 pieces with status), hero features, full asset list with priority filters, materials and custom mask recipes, free resources, and the final render checklist.

Progress (checkmarks, statuses, notes) is saved in the browser's local storage. Use **Export / Import** in the sidebar to move it between devices.

## Run it

```bash
npm install
npm run dev      # local dev server
npm run build    # production build in dist/
```

The build uses a relative base and hash routing, so `dist/` can be hosted from any static host or subpath (GitHub Pages, Netlify, an S3 bucket).

## Editing the plan

All schedule and table content lives in `src/data/`:

- `src/data/plan.ts` — weeks, days and every table. Generated from `scripts/plan.md` by `python3 scripts/gen_plan_data.py`; you can also edit it directly.
- `src/data/guide.ts` — phases, milestones, tools, mask recipes, free resources and render list.

Workdays are Monday, Tuesday, Friday, Saturday and Sunday; the generator assigns dates in that pattern starting Monday, Oct 19, 2026.

## Credits

The reference photo in `public/reference.jpg` belongs to its photographer and is included for personal study only.
