## Week 6 · Nov 23 to 29 · Sculpting the skybridge

This week's goal is the full high-to-low workflow on the hero piece: a clean base mesh, a sculpted high poly, a game-ready low poly with UVs, a clean bake, and a clay render that shows off the sculpt.

### Mon Nov 23 · Base meshes for sculpting
<!-- id: c6d1 -->

**Goal:** build base meshes that sculpt well and can double as the low poly, saving a retopology step.

**Time:** about 50 minutes for the lesson and 30 for the drill.

#### Watch and read first
{{RES}}

#### Steps
1. **Plan high vs low first.** The *low poly* is what goes into UE5 (the skybridge's budget is under 40,000 triangles). The *high poly* holds the sculpted detail, baked into normal and AO maps. Decide which parts get sculpted (cladding boards, window frames) and which are mid-poly with bevels (girders from C01).
2. **Clean quads, even size.** Sculpting subdivides every face. Faces of very different sizes give uneven detail. Aim for roughly square quads of similar size, with no triangles or n-gons.
3. **Model the base.** For a board (15 × 2.5 × 250 cm): a box with loop cuts along its length every 10–15 cm and one or two across its width. Apply scale (Ctrl+A > Scale).
4. **The reuse trick.** Keep a copy of this base mesh. Because Multires keeps the original as level 0, the base you sculpt on can become the low poly later. For planks this is all the retopology you need.
5. **Test subdivision.** Add a Subdivision Surface modifier and view levels 1 to 3. If corners balloon into blobs, add support loops near the ends.
6. **Lay out the whole skybridge.** Frame, cladding boards (an Array from Week 2, now real separate boards), window frames and the girder deck, all matching the greybox volume (500 cm span, 300 cm tall tier, 40 cm deck).

#### Common mistakes
- Long thin faces. They sculpt as stretched streaks. Add loop cuts until faces are close to square.
- Unapplied scale. Sculpt brushes behave differently along stretched axes.
- Sculpting everything. Only what's seen up close needs it; the rest can use the trim sheets.

#### Drill: a plank base mesh ready to sculpt (30 minutes)
Model a 250 cm board with even quads, plus a duplicate saved as `Plank_low`.

**Pass when:** all faces are quads of similar size, scale reads 1, 1, 1, and Subdivision level 3 keeps the board's shape with no blobby ends.

#### Use it on Mill Alley
Today you plan the skybridge from reference and model its base mesh (frame, cladding boards, windows, girder deck). "Done when" is matching the greybox volume, so check it against your greybox in Camera 1.

### Tue Nov 24 · Sculpt Mode: brushes, Multires and masking for wood damage
<!-- id: c6d2 -->

**Goal:** sculpt believable rot, splits and splinters into timber boards.

**Time:** about 60 minutes for the lesson and 45 for the drill.

#### Watch and read first
{{RES}}

#### Steps
1. **Enter Sculpt Mode.** Use the *Sculpting* workspace or the mode menu. Brushes are assets in the *Essentials* library: pick them from the asset shelf at the bottom of the viewport. The trim tools (Box, Lasso, Line and Polyline Trim) are in the toolbar on the left.
2. **Brush basics.** F changes the radius; Shift+F changes the strength; hold Ctrl to invert a brush (dig instead of build). Turn off X symmetry in the header (on by default): wood damage isn't symmetrical.
3. **Cut broken ends first.** The *Box Trim* and *Lasso Trim* tools cut the mesh itself. Use them on the base mesh to snap off board ends at an angle, before adding Multires.
4. **Add Multires.** Add Modifier > Generate > *Multiresolution*, and click *Subdivide* three or four times. Sculpt at the highest level; level 0 stays your clean base.
5. **The wood toolkit.** *Scrape/Fill* flattens and wears surfaces; *Crease Sharp* cuts sharp grooves for grain and cracks (*Crease Polish* for softer ones); *Clay Strips* builds up warped or swollen areas; *Draw* adds soft bumps; *Snake Hook* pulls out splinters at broken ends.
6. **Masking.** Paint a mask on areas you want to protect (they turn dark), so brushes only affect the rest. Ctrl+I inverts the mask; Alt+M clears it.
7. **Work big to small.** Start with large warps and sagging, then splits and broken ends, then grain cracks along the length. Stop when it reads from Camera 1's distance; fine detail that never shows wastes time.
8. **Check under real light.** In Solid mode, try a MatCap (shading dropdown > Lighting > MatCap) with a raking angle. Damage that looks deep head-on can vanish from the side.

#### Common mistakes
- Symmetry left on. Every crack appears twice, mirrored.
- Uniform noise everywhere. Rot is concentrated at ends, joints and where water sits; leave quiet areas.
- Sculpting on level 0. Detail must go on the highest Multires level or it changes the low poly.

#### Drill: sculpt one rotten board (45 minutes)
Use your plank base mesh: snap one end off with a trim tool, add Multires, and sculpt warping, grain cracks, a rotten end and two splinters.

**Pass when:** the board reads as old timber from 3 m away in a MatCap, the damage is uneven (heavier at the broken end), and Multires level 0 is unchanged.

#### Use it on Mill Alley
Today you sculpt the skybridge in Blender: warped and broken boards, rot, sagging and splintered window frames. Sculpt a few "master" boards in detail and reuse them with rotation and flips rather than sculpting every board.

### Fri Nov 27 · Retopology, game meshes and two UV sets
<!-- id: c6d3 -->

**Goal:** get the sculpt down to a game-ready mesh and unwrap it into texture sets.

**Time:** about 75 minutes for the lesson and 30 for the drill.

#### Watch and read first
{{RES}}

#### Steps
1. **Pick a method per part.** Planks and frames: reuse Multires level 0 (you planned for this on Monday). Rocks and rubble: *Decimate*. Odd organic shapes: manual retopology.
2. **Reuse the base.** Duplicate the sculpted board. On the copy, set the Multires viewport level to 0 and apply it (or delete the modifier). That copy is the low poly. If a trimmed end changed the silhouette, add a few cuts so the low poly follows it.
3. **Decimate.** Add a *Decimate* modifier (Collapse) and lower the Ratio until the silhouette starts to break, then go back up a little. Apply it.
4. **Manual retopology.** Hide the high poly from selection. Make a new mesh, turn snapping to *Face Project*, and add a *Shrinkwrap* modifier targeting the high poly. Place vertices over the surface and fill faces. The *Retopology* overlay (Overlays > Retopology) shows your new faces over the high poly.
5. **Watch the silhouette.** Triangles go where the outline changes. Flat areas need very few.
6. **Two UV sets.** The plan gives the skybridge two 4K sets: *cladding* and *structure*. Give each a different material slot (Material Properties > +, assign faces), then unwrap each group.
7. **Pack Islands.** In the UV Editor, select a set's islands and press Ctrl+P (*Pack Islands*). Set a margin of about 0.005–0.01 so islands don't bleed into each other, and turn on rotation for tighter packing.
8. **Even density.** Run Texel Density Checker across each set. Visible faces should have the same density; hidden undersides can be smaller.

#### Common mistakes
- Low poly silhouettes that don't match the high. The bake can't fix silhouette; add geometry there.
- Islands touching. Packing margin too small; you get colour bleed in UE5's lower mip levels.
- Islands scaled at random. One plank looks sharp, the next blurry.

#### Drill: a sculpted plank under 300 triangles (30 minutes)
Make a low poly of yesterday's board by reusing level 0 plus a few cuts at the broken end, and unwrap and pack it.

**Pass when:** Statistics shows under 300 triangles, its outline follows the sculpt's broken end, and the UV Grid is undistorted with islands packed and not touching.

#### Use it on Mill Alley
Today you retopo the skybridge low poly and UV it into two 4K sets. The "done when" is under 40,000 triangles with clean UVs; keep a running count with the Statistics overlay.

### Sat Nov 28 · Preparing meshes for baking in Marmoset
<!-- id: c6d4 -->

**Goal:** export high and low meshes so Marmoset bakes them cleanly the first time.

**Time:** about 60 minutes for the lesson and 30 for the drill.

#### Watch and read first
{{RES}}

#### Steps
1. **Matching names.** Name each pair `<Part>_high` and `<Part>_low` (e.g. `Plank01_high`, `Plank01_low`). Marmoset groups meshes into bake groups by these suffixes, so each high bakes only onto its own low.
2. **Same place, same pivot.** High and low must overlap exactly in space. Don't move one without the other.
3. **Triangulate the low.** Add a *Triangulate* modifier to the low poly and export with modifiers applied. The bake and UE5 then use the same triangles, so normal maps shade correctly.
4. **Smoothing.** Keep the low poly smooth-shaded with hard edges only at UV seams. A hard edge without a UV seam causes a visible bake line.
5. **No overlapping UVs.** Every island in a set needs its own space (unless you deliberately offset mirrored copies by a whole UV tile).
6. **Export.** Two FBX files: all highs in one (`Skybridge_high.fbx`), all lows in another (`Skybridge_low.fbx`). Apply modifiers. The high export can be heavy; that's fine.
7. **Bake in Marmoset.** Create a new bake project, drop both files into the baker (the Quick Loader slots), set the output size to 4096 and pick maps: Normal, AO, Curvature, Thickness, Height, ID. Set the normal map to suit Unreal (DirectX / flip Y). Adjust the cage offset until red error areas in the preview disappear, then bake.

#### Common mistakes
- Black splotches or waviness. The cage is too tight or too loose; adjust the offset and paint it per area.
- Details baking onto the wrong plank. Pieces near each other need separate bake groups (correct _high/_low names).
- Seams in the normal map. Hard edges without a UV seam, or an untriangulated low.

#### Drill: bake the test plank with no artefacts (30 minutes)
Export the plank's high and low with correct names and triangulation, and bake Normal and AO at 2K in Marmoset.

**Pass when:** the baked low poly looks like the sculpt in Marmoset's viewport, with no black splotches, no seams across the plank, and no detail from elsewhere.

#### Use it on Mill Alley
Today you bake the skybridge in Marmoset and start its texture project (peeling red and green paint, rot, rust on the girders). Everything from this drill applies, just with more bake groups.

### Sun Nov 29 · Clay renders
<!-- id: c6d5 -->

**Goal:** render a clean clay image of a sculpt, the standard way to show sculpting skill without textures.

**Time:** about 40 minutes for the lesson and 30 for the drill.

#### Watch and read first
{{RES}}

#### Steps
1. **A backdrop.** Add a plane, extrude its back edge upward (E Z 3), and bevel the joint with several segments. That's a seamless studio sweep.
2. **Clay material.** One material for everything: Principled BSDF, Base Color mid-grey (about 0.5), Roughness about 0.6. Give the backdrop a slightly darker grey.
3. **Three-point lights.** Add three Area lights: a *key* light 45° to the side and above (strongest), a *fill* light on the other side at about a third of the key's strength, and a *rim* light behind the object to outline its silhouette.
4. **Camera.** A longer lens (50–85 mm) avoids distortion. Frame the object with some space around it.
5. **Render.** Cycles for quality (sculpt detail reads through shadow), 128–256 samples with denoising on. Render at the size your portfolio uses (for example 1920 × 1080).
6. **The quick version.** For progress shots, Solid mode with a MatCap and Viewport Render Image (View > Viewport Render Image) is good enough.

#### Common mistakes
- A pure-white clay. Highlights burn out and hide the detail. Mid-grey shows sculpting best.
- Flat front lighting. The key light must rake across the surface to show damage.
- A cluttered background. Keep it plain; the sculpt is the subject.

#### Drill: a clay render of the skybridge sculpt (30 minutes)
Set up the backdrop, clay material and three lights, and render the skybridge high poly.

**Pass when:** the damage reads clearly, the silhouette is outlined by the rim light, nothing is pure white or pure black, and the background is plain.

#### Use it on Mill Alley
Today you finish texturing the skybridge, import it, place it and hold Review 6. For the standard check, add this clay render to a clay sculpt sheet, as Cottage and Courtyard do.
