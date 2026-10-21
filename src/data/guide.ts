export const project = {
  title: 'Derelict Mill Alley',
  subtitle: '15-week AAA environment art plan',
  start: '2026-10-19',
  end: '2027-01-31',
  tools: [
    { name: 'Blender', role: 'Modeling, sculpting, UVs, procedural materials and masks, camera match, video edit' },
    { name: 'Marmoset Toolbag', role: 'Baking, texturing, turntables, asset renders' },
    { name: 'Unreal Engine 5', role: 'Assembly, Lumen, Nanite, master materials, set dressing, Movie Render Queue' },
  ],
  goal:
    'A 1:1 recreation of the reference: a derelict Victorian mill alley, about 40 m long, built the way a AAA team would build it — metrics-locked greybox, tiling materials and trim sheets, a reusable modular kit, a few unique hero assets, then dressing, lighting and renders.',
  prove: [
    'One kit, many walls: two building facades assembled from about 30 snapping modules on a 25 cm grid.',
    'Hero craft: the two-tier skybridge, the chimney silhouette and the basement light well break the modular rhythm and carry the shot.',
    'Material depth: vertex-painted height blends (brick, moss, grime, wet), custom edge-wear and leak masks, and decals do the storytelling.',
    'A reference-matched camera: the final beauty shot lines up with the photo, plus 4 to 6 original angles.',
  ],
  workweek:
    'Monday, Tuesday, Friday, Saturday and Sunday, about one 4 to 6 hour session each. Wednesday and Thursday are off. The last workday of each week is review and catch-up.',
}

export type Phase = { name: string; start: string; end: string }
export const phases: Phase[] = [
  { name: 'Pre-production', start: '2026-10-19', end: '2026-10-25' },
  { name: 'Greybox', start: '2026-10-26', end: '2026-11-01' },
  { name: 'Materials and trims', start: '2026-11-02', end: '2026-11-10' },
  { name: 'Modular kit', start: '2026-11-13', end: '2026-11-22' },
  { name: 'Hero assets', start: '2026-11-23', end: '2026-12-04' },
  { name: 'Props and debris', start: '2026-12-07', end: '2026-12-13' },
  { name: 'Foliage', start: '2026-12-14', end: '2026-12-20' },
  { name: 'Set dressing', start: '2026-12-21', end: '2027-01-09' },
  { name: 'Lighting', start: '2027-01-11', end: '2027-01-17' },
  { name: 'Polish and optimization', start: '2027-01-18', end: '2027-01-24' },
  { name: 'Final renders', start: '2027-01-25', end: '2027-01-31' },
]
export const milestones = [
  { name: 'Greybox locked', date: '2026-11-01' },
  { name: 'Kit complete', date: '2026-11-22' },
  { name: 'Published', date: '2027-01-31' },
]

export const zones = [
  { name: 'Foreground', text: 'Debris-covered ground, planks, plywood sheet, cables, moss patches, dead branches.' },
  { name: 'Left wall', text: 'Dark sooty brick mill, tall blind arch recesses, pilasters, drainpipe, ivy falling from the parapet, glazed upper windows.' },
  { name: 'Right wall', text: 'Grey painted brick, tall steel-framed windows, stone sills and lintels, a mossy ledge, a basement light well with a green tube handrail.' },
  { name: 'Midground', text: 'Two-tier skybridge (timber-clad enclosed bridge over a steel girder deck), low arched loading door with rusted sheet doors.' },
  { name: 'Background', text: 'Red brick end building, tall square chimney, roof overgrowth, bright overgrown opening at the far end — the focal light.' },
]

export const metrics = [
  'Grid snap 25 cm; modules on 100, 200 and 400 cm widths.',
  'Floor to floor 400 (left) and 380 (right); pivots at bottom-left-back of each module.',
  'Texel density 10.24 px/cm (1024 px/m) within 5 m of camera; 5.12 px/cm for upper floors and background.',
  'Brick tiling texture covers 200 × 200 cm with 24 courses (8.33 cm each, a small cheat on the real 8.6) so coursing lines up at every 100 cm module edge.',
]

export const kitRules = [
  'Naming: SM_MillAlley_<Family>_<Piece>_<W>x<H>, e.g. SM_MillAlley_A_WallFlat_400x400.',
  'Pivot at bottom-left-back; walls one storey tall.',
  'Wall faces use tiling materials (UV0) at the locked texel density; a lightmap UV is optional with Lumen.',
  'Edges get a 1 to 2 cm bevel with weighted normals so silhouettes catch light without bakes.',
  'Each family is tested in a kit-bash scene before it goes into the alley.',
]

export const trimSheets = [
  { id: 'T01', name: 'Stone', use: 'Sills, lintels, coping, string courses, kerbs' },
  { id: 'T02', name: 'Metal', use: 'Window frames, beams, rails, pipes, gutters, brackets' },
  { id: 'T03', name: 'Timber', use: 'Boards, door planks, skybridge cladding strips, window mullions' },
]

export const masterMaterials = [
  { name: 'M_Master_Kit', text: 'Tiling base + 3-layer vertex paint height blend (R moss, G grime, B wet), world-aligned moss on up-facing surfaces, macro variation to kill tiling, baked edge-wear input and world-space leak streaks under sills and ledges.' },
  { name: 'M_Master_Trim', text: 'Trim sheet base with the same vertex blend.' },
  { name: 'M_Master_Decal', text: 'DBuffer decals with normal and roughness.' },
  { name: 'M_Master_Foliage', text: 'Two-sided, subsurface, wind.' },
  { name: 'M_Master_Glass', text: 'Dirty, cracked, roughness from a grime mask.' },
]

export const maskRecipes = [
  {
    name: 'Edge wear',
    steps: [
      'Bevel node (radius ~1–2 cm) vs. geometry normal → dot product gives convex edges.',
      'Multiply with inverted Ambient Occlusion to keep wear on exposed edges only.',
      'Break it up: Noise Texture into a Color Ramp threshold, then multiply.',
      'Bake to a texture in Cycles (Bevel and AO only bake in Cycles), then feed it to M_Master_Kit.',
    ],
  },
  {
    name: 'Leak streaks',
    steps: [
      'Object-space Z gradient so streaks fade downward from sills, ledges and pipe brackets.',
      'Noise Texture stretched along Z for vertical drips: feed it a Mapping node with Scale X 20, Y 20, Z 1.',
      'Multiply gradient × stretched noise; Color Ramp for crisp streak ends.',
      'Use as a darkening and roughness mask; in UE5 rebuild it with world-position Z so it follows any module.',
    ],
  },
]

export const freeResources = [
  { name: 'ambientCG', url: 'https://ambientcg.com', use: 'Base PBR materials: brick, concrete, metal, ground', cost: 'Free, CC0' },
  { name: 'Poly Haven', url: 'https://polyhaven.com', use: 'Base materials, overcast HDRIs, some props', cost: 'Free, CC0 (its Blender add-on is paid — download from the site)' },
  { name: 'Blendkit', url: 'https://www.blenderkit.com', use: 'Materials and fill props from inside Blender', cost: '60,000+ free assets, royalty-free or CC0' },
  { name: 'Fab', url: 'https://www.fab.com', use: 'Megascans and environment packs for UE5', cost: 'Some free, most paid since 2025' },
  { name: 'Texel Density Checker', url: 'https://extensions.blender.org/add-ons/texel-density-checker', use: 'Hit 10.24 px/cm on every module', cost: 'Free extension, Blender 4.2+' },
  { name: 'Cell Fracture', url: 'https://extensions.blender.org/add-ons/cell-fracture/', use: 'Broken bricks, rubble, smashed boards', cost: 'Free extension, Blender 4.2+' },
  { name: 'Ivy Gen', url: 'https://extensions.blender.org/add-ons/ivygen/', use: 'Ivy cascading from the parapet (H4)', cost: 'Free extension' },
  { name: 'Node Wrangler', url: 'https://docs.blender.org/manual/en/latest/addons/node/node_wrangler.html', use: 'Fast material and mask node setups', cost: 'Free, ships with Blender' },
  { name: 'Send to Unreal', url: 'https://github.com/epicgames/blendertools', use: 'One-click Blender → UE5 export', cost: 'Free; check your Blender version (FBX works too)' },
]

export const renderList = [
  'Hero beauty shot: Camera 1, matched to the photo, 4K',
  'Reference vs final side-by-side',
  'Four to six alternate angles: reverse shot from the far opening, low angle up at the skybridge, light well close-up, ivy and drainpipe detail, a top-down overview',
  'Value (greyscale) shot of Camera 1',
  'Alternative lighting mood: Camera 1 at dusk or night',
  'Modular kit sheet: every A to D piece laid out with IDs, module dimensions and a 180 cm scale figure, plus a few walls assembled two different ways from the same pieces',
  'Kit assembly GIF: the right facade building up module by module',
  'Trim sheet and tiling material sheet: flat textures plus material spheres',
  'Trim vs unique texture overlay: one facade coloured by texture type',
  'Hero turntables: skybridge, chimney cap, loading doors (Marmoset)',
  'Wireframe and clay overlays of Camera 1, plus a prop sheet wireframe with triangle counts',
  'RGB-mask variation: one reusable prop shown in three variants from one mask',
  'Foliage breakdown: leaf atlas, cards and the assembled ivy and buddleia',
  'Vertex paint and decal breakdown: same wall, with and without',
  'Lighting-only pass',
  'Process: reference board, composition reference and dated progress shots from each review',
  'Flythrough video, 30 to 45 seconds',
]
export const postText = [
  'One line on the goal (a 1:1 study built on a AAA modular pipeline) and the time frame',
  'Kit stats: number of modules, trim sheets, tiling materials',
  'Tools used and what each did',
  'Credit for the reference photo and every third-party material or prop, with its source',
]
