## Week 3 · Nov 2 to 8 · Materials, masks and baking

This week's goal is to build materials from free CC0 textures, add your own edge-wear and leak masks with nodes, bake them into game textures, and paint vertex colours that UE5 can use.

### Mon Nov 2 · The Shader Editor, PBR textures and a 2 m tile
<!-- id: c3d1 -->

**Goal:** load a full PBR texture set onto a material, understand each map, and scale it to the project's 200 cm tile.

**Time:** about 60 minutes for the lesson and 25 for the drill.

#### Watch and read first
{{RES}}

#### Steps
1. **The Shading workspace.** Click the *Shading* tab. The bottom half is the Shader Editor, where materials are built as nodes connected left to right into the *Material Output*.
2. **A new material.** Select an object, go to Material Properties and click *New*. You get a *Principled BSDF* node: one shader with inputs for Base Color, Metallic, Roughness, Normal and more. It matches what UE5's materials expect.
3. **Turn on Node Wrangler.** Edit > Preferences > Add-ons, search "Node Wrangler", tick it. It ships with Blender.
4. **Download a texture set.** From ambientCG, pick a brick material and download the 2K PNG zip. Unzip it. You'll see Color, Roughness, NormalGL, NormalDX, AmbientOcclusion and Displacement maps.
5. **Load them in one go.** In the Shader Editor, click the Principled BSDF node, press Ctrl+Shift+T, select the Color, Roughness, NormalGL and Displacement files and click *Principled Texture Setup*. Node Wrangler wires them, adds a Normal Map node, and adds Texture Coordinate and Mapping nodes on the left.
6. **Color vs Non-Color.** Colour maps are *sRGB*. Every data map (roughness, normal, AO, height, masks) must be *Non-Color* in the Image Texture node's Color Space menu. Node Wrangler sets this; check it every time you wire a map by hand.
7. **OpenGL vs DirectX normals.** Blender uses OpenGL normals (NormalGL); UE5 uses DirectX (NormalDX). Use GL in Blender and DX in UE5, or tick *Flip Green Channel* on the texture in UE5.
8. **Scale to the 2 m tile.** Add a plane (it's 2 × 2 m with UVs covering 0 to 1). With Mapping Scale 1, the texture covers exactly 2 m. Count the brick courses: the project wants 24 per 2 m (8.33 cm each). If the texture shows 12, set the Mapping Scale to 2, 2, 2; if it shows 16, set 1.5. Always scale X and Y together.
9. **Preview.** Ctrl+Shift+click any node to preview it on the object (a Node Wrangler shortcut). Switch the viewport to Material Preview (Z) to see the material.

#### Common mistakes
- Bumps going the wrong way. Usually a DX normal map in Blender or a Color-space normal map. Use NormalGL and Non-Color.
- Shiny, plastic-looking brick. The roughness map is set to sRGB, or plugged into the wrong input.
- Stretched bricks. X and Y were scaled differently; brick should be square-scaled.

#### Drill: tile an ambientCG brick at exactly 2 × 2 m (25 minutes)
Make a 2 × 2 m plane, set up a brick texture set with Node Wrangler and set the Mapping scale so the plane shows exactly 24 brick courses.

**Pass when:** you count 24 courses top to bottom, the mortar lines look recessed, every data map is Non-Color, and a second plane placed edge to edge continues the pattern with no visible join.

#### Use it on Mill Alley
Today you source the ten CC0 base sets (sooty brick, painted brick, setts, mud, concrete, moss, timber, rusted metal…) and rescale each to the 200 cm tile. Keep them in one file, `MillAlley_Materials.blend`, one plane per material, named `M01`…`M10` as in the plan.

### Tue Nov 3 · Procedural masks: edge wear and leak streaks
<!-- id: c3d2 -->

**Goal:** build reusable mask node groups that put wear on edges and streaks under ledges, the custom storytelling layer the plan uses instead of hand-made materials.

**Time:** about 75 minutes for the lesson and 30 for the drill.

#### Watch and read first
{{RES}}

#### Steps
1. **Use Cycles.** Render Properties > Render Engine: *Cycles*. The Bevel and Ambient Occlusion nodes only work properly in Cycles. View in Rendered mode (Z > Rendered).
2. **The mask toolkit.** These nodes do most of the work: *Color Ramp* (turns a soft greyscale into a crisp mask), *Math* (Multiply, Subtract, Power), *Noise Texture* (organic break-up), *Gradient Texture* and *Mix Color* (blends two colours by a mask).
3. **Edge mask.** Add *Input > Bevel* (Radius 0.02) and *Input > Geometry*. Plug Bevel's Normal and Geometry's Normal into a *Vector Math* node set to *Dot Product*. Flat areas give 1, rounded edges less than 1. Add *Math > Subtract* with 1 on top (1 − value) so edges become white, then *Math > Multiply* by about 10 and tick *Clamp*.
4. **Keep wear on exposed edges.** Add *Input > Ambient Occlusion*, take its AO output, and multiply it with the edge mask. Edges tucked into corners now get less wear.
5. **Break it up.** Add a *Noise Texture* (Scale 8, Detail 6) into a *Color Ramp* with the stops pushed close together, and multiply that with the edge mask. Wear now comes in chips instead of a clean line.
6. **Leak streaks.** Add *Texture Coordinate* (use its *Object* output) into *Separate XYZ*, and take Z into a *Color Ramp* so the mask is white at the top of the object and fades to black lower down. Add a second Noise Texture, fed by a *Mapping* node with Scale X 20, Y 20, Z 1, which stretches the noise into vertical drips. Multiply gradient × drips and sharpen with a Color Ramp.
7. **Use the masks.** A *Mix Color* node blends two colours (clean brick and dark grime) using the mask as Factor. Feed the same mask into a Math node to raise roughness where it's dirty.
8. **Make node groups.** Select the edge-mask nodes and press Ctrl+G. Tab in and out of the group. In the sidebar (N > Group) add inputs such as *Radius* and *Amount*, and rename the group `NG_EdgeWear`. Do the same for `NG_LeakStreaks`. Right-click a group > *Mark as Asset* to reuse it in other files.

#### Common mistakes
- A mask that's all white or all black. Preview each node (Ctrl+Shift+click) to find the step that fails, and check the Color Ramp stops.
- Seeing nothing from the Bevel or AO node. You're in EEVEE or Material Preview; switch to Cycles Rendered.
- Leak noise stretched sideways. Mapping Scale must be large on X and Y and small on Z.

#### Drill: edge wear on a bevelled cube (30 minutes)
Add a cube with a Bevel modifier (Amount 0.03, 3 segments). Give it a dark painted-metal material and use `NG_EdgeWear` to mix in a bright bare-metal colour and lower roughness on the edges.

**Pass when:** wear shows only on outside edges, it breaks into chips rather than a solid line, the inner corners stay clean, and changing the group's Amount input widens or narrows the wear.

#### Use it on Mill Alley
Today you build the edge-wear and leak mask groups and drive a test wall module with them. Put the leak streaks under a sill on your B02 drill wall from Week 2 and the edge wear on its corners.

### Fri Nov 6 · Baking procedural materials to tiling textures
<!-- id: c3d3 -->

**Goal:** bake a node material to image textures UE5 can use, and make sure they tile.

**Time:** about 75 minutes for the lesson and 30 for the drill.

#### Watch and read first
{{RES}}

#### Steps
1. **Why bake.** UE5 can't read Blender nodes. Baking renders the material's result into images (colour, roughness, normal, masks).
2. **Set up Cycles.** Render Properties > Render Engine *Cycles*. Open the *Bake* panel lower down.
3. **Make the target image.** In the material, add an *Image Texture* node, click *New*, name it (`T_M01_Brick_BaseColor`), set 2048 × 2048, untick Alpha. Leave it unconnected and click it last, so it is the *active* node: Cycles bakes into the active Image Texture node.
4. **Bake colour.** Bake Type *Diffuse*, and under Influence tick only *Color* (untick Direct and Indirect) so lighting isn't baked in. Click *Bake*.
5. **Bake anything else through Emission.** For roughness or a mask, temporarily plug that value into an *Emission* shader connected to the Material Output, set Bake Type to *Emit*, and bake into a new image whose Color Space is *Non-Color*. Reconnect the Principled BSDF afterwards.
6. **Bake normals.** Bake Type *Normal*, Space *Tangent*, into a Non-Color image. This captures normal detail from the material's Normal input.
7. **Save the images.** Baked images live only in memory. In the Image Editor, Image > Save As (PNG, 8-bit for colour and masks, 16-bit for normal and height). Unsaved bakes are lost when you close Blender.
8. **Make procedural noise tile.** Image-based layers (the ambientCG brick) already tile. Procedural noise doesn't. To make it seamless, build a `NG_SeamlessNoise` group: UV coordinates > Separate XYZ; multiply X and Y by 6.2832; take Cosine and Sine of each; Combine XYZ from (cos X, sin X, cos Y); feed that into a Noise Texture set to *4D*, with Sine Y into *W*. The noise now wraps perfectly at the UV edges.
9. **Check the tile.** Apply the baked images to a plane, set the Mapping Scale to 3 and look for seams or obvious repeats.

#### Common mistakes
- "No active image found". Click the target Image Texture node before baking.
- Lighting baked into the colour map. Untick Direct and Indirect when baking Diffuse.
- A visible line through the middle of the 3 × 3 check. A procedural layer isn't seamless; route it through `NG_SeamlessNoise`.

#### Drill: bake one brick variant and check it tiles (30 minutes)
Take your M01 brick, add soot with seamless noise and the edge-wear group, and bake Base Color, Roughness and Normal at 2K.

**Pass when:** the three PNGs are saved, a 3 × 3 tile of them shows no seams, and the colour map has no baked shadows.

#### Use it on Mill Alley
Today you build brick sets M01 to M04 (soot, limewash peel, infill variants) and bake them to 2K tiling sets. Use the naming `T_M01_Brick_BaseColor`, `T_M01_Brick_Normal`, `T_M01_Brick_ORM` (packed tomorrow).

### Sat Nov 7 · Seamless checks and channel packing
<!-- id: c3d4 -->

**Goal:** pack several greyscale maps into one texture's red, green and blue channels, the way game studios save memory.

**Time:** about 50 minutes for the lesson and 30 for the drill.

#### Watch and read first
{{RES}}

#### Steps
1. **Why pack.** Roughness, ambient occlusion and metallic are each one greyscale channel. One RGB texture holds three of them for the cost of one. UE5's usual order is **ORM**: R = Ambient Occlusion, G = Roughness, B = Metallic.
2. **Build a packing material.** On a plane, add three Image Texture nodes with your AO, roughness and metallic images, each set to *Non-Color*. Add a *Combine Color* node (mode RGB) and plug them into Red, Green and Blue. Plug Combine Color into an *Emission* shader and that into the Material Output.
3. **Bake the pack.** Add a new 2048 image named `T_M01_Brick_ORM`, set its Color Space to *Non-Color*, make it the active node, and bake with Bake Type *Emit*. Save it as PNG.
4. **Pack masks the same way.** For a mask texture: R = edge wear, G = dirt, B = leaks. You'll use exactly this in Week 10 for prop variations.
5. **Check the pack.** Open the saved file in the Image Editor and use the channel dropdown in its header to view R, G and B separately. Each should look like the map you put in.
6. **Import correctly in UE5.** For packed and mask textures, untick *sRGB* and set Compression to *Masks*. Leave sRGB on only for colour maps.

#### Common mistakes
- Packed maps that look washed out. The target image or a source node was sRGB. Everything in a pack is Non-Color.
- Channels in the wrong order. Write the order into the file name or your notes (ORM).
- Forgetting sRGB off in UE5. The roughness will be wrong in engine even though the file is right.

#### Drill: pack edge wear, dirt and leaks into one RGB texture (30 minutes)
Bake the three masks from Tuesday's groups to separate images on a test module, then pack them into `T_Test_Masks_RGB`.

**Pass when:** viewing R, G and B separately shows edge wear, dirt and leaks respectively, and the file is 2K, Non-Color and saved.

#### Use it on Mill Alley
Today you finish M05 to M10 (setts, mud, concrete, moss, timber, rusted metal), bake each to 2K with an ORM pack, and bake the edge-wear and leak masks for the kit test pieces.

### Sun Nov 8 · Colour attributes (vertex colours) for UE5 blending
<!-- id: c3d5 -->

**Goal:** paint red, green and blue vertex colours on a mesh and use them in UE5 to blend moss, grime and wet onto walls.

**Time:** about 50 minutes for the lesson and 30 for the drill.

#### Watch and read first
{{RES}}

#### Steps
1. **What it is.** Every vertex can store a colour. UE5 materials read it as three masks: in this project R = moss, G = grime, B = wet. Painting them is how one tiling wall gets unique moss and grime.
2. **Vertices matter.** Colour blends between vertices, so a single big quad gives a smooth blur. Add loop cuts (or a Subdivide) where you want detail. You'll plan this properly in Week 10.
3. **Add a colour attribute.** Object Data Properties > Color Attributes > +. Name it `Col`, Domain *Vertex*, Data Type *Color*.
4. **Start black.** Switch to Vertex Paint mode (the mode menu, top left). Set the brush colour to pure black and use Paint > Set Vertex Colors (Shift+K) to fill the whole mesh black: no moss, no grime, no wet.
5. **Paint one channel at a time.** Set the brush colour to pure red (1, 0, 0) and the brush *Blend* mode to **Add**. Add raises only the red channel, leaving green and blue untouched. Use *Subtract* with the same red to erase. Repeat with green and blue for the other masks.
6. **See it.** In Solid mode, open the shading dropdown and set Color to *Attribute* to see the paint at any time.
7. **Export it.** In the FBX exporter's Geometry section, keep the *Vertex Colors* option at its default (sRGB), not *None*. Pure red, green and blue paint arrives exactly; check one soft gradient in UE5 the first time to see how blends transfer.
8. **Import it in UE5.** In the import options, set *Vertex Color Import Option* to *Replace*. In a test material, add a *Vertex Color* node and use its R output as the Alpha of a *Lerp* between your brick and moss textures.
9. **Painting in UE5 too.** UE5's Mesh Paint mode paints the same channels on placed meshes. You'll mostly paint there; Blender painting is for assets that need baked-in variation.

#### Common mistakes
- Painting with Mix blend and pure red. Mix overwrites green and blue to 0, erasing your other masks. Use Add and Subtract.
- Painting a mesh with too few vertices. You get blurry triangles. Add loop cuts first.
- Vertex colours missing in UE5. Check the FBX colour option and UE5's *Replace* import option.

#### Drill: paint a moss channel and see it in UE5 (30 minutes)
Make a 4 × 4 m wall with about 8 loop cuts each way. Fill it black, paint red moss along the bottom and under a ledge, export it, and import it into UE5 with a Lerp test material.

**Pass when:** moss appears in UE5 exactly where you painted it, green and blue stay at zero (check in Blender with Solid > Attribute), and the brick still shows where you didn't paint.

#### Use it on Mill Alley
Today you build `M_Master_Kit` in UE5 with the vertex height blend and Review 3. Use your drill wall as the test mesh. For the standard check, render your ten materials on cylinders side by side, as Courtyard and Tsushima do, and save the image for the material sheet.
