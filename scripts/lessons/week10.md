## Week 10 · Dec 21 to 27 · Decals and vertex paint

This week's goal is the storytelling layer: decals for leaks, cracks and stains, meshes dense enough to vertex paint, and RGB masks that give one prop many looks.

### Mon Dec 21 · Decal geometry
<!-- id: c10d1 -->

**Goal:** make mesh decals: thin planes floating just off a surface, mapped onto a decal atlas.

**Time:** about 50 minutes for the lesson and 30 for the drill.

#### Watch and read first
{{RES}}

#### Steps
1. **Two kinds of decal.** *Projected decals* are UE5 Decal actors that project a texture onto whatever is behind them; you don't need Blender for those. *Mesh decals* are real planes you model so they follow a shape exactly (around an arch, along a sill). This lesson is mesh decals.
2. **The decal atlas.** One 2048 texture holding leaks, grime patches, cracks and stains, each with soft alpha edges. You'll fill it tomorrow; for now, plan the slots like a trim sheet.
3. **Make a decal plane.** Add a plane where the decal goes. Snap it to the wall (snap to *Face*), then move it out 0.5–1 cm (G Y −0.005) so it never flickers against the wall (z-fighting).
4. **Follow the surface.** For curved or uneven surfaces, add loop cuts and a *Shrinkwrap* modifier targeting the wall, with an *Offset* of 0.005. The decal hugs the surface at a fixed distance.
5. **UVs onto the atlas.** Unwrap the plane and place its UVs over the matching element on the atlas (like trims). A leak under a sill: a long vertical plane mapped to a long vertical streak.
6. **Edge fade.** The alpha in the atlas fades each element's edges, so no hard plane edge shows. Keep the plane a bit bigger than the visible stain.
7. **Material in UE5.** Mesh decals use `M_Master_Decal` (Material Domain *Deferred Decal*, DBuffer with colour, normal and roughness), so a leak can darken and wet the brick without hiding its bumps.

#### Common mistakes
- Decals flickering. They're too close to the surface; offset at least 0.5 cm.
- Decals floating visibly off curved surfaces. Use Shrinkwrap rather than a flat plane.
- Hard rectangular edges. The texture's alpha must fade to zero before the plane's edge.

#### Drill: three decal planes on a wall (30 minutes)
On a test wall with a sill, place a leak decal under the sill, a grime patch at the base and a crack decal across an arch (Shrinkwrap).

**Pass when:** none flicker in Rendered view up close, the arch decal follows the curve, and each plane's UVs sit on a planned atlas slot.

#### Use it on Mill Alley
Today you build decals X01 to X04 and `M_Master_Decal`; "done when" is decals projecting cleanly on brick. Use mesh decals for the leaks under sills (X01) and projected decals in UE5 for the soot gradients (X02).

### Tue Dec 22 · Baking decal maps from sculpted detail
<!-- id: c10d2 -->

**Goal:** sculpt cracks and leaks and bake them into decal textures, including Blender's own Selected to Active bake.

**Time:** about 60 minutes for the lesson and 30 for the drill.

#### Watch and read first
{{RES}}

#### Steps
1. **Sculpt on a plane.** A subdivided plane (or Multires) sized like the decal slot. Use *Crease Sharp* to cut cracks, *Scrape/Fill* for spalled brick faces, and a soft *Draw* (inverted) for water-worn channels.
2. **A flat low.** A plain plane over the sculpt, UV'd to the decal's slot on the atlas.
3. **Bake in Blender: Selected to Active.** In Cycles, select the high (sculpt) first, then Shift-click the low so it's *active*. In the Bake panel, tick *Selected to Active* and set *Extrusion* (or *Max Ray Distance*) a little more than the sculpt's depth. Bake Type *Normal* into a new 1K Non-Color image on the low's material.
4. **Height too.** For height, bake the sculpt's position into an Emit bake (or bake height in Marmoset, which does it directly). Height drives parallax or the decal's normal strength.
5. **Opacity.** Paint the decal's mask: white where the crack or stain is, fading to black. Use the Image Editor's paint mode, or bake a mask from a Color Ramp on the sculpt's height.
6. **Save and pack.** Save each map, then pack them into the atlas slot (colour, normal, opacity/roughness).

#### Common mistakes
- Black areas in the normal bake. The Extrusion is too small for the sculpt's depth.
- The wrong object active. The low (target) must be the active, last-selected object.
- Hard edges where the decal's alpha ends. Fade the mask well inside the slot.

#### Drill: a crack decal baked to 1K (30 minutes)
Sculpt a crack running across three bricks on a plane, bake its normal to a 1K image with Selected to Active, and paint its opacity mask.

**Pass when:** the normal map shows the crack's depth with no black patches, the mask fades softly, and a decal plane using them reads as a real crack on a brick wall.

#### Use it on Mill Alley
Today you build decals X05 to X08; "done when" is the full decal library in the engine. X04 brick damage and cracks use exactly this drill's method.

### Fri Dec 25 · Buffer (Christmas)
<!-- id: c10d3 -->

**Goal:** no lesson today.

#### Steps
1. Take the day off. If you want something light, re-watch any resource from Weeks 8 to 10 you skimmed.

#### Use it on Mill Alley
The Mill Alley plan is also on buffer today.

### Sat Dec 26 · Meshes made for vertex painting
<!-- id: c10d4 -->

**Goal:** give wall modules vertices where moss, grime and wet need to change, without wasting triangles.

**Time:** about 40 minutes for the lesson and 40 for the drill.

#### Watch and read first
{{RES}}

#### Steps
1. **How painting works in UE5.** Mesh Paint mode stores colours per placed copy, so every A01 in the alley can be painted differently. But colour only changes at vertices: on a single 4 × 4 m quad, a stroke becomes a huge blurry gradient. Per-copy paint doesn't show on Nanite meshes, so keep the wall modules you paint in UE5 non-Nanite (or paint them in Blender before export).
2. **Plan where paint goes.** Grime rises from the ground (needs horizontal loops near the base), moss sits on ledges and in corners, and wet streaks fall from sills (needs vertical loops under openings).
3. **Add loops on purpose.** Use Ctrl+R with several cuts: about every 25 cm in the bottom metre of a wall, every 50–100 cm higher up. Put vertical loops at window edges, so leaks can start there.
4. **Keep the grid even.** Even quads blend smoothly. Long thin triangles give jagged blends.
5. **Check the budget.** Painting density is worth it on hero walls near Camera 1. Background walls can stay light.
6. **Check export.** Export one module with its colour attribute (even if it's black) with *Vertex Colors* on in the FBX settings and confirm UE5 imports it with *Replace*; then test painting it in Mesh Paint mode.
7. **Paint in UE5.** In Mesh Paint mode, paint *Vertex Color* with R, G or B enabled one at a time (moss, grime, wet), matching your `M_Master_Kit`.

#### Common mistakes
- A beautiful blend in Blender that looks blocky in UE5. Same cause: not enough vertices where the blend changes.
- Loops everywhere. Triangles double with each cut; add them only where paint goes.
- Painting all three channels at once. Turn channels on one at a time.

#### Drill: a facade with enough vertices for smooth moss and grime (40 minutes)
Add paint loops to your A01 and B02 modules, import them, and paint grime rising 1 m from the ground and a wet streak under a sill in UE5.

**Pass when:** the grime fades smoothly with no stair-steps, the wet streak starts right under the sill, and each module stays within its triangle budget (A modules up to 3,000, B up to 4,000).

#### Use it on Mill Alley
Today you vertex paint both facades: moss where water sits, grime rising from the ground, wet under leaks. "Done when" is no visible tiling in Camera 1. Fix any module that paints blocky by adding loops and reimporting (Week 2's round trip).

### Sun Dec 27 · RGB masks: one prop, many looks
<!-- id: c10d5 -->

**Goal:** use one packed mask texture to make several versions of a prop from a single mesh and texture set.

**Time:** about 50 minutes for the lesson and 40 for the drill.

#### Watch and read first
{{RES}}

#### Steps
1. **The idea.** A mask texture's channels hold R = edge wear, G = dirt, B = paint chips (packed as in Week 3). The material blends extra colours and roughness using those masks; changing a few numbers gives a new look.
2. **Bake the masks.** For the barrel (P13), bake edge wear and dirt from your Week 3 node groups (or from Marmoset curvature and AO), and paint the paint-chip mask. Pack them into `T_P13_Barrel_Masks`.
3. **Set up in Blender.** In the material, separate the mask's channels (*Separate Color*) and use each as the Factor of a *Mix Color*: base paint colour → mix with bare metal using R → mix with dirt using G → mix with a second paint layer using B.
4. **Make controls.** Group the setup (Ctrl+G) and expose inputs: paint colour, dirt amount, wear amount.
5. **Three versions.** Duplicate the material three times and change only the inputs: blue barrel lightly worn, red barrel very dirty, rusted barrel with wear turned up.
6. **The same in UE5.** Build it once as a master material with parameters, then make *Material Instances* for each look. Changing an instance's values costs nothing at runtime.

#### Common mistakes
- Masks in sRGB. They must be Non-Color in Blender and sRGB off in UE5.
- All three looks too similar. Change colour *and* wear and dirt amounts.
- Baking a new texture per variant. The point is one texture set, many looks.

#### Drill: three variants of one barrel from one mask (40 minutes)
Make the barrel's mask texture and three materials driven by it (clean painted, dirty, rusted).

**Pass when:** all three use the same mesh, the same base textures and the same mask, and they look like three different barrels in a side-by-side render.

#### Use it on Mill Alley
Today you place decals (leaks under sills, rust bleed, soot, peeling edges) and hold Review 10. For the standard check, render the three barrels side by side: the RGB-mask variation on a reusable prop, as Le Chlanko and Lemon do.
