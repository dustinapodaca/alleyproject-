## Week 1 · Oct 19 to 25 · Interface, modeling basics, camera match

This week's goal is to move around Blender without thinking about it, model simple shapes to exact sizes, match a camera to the reference photo, and confirm that what you build in Blender arrives in Unreal Engine 5 at the right scale.

### Mon Oct 19 · Install, interface, navigation and transforms
<!-- id: c1d1 -->

**Goal:** install Blender 5.2 LTS, set it up for game work, and learn to move, select and transform objects.

**Time:** about 60 minutes for the lesson and 15 for the drill, then the Mill Alley task.

#### Watch and read first
{{RES}}

#### Steps
1. **Install.** Download Blender 5.2 LTS from blender.org/download (or Steam). Use the LTS version all project long so menus match these lessons.
2. **Set preferences** (Edit > Preferences). Under *Input*, tick *Emulate 3 Button Mouse* only if you have no middle mouse button, and *Emulate Numpad* if your keyboard has no number pad. Under *Interface*, leave everything default for now. Preferences save automatically.
3. **Learn the layout.** The big area is the 3D Viewport. Top right is the Outliner (a list of everything in the scene); below it is the Properties editor (tabs for render, output, scene, world, object, modifiers, materials and more). The tabs along the top (Layout, Modeling, Sculpting, UV Editing, Shading…) are workspaces: preset layouts for each job. Stay in Layout today.
4. **Navigate.** Middle-mouse drag orbits; Shift + middle-mouse pans; the scroll wheel zooms. Numpad 1, 3 and 7 give front, right and top views; hold Ctrl for the opposite side. Numpad 5 toggles perspective and orthographic. Numpad . (period) frames the selected object; Home frames everything. The ` (backtick) key opens a pie menu of all views. You can also drag the gizmo in the top right of the viewport.
5. **Select.** Left-click selects; Shift-click adds to or removes from the selection; A selects all; Alt+A deselects all; B box-selects; C paints a selection circle (right-click or Esc to stop).
6. **Add and delete.** Shift+A > Mesh > Cube adds a cube at the 3D cursor. X (or Delete) deletes. Shift+D duplicates and starts moving the copy.
7. **Transform with G, R and S.** Press G to move, R to rotate, S to scale. While moving, press X, Y or Z to lock to that axis (Shift+Z locks to the other two), type a number, and press Enter. Example: G Z 1 Enter moves the object up 1 m; R Z 90 Enter turns it 90 degrees; S 0.5 Enter halves it. Right-click or Esc cancels. Alt+G, Alt+R and Alt+S reset location, rotation and scale.
8. **Use the Adjust Last Operation panel.** After most actions a small panel appears at the bottom left of the viewport. Open it to type exact values after the fact. F9 brings it back.
9. **Save often.** Ctrl+S saves. Blender keeps the previous save as a `.blend1` backup next to your file. For versions, use File > Save As and click the + button beside the file name to add a number (alley_v01, alley_v02…).

#### Common mistakes
- Moving the mouse outside the window while transforming. Watch the header text: it shows the axis and value you are typing.
- Scaling in Object mode and forgetting it. Object scale that isn't 1.0 will distort bevels and modifiers later. You'll learn to apply it tomorrow.
- Losing an object. Click it in the Outliner, then press Numpad . to frame it.

#### Drill: table and chair from cubes (15 minutes)
The default cube is 2 m on each side. Build a table about 120 × 80 cm with its top 75 cm off the floor, four legs, and a chair whose seat is 45 cm high. Use only cubes, G, R, S and typed numbers (for example, S Z 0.02 makes the 2 m cube 4 cm tall).

**Pass when:** both objects stand on the grid floor (nothing below Z 0), the table top is roughly 75 cm high (check with N > Item > Dimensions), and it took you under 15 minutes without hunting for menus.

#### Use it on Mill Alley
Today's Mill Alley task is the reference board. If you build it in Blender, drag each image into the viewport or use Shift+A > Image > Reference, and arrange them in rows by zone (foreground, left wall, right wall, midground, background). Save the file as `MillAlley_RefBoard.blend`.

### Tue Oct 20 · Edit Mode: extrude, inset, loop cut and bevel
<!-- id: c1d2 -->

**Goal:** edit the mesh itself (its vertices, edges and faces) with the four tools you'll use on every kit piece.

**Time:** about 60 minutes for the lesson and 20 for the drill.

#### Watch and read first
{{RES}}

#### Steps
1. **Object Mode vs Edit Mode.** Object Mode moves whole objects. Tab switches the selected object into Edit Mode, where you change its shape. The mode menu at the top left of the viewport shows which mode you're in.
2. **Vertices, edges, faces.** In Edit Mode press 1, 2 or 3 on the top number row for vertex, edge or face selection. G, R and S work on the selection exactly as they did on objects.
3. **Useful selection.** Alt+click an edge to select its whole loop. L selects everything linked to the face under the mouse. Ctrl+Numpad + grows the selection. H hides the selection and Alt+H brings it back, which helps you reach the inside of things.
4. **Apply scale first.** In Object Mode, Ctrl+A > Scale sets the object's scale back to 1.0 while keeping its size. Do this after you scale an object and before you bevel it, or the bevels will be uneven.
5. **Extrude (E).** Select a face and press E to pull out new geometry along its normal. Type a value: E 0.1 pulls out 10 cm; E −0.1 pushes in. Right-click during the extrude to leave the copy in place, then move it yourself.
6. **Inset (I).** Select a face and press I to make a smaller face inside it, joined by a border. Type the border width, for example I 0.08. Pressing I a second time while insetting switches between one inset for the whole selection and one per face.
7. **Loop Cut (Ctrl+R).** Hover over an edge: a yellow preview loop appears across it. Scroll to add more cuts, left-click to confirm, then slide it or right-click to keep it centered.
8. **Bevel (Ctrl+B).** Select edges and press Ctrl+B, move the mouse to set the width, and scroll to add segments. Type the width directly, e.g. Ctrl+B 0.01 for 1 cm. Ctrl+Shift+B bevels vertices instead.
9. **Clean-up keys.** X opens the delete menu (vertices, edges, faces, dissolve). M merges vertices. F fills the selection with a face. Ctrl+Z undoes; Ctrl+Shift+Z redoes.

#### Common mistakes
- Extruding and then cancelling with Esc. The extrude is cancelled but the duplicate geometry stays, stacked on the original. Press Ctrl+Z, or select everything and use Mesh > Clean Up > Merge by Distance.
- Bevelling on an object whose scale isn't applied. Apply scale first (step 4).
- Loop cuts that stop halfway. They stop at triangles and n-gons (faces with more than four sides), which is a sign your topology needs cleaning.

#### Drill: doorframe with a recessed door (20 minutes)
1. Add a cube. S Z 1.5 Enter, then G Z 1.5 Enter, then S Y 0.15 Enter. You now have a wall 2 m wide, 3 m tall and 30 cm deep, standing on the floor. Ctrl+A > Scale.
2. Tab into Edit Mode and press Numpad 1 for the front view. Ctrl+R over a top edge, scroll to 2 cuts, click, then right-click. In edge mode, Alt+click one of the new vertical loops, Shift+Alt+click the other, and press S X 1.5 Enter to move them out to ±50 cm, giving a 1 m opening.
3. Ctrl+R over a vertical edge, click, right-click, then G Z 0.6 Enter to move the cut to 2.1 m high.
4. In face mode, select the front face in the lower middle (the door area). I 0.08 Enter makes the frame. Then E −0.12 Enter pushes the door back 12 cm.
5. Select the edges around the door opening and Ctrl+B 0.01 with 2 segments.

**Pass when:** the opening is 1.0 × 2.1 m (measure with N > Item while vertices are selected, or with the Measure tool), the door sits back from the frame, nothing has stacked duplicate faces (Mesh > Clean Up > Merge by Distance reports 0 removed), and N > Item shows scale 1, 1, 1.

#### Use it on Mill Alley
Today you paint over the reference and circle every repeating element. For each kit piece you circle (A01 wall, A03 arch, B03 window and so on), think about how you'd make it with today's four tools: a wall with an inset, extruded window recess and bevelled sill. Note this next to each ID on the paintover.

### Fri Oct 23 · Cameras and matching the reference photo
<!-- id: c1d3 -->

**Goal:** set up a Blender camera whose view lines up with the reference photo, so everything you model can be checked against it.

**Time:** about 60 minutes for the lesson and 30 for the drill.

#### Watch and read first
{{RES}}

#### Steps
1. **Match the frame shape.** In Output Properties > Format, set Resolution X and Y to the photo's pixel size (or the same ratio, e.g. 3000 × 4000 → 1500 × 2000). If the shape is wrong, the photo can never line up.
2. **Add a camera.** Shift+A > Camera. With the camera selected, Ctrl+Numpad 0 makes it the active camera and looks through it. Numpad 0 looks through the active camera later.
3. **Load the photo.** Select the camera, open its Object Data properties (the green camera icon), tick *Background Images*, click *Add Image* and open the photo. Set Opacity to about 0.6. If the photo hides your geometry, set Depth to *Front* while checking alignment.
4. **Set the lens.** In the same tab under *Lens*, set Focal Length. If the photo has EXIF data (right-click > Properties > Details on Windows), use its 35 mm-equivalent focal length with Sensor Fit *Auto* and Sensor Size 36 mm. Phone wide cameras are about 24–26 mm. If you don't know, start at 24 mm.
5. **Build guides.** Add a large plane for the ground. Add two long boxes for the two walls, the width apart that the alley is (from the plan's 1:1 scale table). These give you lines to match against the photo's vanishing lines.
6. **Place the camera.** Set the camera's location Z to eye height, about 1.6 m, and rotation X to 90° so it looks level. A level camera keeps vertical lines vertical, as in the photo. If the photo's verticals lean, tilt the camera a few degrees instead.
7. **Move the camera into place.** In the viewport sidebar (N > View) tick *Lock Camera to View*. Now orbiting and panning in camera view moves the camera. Line up the wall boxes' bottom and top edges with the photo's brick courses and ground line. Untick it when you're done so you don't nudge the camera by accident.
8. **Fine tune.** Change the focal length and move the camera back or forward together: a longer lens further back flattens the perspective; a shorter lens closer in exaggerates it. If the photo was cropped off-centre, use Shift X and Shift Y under *Lens* to move the frame without rotating.
9. **Optional: fSpy.** The free fSpy app works out a camera from vanishing lines you draw on the photo. Its Blender importer (v1.0.3 on GitHub, installed from the zip) still works in Blender 5.x according to users. The *Fit The Camera* extension (Get Extensions) does a similar job inside Blender. Matching by hand as above teaches you more; use these to check your result.
10. **Lock it.** Name the camera `CAM_01_Reference`, then in the Properties > Object tab click the lock icons (Transform > Location, Rotation) so it can't be moved.

#### Common mistakes
- A wrong render aspect ratio. Fix step 1 before anything else.
- Matching with the camera tilted when the photo is level. If the photo's vertical lines are straight up and down, keep rotation X at exactly 90°.
- Changing only the focal length. Focal length and distance work as a pair. Match the vanishing point first, then the lens.

#### Drill: match a photo of your own (30 minutes)
Take a photo of a hallway, street or room where you can measure one thing (a door is about 2.1 m tall; a ceiling is about 2.4 m). Match a camera to it using steps 1 to 8 with a box for the measured object.

**Pass when:** the box's edges sit on the photo's edges within a few pixels at the near end and the far end, and the box is the real measured size.

#### Use it on Mill Alley
Today's task is the Mill Alley camera match. Use the plan's scale breakdown for the alley width and the floor heights (400 cm left, 380 cm right). Block the two buildings as boxes at those sizes, match the camera, and save the file as `MillAlley_CameraMatch.blend`. This camera becomes Camera 1 for every review and the final beauty shot.

### Sat Oct 24 · Units, snapping, origins, naming and FBX export to UE5
<!-- id: c1d4 -->

**Goal:** lock the settings that make modular pieces line up and import into UE5 at the right size.

**Time:** about 75 minutes for the lesson and 20 for the drill.

#### Watch and read first
{{RES}}

#### Steps
1. **Units.** Scene Properties > Units: Unit System *Metric*, Unit Scale *1.0*, Length *Meters*. One Blender unit is now one metre. Leave it this way for the whole project.
2. **Grid.** Viewport Overlays (the two-circles dropdown) > Guides > Scale: set to 0.25 so the grid lines are 25 cm apart, the project's snap size.
3. **Snapping.** Click the magnet dropdown in the viewport header. Set *Snap Base* to Closest and *Snap Target* to Increment, and tick *Absolute Grid Snap*. Turn snapping on with the magnet (Shift+Tab) or hold Ctrl while moving to snap temporarily. Typed values are always exact: G X 0.25 Enter moves 25 cm.
4. **Vertex snapping.** In the same menu, also tick *Vertex*. Now while moving with Ctrl held, a piece's corner snaps to another piece's corner. This is how modules meet with no gap.
5. **The 3D cursor.** Shift+right-click places the 3D cursor; new objects appear there. Shift+S opens the snap pie: *Cursor to World Origin*, *Cursor to Selected*, *Selection to Cursor*.
6. **Origins (pivots).** The orange dot is the object's origin, which becomes the pivot in UE5. The project rule is bottom-left-back. In Edit Mode, select that corner vertex, press Shift+S > *Cursor to Selected*, Tab back to Object Mode, then Object > Set Origin > *Origin to 3D Cursor*. Then Alt+G moves the object so its origin sits at the world origin.
7. **Collections.** Press M with objects selected to move them into a new or existing collection. Keep one collection per module family (Kit_A, Kit_B…). Rename with F2 or by double-clicking in the Outliner.
8. **Naming.** Use the plan's convention: `SM_MillAlley_<Family>_<Piece>_<W>x<H>`, e.g. `SM_MillAlley_A_WallFlat_400x400`. UE5 uses the object name as the asset name.
9. **FBX export.** Select the object(s), then File > Export > FBX (.fbx). Blender 5.2 has a new FBX importer, and the exporter may be listed as *FBX (legacy)*; it's the same exporter with the same options. Tick *Limit to: Selected Objects*; Object Types: *Mesh* only. Under Transform, set *Apply Scalings* to **FBX Units Scale** and leave Forward and Up at their defaults. Under Geometry, set *Smoothing* to *Face* and keep *Apply Modifiers* on. Save these settings as a preset with the + next to *Operator Presets* (name it `UE5_StaticMesh`).
10. **Import in UE5.** Drag the FBX into the Content Browser. Keep the default static mesh options and import. Open the mesh: the viewport text shows *Approx Size*. Drop it into the level and check the Details panel scale is 1, 1, 1.

#### Common mistakes
- Importing at 1/100 size or 100× size. The cause is almost always *Apply Scalings*. With metres in Blender and *FBX Units Scale*, a 1 m cube arrives as 100 cm.
- Pivots in the middle of modules. UE5 snaps by pivot, so a centred pivot breaks the 25 cm grid.
- Exporting unapplied scale. Apply scale (Ctrl+A > Scale) before export so UE5 sees scale 1.

#### Drill: the 4 × 4 m wall round trip (20 minutes)
Make a wall block 4 m wide, 4 m tall and 30 cm deep with the origin at its bottom-left-back corner, named `SM_Test_Wall_400x400`. Export it with your preset and import it into UE5.

**Pass when:** UE5 shows Approx Size 400 × 30 × 400 (axis order may differ), the scale in the level is 1, 1, 1, and dragging it with UE5's grid snap set to 25 lets two copies meet edge to edge with no gap.

#### Use it on Mill Alley
Today you lock the metrics and naming and set up the UE5 project. Save your export preset, write the units, grid, pivot and naming rules into the metrics sheet, and commit the empty UE5 project plus the test wall to source control.

### Sun Oct 25 · Viewport shading and a quick overcast light
<!-- id: c1d5 -->

**Goal:** light a greybox simply so you can judge forms and mood, and produce the base for the mood paintover.

**Time:** about 45 minutes for the lesson and 30 for the drill.

#### Watch and read first
{{RES}}

#### Steps
1. **Shading modes.** Z opens the shading pie: Wireframe, Solid, Material Preview and Rendered. Solid is for modeling; Rendered shows real lights.
2. **Solid mode options.** Click the dropdown next to the shading buttons. Lighting *Studio* or *MatCap*; Color *Object* or *Random* (tells pieces apart); tick *Cavity* to see edges and *Shadow* for a quick sense of depth.
3. **Pick EEVEE.** Render Properties > Render Engine: *EEVEE*. It's fast and close enough for lighting studies. (Cycles is slower but physically accurate; you'll use it for baking.)
4. **World light.** World Properties > Surface: set Color to a cool grey-blue and Strength to about 1. An overcast sky lights everything from above and all around, which is most of the photo's light.
5. **Optional HDRI.** For a better sky, download an overcast HDRI from Poly Haven (CC0), click the yellow dot next to Color, choose *Environment Texture*, and open the file.
6. **A weak sun.** Shift+A > Light > Sun. Set Strength to about 1–2 and Angle to 15–30° so the shadows are soft. Rotate it so light comes from the far bright opening, like the photo. Make its colour slightly warmer than the sky.
7. **Exposure.** Render Properties > Color Management: View Transform *AgX* (the default), Look *None*, and use *Exposure* to brighten or darken the whole image without touching lights.
8. **Render.** Look through Camera 1 (Numpad 0), press F12, then Image > Save As in the render window. Save it as a PNG next to the reference.

#### Common mistakes
- A bright sun and black shadows. An overcast scene is lit mostly by the sky; keep the sun weak and soft.
- Judging lighting in Material Preview. It uses its own built-in light; switch to Rendered to see yours.
- Fixing brightness with light strength. Use Exposure for overall brightness and lights for direction and contrast.

#### Drill: overcast greybox frame (30 minutes)
Use your camera-match file. Give the walls and ground a plain grey material (Material Properties > New, Base Color mid-grey), set the world and sun from steps 4 to 7, and render Camera 1.

**Pass when:** the far end of the alley is the brightest area, shadows are soft-edged, the two walls and the ground have clearly different values, and nothing is pure black or pure white.

#### Use it on Mill Alley
This render is the base for today's mood paintover. Paint over it (in any image editor) toward the photo: cool, wet and overcast. Save it beside the reference as the target image. For the standard check, put your reference board and one composition reference (a film still or painting with a similar long, framed view) together, as the Farm and Persian projects do; that's Review 1.
