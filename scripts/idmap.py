"""Modular-kit paint-over of the Derelict Mill Alley reference.
Single source of truth for the ID-map colours; build_xlsx.py imports KIT_COLORS / HERO_COLORS."""
from PIL import Image, ImageDraw, ImageFont

KIT_COLORS = {
    # Family A: left mill
    "A01": "#3F6CB4", "A02": "#E040FB", "A03": "#7C4DFF", "A04": "#FFEA00", "A05": "#FF9100",
    "A06": "#5C6BC0", "A07": "#00E5FF", "A08": "#9575CD", "A09": "#8D6E63",
    # Family B: right building
    "B01": "#B0BEC5", "B02": "#00C853", "B03": "#C6FF00", "B04": "#F06292", "B05": "#1DE9B6",
    "B06": "#AA00FF", "B07": "#FFD180", "B08": "#80CBC4", "B09": "#CE93D8",
    # Family C: structure and metal
    "C01": "#00B0FF", "C02": "#FF1744", "C03": "#FFAB91", "C04": "#FFCC80", "C05": "#76FF03", "C06": "#4DD0E1",
    # Family D: ground
    "D01": "#A1887F", "D02": "#BCAAA4", "D03": "#78909C", "D04": "#6D4C41", "D05": "#D7CCC8",
    "D06": "#4FC3F7", "D07": "#9E9D24",
}
HERO_COLORS = {"H1": "#FF3D3D", "H2": "#FF8A80", "H3": "#B388FF", "H4": "#64DD17", "H5": "#FFFF00",
               "H6": "#FF6D00", "H7": "#C6FF00"}
VISIBLE = {}  # filled below: piece id -> list of polygons in reference-image pixels

def P(pid, *polys):
    VISIBLE.setdefault(pid, []).extend(polys)

# Left mill
P("A01", [(0,0),(298,0),(300,225),(300,335),(322,345),(322,448),(260,478),(200,510),(150,548),(100,572),(50,592),(0,612)])
P("A03", [(50,575),(50,330),(60,302),(80,286),(100,286),(115,300),(122,330),(122,560)],
         [(155,512),(155,330),(170,306),(195,296),(220,301),(238,326),(240,470)])
P("A02", [(127,0),(152,0),(152,550),(127,560)], [(244,0),(260,0),(268,170),(252,176)])
P("A07", [(205,80),(300,256),(300,264),(205,96)])
P("A04", [(262,90),(272,84),(278,95),(278,150),(262,153)], [(286,158),(292,154),(296,162),(296,185),(287,188)],
         [(292,50),(318,48),(320,165),(298,166)])
P("A09", [(0,612),(0,578),(150,522),(260,456),(322,430),(322,448),(260,478),(150,548)])
P("A05", [(280,452),(280,355),(286,338),(298,332),(310,337),(322,352),(322,452)])
P("C02", [(185,0),(197,0),(197,282),(185,286)])
# Right building
P("B01", [(426,0),(736,0),(736,560),(600,500),(520,470),(440,415),(436,200)])
P("B07", [(443,276),(736,90),(736,104),(443,288)], [(443,186),(650,0),(664,0),(443,196)])
P("B02", [(563,205),(602,185),(602,448),(566,447)], [(503,290),(518,282),(518,435),(503,425)])
P("B03", [(602,183),(736,110),(736,470),(602,446)], [(485,300),(503,292),(503,415),(485,408)],
         [(455,312),(473,305),(473,405),(455,400)], [(442,325),(450,322),(450,400),(442,398)],
         [(515,0),(552,0),(552,90),(515,106)], [(478,42),(497,32),(497,180),(478,190)],
         [(455,104),(468,98),(468,190),(455,195)], [(437,130),(447,125),(447,198),(437,202)],
         [(430,0),(447,0),(447,100),(430,112)])
P("B04", [(518,282),(563,258),(563,500),(520,480)])
P("B05", [(568,447),(736,478),(736,527),(568,463)], [(433,405),(523,425),(523,436),(433,416)])
P("B06", [(420,425),(485,430),(500,505),(425,500)])
P("C01", [(300,312),(438,300),(438,320),(300,330)], [(305,338),(432,330),(432,345),(305,350)])
P("D01", [(0,612),(150,548),(260,478),(322,448),(400,425),(440,415),(520,470),(600,500),(736,560),(736,663),(0,663)])
P("D04", [(0,612),(150,548),(260,478),(322,448),(322,462),(260,495),(150,568),(0,640)])
HANDRAIL = [[(403,415),(485,418)], [(485,418),(487,485)], [(420,416),(421,482)], [(452,417),(454,484)]]

HEROES = {
    "H1": [(300,225),(438,222),(438,350),(300,350)],
    "H2": [(304,90),(339,90),(339,50),(365,50),(365,90),(428,90),(428,225),(304,225)],
    "H3": [(400,410),(490,412),(505,510),(415,510)],
    "H4": [(240,0),(300,0),(305,180),(255,180)],
    "H5": [(323,348),(400,352),(400,420),(323,428)],
    "H6": [(283,360),(320,365),(320,450),(283,452)],
    "H7": [(602,183),(736,110),(736,470),(602,446)],
}
DRAW_ORDER = ["D01","D04","A01","B01","A09","A03","A02","A07","A04","A05","C02","B07","B02","B03","B04","B05","B06","C01"]

def hex2rgb(h): h=h.lstrip("#"); return tuple(int(h[i:i+2],16) for i in (0,2,4))

FONT = "/usr/share/fonts/opentype/inter/Inter-SemiBold.otf"
FONT_R = "/usr/share/fonts/opentype/inter/Inter-Regular.otf"

def id_panel(ref):
    base = ref.copy().convert("RGBA")
    over = Image.new("RGBA", base.size, (0,0,0,0)); d = ImageDraw.Draw(over)
    alpha = {"D01": 90, "A01": 110, "B01": 110, "D04": 150}
    for pid in DRAW_ORDER:
        c = hex2rgb(KIT_COLORS[pid])
        for poly in VISIBLE[pid]:
            if pid == "A05":
                d.line(poly + [poly[0]], fill=c + (235,), width=7, joint="curve")
            else:
                d.polygon(poly, fill=c + (alpha.get(pid, 175),))
    for seg in HANDRAIL:
        d.line(seg, fill=hex2rgb(KIT_COLORS["C05"]) + (255,), width=5)
    out = Image.alpha_composite(base, over)
    # ID tags
    d2 = ImageDraw.Draw(out); f = ImageFont.truetype(FONT, 13)
    tags = {"A01": (20,40), "A02": (122,150), "A03": (62,420), "A04": (300,120), "A05": (284,394), "A07": (238,150),
            "A09": (40,560), "C02": (170,60), "B01": (640,40), "B02": (568,320), "B03": (650,300), "B04": (526,370),
            "B05": (650,505), "B06": (440,465), "B07": (590,150), "C01": (350,326), "C05": (488,440), "D01": (250,610), "D04": (110,585)}
    for pid, (x, y) in tags.items():
        d2.rounded_rectangle([x-3, y-2, x+33, y+15], 4, fill=(20,20,20,215))
        d2.text((x, y-1), pid, font=f, fill=hex2rgb(KIT_COLORS[pid]) + (255,))
    return out

def grid_panel(ref):
    """Perspective module grid (blockout read) + hero outlines + a 180 cm scale figure."""
    base = ref.copy().convert("RGBA")
    W, H = base.size
    over = Image.new("RGBA", base.size, (0,0,0,0)); d = ImageDraw.Draw(over)
    navy = (28, 40, 140)
    def wall(vpx, vpy, x0, yg0, k, d0, umax, vmax, fine, module_u, module_v, mask_poly):
        layer = Image.new("RGBA", base.size, (0,0,0,0)); g = ImageDraw.Draw(layer)
        def pt(u, v):
            s = d0 / (d0 + u)
            return (vpx + (x0 - vpx) * s, vpy + (yg0 - v * k - vpy) * s)
        for u in range(0, umax + 1, fine):
            strong = u % module_u == 0
            g.line([pt(u, 0), pt(u, vmax)], fill=(navy + (230,)) if strong else (255,255,255,105), width=3 if strong else 1)
        for v in range(0, vmax + 1, 100):
            strong = v % module_v == 0
            g.line([pt(0, v), pt(umax, v)], fill=(navy + (230,)) if strong else (255,255,255,105), width=3 if strong else 1)
        m = Image.new("L", base.size, 0); ImageDraw.Draw(m).polygon(mask_poly, fill=255)
        over.paste(layer, (0,0), Image.composite(layer, Image.new("RGBA", base.size, (0,0,0,0)), m).split()[3])
    left_mask = VISIBLE["A01"][0]
    right_mask = VISIBLE["B01"][0]
    wall(375, 395, 0, 610, 1.4, 450, 3200, 2000, 100, 400, 400, left_mask)
    wall(375, 360, 736, 560, 1.3, 600, 3600, 1900, 100, 300, 380, right_mask)
    # hero outlines
    f = ImageFont.truetype(FONT, 13)
    for hid, poly in HEROES.items():
        c = hex2rgb(HERO_COLORS[hid])
        d.polygon(poly, fill=c + (55,), outline=c + (255,), width=3)
    # scale figure: 180 cm at the loading-door depth (~0.31 px/cm)
    fx, fy = 352, 446
    d.ellipse([fx-5, fy-58, fx+5, fy-48], fill=navy + (255,))
    d.rounded_rectangle([fx-8, fy-47, fx+8, fy-22], 4, fill=navy + (255,))
    d.line([(fx-4, fy-23), (fx-5, fy)], fill=navy + (255,), width=5)
    d.line([(fx+4, fy-23), (fx+5, fy)], fill=navy + (255,), width=5)
    out = Image.alpha_composite(base, over)
    d2 = ImageDraw.Draw(out)
    lab = {"H1": (365,232), "H2": (380,100), "H3": (455,494), "H4": (262,15), "H5": (372,402), "H6": (286,420), "H7": (650,190)}
    for hid, (x, y) in lab.items():
        d2.rounded_rectangle([x-3, y-2, x+25, y+15], 4, fill=(20,20,20,220))
        d2.text((x, y-1), hid, font=f, fill=hex2rgb(HERO_COLORS[hid]) + (255,))
    d2.text((fx+10, fy-11), "180 cm", font=ImageFont.truetype(FONT, 11), fill=(255,255,255,255), stroke_width=2, stroke_fill=navy)
    return out

def compose(ref_path, out_path):
    ref = Image.open(ref_path).convert("RGB")
    W, H = ref.size
    left, right = grid_panel(ref), id_panel(ref)
    gap, pad, head = 24, 32, 86
    names = {"A01":"Wall flat","A02":"Pilaster","A03":"Blind arch recess","A04":"Upper window","A05":"Loading door surround",
             "A07":"String course","A09":"Base course / plinth","B01":"Wall flat, painted","B02":"Window bay pier",
             "B03":"Steel window insert","B04":"Door bay","B05":"Projecting ledge","B06":"Light well","B07":"Floor band",
             "C01":"Steel I-beam","C02":"Drainpipe","C05":"Handrail","D01":"Ground tile","D04":"Rubble edge strip"}
    hero_names = {"H1":"Skybridge","H2":"Chimney + end building","H3":"Light well vignette","H4":"Ivy and wall growth",
                  "H5":"Overgrown far opening","H6":"Rusted loading doors","H7":"Broken industrial glazing"}
    cols, row_h = 4, 26
    kit_rows = -(-len(names) // cols); hero_rows = -(-len(hero_names) // cols)
    legend_h = 40 + kit_rows * row_h + 40 + hero_rows * row_h + 20
    CW = pad * 2 + W * 2 + gap
    canvas = Image.new("RGB", (CW, head + H + 44 + legend_h), (22, 21, 19))
    cd = ImageDraw.Draw(canvas)
    cd.text((pad, 22), "Modular Building Planning — Derelict Mill Alley", font=ImageFont.truetype(FONT, 30), fill=(236,231,222))
    cd.text((pad, 60), "Left: perspective module grid (navy = 400 cm modules left wall, 300 × 380 cm bays right wall), hero features and a 180 cm scale figure.   Right: ID map, one colour per kit piece.",
            font=ImageFont.truetype(FONT_R, 13), fill=(157,150,138))
    canvas.paste(left.convert("RGB"), (pad, head)); canvas.paste(right.convert("RGB"), (pad + W + gap, head))
    cd.text((pad, head + H + 10), "Blockout grid + heroes", font=ImageFont.truetype(FONT, 15), fill=(236,231,222))
    cd.text((pad + W + gap, head + H + 10), "Kit ID map", font=ImageFont.truetype(FONT, 15), fill=(236,231,222))
    y = head + H + 44
    def legend(title, items, colors, y):
        cd.text((pad, y + 8), title, font=ImageFont.truetype(FONT, 15), fill=(208,116,71)); y += 40
        cw = (CW - 2 * pad) // cols
        for i, (k, n) in enumerate(items.items()):
            x = pad + (i % cols) * cw; yy = y + (i // cols) * row_h
            cd.rounded_rectangle([x, yy + 2, x + 18, yy + 20], 3, fill=hex2rgb(colors[k]))
            cd.text((x + 26, yy + 2), f"{k}  {n}", font=ImageFont.truetype(FONT_R, 14), fill=(236,231,222))
        return y + -(-len(items) // cols) * row_h
    y = legend("Kit pieces (ID map colours, also used in the tracker spreadsheet)", names, KIT_COLORS, y)
    legend("Hero features (outline colours)", hero_names, HERO_COLORS, y)
    canvas.save(out_path, optimize=True)
    return out_path

if __name__ == "__main__":
    import pathlib
    root = pathlib.Path(__file__).resolve().parent.parent
    print(compose(str(root / "public" / "reference.jpg"), str(root / "docs" / "mill-alley-paintover.png")))
