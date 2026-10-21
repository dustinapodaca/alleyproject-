## Week 13 · Jan 11 to 17 · Light and value

This week's goal is to understand light well enough to light the alley in UE5: sun and sky, exposure and colour temperature, fog and light shafts, values in greyscale, and mood changes.

### Mon Jan 11 · Light basics that carry into UE5
<!-- id: c13d1 -->

**Goal:** learn the few lighting ideas every engine shares, and test them on Camera 1 in Blender.

**Time:** about 50 minutes for the lesson and 40 for the drill.

#### Watch and read first
{{RES}}

#### Steps
1. **Two light sources outdoors.** The *sun* is one strong directional light with sharp shadows. The *sky* is a big, soft, blue-ish light from everywhere above. Overcast weather moves almost all the light from the sun to the sky.
2. **In Blender.** Sun lamp = UE5's *Directional Light*. World colour or HDRI = UE5's *Sky Light* (plus *Sky Atmosphere* for a physical sky). The same thinking works in both.
3. **Colour temperature.** Light colour is measured in Kelvin: candle about 1,900 K, tungsten bulb about 3,000 K, midday sun about 5,500 K, overcast sky about 6,500–7,500 K (cooler, bluer). Blender 5.2's lights can take their colour from a *Temperature* value in Kelvin, just like UE5's lights.
4. **Warm vs cool.** Where the sun hits is warm; shadows lit by the sky are cool. That contrast is most of what makes lighting feel real. In the alley, the far opening is the bright, slightly warm area and the walls sit in cool shade.
5. **Exposure.** Like a real camera, exposure sets how bright the whole image is. Keep lights at realistic ratios (sun much brighter than sky) and adjust *Exposure* in Color Management. In UE5, lock exposure (Post Process Volume > Exposure > Metering Mode *Manual*) so it doesn't drift while you work.
6. **Bounce light.** Light bouncing off walls and the ground fills the shadows. Cycles does this naturally; UE5's Lumen does it in real time. In EEVEE, enable ray tracing in Render Properties for better bounce.
7. **Use Camera 1.** Every study this week is through your camera-match camera, so you can compare directly with the photo.

#### Common mistakes
- Fixing a dark scene by brightening every light. Change exposure instead, and keep the ratios.
- Everything the same colour temperature. Without warm/cool contrast the image looks flat.
- Exposure that keeps changing in UE5. That's auto-exposure; set it to Manual while lighting.

#### Drill: an EEVEE overcast study of Camera 1 (40 minutes)
In your camera-match file (or a Blender export of the current scene), light Camera 1 with a cool sky (HDRI or world colour), a weak warm sun from the far opening and exposure set by eye against the photo.

**Pass when:** placed beside the photo, the overall brightness, the bright far end, and the cool shaded walls match closely, and the shadow areas aren't black.

#### Use it on Mill Alley
Today in UE5 you set up the overcast sky, a soft directional light, the skylight and Lumen, and lock exposure. "Done when" is a flat, cool base matching the photo; your Blender study shows the target values.

### Tue Jan 12 · Volumetrics: fog and light shafts
<!-- id: c13d2 -->

**Goal:** add atmospheric depth and a soft light shaft, and learn what each setting does.

**Time:** about 50 minutes for the lesson and 40 for the drill.

#### Watch and read first
{{RES}}

#### Steps
1. **Why fog helps.** Air between camera and distant objects lightens and softens them, which separates foreground, midground and background. Even a little fog adds a lot of depth.
2. **World fog.** World Properties > *Volume*: add a *Principled Volume* with a very low Density (0.005–0.02). Too much and everything turns milky.
3. **Local fog.** For more control, add a large cube around the far end of the alley, give it a material with only a *Principled Volume* plugged into the *Volume* output (nothing in Surface), and set its density. Fog sits where you want it.
4. **Light shafts.** Shafts appear where a light passes through fog and is partly blocked: here, sunlight through the far opening and past the skybridge. The light needs shadows on, and the fog must be where the light passes.
5. **EEVEE settings.** Shafts come from *Volumetric Shadows*, under Render Properties > Sampling > Shadows; turn it on. Render Properties > *Volumes* sets fog quality (Resolution, Steps); with a World volume, tick *Custom Range* and set an end distance to cut noise. On the sun, Influence > *Volume Scatter* sets how strongly it shows in the fog. If shafts still look blocky, render the study in Cycles.
6. **The UE5 version.** *Exponential Height Fog* with *Volumetric Fog* on, and the Directional Light's *Volumetric Scattering Intensity* controls how much each light shows in the fog.

#### Common mistakes
- Fog so dense the scene looks like smoke. Start very low and raise slowly.
- No shafts at all. Volumetric Shadows is off, or nothing blocks the light.
- Fog on the near walls. Keep the foreground clear and let fog build toward the far end.

#### Drill: a fog study with a light shaft at the far opening (40 minutes)
In Camera 1, add low world fog plus a denser fog volume at the far end, and angle the sun so a soft shaft falls through the far opening.

**Pass when:** the far end is lighter and softer than the near walls, a shaft is visible but subtle, and the foreground stays crisp.

#### Use it on Mill Alley
Today in UE5 you add height fog and volumetrics, a soft shaft at the far opening, and bounce and fill lights. "Done when" is depth reading in three layers, exactly what your study shows.

### Fri Jan 15 · Colour management and reading values
<!-- id: c13d3 -->

**Goal:** understand view transforms and exposure, and check your image in greyscale to see if its values work.

**Time:** about 40 minutes for the lesson and 30 for the drill.

#### Watch and read first
{{RES}}

#### Steps
1. **View transform.** Render Properties > Color Management > *View Transform*. *AgX* (the default) handles bright light gracefully, rolling highlights off instead of clipping them. *Standard* clips and looks harsher. Stay on AgX.
2. **Looks.** The *Look* menu adds contrast presets (AgX - Punchy, Base Contrast, and others). Try them, but make big changes with lighting first.
3. **Exposure and Gamma.** Exposure brightens or darkens everything evenly. Gamma changes the midtones; leave it at 1 unless you have a reason.
4. **What "values" are.** A value is how light or dark something is, ignoring colour. A good environment image has a clear value structure: the focal point lightest, the frame darker, and maybe three or four main value groups.
5. **Greyscale check in Blender.** In the *Compositing* workspace, add a node tree if there isn't one, and put an *RGB to BW* node (Add > Color) between the *Render Layers* node and the *Group Output* node (Blender 5 replaced the old Composite node with Group Output). Render (F12): the result is greyscale. Remove it afterwards.
6. **Or outside Blender.** Desaturate a saved render in any image editor. Same result.
7. **Squint.** Squint at the greyscale image: if the far opening doesn't pop as the brightest area, change lighting or materials until it does.

#### Common mistakes
- Saturated colour hiding weak values. In greyscale, colourful-looking images can turn to mush.
- Using a Look to fix lighting. Fix it in the lights; Looks are a final touch.
- Comparing renders with different view transforms. Keep AgX for all.

#### Drill: a value-only render of Camera 1 (30 minutes)
Render Camera 1 in greyscale and mark three value groups (light, mid, dark) on a printout or a copy of the image.

**Pass when:** the far opening is clearly the lightest group, the two walls separate from each other and from the ground, and no large area is a muddy mid-grey with no structure.

#### Use it on Mill Alley
Today in UE5 you do post process (grade toward the photo, light vignette, grain) and tune reflections on glass and puddles. Make the same greyscale check on UE5's Camera 1 screenshot. For the render list, keep this as the value (greyscale) shot.

### Sat Jan 16 · Lighting moods
<!-- id: c13d4 -->

**Goal:** light the same camera three ways to learn how mood comes from light.

**Time:** about 30 minutes for the lesson and 60 for the drill.

#### Watch and read first
{{RES}}

#### Steps
1. **One file, several setups.** Scene menu (top right) > *New Scene* > *Linked Copy*. The new scene shares all the objects but can have its own world, lights and render settings. Make one scene per mood.
2. **Morning.** A low, warm sun (3,500–4,500 K) raking along the alley, long shadows, cool blue sky fill, light fog catching the sunlight.
3. **Overcast.** Weak or no sun, a strong neutral-cool sky, soft shadows, low contrast. This is the reference photo's mood.
4. **Night.** No sun, a dark blue-violet sky at low strength, and practical lights: a warm point light in the P18 wall lamp, maybe a cool light from a window. Exposure goes up a little, but keep the night dark.
5. **Change only light.** Don't move the camera or props between moods; the comparison teaches you what light alone does.
6. **Compare in greyscale.** Run each mood through the value check: the focal point should still lead in all three.

#### Common mistakes
- Night that's just "darker day". Night has different colours and light sources.
- Morning that's too orange. Warm sun, but sky light stays blue.
- Lights duplicated rather than linked. Use Linked Copy scenes so models stay in sync.

#### Drill: three mood studies (60 minutes)
Light Camera 1 as morning, overcast and night in three linked-copy scenes and render each.

**Pass when:** the three read as clearly different times or weather, the camera and props are identical in all three, and the focal point still reads first in each.

#### Use it on Mill Alley
Today in UE5 you light the alternate cameras so each has a clear focal point. Pick one mood (for example dusk or night) as the alternative lighting mood for the render list, and rebuild it in UE5 later this week.

### Sun Jan 17 · Review: studies vs UE5
<!-- id: c13d5 -->

**Goal:** compare your Blender studies with UE5's renders, and get outside critique.

**Time:** about 60 minutes.

#### Steps
1. **Side by side.** Put the photo, your Blender overcast study and the UE5 Camera 1 render in one image.
2. **Compare in greyscale.** Values first, then colour temperature, then fog depth.
3. **List differences.** For each, write whether UE5 or the study is closer to the photo and what you'll change.
4. **Share for critique.** Send the lit renders to peers or a mentor (Discord art communities, Polycount, a teacher). Ask specific questions: "Does the focal point read?", "Is the fog too heavy?"

#### Use it on Mill Alley
Today is Review 13: share lit renders for critique and collect notes. For the standard check, have a value shot and one alternative lighting mood ready, as Greenhouse, Indian street and Windmill show.
