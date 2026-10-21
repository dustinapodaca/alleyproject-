## Week 8 · Dec 7 to 13 · Props and debris

This week's goal is to make props fast: variants by randomizing, rubble with physics, cables with Geometry Nodes, cheap debris on shared atlases, and a prop sheet with triangle counts.

### Mon Dec 7 · Fast props: random variants and Simple Deform
<!-- id: c8d1 -->

**Goal:** make many convincing timber variants quickly, and warp plywood with a modifier.

**Time:** about 45 minutes for the lesson and 30 for the drill.

#### Watch and read first
{{RES}}

#### Steps
1. **One good base.** Model a plank at the plan's size (15 × 5 × 240 cm) with a small bevel and loop cuts every 20 cm along its length, so it can bend. UV it onto the T03 timber strip.
2. **Duplicate and vary.** Shift+D five copies. Give each a different change: cut an end at an angle (Knife or Bisect), snap one in two, chip a corner, shorten one.
3. **Randomize Transform.** Select several copies, Object > Transform > *Randomize Transform*. Small values only: Location 0.02, Rotation 3°, Scale 0.05. It breaks the "copy-paste" look when they lie in a pile.
4. **Simple Deform.** Add Modifier > Deform > *Simple Deform*. *Bend* curves the mesh, *Twist* twists it, *Taper* narrows one end. Set the axis and a small angle (5–15°). It bends around the object's origin, so move the origin to change where the bend happens.
5. **Warp the plywood.** P01 is 122 × 244 × 1.8 cm. Subdivide it along both directions, add Simple Deform Bend on one axis and a second Simple Deform on the other at a smaller angle. Plywood bows and curls at the corners when wet.
6. **Delamination.** Duplicate a corner region of the top face (Shift+D, P to separate) and lift it slightly with proportional editing: the top ply peeling away.
7. **Apply when happy.** Apply the modifiers before export so the shape is fixed.

#### Common mistakes
- Simple Deform does nothing or kinks. The mesh needs loop cuts along the bend direction.
- Randomizing scale too much. Planks of wildly different thickness look wrong; real timber is a standard size.
- Bending around the wrong point. Move the origin, or set an empty as the *Origin* in the modifier.

#### Drill: six plank variants in 30 minutes
From one base plank, make six variants: two straight, two warped (Simple Deform), one snapped, one with an angled end.

**Pass when:** done within 30 minutes, all six share the same UVs and material, and in a pile none looks like an obvious copy.

#### Use it on Mill Alley
Today you make P01 plywood, P02 planks and P03 offcuts and place them in a prop gallery level. P03 offcuts are just your snapped variants cut shorter.

### Tue Dec 8 · Rubble: fracturing, physics piles and shared atlases
<!-- id: c8d2 -->

**Goal:** make natural-looking rubble clusters that share one texture atlas.

**Time:** about 60 minutes for the lesson and 40 for the drill.

#### Watch and read first
{{RES}}

#### Steps
1. **Pieces.** Start from your five sculpted bricks (Week 7). Make half bricks and chunks by running Cell Fracture on a brick (Source Limit 3–5), and keep the best pieces.
2. **Drop them with physics.** Select the pieces and use Object > Rigid Body > *Add Active*. Select the ground plane and *Add Passive*. Stack the pieces loosely above the ground and press Space to play: they fall and settle naturally.
3. **Freeze the result.** At a frame you like, select the pieces and use Object > Rigid Body > *Apply Transformation*. Then remove their rigid bodies.
4. **Add fill.** Small chunks and a low mound of mud/mortar dust underneath tie the pile to the ground.
5. **Shared atlas.** Join every rubble piece into one object (Ctrl+J), unwrap, and use *Pack Islands* so they all share one texture. If you need them separate again, P > *By Loose Parts*: each piece keeps its spot on the atlas.
6. **Bake.** Bake the high-poly sculpted pieces onto this atlas in Marmoset like the skybridge, so one 1K texture covers the whole cluster.
7. **Build clusters.** Join the settled pile into a cluster mesh (P05) and save individual bricks too (P04) for hand placement.

#### Common mistakes
- Pieces exploding apart. They were overlapping at the start; spread them out first.
- Rubble piled like a cone of identical bricks. Mix sizes: a few big pieces, many small ones, plus dust.
- Each piece with its own texture. That's many draw calls; one atlas for the whole set.

#### Drill: one rubble cluster on a shared atlas (40 minutes)
Drop about 15 pieces into a pile with rigid bodies, freeze it, add a mortar-dust base, and pack all pieces onto one atlas.

**Pass when:** the pile looks settled (no floating or interpenetrating pieces), it's under 2,500 triangles, and all pieces use one material and one UV atlas without overlaps.

#### Use it on Mill Alley
Today you make P04 bricks and P05 rubble piles (sculpt, bake, atlas); "done when" is three rubble clusters ready. Make the other two clusters by dropping the same pieces again with a different starting arrangement.

### Fri Dec 11 · Cables and hoses with Geometry Nodes
<!-- id: c8d3 -->

**Goal:** make a cable that sags naturally between two points using a curve and a simple Geometry Nodes setup.

**Time:** about 50 minutes for the lesson and 30 for the drill.

#### Watch and read first
{{RES}}

#### Steps
1. **Draw the path.** Shift+A > Curve > Bezier. In Edit Mode, put the two end points on the brackets (vertex snapping helps) and add a middle point (select both, right-click > Subdivide).
2. **Sag by hand.** Move the middle point down. Set the handles to *Auto* (V > Auto) so the curve forms a smooth catenary-like dip. Long spans sag more; a tight cable barely dips.
3. **Geometry Nodes.** Open the *Geometry Nodes* workspace, select the curve, click *New*. You see *Group Input* → *Group Output*.
4. **Curve to Mesh.** Add (Shift+A) *Curve to Mesh* between them. Add a *Curve Circle* node into its Profile input; set radius 0.01 (2 cm cable) and resolution 6 to keep it cheap.
5. **Shade smooth.** Add *Set Shade Smooth* after Curve to Mesh.
6. **Edit stays live.** Moving the curve's points still updates the cable. Change the circle radius for a hose (P22).
7. **Make it a mesh.** Object > Convert > *Mesh* when final, then unwrap with Follow Active Quads onto a tiling cable texture.
8. **In UE5 too.** For long runs, UE5 Spline Mesh actors bend one cable segment along a spline in the editor. Export a straight 100 cm cable segment for that.

#### Common mistakes
- A cable that looks like a stiff rod. Add a bit more sag and a slight sideways drift.
- Triangle-heavy cables. Lower the curve resolution (Object Data > Shape) and the circle resolution.
- No UVs after converting. Unwrap after conversion.

#### Drill: a sagging cable between two brackets (30 minutes)
Model two simple wall brackets 3 m apart and run a cable between them with Geometry Nodes, sagging about 30 cm.

**Pass when:** the ends sit exactly in the brackets, the sag is smooth, the converted mesh is under 300 triangles, and the UV Grid isn't stretched.

#### Use it on Mill Alley
Today you make P06 pipes, P07 cable spline, P08 fallen gutter and P09 broken frame; "done when" is the cable spline usable in the level. Export the straight segment for UE5's spline tool too.

### Sat Dec 12 · Small debris: cards, instancing and atlases
<!-- id: c8d4 -->

**Goal:** make litter and small debris that costs almost nothing, using flat cards, low-poly shapes and one atlas.

**Time:** about 50 minutes for the lesson and 40 for the drill.

#### Watch and read first
{{RES}}

#### Steps
1. **Cards.** Paper, leaves and flat litter are single planes with a texture and an alpha (cut-out). A few loop cuts let you crumple them slightly with proportional editing.
2. **Low-poly solids.** Bottles and cans are cylinders with 8 sides; a bag is a crumpled subdivided plane. Detail comes from the normal map, not geometry.
3. **Bake detail onto cards.** Sculpt a crumpled paper high poly (or use Displace + noise), bake its normal onto the flat card in Marmoset, just like the planks.
4. **One atlas for the set.** Put every piece's UVs onto one 1K texture: lay the cards and small props out together and pack them. One material for the whole litter set.
5. **Instancing.** Repeats of the same piece should be linked duplicates (Alt+D) or collection instances. In UE5, the same mesh placed many times is cheap.
6. **Count as you go.** Select a piece and read Statistics: a can at about 60 triangles, a card at 2–8.

#### Common mistakes
- Modelling labels and creases in geometry. Paint or bake them; keep the mesh tiny.
- Pieces at different texture densities on the atlas. Some look sharp, others blurry; check with Texel Density Checker.
- Cards visible from behind as invisible. Use a two-sided material in UE5 for paper and leaves.

#### Drill: a litter set of eight pieces under 1,000 triangles (40 minutes)
Make eight pieces (for example a can, a bottle, a crushed can, a bag, two paper cards, a cardboard scrap and a cigarette pack) on one 1K atlas.

**Pass when:** all eight together are under 1,000 triangles, they share one material, and they read clearly at 2 m in Material Preview.

#### Use it on Mill Alley
Today you make P10 glass shards, P11 dead branches, P12 corrugated sheet, P15 litter and P16 paper; "done when" is all P1 and P2 small props done.

### Sun Dec 13 · Prop sheet presentation
<!-- id: c8d5 -->

**Goal:** present props like a portfolio prop sheet: clean backdrop, good light, wireframe and triangle counts.

**Time:** about 40 minutes for the lesson and 40 for the drill.

#### Watch and read first
{{RES}}

#### Steps
1. **Lay out the props.** On your studio sweep from Week 6, arrange the props in neat rows, largest at the back. Leave space for labels.
2. **Light it.** Same three-point setup as the clay render, slightly softer (bigger area lights).
3. **The beauty pass.** Render with full materials in Cycles or EEVEE.
4. **The wireframe pass.** Switch to Solid shading, turn on Overlays > *Wireframe* at full opacity, hide the grid, axes and other overlays, and use View > *Viewport Render Image*. Same camera, same framing as the beauty pass.
5. **Triangle counts.** Select each prop and read its triangle count from the Statistics overlay. Add a label under it: Shift+A > Text, Tab to edit the text ("Plywood · 400 tris"), and rotate it to face the camera. Or add labels in an image editor afterwards.
6. **Assemble.** Put the beauty and wireframe versions side by side or as a before/after slider image.
7. **Credits.** List any third-party material or prop you adapted (Poly Haven, ambientCG, Blendkit…) with its source.

#### Common mistakes
- Different camera between passes. The wireframe must line up with the beauty shot exactly.
- Unreadable labels. Use a plain font large enough to read on a phone.
- Busy backgrounds. The props are the subject; keep the backdrop plain.

#### Drill: one prop sheet render (40 minutes)
Render a prop sheet of this week's props: beauty pass, matching wireframe pass, and triangle-count labels.

**Pass when:** the two passes line up exactly, every prop has a readable label with its count, and the image reads on a phone screen.

#### Use it on Mill Alley
Today you make P17 junction box and P18 lamp bracket (then P3 props if time) and hold Review 8 with a prop sheet: your drill is that sheet. For the standard check, show props with triangle counts and a set-dressing wireframe, as Le Chlanko and Lemon do, and credit any third-party assets you adapted, as Indian street does.
