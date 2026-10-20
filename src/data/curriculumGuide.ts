// Supporting content for the Blender curriculum page. Mirrors the "Blender Curriculum — Mill Alley Track" doc.

export const curriculumIntro = {
  lead:
    'A 15-week Blender course for a complete beginner, on the same calendar as Mill Alley (Wednesday and Thursday off). Every lesson teaches what that day’s Mill Alley task needs.',
  rhythm: [
    'Lesson, 45 to 60 min: watch or read the topic and repeat it on a throwaway file.',
    'Drill, 15 min: a small exercise with a pass/fail check.',
    'Mill Alley task: apply the lesson to the real scene for the rest of the session.',
    'Log, 5 min: one screenshot and two lines in the day’s notes.',
  ],
  benchmark:
    'Standards come from 10 environment projects saved in Jacob Claussen’s ArtStation collection. Claussen is a Senior Environment Artist at Hazelight who teaches modular environment art at Vertex School; the projects are by various artists.',
}

export const setup = [
  'Install Blender 5.2 LTS (supported until July 2028). Don’t upgrade mid-project.',
  'Keep metric meters; set the grid snapping increment to 0.25 m (25 cm).',
  'A 1 m cube exported as FBX (Apply Scalings: FBX Units Scale) must import into UE5 as 100 cm — check it on Sat Oct 24.',
  'Preferences: thick line width, Auto Save every 2 minutes, Emulate 3 Button Mouse only on a trackpad.',
  'Enable Node Wrangler; install Texel Density Checker, Cell Fracture and Ivy Gen in the week each is needed.',
  'One .blend per kit family and per hero, inside the source-controlled project folder.',
]

export const benchmarkProjects = [
  { name: 'Farm', text: 'Medieval farm: a two-week workshop on a modular kit for procedural generation; Bruegel painting as composition reference.' },
  { name: 'Cottage', text: 'Rural cottage with asset, material, sculpt and PCG tool breakdowns.' },
  { name: 'Courtyard', text: 'Middle-Eastern courtyard and alley; separate prop showcase scene; ivy atlas.' },
  { name: 'Greenhouse', text: 'Overgrown greenhouse; value shot, pivot-painted foliage, glass shader.' },
  { name: 'Le Chlanko', text: 'European street facades: measured modules, wireframes, trims, tris counts.' },
  { name: 'Persian', text: 'Old Persian Village by Sasha Honcharova: storytelling close-ups and reference boards.' },
  { name: 'Tsushima', text: 'Elegy of the Clan, Ghost of Tsushima-inspired: material and decal breakdowns.' },
  { name: 'Lemon', text: 'Little Lemon Shop by Jack Ferrari: kit, set-dressing, foliage and trim breakdowns.' },
  { name: 'Indian street', text: 'Damaged townhouses and temples: dimensioned kits with a scale figure.' },
  { name: 'Windmill', text: 'Windmill village in three lighting moods; every building broken into sections.' },
]

export const standards = [
  { standard: 'Hero shot plus 4 to 6 named camera angles', count: 10, weeks: '11, 15' },
  { standard: 'Modular kit laid out on a neutral backdrop', count: 8, weeks: '4, 5, 14' },
  { standard: 'Prop and set-dressing sheet', count: 8, weeks: '8' },
  { standard: 'Video flythrough or real-time capture', count: 6, weeks: '15' },
  { standard: 'Process: reference board, composition reference, progress shots', count: 6, weeks: '1, 11' },
  { standard: 'RGB masks on reusable assets for variation', count: 5, weeks: '3, 10' },
  { standard: 'Material renders on spheres or cylinders', count: 5, weeks: '3' },
  { standard: 'Foliage breakdown (atlas, cards, wind)', count: 5, weeks: '9' },
  { standard: 'Kit dimensions and a human scale figure', count: 4, weeks: '1, 14' },
  { standard: 'Vertex-paint texture blending', count: 3, weeks: '3, 10' },
  { standard: 'Trim sheets shown apart from unique textures', count: 3, weeks: '4, 15' },
  { standard: 'Decals and surface details', count: 3, weeks: '10' },
  { standard: 'Value shot or alternative lighting moods', count: 3, weeks: '13' },
  { standard: 'Wireframes with triangle counts', count: 3, weeks: '8, 15' },
  { standard: 'Sculpts shown as clay renders', count: 2, weeks: '6, 7' },
  { standard: 'Adapting third-party assets, credited', count: 2, weeks: '8' },
]

export const gaps = [
  { gap: 'Value (greyscale) shot', fix: 'One greyscale Camera 1 render', by: 'Week 13 drill' },
  { gap: 'An alternative lighting mood', fix: 'One extra mood, e.g. dusk or night', by: 'Week 13 drill' },
  { gap: 'Dimensions and a scale figure on the kit sheet', fix: 'Label module sizes; add a 180 cm figure', by: 'Week 14 drill' },
  { gap: 'Triangle counts on wireframes and prop sheets', fix: 'Tris labels on the prop sheet', by: 'Week 8 drill' },
  { gap: 'Trim vs unique texture overlay', fix: 'One overlay render of a facade', by: 'Week 15 drill' },
  { gap: 'RGB-mask variation on a reusable prop', fix: 'One prop in three variants', by: 'Week 10 drill' },
  { gap: 'Foliage breakdown (atlas, cards, plant)', fix: 'One foliage sheet', by: 'Week 9 drill' },
  { gap: 'Process: reference board, composition reference, progress shots', fix: 'A dated screenshot each review day', by: 'Weekly log' },
]

export const learningResources = [
  { name: 'Blender Manual', url: 'https://docs.blender.org/manual/en/latest/', use: 'Exact behaviour of every tool, modifier and node', weeks: 'All' },
  { name: 'Blender Guru: Beginner Donut Tutorial', url: 'https://www.blenderguru.com/tutorials/blender-4-beginner-donut-tutorial', use: 'Free, 14 parts, ~5 hours: interface to rendering', weeks: '1–3' },
  { name: 'Blender Studio: Fundamentals', url: 'https://studio.blender.org/training/blender-2-8-fundamentals/interface-overview/', use: 'Free official basics; older interface, same concepts', weeks: '1–2' },
  { name: '3D Illusions: Learn 3D with Blender', url: 'https://blenderartists.org/t/the-most-complete-blender-4-course-is-now-available-for-free-on-youtube/1541123', use: 'Free 18-hour course; look up one topic at a time', weeks: 'As needed' },
  { name: 'Ben Keeling: Environment Art blog', url: 'https://benkeeling.artstation.com/blog/category/6', use: 'Planning and blockout, materials, trim sheets and decals', weeks: '2–4, 10' },
  { name: 'Vertex School: Intro to Modular Environment Art', url: 'https://www.vertexschool.com/introduction-to-modular-environment-art', use: 'Claussen’s paid six-week course, same order; currently sold out', weeks: 'Optional' },
]
