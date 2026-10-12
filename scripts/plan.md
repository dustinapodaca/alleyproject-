# Derelict Mill Alley — 15-Week Environment Art Plan

Updated Oct 12, 2026 · Dustin Apodaca

## Overview

The goal is a 1:1 recreation of the reference: a derelict Victorian mill alley, about 40 m long, finished in 15 weeks (Mon Oct 19, 2026 to Sun Jan 31, 2027). It ships as a portfolio piece built the way a AAA team would build it: metrics-locked greybox, tiling materials and trim sheets, a reusable modular kit, a few unique hero assets, then dressing, lighting and renders.

**What the piece must prove**

- One kit, many walls: two building facades assembled from about 30 snapping modules on a 25 cm grid.
- Hero craft: the two-tier skybridge, the chimney silhouette and the basement light well break the modular rhythm and carry the shot.
- Material depth: vertex-painted height blends (brick, moss, grime, wet) and decals do the storytelling, not unique textures on every wall.
- A reference-matched camera: the final beauty shot lines up with the photo, plus 4 to 6 original angles.

**Pipeline order**

1. Pre-production: reference breakdown, scale, kit plan
2. Greybox: blockout, camera match, metrics lock
3. Materials: CC0 and procedural tiling sets, custom edge-wear and leak masks, trim sheets
4. Modular kit: meshes, UVs, snapping tests
5. Hero assets: Blender sculpt and retopo, Marmoset bake and texture
6. Props and debris
7. Foliage: ivy, moss, weeds, background trees
8. Set dressing: decals, vertex paint, storytelling
9. Lighting and atmosphere
10. Optimization and polish
11. Final renders and presentation

**Assumptions**

- Tools: Blender (modeling, sculpting, UVs, procedural material authoring, camera match, video edit), Marmoset Toolbag (baking, texturing, turntables, asset renders), Unreal Engine 5 (assembly, Lumen, Nanite, materials, set dressing, Movie Render Queue).
- Units: metric, 1 Unreal unit = 1 cm.
- Days: Monday, Tuesday, Friday, Saturday and Sunday, about one 4 to 6 hour session each; Wednesday and Thursday are off. The last workday of each week is review and catch-up. Christmas (Fri Dec 25) and New Year's Day (Fri Jan 1) are buffer days, with five more buffer days around the holidays.

## Reference breakdown and 1:1 scale

![Reference image](reference.jpg){width=5.5in}

The alley is about 5 m wall to wall and 20 m tall, framed by two mill buildings and capped by a skybridge 6 m up. All sizes below are estimates read from the photo using known human-scale anchors: the handrail (100 cm), stair risers (18 cm), door heights (210 to 260 cm) and Victorian brick coursing. Lock them on Day 3 by camera-matching the photo in Blender and checking each one against the blockout.

**Scene zones (front to back)**

1. Foreground: debris-covered ground, planks, plywood sheet, cables, moss patches, dead branches.
2. Left wall: dark sooty brick mill, tall blind arch recesses at ground level, pilasters, drainpipe, ivy falling from the parapet, glazed upper windows.
3. Right wall: grey painted brick building, tall steel-framed multi-pane windows, stone sills and lintels, a projecting mossy ledge, a basement light well with steps and a green tube handrail.
4. Midground: two-tier skybridge (timber-clad enclosed bridge over a steel girder deck), low arched loading door with rusted sheet doors on the left.
5. Background: red brick end building, tall square chimney, roof overgrowth, bright overgrown opening at the alley's far end (the focal light).

**Measurements**

| Element | Width (cm) | Height (cm) | Depth (cm) | Notes |
| --- | --- | --- | --- | --- |
| Alley, wall to wall | 500 | | 4000 visible length | about 400 clear walkway beside the light well |
| Left mill height | | 2000 | | 5 storeys at 400 floor to floor, plus parapet |
| Right building height | | 1900 | | 5 storeys at about 380 floor to floor |
| Brick (Victorian imperial) | 23 | 7.6 | 11 | 1 cm joints, so 8.6 cm per course, about 12 courses per metre |
| Left pilaster | 60 | full height | 25 projection | every 400 along the wall |
| Left blind arch recess | 200 | 550 | 25 recess | round head, bricked-up infill |
| Left arched loading door | 240 | 320 | 40 reveal | rusted sheet doors |
| Right window opening | 140 | 220 | 30 reveal | steel frame, panes about 25 x 35 |
| Right window bay spacing | 300 | 380 | | 160 of brick pier between openings |
| Stone sill | 160 | 15 | 20 | 5 projection, drip groove |
| Stone lintel | 170 | 30 | 30 | flush or 2 projection |
| Right mossy ledge / plinth | runs wall | 50 | 60 | top surface takes world-aligned moss |
| Basement light well | 120 | 200 drop | 380 | 11 risers at 18, treads 28 |
| Handrail | 4.2 diameter | 100 | | posts every 150, painted green |
| Skybridge, enclosed tier | 500 span | 300 | 250 | underside at about 600 above ground |
| Skybridge, girder deck | 500 span | 40 | 250 | steel I-beams about 30 deep, sits under the enclosed tier |
| Chimney stack | 180 | 2800 to top | 180 | top at about 28 m, corbelled cap |
| Cast-iron drainpipe | 10 diameter | full height | | hopper head 30 x 30, brackets every 180 |
| Plywood sheet | 122 | 1.8 | 244 | prop |
| Timber plank | 15 | 5 | 240 | prop |
| Ground setts (cobbles) | 10 | | 20 | mostly buried under mud and debris |

**Metrics to hold for the whole project**

- Grid snap 25 cm; modules on 100, 200 and 400 cm widths.
- Floor to floor 400 (left) and 380 (right); pivots at bottom-left-back of each module.
- Texel density 10.24 px/cm (1024 px/m) for surfaces within 5 m of camera; 5.12 px/cm for upper floors and background.
- Brick tiling texture covers 200 x 200 cm with 24 courses (8.33 cm each, a small cheat on the real 8.6) so coursing lines up at every 100 cm module edge.

## Modular kit

The kit is 31 pieces in four families that build both facades, the ground and the structural details. Every piece snaps on a 25 cm grid, uses tiling materials or one of three trim sheets, and takes vertex paint for moss, grime and wet.

**Rules**

- Naming: `SM_MillAlley_<Family>_<Piece>_<W>x<H>`, for example `SM_MillAlley_A_WallFlat_400x400`.
- Pivot at bottom-left-back; walls 400 cm tall so one module = one storey.
- Wall faces use tiling materials (UV0) at the locked texel density; a second UV for lightmaps is optional since Lumen is on.
- Edges get a 1 to 2 cm bevel with weighted normals, so silhouettes catch light without bakes.
- Each family is tested in a kit-bash scene before it goes into the alley.

**Family A: left mill (dark sooty brick)**

| ID | Piece | Size (cm) | Material |
| --- | --- | --- | --- |
| A01 | Wall flat | 400 x 400, 200 x 400, 100 x 400 | Brick sooty |
| A02 | Pilaster | 60 x 400, 25 projection | Brick sooty |
| A03 | Blind arch recess with brick infill | 300 x 600 | Brick sooty + infill variant |
| A04 | Upper window, round head, glazed | 300 x 400 | Brick + metal trim + dirty glass |
| A05 | Arched loading door surround | 300 x 400 | Brick + stone trim |
| A06 | Outer and inner corner | 50 x 400 | Brick sooty |
| A07 | String course | 400 long | Stone trim |
| A08 | Parapet with coping | 400 x 100 | Brick + stone trim |
| A09 | Base course / plinth | 400 x 60 | Brick sooty, wet blend |

**Family B: right building (grey painted brick)**

| ID | Piece | Size (cm) | Material |
| --- | --- | --- | --- |
| B01 | Wall flat, painted | 400 x 380, 200 x 380, 100 x 380 | Brick painted grey |
| B02 | Window bay (opening, sill, lintel) | 300 x 380 | Brick painted + stone trim |
| B03 | Steel window insert: intact, broken, gutted | 140 x 220 | Metal trim + dirty glass |
| B04 | Door bay with timber door | 300 x 380 | Brick painted + timber trim |
| B05 | Projecting ledge / plinth | 400 x 50, 60 deep | Stone trim + world-aligned moss |
| B06 | Light well: walls, steps, landing | 120 x 380, 200 drop | Concrete + stone trim |
| B07 | Floor band | 400 long | Stone trim |
| B08 | Outer corner | 50 x 380 | Brick painted |
| B09 | Roof edge with gutter | 400 long | Stone + metal trim |

**Family C: structure and metal**

| ID | Piece | Size (cm) | Material |
| --- | --- | --- | --- |
| C01 | Steel I-beam | 100, 200, 400 long, 30 deep | Metal trim, rusted paint |
| C02 | Drainpipe: straight, elbow, offset, shoe | 100, 200, 400; 10 diameter | Metal trim |
| C03 | Hopper head | 30 x 30 | Metal trim |
| C04 | Pipe and cable bracket, wall hook | 10 to 30 | Metal trim |
| C05 | Handrail: straight, post, bend, end cap | 100, 150, 200 | Metal trim, green paint |
| C06 | Gutter run and bracket | 200, 400 | Metal trim |

**Family D: ground**

| ID | Piece | Size (cm) | Material |
| --- | --- | --- | --- |
| D01 | Ground tile, setts under mud | 400 x 400 | Ground blend: setts, mud, moss, puddle |
| D02 | Kerb / wall-base strip | 400 long | Stone trim |
| D03 | Drain grate and channel | 100 x 30 | Metal trim |
| D04 | Rubble edge strip (ground meets wall) | 400 long | Ground + brick rubble |
| D05 | Broken ground patch (exposed setts) | 200 x 200 | Ground setts |
| D06 | Puddle insert (shallow depression) | 150 x 100 | Ground + wet |
| D07 | Wall-base dirt pile | 200 long | Ground mud |

**Trim sheets (2048 x 2048, 10.24 px/cm)**

- T01 Stone: sills, lintels, coping, string courses, kerbs.
- T02 Metal: window frames, beams, rails, pipes, gutters, brackets.
- T03 Timber: boards, door planks, skybridge cladding strips, window mullions.

## Unique hero features

Seven unique features break the kit's rhythm and give the eye somewhere to land; the skybridge is the centrepiece and gets the most time (Week 6).

| # | Feature | Why it matters in the shot | Build approach |
| --- | --- | --- | --- |
| H1 | Two-tier skybridge | Frames the vanishing point; the only warm colour in the scene | Blender sculpt of rotted cladding; Marmoset bake and texture (peeling red and green paint) to a unique 4K set, girders from C01 |
| H2 | Chimney stack and red end building | Silhouette anchor against the bright sky | Mid-poly, tiling red brick with a unique corbelled cap; Nanite |
| H3 | Basement light well with green handrail | Foreground depth cue and leading line | Built from B06 and C05, hand-placed moss, wet steps, debris on landing |
| H4 | Cascading ivy and wall growth | Breaks hard brick edges on the left; adds a second green | Spline or hand-placed ivy cards from the parapet down the drainpipe; buddleia tufts in mortar joints |
| H5 | Overgrown far opening | The light source and focal point at the end of the alley | Dense foliage, bright exposure, volumetric fog shaft |
| H6 | Rusted arched loading doors | Mid-left story beat; texture contrast to brick | Unique doors (sheet steel, hinges, rust bleed) sitting in A05 |
| H7 | Broken industrial glazing | Repeats down the right wall; catches sky reflections | Three B03 variants plus glass shard decals and scatter on sills |

## Full asset list

The scene needs 79 assets: 31 kit pieces, 7 hero features, 22 props, 10 foliage assets and 9 decal sets. Budgets are LOD0 triangles for a game-ready version; keep them even with Nanite on, since reviewers check wireframes. P1 = needed for the reference shot, P2 = needed for alternate angles, P3 = only if time allows.

**Kit and heroes**

| ID | Asset | Count | Tris each | Textures | Priority |
| --- | --- | --- | --- | --- | --- |
| A01 to A09 | Left mill kit | 9 | 300 to 3,000 | Tiling + T01 | P1 |
| B01 to B09 | Right building kit | 9 | 300 to 4,000 | Tiling + T01, T02, T03 | P1 |
| C01 to C06 | Structure and metal kit | 6 | 100 to 1,500 | T02 | P1 |
| D01 to D07 | Ground kit | 7 | 500 to 4,000 | Ground blend | P1 |
| H1 | Skybridge | 1 | 40,000 | Unique 4K + T02, T03 | P1 |
| H2 | Chimney and end building | 1 | 8,000 | Tiling red brick + unique 2K cap | P1 |
| H3 | Light well vignette | 1 | built from kit | Kit + decals | P1 |
| H4 | Ivy and wall growth set | 1 | 15,000 per cluster | Foliage atlas | P1 |
| H5 | Far opening foliage mass | 1 | 30,000 | Foliage atlas | P1 |
| H6 | Arched loading doors | 1 | 3,000 | Unique 2K | P2 |
| H7 | Broken glazing variants | 3 | 800 | T02 + glass | P1 |

**Props and debris**

| ID | Asset | Size (cm) | Tris | Textures | Priority |
| --- | --- | --- | --- | --- | --- |
| P01 | Plywood sheet, warped and delaminating | 122 x 244 | 400 | Unique 2K | P1 |
| P02 | Timber planks, 4 variants | 15 x 240 | 200 each | T03 | P1 |
| P03 | Broken timber offcuts, 6 variants | 10 to 60 | 100 each | T03 | P1 |
| P04 | Loose bricks and half bricks, 6 variants | 23 x 11 | 150 each | Unique 1K atlas | P1 |
| P05 | Rubble pile cluster, 3 variants | 100 to 200 | 2,500 | Ground + brick atlas | P1 |
| P06 | Rusted pipe lengths, 3 variants | 100 to 300 | 300 | T02 | P1 |
| P07 | Hanging and loose cables, spline | any | 50 per metre | Tiling cable | P1 |
| P08 | Fallen gutter section | 200 | 600 | T02 | P2 |
| P09 | Broken window frame on ground | 140 x 220 | 800 | T02 | P2 |
| P10 | Glass shards scatter, 8 pieces | 5 to 20 | 20 each | Glass | P2 |
| P11 | Dead branches, 5 variants | 50 to 200 | 400 | Foliage atlas | P1 |
| P12 | Corrugated sheet, bent | 80 x 200 | 1,200 | Unique 1K | P2 |
| P13 | Rusted barrel or drum, on its side | 60 diameter | 1,500 | Unique 2K | P3 |
| P14 | Crate, broken | 60 x 60 | 600 | T03 | P3 |
| P15 | Plastic litter: bags, bottles, cans | 5 to 40 | 100 each | Unique 1K atlas | P2 |
| P16 | Paper and cardboard scraps | 10 to 50 | 20 each | Atlas | P2 |
| P17 | Wall-mounted junction box | 30 x 40 | 400 | T02 | P2 |
| P18 | Old wall lamp bracket | 40 | 600 | T02 | P2 |
| P19 | Fallen roof slates | 25 x 50 | 20 each | Atlas | P3 |
| P20 | Pallet, rotten | 120 x 100 | 800 | T03 | P3 |
| P21 | Wire mesh panel, crumpled | 100 x 200 | 1,000 | Opacity mask | P3 |
| P22 | Hose or flex pipe, spline | any | 60 per metre | Tiling rubber | P3 |

**Foliage**

| ID | Asset | Tris | Priority |
| --- | --- | --- | --- |
| F01 | Ivy cards and vine splines | 200 per card | P1 |
| F02 | Moss clumps, 3 sizes | 50 to 200 | P1 |
| F03 | Grass and weed tufts, 6 variants | 300 to 800 | P1 |
| F04 | Buddleia bush (grows from walls) | 4,000 | P1 |
| F05 | Dead leaves scatter | 4 per leaf | P1 |
| F06 | Brambles | 3,000 | P2 |
| F07 | Small birch and sycamore saplings | 8,000 | P1 |
| F08 | Background trees (far opening) | 20,000 | P1 |
| F09 | Roof-edge weeds for the chimney building | 1,500 | P2 |
| F10 | Ferns in damp corners | 1,200 | P3 |

**Decal sets**

| ID | Decal set | Priority |
| --- | --- | --- |
| X01 | Water leaks and streaks under sills and pipes | P1 |
| X02 | Soot and grime gradients up from the ground | P1 |
| X03 | Moss and algae patches | P1 |
| X04 | Brick damage, spalling and cracks | P1 |
| X05 | Peeling paint edges (right wall) | P1 |
| X06 | Rust bleed from metal fixings | P1 |
| X07 | Puddle and wet-ground patches | P1 |
| X08 | Oil stains and mud tracks | P2 |
| X09 | Old painted signage, faded | P3 |

## Materials and texture plan

Ten tiling materials, three trim sheets and one master material carry almost every surface; unique texture sets are kept to the skybridge, doors and a few props.

**Tiling materials (CC0 or procedural bases customized in Blender with custom edge-wear and leak masks, 2K, height-blend ready)**

| ID | Material | Tile size (cm) | Used on |
| --- | --- | --- | --- |
| M01 | Brick, sooty dark (Victorian, recessed mortar) | 200 x 200 | Family A |
| M02 | Brick, grey limewash peeling to red brick | 200 x 200 | Family B |
| M03 | Brick, red clean (background) | 200 x 200 | H2 |
| M04 | Brick infill, mismatched | 200 x 200 | A03 |
| M05 | Ground setts under mud | 200 x 200 | D01, D05 |
| M06 | Mud and dirt with organic debris | 200 x 200 | Ground blend layer |
| M07 | Concrete, weathered | 200 x 200 | B06 light well |
| M08 | Moss and algae | 100 x 100 | Blend layer, world-aligned on top faces |
| M09 | Timber, painted and peeling (red, green) | 200 x 200 | H1, doors |
| M10 | Rusted painted metal | 100 x 100 | Large metal surfaces |

**Master materials (Unreal)**

- `M_Master_Kit`: tiling base + 3-layer vertex paint height blend (R moss, G grime, B wet), world-aligned moss on up-facing surfaces, macro variation to kill tiling, edge wear from a baked mask, and world-space leak streaks under sills and ledges.
- `M_Master_Trim`: trim sheet base with the same vertex blend.
- `M_Master_Decal`: DBuffer decals with normal and roughness.
- `M_Master_Foliage`: two-sided, subsurface, wind.
- `M_Master_Glass`: dirty, cracked, roughness from a grime mask.

**Unique texture sets (Marmoset Toolbag texturing)**

- H1 skybridge: 4K, 2 sets (cladding, structure).
- H2 chimney cap: 2K. H6 loading doors: 2K. P01 plywood: 2K.
- Prop atlases: bricks, litter, paper, slates at 1K to 2K each.

## Daily schedule

75 workdays from Oct 19, 2026 to Jan 31, 2027, on a Monday, Tuesday, Friday, Saturday, Sunday week with Wednesday and Thursday off: 68 production days and 7 buffer days. Each week ends with a review against the reference; tick each day off as you go.

![Production timeline](timeline.png){width=6.5in}

The kit is done by Sun Nov 22, so everything after it builds on locked metrics; set dressing absorbs the two holiday weeks.

### Week 1 · Oct 19 to 25 · Pre-production

- [ ] **Mon Oct 19** · Build a reference board (a Blender reference scene or any image board): the photo plus 40+ supporting shots (northern English mills, Victorian brick, steel windows, skybridges, ivy on brick). *Done when:* sorted by scene zone.
- [ ] **Tue Oct 20** · Paint over the reference: circle every repeating element (kit) and every one-off (hero); draft kit IDs. *Done when:* annotated paintover saved.
- [ ] **Fri Oct 23** · Camera match in Blender: photo as camera background, align the vanishing lines, set focal length; block primitive volumes at the measured sizes. *Done when:* overlay lines up with the photo.
- [ ] **Sat Oct 24** · Lock metrics, naming and folders; set up the UE5 project and source control (Git LFS or Perforce). *Done when:* metrics sheet and empty project committed.
- [ ] **Sun Oct 25** · Lighting and mood paintover (overcast, cool, wet); Review 1. *Done when:* target image saved next to the reference.

### Week 2 · Oct 26 to Nov 1 · Greybox

- [ ] **Mon Oct 26** · Greybox ground and both building masses in UE5 at scale; place a 180 cm mannequin. *Done when:* walkable alley.
- [ ] **Tue Oct 27** · Greybox the left facade with placeholder A01 to A09 at final dimensions. *Done when:* left wall reads like the photo.
- [ ] **Fri Oct 30** · Greybox the right facade with B01 to B09, including the ledge and light well. *Done when:* right wall reads like the photo.
- [ ] **Sat Oct 31** · Greybox skybridge, chimney, end building and loading door; set Camera 1 (reference match) and 3 alternate cameras. *Done when:* full silhouette matches.
- [ ] **Sun Nov 1** · Blockout lighting (sun, sky, fog), walkthrough, Review 2; lock the greybox. *Done when:* side-by-side greybox vs reference.

### Week 3 · Nov 2 to 8 · Tiling materials

- [ ] **Mon Nov 2** · Source CC0 base materials (ambientCG, Poly Haven, Blendkit free) for sooty brick, painted brick, setts, mud, concrete, moss, timber and rusted metal; rescale each to the 200 cm tile metric. *Done when:* 10 base sets in a Blender material library.
- [ ] **Tue Nov 3** · Build custom mask node groups in Blender: edge wear (Bevel and AO nodes into a noise-broken threshold) and leak streaks (object-space vertical gradient times stretched noise, starting under sills and ledges). *Done when:* both masks drive a test wall module.
- [ ] **Fri Nov 6** · Brick sets M01 to M04: soot, limewash peel and infill variations layered with the mask groups; bake to 2K tiling sets. *Done when:* brick sets tile cleanly at 200 cm.
- [ ] **Sat Nov 7** · M05 to M10 (setts, mud, concrete, moss, timber, rusted metal): adjust and bake to 2K; bake edge-wear and leak masks for the kit test pieces. *Done when:* all 10 materials exported.
- [ ] **Sun Nov 8** · Build `M_Master_Kit` in UE5: vertex height blend, world-aligned moss, a world-space leak streak and a baked edge-wear input; Review 3. *Done when:* painting moss, grime and wet works.

### Week 4 · Nov 9 to 15 · Trim sheets and Family A

- [ ] **Mon Nov 9** · Model T01 stone and T02 metal trim strips in Blender; bake to 2048 sheets in Marmoset. *Done when:* 2048 sheets with normal, AO, height.
- [ ] **Tue Nov 10** · T03 timber trim sheet; `M_Master_Trim`; set up a texel density checker. *Done when:* all three sheets in engine.
- [ ] **Fri Nov 13** · Model A01, A02, A06, A09 with bevels and UVs. *Done when:* snap test passes on the 25 cm grid.
- [ ] **Sat Nov 14** · Model A03 blind arch with infill, A05 door surround, A07 string course, A08 parapet. *Done when:* in engine with materials.
- [ ] **Sun Nov 15** · Model A04 window; replace the left greybox with the kit; Review 4. *Done when:* left wall fully kit-built.

### Week 5 · Nov 16 to 22 · Families B, C and D

- [ ] **Mon Nov 16** · Model B01, B07, B08, B09. *Done when:* snap test passes.
- [ ] **Tue Nov 17** · Model B02 window bay and the three B03 steel window variants. *Done when:* bays swap variants cleanly.
- [ ] **Fri Nov 20** · Model B04 door bay, B05 ledge, B06 light well. *Done when:* right wall fully kit-built.
- [ ] **Sat Nov 21** · Model Family C: beams, drainpipes, hopper head, brackets, handrail, gutters. *Done when:* pipes run full height with no gaps.
- [ ] **Sun Nov 22** · Model Family D ground pieces; replace all remaining greybox; Review 5 with a kit-only screenshot. *Done when:* the alley is 100% kit.

### Week 6 · Nov 23 to 29 · Hero: skybridge (H1)

- [ ] **Mon Nov 23** · Plan the skybridge from reference; model the base mesh (frame, cladding boards, windows, girder deck). *Done when:* matches greybox volume.
- [ ] **Tue Nov 24** · Sculpt in Blender: warped and broken boards, rot, sagging, splintered window frames. *Done when:* high poly reads at Camera 1 distance.
- [ ] **Fri Nov 27** · Retopo the low poly, UV into two 4K sets. *Done when:* under 40,000 tris, clean UVs.
- [ ] **Sat Nov 28** · Bake in Marmoset; start the Marmoset texture project: peeling red and green paint, rot, rust on girders. *Done when:* base materials and masks in.
- [ ] **Sun Nov 29** · Finish texturing, import, place; Review 6 against the reference. *Done when:* skybridge final in Camera 1.

### Week 7 · Nov 30 to Dec 6 · Heroes H2, H3, H6, H7

- [ ] **Mon Nov 30** · Model the chimney and red end building; sculpt the corbelled cap. *Done when:* silhouette locked.
- [ ] **Tue Dec 1** · Texture the chimney cap; model and texture H6 rusted loading doors. *Done when:* both final in engine.
- [ ] **Fri Dec 4** · H7 broken glazing variants and `M_Master_Glass`; assemble H3 light well vignette; Review 7. *Done when:* all heroes in scene.
- [ ] **Sat Dec 5** · Buffer: catch up on anything late from Weeks 3 to 7.
- [ ] **Sun Dec 6** · Buffer.

### Week 8 · Dec 7 to 13 · Props and debris

- [ ] **Mon Dec 7** · P01 plywood, P02 planks, P03 offcuts. *Done when:* textured and placed in a prop gallery level.
- [ ] **Tue Dec 8** · P04 bricks and P05 rubble piles (sculpt, bake, atlas). *Done when:* 3 rubble clusters ready.
- [ ] **Fri Dec 11** · P06 pipes, P07 cable spline, P08 fallen gutter, P09 broken frame. *Done when:* cable spline usable in level.
- [ ] **Sat Dec 12** · P10 glass shards, P11 dead branches, P12 corrugated sheet, P15 litter, P16 paper. *Done when:* all P1 and P2 small props done.
- [ ] **Sun Dec 13** · P17 junction box, P18 lamp bracket, then P3 props if time; Review 8 with a prop sheet. *Done when:* prop gallery screenshot.

### Week 9 · Dec 14 to 20 · Foliage

- [ ] **Mon Dec 14** · Model leaves (ivy, buddleia, grass, weeds) in Blender and bake a foliage atlas in Marmoset. *Done when:* atlas with opacity, normal, translucency.
- [ ] **Tue Dec 15** · F01 ivy cards and vine splines; place H4 ivy down the left wall and drainpipe. *Done when:* ivy breaks the parapet line like the photo.
- [ ] **Fri Dec 18** · F02 moss clumps, F03 grass and weeds, F05 dead leaves. *Done when:* paintable with the foliage tool.
- [ ] **Sat Dec 19** · F04 buddleia, F06 brambles, F07 saplings. *Done when:* all with wind.
- [ ] **Sun Dec 20** · F08 background trees and the H5 far opening mass; Review 9. *Done when:* far end reads bright and green.

### Week 10 · Dec 21 to 27 · Decals and vertex paint

- [ ] **Mon Dec 21** · Build decals X01 to X04 and `M_Master_Decal`. *Done when:* decals project cleanly on brick.
- [ ] **Tue Dec 22** · Build decals X05 to X08. *Done when:* full decal library in engine.
- [ ] **Fri Dec 25** · Buffer (Christmas).
- [ ] **Sat Dec 26** · Vertex paint both facades: moss where water sits, grime rising from the ground, wet under leaks. *Done when:* no visible tiling in Camera 1.
- [ ] **Sun Dec 27** · Place decals: leaks under sills, rust bleed under fixings, soot gradients, peeling edges. Review 10: Camera 1 vs the photo; list fixes. *Done when:* every sill and pipe has a story and the fix list is written.

### Week 11 · Dec 28 to Jan 3 · Set dressing

- [ ] **Mon Dec 28** · Ground dressing: rubble edges along wall bases, debris following drainage and foot traffic. *Done when:* ground matches photo density.
- [ ] **Tue Dec 29** · Place P1 props in Camera 1 for composition (plywood, planks, branches, cables). *Done when:* leading lines point to the far opening.
- [ ] **Fri Jan 1** · Buffer (New Year's Day).
- [ ] **Sat Jan 2** · Foliage placement: weeds in cracks, moss on ledges and steps, buddleia in mortar; Review 11. *Done when:* foreground to background reads clearly.
- [ ] **Sun Jan 3** · Buffer.

### Week 12 · Jan 4 to 10 · Dressing for alternate angles

- [ ] **Mon Jan 4** · Dress the alternate cameras with P2 props, glass, litter, paper. *Done when:* no empty corners in any camera.
- [ ] **Tue Jan 5** · Puddles and wetness: X07 decals, D06 inserts, wet roughness on the ground. *Done when:* puddles reflect the sky.
- [ ] **Fri Jan 8** · Buffer.
- [ ] **Sat Jan 9** · Full walkthrough: fix floating objects, seams, repeated props; Review 12. *Done when:* clean walkthrough capture.
- [ ] **Sun Jan 10** · Buffer.

### Week 13 · Jan 11 to 17 · Lighting and atmosphere

- [ ] **Mon Jan 11** · Overcast sky (HDRI or Sky Atmosphere), soft directional, skylight, Lumen settings; lock exposure. *Done when:* flat, cool base matches the photo.
- [ ] **Tue Jan 12** · Height fog and volumetrics; a soft light shaft at the far opening; bounce and fill lights. *Done when:* depth reads in three layers.
- [ ] **Fri Jan 15** · Post process: colour grade toward the photo, light vignette, grain; tune reflections on glass and puddles. *Done when:* Camera 1 sits next to the photo convincingly.
- [ ] **Sat Jan 16** · Light the alternate cameras. *Done when:* each has a clear focal point.
- [ ] **Sun Jan 17** · Review 13: share lit renders with peers or a mentor for critique. *Done when:* critique notes collected.

### Week 14 · Jan 18 to 24 · Polish and optimization

- [ ] **Mon Jan 18** · Apply critique notes. *Done when:* every note fixed or consciously skipped.
- [ ] **Tue Jan 19** · Material polish: tiling breakup, roughness ranges, greyscale value check. *Done when:* scene reads in greyscale.
- [ ] **Fri Jan 22** · Optimization: Nanite and LODs, texture streaming, collision, profile with stat unit and GPU visualizer. *Done when:* stable frame rate in a walkthrough.
- [ ] **Sat Jan 23** · Audit texel density, wireframes, naming; build a kit breakdown level with every module laid out. *Done when:* breakdown level ready to shoot.
- [ ] **Sun Jan 24** · Final polish in Camera 1; lock the scene; Review 14. *Done when:* scene locked.

### Week 15 · Jan 25 to 31 · Final renders

- [ ] **Mon Jan 25** · Beauty renders at 4K with Movie Render Queue: Camera 1 plus 4 to 6 angles. *Done when:* all beauty shots exported.
- [ ] **Tue Jan 26** · Breakdown renders: kit sheet, wireframe, clay, lighting only, material spheres, trim sheets. *Done when:* breakdown set exported.
- [ ] **Fri Jan 29** · Marmoset turntables for H1, H2, H6 and a prop sheet; render the flythrough sequence. *Done when:* all renders on disk.
- [ ] **Sat Jan 30** · Edit the 30 to 45 second flythrough in Blender's Video Sequencer; make the reference vs final side-by-side. *Done when:* video exported.
- [ ] **Sun Jan 31** · Lay out and publish the ArtStation post with breakdown text; update portfolio. *Done when:* project is live.

## Free resources

Free CC0 libraries cover the base materials and fill props, so your own time goes into the kit, the heroes and the custom masks. Credit anything you didn't make in the final post.

| Resource | Use it for | Cost and license |
| --- | --- | --- |
| [ambientCG](https://ambientcg.com) | Base PBR materials: brick, concrete, metal, ground | Free, CC0 |
| [Poly Haven](https://polyhaven.com) | Base materials, overcast HDRIs, some props | Assets free, CC0; its Blender add-on is paid, so download from the site |
| [Blendkit](https://www.blenderkit.com) (formerly BlenderKit) | Materials and fill props from inside Blender | 60,000+ free assets, royalty-free or CC0; paid tier for the full library |
| [Fab](https://www.fab.com) | Megascans and environment packs for UE5 | Some assets free, most paid since 2025; Megascans claimed before 2025 stay yours |
| [Texel Density Checker](https://extensions.blender.org/add-ons/texel-density-checker) | Hitting 10.24 px/cm on every module | Free extension, Blender 4.2+ |
| [Cell Fracture](https://extensions.blender.org/add-ons/cell-fracture/) | Broken bricks, rubble, smashed boards | Free extension, Blender 4.2+ |
| [Ivy Gen](https://extensions.blender.org/add-ons/ivygen/) | Ivy cascading from the parapet (H4) | Free extension |
| Node Wrangler | Fast material and mask node setups | Free, ships with Blender |
| [Send to Unreal](https://github.com/epicgames/blendertools) | One-click Blender to UE5 export | Free; check it supports your Blender version, plain FBX export works too |

Sources: [Poly Haven add-on](https://polyhaven.com/plugins/blender), [Megascans on Fab](https://forums.unrealengine.com/t/access-legacy-megascans-on-bridge-and-quixel-com/2142664), [Blendkit free assets](https://www.cgchannel.com/2026/08/get-60000-free-3d-assets-for-maya-godot-and-rhino-from-blendkit/), [free texture libraries](https://app.cinevva.com/guides/free-textures-hdris-materials).

## Final renders and presentation

The ArtStation post leads with the reference-matched beauty shot, then proves the kit and the heroes in that order.

**Render list (post order)**

1. Hero beauty shot: Camera 1, matched to the photo, 4K.
2. Reference vs final side-by-side.
3. Four to six alternate angles: reverse shot from the far opening, low angle up at the skybridge, light well close-up, ivy and drainpipe detail, a top-down overview.
4. Modular kit sheet: every A to D piece laid out with IDs, plus a few walls assembled two different ways from the same pieces.
5. Kit assembly GIF: the right facade building up module by module.
6. Trim sheet and tiling material sheet: flat textures plus material spheres.
7. Hero turntables: skybridge, chimney cap, loading doors (Marmoset).
8. Wireframe and clay overlays of Camera 1.
9. Vertex paint and decal breakdown: same wall, with and without.
10. Lighting-only pass.
11. Flythrough video, 30 to 45 seconds.

**Post text to write**

- One line on the goal (a 1:1 study of the reference built on a AAA modular pipeline) and the time frame.
- Kit stats: number of modules, trim sheets, tiling materials.
- Tools used and what each did.
- Credit for the reference photo and for every third-party material or prop, with its source.
