/* ════════════════════════════════════════════════════════════════
   DATA.JS — Single source of truth for Solutions case studies plus
   the pure-function data utilities shared by every section.

   Unlike the original vanilla build, ISSUES is NOT a module-level
   mutable array here — issue data now lives in React state (see
   src/context/AppContext.jsx) so React can re-render when it
   changes. Everything in this file is either static reference data
   (SOLUTIONS, IMPACT_TEMPLATES, IMPACT_DAY_NARRATIVE) or a pure
   function that takes data in and returns data out — this is the
   seam where a real backend/API would plug in later.
   ════════════════════════════════════════════════════════════════ */

/* ─────────────────────────────────────────────────────────────────
   SOLUTIONS — proven real-world case studies, NOT complaints.
   Tabs: government | community | technology | ngo | international
   (a case study can belong to more than one tab)
   problemCat ties each case study to exactly one Issues category so
   the Solutions tab can be filtered strictly by category, the same
   way the Issues category bar works.
   ───────────────────────────────────────────────────────────────── */
export const SOLUTIONS = [
  /* ── WASTE ── */
  {
    id: 's1', problemCat: 'waste', flag: '🇯🇵', place: 'Japan',
    tabs: ['government', 'community', 'international'],
    problem: 'Household waste overload & low recycling rates',
    solution: 'Mandatory multi-stream waste segregation (up to 10+ categories) with strict municipal collection schedules',
    actions: 'City governments enforce labeled bins, fine non-compliant households, and run mandatory citizen education sessions for new residents.',
    tech: 'Color-coded bin systems, neighborhood collection-day calendars, incineration with energy recovery',
    successRate: 92, cost: '$1.2B/yr (national)', before: 'Recycling rate ~15% in the 1980s', after: 'Recycling rate 85%+ in leading municipalities like Kamikatsu',
    adaptable: true,
    adaptNote: 'Highly adaptable — needs strong municipal enforcement + a public education campaign, no major infrastructure investment required to start.'
  },
  {
    id: 's2', problemCat: 'waste', flag: '🇸🇪', place: 'Sweden',
    tabs: ['government', 'technology', 'international'],
    problem: 'Landfill overflow and energy demand',
    solution: 'Waste-to-energy incineration plants combined with a near-zero-landfill circular economy',
    actions: 'National government banned landfilling of combustible/organic waste, subsidized waste-to-energy plants, and built nationwide district heating from waste energy.',
    tech: 'Waste-to-energy incineration, district heating grids, automated sorting facilities',
    successRate: 99, cost: '$2.8B (national infrastructure)', before: 'Heavy landfill dependency pre-1990s', after: 'Less than 1% of waste sent to landfill nationally',
    adaptable: true,
    adaptNote: 'Adaptable for mid-to-large cities with budget for incineration infrastructure; smaller towns may need a regional shared facility.'
  },
  {
    id: 's3', problemCat: 'waste', flag: '🇰🇷', place: 'South Korea',
    tabs: ['government', 'technology', 'international'],
    problem: 'High food-waste volume and disposal cost',
    solution: 'RFID-based pay-as-you-throw (PAYT) waste tracking system',
    actions: 'Government mandated RFID bins in apartment complexes; residents charged by weight of food waste disposed, with real-time billing.',
    tech: 'RFID chip bins, smart weighing scales, mobile billing app',
    successRate: 88, cost: '$95/bin unit + app', before: 'Food waste recycling under 2% in early 1990s', after: 'Food waste recycling now over 95% nationally',
    adaptable: true,
    adaptNote: 'Very adaptable for dense apartment-heavy cities; requires upfront RFID hardware investment and billing integration.'
  },
  {
    id: 's4', problemCat: 'waste', flag: '🇸🇬', place: 'Singapore',
    tabs: ['technology', 'government', 'international'],
    problem: 'Limited land for waste storage in a dense city-state',
    solution: 'Smart-city waste sensors with underground pneumatic collection systems',
    actions: 'Housing Board integrated underground vacuum waste pipelines in new residential zones; sensor-fitted bins alert collection trucks only when full.',
    tech: 'IoT fill-level sensors, pneumatic underground waste pipes, predictive collection routing',
    successRate: 90, cost: '$150M per major housing district', before: 'Frequent overflowing street bins, daily manual rounds', after: '60% fewer collection trips, zero visible street bins in pilot districts',
    adaptable: false,
    adaptNote: 'Capital-intensive — best suited to new urban development zones rather than retrofitting existing dense neighborhoods.'
  },
  {
    id: 's5', problemCat: 'waste', flag: '🇮🇳', place: 'Indore, India',
    tabs: ['government', 'community'],
    problem: 'Unsegregated waste and open dumping (a near-identical problem to ours)',
    solution: 'Door-to-door segregated waste collection + zero-landfill processing model',
    actions: 'Municipal corporation enforced 100% source segregation, ran daily door-to-door collection with GPS-tracked vehicles, and built local processing/composting units.',
    tech: 'GPS-tracked collection vehicles, decentralized composting units, citizen mobile reporting app',
    successRate: 95, cost: '₹150 Cr (~$18M) municipal investment', before: 'Open dumping, India\'s "dirtiest city" ranking in 2015', after: 'India\'s #1 cleanest city for 6 consecutive years',
    adaptable: true,
    adaptNote: 'Highly adaptable for Indian municipalities — proven at a comparable population scale with comparable starting conditions.'
  },
  {
    id: 's6', problemCat: 'waste', flag: '🇮🇳', place: 'Kerala, India',
    tabs: ['community', 'ngo', 'government'],
    problem: 'Lack of consistent local waste workforce and dumping in public spaces',
    solution: 'Haritha Karma Sena — community-run all-women waste collection workforce',
    actions: 'Local self-government bodies (Kudumbashree) trained and deployed neighborhood-level women\'s collectives for door-to-door segregated collection and resource recovery centers.',
    tech: 'Resource Recovery Centres, manual segregation, community-run material recovery',
    successRate: 87, cost: '₹40 Cr (~$4.8M) state-level rollout', before: 'Inconsistent collection, dependence on informal dumping', after: 'Active in 1000+ panchayats with steady livelihoods created for ~35,000 women',
    adaptable: true,
    adaptNote: 'Directly adaptable — works especially well where local self-help groups or women\'s collectives already exist.'
  },

  /* ── WATER ── */
  {
    id: 's7', problemCat: 'water', flag: '🇳🇱', place: 'Netherlands',
    tabs: ['government', 'technology', 'international'],
    problem: 'Urban flooding and water leakage in aging pipe networks',
    solution: 'Smart water-grid sensors with predictive leak detection',
    actions: 'National water boards installed pressure/flow sensors across the pipe network, enabling predictive maintenance before pipes burst.',
    tech: 'IoT pressure sensors, AI leak-prediction models, automated valve shutoffs',
    successRate: 91, cost: '$40M sensor network rollout', before: 'Reactive repairs after pipe bursts, ~8% water loss', after: 'Water loss reduced to under 3%, repairs scheduled before failure',
    adaptable: true,
    adaptNote: 'Adaptable in phases — start with sensors on high-risk pipeline sections rather than a full network rollout.'
  },
  {
    id: 's11', problemCat: 'water', flag: '🇮🇱', place: 'Israel',
    tabs: ['government', 'technology', 'international'],
    problem: 'Chronic water scarcity in an arid climate',
    solution: 'Nationwide drip irrigation + large-scale wastewater recycling plants',
    actions: 'Government mandated drip irrigation for agriculture and built national wastewater-reclamation infrastructure reused for farming.',
    tech: 'Drip irrigation networks, advanced membrane wastewater treatment, desalination plants',
    successRate: 93, cost: '$500M+ (national water infrastructure)', before: 'Severe water scarcity, agriculture at risk', after: '85%+ of wastewater recycled, agriculture water-secure despite desert climate',
    adaptable: true,
    adaptNote: 'Adaptable for water-stressed regions; drip irrigation can be piloted cheaply before full recycling-plant investment.'
  },
  {
    id: 's12', problemCat: 'water', flag: '🇸🇬', place: 'Singapore',
    tabs: ['technology', 'government', 'international'],
    problem: 'No natural freshwater sources, total import dependency',
    solution: 'NEWater — advanced membrane technology turning treated wastewater into ultra-clean drinking water',
    actions: 'National water agency (PUB) built multiple NEWater plants and public-education campaigns to build trust in recycled water.',
    tech: 'Microfiltration, reverse osmosis, UV disinfection treatment trains',
    successRate: 96, cost: '$2.4B (4 NEWater plants)', before: '100% dependent on imported water', after: 'NEWater meets ~40% of national water demand',
    adaptable: false,
    adaptNote: 'High capital and technical requirement — most realistic for cities already short on freshwater with budget for treatment plants.'
  },
  {
    id: 's13', problemCat: 'water', flag: '🇮🇳', place: 'India (Jal Jeevan Mission)',
    tabs: ['government', 'community'],
    problem: 'Rural households without piped water access, recurring shortages',
    solution: 'Rainwater harvesting structures + nationwide piped water-supply mission',
    actions: 'Central and state governments funded household tap connections, check-dams and community rainwater-harvesting structures across villages.',
    tech: 'Rooftop rainwater harvesting tanks, percolation pits, piped supply networks',
    successRate: 84, cost: '₹3.6 lakh Cr (~$43B) national mission', before: '~17% rural households with tap water in 2019', after: '70%+ rural households with tap water connections by completion',
    adaptable: true,
    adaptNote: 'Directly adaptable — rainwater harvesting can start at the household/ward level with very low upfront cost.'
  },

  /* ── ROADS ── */
  {
    id: 's9', problemCat: 'roads', flag: '🇺🇸', place: 'United States (multiple cities)',
    tabs: ['government', 'technology', 'community'],
    problem: 'Slow pothole repair and inconsistent road-damage reporting',
    solution: '311 citizen reporting + AI pothole-detection vehicle fleets',
    actions: 'City public-works departments mounted detection cameras on garbage trucks and buses to auto-flag potholes, cross-referenced with citizen 311 reports.',
    tech: 'Vehicle-mounted AI cameras, citizen reporting hotline/app, automated work-order generation',
    successRate: 80, cost: '$2,000–5,000 per detection unit per vehicle', before: 'Average repair time 30+ days', after: 'Average repair time cut to under 7 days in pilot cities',
    adaptable: true,
    adaptNote: 'Adaptable at low cost using just the citizen-reporting layer first; vehicle-mounted detection can be phased in later.'
  },
  {
    id: 's14', problemCat: 'roads', flag: '🇩🇪', place: 'Germany',
    tabs: ['government'],
    problem: 'Roads deteriorating faster than repair budgets could keep up',
    solution: 'Preventive road-maintenance scheduling based on pavement-condition data',
    actions: 'Road authorities switched from reactive pothole-filling to scheduled resurfacing using condition surveys, extending road lifespan and cutting emergency repairs.',
    tech: 'Pavement condition scanning vehicles, predictive maintenance scheduling software',
    successRate: 89, cost: '€25–40 per linear meter for preventive resurfacing', before: 'Reactive repairs, rapid re-deterioration', after: 'Road lifespan extended ~40%, emergency repairs down sharply',
    adaptable: true,
    adaptNote: 'Adaptable for any municipality — the core change is scheduling and budgeting discipline rather than new technology.'
  },
  {
    id: 's15', problemCat: 'roads', flag: '🇯🇵', place: 'Japan',
    tabs: ['government', 'technology'],
    problem: 'Frequent earthquakes damaging road infrastructure',
    solution: 'Earthquake-resistant road and bridge engineering standards',
    actions: 'National building codes mandated seismic-resistant road base layers, flexible joints and base isolation for bridges in high-risk zones.',
    tech: 'Seismic isolation bearings, flexible pavement composites, real-time structural sensors',
    successRate: 90, cost: 'Embedded in national infrastructure code (no single figure)', before: 'Severe road/bridge damage in major quakes pre-1995', after: 'Dramatically reduced structural failures in post-code infrastructure',
    adaptable: false,
    adaptNote: 'Relevant mainly for seismic-risk regions; the lower-cost lesson — building codes + scheduled inspection — still transfers anywhere.'
  },
  {
    id: 's16', problemCat: 'roads', flag: '🇳🇱', place: 'Netherlands',
    tabs: ['government', 'community'],
    problem: 'Road congestion and high vehicle-related accident rates',
    solution: 'Bicycle-first road planning with protected cycling infrastructure',
    actions: 'Municipalities redesigned road space allocation to prioritize protected bike lanes, reducing car dependency and road wear from heavy traffic.',
    tech: 'Protected bike lane networks, traffic-calming junction design, bike-priority signal timing',
    successRate: 87, cost: '€1–3M per km of protected cycling infrastructure', before: 'High car-dependency, congested arterial roads', after: '27%+ of all trips nationally now by bicycle, lower road maintenance load',
    adaptable: true,
    adaptNote: 'Adaptable incrementally — a single protected corridor can be piloted before a city-wide redesign.'
  },
  {
    id: 's17', problemCat: 'roads', flag: '🇮🇳', place: 'India',
    tabs: ['government', 'technology'],
    problem: 'Delayed pothole/road-damage detection on highways and city roads',
    solution: 'Smart road monitoring using AI-based crowd-sourced and sensor data',
    actions: 'State road authorities piloted AI image-recognition apps and IoT road sensors feeding directly into maintenance work-order systems.',
    tech: 'AI image recognition, IoT road-condition sensors, centralized maintenance dashboard',
    successRate: 78, cost: '₹2–4 lakh (~$2,500–4,800) per monitored km', before: 'Manual inspection only, slow complaint-to-repair cycle', after: 'Detection-to-repair cycle cut by over half in pilot stretches',
    adaptable: true,
    adaptNote: 'Adaptable at city scale — can start with a citizen-reporting app before adding fixed sensors.'
  },

  /* ── ELECTRICITY ── */
  {
    id: 's8', problemCat: 'electricity', flag: '🇩🇪', place: 'Germany',
    tabs: ['government', 'technology'],
    problem: 'High street-light energy cost and frequent outages',
    solution: 'City-wide LED street light replacement with smart dimming controls',
    actions: 'Municipalities replaced sodium-vapor lamps with networked LEDs that dim automatically based on pedestrian/traffic sensors.',
    tech: 'Smart LED fixtures, motion-based dimming, centralized fault-reporting dashboard',
    successRate: 94, cost: '$60/fixture, paid back via energy savings in ~4 yrs', before: 'High failure rate, ~40% higher energy bills', after: '60% energy savings, outage reports auto-flagged to maintenance crews',
    adaptable: true,
    adaptNote: 'Very adaptable — many cities run this as a self-funding upgrade since energy savings cover the loan.'
  },
  {
    id: 's18', problemCat: 'electricity', flag: '🇺🇸', place: 'United States',
    tabs: ['technology', 'government'],
    problem: 'Unreliable grid with frequent outages during demand spikes',
    solution: 'Tesla-style grid-scale battery storage stabilizing the power grid',
    actions: 'Utilities deployed large grid-connected battery installations to absorb excess renewable generation and discharge during peak demand or outages.',
    tech: 'Lithium-ion grid-scale battery banks, real-time grid-balancing software',
    successRate: 91, cost: '$1B+ per large-scale battery installation', before: 'Frequent blackouts during peak demand', after: 'Major reduction in outage frequency and duration in served regions',
    adaptable: false,
    adaptNote: 'High capital cost — realistic first for regional grid operators rather than individual municipalities, but smaller community-battery pilots are adaptable.'
  },
  {
    id: 's19', problemCat: 'electricity', flag: '🇮🇳', place: 'India',
    tabs: ['government', 'community', 'ngo'],
    problem: 'Unreliable or absent grid electricity in rural villages',
    solution: 'Solar micro-grid "solar villages" providing 24/7 local power',
    actions: 'Government and NGOs co-funded decentralized solar-plus-battery micro-grids serving entire villages independent of the main grid.',
    tech: 'Solar PV arrays, battery storage, local mini-grid distribution network',
    successRate: 86, cost: '₹1–2 Cr (~$120K–240K) per village micro-grid', before: 'No or unreliable grid electricity', after: 'Continuous power enabling schools, clinics and small businesses to run reliably',
    adaptable: true,
    adaptNote: 'Highly adaptable for off-grid or unreliable-grid areas — modular, can start small and scale village by village.'
  },
  {
    id: 's20', problemCat: 'electricity', flag: '🇪🇺', place: 'Europe (multiple countries)',
    tabs: ['government', 'technology', 'international'],
    problem: 'Grid instability from increasing renewable energy variability',
    solution: 'Smart grid systems with real-time demand-response balancing',
    actions: 'National grid operators deployed smart meters and automated demand-response systems that shift load in real time to match renewable supply.',
    tech: 'Smart meters, automated demand-response controllers, grid-balancing AI',
    successRate: 90, cost: '$50–150 per smart meter installed', before: 'Manual grid balancing, frequent voltage fluctuations', after: 'Far smoother integration of renewables, fewer localized outages',
    adaptable: true,
    adaptNote: 'Adaptable in phases — smart meters can be rolled out independently before full automated demand-response is built.'
  },
  {
    id: 's21', problemCat: 'electricity', flag: '🇮🇳', place: 'India (microgrids)',
    tabs: ['community', 'technology', 'ngo'],
    problem: 'Frequent localized power cuts and transformer failures in dense neighborhoods',
    solution: 'Neighborhood-scale microgrids with local battery backup',
    actions: 'Resident welfare associations partnered with energy companies to install shared rooftop solar + battery backup serving a cluster of homes.',
    tech: 'Rooftop solar, shared battery backup units, local mini-distribution switching',
    successRate: 82, cost: '₹15–30 lakh (~$18K–36K) per neighborhood cluster', before: 'Daily power cuts during peak hours', after: 'Uninterrupted essential power during grid outages for the cluster',
    adaptable: true,
    adaptNote: 'Directly adaptable at the neighborhood/apartment-complex level with no need to wait for citywide grid upgrades.'
  },

  /* ── ANIMALS (kept for completeness; not part of the 4 primary
     category filters, surfaces only under the "All" Solutions tab) ── */
  {
    id: 's10', problemCat: 'animals', flag: '🇮🇳', place: 'Jaipur, India',
    tabs: ['ngo', 'community', 'government'],
    problem: 'Stray dog population growth and public safety concerns',
    solution: 'Help in Suffering ABC (Animal Birth Control) Program',
    actions: 'NGO partnered with the municipal corporation to run a sustained sterilization-and-vaccination program rather than culling, recognized as a WHO model.',
    tech: 'Mobile sterilization units, rabies vaccination drives, population tracking database',
    successRate: 85, cost: '$15–25 per animal sterilized', before: 'Rising bite incidents and unmanaged population growth', after: 'Stable, declining stray population and near-zero rabies deaths in program zones',
    adaptable: true,
    adaptNote: 'Adaptable for any city with an NGO-municipal partnership; sterilization is more sustainable and cheaper long-term than removal drives.'
  }
];

/* ─────────────────────────────────────────────────────────────────
   IMPACT — derived LIVE from issues. There is no standalone fake
   dataset: every impact card is generated on demand from a real
   issue via DataUtil.buildImpactForIssue(issue), using the
   per-category template below plus the issue's own postedAt date
   to build a real day-by-day timeline.
   ───────────────────────────────────────────────────────────────── */
export const IMPACT_TEMPLATES = {
  waste: {
    health: { level: 'high', notes: ['Mosquito breeding risk increases near waste piles', 'Persistent bad smell affecting nearby homes', 'Bacteria spread and disease risk rising the longer waste sits', 'Children and elderly residents most exposed'] },
    environment: { notes: ['Soil contamination beginning at the dump edge', 'Plastic waste spreading with wind and rain runoff', 'Risk of contaminating nearby drains/groundwater'] },
    community: ['Residents reporting reduced quality of life', 'Nearby shops reporting reduced footfall', 'Local schools raising safety concerns']
  },
  water: {
    health: { level: 'medium', notes: ['Contaminated puddle/standing water near homes', 'Waterborne illness risk if left unresolved', 'Mosquito breeding in stagnant water'] },
    environment: { notes: ['Water wastage from leakage or burst pipes', 'Groundwater contamination risk', 'Soil erosion at the leak/burst site'] },
    community: ['Water supply interrupted for nearby residents', 'Local businesses reporting flooding/disruption', 'Traffic disruption if water is logging on roads']
  },
  roads: {
    health: { level: 'medium', notes: ['Increased risk of vehicle accidents and injuries', 'Ambulance/emergency response delays on the affected stretch'] },
    environment: { notes: ['Vehicle emissions increase from traffic slowdowns and detours', 'Water pooling in potholes during rain, accelerating road damage'] },
    community: ['Daily commuters reporting longer travel times', 'Public transport routes affected', 'Local businesses reporting reduced access']
  },
  electricity: {
    health: { level: 'low', notes: ['Safety concerns walking at night where lighting has failed', 'Risk to medical equipment for residents dependent on continuous power'] },
    environment: { notes: ['No major direct environmental impact typically recorded'] },
    community: ['Local businesses reporting losses from outages', 'Food spoilage risk for households and small shops', 'Productivity loss for home-based work']
  },
  default: {
    health: { level: 'low', notes: ['Community has flagged this as an ongoing concern'] },
    environment: { notes: ['No measurable environmental impact recorded yet'] },
    community: ['Residents requesting faster authority response']
  }
};

/* Generic day-by-day narrative used to build a believable live-updates
   feed purely from how many days have actually elapsed since postedAt —
   no fake dates, the day count is real. */
export const IMPACT_DAY_NARRATIVE = [
  { label: 'Issue reported', detail: 'First community report filed.' },
  { label: 'No action taken', detail: 'No municipal/authority response recorded yet.' },
  { label: 'Public complaints increasing', detail: 'More residents reporting the same issue.' },
  { label: 'Issue worsening', detail: 'Condition of the reported issue has deteriorated.' },
  { label: 'Authority inspection started', detail: 'An inspection of the site/issue has begun.' },
  { label: 'Repair work started', detail: 'Work has started to address the issue.' },
  { label: 'Issue partially resolved', detail: 'Significant progress made, follow-up still pending.' },
  { label: 'Issue resolved', detail: 'The reported issue has been fully resolved.' }
];

/* Shared lookup/compute helpers so render modules never duplicate logic.
   Every function here is pure — it takes the live `issues` array (now
   owned by AppContext's React state) as an explicit argument instead of
   reading a module-level global, so this stays trivially testable and
   ready to swap for a real fetch() later. */
export const DataUtil = {
  issueById: (issues, id) => issues.find(i => i.id === id),
  solutionsByCat: cat => (cat === 'all' ? SOLUTIONS : SOLUTIONS.filter(s => s.problemCat === cat)),
  solutionsByTab: tab => (tab === 'all' ? SOLUTIONS : SOLUTIONS.filter(s => s.tabs.includes(tab))),
  solutionsByCatAndTab: (cat, tab) => SOLUTIONS.filter(s => (cat === 'all' || s.problemCat === cat) && (tab === 'all' || s.tabs.includes(tab))),

  /* Real elapsed-days calculation from an ISO postedAt string */
  daysSince(postedAt, now = Date.now()) {
    const ms = now - new Date(postedAt).getTime();
    return Math.max(0, Math.floor(ms / 86400000));
  },

  /* Live stats computed straight from the issues array — no hardcoded numbers */
  computeStats(issues, now = Date.now()) {
    const active = issues.filter(i => i.status !== 'resolved').length;
    const affected = issues.reduce((sum, i) => sum + (i.affected || 0), 0);
    const resolved = issues.filter(i => i.status === 'resolved').length;
    const unresolved = issues.filter(i => i.status !== 'resolved');
    const avgDays = unresolved.length
      ? +(unresolved.reduce((sum, i) => sum + DataUtil.daysSince(i.postedAt, now), 0) / unresolved.length).toFixed(1)
      : 0;

    const postedToday = issues.filter(i => DataUtil.daysSince(i.postedAt, now) === 0);
    const activeToday = postedToday.filter(i => i.status !== 'resolved').length;
    const affectedToday = postedToday.reduce((sum, i) => sum + (i.affected || 0), 0);
    const resolvedToday = issues.filter(i => i.status === 'resolved' && DataUtil.daysSince(i.postedAt, now) === 0).length;

    return { active, affected, resolved, days: avgDays, activeToday, affectedToday, resolvedToday };
  },

  /* Build a real-time impact record for one issue — derives resolution %
     and timeline length from real elapsed days/status. */
  buildImpactForIssue(issue, now = Date.now()) {
    const tpl = IMPACT_TEMPLATES[issue.cat] || IMPACT_TEMPLATES.default;
    const daysUnresolved = DataUtil.daysSince(issue.postedAt, now);
    const resolved = issue.status === 'resolved';
    const resolutionPct = resolved ? 100 : Math.min(90, daysUnresolved * 12 + (issue.status === 'in-progress' ? 25 : 0));
    const severityScore = { high: 85, medium: 55, low: 25 }[issue.severity] || 40;

    const dayCount = Math.max(1, Math.min(daysUnresolved + 1, IMPACT_DAY_NARRATIVE.length));
    const timeline = [];
    for (let d = 0; d < dayCount; d++) {
      const date = new Date(new Date(issue.postedAt).getTime() + d * 86400000);
      let entry = IMPACT_DAY_NARRATIVE[d];
      if (d === dayCount - 1 && resolved) entry = IMPACT_DAY_NARRATIVE[IMPACT_DAY_NARRATIVE.length - 1];
      timeline.push({ day: d + 1, date: date.toISOString().slice(0, 10), label: entry.label, detail: entry.detail });
    }

    return {
      id: 'imp-' + issue.id,
      issueId: issue.id,
      title: issue.title + ' — ' + issue.ward,
      peopleAffected: issue.affected,
      health: { level: tpl.health.level, score: severityScore, notes: tpl.health.notes },
      environment: { score: Math.max(10, severityScore - 15), notes: tpl.environment.notes },
      community: { notes: tpl.community },
      daysUnresolved, municipalityResponded: daysUnresolved >= 3 || issue.status !== 'open',
      resolved, resolutionPct, timeline
    };
  },

  /* Haversine distance in meters between two lat/lng points */
  distanceMeters(lat1, lng1, lat2, lng2) {
    const R = 6371000;
    const toRad = d => (d * Math.PI) / 180;
    const dLat = toRad(lat2 - lat1), dLng = toRad(lng2 - lng1);
    const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  },

  formatDist(m) {
    return m < 1000 ? `${Math.round(m)} m` : `${(m / 1000).toFixed(1)} km`;
  }
};
