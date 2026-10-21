# Mill Alley Tracker

An interactive checklist and production guide for **Derelict Mill Alley**, a 15-week environment art project built on a AAA pipeline (Blender, Marmoset Toolbag, Unreal Engine 5).

- **Today** — today's task, catch-up list for missed days, overall progress, countdown to the next milestone. Wednesdays and Thursdays show as days off.
- **Schedule** — all 75 workdays (Oct 19, 2026 – Jan 31, 2027) grouped by week, with a to-scale phase timeline, checkboxes, per-day notes and filters.
- **Blender curriculum** — a 15-week, 75-lesson Blender course on the same calendar: each lesson teaches what that day's Mill Alley task needs, with drills, portfolio-standard checks drawn from a benchmark collection, setup and free resources. Every lesson opens in full: videos and Blender Manual pages to study, step-by-step instructions for Blender 5.2, common mistakes, a drill with a pass check, and how it feeds that day's Mill Alley task. Today's full lesson also shows on the Today page.
- **Guide** — overview, reference and 1:1 scale breakdown, modular kit (31 pieces with status), hero features, full asset list with priority filters, materials and custom mask recipes, free resources, and the final render checklist.

Progress (checkmarks, statuses, notes) is saved in the browser's local storage. Use **Export / Import** in the sidebar to move it between devices.

## Run it

```bash
npm install
npm run dev      # local dev server
npm run build    # production build in dist/
```

The build uses a relative base and hash routing, so `dist/` can be hosted from any static host or subpath (GitHub Pages, Netlify, an S3 bucket).

## The plan document

- `docs/Derelict-Mill-Alley-Plan.docx` and `docs/Derelict-Mill-Alley-Plan.pdf` — the full written plan (scale breakdown, kit, asset list, materials, free resources, daily schedule).
- `docs/Derelict-Mill-Alley-Tracker.xlsx` — spreadsheet tracker: every asset with its size and a colored status per stage, the 15-week schedule (hover a task for its full description), and a Measurements sheet with the 1:1 scale table.
- `docs/mill-alley-paintover.png` — modular paint-over: perspective module grid with hero outlines, and a colour ID map of the kit. Drawn by `scripts/idmap.py`, which also holds the ID colours used in the app (`src/data/colors.ts`) and the spreadsheet (column H, built by `scripts/build_xlsx.py`).
- `scripts/plan.md` — the same plan as Markdown; the app's data is generated from it.
- `docs/Blender-Lessons.docx` / `.pdf` — the full written lessons for all 75 days (also served by the app as `Blender-Lessons.pdf`). Sources: `scripts/lessons/weekNN.md` plus the checked resource lists in `scripts/lessons/res_*.json`; `python3 scripts/build_lessons.py` regenerates `src/data/lessons.ts`.
- `docs/Blender-Curriculum.docx` / `.pdf` — the Blender curriculum. Lessons live in `scripts/curriculum.md`; `python3 scripts/gen_curriculum_data.py` regenerates `src/data/curriculum.ts`. Standards, gaps, setup and resources are in `src/data/curriculumGuide.ts`.

## Editing the plan

All schedule and table content lives in `src/data/`:

- `src/data/plan.ts` — weeks, days and every table. Generated from `scripts/plan.md` by `python3 scripts/gen_plan_data.py`; you can also edit it directly.
- `src/data/guide.ts` — phases, milestones, tools, mask recipes, free resources and render list.

Workdays are Monday, Tuesday, Friday, Saturday and Sunday; the generator assigns dates in that pattern starting Monday, Oct 19, 2026.

## Credits

The reference photo in `public/reference.jpg` belongs to its photographer and is included for personal study only.
