## Week 15 · Jan 25 to 31 · Breakdown renders and the write-up

This week's goal is to present the work: breakdown renders that show how it was made, a material-type overlay, a turntable, a short edit, and a written breakdown for ArtStation.

### Mon Jan 25 · Breakdown renders: wireframe, clay and UV checker
<!-- id: c15d1 -->

**Goal:** render matching wireframe, clay and UV-checker passes of the same frame.

**Time:** about 40 minutes for the lesson and 40 for the drill.

#### Watch and read first
{{RES}}

#### Steps
1. **One camera, many passes.** Every breakdown pass uses the exact same camera and frame as the beauty shot, so viewers can compare them or slide between them.
2. **Clay with a material override.** View Layer Properties > *Override* > *Material*: pick a plain grey material. Every object renders with it, without touching your real materials. Clear the field to go back.
3. **Wireframe, quick.** Solid shading, Overlays > *Wireframe* at full opacity, grid and other overlays off, then View > *Viewport Render Image*.
4. **Wireframe, clean.** For crisp lines in a proper render, duplicate the kit into its own collection, add a *Wireframe* modifier (Thickness about 0.005 m) to each copy and give them one dark material. Render that collection on top of the clay pass, as you did for the Week 8 prop sheet.
5. **UV checker.** Make a material with a UV Grid image (Image > New > *UV Grid*) and use it as the override. Even squares everywhere prove consistent texel density.
6. **Save each pass** with a clear name (`Cam01_Clay.png`, `Cam01_Wire.png`, `Cam01_UV.png`).

#### Common mistakes
- Passes from slightly different cameras. They won't line up in a slider. Never move the camera between passes.
- A messy wireframe on a busy scene. Show the kit on its own, or a close-up, where the wireframe tells a story.
- Forgetting to clear the override. Your next beauty render comes out grey.

#### Drill: wireframe and clay of the kit (40 minutes)
Render clay, wireframe and UV-checker passes of your kit layout from one camera.

**Pass when:** the three passes line up pixel for pixel, the wireframe lines are readable at 1920 px wide, and the UV checker shows even squares across modules.

#### Use it on Mill Alley
Today you render the beauty shots at 4K in UE5's Movie Render Queue (Camera 1 plus 4 to 6 angles). Do the Blender passes of the kit layout alongside; UE5's own wireframe and lighting-only view modes give the in-engine versions.

### Tue Jan 26 · The material-type overlay
<!-- id: c15d2 -->

**Goal:** colour every surface by how it's textured (tiling, trim, unique, decal), the overlay that shows a modular pipeline at a glance.

**Time:** about 30 minutes for the lesson and 40 for the drill.

#### Watch and read first
{{RES}}

#### Steps
1. **Pick a colour per type.** For example: tiling materials blue, trim sheets green, unique textures orange, decals pink, foliage yellow.
2. **Set each material's viewport colour.** Material Properties > *Viewport Display* > *Color*. Set every tiling material's to blue, every trim's to green and so on. This doesn't change renders.
3. **Show it.** Solid shading, Color set to *Material*. Lighting *Flat* gives pure colours; *Studio* keeps some shading so shapes still read.
4. **Render it.** View > *Viewport Render Image* from the same camera as the beauty shot.
5. **Add a legend.** A small key in the corner: blue = tiling, green = trim, orange = unique, pink = decals.
6. **In UE5.** For an in-engine version, make one flat unlit material per colour and temporarily assign it, or use the Blender version of one facade.

#### Common mistakes
- Too many categories. Four or five colours read; ten don't.
- No legend. The image means nothing without it.
- Colours too similar. Pick clearly different hues.

#### Drill: the trim/unique overlay of one facade (40 minutes)
Make the overlay of the left or right facade with a legend.

**Pass when:** every surface is one of your colours (nothing grey), the legend matches, and the image shows that most of the facade is tiling and trim, as in Lemon.

#### Use it on Mill Alley
Today you make the breakdown renders: kit sheet, wireframe, clay, lighting only, material spheres and trim sheets. Add this overlay to that set.

### Fri Jan 29 · Turntables
<!-- id: c15d3 -->

**Goal:** render a smooth 360° turntable in Blender, as a backup to Marmoset's.

**Time:** about 30 minutes for the lesson and 40 for the drill.

#### Watch and read first
{{RES}}

#### Steps
1. **A pivot empty.** Add an Empty (Shift+A > Empty > Plain Axes) at the centre of the asset's base.
2. **Camera on the empty.** Place the camera where you want it, then parent it to the empty: select the camera, Shift-select the empty, Ctrl+P > *Object*. Add a *Track To* constraint on the camera targeting the empty so it always looks at the centre.
3. **Animate the spin.** At frame 1, set the empty's Z rotation to 0 and press I over the field to keyframe it. At the last frame (240 for 10 seconds at 24 fps), set 360 and keyframe again.
4. **Constant speed.** In the Timeline or Graph Editor, select all keys and set Key > *Interpolation Mode* > *Linear* (T in the Graph Editor). Otherwise it eases in and out.
5. **No double frame.** Set the scene's End frame to 240 with the 360° key at 241, so the loop doesn't repeat the first frame.
6. **The path version.** Alternatively: a Bezier Circle around the asset, the camera with a *Follow Path* constraint on it plus Track To the asset. Same result.
7. **Render.** Output Properties: frame rate 24 or 30, output to an image sequence (PNG) or directly to video (Media Type *Video*, see tomorrow). Then Render > *Render Animation* (Ctrl+F12).

#### Common mistakes
- A turntable that speeds up and slows down. Interpolation isn't Linear.
- A hitch at the loop point. The first and last frames are the same; end one frame earlier.
- The asset spinning off-centre. Put the empty at the asset's real centre.

#### Drill: a 10-second skybridge turntable (40 minutes)
Make a 240-frame turntable of the skybridge with a constant spin, on your studio backdrop.

**Pass when:** it loops with no hitch or speed change, the skybridge stays centred, and it renders out at your portfolio resolution.

#### Use it on Mill Alley
Today you render Marmoset turntables for H1, H2 and H6, a prop sheet, and the flythrough sequence. If a Marmoset render fails, this is your backup.

### Sat Jan 30 · The Video Sequencer: editing the flythrough
<!-- id: c15d4 -->

**Goal:** cut clips together with crossfades and titles and export an H.264 video.

**Time:** about 40 minutes for the lesson and 40 for the drill.

#### Watch and read first
{{RES}}

#### Steps
1. **A video project.** File > New > *Video Editing*. Set Output Properties > Format: resolution and frame rate to match your renders (e.g. 1920 × 1080 at 30 fps) before adding clips.
2. **Add clips.** Add > *Movie* for video files, or Add > *Image/Sequence* and select all frames of an image sequence. Clips appear as strips on channels.
3. **Cut.** Put the playhead where you want a cut and press K (split). Delete unwanted parts with X. Drag strips to rearrange.
4. **Crossfades.** Overlap the end of one strip with the start of the next on the channel above, select both, then Add > *Transition* > *Cross*. Keep fades short (0.5–1 s).
5. **Titles.** Add > *Text*. Set the text, size and position in the sidebar (N). A title card at the start and your name at the end is enough.
6. **Music (optional).** Add > *Sound*. Use only music you have the right to use; fade it out at the end by keyframing its volume.
7. **Export.** Output Properties > Output: set *Media Type* to *Video*. In the Encoding panel: Container *MPEG-4*, Video Codec *H.264*, Output Quality *High*. Set the frame range to the edit's length, then Render > *Render Animation*.

#### Common mistakes
- Clips playing at the wrong speed. The project's frame rate doesn't match the clips; set it first.
- Exporting a PNG sequence by accident. Check Media Type is Video.
- A long, slow edit. 30–45 seconds of strong shots beats two minutes of drifting.

#### Drill: a 15-second test edit (40 minutes)
Cut three clips (turntable, a camera move, a clay pass) into a 15-second edit with two crossfades and a title, and export it as H.264 MP4.

**Pass when:** the MP4 plays in a normal video player, it's about 15 seconds, the crossfades are smooth, and the title is readable.

#### Use it on Mill Alley
Today you edit the 30 to 45 second flythrough in the Video Sequencer and make the reference vs final side-by-side. The side-by-side is two image strips: in the sidebar, under *Transform*, scale each to half width and move them left and right.

### Sun Jan 31 · The written breakdown
<!-- id: c15d5 -->

**Goal:** write the ArtStation post text that explains the project like a professional breakdown.

**Time:** about 60 minutes.

#### Watch and read first
{{RES}}

#### Steps
1. **Intent (2–3 sentences).** What the project is and why: "A 1:1 study of a derelict Victorian mill alley, built in 15 weeks on a AAA modular pipeline to practise kit design and material storytelling."
2. **References.** Credit the reference photo and say how you used it (camera match, scale breakdown).
3. **Kit stats.** Number of modules, trim sheets and tiling materials; module grid and texel density.
4. **Workflow.** One short paragraph per stage: greybox, materials and masks, kit, heroes, foliage, decals and vertex paint, lighting. Mention the tools (Blender, Marmoset, UE5) and what each did.
5. **What you'd do differently.** One honest line. Reviewers like seeing judgement.
6. **Credits.** Every third-party material, HDRI, prop or music track, with its source and licence (ambientCG CC0, Poly Haven CC0, Blendkit, Fab).
7. **Order the images.** Beauty shot first, then alternate angles, then breakdowns (kit sheet, overlays, wireframes, foliage, props), then the video and process shots.

#### Common mistakes
- A wall of text. Use short headings and paragraphs.
- No numbers. Kit stats and sizes make the work credible.
- Missing credits. Always credit what you didn't make.

#### Use it on Mill Alley
Today you lay out and publish the ArtStation post with this text and update your portfolio. For the standard check, go through all 16 portfolio standards one last time and tick each against your post.
