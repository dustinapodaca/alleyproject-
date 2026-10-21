## Week 11 · Dec 28 to Jan 3 · Set dressing and composition

This week's goal is to dress the scene like an environment artist: debris clusters built from your props, compositions that lead the eye, and weeds scattered where they would really grow.

### Mon Dec 28 · Kitbashing debris clusters
<!-- id: c11d1 -->

**Goal:** build debris piles from props you already have, and decide when to join pieces and when to instance them.

**Time:** about 40 minutes for the lesson and 40 for the drill.

#### Watch and read first
{{RES}}

#### Steps
1. **Link your props in.** File > *Link* (or the Asset Browser) brings props from their own files without copying them. Edit the source file and the change shows everywhere.
2. **Build from big to small.** Start with one or two large pieces (a plank, a broken frame), then medium (bricks, a pipe), then small (litter, shards, leaves) tucked into the gaps. Real debris collects against walls and in corners.
3. **Ground it.** Pieces should sink slightly into the ground and each other. Nothing floats. Use snapping to *Face* with *Align Rotation to Target* to lay pieces on surfaces.
4. **Join or instance?** *Instance* (Alt+D or collection instances) when the same piece repeats many times or you want to keep editing it. *Join* (Ctrl+J) into one cluster mesh when it's a fixed composition you'll place as a unit in UE5. Joined clusters must share materials or atlases to stay cheap.
5. **Export a cluster.** Put the cluster in its own collection with its own Collection Exporter and a pivot at its base, named like `SM_MillAlley_Cluster_WallBase_01`.
6. **Make two or three versions.** The same pieces rearranged give variety without new assets.

#### Common mistakes
- Debris spread evenly like confetti. It gathers where wind, water and people push it.
- Joined clusters with many materials. Each material is a draw call; use atlased props.
- Floating pieces. Check from a low angle with a light from the side.

#### Drill: one wall-base debris cluster (40 minutes)
Build a 2 m long debris cluster for the base of a wall from your planks, bricks, rubble, litter and leaves, and export it as one mesh.

**Pass when:** it reads as a natural pile from Camera 1's height, nothing floats, it uses no more than three materials, and it imports into UE5 with its pivot at ground level.

#### Use it on Mill Alley
Today is ground dressing: rubble edges along wall bases and debris following drainage and foot traffic. "Done when" is matching the photo's density. Place your clusters along the walls first, then fill in by hand.

### Tue Dec 29 · Composition: thirds, leading lines and framing
<!-- id: c11d2 -->

**Goal:** use composition rules and Blender's camera guides to make shots that lead the eye to the focal point.

**Time:** about 40 minutes for the lesson and 40 for the drill.

#### Watch and read first
{{RES}}

#### Steps
1. **Composition guides.** Select a camera > Object Data properties > Viewport Display > *Composition Guides*. Turn on *Thirds*, and try *Golden* and *Diagonal*. They draw over the camera view. In camera view you can also toggle them from Overlays > *Camera Guides*.
2. **Rule of thirds.** Put the focal point (the bright far opening) on or near a thirds intersection, not dead centre, unless you want a strong symmetrical corridor shot (the reference photo is close to central, and that's fine for Camera 1).
3. **Leading lines.** The walls' edges, ground joints, the handrail, planks and cables should point toward the focal point. Rotate props so their long edges join that flow.
4. **Framing.** Dark foreground shapes at the edges (a wall, a hanging branch, the skybridge) frame the bright centre and add depth.
5. **Values guide the eye.** The eye goes to the brightest, highest-contrast area first. Keep the focal point the lightest area, and keep busy detail away from frame edges.
6. **Foreground, midground, background.** Each shot should have something in all three layers.
7. **Try many quickly.** Duplicate the camera (Shift+D), try a new angle, and render a quick EEVEE or viewport image. Compare them side by side.

#### Common mistakes
- Everything the same size and brightness. Then nothing leads.
- Props pointing out of frame. Lines that run off the edge pull the eye out of the image.
- A camera too high. Eye level (1.5–1.7 m) or lower usually feels more immersive in an alley.

#### Drill: three alternate compositions of your greybox (40 minutes)
Using the Mill Alley greybox or current scene in Blender, set up three new cameras (low angle up at the skybridge, light well close-up, reverse shot from the far opening), each using thirds and leading lines.

**Pass when:** each render has a clear focal point on or near a thirds point, at least two leading lines aimed at it, and something in the foreground, midground and background.

#### Use it on Mill Alley
Today you place P1 props in Camera 1 for composition (plywood, planks, branches, cables). "Done when" is leading lines pointing to the far opening; check Camera 1 against the same thirds lines in UE5 (a screenshot with a thirds grid drawn over it works). The drill's three angles become the alternate cameras.

### Fri Jan 1 · Buffer (New Year's Day)
<!-- id: c11d3 -->

**Goal:** no lesson today.

#### Steps
1. Rest. If you want to do something, save a dated progress screenshot of Camera 1 for the process sheet.

#### Use it on Mill Alley
The Mill Alley plan is also on buffer today.

### Sat Jan 2 · Geometry Nodes scattering on chosen areas: weeds in cracks
<!-- id: c11d4 -->

**Goal:** scatter weeds only where you paint, such as in ground cracks and along wall bases.

**Time:** about 50 minutes for the lesson and 30 for the drill.

#### Watch and read first
{{RES}}

#### Steps
1. **Paint where weeds grow.** On a ground tile, open Object Data > Vertex Groups, click + and name it `Weeds`. In *Weight Paint* mode, paint red where weeds should grow (cracks, wall edges, around drains) and leave the rest blue.
2. **Scatter by weight.** Add a Geometry Nodes modifier. *Distribute Points on Faces* (Random) has a *Density Factor* input. Add a *Named Attribute* node (type *Float*, name `Weeds`) and plug it into Density Factor. Points now appear only where you painted, thicker where the paint is stronger.
3. **Instance weeds.** *Instance on Points* with your F03 weed clumps from a *Collection Info* node (*Pick Instance* on), random rotation around Z, random scale.
4. **Keep the ground.** Add *Join Geometry* so the output has both the ground and the weeds.
5. **Scale by weight too.** Feed the same Named Attribute into a *Map Range* and then into Scale, so weeds are bigger in the middle of a painted patch and smaller at its edges.
6. **Games vs Blender.** In UE5 you'll place most weeds with the Foliage tool. Use this scatter for baked clusters (a weedy crack strip you export as one mesh) and for planning density in Blender renders.

#### Common mistakes
- Weeds everywhere. The Named Attribute name must match the vertex group exactly.
- Weeds sunk or floating. The instance's origin must be at its base.
- Uniform density. Real weeds cluster where water and soil collect.

#### Drill: a crack-weed scatter on one ground tile (30 minutes)
Paint a `Weeds` group along two cracks and a wall edge on a D01 tile and scatter weed clumps there with Geometry Nodes.

**Pass when:** weeds appear only along the painted areas, bigger in the middle of patches and smaller at edges, and changing the paint updates the scatter.

#### Use it on Mill Alley
Today is foliage placement: weeds in cracks, moss on ledges and steps, buddleia in mortar, and Review 11. "Done when" is foreground to background reading clearly; use your drill as a guide for where UE5's foliage tool should paint densest.

### Sun Jan 3 · Buffer: catch up on Weeks 8 to 11
<!-- id: c11d5 -->

**Goal:** close the gaps from Weeks 8 to 11.

**Time:** as long as you need; no new lesson.

#### Steps
1. **List your gaps.** Any drill from Weeks 8 to 11 not ticked, or ticked without meeting its *Pass when*.
2. **Priority order.** Redo these first if they're on your list, since the final renders depend on them:
   - The prop sheet render (Week 8, Sun).
   - The foliage sheet (Week 9, Sun).
   - Three barrel variants from one mask (Week 10, Sun).
   - A facade with enough vertices for smooth paint (Week 10, Sat).
3. **Write one line per drill** in the tracker's notes: what failed and what fixed it.

#### Use it on Mill Alley
The Mill Alley plan is on buffer today too. Use it for the plan first if you're behind.
