// Wild Extremadura — sites database
// Centre: La Tierra Verde Holiday Accommodations (SW Cáceres province)
//
// External links use observation.org for bird observations within 10 km of
// each site. The end_date is always today (computed at click time).

const BASE = {
  name: "La Tierra Verde Holiday Accommodations",
  lat: 39.1610143,
  lng: -6.2515144,
  note: "Your base for exploring Extremadura.",
};

const TYPES = {
  forest:   { label: "Dehesa / Forest",   color: "#3a7d3a" },
  steppe:   { label: "Steppe / Plains",   color: "#c8a23a" },
  wetland:  { label: "Wetland / Lake",    color: "#2a7fb8" },
  mountain: { label: "Mountain",          color: "#7a5a3a" },
  canyon:   { label: "Canyon / Cliffs",   color: "#a04040" },
  town:     { label: "Town wildlife",     color: "#8a4ba0" },
  river:    { label: "River / Gorge",     color: "#3a9aa8" },
};

function observationUrl(lat, lng) {
  // Bird observations within 10 km of the point, up to today's date.
  // POINT(lng lat) follows the standard GIS x-y order; %20 encodes the space.
  // Hash params (species_group=1 = birds, rarity=0 = all) are static.
  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  return `https://observation.org/fieldwork/observations/explore/?end_date=${today}&point=POINT(${lng}%20${lat})&distance=10#search=&species_group=1&rarity=0`;
}

// Reusable source library — referenced by id from each site's "sources" array
const SOURCE = {
  je:        { title: "Junta de Extremadura — Espacios Naturales Protegidos", url: "https://www.juntaex.es/temas/medio-ambiente/espacios-naturales-protegidos" },
  seo:       { title: "SEO/BirdLife — Áreas Importantes para las Aves (IBA)",   url: "https://seo.org/iba/" },
  te:        { title: "Turismo Extremadura — official tourism portal",          url: "https://www.turismoextremadura.com/" },
  n2k:       { title: "Natura 2000 Network Viewer (European Environment Agency)", url: "https://natura2000.eea.europa.eu/" },
  ramsar:    { title: "Ramsar Sites Information Service",                       url: "https://rsis.ramsar.org/" },
  crossbill: { title: "Crossbill Guides — Extremadura, Spain",                  url: "https://www.crossbillguides.org/" },
  birdex:    { title: "Birding Extremadura (John Muddeman)",                    url: "https://www.birding-extremadura.com/" },
  unesco:    { title: "UNESCO Global Geoparks / Biosphere Reserves",            url: "https://en.unesco.org/" },
  wiki:      (slug) => ({ title: `Wikipedia — ${slug.replace(/_/g, " ")}`,      url: `https://es.wikipedia.org/wiki/${slug}` }),
  ebird:     { title: "eBird hotspots — Extremadura",                           url: "https://ebird.org/region/ES-EX/hotspots" },
};

const SITES = [
  // ───────────── 1. Cornalvo ─────────────
  {
    id: "cornalvo",
    name: "Parque Natural de Cornalvo",
    type: "forest",
    lat: 39.0500, lng: -6.2000,
    summary: "Mediterranean dehesa around a 2,000-year-old Roman dam, just south of Mérida.",
    description: `
Parque Natural de Cornalvo lies 15 km north-east of Mérida and protects 11,600 hectares of classic Iberian dehesa surrounding the still-functioning Roman dam of Cornalvo, built in the 1st–2nd century AD. The park was designated a Natural Park in 1993 and is part of the European Natura 2000 network as both SPA and SCI [1][2]. The Roman engineering and the Mediterranean wood-pasture mosaic together give the site dual cultural and ecological significance.

Habitat is dominated by holm oak (Quercus ilex) and cork oak (Quercus suber) dehesa — open savannah woodland where livestock grazing has shaped the landscape for centuries. Granite outcrops, seasonal streams (the Albarregas and Aljucén river headwaters), and the dam reservoir add wetland and rocky habitats to the wood-pasture matrix. Iberian pear and wild olive form the understorey, with heath and gum-cistus on stonier slopes.

Cornalvo holds a small but consistent population of black vulture (Aegypius monachus), one of Extremadura's flagship species, with several active nests in the cork oaks [2][3]. Spanish imperial eagle, black stork, Bonelli's eagle, and short-toed eagle all hunt over the dehesa. Mammals include otter along the Aljucén river, common genet, Egyptian mongoose, wild boar, and red deer. The reservoir attracts wintering ducks (gadwall, pochard, shoveler) and breeding little grebes; dragonflies are exceptional in late spring.

The visitor centre near Trujillanos has free leaflets and a small interpretive exhibit. The signposted PR-EX-26 trail (5 km return) leads to the Roman dam through prime dehesa — best at first light. Avoid hot midday hours from June to September; bring water on all longer walks.
    `.trim(),
    birds: [
      "Black vulture", "Spanish imperial eagle", "Bonelli's eagle", "Short-toed eagle", "Booted eagle",
      "Black kite", "Black stork", "Iberian green woodpecker", "Hoopoe", "Bee-eater",
      "Golden oriole", "Iberian magpie", "Sardinian warbler", "Western Bonelli's warbler", "Cirl bunting",
      "Common nightingale", "Crested tit", "Spotless starling", "Hawfinch", "Little grebe",
    ],
    bestSeason: "Spring (Mar–May) and autumn",
    durationHours: 3,
    tips: "Park at the visitor centre near Trujillanos; the loop trail to the Roman dam is gentle and excellent for woodland birds and dragonflies.",
    website: "https://parquenaturaldecornalvo.juntaex.es/",
    sources: [SOURCE.je, SOURCE.n2k, SOURCE.wiki("Parque_natural_de_Cornalvo")],
  },

  // ───────────── 2. Llanos de Cáceres ─────────────
  {
    id: "llanos-caceres",
    name: "Llanos de Cáceres y Sierra de Fuentes (ZEPA)",
    type: "steppe",
    lat: 39.4000, lng: -6.3000,
    summary: "Vast pseudo-steppe just east of Cáceres city — Europe's premier site for great and little bustard.",
    description: `
The Llanos de Cáceres y Sierra de Fuentes ZEPA covers roughly 70,000 hectares of cereal pseudo-steppe immediately east and north of Cáceres city. It is one of the largest and most important steppe-bird areas in Western Europe, classified as a Special Protection Area (Directive 2009/147/EC) and an SEO/BirdLife Important Bird Area [1][2]. The mosaic of dry-cropped cereal, fallow, sheep pasture and small dehesa pockets has been maintained by traditional rotational farming for centuries.

The terrain is a gently undulating peneplain at 300–500 m, with very few trees and even fewer fences — the openness is the habitat. Granite *berrocales* dot the plain; small streams (the Magasca, Salor, Tamuja) carve shallow valleys with riparian woodland. In late winter and spring the cereal greens up; by June it is golden stubble and silence.

The Llanos hold what is currently the densest concentration of great bustard (*Otis tarda*) on Earth, with regional counts often exceeding 2,500 birds during the spring lek [2][3]. Little bustard, pin-tailed and black-bellied sandgrouse, stone curlew, European roller, lesser kestrel, Montagu's harrier and black-shouldered kite all breed. Calandra lark song fills the air in April; in winter, large flocks of common crane move through.

The classic loop is the back-roads circuit Cáceres → Santa Marta de Magasca → Monroy → Talaván, driving slowly with frequent stops. Stay in the car — it is the best mobile hide. Avoid hot midday hours; dawn and the last two hours of light are most productive.
    `.trim(),
    birds: [
      "Great bustard", "Little bustard", "Pin-tailed sandgrouse", "Black-bellied sandgrouse", "Stone curlew",
      "European roller", "Lesser kestrel", "Montagu's harrier", "Black-shouldered kite", "Common kestrel",
      "Calandra lark", "Greater short-toed lark", "Crested lark", "Tawny pipit", "Iberian grey shrike",
      "Spectacled warbler", "Black-eared wheatear", "Corn bunting", "Common quail", "Eurasian thick-knee",
    ],
    bestSeason: "March–May (bustard lekking) and December–February (sandgrouse flocks)",
    durationHours: 4,
    tips: "Drive the back roads between Santa Marta de Magasca and Monroy at dawn. Stay in the car — it's the best hide.",
    website: "",
    sources: [SOURCE.seo, SOURCE.n2k, SOURCE.birdex],
  },

  // ───────────── 3. Trujillo ─────────────
  {
    id: "trujillo",
    name: "Trujillo town & surrounding plains",
    type: "town",
    lat: 39.4600, lng: -5.8800,
    summary: "Medieval hilltop town with hundreds of nesting lesser kestrels and white storks; great bustards on the surrounding plains.",
    description: `
Trujillo, conqueror of the Americas in the 16th century, today sits as one of the best-preserved Renaissance towns in Spain — and one of the most accessible urban birding sites in Europe. The town's Romanesque-Gothic-Renaissance fabric is built from local granite, and lesser kestrels (*Falco naumanni*) have colonised cracks, parapets and church towers in such numbers that the historic centre is a Special Protection Area in its own right [1][2].

The Plaza Mayor, the castle, the Iglesia de San Martín, and the church towers above the old quarter all hold breeding pairs. White stork nests crown most belfries and many domestic chimneys, audibly bill-clattering through the breeding season. Pallid swift, common swift, common swift colonies, crag martin, house martin and spotless starling complete the urban suite.

Outside the walls, the Belén plain stretching south of town is one of the most reliable spots in Extremadura for great bustard, little bustard, black-shouldered kite, European roller (nesting in pylons), and great spotted cuckoo. The minor road to Belén/La Cumbre passes through prime steppe; pull-offs allow scope viewing without leaving the road [3].

Most visitors combine a walking tour of the town with a dawn or dusk drive on the plains. Climb to the castle terrace at sunset — kestrel screams fill the sky as birds return to roost. Park in the underground car park beneath the Plaza Mayor; allow at least half a day to combine town and plains.
    `.trim(),
    birds: [
      "Lesser kestrel", "Common kestrel", "White stork", "Pallid swift", "Common swift",
      "Crag martin", "House martin", "Barn swallow", "Spotless starling", "Black redstart",
      "Black-shouldered kite", "Great bustard", "Little bustard", "European roller", "Great spotted cuckoo",
      "Common kingfisher", "Hoopoe", "Black-eared wheatear", "Iberian grey shrike", "Corn bunting",
    ],
    bestSeason: "April–June (breeding colonies active)",
    durationHours: 3,
    tips: "Climb to the castle at sunset for kestrel spectacle. The Belén plains 5 km south hold great bustards and rollers.",
    website: "https://www.turismotrujillo.com/",
    sources: [SOURCE.seo, SOURCE.te, SOURCE.birdex],
  },

  // ───────────── 4. Embalse de Alcollarín ─────────────
  {
    id: "alcollarin",
    name: "Embalse de Alcollarín",
    type: "wetland",
    lat: 39.2100, lng: -5.7000,
    summary: "Reservoir that floods in winter, hosting one of Extremadura's largest common crane roosts.",
    description: `
The Embalse de Alcollarín is a relatively recent reservoir (completed 2008) on the Alcollarín stream in central Cáceres province. Despite its modest size (~900 ha at full capacity) it has rapidly become one of the most productive wetlands in inland Iberia, regularly holding 5,000–8,000 wintering common cranes (*Grus grus*) plus a diverse community of wildfowl, herons and waders [1][2].

Habitat is a mix of open water, exposed mudflats (in autumn drawdown), shallow flooded edges, and surrounding cereal stubble used by cranes for daytime feeding. The dam end has the deepest water; the upstream end braids into shallow flats ideal for waders. Surrounding hills are clothed in dehesa, adding raptors to the mix.

The roosting crane spectacle from late November through February is the headline attraction — flocks fly in at dusk in long V-formations, calling continuously [3]. Greater flamingo, common shelduck, gadwall, northern shoveler, Eurasian teal, common pochard, ferruginous duck (occasional), red-crested pochard, and great cormorant winter on the open water. Black-winged stilt, pied avocet, and a variety of waders use the flats on passage. Marsh harrier, western osprey (passage), and Bonelli's eagle hunt overhead.

Three signposted observation points overlook the reservoir, all reached from the EX-102 between Alcollarín and Campo Lugar. Arrive an hour before sunset for the crane fly-in; bring a scope. The eastern shore (visible from the dam road) offers the longest views and best afternoon light.
    `.trim(),
    birds: [
      "Common crane", "Greater flamingo", "Greylag goose", "Common shelduck", "Gadwall",
      "Northern shoveler", "Eurasian teal", "Common pochard", "Red-crested pochard", "Great cormorant",
      "Black-winged stilt", "Pied avocet", "Little ringed plover", "Common snipe", "Marsh harrier",
      "Western osprey", "Black-headed gull", "Lesser black-backed gull", "Cetti's warbler", "Bluethroat",
    ],
    bestSeason: "November–February for cranes; April–May for waders on passage",
    durationHours: 2,
    tips: "Arrive an hour before sunset to watch cranes flying in to roost. Bring a scope.",
    website: "",
    sources: [SOURCE.seo, SOURCE.ebird, SOURCE.birdex],
  },

  // ───────────── 5. Sierra Grande de Hornachos ─────────────
  {
    id: "hornachos",
    name: "Sierra Grande de Hornachos",
    type: "mountain",
    lat: 38.5500, lng: -6.0500,
    summary: "Isolated quartzite ridge rising abruptly from the plains — a stronghold for cliff-nesting raptors.",
    description: `
Sierra Grande de Hornachos rises as a sudden 200-metre quartzite ridge above the Tierra de Barros plain in southern Badajoz province. Despite covering only 12,000 hectares, it is one of the most important raptor refuges in Spain, designated a ZEPA and SCI under Natura 2000 and an SEO/BirdLife IBA [1][2]. The Moorish village of Hornachos at the foot of the southern slope retains a striking white-walled, hill-side architecture.

The sierra is quartzite and slate, eroded into long parallel crests, gullies, and sheer cliff faces up to 300 m high. Vegetation grades from olive groves and almond on the lower slopes, through dense Mediterranean scrub (gum-cistus, broom, kermes oak), to relict cork oak and Lusitanian oak in damp gullies. The cliff faces themselves remain bare and ledged — perfect raptor real estate.

Bonelli's eagle (*Aquila fasciata*) breeds at one of the highest densities in Iberia here, with at least four monitored pairs [2][3]. Spanish imperial eagle, golden eagle, Egyptian vulture, peregrine falcon and eagle owl all nest on the cliffs. Black wheatear, blue rock thrush, rock bunting, and crag martin breed on the rock faces themselves. Lower slopes hold woodchat shrike, subalpine warbler, Sardinian warbler, common nightingale and Iberian magpie.

The miradores above Hornachos village offer scope views of cliff faces — ask in the village for the *castillo* trail. The quiet road from Hornachos to Puebla del Prior passes the western flank with several pull-offs. Spring mornings (March–May) catch territorial raptors most active. Bring a telescope.
    `.trim(),
    birds: [
      "Bonelli's eagle", "Spanish imperial eagle", "Golden eagle", "Egyptian vulture", "Griffon vulture",
      "Peregrine falcon", "Eurasian eagle owl", "Black wheatear", "Blue rock thrush", "Rock bunting",
      "Rock sparrow", "Crag martin", "Alpine swift", "Pallid swift", "Common kestrel",
      "Woodchat shrike", "Subalpine warbler", "Sardinian warbler", "Spectacled warbler", "Common nightingale",
    ],
    bestSeason: "February–June (territorial displays and breeding)",
    durationHours: 4,
    tips: "Ask in Hornachos village for the castillo trail — the miradores above town give scope views of cliff faces.",
    website: "",
    sources: [SOURCE.seo, SOURCE.n2k, SOURCE.crossbill],
  },

  // ───────────── 6. Embalse de Orellana ─────────────
  {
    id: "orellana",
    name: "Embalse de Orellana & Sierra de Pela",
    type: "wetland",
    lat: 39.0500, lng: -5.5500,
    summary: "Ramsar-listed reservoir paired with steppe hills — waterbirds plus classic steppe specialists in one trip.",
    description: `
The Embalse de Orellana, a Ramsar-listed wetland since 1993, dams the Guadiana river to form Extremadura's largest still water (5,500 ha) [1]. Together with the adjacent Sierra de Pela ZEPA, the area combines reservoir, river, cereal steppe and rocky hill into a single mosaic that is hard to match anywhere in Iberia. The Ramsar designation specifically recognised its importance for wintering and migrating waterbirds.

The reservoir's broad, fluctuating shorelines expose mud and sandy banks — ideal for waders. Quartzite ridges rise above the north shore (the Sierra de Pela proper), giving cliff habitat. South of the lake, the cereal-fallow plains extend toward Castuera and La Serena. The mix is what makes the area unusual: in a single morning you can scope flamingos on the lake, then drive five minutes to find sandgrouse on the plain.

Greater flamingo (small wintering flocks), black stork on passage, white stork, great cormorant, common crane (winter), gadwall, pochard, and common shelduck use the open water. Around the Sierra de Pela the steppe holds great bustard, little bustard, pin-tailed sandgrouse, stone curlew, lesser kestrel, Montagu's harrier and black-shouldered kite. The cliffs hold Egyptian and griffon vulture, Bonelli's eagle and eagle owl [2][3].

Stop at the Puerto Peña dam viewpoint for raptors, then drive the EX-103 along the north shore. The minor road through Puerto Mejoral toward Sierra de Pela gives the steppe segment. A full day, with scope, is needed to do justice to the combined site.
    `.trim(),
    birds: [
      "Greater flamingo", "Common crane", "Great cormorant", "Gadwall", "Northern shoveler",
      "Common pochard", "Black stork", "White stork", "Black-winged stilt", "Pied avocet",
      "Great bustard", "Little bustard", "Pin-tailed sandgrouse", "Black-bellied sandgrouse", "Stone curlew",
      "Egyptian vulture", "Griffon vulture", "Bonelli's eagle", "Lesser kestrel", "Montagu's harrier",
    ],
    bestSeason: "Year-round; spring is peak diversity, winter for cranes and flamingos",
    durationHours: 5,
    tips: "Stop at the Puerto Peña dam for raptors over the cliffs, then explore the steppe on the Sierra de Pela road north.",
    website: "",
    sources: [SOURCE.ramsar, SOURCE.seo, SOURCE.n2k],
  },

  // ───────────── 7. La Serena ─────────────
  {
    id: "la-serena",
    name: "La Serena",
    type: "steppe",
    lat: 38.9000, lng: -5.5000,
    summary: "The largest pseudo-steppe in Western Europe — open horizon-to-horizon plains grazed by Merino sheep.",
    description: `
La Serena occupies the south-east of Badajoz province and is the single largest pseudo-steppe in Western Europe at over 150,000 hectares within its ZEPA boundary, with an additional 70,000 ha of contiguous steppe outside the protected area [1][2]. The land is communally owned grazing common (a *baldío*) with deep historical use by transhumant Merino flocks — that pastoral system is the reason the steppe persists.

The terrain is a vast, almost treeless slate plain at 350–450 m, broken only by occasional quartzite tors, dry stone walls, and the long granite ridge of Sierra del Tiros. Cereal cultivation gives way to short, grazed sward and *retamares* (broom scrub). In April the plain is briefly green and full of larks; by July it is bone-dry and the quiet is total.

La Serena holds the global stronghold of pin-tailed sandgrouse (*Pterocles alchata*) with thousands of birds, plus huge concentrations of great bustard, little bustard, black-bellied sandgrouse, calandra lark, lesser kestrel, Montagu's harrier and European roller [2][3]. In winter it hosts cranes; on passage it hosts collared pratincole. Black-shouldered kite, Spanish imperial eagle, Egyptian vulture and eagle owl all hunt or roost here.

The Castuera–Cabeza del Buey–Esparragosa road forms a classic transect. Stop at every rise. There is little fuel and no shade for long stretches — bring water, sun protection, and a full tank. Best birding is dawn and the two hours before sunset; midday silence in summer is profound.
    `.trim(),
    birds: [
      "Great bustard", "Little bustard", "Pin-tailed sandgrouse", "Black-bellied sandgrouse", "Stone curlew",
      "Collared pratincole", "European roller", "Lesser kestrel", "Montagu's harrier", "Black-shouldered kite",
      "Spanish imperial eagle", "Egyptian vulture", "Calandra lark", "Greater short-toed lark", "Tawny pipit",
      "Spectacled warbler", "Black-eared wheatear", "Iberian grey shrike", "Common quail", "Corn bunting",
    ],
    bestSeason: "April–June; cranes use it Nov–Feb",
    durationHours: 5,
    tips: "Use the Castuera–Cabeza del Buey road as a transect. Bring water, sun protection, fuel — services are sparse.",
    website: "",
    sources: [SOURCE.seo, SOURCE.n2k, SOURCE.crossbill],
  },

  // ───────────── 8. Sierra de San Pedro ─────────────
  {
    id: "sierra-san-pedro",
    name: "Sierra de San Pedro (ZEPA)",
    type: "forest",
    lat: 39.4000, lng: -6.8500,
    summary: "Wild dehesa and cork-oak ridges — the densest concentration of Spanish imperial eagles and black storks in Spain.",
    description: `
The Sierra de San Pedro ZEPA covers some 116,000 hectares of dehesa, cork oak forest and quartzite ridge along the Spanish-Portuguese border between Cáceres province and the Tagus. It is widely regarded as the single most important raptor area in the Iberian Peninsula and arguably in Europe, with the densest known concentration of Spanish imperial eagle (*Aquila adalberti*), black stork (*Ciconia nigra*) and cinereous vulture (*Aegypius monachus*) [1][2].

Habitat is mature dehesa on rolling slopes — old cork oaks (some over 200 years), holm oak, and Pyrenean oak in deeper soils. Streams cut through cistus-and-strawberry-tree scrub on the steeper ridges. The quartzite *crestones* (San Mamede, Salor) reach 700 m and provide cliff-nesting sites. Large estates (*fincas*) dominate land tenure, restricting access to public roads.

At least 30 pairs of Spanish imperial eagle and similar numbers of black stork breed inside the ZEPA boundary [2][3]. Cinereous vulture, griffon vulture, golden eagle, Bonelli's eagle, short-toed eagle, booted eagle, black kite and red kite all nest. Black vulture roosts can hold 100+ birds. Iberian lynx is occasionally reported on the Portuguese flank. Roller, bee-eater, hoopoe, golden oriole and Iberian green woodpecker are characteristic of the dehesa.

Public access is along the EX-303 Membrío–Salorino road, the EX-368 from Valencia de Alcántara, and the route from San Vicente de Alcántara. Pull off at miradores; do not enter private estates without permission. Spring and autumn passage are spectacular. A 4×4 helps but is not required.
    `.trim(),
    birds: [
      "Spanish imperial eagle", "Cinereous vulture", "Black stork", "Griffon vulture", "Golden eagle",
      "Bonelli's eagle", "Short-toed eagle", "Booted eagle", "Black kite", "Red kite",
      "Black-winged kite", "Eurasian eagle owl", "European roller", "Bee-eater", "Hoopoe",
      "Golden oriole", "Iberian green woodpecker", "Iberian magpie", "Cirl bunting", "Great spotted cuckoo",
    ],
    bestSeason: "March–June",
    durationHours: 6,
    tips: "Drive EX-303 Membrío–Salorino slowly. Pull over at miradores; do not enter private fincas without permission.",
    website: "",
    sources: [SOURCE.seo, SOURCE.n2k, SOURCE.birdex],
  },

  // ───────────── 9. Monfragüe National Park ─────────────
  {
    id: "monfrague",
    name: "Parque Nacional de Monfragüe",
    type: "canyon",
    lat: 39.8300, lng: -6.0500,
    summary: "Extremadura's flagship national park — Tagus river canyon ringed by quartzite cliffs holding Europe's densest vulture colonies.",
    description: `
Parque Nacional de Monfragüe protects 18,000 hectares (with a buffer Biosphere Reserve of 116,000 ha) along a horseshoe meander of the river Tajo (Tagus). It became Spain's twelfth national park in 2007 after decades as a Natural Park, and was declared a UNESCO Biosphere Reserve in 2003 [1][2]. It is the single most-visited birdwatching destination in Iberia.

The park's defining feature is the parallel quartzite ridge that the river has cut through to form a serrated, cliff-walled canyon. Vegetation is intact Mediterranean: pristine cork oak and holm oak dehesa on the southern slopes, *madroñal* (strawberry-tree thicket) on cooler northern aspects, and dense gallery forest along the Tajo. The cliffs themselves are bare quartzite — perfect for cavity- and ledge-nesting birds.

Monfragüe holds Europe's densest breeding population of cinereous vulture (~250 pairs), one of the largest griffon vulture colonies (~700 pairs), 30+ pairs of Egyptian vulture, 12+ pairs of Spanish imperial eagle, breeding black stork, eagle owl, peregrine and golden eagle [2][3]. Iberian lynx has been recently reintroduced to the buffer zone. Otter, common genet and Egyptian mongoose are widespread. The hilltop castle is a roost for tens of thousands of swifts.

Start at the Villarreal de San Carlos visitor centre. The Salto del Gitano viewpoint (km 26 of EX-208) is the iconic stop and worth visiting at multiple times of day. The Castillo de Monfragüe trail (5 km return) climbs to a 360° viewpoint over the canyon — a must in spring.
    `.trim(),
    birds: [
      "Cinereous vulture", "Griffon vulture", "Egyptian vulture", "Black stork", "Spanish imperial eagle",
      "Golden eagle", "Bonelli's eagle", "Short-toed eagle", "Booted eagle", "Peregrine falcon",
      "Eurasian eagle owl", "Black wheatear", "Blue rock thrush", "Crag martin", "Alpine swift",
      "Pallid swift", "White-rumped swift", "Black redstart", "Rock bunting", "Red-billed chough",
    ],
    bestSeason: "February–June; September for migration",
    durationHours: 7,
    tips: "Start at Villarreal de San Carlos visitor centre. Don't miss Salto del Gitano viewpoint at any time of day.",
    website: "https://www.turismoextremadura.com/viajar/turismo/en/explore/Monfrague-National-Park/",
    sources: [SOURCE.je, SOURCE.unesco, SOURCE.birdex],
  },

  // ───────────── 10. Salto del Gitano ─────────────
  {
    id: "salto-gitano",
    name: "Salto del Gitano (Peñafalcón)",
    type: "canyon",
    lat: 39.8400, lng: -6.0470,
    summary: "Iconic 200-metre cliff inside Monfragüe — vultures pass at eye level from the roadside viewpoint.",
    description: `
Salto del Gitano (or Peñafalcón) is the single most photographed birding spot in Spain. The viewpoint is a roadside pull-off on the EX-208 within Monfragüe National Park, looking directly across at a 200-metre-high quartzite cliff face that overhangs the river Tajo. The site has no buildings and no entrance fee; the road itself is the gallery [1][2].

The cliff geology is folded Ordovician quartzite, the same rock that forms Monfragüe's parallel ridges. Crevices, ledges and overhangs are densely occupied by colonial cliff-nesting raptors. The river below is deep, slow and rich in fish and dragonflies; the surrounding slopes are intact Mediterranean scrub of strawberry tree, gum-cistus and wild olive.

Salto del Gitano holds 80–100 pairs of griffon vulture, 1–3 pairs of Egyptian vulture (March–September), breeding black stork (1–2 pairs on the same cliff face), Bonelli's eagle, eagle owl, peregrine falcon, blue rock thrush, black wheatear, alpine swift, white-rumped swift (Iberian rarity), red-billed chough and crag martin [2][3]. In spring, vultures lift off thermals at eye level a few metres in front of the viewpoint.

Visit early morning (vultures rising on first thermals) or late afternoon (golden light, cliff-face activity). The car park fills fast on spring weekends — arrive before 10:00 or after 17:00. Across the road, a short trail leads to a viewpoint over the river itself, useful for kingfisher and dragonflies. No facilities; nearest food and toilets at Villarreal de San Carlos (5 km).
    `.trim(),
    birds: [
      "Griffon vulture", "Egyptian vulture", "Cinereous vulture", "Black stork", "Bonelli's eagle",
      "Spanish imperial eagle", "Peregrine falcon", "Eurasian eagle owl", "White-rumped swift", "Alpine swift",
      "Pallid swift", "Common swift", "Crag martin", "Red-billed chough", "Black wheatear",
      "Blue rock thrush", "Rock bunting", "Black redstart", "Common kingfisher", "Grey wagtail",
    ],
    bestSeason: "March–June (breeding cliffs alive)",
    durationHours: 1,
    tips: "Visit early morning for thermal lift-off, or late afternoon for golden light. Car park fills fast on weekends.",
    website: "",
    sources: [SOURCE.je, SOURCE.te, SOURCE.birdex],
  },

  // ───────────── 11. Embalse de Arrocampo ─────────────
  {
    id: "arrocampo",
    name: "Embalse de Arrocampo",
    type: "wetland",
    lat: 39.8500, lng: -5.6500,
    summary: "Power-station cooling reservoir that stays warm year-round — magnet for herons and rare wetland birds.",
    description: `
The Embalse de Arrocampo is a 700-hectare reservoir built in 1976 to provide cooling water for the Almaraz nuclear power station. The constant warm-water inflow keeps the lake several degrees above ambient and ice-free year-round, a microclimate that has produced one of the most species-rich wetlands in inland Spain. It is a designated ZEPA and SCI within Natura 2000 [1][2].

The shoreline is a labyrinth of reedbeds (*Phragmites*), bulrush stands, willow thickets and shallow flats. Five well-signposted observation hides circle the perimeter, each providing a different view: deep open water, reedbed margins, mudflats, willow gallery, and the warmwater outflow. Surrounding land is cereal-stubble dehesa, used by raptors hunting from the reedbed edge.

Arrocampo's signature species is the western swamphen (*Porphyrio porphyrio*), now common and easily seen at all hides. Little bittern, purple heron, squacco heron, night heron, great bittern (winter, rare), great white egret, little egret, glossy ibis and Eurasian spoonbill all use the reeds [2][3]. Marsh harrier hunts overhead; Cetti's warbler, great reed warbler and Savi's warbler sing from cover. Whiskered tern and black tern pass on migration. Bluethroat winters in the reedbeds.

The recommended sequence is hide 1 (Saucedilla, the most productive), then hides 2–4 along the perimeter, ending at hide 5 near the dam. Allow at least three hours; bring binoculars and patience for skulking species. Mosquitoes are abundant May–September.
    `.trim(),
    birds: [
      "Western swamphen", "Little bittern", "Purple heron", "Squacco heron", "Night heron",
      "Great white egret", "Little egret", "Cattle egret", "Glossy ibis", "Eurasian spoonbill",
      "Marsh harrier", "Western osprey", "Cetti's warbler", "Great reed warbler", "Savi's warbler",
      "Reed warbler", "Bluethroat", "Whiskered tern", "Black tern", "Common kingfisher",
    ],
    bestSeason: "April–July",
    durationHours: 3,
    tips: "Five hides along the perimeter. Hide 1 (near Saucedilla) is most productive; bring repellent in summer.",
    website: "",
    sources: [SOURCE.seo, SOURCE.n2k, SOURCE.birdex],
  },

  // ───────────── 12. Tajo Internacional ─────────────
  {
    id: "tajo-internacional",
    name: "Parque Natural Tajo Internacional",
    type: "canyon",
    lat: 39.5500, lng: -7.3000,
    summary: "The Tagus carves a deep frontier canyon with Portugal — remote, lightly visited, full of cliff-nesting raptors.",
    description: `
The Parque Natural Tajo Internacional protects 25,000 hectares along the Spanish bank of a 50-km section of the river Tajo where it forms the international border with Portugal. The Portuguese side (Parque Natural do Tejo Internacional) adds a further 26,000 ha, making the combined transboundary area one of the largest protected canyon systems in southern Europe [1][2]. Remoteness keeps visitor numbers low.

The Tajo here cuts a deep, sinuous canyon through Hercynian schist and quartzite. Cliffs reach 200 m and are interrupted by tributary gorges (the Salor, Sever and Erjas). Slopes are clothed in dense Mediterranean scrub of strawberry tree, gum-cistus, broom and turpentine tree, with cork oak in deeper soils. The river itself is dammed at intervals — slow, dark water with rich riparian forest along the banks.

Tajo Internacional holds 14+ pairs of Bonelli's eagle (*Aquila fasciata*) — one of the densest concentrations in Europe — plus breeding Egyptian vulture, griffon vulture, golden eagle, eagle owl and black stork [2][3]. Otter populations are healthy; Iberian lynx is reintroduced in the buffer zone. The riparian forest holds golden oriole, common nightingale, Cetti's warbler and kingfisher. In summer, alpine swift and white-rumped swift hunt over the canyon.

Boat trips operate from Cedillo, Alcántara reservoir and Herrera de Alcántara — these give cliff-base perspectives unobtainable from above. The Roman bridge of Alcántara is itself worth a stop. The viewpoints around Santiago de Alcántara and Salorino are easily reached by car.
    `.trim(),
    birds: [
      "Bonelli's eagle", "Egyptian vulture", "Griffon vulture", "Golden eagle", "Black stork",
      "Eurasian eagle owl", "Peregrine falcon", "Short-toed eagle", "Booted eagle", "Black kite",
      "Crag martin", "Alpine swift", "White-rumped swift", "Black wheatear", "Blue rock thrush",
      "Common kingfisher", "Grey wagtail", "Common nightingale", "Golden oriole", "Cetti's warbler",
    ],
    bestSeason: "March–June",
    durationHours: 6,
    tips: "Take a boat trip from Cedillo or Alcántara for cliff-base views you can't get from above.",
    website: "https://parquetajointernacional.juntaex.es/",
    sources: [SOURCE.je, SOURCE.n2k, SOURCE.crossbill],
  },

  // ───────────── 13. Villuercas-Ibores-Jara ─────────────
  {
    id: "villuercas",
    name: "Geoparque Villuercas-Ibores-Jara",
    type: "mountain",
    lat: 39.5000, lng: -5.4000,
    summary: "UNESCO Global Geopark of dramatic ridges and valleys — striking geology paired with raptors and Mediterranean forest.",
    description: `
The Geoparque Villuercas-Ibores-Jara is a UNESCO Global Geopark covering 2,500 km² of the Apalachian-style folded mountains in eastern Cáceres province. Designated in 2011, it is recognised for the quality of its Cambrian-Ordovician fossil record (notably trilobites and graptolites) and the textbook expression of "Apalachian relief" — long parallel ridges and valleys [1][2]. The town of Guadalupe, with its UNESCO-listed Royal Monastery, sits at its heart.

Geology dominates the landscape: parallel quartzite crests rising to 1,601 m at Pico Villuerca, separated by deep schist-floored valleys. Vegetation grades from chestnut and Pyrenean oak in cool valley bottoms through Mediterranean cork-oak slopes to relict heath at the highest summits. The Ruecas, Ibor and Almonte rivers cut deep gorges; the Garganta de las Lanchas and the cascading falls of the Chorrera are popular hikes.

The geopark holds significant populations of cinereous vulture, griffon vulture, Bonelli's eagle, golden eagle, peregrine falcon and eagle owl on its quartzite cliffs [2][3]. Black stork breeds in the deeper gorges. Otter is widespread along the rivers. Iberian wolf is occasionally recorded on the eastern flank near Guadalupe. Mediterranean forest birds are abundant in the cork-oak: Sardinian warbler, subalpine warbler, Bonelli's warbler, Iberian green woodpecker, hawfinch and crested tit.

Base in Guadalupe (the monastery is itself a UNESCO World Heritage site). The road to Risco de la Villuerca (the highest summit) gives panoramic raptor views. The geological interpretation centre in Cañamero is worth a stop. Many marked geotrails of varying length depart from villages in the geopark.
    `.trim(),
    birds: [
      "Cinereous vulture", "Griffon vulture", "Bonelli's eagle", "Golden eagle", "Black stork",
      "Eurasian eagle owl", "Peregrine falcon", "Short-toed eagle", "Booted eagle", "Iberian green woodpecker",
      "Hawfinch", "Crested tit", "Firecrest", "Western Bonelli's warbler", "Subalpine warbler",
      "Sardinian warbler", "Cirl bunting", "Common nightingale", "Rock bunting", "Iberian magpie",
    ],
    bestSeason: "Spring and autumn",
    durationHours: 6,
    tips: "Base in Guadalupe (the monastery is a UNESCO site). The road to Risco de la Villuerca summit gives panoramic raptor views.",
    website: "https://geoparquevilluercas.es/",
    sources: [SOURCE.unesco, SOURCE.je, SOURCE.te],
  },

  // ───────────── 14. Sierra de Gata ─────────────
  {
    id: "sierra-gata",
    name: "Sierra de Gata",
    type: "mountain",
    lat: 40.3000, lng: -6.6500,
    summary: "Northern mountain range with chestnut woods, traditional villages and atlantic-influenced wildlife.",
    description: `
The Sierra de Gata forms the northern border of Cáceres province with Salamanca, climbing to 1,592 m at Jálama. It is the southernmost Atlantic-influenced mountain range in Spain and an SCI in the Natura 2000 network [1][2]. The unique linguistic enclave of "A Fala" survives in three villages here — Valverde del Fresno, Eljas and San Martín de Trevejo — adding cultural depth to the landscape.

Habitat is diverse: extensive chestnut groves on north-facing slopes, mixed Pyrenean oak and holm oak woodland, hilltop heaths of broom and gorse, and granite *berrocales* at higher altitudes. North-facing aspects are damper, southern aspects more Mediterranean — the cordillera marks a real biogeographic boundary. Streams hold trout and otter; old chestnut wood-pasture is a unique semi-natural community.

The Sierra de Gata holds breeding cinereous vulture (small population), black stork, golden eagle, Bonelli's eagle, eagle owl and the only known Extremaduran population of black woodpecker [2][3]. Iberian wolf is intermittently present from the Salamanca side. Otter is widespread. Forest passerines include firecrest, Eurasian nuthatch, hawfinch, common chaffinch, common cuckoo, common nightingale and middle spotted woodpecker.

Hike from Trevejo (the medieval Templar village), Robledillo de Gata or Hoyos. Combine wildlife with the cultural circuit through the A Fala villages. Best in May for chestnut leaf-out and breeding birds, or October for chestnut harvest and autumn colour. Mountain weather can shift quickly; bring layers.
    `.trim(),
    birds: [
      "Cinereous vulture", "Griffon vulture", "Black stork", "Golden eagle", "Bonelli's eagle",
      "Eurasian eagle owl", "Black woodpecker", "Middle spotted woodpecker", "Iberian green woodpecker", "Great spotted woodpecker",
      "Firecrest", "Goldcrest", "Common chaffinch", "Hawfinch", "Eurasian nuthatch",
      "Short-toed treecreeper", "Crested tit", "Coal tit", "Common cuckoo", "Common nightingale",
    ],
    bestSeason: "May–October",
    durationHours: 6,
    tips: "Hike from Trevejo or Robledillo de Gata. Combine wildlife with the unique 'A Fala' linguistic villages.",
    website: "",
    sources: [SOURCE.n2k, SOURCE.te, SOURCE.crossbill],
  },

  // ───────────── 15. Garganta de los Infiernos / Valle del Jerte ─────────────
  {
    id: "jerte",
    name: "Reserva Natural Garganta de los Infiernos / Valle del Jerte",
    type: "river",
    lat: 40.2000, lng: -5.7500,
    summary: "Dramatic granite gorge with natural pools, in the Jerte valley famous for its million cherry trees in bloom.",
    description: `
The Reserva Natural Garganta de los Infiernos protects 6,927 hectares of granite gorge and high mountain in the Sierra de Tormantos, on the western flank of the Jerte valley. Declared in 1994, it is one of only four Reservas Naturales in Extremadura [1][2]. The valley below is famous for the *cerezo en flor* — over a million cherry trees in bloom for ten days in late March/early April, a Festival of Cultural Interest.

The Garganta itself is a deep granite ravine of polished pools (*Los Pilones*) carved by glacial meltwater. The walls rise to 2,000 m at the Sierra de Tormantos crest, with patches of Pyrenean oak, birch (a southern outpost), broom and high-altitude grassland. Below 1,200 m, terraced cherry orchards and chestnut woods cloak the slopes; the valley floor is a mosaic of irrigated agriculture and riparian forest along the Jerte river.

Wildlife reflects the altitude gradient: at higher elevations, golden eagle, peregrine falcon, water pipit, alpine accentor (winter), ring ouzel and rock thrush; in mid-slopes, otter, dipper, grey wagtail, Iberian green woodpecker, common cuckoo and goldcrest [2][3]. The lower cherry-orchard zone holds golden oriole, great spotted woodpecker, common redstart, and hawfinch in autumn. Spanish ibex (*Capra pyrenaica victoriae*) was reintroduced and is now established.

The Los Pilones natural pools are a 7-km return hike from the Garganta de los Infiernos visitor centre — the classic walk. Park early; the centre fills by mid-morning in spring. The PR-CC-22 trail offers a longer alternative. Combine with a drive through the cherry valley below.
    `.trim(),
    birds: [
      "Golden eagle", "Peregrine falcon", "Cinereous vulture", "Griffon vulture", "Black stork",
      "Common kingfisher", "White-throated dipper", "Grey wagtail", "Iberian green woodpecker", "Great spotted woodpecker",
      "Common cuckoo", "Goldcrest", "Firecrest", "Common redstart", "Northern wheatear",
      "Water pipit", "Rock thrush", "Black redstart", "Crag martin", "Hawfinch",
    ],
    bestSeason: "Late March–April for cherry blossom; May–September for hiking",
    durationHours: 5,
    tips: "Los Pilones natural pools is the classic hike. Park early at the Garganta de los Infiernos visitor centre.",
    website: "",
    sources: [SOURCE.je, SOURCE.te, SOURCE.crossbill],
  },

  // ───────────── 16. Cáceres old town ─────────────
  {
    id: "caceres-old-town",
    name: "Cáceres — UNESCO Old Town",
    type: "town",
    lat: 39.4750, lng: -6.3722,
    summary: "UNESCO World Heritage walled city with one of Iberia's largest urban lesser kestrel colonies.",
    description: `
The walled old town of Cáceres has been a UNESCO World Heritage site since 1986, recognised for the rare completeness of its medieval-Renaissance architectural ensemble and its almost untouched urban fabric [1]. Beyond its cultural value it is also one of the most important urban bird sites in Europe: the Casco Histórico is a designated SPA (ZEPA "Colonias de cernícalo primilla de Cáceres") for its lesser kestrel colonies [2].

The town's golden granite-and-sandstone palaces, towers and convents — many built between the 12th and 16th centuries — provide a textbook substrate for cavity-nesting birds. Old roofs, parapets, scaffolding holes (*mechinales*), and church belfries are all occupied. The Plaza de Santa María, the Iglesia de San Francisco Javier and the Iglesia Concatedral de Santa María are the most easily watched colonies.

Around 100–130 pairs of lesser kestrel breed inside the walled town from late March through July, with screaming aerial pursuits over the rooftops and intense activity around the colonies in early morning and late afternoon [2][3]. Pallid swift, common swift, white-rumped swift (rare summer visitor), crag martin, common kestrel, white stork (large stick-nests on belfries), spotless starling, black redstart and house martin breed alongside. Booted eagle and black kite hunt over the town from the surrounding plain.

Walking is the only way to see the old town. Climb the Bujaco tower or the Iglesia de San Francisco Javier roof terrace at sunset for kestrel-level views. The Cáceres bird-watching trail signage points out the best colony viewpoints. Allow half a day to combine birding with cultural sightseeing.
    `.trim(),
    birds: [
      "Lesser kestrel", "Common kestrel", "White stork", "Pallid swift", "Common swift",
      "White-rumped swift", "Crag martin", "House martin", "Barn swallow", "Spotless starling",
      "Black redstart", "Rock dove", "Common wood pigeon", "Booted eagle", "Black kite",
      "Black-shouldered kite", "Hoopoe", "Common kingfisher", "Iberian magpie", "Sardinian warbler",
    ],
    bestSeason: "April–June (breeding kestrels active)",
    durationHours: 3,
    tips: "Climb the Bujaco tower at sunset for kestrel-level views. The Iglesia de San Francisco Javier rooftop is the classic viewpoint.",
    website: "https://turismo.ayto-caceres.es/",
    sources: [SOURCE.unesco, SOURCE.seo, SOURCE.te],
  },

  // ───────────── 17. Embalse de Sierra Brava ─────────────
  {
    id: "sierra-brava",
    name: "Embalse de Sierra Brava",
    type: "wetland",
    lat: 39.1250, lng: -5.7800,
    summary: "Massive wintering site for common cranes — flocks of tens of thousands roost here.",
    description: `
The Embalse de Sierra Brava is a 1,650-hectare reservoir between Zorita and Madrigalejo, completed in 1995 to irrigate the surrounding Vegas Altas plains. Within a decade of its construction it became one of the most important crane wintering sites in Western Europe and is now a Ramsar Site (since 2002) and ZEPA [1][2]. Counts of common crane (*Grus grus*) routinely exceed 30,000 individuals between November and February.

The reservoir occupies a shallow basin in the dehesa-cereal mosaic of central Cáceres, with extensive shallow shorelines, exposed mudflats during late autumn drawdown, and a network of small bays and islands. Surrounding land is intensively farmed cereal and rice — the rice stubble is a primary daytime feeding habitat for cranes and ducks. Holm oak dehesa fringes the western shore.

Aside from cranes, Sierra Brava hosts large numbers of greylag goose (5,000+), gadwall, northern shoveler, common pochard, red-crested pochard, ferruginous duck (occasional), tufted duck, common shelduck, black-necked grebe and great cormorant in winter [2][3]. Greater flamingo is regular. Black stork and white stork on passage, marsh harrier, western osprey and booted eagle hunt. In spring and autumn the mudflats hold wood, green and common sandpiper, ringed and little ringed plover, dunlin and wood sandpiper.

Approach via the EX-102 from Zorita; the dam road runs along the south shore with several pull-offs. The Madrigalejo side has the best afternoon light. Cranes leave the roost at first light and return one hour before sunset — both moments are spectacular. A scope is essential.
    `.trim(),
    birds: [
      "Common crane", "Greylag goose", "Greater flamingo", "Common shelduck", "Gadwall",
      "Northern shoveler", "Eurasian teal", "Common pochard", "Red-crested pochard", "Tufted duck",
      "Black-necked grebe", "Great cormorant", "Black stork", "White stork", "Marsh harrier",
      "Western osprey", "Pied avocet", "Wood sandpiper", "Common snipe", "Bluethroat",
    ],
    bestSeason: "November–February for cranes; April–May for waders on passage",
    durationHours: 3,
    tips: "Approach via the EX-102 from Zorita. Dawn and the hour before sunset for crane fly-out and fly-in. Scope essential.",
    website: "",
    sources: [SOURCE.ramsar, SOURCE.seo, SOURCE.ebird],
  },

  // ───────────── 18. Embalse de Talaván ─────────────
  {
    id: "talavan",
    name: "Embalse de Talaván",
    type: "wetland",
    lat: 39.7500, lng: -6.2900,
    summary: "Compact reservoir on the Cáceres–Monfragüe road — convenient stop for cranes, waders, and steppe birds.",
    description: `
The Embalse de Talaván is a small (~80 ha) reservoir on the Almonte's tributary stream, a few kilometres south of Talaván village on the road from Cáceres to Monfragüe. Despite its modest size it punches above its weight as a birding stop — the surrounding pseudo-steppe holds bustards, sandgrouse and lesser kestrels, while the lake itself attracts wintering cranes and a steady flow of waders on passage [1][2]. Most birders stop here en route to Monfragüe.

Habitat is the open water of the reservoir, narrow muddy fringes (extensive in autumn drawdown), and surrounding cereal-fallow steppe with scattered holm oak. The dam end is best for waterfowl, the upstream end for waders on the mud. The road from Talaván village passes pull-offs giving views over both ends.

Talaván reliably hosts a few thousand wintering cranes that roost on the lake and feed on the surrounding cereal stubble. Greater flamingo, pied avocet, black-winged stilt, common shelduck, gadwall, common teal and tufted duck use the reservoir. The steppe around holds great bustard, little bustard, pin-tailed sandgrouse, stone curlew, calandra lark, lesser kestrel and Montagu's harrier in season [2][3]. Roller breeds in pylons along the access road.

The classic loop is to approach from the south, drive the unpaved track along the dam, and continue on the back roads toward Hinojal — these dirt roads cross prime steppe and are excellent for bustards. Combine Talaván with Monfragüe (30 minutes north) and Llanos de Cáceres for a full birding day.
    `.trim(),
    birds: [
      "Common crane", "Greater flamingo", "Greylag goose", "Common shelduck", "Gadwall",
      "Eurasian teal", "Tufted duck", "Pied avocet", "Black-winged stilt", "Wood sandpiper",
      "Great bustard", "Little bustard", "Pin-tailed sandgrouse", "Stone curlew", "Lesser kestrel",
      "Montagu's harrier", "European roller", "Calandra lark", "Iberian grey shrike", "Black-shouldered kite",
    ],
    bestSeason: "December–February for cranes; April–May for steppe and passage",
    durationHours: 2,
    tips: "Drive the dirt tracks east toward Hinojal — they cross prime steppe and are excellent for bustards.",
    website: "",
    sources: [SOURCE.seo, SOURCE.ebird, SOURCE.birdex],
  },

  // ───────────── 19. Embalse de Borbollón ─────────────
  {
    id: "borbollon",
    name: "Embalse del Borbollón",
    type: "wetland",
    lat: 40.1500, lng: -6.5700,
    summary: "Reservoir at the foot of Sierra de Gata, with a rare inland heronry on a wooded island.",
    description: `
The Embalse del Borbollón dams the Árrago river at the foot of the Sierra de Gata, north-west of Coria. Built in 1954 it covers ~700 hectares at full capacity and is unusual in southern Europe for hosting a substantial mixed heronry on an island within the lake. The site is a ZEPA (Special Protection Area) and Natura 2000 SCI [1][2]. Its position between the steppe of the Llanos and the Sierra de Gata makes it a transition habitat.

The reservoir is steep-sided in its main body but has shallow flats and inundated meadows at the upstream end, plus a large central island wooded with stone pine, eucalyptus and alder. Shoreline vegetation is patchy reedbed and tamarisk; surrounding land is a mix of pine plantation, dehesa and small-scale cereal.

The island heronry has held breeding cattle egret, little egret, night heron, squacco heron, glossy ibis (recent) and Eurasian spoonbill — a rare assemblage for inland Iberia [2][3]. Greater flamingo is increasingly regular. Black stork breeds in nearby cliffs and uses the reservoir for foraging. In winter the lake hosts gadwall, common pochard, tufted duck, Eurasian wigeon, great cormorant and a small but regular flock of common crane. Western osprey passes through. The surrounding pine-dehesa holds Spanish imperial eagle, booted eagle, short-toed eagle and golden oriole.

Park at the dam viewpoint on the EX-109 between Moraleja and Santibáñez el Alto. A signposted footpath leads to a hide overlooking the island heronry — best at dawn when birds are active. Combine with a drive into the Sierra de Gata immediately north.
    `.trim(),
    birds: [
      "Cattle egret", "Little egret", "Night heron", "Squacco heron", "Eurasian spoonbill",
      "Glossy ibis", "Black stork", "White stork", "Greater flamingo", "Common crane",
      "Eurasian wigeon", "Gadwall", "Common pochard", "Tufted duck", "Western osprey",
      "Spanish imperial eagle", "Short-toed eagle", "Booted eagle", "Bonelli's eagle", "Golden oriole",
    ],
    bestSeason: "March–June for heronry; November–February for waterfowl",
    durationHours: 3,
    tips: "The hide overlooking the island heronry is best at dawn. Combine with a drive into the Sierra de Gata.",
    website: "",
    sources: [SOURCE.n2k, SOURCE.seo, SOURCE.crossbill],
  },

  // ───────────── 20. Llanos de Brozas-Alcántara ─────────────
  {
    id: "brozas-alcantara",
    name: "Llanos de Brozas y Alcántara (ZEPA)",
    type: "steppe",
    lat: 39.6200, lng: -6.7700,
    summary: "Quiet, wide-open steppe in north-west Cáceres, with the famous Roman bridge of Alcántara nearby.",
    description: `
The Llanos de Brozas-Alcántara ZEPA covers approximately 35,000 hectares of cereal-pasture steppe in north-west Cáceres province, between the towns of Brozas, Navas del Madroño and Alcántara. It is one of Extremadura's quieter steppe areas — birders heading for Monfragüe or Sierra de San Pedro often skip it — yet it holds the full suite of Iberian steppe specialists in good numbers [1][2]. The site was declared a ZEPA in 2003.

The terrain is gently undulating granite plain at 300–400 m, drained by tributaries of the Salor and the Tajo. Land use is a traditional mix of dryland cereal (wheat and oats), grazed fallow, and small dehesas of holm oak. Stone walls and granite *berrocales* are abundant, providing nesting sites for stone curlew, little owl and rock sparrow. The Roman bridge of Alcántara (1st century AD), spanning the Tajo just to the north, is itself a spectacular cultural-landscape feature.

The area holds great bustard, little bustard, pin-tailed sandgrouse, black-bellied sandgrouse, stone curlew, lesser kestrel, Montagu's harrier and black-shouldered kite [2][3]. Roller breeds in pylons; great spotted cuckoo arrives in March. In winter, common crane flocks pass through and Iberian grey shrike is widespread. The dehesa fringes hold black vulture, short-toed eagle and golden oriole.

Drive the back roads between Brozas and Navas del Madroño at dawn or dusk. The Brozas–Alcántara road (CC-119) is excellent for steppe birds. End at the Roman bridge for cultural and scenic relief. Allow at least three hours and bring a scope.
    `.trim(),
    birds: [
      "Great bustard", "Little bustard", "Pin-tailed sandgrouse", "Black-bellied sandgrouse", "Stone curlew",
      "Lesser kestrel", "Common kestrel", "Montagu's harrier", "Black-shouldered kite", "European roller",
      "Calandra lark", "Greater short-toed lark", "Tawny pipit", "Spectacled warbler", "Black-eared wheatear",
      "Iberian grey shrike", "Rock sparrow", "Little owl", "Great spotted cuckoo", "Corn bunting",
    ],
    bestSeason: "April–May",
    durationHours: 3,
    tips: "Drive the CC-119 between Brozas and Alcántara at dawn. End at the Roman bridge — the cultural payoff matches the birds.",
    website: "",
    sources: [SOURCE.seo, SOURCE.n2k, SOURCE.te],
  },

  // ───────────── 21. Sierra de Montánchez ─────────────
  {
    id: "montanchez",
    name: "Sierra de Montánchez",
    type: "mountain",
    lat: 39.2100, lng: -6.1300,
    summary: "Compact granite range between Cáceres and Mérida, famed for chestnut woods and cliff-nesting raptors.",
    description: `
The Sierra de Montánchez is a small but distinct granite range rising to 988 m at the Pico Pizarrillo, separating the Cáceres plain from the Vegas del Guadiana. It is best known for two things: the village of Montánchez and its medieval castle perched on the highest summit, and the production of *jamón ibérico* from acorn-fed black Iberian pigs in the dehesa around its foot [1][2]. The range is a Natura 2000 SCI.

Habitat is mixed: granite *berrocales* with Mediterranean scrub of cistus and broom on the upper slopes, sweet chestnut groves (*castañares*) on cooler northern aspects (a southern outpost of this Atlantic-influenced tree), holm-oak and cork-oak dehesa on the lower flanks. The range catches more rainfall than the surrounding plains and supports a richer flora than its size suggests, including narcissus, cistus and orchids in spring.

The Sierra de Montánchez holds breeding pairs of golden eagle, Bonelli's eagle, peregrine falcon, eagle owl, black stork and Egyptian vulture, plus a regular foraging population of cinereous and griffon vulture from neighbouring colonies [2][3]. Forest birds include hawfinch, firecrest, crested tit, common chaffinch, golden oriole and great spotted woodpecker. Spotted flycatcher, common nightingale and Iberian magpie breed in the chestnut groves. Otter is present in the streams.

Drive to the castle at the summit of Montánchez village for panoramic views and raptor scope-watching. The PR-CC-26 trail (12 km) circles the range and offers a varied walk through chestnut, dehesa and *berrocales*. Allow a full day if hiking; otherwise three hours by car with stops.
    `.trim(),
    birds: [
      "Golden eagle", "Bonelli's eagle", "Cinereous vulture", "Griffon vulture", "Egyptian vulture",
      "Black stork", "Peregrine falcon", "Eurasian eagle owl", "Booted eagle", "Short-toed eagle",
      "Hawfinch", "Firecrest", "Crested tit", "Common chaffinch", "Golden oriole",
      "Great spotted woodpecker", "Iberian green woodpecker", "Spotted flycatcher", "Common nightingale", "Iberian magpie",
    ],
    bestSeason: "March–June; October for autumn colour",
    durationHours: 4,
    tips: "Drive to the castle at the summit of Montánchez village for panoramic raptor-watching.",
    website: "",
    sources: [SOURCE.n2k, SOURCE.te, SOURCE.crossbill],
  },

  // ───────────── 22. Plasencia ─────────────
  {
    id: "plasencia",
    name: "Plasencia & río Jerte",
    type: "town",
    lat: 40.0300, lng: -6.0900,
    summary: "Historic walled town on the Jerte river — gateway to northern Extremadura with abundant white storks.",
    description: `
Plasencia, founded in 1186 by Alfonso VIII, sits on a granite spur above the river Jerte at the gateway between the high country of Las Hurdes, the Jerte Valley and the Tiétar plain. Its 12th-century walls, Romanesque-Gothic cathedrals, and dense old town make it both a cultural destination and a working market town for the surrounding mountain comarcas [1]. White storks nest conspicuously on cathedral towers and palace belfries.

The river Jerte loops below the city walls in a broad, willow-lined gallery forest with reed margins, providing a riparian habitat right inside the urban area. The Parque del Cachón and the Parque de los Pinos preserve mature Mediterranean garden landscape on the riverbank. The town's many bell-towers, ruined arches and old buildings provide nesting niches for cavity-using species. Beyond the walls, dehesa and irrigated meadow extend to the surrounding sierras.

Plasencia hosts a long-established colony of white stork (40+ pairs on towers and chimneys) and a smaller lesser kestrel colony in the cathedral district [2][3]. Pallid swift, common swift, crag martin and house martin breed on the buildings. The Jerte gallery forest holds common kingfisher, grey wagtail, Cetti's warbler, common nightingale, golden oriole and (in winter) bluethroat. Booted eagle and black kite hunt over the surrounding dehesa.

Walk the Paseo de los Pinos along the river for the gallery-forest birds, then climb to the cathedral square for the storks. The Tuesday market in the Plaza Mayor is itself a cultural attraction. Plasencia is the natural base for trips into the Jerte, La Vera and Hurdes valleys.
    `.trim(),
    birds: [
      "White stork", "Lesser kestrel", "Common kestrel", "Pallid swift", "Common swift",
      "Crag martin", "House martin", "Barn swallow", "Spotless starling", "Black redstart",
      "Common kingfisher", "Grey wagtail", "Cetti's warbler", "Common nightingale", "Golden oriole",
      "Bluethroat", "Iberian magpie", "Booted eagle", "Black kite", "Hoopoe",
    ],
    bestSeason: "April–June",
    durationHours: 3,
    tips: "Walk the Paseo de los Pinos along the river then climb to the cathedral for the storks. Tuesday market is a bonus.",
    website: "https://www.turismoplasencia.es/",
    sources: [SOURCE.te, SOURCE.seo, SOURCE.crossbill],
  },

  // ───────────── 23. Mérida ─────────────
  {
    id: "merida",
    name: "Mérida & río Guadiana",
    type: "river",
    lat: 38.9160, lng: -6.3500,
    summary: "UNESCO Roman city on the Guadiana — riparian birding under aqueducts, with white storks on the theatre.",
    description: `
Mérida (Roman *Augusta Emerita*, founded 25 BC) is the capital of Extremadura and a UNESCO World Heritage site since 1993, with the most extensive ensemble of Roman ruins on the Iberian Peninsula [1]. The river Guadiana runs through the heart of the city, its banks providing surprisingly rich riparian birding alongside the cultural attractions. The Lusitania Bridge and the Roman bridge of Mérida frame a 5-km stretch of river within the urban area.

The Guadiana below the city is a slow, broad river fringed with willow, poplar and ash gallery forest, and patches of reedbed in shallower bays. Two islands within the urban reach (the Isla del Albarregas) hold mature woodland. Beyond the city limits, the river continues as a Natura 2000 SCI through dehesa countryside. Mérida itself preserves long stretches of green riverside park.

The Roman ruins host breeding white stork (notably on the theatre and on the *Templo de Diana*), pallid swift and common swift in the vaults, lesser kestrel on the cornices of the *Casa del Mitreo*, and crag martin under the bridges [2][3]. The river holds otter (regularly seen in early morning), common kingfisher, grey wagtail, white wagtail (winter), Cetti's warbler, great reed warbler, common nightingale and golden oriole. Black-headed gull, Mediterranean gull and yellow-legged gull use the river. In winter, ferruginous duck (rare), gadwall and common teal occur.

Combine cultural sightseeing with riverside birding by walking the Paseo Fluvial or hiring a kayak. The dawn river is best for otter and kingfisher. The MNAR (National Museum of Roman Art) is essential for the cultural side.
    `.trim(),
    birds: [
      "White stork", "Lesser kestrel", "Common kestrel", "Pallid swift", "Common swift",
      "Crag martin", "Common kingfisher", "Grey wagtail", "White wagtail", "Cetti's warbler",
      "Great reed warbler", "Reed warbler", "Common nightingale", "Golden oriole", "Spotless starling",
      "Black-headed gull", "Mediterranean gull", "Yellow-legged gull", "Iberian magpie", "Hoopoe",
    ],
    bestSeason: "April–June",
    durationHours: 3,
    tips: "Walk the Paseo Fluvial at dawn for otter and kingfisher. Combine with the National Museum of Roman Art.",
    website: "https://turismomerida.org/",
    sources: [SOURCE.unesco, SOURCE.te, SOURCE.n2k],
  },

  // ───────────── 24. Las Hurdes ─────────────
  {
    id: "las-hurdes",
    name: "Las Hurdes",
    type: "mountain",
    lat: 40.4500, lng: -6.2500,
    summary: "Remote upland of slate gorges, terraced villages and wild rivers in the far north of Cáceres.",
    description: `
Las Hurdes is one of the most isolated upland areas in mainland Spain — a comarca of 11 villages set in deep slate gorges between 600 and 1,500 m, on the northern border of Cáceres province. Famous (or infamous) since Luis Buñuel's 1933 film *Las Hurdes: Tierra sin pan*, the area today preserves traditional terraced agriculture, slate-roofed villages, and almost untouched wild rivers. Most of it is included in the Natura 2000 SCI "Las Hurdes" [1][2].

The landscape is dominated by deeply incised slate-and-quartzite valleys (the Hurdano, Ladrillar, Malvellido and Esperabán), with terraced olive, vine and chestnut on the lower slopes and Mediterranean-Atlantic transition forest above. Hurdano honey is a local speciality; the Pilón meanders are the iconic image of the area. Settlements remain small — the largest village is Nuñomoral with under 800 inhabitants.

Wildlife is a mix of upland and Atlantic-influenced species. Black stork breeds in the cliffs, golden eagle and Bonelli's eagle are present, and Iberian wolf (*Canis lupus signatus*) occasionally crosses from Salamanca [2][3]. Otter, common genet and wild boar are widespread; Spanish ibex was reintroduced and is established in the higher peaks. Birds of the slate cliffs include eagle owl, peregrine, blue rock thrush, black redstart and rock bunting; rivers hold dipper, grey wagtail and kingfisher.

The CC-204 road from Vegas de Coria to Las Mestas is the spine of the comarca. Stop at Pilón de los Huidores, El Gasco (the meteorite-impact site) and the natural pools at El Chorrito. Combine wildlife with cultural visits to traditional villages. Mountain weather and narrow roads — drive carefully.
    `.trim(),
    birds: [
      "Black stork", "Golden eagle", "Bonelli's eagle", "Cinereous vulture", "Griffon vulture",
      "Egyptian vulture", "Eurasian eagle owl", "Peregrine falcon", "Short-toed eagle", "Booted eagle",
      "White-throated dipper", "Common kingfisher", "Grey wagtail", "Blue rock thrush", "Black redstart",
      "Rock bunting", "Crag martin", "Iberian green woodpecker", "Great spotted woodpecker", "Firecrest",
    ],
    bestSeason: "April–June and September–October",
    durationHours: 6,
    tips: "Drive the CC-204 from Vegas de Coria to Las Mestas. Stop at Pilón de los Huidores and El Gasco.",
    website: "",
    sources: [SOURCE.n2k, SOURCE.te, SOURCE.crossbill],
  },

  // ───────────── 25. Madrigalejo & Acedera plains ─────────────
  {
    id: "madrigalejo",
    name: "Llanos de Madrigalejo y Acedera",
    type: "steppe",
    lat: 39.1400, lng: -5.6300,
    summary: "Crane-and-bustard mosaic of cereal, rice and dehesa — one of Extremadura's classic winter birding loops.",
    description: `
The plains around Madrigalejo and Acedera, between the Embalse de Sierra Brava and the Guadiana valley, form one of the classic winter birding circuits in Extremadura. The combination of dryland cereal, irrigated rice, scattered olive groves and small dehesa pockets supports both crane (using rice stubble for daytime feeding) and the full steppe-bird suite. Several pockets are within ZEPAs and the area sits adjacent to the Sierra Brava Ramsar wetland [1][2].

The terrain is a mostly flat sedimentary plain at 250–300 m, drained by the Ruecas and tributaries of the Guadiana. Land use shifts seasonally: in winter, harvested rice stubble holds water and attracts cranes, herons and waders; in spring, dryland cereal turns green and bustards display; in summer, the plain turns golden and quiet. The historical importance of the area extends back to King Ferdinand the Catholic, who died in Madrigalejo in 1516.

Common crane numbers can exceed 50,000 in winter when combined with the Sierra Brava roost; great bustard, little bustard, pin-tailed sandgrouse and black-bellied sandgrouse are present in the dryland sections [2][3]. White stork, glossy ibis, cattle egret, great white egret, marsh harrier and black-shouldered kite use the rice paddies. European roller, lesser kestrel, Montagu's harrier and stone curlew breed. Spanish sparrow forms large autumn flocks.

The classic loop is Madrigalejo → Acedera → Vegas Altas → back via the EX-103. Drive slowly with frequent stops; many tracks branch from the main roads into prime habitat. Combine with a dawn or dusk visit to Sierra Brava reservoir for the crane spectacle.
    `.trim(),
    birds: [
      "Common crane", "Great bustard", "Little bustard", "Pin-tailed sandgrouse", "Black-bellied sandgrouse",
      "White stork", "Glossy ibis", "Cattle egret", "Great white egret", "Marsh harrier",
      "Black-shouldered kite", "Lesser kestrel", "Montagu's harrier", "European roller", "Stone curlew",
      "Calandra lark", "Spanish sparrow", "Iberian grey shrike", "Black-eared wheatear", "Corn bunting",
    ],
    bestSeason: "November–February for cranes; April–May for steppe and waterbirds",
    durationHours: 4,
    tips: "The classic Madrigalejo → Acedera → Vegas Altas loop. Combine with a dawn visit to Sierra Brava reservoir.",
    website: "",
    sources: [SOURCE.seo, SOURCE.ramsar, SOURCE.birdex],
  },

  // ───────────── 26. Embalse de Cíjara ─────────────
  {
    id: "cijara",
    name: "Reserva de Caza Cíjara",
    type: "forest",
    lat: 39.3500, lng: -4.8000,
    summary: "Vast game reserve of Mediterranean forest and reservoir on the eastern edge of Extremadura.",
    description: `
The Reserva de Caza Cíjara covers some 25,000 hectares of Mediterranean forest and reservoir-shore in eastern Badajoz province, where Extremadura meets Castilla-La Mancha. Established as a national hunting reserve in 1966 and now managed for both game and biodiversity, it is part of the wider Cabañeros mountain block — one of the largest contiguous Mediterranean forests in Europe [1][2]. The Embalse de Cíjara reservoir occupies the southern part of the reserve.

Habitat is dominated by mature *monte mediterráneo*: dense holm oak, cork oak, strawberry tree, gum-cistus, kermes oak and broom, with patches of Pyrenean oak in cooler valleys. The Cíjara reservoir is steep-sided and oligotrophic, with limited aquatic vegetation but extensive shoreline. Quartzite ridges rise above the reservoir's south shore, providing cliff habitat. Roads are few; access is restricted to maintain the wildlife reserve.

The reserve is a stronghold of large mammals: red deer (the iconic *berrea* roar in late September), wild boar, roe deer, mouflon, fallow deer, otter and Iberian wildcat [2][3]. Birds of prey are exceptional: cinereous vulture, Spanish imperial eagle, golden eagle, Bonelli's eagle, eagle owl, short-toed eagle, booted eagle and black kite all breed. Black stork uses the reservoir cliffs. Forest passerines include hawfinch, firecrest, crested tit and Iberian green woodpecker.

The CC-100 road through Helechosa de los Montes gives the main access; viewpoints overlook the reservoir from several pull-offs. Late September is unforgettable for the *berrea* (deer rut). Some areas require permits for off-road exploration; the visitor centre at Helechosa has current information.
    `.trim(),
    birds: [
      "Cinereous vulture", "Spanish imperial eagle", "Golden eagle", "Bonelli's eagle", "Black stork",
      "Eurasian eagle owl", "Short-toed eagle", "Booted eagle", "Black kite", "Red kite",
      "Egyptian vulture", "Griffon vulture", "Iberian green woodpecker", "Great spotted woodpecker", "Hawfinch",
      "Firecrest", "Crested tit", "Common chaffinch", "Eurasian nuthatch", "Iberian magpie",
    ],
    bestSeason: "Late September–October for deer rut; March–June for birds",
    durationHours: 5,
    tips: "Late September is unforgettable for the deer rut (la berrea). Helechosa de los Montes visitor centre for permits.",
    website: "",
    sources: [SOURCE.n2k, SOURCE.je, SOURCE.crossbill],
  },

  // ───────────── 27. Sierra de Tentudía ─────────────
  {
    id: "tentudia",
    name: "Sierra de Tentudía",
    type: "mountain",
    lat: 38.0300, lng: -6.3300,
    summary: "Southernmost mountain in Extremadura — chestnut-clad ridge with Atlantic-influenced birds.",
    description: `
Sierra de Tentudía is the highest point in southern Extremadura at 1,104 m, rising at the southern edge of Badajoz province on the border with Andalusia and Sierra Morena. It anchors the comarca of Tentudía and is part of the SEPA "Sierras de Tentudía" Natura 2000 site [1][2]. The medieval monastery on the summit (founded 1248) gives the peak its name and one of the finest panoramic views in the south.

The ridge is granite and slate, mantled in chestnut groves on the cooler northern flank — a southern Iberian outpost of the species — with Pyrenean oak, holm oak and dehesa on the southern aspects. Streams run year-round, supporting alder and willow gallery forest. Lower slopes are grazed and dotted with the white villages of the Tentudía comarca; meadows in spring are exceptionally rich in orchids.

The chestnut-Pyrenean oak woods hold an unusual concentration of forest passerines for southern Spain: firecrest, Eurasian nuthatch, short-toed treecreeper, common chaffinch, hawfinch, great spotted woodpecker and Iberian green woodpecker [2][3]. The cliffs and ridges hold golden eagle, Bonelli's eagle, peregrine, eagle owl and griffon vulture. Black stork breeds in the gorges. Otter, badger, common genet and wildcat are present. Iberian lynx is reintroduced in nearby Sierra Morena and could expand into Tentudía.

The road climbs to the monastery summit and gives a 360° viewpoint. The PR-BA-101 trail (8 km) circles the highest peaks through chestnut groves. Combine with a visit to the medieval monastery and the *jamón*-producing villages of Monesterio and Calera de León.
    `.trim(),
    birds: [
      "Golden eagle", "Bonelli's eagle", "Cinereous vulture", "Griffon vulture", "Black stork",
      "Eurasian eagle owl", "Peregrine falcon", "Booted eagle", "Short-toed eagle", "Hawfinch",
      "Firecrest", "Eurasian nuthatch", "Short-toed treecreeper", "Crested tit", "Common chaffinch",
      "Iberian green woodpecker", "Great spotted woodpecker", "Cirl bunting", "Common nightingale", "Iberian magpie",
    ],
    bestSeason: "April–June and October for autumn colour",
    durationHours: 4,
    tips: "Drive to the monastery summit for panoramic views. The PR-BA-101 trail circles the chestnut groves.",
    website: "",
    sources: [SOURCE.n2k, SOURCE.te, SOURCE.crossbill],
  },

  // ───────────── 28. Valle del Ambroz ─────────────
  {
    id: "ambroz",
    name: "Valle del Ambroz / Hervás",
    type: "mountain",
    lat: 40.2700, lng: -5.8500,
    summary: "Northern valley of chestnut woods around the village of Hervás, famous for autumn colour and Jewish heritage.",
    description: `
The Valle del Ambroz lies in the far north of Cáceres province, between the Sierra de Béjar and the Sierra de Gredos. The valley centres on the village of Hervás, whose Jewish quarter is one of the best-preserved in Spain. The surrounding chestnut woods reach 1,000+ m on the slopes of the Sierra de Tras la Sierra and form one of the largest Atlantic-influenced forests in Extremadura [1][2]. The annual *Otoño Mágico* festival celebrates the autumn colour and chestnut harvest.

Habitat is dominated by mature chestnut wood (*castañar*) on north-facing slopes, with Pyrenean oak (*roble melojo*) at higher elevations and holm oak on warmer aspects. Heath and broom cover summit ridges. Streams (the Ambroz, Garganta de Honduras) run year-round and support alder and willow gallery. The valley is a real biogeographic boundary — Atlantic-influenced rainfall combines with Mediterranean exposure to produce unusual habitat mixing.

The forest holds a rich passerine community: firecrest, common chaffinch, Eurasian nuthatch, short-toed treecreeper, hawfinch, common chiffchaff, common cuckoo, golden oriole, great spotted woodpecker, and middle spotted woodpecker (rare here) [2][3]. Black stork breeds in the deeper gorges; cinereous vulture, golden eagle and Bonelli's eagle hunt over the valley. Otter is widespread. The high meadows hold rufous-tailed scrub robin, water pipit and rock thrush.

Base in Hervás. The Garganta de Honduras (a 10-km canyon with natural pools) is the classic walk. The Ruta de los Castañares de Hervás (PR-CC-22) is unforgettable in October when the chestnut foliage turns gold. Combine with the Jewish quarter walking tour.
    `.trim(),
    birds: [
      "Cinereous vulture", "Griffon vulture", "Golden eagle", "Bonelli's eagle", "Black stork",
      "Short-toed eagle", "Booted eagle", "Eurasian eagle owl", "Common cuckoo", "Iberian green woodpecker",
      "Great spotted woodpecker", "Middle spotted woodpecker", "Firecrest", "Goldcrest", "Eurasian nuthatch",
      "Short-toed treecreeper", "Hawfinch", "Common chaffinch", "Crested tit", "Coal tit",
    ],
    bestSeason: "October for autumn colour; April–June for breeding birds",
    durationHours: 5,
    tips: "Base in Hervás. The Garganta de Honduras canyon is the classic walk. October is the chestnut-colour highlight.",
    website: "https://www.turismohervas.com/",
    sources: [SOURCE.n2k, SOURCE.te, SOURCE.crossbill],
  },

  // ───────────── 29. Coria ─────────────
  {
    id: "coria",
    name: "Coria & río Alagón",
    type: "town",
    lat: 39.9890, lng: -6.5400,
    summary: "Walled medieval town on the Alagón river, with white storks on the cathedral and otters in the gallery forest.",
    description: `
Coria (Roman *Caurium*) is a walled hill town above the river Alagón in north-western Cáceres province. Its 4th-century Roman walls — among the best-preserved in Spain — and the late-Gothic cathedral define the urban skyline [1][2]. The Alagón loops below the walls, providing rich riparian habitat at the foot of the town. Coria is the gateway between the Sierra de Gata and the Llanos del Alagón.

The Alagón here flows broad and slow, fringed with willow, alder, ash and tamarisk gallery forest, with reedbed pockets and gravel bars. Above the town, the cereal-pastoral plain extends to the foot of the Sierra de Gata; below the town, irrigated agriculture (tobacco and red pepper for *pimentón*) dominates the floodplain. The Roman walls and cathedral provide vertical structure for cavity-nesting birds.

The cathedral and surrounding belfries hold a strong white stork colony (15+ pairs) and lesser kestrel breeding (small numbers, recovering); pallid swift, common swift and crag martin are abundant in summer [2][3]. The Alagón gallery forest holds otter (regularly recorded), common kingfisher, grey wagtail, common nightingale, great reed warbler, golden oriole and Iberian magpie. Bluethroat winters in the riparian thickets. The surrounding plain has black-shouldered kite, Montagu's harrier and roller in season.

Walk the Roman wall circuit, then descend to the Alagón footbridge for the gallery-forest birds. The Wednesday market in the Plaza de la Cava is a cultural extra. Combine Coria with trips into the Sierra de Gata and to the Embalse del Borbollón just to the north-west.
    `.trim(),
    birds: [
      "White stork", "Lesser kestrel", "Common kestrel", "Pallid swift", "Common swift",
      "Crag martin", "Common kingfisher", "Grey wagtail", "Cetti's warbler", "Great reed warbler",
      "Common nightingale", "Golden oriole", "Bluethroat", "Iberian magpie", "Spotless starling",
      "Black-shouldered kite", "Montagu's harrier", "European roller", "Hoopoe", "Black redstart",
    ],
    bestSeason: "April–June",
    durationHours: 3,
    tips: "Walk the Roman wall circuit, then drop to the Alagón footbridge for otters and kingfishers.",
    website: "https://www.turismodecoria.es/",
    sources: [SOURCE.te, SOURCE.seo, SOURCE.n2k],
  },

  // ───────────── 30. Embalse de Valdecañas ─────────────
  {
    id: "valdecanas",
    name: "Embalse de Valdecañas",
    type: "wetland",
    lat: 39.7700, lng: -5.4500,
    summary: "Large reservoir on the Tajo east of Monfragüe, with extensive coves and steppe surrounds.",
    description: `
The Embalse de Valdecañas dams the Tajo (Tagus) river east of Monfragüe National Park, creating a 7,300-hectare reservoir at full capacity — one of the largest in Extremadura. It was built between 1957 and 1964 for hydroelectric generation. While not a designated nature reserve, large parts of its shoreline lie within the Monfragüe Biosphere Reserve buffer zone and are excellent for waterbirds and surrounding-steppe species [1][2].

The reservoir is steep-sided in its main body but has a heavily braided upstream end with shallow flats, islands and inundated valleys. Surrounding land is dehesa transitioning to cereal-fallow steppe; quartzite hills rise to the south. The Tajo arm reaches into the heart of Monfragüe, while the Tiétar arm extends north toward the Sierra de Gredos foothills.

In winter, Valdecañas holds large numbers of common crane (3,000–5,000), greylag goose, gadwall, common pochard, tufted duck and great cormorant [2][3]. Greater flamingo is regular in small flocks. Black stork uses the reservoir for foraging and nests in nearby cliffs. Western osprey passes on migration. Surrounding dehesa holds black vulture, Spanish imperial eagle, golden eagle and short-toed eagle. The cereal steppe near El Gordo and Berrocalejo holds great bustard, little bustard and pin-tailed sandgrouse.

Several pull-offs along the EX-119 from El Gordo to Almaraz provide reservoir views. The dam itself is closed to vehicles but a viewpoint above gives panoramic perspective. Combine with Monfragüe (immediately west) and the steppes around Berrocalejo and El Gordo for a varied day.
    `.trim(),
    birds: [
      "Common crane", "Greylag goose", "Greater flamingo", "Gadwall", "Common pochard",
      "Tufted duck", "Great cormorant", "Black stork", "White stork", "Western osprey",
      "Marsh harrier", "Black vulture", "Spanish imperial eagle", "Golden eagle", "Short-toed eagle",
      "Great bustard", "Little bustard", "Pin-tailed sandgrouse", "European roller", "Calandra lark",
    ],
    bestSeason: "November–February for waterbirds; April–May for surrounding steppe",
    durationHours: 3,
    tips: "Pull-offs along EX-119 from El Gordo to Almaraz give reservoir views. Combine with Monfragüe and Berrocalejo steppe.",
    website: "",
    sources: [SOURCE.n2k, SOURCE.ebird, SOURCE.birdex],
  },

  // ───────────── 31. Embalse de Gabriel y Galán ─────────────
  {
    id: "gabriel-galan",
    name: "Embalse de Gabriel y Galán",
    type: "wetland",
    lat: 40.2300, lng: -6.1300,
    summary: "Large mountain-edge reservoir north of Plasencia — wintering waterfowl and dehesa raptors.",
    description: `
The Embalse de Gabriel y Galán is a 4,600-hectare reservoir on the river Alagón, completed in 1961 between the Sierra de Béjar and the Plasencia plain. Named after the Salamantine poet José María Gabriel y Galán, it is one of the largest still-water bodies in northern Extremadura. The surrounding land lies within the Natura 2000 SCI "Riberas del río Alagón" and the wider biosphere area [1][2].

Habitat ranges from the open water of the reservoir to extensive dehesa on the south shore, oak-pine transition forest on the north shore, and rocky promontories where the dam was cut. The water level fluctuates significantly between winter (high) and late summer (low), exposing extensive shorelines. Granite *berrocales* and small Atlantic-influenced gallery forest enrich the habitat mosaic.

Wintering waterfowl include common pochard, tufted duck, gadwall, common shelduck, Eurasian wigeon, common goldeneye (rare), great cormorant and black-necked grebe [2][3]. Greater flamingo and common crane are regular. Black stork breeds in nearby cliffs and uses the reservoir; Spanish imperial eagle, golden eagle, short-toed eagle and booted eagle hunt the dehesa. The forested north shore holds woodland passerines including hawfinch, firecrest and golden oriole.

The dam viewpoint near Granadilla is the easiest access point. The medieval village of Granadilla — abandoned in the 1960s and now a heritage restoration project — sits on a peninsula and is itself worth visiting. Several pull-offs along the EX-205 give shore views. Combine with the Sierra de Gata or the Valle del Ambroz to the north.
    `.trim(),
    birds: [
      "Common pochard", "Tufted duck", "Gadwall", "Common shelduck", "Eurasian wigeon",
      "Black-necked grebe", "Great cormorant", "Greater flamingo", "Common crane", "Black stork",
      "Spanish imperial eagle", "Golden eagle", "Booted eagle", "Short-toed eagle", "Black vulture",
      "Hawfinch", "Firecrest", "Common chaffinch", "Iberian green woodpecker", "Golden oriole",
    ],
    bestSeason: "November–February for waterfowl; April–June for raptors",
    durationHours: 3,
    tips: "Visit the medieval ghost-village of Granadilla on its peninsula — heritage and birding combined.",
    website: "",
    sources: [SOURCE.n2k, SOURCE.te, SOURCE.crossbill],
  },

  // ───────────── 32. Río Almonte ─────────────
  {
    id: "rio-almonte",
    name: "Río Almonte",
    type: "river",
    lat: 39.6500, lng: -6.0000,
    summary: "Wild Mediterranean river flowing into the Tajo at Monfragüe — gallery forest, otters and dippers.",
    description: `
The río Almonte is one of the few unregulated tributaries of the Tajo in central Spain — a Mediterranean river of episodic floods and dry summers, flowing east-to-west across central Cáceres province before joining the Tajo within Monfragüe National Park. The Almonte is a Natura 2000 SCI ("Río Almonte") and a designated Fluvial Habitat of Community Interest under the Habitats Directive [1][2]. Its lower reaches form one of the most pristine river corridors in inland Iberia.

The Almonte cuts through schist and slate, alternating between deep pools (*charcos*) and rocky riffles. Gallery forest is well preserved: black alder, willow, ash, narrow-leaved oak and Pyrenean oak in the wetter sections, with tamarisk and oleander where the river broadens. The seasonality of flow concentrates wildlife in the permanent pools during the dry summer months — these become important refugia.

The Almonte holds one of the densest otter populations in southern Spain. Iberian water frog and Iberian newt inhabit the pools, with European pond turtle and Spanish terrapin in the slower reaches. Bird-wise, the Almonte gallery forest holds common kingfisher (very common), grey wagtail, white-throated dipper (in rocky stretches), Cetti's warbler, common nightingale, golden oriole, Iberian green woodpecker and great spotted woodpecker [2][3]. Above, black stork forages from Monfragüe and griffon vulture rides the thermals.

Access is best at Monroy, Cañaveral, and at the Almonte's confluence with the Tajo within Monfragüe (visible from the EX-208 viewpoints). The PR-CC-115 follows a stretch above Monroy. Best in late spring or autumn when flows are moderate; do not enter pools during the breeding season for amphibians.
    `.trim(),
    birds: [
      "Common kingfisher", "Grey wagtail", "White-throated dipper", "Cetti's warbler", "Common nightingale",
      "Golden oriole", "Iberian green woodpecker", "Great spotted woodpecker", "Black stork", "Griffon vulture",
      "Cinereous vulture", "Bonelli's eagle", "Booted eagle", "Crag martin", "Reed warbler",
      "Spotted flycatcher", "European bee-eater", "Hoopoe", "Iberian magpie", "Hawfinch",
    ],
    bestSeason: "April–June and September–October",
    durationHours: 3,
    tips: "Best access from Monroy or at the EX-208 viewpoints over the Almonte–Tajo confluence within Monfragüe.",
    website: "",
    sources: [SOURCE.n2k, SOURCE.je, SOURCE.crossbill],
  },

  // ───────────── 33. Llanos de Belén ─────────────
  {
    id: "belen",
    name: "Llanos de Belén (Trujillo plains)",
    type: "steppe",
    lat: 39.4250, lng: -5.8000,
    summary: "Open cereal plain south of Trujillo — accessible bustard country with classic roadside birding.",
    description: `
The Llanos de Belén are the gentle open plains immediately south of Trujillo, named after the small village of Belén that sits in their middle. They form part of the wider Trujillo-La Cumbre ZEPA and are perhaps the most easily accessible bustard country in Extremadura: the minor road from Trujillo to Belén crosses prime habitat with safe pull-offs and frequent excellent views [1][2]. Most birding tour groups stop here.

The terrain is gently undulating granite-and-slate plain at 400–500 m, with little tree cover and an open horizon broken only by occasional dehesa pockets and the Belén church tower. Land use is traditional: dryland cereal in long-rotation with grazed fallow and sheep stubble. Stone walls and small *berrocales* break the openness and provide perches. The Almonte river forms a wooded gallery to the south.

The Llanos de Belén reliably hold great bustard (groups of 20–60 are typical in spring), little bustard, pin-tailed sandgrouse, stone curlew, lesser kestrel, Montagu's harrier, black-shouldered kite, European roller (nesting in pylons), great spotted cuckoo, calandra lark and Iberian grey shrike [2][3]. In winter, common crane is regular and the area attracts hen harrier. The dehesa pockets add booted eagle, short-toed eagle and black kite.

The classic loop is to leave Trujillo on the CC-99 toward Belén, drive slowly to the village, then continue to La Cumbre and return on the back roads. Stay in the car and use it as a hide. Mornings and evenings are best; in summer, midday is too hot and quiet.
    `.trim(),
    birds: [
      "Great bustard", "Little bustard", "Pin-tailed sandgrouse", "Stone curlew", "Lesser kestrel",
      "Montagu's harrier", "Black-shouldered kite", "Hen harrier", "Common kestrel", "European roller",
      "Great spotted cuckoo", "Calandra lark", "Greater short-toed lark", "Iberian grey shrike", "Black-eared wheatear",
      "Spectacled warbler", "Common quail", "Common crane", "Booted eagle", "Short-toed eagle",
    ],
    bestSeason: "March–June; December–February for winter visitors",
    durationHours: 3,
    tips: "Drive the CC-99 from Trujillo to Belén slowly. Stay in the car — it's the best hide.",
    website: "",
    sources: [SOURCE.seo, SOURCE.n2k, SOURCE.birdex],
  },

  // ───────────── 34. La Vera ─────────────
  {
    id: "la-vera",
    name: "La Vera (Garganta de Cuartos)",
    type: "river",
    lat: 40.0500, lng: -5.5500,
    summary: "North-Cáceres comarca of granite gorges and natural pools, with waterfall hikes and rich riparian forest.",
    description: `
La Vera is a comarca of 19 villages strung along the southern foothills of the Sierra de Gredos, from Jarandilla de la Vera to Madrigal de la Vera. It occupies the steep transition between the high mountain (over 2,500 m) and the Tiétar plain, and is famed for its *gargantas* (gorge-and-waterfall systems) and for the production of *pimentón de la Vera* (smoked paprika). Most of the area is within the Sierra de Gredos and the Tiétar Natura 2000 SCIs [1][2].

Each village has its own *garganta* — a granite-bedded mountain stream descending in a series of pools and waterfalls. The Garganta de Cuartos near Losar de la Vera is among the most accessible and dramatic, with natural pools (*Las Pilas*) and a chestnut-and-alder gallery forest. Lower slopes are clothed in chestnut groves and tobacco terraces; higher up, Pyrenean oak gives way to alpine meadow and granite *berrocales*.

The gorges and rivers hold one of Iberia's strongest populations of white-throated dipper, plus common kingfisher, grey wagtail, otter, and water shrew [2][3]. The chestnut-oak forests support a rich passerine community: firecrest, common chaffinch, Eurasian nuthatch, short-toed treecreeper, hawfinch, golden oriole, Iberian green woodpecker, common cuckoo and great spotted woodpecker. Above, black stork, golden eagle, Bonelli's eagle and griffon vulture circle.

Base in Jarandilla, Cuacos de Yuste (where Carlos V retired in 1556) or Losar. The Garganta de Cuartos is a short, easy walk from Losar. The Camino del Emperador (a 28-km route Carlos V took to Yuste) is the long-form option. Combine with cultural visits to Yuste monastery.
    `.trim(),
    birds: [
      "White-throated dipper", "Common kingfisher", "Grey wagtail", "Black stork", "Golden eagle",
      "Bonelli's eagle", "Griffon vulture", "Cinereous vulture", "Short-toed eagle", "Booted eagle",
      "Common cuckoo", "Iberian green woodpecker", "Great spotted woodpecker", "Firecrest", "Goldcrest",
      "Eurasian nuthatch", "Short-toed treecreeper", "Hawfinch", "Common chaffinch", "Golden oriole",
    ],
    bestSeason: "April–June and September–October",
    durationHours: 5,
    tips: "Walk the Garganta de Cuartos near Losar de la Vera. Combine with Yuste monastery and a tasting of pimentón de la Vera.",
    website: "https://www.comarcadelavera.com/",
    sources: [SOURCE.n2k, SOURCE.te, SOURCE.crossbill],
  },

  // ───────────── 35. Garrovillas de Alconétar ─────────────
  {
    id: "garrovillas",
    name: "Garrovillas de Alconétar & Roman bridge",
    type: "river",
    lat: 39.6900, lng: -6.5500,
    summary: "Historic village above the Tajo, near a partially submerged Roman bridge — riparian birding with cultural heritage.",
    description: `
Garrovillas de Alconétar is a small town with one of the most beautiful Plaza Mayor squares in Extremadura — a porticoed Renaissance square at 350 m above the Tajo valley. A few kilometres downhill, the Roman bridge of Alconétar (1st century AD) stands partially submerged in the Embalse de Alcántara reservoir, a haunting sight when water levels are low [1][2]. The surrounding area combines reservoir, dehesa and small steppe pockets, with the Sierra de San Pedro on the southern horizon.

The Tajo here is dammed by the Embalse de Alcántara; the upstream reach near Garrovillas is wide and open with extensive shorelines and several small islands. Surrounding land is dehesa with cork and holm oak, transitioning to cereal-pasture steppe to the north. Quartzite outcrops add cliff habitat. The Plaza Mayor of Garrovillas is itself a roosting site for several urban species.

White stork nests crown most belfries in Garrovillas; pallid swift, common swift and crag martin colonies are abundant in summer [2][3]. The reservoir holds wintering common crane, gadwall, common pochard, great cormorant and great crested grebe. Black stork, Egyptian vulture and Spanish imperial eagle hunt over the dehesa from the Sierra de San Pedro. The Roman bridge area is excellent for hawfinch, golden oriole, great reed warbler and common kingfisher in season.

Park in the Plaza Mayor and walk down the signposted path to the Roman bridge viewpoint (1.5 km, descending). The reservoir shoreline can be explored from the EX-117 between Garrovillas and Brozas. Combine with the Llanos de Brozas-Alcántara steppe immediately to the west.
    `.trim(),
    birds: [
      "White stork", "Black stork", "Common crane", "Gadwall", "Common pochard",
      "Great cormorant", "Great crested grebe", "Egyptian vulture", "Spanish imperial eagle", "Black vulture",
      "Pallid swift", "Common swift", "Crag martin", "Common kingfisher", "Great reed warbler",
      "Cetti's warbler", "Hawfinch", "Golden oriole", "Common nightingale", "Iberian magpie",
    ],
    bestSeason: "April–June; November–February for cranes",
    durationHours: 3,
    tips: "Walk down to the partially submerged Roman bridge — best in late summer when water is low.",
    website: "",
    sources: [SOURCE.te, SOURCE.n2k, SOURCE.crossbill],
  },

  // ───────────── 36. Embalse de Zújar ─────────────
  {
    id: "zujar",
    name: "Embalse del Zújar",
    type: "wetland",
    lat: 38.9000, lng: -5.3700,
    summary: "Large southern reservoir bordering La Serena steppe — flamingos, cranes and exceptional steppe birds.",
    description: `
The Embalse del Zújar is a 4,400-hectare reservoir on the river Zújar, completed in 1964 on the southern edge of the La Serena steppe. The dam stands close to the cliffs of the Sierra del Tiros, while the reservoir's western arm reaches deep into the open *baldío*. The combination of large lake and the immense surrounding steppe makes Zújar one of the richest combined sites in inland Spain — a Ramsar Site of considerable importance [1][2].

Habitat is open water and steep dam-end shoreline transitioning at the upstream end to shallow flats and inundated meadows. Surrounding land is the vast La Serena pseudo-steppe — short-grazed sward with quartzite *crestones* and stone walls. The Sierra del Tiros rises to 750 m on the south side, providing cliff habitat. The site is a true ecotone where waterbirds and steppe birds occur side by side.

Greater flamingo is regular in flocks of hundreds; common crane winters in tens of thousands [2][3]. Greylag goose, gadwall, common pochard, tufted duck and great cormorant use the open water; black stork breeds in the cliffs. The surrounding steppe holds great bustard, little bustard, pin-tailed sandgrouse, black-bellied sandgrouse, stone curlew, lesser kestrel and Montagu's harrier. Egyptian vulture, Bonelli's eagle and eagle owl breed on the Sierra del Tiros cliffs. In passage, collared pratincole occurs.

The dam viewpoint near Castuera gives a wide perspective. The road from Castuera to Cabeza del Buey skirts the southern shore and crosses prime steppe — drive slowly. Combine with La Serena (immediately surrounding) and Sierra Grande de Hornachos to the west for a full southern Extremadura birding day.
    `.trim(),
    birds: [
      "Greater flamingo", "Common crane", "Greylag goose", "Gadwall", "Common pochard",
      "Tufted duck", "Great cormorant", "Black stork", "White stork", "Egyptian vulture",
      "Bonelli's eagle", "Great bustard", "Little bustard", "Pin-tailed sandgrouse", "Black-bellied sandgrouse",
      "Stone curlew", "Lesser kestrel", "Montagu's harrier", "Collared pratincole", "Calandra lark",
    ],
    bestSeason: "November–February for waterbirds; April–June for steppe",
    durationHours: 4,
    tips: "Combine the dam viewpoint with the Castuera–Cabeza del Buey road for steppe birds. Scope essential.",
    website: "",
    sources: [SOURCE.ramsar, SOURCE.n2k, SOURCE.seo],
  },

  // ───────────── 37. Castuera plains ─────────────
  {
    id: "castuera",
    name: "Llanos de Castuera",
    type: "steppe",
    lat: 38.7200, lng: -5.5400,
    summary: "Heartland of La Serena pseudo-steppe — the highest sandgrouse densities in Iberia.",
    description: `
The Llanos de Castuera form the central core of the La Serena pseudo-steppe, around the town of Castuera in southern Badajoz province. While the broader La Serena ZEPA is enormous, the area immediately around Castuera concentrates the highest densities of sandgrouse, bustards and other steppe specialists, and is the area most-frequented by birding visitors. It is a Special Protection Area within the wider Natura 2000 La Serena complex [1][2].

Land use is the traditional *baldío* of communally grazed common — short, drought-grazed sward with no fences and few trees. Cereal cultivation gives way to pure grazing; quartzite outcrops dot the plain. Spring transforms the *retama* (broom) into golden flowering bursts. Castuera itself is famous for *turrón* (a regional almond confection) and is a useful base, with adequate accommodation and food.

The Llanos de Castuera hold what is currently considered the highest density of pin-tailed sandgrouse anywhere in Western Europe [2][3]. Black-bellied sandgrouse is similarly abundant. Great bustard, little bustard, stone curlew, calandra lark, lesser kestrel, Montagu's harrier, European roller and black-shouldered kite breed. In winter, common crane and merlin pass through; collared pratincole on passage. The dehesa fringes hold black vulture and Spanish imperial eagle.

The road from Castuera north toward Quintana de la Serena is the classic transect; the road south toward Esparragosa de la Serena gives an alternative. Drive at dawn or in the last two hours of light. There are no facilities once you leave Castuera — bring water, sun protection, and a full tank.
    `.trim(),
    birds: [
      "Pin-tailed sandgrouse", "Black-bellied sandgrouse", "Great bustard", "Little bustard", "Stone curlew",
      "European roller", "Lesser kestrel", "Montagu's harrier", "Black-shouldered kite", "Black vulture",
      "Spanish imperial eagle", "Calandra lark", "Greater short-toed lark", "Tawny pipit", "Spectacled warbler",
      "Black-eared wheatear", "Iberian grey shrike", "Common quail", "Corn bunting", "Collared pratincole",
    ],
    bestSeason: "April–June",
    durationHours: 4,
    tips: "Drive Castuera → Quintana de la Serena at dawn. Stop at every rise. No services on the plains — bring supplies.",
    website: "",
    sources: [SOURCE.seo, SOURCE.n2k, SOURCE.crossbill],
  },

  // ───────────── 38. Romangordo ─────────────
  {
    id: "romangordo",
    name: "Romangordo & río Tajo otters",
    type: "river",
    lat: 39.8100, lng: -5.7000,
    summary: "Tiny mural village above the Tajo, with one of the best otter-watching spots in Extremadura.",
    description: `
Romangordo is a village of fewer than 250 inhabitants set on a hillside above the río Tajo, immediately east of Monfragüe National Park. Famous for its trompe-l'œil murals (the village walls are painted with hyperrealist trompe-l'œil scenes), it is also home to one of the best-known otter-watching hides in Spain — *El Hide del Brillante* — operated by the village to fund conservation work [1][2].

The Tajo here flows broad and calm through a dehesa-and-cliff landscape just outside Monfragüe's protected boundary. The village otter hide is a small wooden viewing structure on the riverbank, with a feeding station that draws an established pair of Eurasian otters reliably to within a few metres of the windows. The riparian forest above and below the hide is mature: alder, willow, ash and oak, with reedbed and mudflat patches.

Otter sightings at the Hide del Brillante are extremely reliable — typically multiple visits per evening — making this one of the most accessible otter-watching sites in Iberia [2][3]. Common kingfisher uses the same stretch and is constant; grey wagtail, white-throated dipper (rare here), Cetti's warbler, common nightingale, golden oriole and great spotted woodpecker breed in the gallery forest. Above, black stork, griffon vulture, cinereous vulture and Spanish imperial eagle drift down from Monfragüe.

The hide must be booked through the Romangordo town hall (small fee). Sessions are typically 17:00–20:00 and 20:00–22:00. Combine with a walk through the village to see the murals, and with a daytime visit to Monfragüe (15 km west). Quiet, low-light photography from the hide is exceptional.
    `.trim(),
    birds: [
      "Common kingfisher", "Grey wagtail", "Cetti's warbler", "Common nightingale", "Golden oriole",
      "Great spotted woodpecker", "Iberian green woodpecker", "Black stork", "White stork", "Cinereous vulture",
      "Griffon vulture", "Egyptian vulture", "Spanish imperial eagle", "Bonelli's eagle", "Booted eagle",
      "Crag martin", "Sand martin", "Spotted flycatcher", "Reed warbler", "Iberian magpie",
    ],
    bestSeason: "March–October (otter hide); evenings only",
    durationHours: 3,
    tips: "Book the Hide del Brillante through Romangordo town hall in advance. Evening sessions only.",
    website: "https://romangordo.es/",
    sources: [SOURCE.te, SOURCE.je, SOURCE.crossbill],
  },

  // ───────────── 39. Steppes of Magasca ─────────────
  {
    id: "magasca",
    name: "Llanos de Magasca y Santa Marta",
    type: "steppe",
    lat: 39.4500, lng: -6.1000,
    summary: "Quiet back-roads steppe between Cáceres and Trujillo — bustards, sandgrouse, and stone-walled Iberian landscape.",
    description: `
The Llanos de Magasca y Santa Marta cover roughly 15,000 hectares of open cereal-fallow steppe between Cáceres city and Trujillo, drained by the Magasca river. Forming the eastern part of the Llanos de Cáceres ZEPA, the area is a quintessential traditional Iberian *campiña* — hand-built dry-stone walls, low whitewashed *casillas*, scattered holm oak, and an undisturbed quiet [1][2]. Most birding tour groups pass through on the Cáceres–Trujillo route.

The terrain is gently undulating granite plain at 400–500 m, with the Magasca river cutting a shallow valley with alder and willow gallery. Land tenure is mostly large estates (*fincas*); the road from Santa Marta de Magasca to Monroy is the main public transect. *Berrocales* (granite outcrops) dot the plain and provide nesting sites for stone curlew, little owl and rock sparrow.

The steppe holds the full Llanos de Cáceres suite: great bustard (display groups in spring), little bustard, pin-tailed sandgrouse, black-bellied sandgrouse, stone curlew, lesser kestrel, Montagu's harrier and black-shouldered kite [2][3]. European roller breeds in pylons. Calandra lark song dominates April mornings. The Magasca gallery forest holds golden oriole, common nightingale, great reed warbler and common kingfisher. Hen harrier winters.

Drive the Santa Marta de Magasca → Monroy back road at dawn or dusk. Stop at every rise. The Magasca river crossing has shaded pull-offs with riparian birding. The route can be combined with the Llanos de Belén (Trujillo) and the Llanos de Talaván for a full steppe day.
    `.trim(),
    birds: [
      "Great bustard", "Little bustard", "Pin-tailed sandgrouse", "Black-bellied sandgrouse", "Stone curlew",
      "Lesser kestrel", "Common kestrel", "Montagu's harrier", "Hen harrier", "Black-shouldered kite",
      "European roller", "Calandra lark", "Greater short-toed lark", "Iberian grey shrike", "Black-eared wheatear",
      "Spectacled warbler", "Common quail", "Rock sparrow", "Little owl", "Common kingfisher",
    ],
    bestSeason: "March–May; December for hen harrier",
    durationHours: 3,
    tips: "Drive Santa Marta de Magasca → Monroy at dawn. The Magasca river crossing offers shaded riparian birding.",
    website: "",
    sources: [SOURCE.seo, SOURCE.n2k, SOURCE.birdex],
  },

  // ───────────── 40. Tajo-Salor-Almonte ZEPA ─────────────
  {
    id: "tajo-salor-almonte",
    name: "Tajo-Salor-Almonte (ZEPA)",
    type: "steppe",
    lat: 39.5500, lng: -6.4500,
    summary: "Vast composite ZEPA south of Cáceres — dehesa, river canyons and steppe combined in one landscape.",
    description: `
The Tajo-Salor-Almonte ZEPA is one of the largest single SPAs in Spain, covering 119,000 hectares of dehesa, cereal steppe and river canyon between the Tajo (north), the Salor (centre) and the Almonte (south). It bridges the Llanos de Cáceres steppe to the south of Cáceres city with the Sierra de San Pedro and Tajo Internacional canyons further west [1][2]. The diversity within the ZEPA is exceptional — almost the full Extremaduran landscape gradient in one site.

The northern part is dominated by the Tajo canyon (cliff-and-river habitat), the central part by the Salor river valley with mature riparian forest, and the southern flank by extensive cereal-fallow steppe and dehesa. *Berrocales* of granite dot the plains; the Almonte river forms a wild gallery in the south. The Roman city of Cáparra and the medieval towers of Mantible add cultural depth.

The ZEPA holds the densest concentrations of black stork in Spain (40+ pairs along the Tajo and Salor cliffs), plus Spanish imperial eagle, cinereous vulture, griffon vulture, Egyptian vulture, golden eagle, Bonelli's eagle and eagle owl on the cliff systems [2][3]. The steppe sections support great bustard, little bustard, pin-tailed and black-bellied sandgrouse, stone curlew, lesser kestrel and Montagu's harrier. The dehesa holds cinereous vulture roosts and black-shouldered kite.

Public access is mainly from the EX-208 between Cáceres and Monfragüe, and the back roads south of Cáceres toward Aliseda and Salorino. Several miradores along the Salor and Tajo offer cliff views. A full day with a scope is the minimum to do the area justice; with two days you can sample steppe, dehesa and cliff in turn.
    `.trim(),
    birds: [
      "Black stork", "Spanish imperial eagle", "Cinereous vulture", "Griffon vulture", "Egyptian vulture",
      "Golden eagle", "Bonelli's eagle", "Eurasian eagle owl", "Great bustard", "Little bustard",
      "Pin-tailed sandgrouse", "Black-bellied sandgrouse", "Stone curlew", "Lesser kestrel", "Montagu's harrier",
      "Black-shouldered kite", "European roller", "Calandra lark", "Iberian grey shrike", "Black-eared wheatear",
    ],
    bestSeason: "March–June",
    durationHours: 7,
    tips: "Combine the EX-208 (cliff section) with back roads south of Cáceres (steppe). Two days does justice; one is rushed.",
    website: "",
    sources: [SOURCE.seo, SOURCE.n2k, SOURCE.birdex],
  },
];

// Haversine distance in km
function distanceKm(a, b) {
  const R = 6371;
  const toRad = (d) => (d * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const h = Math.sin(dLat / 2) ** 2 + Math.sin(dLng / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);
  return Math.round(2 * R * Math.asin(Math.sqrt(h)));
}

// Annotate each site with computed fields
SITES.forEach((s) => {
  s.distanceKm = distanceKm(BASE, s);
});
