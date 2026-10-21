## Week 14 · Jan 18 to 24 · Game-ready polish

This week's goal is the professional finish: fix critique notes without breaking the scene, add LODs and collision where they matter, and audit the whole kit for density, triangles and naming.

### Mon Jan 18 · Fixing assets after critique without breaking UE5
<!-- id: c14d1 -->

**Goal:** apply critique notes to meshes and update them in UE5 with nothing moving or duplicating.

**Time:** about 30 minutes for the lesson; the drill depends on your notes.

#### Watch and read first
{{RES}}

#### Steps
1. **Sort the notes.** For each critique note, write which asset it touches, whether it's a mesh, material or placement fix, and whether it's worth doing in the time left. Skipping a note on purpose is fine; ignoring it isn't.
2. **The three rules.** When you change a mesh: keep the same name, keep the same pivot, export with the same preset to the same file (Week 2).
3. **Silhouette fixes.** Changes to the outline (a straighter roofline, a deeper sill) are worth geometry. Surface fixes are often better done with decals or vertex paint in UE5.
4. **Variants instead of edits.** If a module is used in many places but one placement needs a change, export a new variant (`_v2`) rather than changing the original everywhere.
5. **Reimport and check.** Reimport in UE5 (right-click > Reimport). Look at every place the asset is used, including alternate cameras.
6. **Log it.** In the tracker's notes, list each note with "fixed" or "skipped because…".

#### Common mistakes
- Renaming during a fix. UE5 imports a new asset and the old one stays in the level.
- Moving the pivot to "fix" a placement. Every copy shifts. Move the placed actor in UE5 instead.
- Fixing everything. Prioritize notes that affect Camera 1 and the main renders.

#### Drill: fix two critiqued meshes and reimport them (time varies)
Pick two notes that need mesh changes, fix them in Blender and reimport.

**Pass when:** both fixes show in every placement, nothing moved, and no duplicate assets appear in the Content Browser.

#### Use it on Mill Alley
Today you apply critique notes, each fixed or consciously skipped. This drill is the mesh half of it.

### Tue Jan 19 · LODs: levels of detail
<!-- id: c14d2 -->

**Goal:** make lower-detail versions of a prop that UE5 swaps in at a distance, and know when Nanite makes them unnecessary.

**Time:** about 40 minutes for the lesson and 30 for the drill.

#### Watch and read first
{{RES}}

#### Steps
1. **What LODs are.** LOD0 is the full mesh. LOD1 and LOD2 have fewer triangles and swap in as the object gets smaller on screen. Viewers never notice; the frame rate does.
2. **Nanite first.** UE5's Nanite handles detail automatically for opaque static meshes, so Nanite-enabled kit pieces and heroes don't need hand-made LODs. (Walls you vertex paint per copy in UE5 stay non-Nanite, since per-copy paint doesn't show on Nanite meshes; give those LODs if they're heavy.) LODs still matter for meshes that don't use Nanite in your project (often foliage cards, translucent glass, and some masked materials, depending on your UE5 version and settings).
3. **Make LOD1.** Duplicate the mesh, add a *Decimate* modifier (Collapse), Ratio about 0.5. Watch the silhouette and UV seams; raise the ratio if the outline breaks. Apply it.
4. **Make LOD2.** Duplicate again, Ratio about 0.25. Small props can drop details completely at LOD2 (bolts, thin slats).
5. **Keep UVs and materials.** Decimate keeps UVs on most meshes; check with the UV Grid. All LODs use the same material and textures.
6. **Name and export.** `SM_MillAlley_P13_Barrel_LOD1`, `_LOD2`, each exported as its own FBX with the same pivot as LOD0.
7. **Import in UE5.** Open the LOD0 mesh in the Static Mesh Editor. In Details > *LOD Settings*, set the number of LODs, then use *LOD Import* to import each LOD file. Use the viewport's LOD dropdown to check each.
8. **Or let UE5 do it.** The Static Mesh Editor can also generate LODs automatically (*LOD Settings* > reduction). Hand-made LODs give you control; auto LODs are fine for simple props.

#### Common mistakes
- LODs that pop visibly. The silhouette changed too much; raise the ratio.
- LODs with a different pivot. They jump when they swap.
- Making LODs for Nanite meshes. Check *Enable Nanite* first; if it's on, you don't need them.

#### Drill: LODs for one prop (30 minutes)
Make LOD1 and LOD2 for your barrel or a plank pile and import them into UE5.

**Pass when:** LOD1 is about half and LOD2 about a quarter of LOD0's triangles, the silhouette holds at the distance each switches in, and UE5 shows all three in the LOD dropdown.

#### Use it on Mill Alley
Today is material and asset polish: tiling break-up, roughness ranges and the greyscale value check. Add LODs only to the non-Nanite meshes you find while polishing.

### Fri Jan 22 · Collision
<!-- id: c14d3 -->

**Goal:** give meshes simple collision so the alley is walkable, and know when to use simple vs complex collision.

**Time:** about 40 minutes for the lesson and 30 for the drill.

#### Watch and read first
{{RES}}

#### Steps
1. **What collision is.** An invisible, simple shape the physics and player use instead of the real mesh. Simple shapes are fast; the full mesh as collision is slow.
2. **Simple collision from Blender.** Model low-poly convex shapes around the mesh (boxes mostly). Name each `UCX_<MeshName>_00`, `_01`… exactly matching the mesh name, and export them in the same FBX as the mesh. UE5 recognises them as collision.
3. **Convex only.** Each UCX shape must be convex (no dents or holes), and several shapes on one mesh shouldn't overlap. An L-shaped wall needs two boxes side by side, not one L.
4. **Other prefixes.** `UBX_` for boxes, `USP_` for spheres, `UCP_` for capsules, with the same naming pattern.
5. **Or make it in UE5.** The Static Mesh Editor's *Collision* menu adds boxes, spheres or auto convex hulls. Quick for simple props.
6. **Simple vs complex.** *Simple* = your UCX shapes (used for walking and physics). *Complex* = the full mesh (used for precise traces). For walls and ground, simple boxes are plenty. Use *Use Complex Collision as Simple* only for rare cases like an uneven ground you walk on.
7. **What needs it.** Walls, ground, stairs and big props the player can bump. The skybridge, out of reach, needs only a couple of boxes. Tiny debris and foliage need none (turn collision off for them).
8. **Check it.** In the Static Mesh Editor, Show > *Simple Collision*. In the level, walk the alley in Play mode.

#### Common mistakes
- UCX names that don't match the mesh name. UE5 ignores them.
- Concave collision shapes. They're turned into wrong shapes or ignored. Split into convex parts.
- Collision on every pebble. It costs performance and snags the player.

#### Drill: collision for the skybridge and two props (30 minutes)
Make UCX collision for the skybridge (two or three boxes), a plank pile and the barrel, and check them in UE5.

**Pass when:** Show > Simple Collision outlines each mesh closely with convex shapes, the names match, and in Play mode you can't walk through the props.

#### Use it on Mill Alley
Today is optimization: Nanite and LODs, texture streaming, collision, and profiling with `stat unit` and the GPU Visualizer. "Done when" is a stable frame rate in a walkthrough.

### Sat Jan 23 · Kit audit and the kit layout
<!-- id: c14d4 -->

**Goal:** check every module against the project's rules, then lay the kit out with labels and dimensions for the kit sheet.

**Time:** about 30 minutes for the lesson; the drill runs as long as the kit needs.

#### Watch and read first
{{RES}}

#### Steps
1. **Texel density.** Open each module file and run Texel Density Checker's *Calculate TD* on every visible face. Near surfaces: 10.24 px/cm; upper floors and background: 5.12.
2. **Triangle counts.** Read each module's count from Statistics and compare it with the plan's budget table.
3. **Naming.** Every asset follows `SM_MillAlley_<Family>_<Piece>_<W>x<H>`; textures `T_…`; materials `M_…` or `MI_…`.
4. **A spreadsheet.** Record density, triangles and naming in the tracker spreadsheet, one row per module. Fix anything out of range.
5. **Lay out the kit.** In a new Blender scene (or UE5 level), place every module on a grid in family rows (A, B, C, D), with even spacing.
6. **Labels.** For each piece, a Text object (Shift+A > Text) with its ID and size, e.g. "A01 · 400 × 400", rotated to face the camera. Add a 180 cm figure at the end of a row for scale.
7. **Assembled examples.** Next to the rows, build two walls from the same pieces arranged differently to show the kit's flexibility.

#### Common mistakes
- Auditing from memory. Check every file; small mistakes hide in modules you made early.
- Labels too small. They must read in a downsized ArtStation image.
- Missing the scale figure. Viewers judge size from people.

#### Drill: the full kit layout (open-ended)
Audit every module and build the labelled kit layout with a scale figure and two assembled walls.

**Pass when:** every module meets density, budget and naming (or has a written reason), every piece has a readable ID and size label, and the layout includes a 180 cm figure.

#### Use it on Mill Alley
Today you audit texel density, wireframes and naming, and build a kit breakdown level with every module laid out. The drill and the plan's task are the same job; do the layout wherever you'll shoot it (UE5 matches the final renders best).

### Sun Jan 24 · Review: final kit audit
<!-- id: c14d5 -->

**Goal:** sign off the kit before the final renders.

**Time:** about 45 minutes.

#### Steps
1. **Run the audit sheet.** Every row green, or with a written reason.
2. **Shoot a test.** Render the kit layout once, at final resolution, and check that labels and wireframes read at ArtStation's display size.
3. **Lock.** Commit everything to source control with a "kit locked" message.

#### Use it on Mill Alley
Today is final polish in Camera 1, locking the scene and Review 14. For the standard check, the kit sheet needs dimensions and a scale figure, as Indian street and Le Chlanko show.
