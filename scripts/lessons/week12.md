## Week 12 · Jan 4 to 10 · Presentation scenes and cleanup

This week's goal is to light small showcase scenes well, model wet ground details, and clean every mesh before the final lighting and renders.

### Mon Jan 4 · Presentation lighting: HDRI, three-point, EEVEE vs Cycles
<!-- id: c12d1 -->

**Goal:** light a small vignette so it looks like a finished portfolio piece.

**Time:** about 50 minutes for the lesson and 40 for the drill.

#### Watch and read first
{{RES}}

#### Steps
1. **HDRI for ambient light.** World Properties > Surface > Color > *Environment Texture* and open an HDRI from Poly Haven. Add a *Mapping* node (Ctrl+T with Node Wrangler) to rotate it with Z rotation so the brightest part of the sky lights your subject from the side.
2. **Hide the HDRI if needed.** To light with the HDRI but show a plain background, go to Render > Film and tick *Transparent*, then put a colour behind it in compositing, or use a backdrop sweep.
3. **Add three-point lights on top.** Key, fill and rim area lights (Week 6) give control the HDRI can't. The HDRI gives soft fill and reflections; the lights shape the subject.
4. **EEVEE or Cycles.** EEVEE renders in seconds: great for iterating and most prop shots. Cycles traces light properly: better for soft bounce light, glass and fine sculpt detail. Set up in EEVEE, check final frames in Cycles.
5. **Cycles settings.** Render Properties: Samples around 256 with *Denoise* on. Light Paths: defaults are fine.
6. **Depth of field.** Camera properties > *Depth of Field*: pick a *Focus Object* (the hero prop) and an F-Stop around 2.8–5.6 for gentle background blur. Don't overdo it; environment art reviewers want to see the work.
7. **Compare.** Render the same frame in EEVEE and Cycles and note the differences.

#### Common mistakes
- A strong HDRI and strong lights fighting. Turn the HDRI's Strength down when the lights take over.
- Over-blurred backgrounds. Keep the subject and its surroundings readable.
- Judging lighting in Material Preview. Use Rendered view.

#### Drill: a small prop showcase vignette (40 minutes)
On a 2 × 2 m patch of your ground tile, arrange a few props (barrel, planks, rubble, weeds) and light it with an HDRI plus a key and rim light. Render it in EEVEE and Cycles.

**Pass when:** the props separate from the background, the rim light outlines the silhouettes, nothing is pure black or pure white, and you can say which renderer you'd use for the final shot and why.

#### Use it on Mill Alley
Today you dress the alternate cameras with P2 props, glass, litter and paper ("no empty corners"). This vignette becomes the separate prop showcase scene.

### Tue Jan 5 · Puddle inserts and wet surfaces
<!-- id: c12d2 -->

**Goal:** model a shallow puddle insert that sits flush with the ground tile and reads as water.

**Time:** about 40 minutes for the lesson and 30 for the drill.

#### Watch and read first
{{RES}}

#### Steps
1. **Where puddles form.** In low points: dips in the ground tile (the dip you made in Week 5), along wall bases and in wheel ruts.
2. **The outline.** D06 is about 150 × 100 cm. Add a Circle with 24–32 vertices, fill it (F), and move edge vertices with proportional editing into an irregular, natural shape.
3. **Flush edges.** The outline must sit exactly on the ground surface. Use snapping to *Face* (*Project Individual Elements* on) and move the edge vertices onto D01 so there's no gap or step.
4. **A shallow dip.** Inset the inner faces a few times (I) and lower them 2–3 cm with proportional editing. Puddles are shallow.
5. **The water surface.** A separate flat plane cut to the same outline, set just below the rim (about 1 cm). Give it a dark base colour, Roughness about 0.02 and a subtle ripple normal. In UE5 it reflects the sky and walls via Lumen.
6. **Wet edges.** The ground around a puddle is wet too: a ring of darker, glossier surface. Use vertex paint blue (the wet channel) or an X07 decal around the insert.
7. **Pivot and export.** Pivot at the centre of the base, name `SM_MillAlley_D_PuddleInsert_150x100`.

#### Common mistakes
- Puddles floating or sunk too deep. Snap the rim to the ground surface.
- Perfect ovals. Real puddle edges are irregular.
- No wet halo. Without it, the water looks pasted on.

#### Drill: one D06 puddle insert (30 minutes)
Model a puddle insert into the dip on your D01 tile, with a water plane and a wet halo.

**Pass when:** the rim meets the ground with no visible step from Camera 1's height, the water plane reflects the sky in Rendered view, and the shape is irregular.

#### Use it on Mill Alley
Today is puddles and wetness: X07 decals, D06 inserts and wet roughness on the ground. "Done when" is puddles reflecting the sky in UE5.

### Fri Jan 8 · Buffer
<!-- id: c12d3 -->

**Goal:** no lesson today.

#### Steps
1. Use the time for the Mill Alley plan, or redo any unfinished drill from Weeks 8 to 12.

#### Use it on Mill Alley
The Mill Alley plan is also on buffer today.

### Sat Jan 9 · Mesh cleanup
<!-- id: c12d4 -->

**Goal:** find and fix the hidden mesh problems that cause shading errors, bad bakes and lighting bugs in UE5.

**Time:** about 40 minutes for the lesson; the drill runs as long as your kit needs.

#### Watch and read first
{{RES}}

#### Steps
1. **Merge by Distance.** In Edit Mode, select all and use Mesh > Clean Up > *Merge by Distance* (or M > *By Distance*). It welds duplicate vertices, a common result of extrudes you cancelled. The report at the bottom tells you how many were removed.
2. **Recalculate normals.** Select all and press Shift+N (*Recalculate Outside*). Then check with the Face Orientation overlay: everything blue.
3. **Non-manifold geometry.** Select > Select All by Trait > *Non Manifold*. It finds holes, edges shared by more than two faces, and loose edges. Holes on visible surfaces must be filled; edges at the back of a module that touches a wall can be fine.
4. **Loose geometry.** Mesh > Clean Up > *Delete Loose* removes stray vertices and edges that aren't part of any face.
5. **Degenerate faces.** Mesh > Clean Up > *Degenerate Dissolve* removes zero-area faces that break normals and bakes.
6. **Re-check after.** Re-run the snap test, re-check texel density and triangle counts.
7. **Make a checklist file.** List every kit file and tick each step for each one. Then reimport the fixed meshes into UE5 (same names, same pivots).

#### Common mistakes
- Merge by Distance with too high a distance. It can collapse small bevels; keep it at the default (0.0001 m).
- Recalculating normals on intentionally open meshes. Check visually after.
- Fixing in UE5. Fix the source in Blender and reimport, or the next export brings the bug back.

#### Drill: clean every kit file (open-ended)
Run steps 1 to 5 on every module, hero and prop file and reimport them.

**Pass when:** every file's Merge by Distance reports 0 removed on a second run, Face Orientation is all blue, there's no non-manifold geometry on visible surfaces, and every reimported asset still sits in the same place in UE5.

#### Use it on Mill Alley
Today is the full walkthrough: fix floating objects, seams and repeated props, and Review 12. Your drill is half of that fix list. For the standard check, have the separate prop showcase scene ready, as Courtyard does.

### Sun Jan 10 · Buffer
<!-- id: c12d5 -->

**Goal:** no lesson today.

#### Steps
1. Use the time for the Mill Alley plan, or keep going with the cleanup drill if your kit is large.

#### Use it on Mill Alley
The Mill Alley plan is also on buffer today. Lighting starts tomorrow, so the scene should be clean.
