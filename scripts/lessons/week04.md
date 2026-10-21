## Week 4 · Nov 9 to 15 · Trim sheets and the first kit family

This week's goal is to make trim sheets, unwrap UVs onto them at the project's texel density, and build Family A as clean modules that snap together.

### Mon Nov 9 · Trim sheet layout and high-poly strips
<!-- id: c4d1 -->

**Goal:** plan a trim sheet in pixels and model the high-poly strips that Marmoset will bake onto it.

**Time:** about 75 minutes for the lesson and 30 for the drill.

#### Watch and read first
{{RES}}

#### Steps
1. **What a trim sheet is.** One texture made of horizontal strips (a sill profile, a lintel, a coping stone…). Any mesh can map its long faces onto a strip, so dozens of pieces share one texture. Strips repeat left to right, so a 2 m strip can cover a 6 m string course.
2. **Do the pixel maths.** At 10.24 px/cm a 2048 px sheet covers 200 cm both ways. A strip's height in pixels = its real height in cm × 10.24. Round each strip to a multiple of 8 px and leave an 8 px gap between strips for mip-mapping.
3. **Write the T01 stone plan.** For example: sill front 15 cm → 160 px; sill top 20 cm → 208 px; lintel face 30 cm → 312 px; string course 20 cm → 208 px; coping 30 cm → 312 px; kerb 15 cm → 160 px. Add the gaps and keep the total under 2048. Put the leftover space into a plain tiling stone strip.
4. **Block the strips.** Make one 2 m wide plane per strip at its exact height, stacked in your plan's order: this is the layout. Then make a single 2 × 2 m plane, the *low-poly* target the bake goes onto.
5. **Model each high-poly strip.** On each strip, model the real profile: a drip groove under the sill, a chamfer on the coping, chips and joints. Keep the strip's front face lined up with the target plane and give it some depth behind.
6. **Smooth edges.** Add a *Subdivision Surface* modifier (Ctrl+1, Ctrl+2…) and Shade Smooth. Add support edge loops (Ctrl+R close to an edge) where an edge should stay crisp, or use a Bevel modifier (3 segments) under the Subdivision.
7. **Make strips tile.** Any detail crossing the left or right edge must continue on the other side. Duplicate the finished strip 2 m to the left and right during the bake (Array, Count 3, centred) so the edges get baked from the neighbouring copy.
8. **Name for baking.** Name the high meshes `T01_high` and the target plane `T01_low` (Marmoset pairs them by these suffixes). Export each as FBX.

#### Common mistakes
- Strip heights that don't match the real sizes. Then the sill on the sheet won't fit the sill on the mesh without stretching.
- Detail that stops at the strip edge. Use the 3-copy trick in step 7.
- Strips touching each other. Bleeding between strips shows up as thin lines at distance. Keep the 8 px gaps.

#### Drill: lay out the T01 stone strips (30 minutes)
Write the T01 plan from step 3 (pixel heights, gaps, order), block every strip as a 2 m plane at its height, and model one strip fully (the sill with its drip groove).

**Pass when:** the strips add up to 2048 px or less, every strip is a multiple of 8 px, and the sill strip is smooth with crisp edges and a groove that reads from 3 m away.

#### Use it on Mill Alley
Today you model the T01 stone and T02 metal trim strips and bake them to 2048 sheets in Marmoset. Plan T02 the same way (window frame sections, pipe, rail, bracket, flat metal).

### Tue Nov 10 · UV unwrapping, trims and texel density
<!-- id: c4d2 -->

**Goal:** unwrap meshes cleanly and place their UVs on a trim strip at exactly 10.24 px/cm.

**Time:** about 75 minutes for the lesson and 30 for the drill.

#### Watch and read first
{{RES}}

#### Steps
1. **The UV Editing workspace.** Left: the UV Editor. Right: the 3D viewport in Edit Mode. Selecting faces in 3D shows their UVs on the left.
2. **A checker texture.** In the UV Editor, Image > New, Generated Type *UV Grid*. Put it on a material. Squares on the mesh should be square and the same size everywhere; that's how you spot stretching.
3. **Seams.** Seams are where the mesh is cut so it can lie flat, like the seams of a cardboard box. In edge mode, select edges and use U > *Mark Seam* (red lines). Hide seams in corners and on edges the camera won't see.
4. **Unwrap.** Select all faces (A) and press U > *Unwrap*. Islands appear in the UV Editor.
5. **Follow Active Quads.** For long strips (beams, mouldings), select one face and make it a perfect rectangle in UV space first (select its UV edges and scale with S X 0 or S Y 0 to straighten). Then select the whole strip with that face active and use U > *Follow Active Quads*. The whole strip unrolls as straight rectangles.
6. **Straighten by hand.** Select a row of UV vertices and press S Y 0 (or S X 0) to line them up perfectly.
7. **Texel Density Checker.** Install it from Edit > Preferences > Get Extensions. In the UV Editor sidebar (N), open its tab, set Texture size 2048 and the target density to 10.24 px/cm (1024 px/m; check which unit the panel uses), then *Set TD* with the islands selected. Use *Calculate TD* to check.
8. **Snap onto a strip.** With the trim sheet loaded in the UV Editor, move the island (G Y) so its height sits exactly inside the strip band. Let it run left or right past the edge: the strip tiles. Don't scale it vertically, or the density breaks.
9. **Pack only for unique textures.** U > *Pack Islands* is for meshes with their own texture (heroes, props), not for trims.

#### Common mistakes
- Using Smart UV Project on modules. It scatters islands at random sizes. Mark seams and unwrap on purpose.
- Scaling islands to "fill the square". On a trim, the strip height decides the scale; on a tiling material, the texel density does.
- Flipped islands. Mirrored text and lighting in UE5 come from mirrored UVs. Check with the UV Grid's letters.

#### Drill: unwrap a beam onto a strip at 10.24 px/cm (30 minutes)
Model a 2 m long, 30 cm deep I-beam (C01). Mark seams, unwrap with Follow Active Quads, set 10.24 px/cm with Texel Density Checker, and place its faces on a T02 strip.

**Pass when:** the UV Grid shows square cells with no stretching, Calculate TD reports 10.24 px/cm, and every island sits inside its strip band with straight edges.

#### Use it on Mill Alley
Today you make the T03 timber trim sheet and `M_Master_Trim`, and set up the texel density checker. Write your Texel Density Checker settings into the metrics sheet so every module uses the same numbers.

### Fri Nov 13 · Modular walls that snap
<!-- id: c4d3 -->

**Goal:** build wall modules with exact edges, correct pivots and light-catching bevels, so two copies meet with no gap and continuous brick.

**Time:** about 75 minutes for the lesson and 30 for the drill.

#### Watch and read first
{{RES}}

#### Steps
1. **Edges on the grid.** Every outer edge of a module lands on a 25 cm grid line. Use typed values and Absolute Grid Snap. Check with N > Item: dimensions like 4.0, 0.3 and 4.0, never 3.997.
2. **Pivot bottom-left-back.** Set the origin to the module's bottom-left-back corner (Shift+S > Cursor to Selected on that vertex, then Set Origin > Origin to 3D Cursor) and move the object to the world origin with Alt+G.
3. **Bevels that catch light.** Add a Bevel modifier, Amount 0.01–0.02, Segments 2, Limit Method *Angle*. Only the outside corners get rounded.
4. **Weighted normals.** Add a *Weighted Normal* modifier below the Bevel (Mode *Face Area*, tick *Keep Sharp*). It makes big flat faces shade flat while the small bevels shade smoothly. This is the "mid-poly" look that needs no normal-map bake.
5. **Smooth by Angle.** Object > *Shade Auto Smooth* adds a *Smooth by Angle* modifier (30°). Keep it at the bottom of the stack.
6. **World-scale UVs.** Unwrap the front face so 2 m in the world = 1 UV unit (the 2 m tile). Put the bottom-left corner of the face at UV 0, 0. Since modules are 100, 200 or 400 cm wide, every module ends on a whole or half tile, and the brick coursing continues into the next module.
7. **Check from both sides.** Two copies placed side by side: no gap, no overlap, no shading seam, and brick that lines up course for course.

#### Common mistakes
- A tiny gap or overlap between modules. A vertex is off the grid; check its global position in the Item panel.
- Dark smudges on flat faces. Missing Weighted Normal, or Smooth by Angle placed before the Bevel.
- Brick jumping half a course at the join. The UVs don't start at 0, or the density isn't exactly 10.24 px/cm.

#### Drill: two A01 walls that snap (30 minutes)
Model `SM_MillAlley_A_WallFlat_400x400` (400 × 400 cm, 30 cm deep) with bevels, weighted normals, world-scale UVs and a bottom-left-back pivot. Duplicate it, move the copy G X 4 Enter, and apply your brick material.

**Pass when:** the two walls meet with no visible seam in Material Preview, brick courses continue across the join, and the same test passes in UE5 with grid snap 25.

#### Use it on Mill Alley
Today you model A01, A02, A06 and A09 with bevels and UVs; the snap test on the 25 cm grid is the "done when". Use this drill's settings as the template for all four.

### Sat Nov 14 · Arches, mouldings and clean topology
<!-- id: c4d4 -->

**Goal:** model curved openings with clean, game-ready topology: no n-gons, no flipped faces.

**Time:** about 75 minutes for the lesson and 40 for the drill.

#### Watch and read first
{{RES}}

#### Steps
1. **Arch curve with Spin.** In Edit Mode, add a single vertex at the arch's springing point (the left end of the curve). Put the 3D cursor at the arch's centre. In front view, use the Spin tool: Angle 180°, Steps 16. You get a clean half-circle of edges.
2. **Connect it to the wall.** Select the arch edges and the matching wall edges and use Edge > *Bridge Edge Loops* (both loops must have the same number of edges), or F to fill smaller gaps. *Grid Fill* fills a hole with a clean quad grid.
3. **Circular arrays.** For repeated arch bricks or ribs, model one piece, add an Empty at the arch centre, and give the piece an Array with *Relative Offset* off and *Object Offset* set to the Empty. Rotate the Empty by 180 ÷ (count − 1) degrees on Y.
4. **Cleaning booleans.** After applying a boolean, fix its long triangles: J connects two selected vertices with an edge, K is the Knife for drawing new edges, and X > *Dissolve Edges* removes extra ones without leaving holes.
5. **Find n-gons.** Select > Select All by Trait > *Faces by Sides*, Number of Vertices 4, Type *Greater Than*. Everything selected has more than four sides. Cut them into quads or triangles.
6. **Face Orientation.** Overlays > *Face Orientation*. Blue faces point outward, red faces are backwards. Fix red ones with Mesh > Normals > *Recalculate Outside* (Shift+N).
7. **Mouldings along a path.** For a string course, model its cross-section once and extrude it the module's length; give its front faces trim UVs.

#### Common mistakes
- Bridge Edge Loops failing. The loops need the same number of edges; add or remove cuts until they match.
- A wobbly arch. The Spin centre wasn't exactly at the arch centre. Snap the cursor to a vertex first.
- Red faces in Face Orientation. Backwards faces render black or invisible in UE5.

#### Drill: a clean A03 arch (40 minutes)
Model A03 (300 × 600 cm): wall, round-headed recess 240 cm wide, 25 cm deep, with brick infill at the back. No booleans this time: build the curve with Spin and connect it with Bridge Edge Loops or Grid Fill.

**Pass when:** *Faces by Sides > 4* selects nothing, Face Orientation is all blue, the curve is a clean half-circle, and the module snaps to A01 with no gap.

#### Use it on Mill Alley
Today you model A03, A05 door surround, A07 string course and A08 parapet and get them into the engine with materials. A05 is the same method as your drill, with the 240 × 320 cm loading door opening.

### Sun Nov 15 · The Asset Browser and batch export
<!-- id: c4d5 -->

**Goal:** turn modules into drag-and-drop assets and export a whole family with correct names in one click.

**Time:** about 45 minutes for the lesson and 25 for the drill.

#### Watch and read first
{{RES}}

#### Steps
1. **One collection per module.** Put each module in its own collection named exactly like the mesh (`SM_MillAlley_A_WallFlat_400x400`), inside a family collection (`Kit_A`).
2. **Mark as asset.** Right-click the object in the Outliner > *Mark as Asset*. Blender makes a preview thumbnail; right-click > *Generate Preview* to refresh it.
3. **Asset Browser.** Change any editor to *Asset Browser* (editor type menu, top left of the area). Pick *Current File* to see this file's assets. Make catalogs (folders) on the left, such as Kit A, Kit B, Props.
4. **Use them from any file.** Edit > Preferences > File Paths > Asset Libraries: add the folder where your kit `.blend` files live. Now every file can drag modules in from that library.
5. **Drag-build.** Drag a module into the viewport. Snapping works while dragging. Build a test wall from several modules.
6. **Batch export.** Give each module collection a Collection Exporter (Collection Properties > Exporters > Add Exporter > FBX legacy) using your UE5 settings, with the file path set to `//Export/` + the module name. File > Export All Collections writes every module in one go.
7. **Import the set into UE5.** Select all the FBXs and import them together into a `Kit_A` folder.

#### Common mistakes
- Assets that don't appear in other files. The file must be saved inside a folder registered in Asset Libraries.
- Exported names that don't match. UE5 takes the name from the object or file; keep collection, object and file names identical.
- Exporting the whole scene into one FBX. That gives one giant mesh in UE5. One file per module.

#### Drill: drag-build a wall from the Asset Browser (25 minutes)
Mark your A01, A02, A03 and A09 as assets in a `Kit A` catalog, open a new file, and build a 12 m wall section by dragging them from the library.

**Pass when:** the wall builds with no gaps using only drag and snap, and Export All Collections writes one correctly named FBX per module.

#### Use it on Mill Alley
Today you model the A04 window, replace the left greybox with the kit and hold Review 4. For the standard check, lay Family A on a neutral backdrop with each piece's dimensions written beside it, as Le Chlanko does.
