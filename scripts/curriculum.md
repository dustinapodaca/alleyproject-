### Week 1 · Oct 19 to 25 · Interface, modeling basics, camera match

- [ ] **Mon Oct 19** · Install Blender 5.2 LTS and do the setup list. Lesson: interface, viewport navigation (orbit, pan, zoom, numpad views), select, move, rotate, scale (G, R, S), saving. *Drill:* build a table and chair from cubes in 15 minutes. *Feeds:* add the reference photo with Add > Image > Reference if you build the board in Blender.
- [ ] **Tue Oct 20** · Lesson: Object vs Edit mode; vertices, edges, faces; Extrude (E), Inset (I), Loop Cut (Ctrl+R), Bevel (Ctrl+B). *Drill:* model a doorframe with a recessed door. *Feeds:* sketch the kit pieces you circle on the paintover as simple shapes.
- [ ] **Fri Oct 23** · Lesson: cameras: add a camera, use the photo as camera background, focal length and sensor, align to the alley's vanishing lines. *Drill:* camera-match a photo of a hallway or street of your own. *Feeds:* today's camera match.
- [ ] **Sat Oct 24** · Lesson: units, grid snapping (25 cm increment), origins and the 3D cursor, collections, naming. FBX export to UE5 and the 1 m cube check. *Drill:* export a 4 × 4 m wall block, import it in UE5, confirm 400 × 400 cm. *Feeds:* metrics and naming lock.
- [ ] **Sun Oct 25** · Lesson: viewport shading, a quick EEVEE light (sun plus world colour) from your camera-match camera. *Drill:* render an overcast grey-box frame. *Feeds:* the mood paintover base. *Standard check:* reference board plus one composition reference, as in Farm and Persian.

### Week 2 · Oct 26 to Nov 1 · Blockout modeling

- [ ] **Mon Oct 26** · Lesson: modifiers: Array, Mirror, Solidify; keep the blockout non-destructive. *Drill:* a 5-storey wall with an arrayed window row. *Feeds:* greybox masses.
- [ ] **Tue Oct 27** · Lesson: Boolean modifier for openings; Spin for round arch heads; Bevel modifier. *Drill:* the A03 blind arch recess as a proxy. *Feeds:* left facade greybox.
- [ ] **Fri Oct 30** · Lesson: precise modeling: Item panel dimensions (N), typed transforms (S 2 Enter), vertex snapping, the Measure tool. *Drill:* a 300 × 380 cm bay with a 140 × 220 cm opening. *Feeds:* right facade greybox.
- [ ] **Sat Oct 31** · Lesson: building from primitives fast: skybridge box with plank arrays, chimney with corbel steps, collection instances for repeats. *Drill:* skybridge proxy in 30 minutes. *Feeds:* skybridge, chimney and door greybox.
- [ ] **Sun Nov 1** · Lesson: round-trip pipeline: re-export a changed mesh, reimport in UE5 without breaking placements; Send to Unreal or batch FBX. *Drill:* change a proxy and update it in UE5. *Standard check:* scale figure next to the blockout, as in Indian street and Le Chlanko.

### Week 3 · Nov 2 to 8 · Materials, masks and baking

- [ ] **Mon Nov 2** · Lesson: Shader Editor, Principled BSDF, image textures, Node Wrangler (Ctrl+Shift+T loads a PBR set), Non-Color data for normal and roughness, mapping a texture to a 2 m tile. *Drill:* tile an ambientCG brick at exactly 2 × 2 m. *Feeds:* sourcing the CC0 base set.
- [ ] **Tue Nov 3** · Lesson: masks: Bevel and Ambient Occlusion nodes (Cycles), Gradient and Noise textures, Color Ramp, Mix; save them as node groups. *Drill:* edge wear on a bevelled cube. *Feeds:* the edge-wear and leak mask groups.
- [ ] **Fri Nov 6** · Lesson: baking in Cycles: image targets, bake types, margin; baking a procedural material to a 2K tiling texture on a 2 × 2 m plane. *Drill:* bake one brick variant and check it tiles. *Feeds:* brick sets M01 to M04.
- [ ] **Sat Nov 7** · Lesson: seamless tiling checks; channel packing: AO, roughness, metal into one ORM map, and three masks into one RGB mask. *Drill:* pack edge wear, dirt and leaks into one RGB texture. *Feeds:* M05 to M10.
- [ ] **Sun Nov 8** · Lesson: colour attributes (vertex colours): paint R, G and B, export them in FBX for UE5. *Drill:* paint a moss channel on a wall and see it in UE5. *Standard check:* render your 10 materials on cylinders, as in Courtyard and Tsushima.

### Week 4 · Nov 9 to 15 · Trim sheets and the first kit family

- [ ] **Mon Nov 9** · Lesson: trim sheet layout: plan strip heights in pixels (2048 px at 10.24 px/cm covers 200 cm), model high-poly strips with bevels and Subdivision. *Drill:* lay out the T01 stone strips. *Feeds:* T01 and T02.
- [ ] **Tue Nov 10** · Lesson: UV unwrapping: seams, Unwrap, Follow Active Quads, straightening; snapping UVs onto trim strips; the Texel Density Checker extension. *Drill:* unwrap a beam onto a strip at 10.24 px/cm. *Feeds:* T03 and the density checker.
- [ ] **Fri Nov 13** · Lesson: modular walls: grid-snapped edges, bottom-left-back pivots, 1 to 2 cm bevels plus Weighted Normal modifier, Smooth by Angle. *Drill:* two A01 walls that snap with no gap. *Feeds:* A01, A02, A06, A09.
- [ ] **Sat Nov 14** · Lesson: arches and mouldings: Spin, circular arrays, cleaning booleans, avoiding n-gons, Face Orientation overlay. *Drill:* a clean A03 arch. *Feeds:* A03, A05, A07, A08.
- [ ] **Sun Nov 15** · Lesson: Asset Browser: mark modules as assets, one collection per module, batch export with SM_ names. *Drill:* drag-build a wall from the Asset Browser. *Standard check:* kit sheet on a neutral backdrop with dimensions, as in Le Chlanko.

### Week 5 · Nov 16 to 22 · Kit families B, C and D

- [ ] **Mon Nov 16** · Lesson: corners and seams between modules; mirroring; matching UVs across a corner so brick courses line up. *Drill:* outer corner B08 against B01 with continuous coursing. *Feeds:* B01, B07, B08, B09.
- [ ] **Tue Nov 17** · Lesson: variants: linked duplicates (Alt+D), the Knife tool, separating parts; intact, broken and gutted window inserts from one base. *Drill:* three B03 variants sharing one UV layout. *Feeds:* B02 and B03.
- [ ] **Fri Nov 20** · Lesson: stairs and light well: Array with relative offset for 18 cm risers and 28 cm treads; snapping to the step grid. *Drill:* an 11-step stair that matches the plan. *Feeds:* B04, B05, B06.
- [ ] **Sat Nov 21** · Lesson: curves: Bezier paths with bevel depth for pipes, gutters and rails; Curve modifier to bend arrays; converting to mesh. *Drill:* a drainpipe with an elbow and shoe. *Feeds:* Family C.
- [ ] **Sun Nov 22** · Lesson: ground tiles: subdivided planes, light displacement, the Statistics overlay for triangle budgets. *Drill:* D01 under 4,000 tris. *Standard check:* modular-elements sheet of every finished piece, as in Cottage and Lemon.

### Week 6 · Nov 23 to 29 · Sculpting the skybridge

- [ ] **Mon Nov 23** · Lesson: base meshes for sculpting: clean quads, even density, Subdivision levels; separate high-poly and low-poly plans. *Drill:* a plank base mesh ready to sculpt. *Feeds:* skybridge base mesh.
- [ ] **Tue Nov 24** · Lesson: Sculpt Mode: Multires, Draw, Clay Strips, Crease, Scrape, Trim; masking; wood damage and splinters. *Drill:* sculpt one rotten board. *Feeds:* skybridge sculpt.
- [ ] **Fri Nov 27** · Lesson: retopology and game meshes: Decimate, Shrinkwrap with face snapping, or reuse the base mesh; UVs into two sets; Pack Islands. *Drill:* a sculpted plank down to under 300 tris. *Feeds:* retopo and two 4K UV sets.
- [ ] **Sat Nov 28** · Lesson: preparing bakes for Marmoset: _high and _low naming, triangulation, matching pivots, avoiding overlaps. *Drill:* bake the test plank in Marmoset with no artefacts. *Feeds:* skybridge bake.
- [ ] **Sun Nov 29** · Lesson: clay renders: Matcap or a grey material, three-point light, neutral backdrop. *Drill:* a clay render of the skybridge sculpt. *Standard check:* clay sculpt sheet, as in Cottage and Courtyard.

### Week 7 · Nov 30 to Dec 6 · Hero assets and catch-up

- [ ] **Mon Nov 30** · Lesson: sculpting masonry: brick blocks with Clay Strips and Trim brushes, Remesh, chipped edges on the corbel cap. *Drill:* five chipped bricks. *Feeds:* chimney cap.
- [ ] **Tue Dec 1** · Lesson: hard-surface damage: dents with the Displace modifier and a noise texture, torn sheet metal with the Knife tool. *Drill:* one dented door panel. *Feeds:* H6 loading doors.
- [ ] **Fri Dec 4** · Lesson: Cell Fracture extension for broken glass; separating and placing shards. *Drill:* a smashed pane with 20 shards. *Feeds:* H7 glazing.
- [ ] **Sat Dec 5** · Buffer: redo any drill from Weeks 1 to 6 you failed or skipped.
- [ ] **Sun Dec 6** · Buffer: free practice; no new lesson.

### Week 8 · Dec 7 to 13 · Props and debris

- [ ] **Mon Dec 7** · Lesson: fast props: board arrays with Randomize Transform, Simple Deform for warped plywood. *Drill:* six plank variants in 30 minutes. *Feeds:* P01 to P03.
- [ ] **Tue Dec 8** · Lesson: rubble: Cell Fracture on bricks, combining chunks into clusters, many props sharing one UV atlas. *Drill:* one rubble cluster on a shared atlas. *Feeds:* P04 and P05.
- [ ] **Fri Dec 11** · Lesson: cables and hoses: curves, the Curve to Mesh node in Geometry Nodes, sag by hand. *Drill:* a sagging cable between two brackets. *Feeds:* P06 to P09.
- [ ] **Sat Dec 12** · Lesson: small debris: low-poly cards with normal maps, instancing, atlas packing. *Drill:* a litter set of eight pieces under 1,000 tris total. *Feeds:* P10 to P16.
- [ ] **Sun Dec 13** · Lesson: prop sheet presentation: neutral backdrop, lighting, wireframe overlay, triangle counts as text labels. *Drill:* one prop sheet render. *Standard check:* props with tris counts and a set-dressing wireframe, as in Le Chlanko and Lemon. Credit any third-party assets you adapted, as Indian street does.

### Week 9 · Dec 14 to 20 · Foliage

- [ ] **Mon Dec 14** · Lesson: leaves for an atlas: leaf planes with a slight bend, laid out on a 2048 atlas, an orthographic camera for the bake. *Drill:* ivy and buddleia leaves on one atlas. *Feeds:* foliage atlas.
- [ ] **Tue Dec 15** · Lesson: ivy: the Ivy Gen extension, or curves with leaf cards; converting to game-ready cards. *Drill:* an ivy strand down a drainpipe. *Feeds:* F01 and H4.
- [ ] **Fri Dec 18** · Lesson: Geometry Nodes basics: Distribute Points on Faces, Instance on Points for grass and weed clumps. *Drill:* a grass clump generator. *Feeds:* F02, F03, F05.
- [ ] **Sat Dec 19** · Lesson: bushes and saplings: branches from curves or the Skin modifier; vertex colours for wind sway in UE5. *Drill:* one sapling with wind colours. *Feeds:* F04, F06, F07.
- [ ] **Sun Dec 20** · Lesson: foliage breakdown render: atlas, cards and the assembled plant side by side. *Drill:* the foliage sheet. *Standard check:* foliage breakdown with atlas, as in Courtyard, Lemon and Windmill.

### Week 10 · Dec 21 to 27 · Decals and vertex paint

- [ ] **Mon Dec 21** · Lesson: decal geometry: floating planes offset from the wall, UVs into a decal atlas, edge fade. *Drill:* three decal planes on a wall. *Feeds:* X01 to X04.
- [ ] **Tue Dec 22** · Lesson: baking decal maps: sculpt cracks and leaks on a plane and bake height and normal to the atlas. *Drill:* a crack decal baked to 1K. *Feeds:* X05 to X08.
- [ ] **Fri Dec 25** · Buffer (Christmas): no lesson.
- [ ] **Sat Dec 26** · Lesson: paintable meshes: add loop cuts where vertex paint needs resolution; check colour attributes survive export. *Drill:* a facade with enough vertices for smooth moss and grime. *Feeds:* facade vertex paint.
- [ ] **Sun Dec 27** · Lesson: per-asset RGB masks: R edge wear, G dirt, B paint chips, giving one prop many looks. *Drill:* three variants of one barrel from one mask. *Standard check:* RGB-mask variation shown on a reusable prop, as in Le Chlanko and Lemon.

### Week 11 · Dec 28 to Jan 3 · Set dressing and composition

- [ ] **Mon Dec 28** · Lesson: kitbashing: debris piles from existing props; joining vs instancing; exporting clusters. *Drill:* one wall-base debris cluster. *Feeds:* ground dressing.
- [ ] **Tue Dec 29** · Lesson: composition: rule of thirds, leading lines, framing; Blender's camera composition guides. *Drill:* three alternate compositions of your greybox. *Feeds:* P1 prop placement for Camera 1.
- [ ] **Fri Jan 1** · Buffer (New Year's Day): no lesson.
- [ ] **Sat Jan 2** · Lesson: Geometry Nodes scatter on selected faces: weeds in cracks and along wall bases. *Drill:* a crack-weed scatter on one ground tile. *Feeds:* foliage placement.
- [ ] **Sun Jan 3** · Buffer: catch up on any drill from Weeks 8 to 11.

### Week 12 · Jan 4 to 10 · Presentation scenes and cleanup

- [ ] **Mon Jan 4** · Lesson: presentation lighting in Blender: HDRI, three-point light, EEVEE vs Cycles. *Drill:* a small prop showcase vignette. *Feeds:* dressing the alternate cameras.
- [ ] **Tue Jan 5** · Lesson: shallow depressions and wet surfaces: modeling puddle inserts that sit flush with D01. *Drill:* one D06 puddle insert. *Feeds:* puddles and wetness.
- [ ] **Fri Jan 8** · Buffer: no lesson.
- [ ] **Sat Jan 9** · Lesson: mesh cleanup: Merge by Distance, Recalculate Normals, Select Non-Manifold, loose geometry. *Drill:* clean every kit file. *Feeds:* the full walkthrough fix list. *Standard check:* separate prop showcase scene, as in Courtyard.
- [ ] **Sun Jan 10** · Buffer: no lesson.

### Week 13 · Jan 11 to 17 · Light and value

- [ ] **Mon Jan 11** · Lesson: light basics that carry into UE5: sun vs sky, exposure, colour temperature, using your camera match. *Drill:* an EEVEE overcast study of Camera 1. *Feeds:* the UE5 lighting base.
- [ ] **Tue Jan 12** · Lesson: volumetrics: world volume scatter, light shafts. *Drill:* a fog study with a shaft at the far opening. *Feeds:* fog and the light shaft.
- [ ] **Fri Jan 15** · Lesson: colour management: AgX view transform, looks, exposure; reading values in greyscale. *Drill:* a value-only render of Camera 1. *Feeds:* post process and grading.
- [ ] **Sat Jan 16** · Lesson: lighting moods: the same camera in morning, overcast and night. *Drill:* three mood studies to pick UE5 setups from. *Feeds:* lighting the alternate cameras.
- [ ] **Sun Jan 17** · Review: compare the studies with your UE5 renders. *Standard check:* a value shot plus one alternative lighting mood, as in Greenhouse, Indian street and Windmill.

### Week 14 · Jan 18 to 24 · Game-ready polish

- [ ] **Mon Jan 18** · Lesson: fixing assets after critique without breaking UE5 references: same names, same pivots, reimport. *Drill:* fix two critiqued meshes and reimport them. *Feeds:* critique notes.
- [ ] **Tue Jan 19** · Lesson: LODs: Decimate for LOD1 and LOD2, naming for FBX LOD groups. *Drill:* LODs for one prop. *Feeds:* material and asset polish.
- [ ] **Fri Jan 22** · Lesson: collision: UCX_ convex hulls, when to use simple vs complex collision. *Drill:* collision for the skybridge and two props. *Feeds:* optimization.
- [ ] **Sat Jan 23** · Lesson: kit audit: Texel Density Checker on every module, triangle counts, naming; lay every module on a grid with text labels and dimensions. *Drill:* the full kit layout. *Feeds:* the kit breakdown level.
- [ ] **Sun Jan 24** · Review: final kit audit. *Standard check:* dimensioned kit sheet with a scale figure, as in Indian street and Le Chlanko.

### Week 15 · Jan 25 to 31 · Breakdown renders and the write-up

- [ ] **Mon Jan 25** · Lesson: breakdown renders in Blender: wireframe overlay, clay (Workbench or Matcap), UV checker. *Drill:* wireframe and clay of the kit. *Feeds:* breakdown renders.
- [ ] **Tue Jan 26** · Lesson: material-type overlay: colour every surface by trim vs unique texture. *Drill:* the trim/unique overlay of one facade, as in Lemon. *Feeds:* trim and material sheets.
- [ ] **Fri Jan 29** · Lesson: turntables: a camera on a circle path with Track To, as a Blender backup to Marmoset. *Drill:* a 10-second skybridge turntable. *Feeds:* turntables and flythrough.
- [ ] **Sat Jan 30** · Lesson: Video Sequencer: image sequences and clips, cuts, crossfades, titles, H.264 export. *Drill:* a 15-second test edit. *Feeds:* the flythrough edit.
- [ ] **Sun Jan 31** · Lesson: the written breakdown: intent, references, resources, kit sizes, workflow, credits, as in Farm. *Feeds:* the ArtStation post. *Standard check:* go through all 16 standards one last time.
