## Week 5 · Nov 16 to 22 · Kit families B, C and D

This week's goal is to finish the kit: corners that wrap brick cleanly, window variants from one base, stairs on the step grid, pipes and rails from curves, and ground tiles within budget.

### Mon Nov 16 · Corners, seams and UVs that wrap
<!-- id: c5d1 -->

**Goal:** make corner pieces where the brick coursing wraps around the corner without a jump.

**Time:** about 60 minutes for the lesson and 30 for the drill.

#### Watch and read first
{{RES}}

#### Steps
1. **Why corners are hard.** Two wall faces meet at 90°. If each face is unwrapped separately, their brick courses start at different heights and the corner shows a step.
2. **Model the corner.** B08 is 50 × 380 cm: an L-shape 50 cm along each wall, 30 cm thick, with its pivot at bottom-left-back like every module. Bevel the outside corner 1–2 cm.
3. **Unwrap both faces as one strip.** Put the seam on an edge the camera won't see (the back), not on the corner itself. Unwrap, then straighten. The two faces now sit side by side in UV space, so the courses run around the corner.
4. **Line up V with the walls.** The bottom edge of the corner's UVs must sit at the same V value as the bottom of B01's UVs (V 0 at the floor) and use the same density. Then every course meets.
5. **Mirroring.** For symmetric pieces, model half and use a Mirror modifier. Mirroring is fine for brick and stone; avoid it on anything with readable text or obvious direction (stains running up).
6. **Vertical joins between storeys.** The right building's 380 cm storey isn't a whole number of 8.33 cm courses (45.6), so a module stacked on another can show a half-course step. That's why the B07 floor band sits on that line: it hides the join. Plan your bands for exactly this.
7. **Inner corners.** A06 inner corners are the same idea turned inside out. The seam can sit right in the inside corner, where shadow hides it.

#### Common mistakes
- Seams on the visible corner. Move them to the back or the top.
- Corners at a different texel density from the walls. Run *Calculate TD* on both.
- Forgetting the bevel on the corner. A bevelled wall meeting a sharp corner looks wrong in raking light.

#### Drill: outer corner B08 against B01 with continuous coursing (30 minutes)
Model B08, unwrap it as one strip, and place it against a B01 wall with the painted brick material.

**Pass when:** from any angle the brick courses run unbroken around the corner, the snap test passes, and Calculate TD matches B01.

#### Use it on Mill Alley
Today you model B01, B07, B08 and B09; the snap test is the "done when". Do B07 (floor band) right after the drill, since it hides the storey joins.

### Tue Nov 17 · Variants from one base: linked duplicates, Knife and Separate
<!-- id: c5d2 -->

**Goal:** make intact, broken and gutted versions of the steel window from one base, sharing one UV layout.

**Time:** about 60 minutes for the lesson and 40 for the drill.

#### Watch and read first
{{RES}}

#### Steps
1. **Model the base once.** B03 is a steel window insert 140 × 220 cm with a grid of panes about 25 × 35 cm. Model the frame and glazing bars, then the glass as a separate object. UV the frame onto the T02 metal strips and the glass onto its own small layout.
2. **Shift+D vs Alt+D.** Shift+D makes a separate copy you can edit freely; Alt+D makes a linked copy that shares the mesh. Use Shift+D for variants (their shapes will differ) and Alt+D for identical repeats (the same frame in three bays).
3. **Broken variant.** Duplicate with Shift+D. Delete some glass panes (select faces, X > Faces). On others, use the Knife (K): click points across a pane to draw a crack, Enter to confirm. Select one piece of the cracked pane and press P > *Selection* to make it a separate shard you can move.
4. **Bend a bar.** Turn on *Proportional Editing* (O). Select a glazing bar's vertices and move them: nearby vertices follow with falloff. Scroll while moving to change the falloff size.
5. **Gutted variant.** Duplicate again, delete all the glass and most glazing bars, leaving the frame and a few bent stubs.
6. **UVs carry over.** Deleting, cutting and moving faces keeps their UVs, so all three variants share the same texture layout.
7. **Name the set.** `SM_MillAlley_B_WindowSteel_140x220_Intact`, `_Broken`, `_Gutted`. Same pivot, same size, so they swap in UE5 without moving.

#### Common mistakes
- Using Alt+D for variants. Editing one breaks the others. Check with the user count number next to the mesh name in Object Data properties.
- Knife cuts that don't go through. Press C while cutting to cut through all faces, or make sure each click lands on an edge.
- Variants with different pivots. They'll jump when you swap them in the level.

#### Drill: three B03 variants sharing one UV layout (40 minutes)
Make the intact, broken and gutted windows.

**Pass when:** all three have the same outer size and pivot, show the same texture placement on the frame, and the broken one has at least five separate shards and one bent bar.

#### Use it on Mill Alley
Today you model the B02 window bay and the three B03 variants, and the "done when" is swapping variants cleanly. Test the swap in UE5: right-click a placed window > *Replace Selected Actors with* the other variant; nothing should move.

### Fri Nov 20 · Stairs and the light well on the step grid
<!-- id: c5d3 -->

**Goal:** build stairs to exact riser and tread sizes with an Array, and fit them into the light well.

**Time:** about 45 minutes for the lesson and 30 for the drill.

#### Watch and read first
{{RES}}

#### Steps
1. **Know the numbers.** The plan's light well: 120 cm wide, about 200 cm drop, 11 risers of 18 cm and treads of 28 cm. That's a 198 cm drop and 308 cm of run, leaving a landing in the 380 cm length.
2. **One step.** Make a box 120 × 28 × 18 cm with its origin at the top-front edge. Add a small bevel to the nosing (the front edge).
3. **Array the flight.** Add an Array: *Relative Offset* off, *Constant Offset* on with Y 0.28 and Z −0.18, Count 11. That's the whole flight, each step exactly one tread back and one riser down.
4. **Fill underneath.** Give the step some height below so the flight is solid, or model a sloped soffit. Hidden faces can be deleted to save triangles.
5. **Snap to the step grid.** Temporarily set the grid scale to the riser height, or use typed values, to place the landing exactly at −1.98 m.
6. **Walls and landing.** Build the light well walls (concrete) and landing as separate modules with the same pivot rule. Leave room for the C05 handrail posts every 150 cm.
7. **Check with a figure.** Drop the 180 cm figure on the stairs. If the steps look like a ladder or a ramp, the numbers are wrong.

#### Common mistakes
- Using Relative Offset for stairs. It moves by the whole step size, including any bevel, and the numbers drift. Use Constant Offset.
- Forgetting the drop doesn't divide evenly. 11 × 18 = 198 cm, not 200. Use 198 everywhere.
- Steps floating off the landing. Check the last step's bottom with N > Item.

#### Drill: an 11-step stair that matches the plan (30 minutes)
Build the B06 flight and landing inside a 120 × 380 cm light well.

**Pass when:** there are 11 risers of exactly 18 cm and treads of exactly 28 cm (Edge Length overlay), the bottom tread meets the landing at −1.98 m, and the figure walks it convincingly.

#### Use it on Mill Alley
Today you model B04 door bay, B05 ledge and B06 light well, and the right wall becomes fully kit-built. The light well is part of hero H3, so give its edges good bevels: it's a foreground close-up later.

### Sat Nov 21 · Curves for pipes, gutters and rails
<!-- id: c5d4 -->

**Goal:** draw pipes and rails as curves, give them thickness, bend arrays along them, and convert them to game meshes.

**Time:** about 60 minutes for the lesson and 30 for the drill.

#### Watch and read first
{{RES}}

#### Steps
1. **Add a Bezier curve.** Shift+A > Curve > Bezier. In Edit Mode each point has two handles. E extrudes a new point. V changes the handle type: *Vector* gives straight segments and sharp corners, *Aligned* or *Auto* give smooth bends.
2. **Give it thickness.** Object Data Properties > Geometry > Bevel: *Round*, Depth 0.05 (a 10 cm drainpipe), Resolution 4. Tick *Fill Caps* to close the ends.
3. **Keep it light.** Under *Shape*, lower *Resolution Preview U* so curves don't become thousands of triangles. Check the count with the Statistics overlay.
4. **Draw the drainpipe.** In front view, place points straight up the wall with Vector handles, then an offset (two 45° bends) where it steps around the ledge, then a shoe at the bottom that kicks out about 45°.
5. **Curve modifier.** For things made of repeated parts (a rail with posts, a chain of brackets), model one part, add an Array to repeat it along X, then a *Curve* modifier pointing at the curve. The array bends to follow the curve.
6. **Convert to mesh.** Object > Convert > *Mesh* when the shape is final. Then unwrap the pipe with Follow Active Quads and place it on the T02 pipe strip.
7. **Snap the pieces.** Make standard lengths (100, 200, 400 cm straights, one elbow, one offset, one shoe) with pivots at their ends so they chain together in UE5.

#### Common mistakes
- A pipe that's flat or twisted. Bevel *Depth* is the radius, not the diameter; twisting comes from tilt (Ctrl+T in Edit Mode).
- Huge triangle counts. Lower the curve's resolution before converting.
- Converting too early. Keep the curve until you like the shape; you can't get it back after converting.

#### Drill: a drainpipe with an elbow and a shoe (30 minutes)
Draw a 10 cm drainpipe running 4 m up a wall with one offset and a shoe, convert it, and UV it onto a strip.

**Pass when:** it has no twists, uses under about 600 triangles, the bends are smooth, and the UV Grid shows no stretching along its length.

#### Use it on Mill Alley
Today you model Family C: beams, drainpipes, the hopper head, brackets, the handrail and gutters. "Done when" is pipes running full height with no gaps, so give every pipe piece end pivots and test the chain in UE5.

### Sun Nov 22 · Ground tiles and triangle budgets
<!-- id: c5d5 -->

**Goal:** model a ground tile with gentle unevenness that still tiles, and keep it within its triangle budget.

**Time:** about 45 minutes for the lesson and 30 for the drill.

#### Watch and read first
{{RES}}

#### Steps
1. **Start with a grid.** Shift+A > Mesh > Grid, and in the Adjust Last Operation panel set X and Y subdivisions (try 20 × 20) and Size 4 m for D01.
2. **Statistics overlay.** Overlays > *Statistics*. It shows vertices, faces and triangles for the scene and the selection. D01's budget in the plan is up to 4,000 triangles.
3. **Protect the edges.** Tiles must meet flat at their borders. In Edit Mode, select every vertex except the outer border, and in Object Data > Vertex Groups click + and *Assign* to make a group called `Inner`.
4. **Gentle displacement.** Add a *Displace* modifier, set its Vertex Group to `Inner`, click *New* texture and pick a soft noise (Clouds). Keep Strength small (0.03–0.05 m) so it's a subtle dip, not hills.
5. **By hand.** For specific dips (where puddles will sit, or worn wheel tracks), use Proportional Editing (O) and move a few vertices down.
6. **Spend triangles where they show.** Apply the modifier, then use Decimate (*Planar* mode) to merge flat areas, or dissolve edge loops away from the dips. Keep detail where the outline changes.
7. **Check the tiling.** Place four copies in a 2 × 2 grid. The borders must line up exactly in height.

#### Common mistakes
- Bumpy tile edges. Without the vertex group, borders move and copies don't meet.
- Displacement that's too strong. Real setts under mud are nearly flat; the material and decals do the rest.
- Ignoring the budget. Ground covers the whole alley; a heavy tile multiplies fast.

#### Drill: D01 under 4,000 triangles (30 minutes)
Make D01 (400 × 400 cm) with protected flat borders, a soft dip for a puddle and gentle unevenness elsewhere.

**Pass when:** Statistics shows under 4,000 triangles, four copies meet with no steps at the borders, and the dip reads in Rendered view with a low sun.

#### Use it on Mill Alley
Today you model Family D, replace the remaining greybox and hold Review 5 with a kit-only screenshot. For the standard check, lay out every finished piece on a modular-elements sheet, as Cottage and Lemon do.
