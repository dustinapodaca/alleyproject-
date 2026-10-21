## Week 7 · Nov 30 to Dec 6 · Hero assets and catch-up

This week's goal is to sculpt masonry, damage metal convincingly and break glass, then use the two buffer days to close any gaps from Weeks 1 to 6.

### Mon Nov 30 · Sculpting masonry and chipped edges
<!-- id: c7d1 -->

**Goal:** sculpt bricks and stone with believable chips and wear, for the chimney's corbelled cap.

**Time:** about 60 minutes for the lesson and 40 for the drill.

#### Watch and read first
{{RES}}

#### Steps
1. **Start with a block.** Model one brick at real size (about 23 × 11 × 7.5 cm) with a small bevel. Masonry sculpts best from a simple block with even density.
2. **Voxel Remesh.** In Sculpt Mode, the *Remesh* panel in the header (or R to set the voxel size, then Ctrl+R) rebuilds the mesh as an even grid of small quads. Use a voxel size around 2–3 mm for a brick. Every face is now the same size, which brushes need.
3. **Chip the edges.** Use *Lasso Trim* to slice off a corner (it cuts a clean flat break), then *Scrape/Fill* lightly over the break to soften it. Hold Ctrl with it to dig small pits.
4. **Wear the faces.** *Clay Strips* (inverted with Ctrl) carves shallow dips; *Draw* with a low strength adds small pocks. Old brick is worn most on its exposed arrises (edges) and faces, not in the mortar bed.
5. **Remesh again when needed.** Big trims leave uneven faces; remesh to tidy them, at the cost of softening fine detail. Do big shapes, remesh, then fine detail last.
6. **Make variants fast.** Duplicate a finished brick and change one or two chips. Five bricks are enough to build a corbel course by rotating and flipping them.
7. **Corbel cap.** Model the cap as stepped rings of blocks (each course a little wider than the one below), then sculpt chips along the course edges where weather hits hardest. Bake it onto a simple low poly like the skybridge.

#### Common mistakes
- Chips that look like bites. Real chips are flat breaks; use trims, not round brushes.
- Every edge chipped equally. Wear is uneven; leave some edges sharp.
- Remeshing at the end. It wipes out fine detail; remesh before the last pass.

#### Drill: five chipped bricks (40 minutes)
Sculpt five different bricks from one base: two lightly worn, two with corner chips, one badly broken.

**Pass when:** each reads as a different brick from 1 m away in a MatCap, chips have flat break faces, and at least one edge on each brick stays crisp.

#### Use it on Mill Alley
Today you model the chimney and red end building and sculpt the corbelled cap. Use your five bricks as the stamp set for the cap's courses; that also gives you P04 loose bricks for Week 8.

### Tue Dec 1 · Hard-surface damage: dents and torn metal
<!-- id: c7d2 -->

**Goal:** dent and tear sheet metal for the rusted loading doors.

**Time:** about 50 minutes for the lesson and 40 for the drill.

#### Watch and read first
{{RES}}

#### Steps
1. **A panel with enough geometry.** Make a plane at the door panel's size and subdivide it (Edit Mode > right-click > Subdivide, or a Grid primitive) so it has vertices to dent. Add Solidify (Thickness 0.003, 3 mm sheet steel).
2. **Overall waviness with Displace.** Add a *Displace* modifier above Solidify. Click *New* to make a texture; in the Texture properties set it to *Clouds* with a large size. Keep Strength small (0.005–0.01). Sheet metal is never perfectly flat.
3. **Local dents.** For a dent where something hit the door, select a vertex, turn on Proportional Editing (O) and move it inward, scrolling to set the dent's size. A sharp dent: small falloff. A broad bow: large falloff.
4. **Torn edges with the Knife.** Press K and click a jagged path along a corner (zigzags of uneven length). Enter to confirm. Select the corner piece and delete it, or separate it (P) to bend it outward with proportional editing.
5. **Bend the flap.** Select the torn flap's vertices, place the 3D cursor on the bend line, set the pivot to *3D Cursor* (the pivot menu in the header, or the period key pie) and rotate it outward.
6. **Supporting details.** Rivets (small cylinders arrayed along the edge), hinges and a frame from T02 trims make damage believable by contrast.
7. **Bake or keep.** For a unique 2K door (H6), use this as the high poly and bake it onto a simple low poly. Dents with large shapes can stay in the low poly geometry.

#### Common mistakes
- Displace with no effect or spikes. Too few vertices for subtle waves, or Strength too high.
- Clean, straight tears. Real torn metal zigzags and curls; vary every segment.
- Dents everywhere. A few big story-telling hits read better than uniform noise.

#### Drill: one dented door panel (40 minutes)
Make a 120 × 200 cm steel door panel with overall waviness, two dents, one torn and bent corner, and a row of rivets.

**Pass when:** the panel catches light unevenly in Rendered view with a low light, the tear zigzags, and the bent flap has visible thickness.

#### Use it on Mill Alley
Today you texture the chimney cap and model and texture the H6 rusted loading doors (they sit in the 240 × 320 cm A05 opening). The drill is one leaf of those doors.

### Fri Dec 4 · Breaking glass with Cell Fracture
<!-- id: c7d3 -->

**Goal:** smash window panes into shards with the Cell Fracture extension and place them convincingly.

**Time:** about 40 minutes for the lesson and 30 for the drill.

#### Watch and read first
{{RES}}

#### Steps
1. **Install it.** Edit > Preferences > Get Extensions, search "Cell Fracture", Install. It's free.
2. **Make a pane.** A plane at the pane's size (about 25 × 35 cm for the steel windows), with Solidify applied for 4–6 mm thickness. Cell Fracture needs a closed mesh.
3. **Run it.** With the pane selected, run Cell Fracture from the Object menu's *Quick Effects*. Set *Source Limit* to about 20 for 20 shards.
4. **Control where it breaks.** Draw annotation strokes (the Annotate tool in the toolbar) where the impact was, and choose the annotation (*Grease Pencil* / *Annotation*) source. Shards cluster where you drew, like a real impact point.
5. **Check the output.** Each shard becomes its own object. Hide the original pane.
6. **Make the break story.** Delete some shards so there's a hole; leave jagged ones still in the frame; move a few to the sill and ground below, rotated and lying flat.
7. **Join for export.** Select the shards that stay together (in the frame) and join them (Ctrl+J). Loose ones become P10 scatter props.

#### Common mistakes
- "Mesh not manifold" or no shards. Apply Solidify first; the pane must be closed.
- Too many shards. Hundreds of tiny pieces cost triangles and read as dust. Twenty is plenty.
- Shards floating. Use snapping to *Face* when placing shards on the sill.

#### Drill: a smashed pane with 20 shards (30 minutes)
Fracture one pane into about 20 shards around an impact point, leave jagged pieces in the frame, and drop five onto a sill.

**Pass when:** there's a clear impact point, the shards in the frame are joined into one object, five lie flat on the sill with no floating, and the total is under 1,000 triangles.

#### Use it on Mill Alley
Today you make the H7 broken glazing variants and `M_Master_Glass`, assemble the H3 light well vignette and hold Review 7. Your drill feeds the broken B03 variant directly.

### Sat Dec 5 · Buffer: redo a failed or skipped drill
<!-- id: c7d4 -->

**Goal:** close the gaps from Weeks 1 to 6 before the second half starts.

**Time:** as long as you need; no new lesson.

#### Steps
1. **List your gaps.** Go through Weeks 1 to 6 in the tracker. Any drill not ticked, or ticked without meeting its *Pass when*, goes on today's list.
2. **Priority order.** These carry into everything later, so redo them first if they're on your list:
   - The 4 × 4 m wall round trip to UE5 (Week 1, Sat): scale and pivots.
   - Two A01 walls that snap (Week 4, Fri): modular edges and UVs.
   - Unwrap a beam onto a strip at 10.24 px/cm (Week 4, Tue): texel density.
   - Bake one brick variant and check it tiles (Week 3, Fri): baking.
   - Bake the test plank with no artefacts (Week 6, Sat): Marmoset baking.
3. **Redo, don't reread.** Do the drill from a blank file, without the old file open, against its pass check.
4. **Write one line per drill** in the tracker's notes: what went wrong last time, and what fixed it.

#### Use it on Mill Alley
The Mill Alley plan's buffer today is for anything late from Weeks 3 to 7. Do the kit or hero task first if it's behind; drills second.

### Sun Dec 6 · Buffer: free practice
<!-- id: c7d5 -->

**Goal:** rest your schedule or build speed; no new lesson.

**Time:** optional.

#### Steps
1. **If you're behind,** use today for the Mill Alley plan's catch-up.
2. **If you're on track,** pick one speed drill and time it:
   - Block out a new building facade from a photo in 30 minutes (Week 2 skills).
   - Model and UV a new trim-sheet piece in 20 minutes (Week 4).
   - Sculpt a damaged stone block in 20 minutes (Week 7).
3. **Learn the shortcuts you still look up.** Keep a list of every menu you opened by hand this week; find its shortcut in the Blender Manual and use it all next week.

#### Use it on Mill Alley
Everything should be in the scene by now: kit, heroes, glazing. Take a dated progress screenshot of Camera 1 for the process sheet.
