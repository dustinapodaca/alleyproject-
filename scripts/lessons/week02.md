## Week 2 · Oct 26 to Nov 1 · Blockout modeling

This week's goal is to build fast, accurate blockouts with modifiers so the greybox can change without being rebuilt, and to move meshes between Blender and UE5 without breaking anything.

### Mon Oct 26 · Modifiers: Array, Mirror and Solidify
<!-- id: c2d1 -->

**Goal:** use modifiers to repeat, mirror and thicken shapes non-destructively, meaning you can change the original at any time.

**Time:** about 60 minutes for the lesson and 25 for the drill.

#### Watch and read first
{{RES}}

#### Steps
1. **What a modifier is.** A modifier changes how a mesh looks without changing the mesh underneath. Open Properties > Modifiers (the blue wrench) and click *Add Modifier*. The menu is grouped into Edit, Generate, Deform, Normals and Physics.
2. **Array (Generate > Array).** It repeats the mesh. *Count* sets how many copies. *Relative Offset* moves each copy by a multiple of the object's own size (Factor X 1 = side by side). *Constant Offset* moves each copy by an exact distance, e.g. Z 4 m for one storey. Tick *Merge* to weld touching copies.
3. **Stack two arrays.** Add a second Array below the first: the first makes a row of windows along X, the second repeats that row up Z. Modifiers run top to bottom, so order matters. Drag them by the handle at the top right of each panel.
4. **Mirror (Generate > Mirror).** It mirrors the mesh across the object's origin. Pick the axis, tick *Clipping* so vertices on the centre line can't cross it, and tick *Bisect* to cut away anything already over the line. Model half and get the other half free.
5. **Solidify (Generate > Solidify).** It gives a flat surface thickness. Set Thickness (e.g. 0.3 for a 30 cm wall) and Offset −1 or 1 to grow inward or outward from the surface.
6. **Show and hide.** The icons in each modifier header toggle it in Edit Mode, in the viewport and in renders. Hide a modifier to see the base mesh again.
7. **Apply only when you must.** Hover a modifier and press Ctrl+A (or use its dropdown > Apply) to make it real geometry. Keep modifiers live during blockout; the FBX exporter applies them for you when *Apply Modifiers* is ticked.

#### Common mistakes
- An Array that shoots copies far away. Unapplied scale or rotation multiplies the offset; apply scale and rotation (Ctrl+A) first.
- A Mirror that mirrors around the wrong place. It uses the object's origin; move the origin or set *Mirror Object* to an empty.
- Applying modifiers too early. Once applied, you lose the quick edits that make blockouts fast.

#### Drill: a 5-storey wall with arrayed windows (25 minutes)
1. Make a plane 4 m wide and 20 m tall standing up (S X 2, S Y 10, then R X 90, or use N > Item > Dimensions). Add Solidify, Thickness 0.3.
2. Make a separate box 1.4 × 0.4 × 2.2 m (a window proxy). Place it 90 cm above the floor, sticking through the wall.
3. Give the window proxy an Array (Count 2, Constant Offset X 2.0 m, Relative Offset off) and a second Array (Count 5, Constant Offset Z 4.0 m).

**Pass when:** 10 windows sit at even 4 m storey heights on a 20 m wall, and changing the first window's width updates all 10.

#### Use it on Mill Alley
Today you greybox the ground and both building masses in UE5 at scale. Make the building masses in Blender with Solidify on simple planes and arrays for the floors, then export them. Use the plan's sizes: about 5 m wall to wall, about 20 m tall, 400 cm floors on the left and 380 cm on the right.

### Tue Oct 27 · Boolean openings, Spin for arches, and the Bevel modifier
<!-- id: c2d2 -->

**Goal:** cut openings with booleans, make round arch heads with Spin, and soften edges with the Bevel modifier.

**Time:** about 70 minutes for the lesson and 30 for the drill.

#### Watch and read first
{{RES}}

#### Steps
1. **Make a cutter.** A cutter is a separate object shaped like the hole you want. In Object Properties > Viewport Display, set *Display As* to *Wire* so you can see through it, and turn off its render visibility (camera icon in the Outliner).
2. **Boolean modifier.** Select the wall, Add Modifier > Generate > Boolean. Operation *Difference*, Operand Type *Object*, pick the cutter. Use the *Exact* solver: it is slower but handles overlapping faces. For several cutters, put them in one collection and set Operand Type to *Collection*.
3. **Keep cutters live.** Moving or scaling the cutter moves the hole. This is perfect for blockouts. Before final modeling you'll rebuild openings with clean geometry (Week 4).
4. **Round arch cutter.** Add a Cylinder (in the Adjust Last Operation panel set Vertices 32, Radius 1.5, Depth 1) and rotate it R X 90. Add a box below it for the straight jambs and join the two with Ctrl+J. That makes one cutter for a 3 m wide round-headed opening.
5. **Spin.** Spin sweeps selected geometry around the 3D cursor, seen from the current view. In Edit Mode, select the cross-section of an arch moulding (for example one edge 30 cm long), place the 3D cursor at the arch's centre (select a vertex there, Shift+S > *Cursor to Selected*), go to front view (Numpad 1), and pick the *Spin* tool in the toolbar on the left. Drag its plus-shaped handle, then in the Adjust Last Operation panel set Angle 180° and Steps 16.
6. **Bevel modifier.** Add Modifier > Generate > Bevel. Amount 0.01–0.02 (1–2 cm), Segments 2, Limit Method *Angle* (30°), so only sharp edges are bevelled. Small bevels catch light and stop blockouts looking like paper.
7. **Order.** Put Boolean above Bevel so the bevel also rounds the edges of the hole.

#### Common mistakes
- The hole doesn't appear. The cutter must pass fully through the wall; make it deeper than the wall.
- Strange shading around boolean holes. That's long, thin triangles. It's fine in a blockout; final pieces get clean topology.
- Spin going the wrong way or around the wrong point. Check the 3D cursor position and the view you're in: Spin uses both.

#### Drill: the A03 blind arch recess as a proxy (30 minutes)
Model a wall 3 m wide and 6 m tall (A03 is 300 × 600 cm). Cut a round-headed recess 25 cm deep (not all the way through: a blind arch), with its arch 2.4 m wide and the top of the curve at 5.6 m. Then use Spin to add a brick arch ring 15 cm deep around the curve, and add a Bevel modifier.

**Pass when:** the recess is 25 cm deep, the arch is a clean half-circle seen from the front (Numpad 1), the arch ring follows it exactly, and the cutter still moves the recess when you move it.

#### Use it on Mill Alley
Today you greybox the left facade with placeholders A01 to A09. Use your A03 proxy and booleans for the tall blind arches and the A05 loading door, with arrays to repeat them along the wall.

### Fri Oct 30 · Precise modeling: dimensions, typed values and measuring
<!-- id: c2d3 -->

**Goal:** model to exact centimetres every time, which is what makes a modular kit work.

**Time:** about 50 minutes for the lesson and 30 for the drill.

#### Watch and read first
{{RES}}

#### Steps
1. **The Item panel.** Press N to open the sidebar and click the *Item* tab. In Object Mode it shows Location, Rotation, Scale and *Dimensions*. Type exact sizes into Dimensions, then apply scale (Ctrl+A > Scale).
2. **Item panel in Edit Mode.** With vertices selected it shows their *Median* (average position). Toggle *Global* to see world positions and type a value to move them exactly, e.g. set Z to 0.9 to put a sill at 90 cm.
3. **Typed transforms.** Every G, R and S accepts numbers and simple maths. G Z 0.9 Enter; S X 1.4/2 Enter; G X −0.25 Enter. Use Tab while typing to switch to the next axis field.
4. **Snap one vertex to another.** In the snap menu, tick *Vertex*. Move with G, hold Ctrl, and hover a target vertex: the selection jumps exactly onto it. In Edit Mode, set *Snap Base* to *Active* to snap from the last-selected vertex.
5. **Measure tool.** The ruler icon in the toolbar. Drag between two points; hold Ctrl to snap to vertices. Click a measure line's middle and drag to measure angles. Delete a measure with X while hovering it.
6. **Edge lengths.** In Edit Mode, open the Overlays dropdown and, under Measurement, tick *Edge Length*. Selected edges now show their length. Use it to check openings.
7. **Loop cuts to exact positions.** After Ctrl+R, right-click to centre the loop, then use G Z (or G X) with a typed value to move it to the exact height.

#### Common mistakes
- Reading local instead of global values. In Edit Mode, check the *Global* toggle in the Item panel.
- Scaling an object to size and never applying it. Dimensions look right but modifiers and exports behave oddly.
- Eyeballing "close enough". A 2 cm error repeated over ten modules is a 20 cm gap.

#### Drill: a 300 × 380 cm bay with a 140 × 220 cm opening (30 minutes)
Model a wall section 300 cm wide, 380 cm tall and 30 cm deep, with a window opening 140 cm wide and 220 cm tall, centred left to right, its bottom 90 cm above the floor. Add a stone sill 160 × 15 × 20 cm projecting 5 cm. Use only typed values and snapping.

**Pass when:** the Edge Length overlay shows 1.4 m and 2.2 m on the opening, the brick piers each side are 80 cm (half of the 160 cm between neighbouring windows), the sill top is at 90 cm, and the origin is at bottom-left-back.

#### Use it on Mill Alley
Today you greybox the right facade with B01 to B09. Your drill is B02; array it along the wall and add the B05 ledge (50 cm tall, 60 cm deep) and the B06 light well volume (120 cm wide, 200 cm drop).

### Sat Oct 31 · Building fast from primitives and collection instances
<!-- id: c2d4 -->

**Goal:** block out complex hero shapes quickly from simple primitives, and reuse them as instances.

**Time:** about 50 minutes for the lesson and 30 for the drill.

#### Watch and read first
{{RES}}

#### Steps
1. **Think in boxes.** Every hero shape starts as a few boxes at the right size. Block the biggest forms first, then medium, then small. Stop before details.
2. **Planks with Array.** Make one board (e.g. 15 × 2 × 250 cm). Add an Array along Z with Relative Offset 1.0 plus a small gap (Constant Offset Z 0.005). Count sets how many boards. That's cladding in one object.
3. **Corbel steps.** For the chimney cap, make the shaft as a box (180 × 180 cm). Select its top face, extrude up a little (E 0.1), then scale it out (S 1.1) and extrude again: each extrude-and-scale makes one corbel step.
4. **Collection instances.** Put a finished blockout piece in its own collection. In Collection Properties > Instancing, set its offset (or put the 3D cursor at its base and use *Set Offset from Cursor*). Then Shift+A > Collection Instance adds a lightweight copy. Edit the original collection and every instance updates.
5. **Linked duplicates.** Alt+D duplicates an object that shares the same mesh data. Edit one in Edit Mode and all copies change. Shift+D makes an independent copy.
6. **Hide and isolate.** Numpad / shows only the selection (local view); press it again to return. Use it to work on one piece without the rest of the scene in the way.

#### Common mistakes
- Detailing too early. Blockouts answer "is the size and placement right?" Details belong to later weeks.
- Instances you can't edit. Edit the source collection, not the instance; or Object > Apply > Make Instances Real if you need a separate copy.
- Arrays of separate planks exported as one mesh by accident. That's fine for blockout; the final skybridge gets real planks in Week 6.

#### Drill: the skybridge proxy in 30 minutes
Build the skybridge from the plan's sizes: an enclosed tier 500 cm span × 300 cm tall × 250 cm deep with its underside 600 cm above the ground, a girder deck 40 cm deep under it, two window openings per side (booleans), and cladding boards made with an Array. Set a 30-minute timer.

**Pass when:** it's done in 30 minutes, the sizes match the plan's table, and from Camera 1 it sits over the photo's skybridge.

#### Use it on Mill Alley
Today you greybox the skybridge, chimney (180 × 180 cm, top at about 28 m with a corbelled cap), end building and loading door, and set Camera 1 plus 3 alternate cameras. Use your drill as the skybridge greybox.

### Sun Nov 1 · The round trip: updating meshes in UE5 without breaking anything
<!-- id: c2d5 -->

**Goal:** change a mesh in Blender and update it in UE5 so every placed copy updates and nothing moves.

**Time:** about 40 minutes for the lesson and 20 for the drill.

#### Watch and read first
{{RES}}

#### Steps
1. **What UE5 remembers.** A placed mesh in a UE5 level points to an asset. If you reimport the asset, every placed copy updates. The placement stays right as long as the name and pivot stay the same.
2. **Re-export to the same file.** Export the changed object with the same name, preset and file path as before, overwriting the old FBX.
3. **Reimport in UE5.** In the Content Browser, right-click the asset > *Reimport*. Or turn on auto reimport in Editor Preferences > Loading & Saving so UE5 picks up changed files automatically.
4. **Batch export with Collection Exporters.** In Blender 4.2 and later, open Collection Properties for a collection, find *Exporters*, click *Add Exporter* > FBX (listed as *FBX legacy*), and set the file path and your export settings. File > Export All Collections then exports every collection that has an exporter in one click.
5. **Send to Unreal (skip it for now).** Epic's free add-on exports straight into an open UE5 project, but Epic's own release was last tested on Blender 3.6, and the community fork (poly-hammer) on Blender 4.2. Neither claims Blender 5.x support, so use Collection Exporters and plain FBX, which always work.
6. **Keep a scale figure.** Put a 180 cm figure in every blockout: UE5's Manny or Quinn mannequin, or a 180 cm capsule in Blender. Your eye judges scale from people, not numbers.

#### Common mistakes
- Renaming the mesh before re-export. UE5 imports it as a new asset and your placed copies don't change.
- Moving the pivot. Every placed copy jumps by the same amount. Fix the pivot in Blender and reimport.
- Exporting with a different preset. Scale or axis changes break every placement.

#### Drill: change a proxy and update it in UE5 (20 minutes)
Take one exported greybox piece, change it in Blender (add a floor, move a window), re-export to the same file and reimport in UE5.

**Pass when:** every placed copy in the level updates, nothing shifts position, and no duplicate asset appears in the Content Browser.

#### Use it on Mill Alley
Today is blockout lighting, a walkthrough and Review 2; the greybox gets locked. Set up a Collection Exporter for each kit family now so later fixes are one click. For the standard check, place a 180 cm figure next to the blockout in your review screenshots, as Indian street and Le Chlanko do.
