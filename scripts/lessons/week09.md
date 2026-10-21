## Week 9 · Dec 14 to 20 · Foliage

This week's goal is game foliage built the AAA way: a leaf atlas, cards made from it, ivy and grass placed with tools, wind-ready plants, and a breakdown sheet that shows all of it.

### Mon Dec 14 · Leaves for an atlas
<!-- id: c9d1 -->

**Goal:** model leaves and lay them out on a 2048 atlas ready to bake into opacity, normal and colour maps.

**Time:** about 60 minutes for the lesson and 40 for the drill.

#### Watch and read first
{{RES}}

#### Steps
1. **What an atlas is.** One texture holding many leaves, twigs and blades. Every foliage card samples part of it, so all your plants share one material.
2. **Model a leaf.** Add a plane, add a few loop cuts along its length and across, and in top view move the vertices into the leaf's outline (ivy: 3–5 lobes; buddleia: long and narrow; grass: a thin tapered blade). Give it a slight bend down the midrib with proportional editing.
3. **Colour.** Use a CC0 leaf scan, or paint a base colour with vertex colours: darker at the base, lighter toward the tip, a slightly lighter midrib.
4. **Lay out the atlas.** Make a 2 × 2 m plane as the atlas area. Arrange your leaves and small clusters on it without overlapping, with gaps between them. Big leaves and the clusters you'll use most get the most space. Leave a strip along one edge for grass blades.
5. **Orthographic camera (for a quick preview).** Add a camera above the plane, set its type to *Orthographic* and its *Orthographic Scale* to 2 so it frames the atlas exactly; set the render to 2048 × 2048. A render with a transparent background (Render > Film > *Transparent*) previews the opacity map.
6. **Bake properly.** For the real atlas, name the leaves `Atlas_high` and the plane `Atlas_low`, and bake in Marmoset: Normal, Opacity (from the high's coverage), Base Color (from vertex colour or texture) and Thickness (use it for translucency).

#### Common mistakes
- Leaves overlapping on the atlas. They bake into one blob.
- Perfectly flat leaves. A slight bend gives the normal map its shading.
- Wasting space. Empty atlas space is wasted texture memory; scale important elements up.

#### Drill: ivy and buddleia leaves on one atlas (40 minutes)
Model three ivy leaves, two buddleia leaves and two grass blades, and lay them out on the atlas plane with clusters of 3–5 ivy leaves.

**Pass when:** nothing overlaps, at least two-thirds of the area is used, and the orthographic preview render shows clean leaf shapes on a transparent background.

#### Use it on Mill Alley
Today you model the leaves (ivy, buddleia, grass, weeds) and bake the foliage atlas in Marmoset; "done when" is an atlas with opacity, normal and translucency maps.

### Tue Dec 15 · Ivy: Ivy Gen and leaf cards along curves
<!-- id: c9d2 -->

**Goal:** grow ivy down a wall and drainpipe and turn it into game-ready cards.

**Time:** about 60 minutes for the lesson and 40 for the drill.

#### Watch and read first
{{RES}}

#### Steps
1. **Install Ivy Gen.** Edit > Preferences > Get Extensions, search "Ivy Gen", Install.
2. **Grow it.** Place the 3D cursor where the ivy starts (Shift+right-click on the parapet), select the wall or pipe it should climb, then open the Sidebar (N) > *Create* tab > *Ivy Generator* panel and click *Add New Ivy*. Use *Update Ivy* after changing settings. Change the settings (size, gravity weight, adhesion, leaf density) and regenerate until the shape cascades like the photo.
3. **Use it as a guide.** Ivy Gen's leaves are simple quads with their own texture. For the game, keep its *stems* (convert them to mesh, or keep them as curves) and replace the leaves with your atlas cards.
4. **Make leaf cards.** A card is a plane (or two crossed planes) UV'd onto a cluster of 3–5 leaves on your atlas. Make three or four card types (small, medium, big cluster).
5. **Scatter cards along a curve with Geometry Nodes.** Draw a stem curve along the drainpipe. Add a Geometry Nodes modifier: *Resample Curve* (Count about 40) → *Instance on Points* with a card from *Collection Info* (tick *Pick Instance* to use all card types). Add *Random Value* nodes into Rotation and Scale for variety, and *Realize Instances* before the output.
6. **Face the light.** Real ivy leaves face outward from the wall toward the light. Rotate the cards so they point away from the wall rather than at random.
7. **Convert and export.** Apply the modifier (or Object > Convert > Mesh) and export as one mesh per ivy strand.

#### Common mistakes
- Ivy that climbs straight up like a ladder. Add randomness and gravity; it hangs and spreads.
- Leaves facing the wall. Cards must face out.
- Using Ivy Gen's leaves directly. They don't use your atlas, so they won't match the rest of the foliage.

#### Drill: an ivy strand down a drainpipe (40 minutes)
Grow an ivy strand from a parapet down a drainpipe with Ivy Gen, then replace its leaves with atlas cards scattered along its stem.

**Pass when:** the strand hangs and wraps the pipe naturally, all leaves are atlas cards facing outward, and the strand is under 3,000 triangles.

#### Use it on Mill Alley
Today you make F01 ivy cards and vine splines and place H4 ivy down the left wall and drainpipe. "Done when" is ivy breaking the parapet line like the photo, so check it from Camera 1.

### Fri Dec 18 · Geometry Nodes scattering: grass and weed clumps
<!-- id: c9d3 -->

**Goal:** build a reusable Geometry Nodes setup that generates grass and weed clumps.

**Time:** about 60 minutes for the lesson and 30 for the drill.

#### Watch and read first
{{RES}}

#### Steps
1. **The idea.** Geometry Nodes generates geometry from rules. Here: scatter points on a surface, put a grass card on each point, randomize.
2. **The base.** Add a small Circle or disc (about 30 cm across), fill it, and add a Geometry Nodes modifier (*New*).
3. **Distribute Points on Faces.** Add it after Group Input. Set *Density* (try 200) and change *Seed* for a different clump.
4. **Instance on Points.** Add it, plug the points in, and feed *Instance* from a *Collection Info* node pointing at a collection of grass blade cards. Tick *Separate Children* and *Pick Instance* so it picks randomly from your cards.
5. **Randomize.** A *Random Value* node (type *Float*, Min 0.7, Max 1.3) into Scale. A *Random Value* (type *Vector*) into Rotation, with Z from 0 to 6.28 (a full turn) and small X and Y tilts (±0.2).
6. **Expose controls.** Drag sockets onto the Group Input (Density, Seed, Scale range). They appear on the modifier panel, so you can make variants without opening the nodes.
7. **Realize and export.** Add *Realize Instances* before the Group Output, then apply the modifier to export a clump mesh.
8. **Reuse.** The node group works on any mesh: put it on a ledge strip and you get grass along the ledge.

#### Common mistakes
- Grass standing perfectly straight. Add the small X and Y tilt.
- Seeing only one blade type. *Pick Instance* isn't ticked.
- Thousands of blades. Clumps for games use tens of cards, not hundreds; watch the triangle count.

#### Drill: a grass clump generator (30 minutes)
Build the node setup with exposed Density, Seed and Scale controls, and make three different clumps from it by changing only those controls.

**Pass when:** the three clumps look different, each is under 800 triangles, and they all use your atlas material.

#### Use it on Mill Alley
Today you make F02 moss clumps, F03 grass and weeds and F05 dead leaves, all paintable with UE5's foliage tool. Use your generator for F03 and feed it dead-leaf cards for F05.

### Sat Dec 19 · Bushes and saplings, with wind colours
<!-- id: c9d4 -->

**Goal:** build a small tree and a bush from branches and leaf cards, and paint vertex colours UE5 can use for wind.

**Time:** about 60 minutes for the lesson and 40 for the drill.

#### Watch and read first
{{RES}}

#### Steps
1. **Branches from curves.** Draw the trunk and main branches as Bezier curves with a Bevel depth. In Edit Mode, select points and press Alt+S to shrink the radius toward the tips, so branches taper.
2. **Or the Skin modifier.** Make a skeleton of connected vertices (extrude with E), add a *Skin* modifier and a Subdivision Surface. Select vertices and press Ctrl+A to scale the skin thickness at each point. Good for knotted, organic trunks.
3. **Convert and simplify.** Convert to mesh and lower the resolution; saplings need few sides (5–6) on thin branches.
4. **Add leaf cards.** Place atlas cards at the branch ends, either by hand or with Instance on Points on the branch tips. Buddleia grows from cracks in walls: short, arching stems with leaf clusters at the ends.
5. **Wind mask.** UE5 bends foliage using a mask: 0 at the base (doesn't move), 1 at the tips (moves most). Store it in vertex colour red.
6. **Make the gradient with Geometry Nodes.** Add a Geometry Nodes modifier: *Position* → *Separate XYZ* → Z into a *Map Range* (From Min 0, From Max = the plant's height, To 0–1) → *Store Named Attribute* (type *Color*, domain *Point*, name `Col`). Apply the modifier. Check it in Solid mode > Color > Attribute.
7. **In UE5.** In the foliage material, plug *Vertex Color* R into the *SimpleGrassWind* node's *WindWeight* input, and its output into World Position Offset. The base stays still and tips sway.

#### Common mistakes
- The whole plant swaying, roots included. The wind mask must be 0 at the base.
- Branches as thick at the tip as at the base. Taper with Alt+S or Ctrl+A on the skin.
- Too many leaf cards. Gaps between clusters are part of a believable silhouette.

#### Drill: one sapling with wind colours (40 minutes)
Build a 2 m sapling (trunk, 4–6 branches, leaf cards) and store a base-to-tip wind gradient in vertex colour red.

**Pass when:** the attribute view shows black at the base fading to red at the tips, the sapling is under 8,000 triangles, and its silhouette has gaps you can see through.

#### Use it on Mill Alley
Today you make F04 buddleia, F06 brambles and F07 saplings, all with wind in UE5. Test the wind material on the drill sapling first.

### Sun Dec 20 · The foliage breakdown render
<!-- id: c9d5 -->

**Goal:** present foliage the way portfolio breakdowns do: atlas, cards and assembled plant side by side.

**Time:** about 30 minutes for the lesson and 45 for the drill.

#### Watch and read first
{{RES}}

#### Steps
1. **Panel 1: the atlas.** Show the base colour and opacity (or normal) of the atlas flat, as images.
2. **Panel 2: the cards.** Lay a few cards flat facing the camera in Solid mode with *Texture* colour, Wireframe overlay on, so viewers see how few polygons carry the leaves.
3. **Panel 3: the plant.** A beauty render of the assembled ivy, buddleia or sapling on your studio backdrop, lit from behind a little so leaf translucency glows.
4. **Matching style.** Same backdrop and light for every panel; labels with triangle counts.
5. **Assemble.** Put the three panels in one image, left to right in build order.

#### Common mistakes
- Showing only the final plant. The breakdown's value is showing *how* it's built.
- No triangle counts. Foliage efficiency is a big part of what reviewers look for.

#### Drill: the foliage sheet (45 minutes)
Make a three-panel sheet for the ivy and one other plant.

**Pass when:** it shows the atlas, the cards with wireframe, and the finished plant, with triangle counts, and reads on a phone screen.

#### Use it on Mill Alley
Today you make F08 background trees and the H5 far-opening mass and hold Review 9. For the standard check, this sheet is the foliage breakdown with atlas, as in Courtyard, Lemon and Windmill.
