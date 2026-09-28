/**
 * Tariff Impact India - central data model.
 *
 * Every figure below is traceable to a source listed in SOURCES at the bottom of
 * this file. Nothing here is hardcoded inside the pages: the charts, tables and
 * counters all read from this single model so numbers stay consistent site-wide.
 *
 * lastVerified: 2026-09-28
 */
(function (global) {
  'use strict';

  var lastVerified = '2026-09-28';

  /* ------------------------------------------------------------------ *
   * Headline figures
   * ------------------------------------------------------------------ */

  var headline = {
    peakRate: 50,
    peakLabel: '50%',
    currentRate: 10,
    currentLabel: '10%',
    frameworkRate: 18,
    frameworkLabel: '18%',
    monthsAtPeak: 5.5,
    bilateralGoods: 87.31,
    bilateralGoodsLabel: '$87.3B',
    shareOfExportsHit: 55,
    shareOfExportsHitLabel: '55%',
    estLossLow: 47.5,
    estLossHigh: 66,
    gdpHitLow: 0.3,
    gdpHitHigh: 1.0,
    usSurplusFY26: 34.41,
    usSurplusFY25: 40.88,
    rupeeNow: 95.05,
    activeAgreements: 5,
    clustersTracked: 5
  };

  /* ------------------------------------------------------------------ *
   * Tariff chronology
   *
   * rate = effective additional US duty on Indian goods, on top of MFN.
   * kind = 'escalation' | 'relief' | 'legal' | 'negotiation' | 'domestic' | 'threat'
   * ------------------------------------------------------------------ */

  var timeline = [
    {
      date: '2025-04-02',
      display: '2 Apr 2025',
      title: 'Reciprocal tariff regime begins',
      rate: 26,
      kind: 'escalation',
      summary: 'The US announces a 10% baseline tariff plus an India-specific 16% reciprocal duty, taking the additional burden on Indian goods to 26% on top of normal MFN duties.',
      detail: 'Indian goods had previously faced only standard most-favoured-nation (MFN) rates. The reciprocal regime replaced that with a country-specific schedule, and India was placed near the top of the initial list.'
    },
    {
      date: '2025-04-09',
      display: '9 Apr 2025',
      title: 'India among the first suspensions',
      rate: 10,
      kind: 'relief',
      summary: 'Washington suspends the country-specific reciprocal tariffs for 90 days for India and a handful of other partners, leaving the 10% baseline in place.',
      detail: 'The pause was the first sign that the tariff list was a negotiating instrument rather than a settled policy. It bought India roughly three months of breathing room.'
    },
    {
      date: '2025-07-31',
      display: '31 Jul 2025',
      title: 'Duty raised to 25%',
      rate: 25,
      kind: 'escalation',
      summary: 'The US announces a 25% duty on Indian goods, framed as matching the average of India\'s own import duties. Notification follows for 7 August.',
      detail: 'The stated justification was that India charges among the highest average tariffs in the world on American goods, a long-running complaint in US trade policy.'
    },
    {
      date: '2025-08-06',
      display: '6 Aug 2025',
      title: 'Russian oil penalty',
      rate: 50,
      kind: 'escalation',
      summary: 'An additional 25% punitive duty is imposed over India\'s continued purchases of Russian crude, signed as Executive Order 14329 and effective 27 August.',
      detail: 'This was the single largest escalation. It was not a trade remedy but a foreign-policy sanction, tying the tariff to the Ukraine conflict and pushing the total additional burden to 50%.'
    },
    {
      date: '2025-08-27',
      display: '27 Aug 2025 - 6 Feb 2026',
      title: 'Peak tariff period begins',
      rate: 50,
      kind: 'escalation',
      summary: 'The full 50% burden applies: 25% reciprocal plus 25% punitive. It remains in force for roughly five and a half months.',
      detail: 'The peak is the reference point for every damage estimate in circulation. Trade bodies date the worst of the sector contraction from late August 2025.'
    },
    {
      date: '2026-02-02',
      display: '2 Feb 2026',
      title: 'Framework agreement announced',
      rate: 18,
      kind: 'negotiation',
      summary: 'The two sides announce a framework: the Russian-oil penalty is removed and the reciprocal rate is cut from 25% to 18%, in exchange for Indian concessions.',
      detail: 'India committed to increase purchases of US petroleum, defence equipment, electronics, pharmaceuticals, telecom products and aircraft, alongside tariff concessions on alcoholic beverages, cosmetics, medical devices and selected agri-inputs, with safeguards such as minimum import prices.'
    },
    {
      date: '2026-02-07',
      display: '7 Feb 2026',
      title: 'Joint statement issued',
      rate: 18,
      kind: 'negotiation',
      summary: 'A formal joint statement confirms the terms and the intent to conclude a full bilateral trade agreement.',
      detail: 'Unlocking roughly $500B of stated purchasing intent, the joint statement is the legal and political anchor for the framework that negotiators are still working to finalise.'
    },
    {
      date: '2026-02-20',
      display: '20 Feb 2026',
      title: 'Supreme Court strikes down reciprocal tariffs',
      rate: null,
      kind: 'legal',
      summary: 'The US Supreme Court invalidates the sweeping reciprocal tariff framework, removing the legal basis for country-specific rates including India\'s.',
      detail: 'A structural break, not a bilateral one. Because the ruling struck the framework rather than India\'s deal, it gave New Delhi unexpected leverage in the negotiations that followed.'
    },
    {
      date: '2026-02-23',
      display: '23 Feb 2026',
      title: 'India halves RoDTEP rebates',
      rate: null,
      kind: 'domestic',
      summary: 'The DGFT limits RoDTEP rates and value caps to 50% of notified levels with immediate effect, raising the net cost of exporting.',
      detail: 'Notification 60/2025-26 cut rebate rates across Appendices 4R and 4RE. All products in HS Chapters 01 to 24 were exempt. The move landed while global demand was already soft.'
    },
    {
      date: '2026-02-24',
      display: '24 Feb 2026',
      title: 'Temporary 10% global fallback',
      rate: 10,
      kind: 'legal',
      summary: 'The administration pivots to a 10% tariff applied to all countries for 150 days, superseding the trade-deal rate.',
      detail: 'The fallback treated India the same as most other partners and in practice overrode the 18% framework rate, leaving the February agreement largely symbolic for a period.'
    },
    {
      date: '2026-03-23',
      display: '23 Mar 2026',
      title: 'RoDTEP cut reversed in full',
      rate: null,
      kind: 'domestic',
      summary: 'The DGFT withdraws the February rebate cut via Notification 66/2025-26, restoring full rates and value caps.',
      detail: 'The about-turn within a month suggests the measure was judged too costly for exporters. Exporter guidance after this date is to claim RoDTEP at full rates, not at half.'
    },
    {
      date: '2026-05-07',
      display: '7 May 2026',
      title: 'Federal court strikes the 10% levy',
      rate: 0,
      kind: 'legal',
      summary: 'A US federal court invalidates the 10% tariff, though the ruling directly binds only three plaintiffs: the state of Washington, Burlap & Barrel and Basic Fun.',
      detail: 'Narrow in scope but symbolically important. The administration was expected to appeal, and the ruling is one reason Indian negotiators read Washington as legally constrained.'
    },
    {
      date: '2026-06-03',
      display: '3 Jun 2026',
      title: 'USTR proposes Section 301 forced-labour tariffs',
      rate: 12.5,
      kind: 'escalation',
      summary: 'The USTR proposes additional duties of 10% to 12.5% on 60 economies including India, over alleged inadequate enforcement against forced-labour goods.',
      detail: 'A 12.5% rate was proposed for India, China, Japan, South Korea, Brazil and Switzerland. Canada, the EU, Indonesia, Mexico, Ecuador and Pakistan were found not to have effectively enforced prohibitions. A special textile and apparel mechanism would allow a volume of shipments from selected economies at lower rates.'
    },
    {
      date: '2026-07-13',
      display: '13 Jul 2026',
      title: 'India hardens its negotiating stance',
      rate: 10,
      kind: 'negotiation',
      summary: 'Talks fail to conclude an interim pact during USTR Jamieson Greer\'s Delhi visit. India says it will not sign without a tariff advantage over China and a guarantee against new levies.',
      detail: 'Commerce and Industry Minister Piyush Goyal set the terms publicly: "It\'s all about comparative advantage... The day that happens, the deal is on." The official red lines are agriculture and dairy.'
    },
    {
      date: '2026-07-24',
      display: '24 Jul 2026',
      title: 'Final Section 301 duties land at 10%',
      rate: 10,
      kind: 'escalation',
      summary: 'Final duties of 10% to 12.5% take effect on 60 partners. India\'s rate lands at 10%, with roughly 45% of its US-bound exports exempted by product carve-outs.',
      detail: 'Exemptions cover generic pharmaceuticals, smartphones, steel, aluminium and auto parts. The remaining 55% of India\'s US-bound exports face the new 10% duty on top of MFN. India confirmed it would keep engaging on sectoral issues including textiles.'
    },
    {
      date: '2026-08-03',
      display: 'Aug 2026',
      title: 'RoDTEP extended to September',
      rate: null,
      kind: 'domestic',
      summary: 'Notification 74/2025-26 extends the RoDTEP scheme for a further six months, 1 April to 30 September 2026, at rates unchanged from 31 March 2026.',
      detail: 'RoDTEP has been extended in six-month tranches rather than long horizons, a pattern that leaves exporters planning against a rolling deadline.'
    },
    {
      date: '2026-09-18',
      display: '18 Sep 2026',
      title: 'Lindsey Graham Act passed',
      rate: 100,
      kind: 'threat',
      summary: 'The Act allows the President to impose tariffs of up to 100% on exports from India, returning the threat level to the 2025 peak.',
      detail: 'Passed in both chambers. The measure is prospective rather than imposed, but it reintroduces the tail risk that led India to seek a locked-in deal in the first place.'
    }
  ];

  /* ------------------------------------------------------------------ *
   * Section 232 duties - unchanged, apply to all trading partners
   * ------------------------------------------------------------------ */

  var section232 = [
    { sector: 'Steel, aluminium and copper', rate: 50, note: 'Unchanged throughout the period covered by this site.' },
    { sector: 'Certain auto components', rate: 25, note: 'Product-specific, not India-specific.' },
    { sector: 'Patented pharmaceuticals', rate: 100, note: 'Applies to patented drugs; Indian generic exports were repeatedly exempted.' }
  ];

  /* ------------------------------------------------------------------ *
   * Estimated cost of the tariff episode
   * ------------------------------------------------------------------ */

  var costEstimates = [
    {
      body: 'FIEO',
      full: 'Federation of Indian Export Organisations',
      low: 47.5,
      high: 47.5,
      unit: '$B',
      shareLow: 55,
      shareHigh: 55,
      headline: '55% of shipments to the US directly affected',
      quote: 'Nearly 55% of our shipments to the U.S. market are directly affected.',
      speaker: 'S.C. Ralhan, President'
    },
    {
      body: 'GTRI',
      full: 'Global Trade Research Initiative',
      low: 5,
      high: 5,
      unit: '\u20B9 lakh crore',
      shareLow: 66,
      shareHigh: 66,
      headline: 'Higher than the trade-body estimate, at 66%',
      quote: 'About 70% of Indian exports to the U.S. would face regular duties plus the new levy.',
      speaker: 'Ajay Srivastava, founder and former trade negotiator'
    },
    {
      body: 'CareEdge',
      full: 'CareEdge Ratings',
      low: 0.3,
      high: 0.4,
      unit: '% of GDP',
      shareLow: null,
      shareHigh: null,
      headline: 'Direct export loss limited to 0.3-0.4% of GDP',
      quote: 'Merchandise export exposure to the US is also low at around 2 per cent of GDP, offering additional resilience.',
      speaker: 'CareEdge Ratings report'
    },
    {
      body: 'Consensus range',
      full: 'Multiple agencies',
      low: 0.5,
      high: 1.0,
      unit: '% of GDP',
      shareLow: null,
      shareHigh: null,
      headline: 'Estimated hit to FY26 GDP growth',
      quote: 'Several agencies estimate India\'s GDP growth to take a hit of 0.5 per cent to nearly 1 per cent in FY26.',
      speaker: 'Aggregated estimates'
    }
  ];

  /* ------------------------------------------------------------------ *
   * Sector impact
   * ------------------------------------------------------------------ */

  var sectors = [
    {
      id: 'gems',
      name: 'Gems & Jewellery',
      share: 11.5,
      severity: 'severe',
      shareLabel: '11.5% of US-bound exports',
      summary: 'The clearest casualty. Exports fell to a five-year low while shipments to the top buyer nearly halved.',
      metrics: [
        { label: 'FY26 total exports', value: '$27.72B', delta: -3.3, deltaLabel: 'vs FY25', tone: 'negative' },
        { label: 'Shipments to the US', value: '$5.09B', delta: -45, deltaLabel: 'vs FY25', tone: 'negative' },
        { label: 'Cut & polished diamonds', value: '$12.16B', delta: -8.5, deltaLabel: 'lowest in over two decades', tone: 'negative' }
      ],
      effects: [
        'Disruptions ran for several months as the reciprocal and then punitive duties landed, stranding orders that had already been placed.',
        'India handles nine out of every ten diamonds processed globally, so the shock hit the cutting and polishing hub itself rather than a marginal supplier.',
        'GJEPC reports strong growth in the UAE, Hong Kong, Australia and Canada, which partly offset the US loss.'
      ],
      recovery: 'Gems & jewellery exports rose 34.64% year on year in June 2026, to $2.41B from $1.79B, as the tariff base narrowed.'
    },
    {
      id: 'textiles',
      name: 'Textiles & Apparel',
      share: null,
      severity: 'moderate',
      shareLabel: '~$11B of annual US-bound trade',
      summary: 'Held up in aggregate through market diversification, but is now disadvantaged against rivals who qualify for preferential textile quotas.',
      metrics: [
        { label: 'FY26 textile exports', value: '\u20B93.16 lakh cr', delta: 2.1, deltaLabel: 'vs FY25', tone: 'positive' },
        { label: 'Ready-made garments', value: '\u20B91.39 lakh cr', delta: 2.9, deltaLabel: 'vs FY25', tone: 'positive' },
        { label: 'US tariff & apparel trade', value: '~$11B', delta: null, deltaLabel: 'annual, largest market', tone: 'neutral' }
      ],
      effects: [
        'CITI warns that differential treatment "risks diverting sourcing orders for textile and apparel items away from India".',
        'India was excluded from tariff-rate quotas letting specified shipments from Bangladesh, Cambodia, Indonesia and Malaysia using US-origin cotton enter duty-free under Section 301.',
        'Growth in more than 120 destinations offset the US drag, with notable rises in the UAE, UK, Germany, Spain, Japan, Egypt, Nigeria, Senegal and Sudan.'
      ],
      recovery: 'The AEPC describes the sector as "well-positioned for stronger growth" as the tariff base narrows.'
    },
    {
      id: 'electronics',
      name: 'Electronics',
      share: 17.6,
      severity: 'moderate',
      shareLabel: 'Largest single US-bound category',
      summary: 'The biggest exposure by share, and one of the fastest recoverers once the 50% peak was lifted.',
      metrics: [
        { label: 'Share of US-bound exports', value: '17.6%', delta: null, deltaLabel: 'largest category', tone: 'neutral' },
        { label: 'US share of India electronics exports', value: '37%', delta: null, deltaLabel: 'concentration risk', tone: 'neutral' },
        { label: 'July 2026 exports', value: '$5.92B', delta: 57.4, deltaLabel: 'vs July 2025', tone: 'positive' }
      ],
      effects: [
        'The US accounted for 37% of India\'s total electronic exports, the single largest concentration of exposure among major sectors.',
        'Some items from the sector were temporarily exempted from the 25% duties, and the sector was excluded from the July 2026 forced-labour levy.',
        'Exclusion from the final Section 301 list makes electronics a relative bright spot compared with exposed peers.'
      ],
      recovery: 'Electronic goods exports grew 18.93% in June 2026 and 57.40% in July 2026 year on year.'
    },
    {
      id: 'pharma',
      name: 'Pharmaceuticals',
      share: 11.8,
      severity: 'contained',
      shareLabel: '11.8% of US-bound exports',
      summary: 'Largely insulated throughout. Generic drugs and smartphones were repeatedly carved out of the tariff base.',
      metrics: [
        { label: 'Share of US-bound exports', value: '11.8%', delta: null, deltaLabel: 'second largest', tone: 'neutral' },
        { label: 'US share of India pharma exports', value: '35%', delta: null, deltaLabel: 'FDA-approved plants', tone: 'neutral' },
        { label: 'July 2026 exclusion', value: 'Exempt', delta: null, deltaLabel: 'generic pharmaceuticals', tone: 'positive' }
      ],
      effects: [
        'Pharma exports to the US, about 35% of India\'s total pharma exports, were excluded from the tariffs throughout.',
        'India hosts one of the highest numbers of US FDA-approved manufacturing facilities serving US generic drug requirements.',
        'CareEdge attributes the sector\'s resilience to fundamental competitive advantage rather than policy shelter.'
      ],
      recovery: 'The 100% Section 232 rate applies to patented pharmaceuticals only, leaving Indian generics outside its scope.'
    },
    {
      id: 'seafood',
      name: 'Seafood & Shrimp',
      share: null,
      severity: 'mixed',
      shareLabel: 'US historically ~38% of shrimp exports',
      summary: 'A record year overall, but US-bound shrimp volumes fell sharply. Total strength masked a clear retreat from the largest market.',
      metrics: [
        { label: 'FY26 total seafood exports', value: '$8.46B', delta: null, deltaLabel: 'all-time high', tone: 'positive' },
        { label: 'Frozen shrimp', value: '$5.62B', delta: 8.64, deltaLabel: 'in dollar terms', tone: 'positive' },
        { label: 'US-bound volume', value: '279,193 MT', delta: -19.51, deltaLabel: 'vs FY25', tone: 'negative' }
      ],
      effects: [
        'Shipments to the US fell 14.22% in dollar value and 19.51% in volume, even as total seafood exports set a record.',
        'Frozen shrimp accounted for 93.55% of the value of India\'s seafood exports to the US, concentrating the exposure.',
        'Exporters diverted volumes to China, Vietnam and the European Union.'
      ],
      recovery: 'China became the largest destination by volume, taking 490,369 MT worth $1.61B.'
    },
    {
      id: 'engineering',
      name: 'Engineering & Chemicals',
      share: null,
      severity: 'resilient',
      shareLabel: 'Exposed under the 10% Section 301 levy',
      summary: 'Consistently among the strongest growth categories, and named as a driver of recent monthly export gains.',
      metrics: [
        { label: 'July 2026 engineering goods', value: '$12.24B', delta: 17.71, deltaLabel: 'vs July 2025', tone: 'positive' },
        { label: 'July 2026 chemicals', value: '$2.80B', delta: 14.39, deltaLabel: 'vs July 2025', tone: 'positive' },
        { label: 'Combined exposure', value: 'In scope', delta: null, deltaLabel: 'subject to 10% levy', tone: 'negative' }
      ],
      effects: [
        'GTRI estimates about 70% of Indian exports to the US, including machinery, chemicals, plastics, leather goods, gems and furniture, face regular duties plus the new levy.',
        'Engineering and chemicals are named among the major drivers of June and July 2026 export growth.',
        'Concessions sought under the framework include market access for these capital-goods categories.'
      ],
      recovery: 'Engineering goods grew 20.74% in June 2026 and 17.71% in July 2026 year on year.'
    }
  ];

  /* ------------------------------------------------------------------ *
   * Monthly trade data
   * ------------------------------------------------------------------ */

  var monthlyExports = {
    unit: 'US$ Billion',
    note: 'Merchandise exports, April-July cumulative year on year. Commerce Ministry monthly releases.',
    series: [
      { label: 'Apr-Jul 2025-26', value: 148.48, type: 'prior' },
      { label: 'Apr-Jul 2026-27', value: 173.78, type: 'current' }
    ],
    growth: 17.04
  };

  var monthlyDetail = [
    { label: 'Apr-Jun 2026-27 (Q1)', metric: 'Merchandise exports', value: 129.32, prior: 111.57, growth: 15.92, unit: 'US$B' },
    { label: 'Apr-Jun 2026-27 (Q1)', metric: 'Non-petroleum exports', value: 106.30, prior: 94.54, growth: 12.44, unit: 'US$B' },
    { label: 'Apr-Jun 2026-27 (Q1)', metric: 'Services trade surplus', value: 49.43, prior: 47.90, growth: 3.20, unit: 'US$B' },
    { label: 'Apr-Jul 2026-27', metric: 'Merchandise trade deficit', value: 118.60, prior: 96.66, growth: 22.74, unit: 'US$B', inverse: true }
  ];

  var categoryGrowth = [
    { label: 'Petroleum products', julYoy: 67.64, value: 6.92 },
    { label: 'Electronic goods', julYoy: 57.40, value: 5.92 },
    { label: 'Engineering goods', julYoy: 17.71, value: 12.24 },
    { label: 'Organic & inorganic chemicals', julYoy: 14.39, value: 2.80 },
    { label: 'Cotton yarn, fabrics, made-ups', julYoy: 8.40, value: 1.11 }
  ];

  /* ------------------------------------------------------------------ *
   * India versus competing tariffs (reciprocal rates, Feb 2026 reset)
   * ------------------------------------------------------------------ */

  var competitorRates = [
    { country: 'India', announced: 26, current: 18, status: 'Cut from 25% to 18%', focus: true },
    { country: 'Bangladesh', announced: 37, current: 19, status: 'Lowered from 37%' },
    { country: 'Cambodia', announced: 49, current: 19, status: 'Lowered from 49%' },
    { country: 'European Union', announced: 20, current: 15, status: 'Lowered' },
    { country: 'China', announced: 34, current: 20, status: 'Reduced, surcharge applies' },
    { country: 'Indonesia', announced: 32, current: 19, status: 'Lowered' },
    { country: 'South Korea', announced: 35, current: 19, status: 'Lowered' }
  ];

  /* ------------------------------------------------------------------ *
   * Export basket to the US (FY25 base, $87B)
   * ------------------------------------------------------------------ */

  var exportBasket = [
    { label: 'Electronic goods', share: 17.6 },
    { label: 'Pharmaceuticals', share: 11.8 },
    { label: 'Gems & jewellery', share: 11.5 },
    { label: 'Chemicals', share: 9.4 },
    { label: 'Machinery & mechanical appliances', share: 8.9 },
    { label: 'Petroleum products', share: 6.1 },
    { label: 'Iron & steel articles', share: 5.4 },
    { label: 'Other items', share: 29.3 }
  ];

  /* ------------------------------------------------------------------ *
   * Macro context
   * ------------------------------------------------------------------ */

  var macro = [
    { label: 'Merchandise exports to the US, FY25', value: '$87B', note: 'The base exposed to the tariff regime.' },
    { label: 'US merchandise export exposure', value: '~2% of GDP', note: 'Low, and the main reason macro damage is contained.' },
    { label: 'Projected current account deficit, FY26', value: '0.9% of GDP', note: 'CareEdge projection, held manageable.' },
    { label: 'Russian crude purchases, FY26', value: '$40.8B', note: '30.3% of total crude imports, the trigger for the punitive duty.' },
    { label: 'Ural-Brent price differential', value: '~$3/bbl', note: 'Narrowed sharply from an average of about $20 in 2023.' },
    { label: 'Services exports', value: 'Outside scope', note: 'Not covered by the tariffs; a continuing support to the external sector.' }
  ];

  /* ------------------------------------------------------------------ *
   * India\'s response
   * ------------------------------------------------------------------ */

  var response = {
    diplomacy: [
      {
        title: 'WTO dispute filings',
        text: 'India notified the WTO of its intention to impose retaliatory tariffs on select American goods in response to US duties on Indian steel and aluminium. It maintains the US measures are inconsistent with GATT 1994 and the Agreement on Safeguards, while the US position is that the duties rest on national-security grounds and are not safeguards.',
        status: 'Notification stage'
      },
      {
        title: 'Section 301 engagement',
        text: 'India formally engaged with the USTR through the Section 301 process on forced-labour measures, participating in the consultation window that closed 6 July 2026 ahead of hearings on 7 July 2026. The proposed tariffs were not final at the time of engagement.',
        status: 'Ongoing'
      },
      {
        title: 'Framework agreement track',
        text: 'Parallel to the dispute track, India negotiated a framework announced 2 February 2026 and confirmed in a joint statement on 7 February 2026. Trade Secretary Rajesh Agrawal has said the framework deal is ready and "whenever it is the right time, it will be signed".',
        status: 'Ready, unsigned'
      },
      {
        title: 'Rejection of surplus capacity charge',
        text: 'India has formally rejected US allegations of excess or surplus industrial capacity, which Washington was using to justify further levies under Section 301 probes.',
        status: 'Contested'
      }
    ],
    terms: {
      headline: 'No deal without a tariff advantage',
      body: 'Indian negotiators held back after Washington would not give assurances on two demands: a tariff advantage over competitors such as China, and a guarantee against fresh US levies once an agreement is signed. A government official described the position plainly: "Our position is clear - we don\'t intend to rush into a deal that is not on favourable terms or compromise on red lines like ceding ground on agriculture."',
      demands: [
        { label: 'Comparative advantage', text: 'A rate below Vietnam, Thailand, the Philippines, China, Malaysia, Bangladesh and Sri Lanka. Goyal: "The day that happens, the deal is on."' },
        { label: 'No retroactive levies', text: 'A guarantee that no new US duties follow the conclusion of the agreement.' },
        { label: 'Agriculture and dairy', text: 'Identified as red lines. India is unlikely to open these sensitive sectors.' },
        { label: 'Durability of the framework', text: 'Confidence in the agreement was undermined when the Supreme Court struck down the underlying tariff framework in February 2026.' }
      ],
      leverage: [
        'The Supreme Court ruling of February 2026 removed the legal basis for country-specific rates, weakening the threat that had forced India\'s hand.',
        'Indian officials believe some remaining US trade measures could also face legal or political setbacks.',
        'Falling oil prices and a strengthening services surplus reduce external vulnerability.',
        'Alternative partners and pending FTAs reduce India\'s dependence on the US market.'
      ]
    },
    domestic: [
      {
        title: 'Export Promotion Mission',
        text: 'Announced in the Union Budget 2025-26, the Mission merges several fragmented export-support initiatives into a single, outcome-based, digitally enabled framework, with a focus on affordable trade finance, market access and infrastructure.',
        tag: 'Structural reform'
      },
      {
        title: 'RoDTEP full-rate restoration',
        text: 'After halving rebate rates on 23 February 2026, the DGFT reversed the cut in full on 23 March 2026 via Notification 66/2025-26, restoring the rates and value caps in force on 22 February 2026. Exporters should claim at full rates.',
        tag: 'Reversed'
      },
      {
        title: 'RoDTEP extension to September 2026',
        text: 'Notification 74/2025-26 of 31 March 2026 extends the scheme for six months from 1 April to 30 September 2026 at rates unchanged from 31 March 2026, continuing a pattern of short tranches rather than long horizons.',
        tag: 'Extended'
      },
      {
        title: 'RoSCTL and duty remission',
        text: 'The Rebate of State and Central Taxes and Levies scheme was extended for textiles, alongside RoDTEP and duty drawback. Duty drawback and EPCG remain claimable in parallel with RoDTEP in most cases.',
        tag: 'Active'
      },
      {
        title: 'Budget 2026-27 proposal',
        text: 'The budget proposes converging RoDTEP into the Export Promotion Mission after appraisal and approval, with the FY 2026-27 RoDTEP allocation cut to Rs 10,000 crore.',
        tag: 'Pending'
      }
    ],
    diversification: [
      { market: 'United Arab Emirates', value: 22.3, note: 'Textile export growth, April 2025 to February 2026' },
      { market: 'Sudan', value: 205.6, note: 'Textile export growth, from a small base' },
      { market: 'Senegal', value: 54.4, note: 'Textile export growth' },
      { market: 'Egypt', value: 38.3, note: 'Textile export growth' },
      { market: 'Nigeria', value: 21.4, note: 'Textile export growth' },
      { market: 'Japan', value: 20.6, note: 'Textile export growth' },
      { market: 'Spain', value: 15.5, note: 'Textile export growth' },
      { market: 'Germany', value: 9.9, note: 'Textile export growth' },
      { market: 'United Kingdom', value: 7.8, note: 'Textile export growth' }
    ],
    strategic: [
      {
        title: 'Free trade agreements, now in force',
        text: 'This was the anticipated route in 2025 and it has partly delivered. The India-EFTA TEPA entered into force on 1 October 2025, the India-Oman CEPA was signed in December 2025, the India-New Zealand FTA was announced on 22 December 2025, the India-EU FTA was concluded on 27 January 2026, and the India-UK CETA came into force on 15 July 2026. Each removes duties in the same labour-intensive sectors the US tariffs hit.'
      },
      {
        title: 'The UK deal is already moving numbers',
        text: 'Fifty consignments worth over $140m shipped on day one under the CETA, including $10m of jewellery from around 30 GJEPC members. Engineering exports to Britain grew 34.4% year on year to $972.5m in the first two months of FY27, and the EEPC expects engineering exports to Britain to exceed $7.5bn by FY30.'
      },
      {
        title: 'Nuclear and defence opening',
        text: 'The US framework paves the way for US firms to enter India\'s nuclear power sector, enabled by the SHANTI Act 2025, as well as defence manufacturing.'
      },
      {
        title: 'Critical and emerging technology',
        text: 'The agreement deepens the US-India Initiative on Critical and Emerging Technology (iCET), covering areas of strategic technology cooperation.'
      },
      {
        title: 'Concessions offered',
        text: 'India offered tariff concessions on alcoholic beverages, cosmetics, medical devices and specific agri-inputs, and committed to raise purchases of US petroleum, defence equipment, electronics, pharmaceuticals, telecom products and aircraft.'
      },
      {
        title: 'Input cost relief',
        text: 'The 11% import duty on cotton was temporarily removed from 1 June to 30 October 2026, a direct response to the Tiruppur and AEPC lobby. Cotton requirement for the year is projected at 337 lakh bales against 292 lakh bales of arrivals, a supply gap of about 45 lakh bales.'
      }
    ]
  };

  /* ------------------------------------------------------------------ *
   * Open questions
   * ------------------------------------------------------------------ */

  var openQuestions = [
    {
      question: 'Will the framework agreement be signed?',
      text: 'The framework has been ready since February 2026 and both sides describe themselves as fully engaged, but the gap has narrowed to commercial terms rather than political ones. India\'s position is that it will wait.'
    },
    {
      question: 'Does a court ruling settle the tariff question?',
      text: 'No. The Supreme Court struck the reciprocal framework in February 2026, but the administration rebuilt the tariff base through a temporary 10% global levy and then Section 301 duties. The May 2026 federal ruling bound only three plaintiffs and was expected to be appealed.'
    },
    {
      question: 'How large is the unresolved risk?',
      text: 'The Lindsey Graham Act, passed in September 2026, authorises tariffs of up to 100% on Indian exports. It is a threat rather than an imposed measure, but it caps the downside scenario at a level India has already experienced.'
    },
    {
      question: 'Can exporters actually pivot?',
      text: 'Evidence is mixed. Textiles grew 2.1% and seafood hit a record $8.46B in FY26, but gems and jewellery fell to a five-year low and textile exporters now face preferential quota rivals in Bangladesh, Cambodia, Indonesia and Malaysia.'
    }
  ];

  /* ------------------------------------------------------------------ *
   * Sources
   * ------------------------------------------------------------------ */

  var sources = [
    { publisher: 'Business Standard', title: 'Chronology of US tariffs and penalties on Indian goods since April 2025', date: '8 May 2026', kind: 'News report', url: 'https://www.business-standard.com/economy/news/chronology-of-us-tariffs-and-penalties-on-indian-goods-since-april-2025-126050800718_1.html' },
    { publisher: 'Reuters', title: 'India-US trade deal slashes tariffs; seen lifting exports', date: '3 Feb 2026', kind: 'News report', url: 'https://www.reuters.com/world/india/india-us-trade-deal-slashes-tariffs-lifts-exports-markets-2026-02-03' },
    { publisher: 'Reuters', title: 'An emboldened India holds out for better terms in US trade talks', date: '13 Jul 2026', kind: 'News report', url: 'https://www.reuters.com/markets/emerging/an-emboldened-india-holds-out-better-terms-us-trade-talks-2026-07-13' },
    { publisher: 'Reuters', title: 'India to keep engaging with US on trade deal after new tariff measures', date: '25 Jul 2026', kind: 'News report', url: 'https://www.reuters.com/world/india/india-keep-engaging-with-us-trade-deal-after-new-tariff-measures-2026-07-25' },
    { publisher: 'Reuters', title: 'India gems and jewellery exports fall to five-year low on US tariffs', date: '15 Apr 2026', kind: 'News report', url: 'https://www.reuters.com/world/india/india-gems-jewellery-exports-fall-five-year-low-us-tariffs-2026-04-15' },
    { publisher: 'Reuters', title: 'US tariff puts Indian textile exporters at disadvantage, industry body says', date: '24 Jul 2026', kind: 'News report', url: 'https://www.reuters.com/world/india/us-tariff-puts-indian-textile-exporters-disadvantage-industry-body-says-2026-07-24' },
    { publisher: 'Reuters', title: 'India-US trade deal framework ready as talks progress', date: '13 Jul 2026', kind: 'News report', url: 'https://www.indiatoday.in/business/story/india-us-trade-deal-framework-ready-talks-progress-amid-tariff-uncertainty-2947027-2026-07-13' },
    { publisher: 'Ministry of Commerce & Industry', title: 'Trade data monthly release, June 2026', date: '13 Jul 2026', kind: 'Official data', url: 'https://www.commerce.gov.in/files/d-m-y/PIB%20Release%20-%20June%202026%20_0.pdf' },
    { publisher: 'Ministry of Commerce & Industry', title: 'Trade data monthly release, July 2026', date: '13 Aug 2026', kind: 'Official data', url: 'https://www.commerce.gov.in/files/d-m-y/PIB%20Release%20-%20July%202026.pdf' },
    { publisher: 'Press Information Bureau', title: 'India remains engaged with the U.S. on Section 301 proceedings', date: '3 Jun 2026', kind: 'Official statement', url: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2268256&lang=1&reg=3' },
    { publisher: 'Akashvani News', title: 'India informs WTO of tariff plan to counter US duties on steel', date: '2025', kind: 'Official reporting', url: 'https://newsonair.gov.in/india-informs-wto-of-tariff-plan-to-counter-us-duties-on-steel/' },
    { publisher: 'DGFT', title: 'Notification No. 60/2025-26 - Rationalisation of RoDTEP rates', date: '23 Feb 2026', kind: 'Gazette notification', url: 'https://content.dgft.gov.in/Website/dgftprod/55c4afae-8aac-4c2d-b3a4-221f774594c8/RODTEP%20NOTIFICATION%20NO%2060%20DATED%2023.02.2026-%20ENGLISH_0001.pdf' },
    { publisher: 'APEDA', title: 'Notification No. 74/2025-26 - Continuation of RoDTEP Scheme', date: '31 Mar 2026', kind: 'Gazette notification', url: 'https://apeda.gov.in/sites/default/files/dgft_notifications/Notification_74.pdf' },
    { publisher: 'MPEDA', title: 'Seafood exports reach an all-time high in FY26', date: '1 Jun 2026', kind: 'Official data', url: 'https://www.telegraphindia.com/business/indias-seafood-exports-hit-record-rs-73890-crore-in-fy26-frozen-shrimp-remains-top-export-product/cid/2163457' },
    { publisher: 'MPEDA', title: 'Seafood exports at Rs 73,890 crore despite US dip', date: '1 Jun 2026', kind: 'Official reporting', url: 'https://www.aninews.in/news/business/indias-seafood-exports-hit-record-rs-73890-crore-in-fy26-frozen-shrimp-drives-growth-despite-us-dip20260601201822' },
    { publisher: 'GJEPC', title: 'Impact of US reciprocal tariffs on Indian gem & jewellery exports', date: '2025', kind: 'Industry body', url: 'https://gjepc.org/solitaire/impact-of-us-reciprocal-tariffs-on-indian-gem-jewellery-exports-kirit-bhansali-chairman-gjepc' },
    { publisher: 'The Diplomat', title: 'How looming US sanctions test India', date: '18 Sep 2026', kind: 'Analysis', url: 'https://thediplomat.com/2026/09/how-looming-us-sanctions-test-india/' },
    { publisher: 'CareEdge Ratings', title: 'India export loss limited to 0.3-0.4% of GDP', date: '1 Aug 2025', kind: 'Research note', url: 'https://ddnews.gov.in/en/indias-export-loss-due-to-higher-us-tariffs-limited-to-0-3-to-0-4-pc-of-gdp-report/' },
    { publisher: 'India Briefing', title: 'US-India strike interim trade deal, cut tariffs to 18%', date: '11 Feb 2026', kind: 'Analysis', url: 'https://www.india-briefing.com/news/us-india-interim-trade-agreement-18-percent-tariff-42514.html' },
    { publisher: 'Economic Times', title: 'US trade deal to be on the day India secures tariff edge: Piyush Goyal', date: '2026', kind: 'News report', url: 'https://m.economictimes.com/news/economy/foreign-trade/us-trade-deal-to-be-on-the-day-india-secures-tariff-edge-piyush-goyal/amp_articleshow/132001599.cms' },
    { publisher: 'WTO', title: '2026 news items and dispute filings', date: '2026', kind: 'Official record', url: 'https://www.wto.org/english/news_e/news26_e/news26_e.htm' },
    { publisher: 'strtrade.com', title: 'U.S. to eliminate some tariffs, lower others on imports from India', date: 'Feb 2026', kind: 'Trade policy analysis', url: 'http://strtrade.com/trade-news-resources/str-trade-report/trade-report/february/u-s-to-eliminate-some-tariffs-lower-others-on-imports-from-india' },

    /* --- Regional, cluster and employment evidence --- */
    { publisher: 'Ministry of Textiles (PIB)', title: 'State-wise textile and apparel exports, and textile MSME closures on the Udyam portal', date: '2026', kind: 'Official data', url: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2297513&lang=1&reg=48' },
    { publisher: 'Ministry of Textiles (PIB)', title: 'India textile exports register 2.1% growth in FY 2025-26', date: '22 Apr 2026', kind: 'Official data', url: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2254367&lang=1&reg=3' },
    { publisher: 'Ministry of Textiles (PIB)', title: 'Trade preparedness and export competitiveness of the textile and apparel sector', date: '24 Jul 2026', kind: 'Official statement', url: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2288808&lang=1&reg=48' },
    { publisher: 'DGCI&S via Texmin', title: 'India top ten export markets for textiles and apparel, FY26', date: '2026', kind: 'Official data', url: 'https://www.texmin.gov.in/static/uploads/2025/07/e71848322780a5f4c2f04ed7352451bc.pdf' },
    { publisher: 'The Hindu BusinessLine', title: 'US tariff shock drags Tiruppur knitwear exports down 5% in FY26', date: '8 Jun 2026', kind: 'News report', url: 'https://www.thehindubusinessline.com/economy/us-tariff-shock-drags-tiruppur-knitwear-exports-down-5-in-fy26/article71076918.ece' },
    { publisher: 'The New Indian Express', title: 'West Asia conflict and US tariff hike dent Tiruppur export value by 4.91%', date: '7 Jun 2026', kind: 'News report', url: 'https://www.newindianexpress.com/states/tamil-nadu/2026/Jun/07/west-asia-conflict-us-tariff-hike-dent-tiruppurs-export-value-by-491-per-cent-in-2025-26' },
    { publisher: 'The New Indian Express', title: 'Tiruppur reports meagre fall in export revenue of Rs 42,544 crore in FY26', date: '6 Jun 2026', kind: 'News report', url: 'https://www.newindianexpress.com/states/tamil-nadu/2026/Jun/06/tiruppur-reports-meagre-fall-in-export-revenue-of-rs-42544-crore-in-fy26' },
    { publisher: 'Times of India', title: 'Weak US demand and rising Asian competition drag garment exports, Tirupur exporters say', date: '17 Jun 2026', kind: 'News report', url: 'https://timesofindia.indiatimes.com/city/coimbatore/weak-us-demand-rising-asian-competition-drag-indias-garment-exports-tirupur-exporters/articleshow/131804943.cms' },
    { publisher: 'The Hindu', title: 'Tiruppur garment exporters demand removal of import duty on cotton', date: '14 May 2026', kind: 'News report', url: 'https://www.thehindu.com/news/cities/Coimbatore/tiruppur-garment-exporters-manufacturers-demand-removal-of-import-duty-on-cotton/article70975338.ece' },
    { publisher: 'The New Indian Express', title: 'Removal of import duty on cotton welcomed by Tiruppur knitwear sector', date: '31 May 2026', kind: 'News report', url: 'https://www.newindianexpress.com/states/tamil-nadu/2026/May/31/removal-of-import-duty-on-cotton-will-reduce-costs-tiruppur-knitwear-sector' },
    { publisher: 'Fortune India', title: 'Maharashtra Farm to Foreign initiative targets global textile export hub status', date: '19 Aug 2026', kind: 'News report', url: 'https://www.fortuneindia.com/business-news/maharashtras-farm-to-foreign-initiative-seeks-to-position-state-as-global-textile-export-hub/154801' },
    { publisher: 'IBEF', title: 'Indian textile industry report, May 2026', date: 'May 2026', kind: 'Industry report', url: 'https://www.ibef.org/industry/textiles' },
    { publisher: 'Asia News Network', title: '50% US tariffs put Indian textile exporters in survival mode', date: '24 Nov 2025', kind: 'News report', url: 'https://asianews.network/hanging-by-a-thread-50-us-tariffs-put-indian-textile-exporters-in-survival-mode' },

    /* --- Currency, markets and macro --- */
    { publisher: 'Reuters', title: 'Rupee slides past 96/USD to one-month low as oil climbs; RBI likely intervenes', date: '14 Jul 2026', kind: 'News report', url: 'https://www.reuters.com/world/india/rupee-slides-past-96usd-one-month-low-oil-climbs-rbi-likely-intervenes-2026-07-14' },
    { publisher: 'Reuters', title: 'Indian rupee return to near-record lows reflects RBI debate on intervention', date: '21 Jul 2026', kind: 'News report', url: 'https://www.reuters.com/world/india/indian-rupees-return-near-record-lows-reflects-rbi-debate-intervention-2026-07-21' },
    { publisher: 'Reuters', title: 'RBI three-day intervention signals lower tolerance for rupee weakness', date: '28 Jul 2026', kind: 'News report', url: 'http://reuters.com/world/india/rbis-3-day-intervention-push-signals-lower-tolerance-rupee-weakness-bankers-say-2026-07-28' },
    { publisher: 'The Hindu', title: 'Rupee hits record low of 96.14/dollar, settles at fresh closing low of 95.86', date: '15 May 2026', kind: 'News report', url: 'https://www.thehindu.com/business/markets/rupee-hits-record-low-of-9614dollar-settles-at-fresh-closing-low-of-9586dollar/article70982736.ece' },
    { publisher: 'The Hindu BusinessLine', title: 'Rupee breaches 96/$ mark for the first time', date: '15 May 2026', kind: 'News report', url: 'https://www.thehindubusinessline.com/money-and-banking/rupee-breaches-96-mark-for-the-first-time/article70983847.ece' },
    { publisher: 'The Hindu BusinessLine', title: 'Rupee logs weekly decline, with RBI intervention curbing losses', date: '14 Aug 2026', kind: 'News report', url: 'https://www.thehindubusinessline.com/markets/forex/rupee-logs-weekly-decline-with-rbi-intervention-curbing-losses/article71345032.ece' },
    { publisher: 'Reuters via Economic Times', title: 'Rupee hits three-week low as RBI stands guard', date: '19 Aug 2026', kind: 'News report', url: 'https://m.economictimes.com/markets/forex/rupee-hits-three-week-low-traders-wary-about-fall-to-96/usd-as-rbi-stands-guard/amp_articleshow/133344824.cms' },
    { publisher: 'Reuters', title: 'RBI intervention and dollar flows push rupee to two-month peak', date: '1 Sep 2026', kind: 'News report', url: 'http://reuters.com/business/rbi-intervention-dollar-flows-push-indian-rupee-two-month-peak-2026-09-01' },
    { publisher: 'Mint', title: 'Nifty 50 coverage and market data', date: 'Sep 2026', kind: 'Market data', url: 'https://www.livemint.com/market/nifty-50-coverage' },
    { publisher: 'The Hindu BusinessLine', title: 'Sensex and Nifty market highlights, 19 August 2026', date: '19 Aug 2026', kind: 'Market data', url: 'https://www.thehindubusinessline.com/markets/sensex-nifty50-today-stock-market-highlights-19th-august-2026/article71360276.ece' },

    /* --- Trade agreements --- */
    { publisher: 'Reuters', title: 'India-UK trade pact takes effect, cutting tariffs and boosting services trade', date: '15 Jul 2026', kind: 'News report', url: 'https://www.reuters.com/world/uk/india-uk-trade-pact-takes-effect-promising-tariff-cuts-services-boost-2026-07-15' },
    { publisher: 'The Economic Times', title: 'India-UK trade pact comes into force, gold standard of FTA for both', date: '15 Jul 2026', kind: 'News report', url: 'https://m.economictimes.com/news/economy/foreign-trade/india-uk-trade-pact-comes-into-force-gold-standard-of-fta-for-both/amp_articleshow/132420954.cms' },
    { publisher: 'The New Indian Express', title: 'Goods worth $140 million exported on Day 1 of the UK free trade agreement', date: '16 Jul 2026', kind: 'News report', url: 'https://www.newindianexpress.com/amp/story/india/2026/Jul/16/goods-worth-140-million-exported-on-day-1-of-uk-free-trade-agreement' },
    { publisher: 'European Commission', title: 'EU-India Free Trade Agreement: agreements and text', date: '27 Jan 2026', kind: 'Official record', url: 'https://policy.trade.ec.europa.eu/eu-trade-relationships-country-and-region/countries-and-regions/india/eu-india-agreements_en' },
    { publisher: 'European Commission', title: 'Factsheet: EU-India Free Trade Agreement', date: '27 Jan 2026', kind: 'Official record', url: 'http://pib.gov.in/PressReleasePage.aspx?PRID=2219146&lang=1&reg=3' },
    { publisher: 'Press Information Bureau', title: 'India-EU Free Trade Agreement: a transformational trade deal for textiles and apparel', date: '27 Jan 2026', kind: 'Official statement', url: 'https://pib.gov.in/PressReleasePage.aspx?PRID=2219250&lang=1&reg=3' },

    /* --- Other countries and global context --- */
    { publisher: 'Reuters', title: 'China heavy rare earth tap stays closed for Japan in June', date: '20 Jul 2026', kind: 'News report', url: 'https://www.reuters.com/world/china/chinas-heavy-rare-earth-tap-stays-closed-japan-june-2026-07-20' },
    { publisher: 'Reuters via Japan Times', title: 'Rare earths force Trump to be less hostile before Xi summit', date: '22 Sep 2026', kind: 'News report', url: 'https://www.japantimes.co.jp/news/2026/09/22/world/politics/rare-earths-trump-xi-summit' },
    { publisher: 'Bloomberg via Japan Times', title: 'US and China discuss trade and rare earths in call ahead of Xi visit', date: '31 Jul 2026', kind: 'News report', url: 'https://www.japantimes.co.jp/news/2026/07/31/world/us-china-trade-rare-earths' },
    { publisher: 'Asia Times', title: 'US and Japan race to secure chip-grade minerals as China curbs exports', date: '3 Sep 2026', kind: 'News report', url: 'https://asiatimes.com/2026/09/us-japan-race-to-secure-chip-grade-minerals-as-china-curbs-exports/' },
    { publisher: 'Asia Times', title: 'China sanctions US defence and rare earth firms in retaliation', date: '22 Jun 2026', kind: 'News report', url: 'https://asiatimes.com/2026/06/china-sanctions-us-defense-rare-earth-firms-in-retaliation' },
    { publisher: 'USTR', title: 'US-China trade and economic deal draws praise', date: 'Nov 2025', kind: 'Official statement', url: 'https://ustr.gov/about/policy-offices/press-office/press-releases/2025/november/us-china-trade-and-economic-deal-draws-praise' },
    { publisher: 'commonspace.eu via Reuters', title: 'G7 ministers discuss critical mineral supplies and impending US tariffs in Brussels', date: '6 May 2026', kind: 'News report', url: 'https://www.commonspace.eu/news/g7-ministers-discuss-access-critical-mineral-supplies-and-impending-us-tariffs-brussels' },
    { publisher: 'Economic Times', title: 'US-China trade coverage: transshipment claims, de minimis ruling, China levies', date: 'Aug-Sep 2026', kind: 'News report', url: 'https://economictimes.indiatimes.com/topic/us-china-trade' },
    { publisher: 'The Diplomat', title: 'How looming US sanctions test India', date: '18 Sep 2026', kind: 'Analysis', url: 'https://thediplomat.com/2026/09/how-looming-us-sanctions-test-india/' },
    { publisher: 'Asia Society Policy Institute', title: 'How will Xi Jinping approach the Washington summit', date: '23 Sep 2026', kind: 'Analysis', url: 'https://asiasociety.org/policy-institute/how-will-xi-jinping-approach-washington-summit' }
  ];

  var method = {
    lastVerified: lastVerified,
    scope: 'Covers the US tariff measures applied to Indian goods from 2 April 2025 to 28 September 2026, the Indian domestic response, the state and sector distribution of the consequences, the 2025-26 wave of Indian trade agreements, the responses of other governments, and the market and currency effects observed alongside the tariffs.',
    rules: [
      'Tariff rates shown are the additional US duties on Indian goods on top of standard most-favoured-nation rates, unless stated otherwise. They are not the all-in landed rate.',
      'Section 232 duties on steel, aluminium, copper, auto components and patented pharmaceuticals are listed separately because they apply to all trading partners and were not changed by this episode.',
      'Where estimates conflict, the range is shown rather than a single figure. Cost estimates in particular vary by a factor of more than two between institutions.',
      'Fiscal years are Indian financial years, April to March, unless otherwise stated. FY26 means the year ended 31 March 2026.',
      'Rupee and dollar figures are quoted as reported by the source. Conversions are not applied, since exchange-rate movement is itself part of the story.',
      'Growth rates are year on year for the period stated in each entry.',
      'Textile state-level export figures cover textiles and apparel including handicrafts, in rupees crore. Textile MSME closure counts come from the Udyam registration portal and are self-reported at the point of closure.',
      'Free trade agreement coverage figures are quoted in the form the negotiating party used. Tariff-line counts, trade-value coverage and immediate versus phased elimination are different measures and are not interchangeable.',
      'Scenario probabilities are the author judgement, not a model output. They are shown so the reader can discount them rather than so they can be cited.'
    ],
    limits: [
      'Services exports are outside the scope of these tariffs and are shown only where they affect the external balance.',
      'Tariff incidence is not the same as exporter incidence. Absorbed margins, currency moves and buyer substitution all sit between the headline rate and the realised loss.',
      'Product-level exemptions changed repeatedly. Any single sector\'s effective rate depends on its precise product mix at a given date.',
      'Several 2026 figures, notably the final Section 301 product list, were subject to litigation and appeal at the time of writing.',
      'The attribution problem is the largest single limit on this dataset. The West Asia conflict, the Russia-Ukraine war, crude at over $100/bbl and the Cape of Good Hope shipping diversion all moved Indian export and employment numbers over the same period as the tariffs. Sector and state deltas in 2026 cannot be cleanly assigned to the duties.',
      'The MSME closure series runs from April 2023, more than two years before the reciprocal tariff regime began. It is a measure of textile-sector fragility over three years, not a tariff-only death toll.',
      'State-level export figures are reported for a textile and apparel basket. States with large service, IT or pharmaceutical exports are not represented, so state exposure to the US is understated for those economies.',
      'The India-EU FTA was concluded in January 2026 but requires ratification and internal legal procedures before it is binding. Its projected trade effects are not yet in the data.'
    ]
  };

  /* ------------------------------------------------------------------ *
   * Bilateral trade, FY25 and FY26
   *
   * The FY26 pair is the single most important update to the original
   * story: the export side barely moved, the import side surged.
   * ------------------------------------------------------------------ */

  var bilateralTrade = {
    note: 'Merchandise, Indian financial years. Commerce Ministry data as reported in the press.',
    years: [
      { label: 'FY25', exports: 86.51, imports: 45.63, surplus: 40.88 },
      { label: 'FY26', exports: 87.31, imports: 52.90, surplus: 34.41 }
    ],
    shares: {
      usAsDestination: 20,
      note: 'The US still accounts for about a fifth of India merchandise exports, making it the single largest destination.'
    }
  };

  /* ------------------------------------------------------------------ *
   * Export destinations, FY26
   * ------------------------------------------------------------------ */

  var destinations = [
    { market: 'United States', value: 87.31, focus: true, note: 'Largest destination, but only marginally up on FY25' },
    { market: 'United Arab Emirates', value: 37.37, note: 'Second largest; the single biggest recipient of redirected textile trade' },
    { market: 'China', value: 19.48, note: 'Up from $14.25B in FY25, the fastest growth of any major market' },
    { market: 'Netherlands', note: 'European distribution hub, largely a re-routing point' },
    { market: 'United Kingdom', note: 'Now covered by CETA from 15 July 2026' },
    { market: 'Germany', note: 'EU member, now covered by the India-EU FTA once ratified' },
    { market: 'Singapore', note: 'Regional trade hub' },
    { market: 'Bangladesh', note: 'Competitor in apparel, not a major Indian export market' },
    { market: 'Saudi Arabia', note: 'Grew on the India-Oman CEPA and Gulf demand' },
    { market: 'Hong Kong', note: 'Re-export gateway' }
  ];

  var chinaTrade = {
    note: 'China is simultaneously India second-largest export market and its largest import source.',
    exports: [
      { label: 'FY25', value: 14.25 },
      { label: 'FY26', value: 19.48 }
    ],
    imports: [
      { label: 'FY25', value: 113.45 },
      { label: 'FY26', value: 131.63 }
    ],
    exportGrowth: 36.7
  };

  /* ------------------------------------------------------------------ *
   * Where the damage landed: states and clusters
   *
   * Two independent official series are used:
   *   exports  - textile and apparel including handicrafts, Rs crore, FY26
   *   msme     - Udyam-registered textile units closed, Apr 2023 to Mar 2026
   * ------------------------------------------------------------------ */

  var stateTextileExports = [
    { state: 'Tamil Nadu', fy25: 67863, fy26: 68792, msmeClosed: 1309, jobsAffected: 17869, focus: true },
    { state: 'Gujarat', fy25: 50150, fy26: 50947, msmeClosed: 1402, jobsAffected: 9038, focus: true },
    { state: 'Haryana', fy25: 34843, fy26: 35060, msmeClosed: 108, jobsAffected: 823 },
    { state: 'Uttar Pradesh', fy25: 31804, fy26: 34829, msmeClosed: 440, jobsAffected: 4161 },
    { state: 'Maharashtra', fy25: 33611, fy26: 32842, msmeClosed: 1276, jobsAffected: 6628 },
    { state: 'Karnataka', fy25: 23961, fy26: 24890, msmeClosed: 467, jobsAffected: 3306 },
    { state: 'Telangana', fy25: null, fy26: null, msmeClosed: 329, jobsAffected: 2283 },
    { state: 'Rajasthan', fy25: null, fy26: null, msmeClosed: 552, jobsAffected: 2429 },
    { state: 'West Bengal', fy25: null, fy26: null, msmeClosed: 289, jobsAffected: 1836 },
    { state: 'Odisha', fy25: null, fy26: null, msmeClosed: 150, jobsAffected: 1670 },
    { state: 'Andhra Pradesh', fy25: null, fy26: null, msmeClosed: 283, jobsAffected: 1330 }
  ];

  var textileMsmeTotal = {
    units: 7894,
    jobs: 59374,
    window: '1 April 2023 to 31 March 2026',
    caveat: 'This window predates the reciprocal tariff regime. Closures in it reflect cotton prices, input costs and pre-existing competitiveness problems as much as the tariffs. It should not be read as a tariff-only death toll.'
  };

  var clusters = [
    {
      id: 'tiruppur',
      name: 'Tiruppur knitwear, Tamil Nadu',
      headline: 'Down 4.92% after growing 20% the year before',
      severity: 'severe',
      metrics: [
        { label: 'FY26 knitwear exports', value: '₹42,544cr', delta: -4.92, deltaLabel: 'from ₹44,747cr in FY25', tone: 'negative' },
        { label: 'Share of India knitwear output', value: '~60%', delta: null, deltaLabel: 'largest knitwear hub in India', tone: 'neutral' },
        { label: 'Estimated loss since announcement', value: '₹12bn', delta: null, deltaLabel: 'TEA estimate, as at Nov 2025', tone: 'negative' }
      ],
      summary: 'Tiruppur is the clearest case study in the episode. Exports to the US were still growing in the first half of FY26, then stopped as buyers paused ordering. The second half of the year saw a sharp slowdown on tariff uncertainty alone, compounded by West Asia shipping diversions and higher gas and crude costs.',
      effects: [
        'Nearly 90% of Tiruppur cotton garments go to the US, so the tariff landed on almost the entire book.',
        'The West Asia conflict closed the Suez route, forcing shipments around the Cape of Good Hope and adding days and cost to every container.',
        'Input costs rose on natural gas, crude, and shortages of chemicals and packaging material.',
        'Exports fell 4.92% in rupee terms but the decline was milder in dollars, which suggests currency weakness partially cushioned the hit.',
        'By mid-2026 order books had improved, and industry bodies expected 10-14% growth in the following year.',
        'The cluster is banking on the UK and EU FTAs, and on shifting capacity towards man-made fibre garments where it holds a bigger share.'
      ],
      recovery: 'Order inflows from the US and Europe recovered through 2026 and the AEPC expects 12-14% growth. TEA targets ₹1 lakh crore of annual exports by 2030, which would require a doubling from the FY26 base.',
      sources: 'Tiruppur Exporters Association; Apparel Export Promotion Council'
    },
    {
      id: 'surat',
      name: 'Surat textiles, Gujarat',
      headline: 'Held up, but the most closures of any state',
      severity: 'mixed',
      metrics: [
        { label: 'FY26 textile and apparel exports', value: '₹50,947cr', delta: 1.6, deltaLabel: 'from ₹50,150cr in FY25', tone: 'positive' },
        { label: 'Rank among states', value: '2nd', delta: null, deltaLabel: 'behind Tamil Nadu', tone: 'neutral' },
        { label: 'Textile MSME units closed', value: '1,402', delta: null, deltaLabel: 'highest in India, 9,038 jobs', tone: 'negative' }
      ],
      summary: 'Gujarat is the clearest case of a state whose aggregate export line grew while its small firms closed. Fabric, embroidery and diamonds are less US-concentrated than finished garments, so the headline number held. Beneath it, more textile MSME units shut than in any other state.',
      effects: [
        'The fabric and made-up segment faces the 10% Section 301 duty, but competes in a wider product set than finished garments.',
        'Diamond and gemstone cutting in Surat is exposed to the gems and jewellery downturn rather than the textile tariff directly.',
        'Gujarat is also the base for the semiconductor and chemicals projects, which are the state diversification story.',
        'TCDS assistance for integrated textile parks has concentrated on Gujarat, with ₹516 crore of central share approved and ₹432 crore released.'
      ],
      recovery: 'Aggregate exports still grew about 1.6% in FY26. The closure data is the more worrying series and extends over a three-year window that includes the tariffs but is not confined to them.',
      sources: 'Ministry of Textiles; DCMSME Udyam portal'
    },
    {
      id: 'ichalkaranji',
      name: 'Ichalkaranji and Bhiwandi, Maharashtra',
      headline: 'A shrinking export line in a diversifying state',
      severity: 'mixed',
      metrics: [
        { label: 'FY26 textile and apparel exports', value: '₹32,842cr', delta: -2.3, deltaLabel: 'from ₹33,611cr in FY25', tone: 'negative' },
        { label: 'Change from FY24', value: '-6.0%', delta: null, deltaLabel: '₹35,004cr in FY24', tone: 'negative' },
        { label: 'Textile MSME units closed', value: '1,276', delta: null, deltaLabel: '6,628 jobs', tone: 'negative' }
      ],
      summary: 'Maharashtra is the only major textile state whose export line fell in both FY25 and FY26. It is also the state pushing hardest on new capacity, with PM MITRA parks at Nagpur and Amravati and a 5F Farm to Foreign strategy.',
      effects: [
        'Two consecutive years of decline, the only top-six state in that position, suggest structural rather than purely tariff-driven weakness.',
        'Maharashtra has the highest combined TCDS central approval outside Gujarat at ₹451 crore, concentrated on integrated textile parks.',
        'Ichalkaranji is one of six Textile Export Facilitation Centres set up to help smaller exporters clear the compliance bar.',
        'The state is pushing man-made fibre and technical textiles, where the growth is, rather than commodity cotton.'
      ],
      recovery: 'Deputy Chief Minister Shinde has tied the state export strategy to the 5F approach and the Farm to Foreign conclave, and Amravati is intended to become a national apparel hub.',
      sources: 'Ministry of Textiles; ASSOCHAM Maharashtra; Fortune India'
    },
    {
      id: 'ludhiana',
      name: 'Ludhiana hosiery and Punjab',
      headline: 'The wool and knitwear side of the problem',
      severity: 'moderate',
      metrics: [
        { label: 'State textile and apparel exports', value: '₹15,120cr', delta: null, deltaLabel: 'FY25 basis, Punjab', tone: 'neutral' },
        { label: 'Textile MSME units closed', value: '87', delta: null, deltaLabel: '590 jobs, among the lowest', tone: 'neutral' },
        { label: 'TCDS central share for Punjab', value: '₹116.6cr', delta: null, deltaLabel: '₹112cr released', tone: 'positive' }
      ],
      summary: 'Ludhiana and the wider Punjab hosiery belt are the wool and winter-wear side of the export story, and the tariff episode has been less severe there than in the cotton knitwear belt. Fewer closures were recorded in Punjab than in any other large textile state.',
      effects: [
        'Punjab recorded only 87 textile MSME closures, against 1,402 in Gujarat and 1,309 in Tamil Nadu.',
        'Winter wear is more seasonally and fashion constrained, so the US buyer is less substitutable on lead time than for basics.',
        'The state received ₹116.56 crore of central share under the integrated textile park scheme.'
      ],
      recovery: 'Punjab is the least affected of the large textile states on the closure measure, and the most dependent on domestic and West Asian demand.',
      sources: 'Ministry of Textiles; DCMSME Udyam portal'
    },
    {
      id: 'up-noida',
      name: 'Noida and the UP garment belt',
      headline: 'The largest employment footprint of any cluster',
      severity: 'moderate',
      metrics: [
        { label: 'State textile and apparel exports', value: '₹34,829cr', delta: 9.5, deltaLabel: 'from ₹31,804cr in FY25', tone: 'positive' },
        { label: 'Textile MSME units closed', value: '440', delta: null, deltaLabel: '4,161 jobs', tone: 'negative' },
        { label: 'Growth from FY19-20', value: '+56%', delta: null, deltaLabel: '₹22,330cr base', tone: 'positive' }
      ],
      summary: 'Uttar Pradesh is the state where the tariff episode and the pre-existing growth story overlap most. Exports grew about 9.5% in FY26 and are up 56% on FY20, but 440 units still closed, and the Noida garment belt is where Reuters photographed the order-book hesitation.',
      effects: [
        'UP is also the base of the electronics manufacturing corridor, which is the more valuable part of the state export story.',
        'The garment belt around Noida employs large numbers at relatively low margins, so order hesitation passes through to hours worked quickly.',
        'The state has the fourth-highest MSME closure count after Gujarat, Tamil Nadu and Maharashtra.'
      ],
      recovery: 'Electronics and the mobile assembly corridor have more than offset the textile softness, which is why the state export line grew while textile units closed.',
      sources: 'Ministry of Textiles; Reuters; DCMSME Udyam portal'
    }
  ];

  /* ------------------------------------------------------------------ *
   * Currency, markets and capital flows
   * ------------------------------------------------------------------ */

  var rupee = {
    unit: 'US$ per US dollar',
    points: [
      { date: '2026-05-08', display: '8 May', value: 94.48, note: null },
      { date: '2026-05-14', display: '14 May', value: 95.64, note: null },
      { date: '2026-05-15', display: '15 May', value: 95.86, note: 'first close below 96' },
      { date: '2026-07-14', display: '14 Jul', value: 96.20, note: 'one-month low' },
      { date: '2026-07-24', display: '24 Jul', value: 96.96, note: 'record low intraday' },
      { date: '2026-08-14', display: '14 Aug', value: 95.4250, note: null },
      { date: '2026-08-19', display: '19 Aug', value: 95.7525, note: null },
      { date: '2026-09-01', display: '1 Sep', value: 95.05, note: 'best in two months' }
    ],
    recordLow: 96.3875,
    recordLowNote: 'All-time intraday low, May 2026',
    yearToDateLoss: 6,
    drivers: [
      { label: 'Crude oil', text: 'India imports close to 90% of its crude. Brent moved from about $87 in July to over $108 in May on West Asia escalation, and every dollar of the import bill lands in the trade account.' },
      { label: 'Foreign portfolio outflows', text: 'With US assets a safe haven during the West Asia conflict, FPI selling in Indian equities forced repatriation demand for dollars.' },
      { label: 'RBI intervention', text: 'State-run banks have sold dollars in both spot and non-deliverable forward markets through most of 2026. Two bankers estimated $8-9bn sold on a single Friday in late July.' },
      { label: 'A divided RBI', text: 'Reuters reported in July 2026 that officials were split on how aggressively to defend the rupee, with the current leadership favouring conserving reserves over smoothing.' }
    ],
    reserves: {
      headline: 675.2,
      headlineUnit: 'US$ billion',
      usable: 460,
      usableNote: 'Some analysts estimate usable reserves at roughly $460bn once gold holdings and forward positions are stripped out.',
      intervention: '$8-9bn',
      interventionNote: 'Estimated single-day dollar sales by the RBI in late July 2026.'
    }
  };

  var equityMarkets = {
    points: [
      { date: '2026-05-14', display: '14 May', sensex: 75237.99, nifty: 23643.50 },
      { date: '2026-05-15', display: '15 May', sensex: 76345.35, nifty: 23850.80 },
      { date: '2026-07-24', display: '24 Jul', sensex: 76059.77, nifty: 23767.45 },
      { date: '2026-08-14', display: '14 Aug', sensex: 77264.51, nifty: 24175.65 }
    ],
    events: [
      { date: '24 Jul 2026', text: 'Sensex closed 0.43% lower at 76,059.77, a fifth consecutive fall, as tariff headlines and West Asia escalation weighed on sentiment.' },
      { date: '29 Jul 2026', text: 'Sensex rose 867 points and Nifty topped 24,250, with India VIX falling 4% to 12.01, as tariff anxiety eased.' },
      { date: '14 Aug 2026', text: 'Sensex closed at 77,264.51 and Nifty at 24,175.65, up 0.43% and 0.35% respectively.' },
      { date: '2 Sep 2026', text: 'Nifty was down about 8.5% year to date, a weak run against a 7.8% GDP print for Q1 FY27.' }
    ],
    note: 'Indian equities recovered faster than the currency. The Sensex and Nifty were near record territory by August 2026 even with the rupee at record lows, which is the more unusual of the two facts.'
  };

  var macroSeries = {
    note: 'Selected indicators as reported. Wholesale inflation eased to 9.78% in July 2026 and consumer inflation was 4.45%, modestly above the RBI 4% target.',
    points: [
      { label: 'GDP growth, Q1 FY27', value: 7.8, unit: '%', note: 'Strong quarter, with exports and services both contributing' },
      { label: 'CPI inflation, July 2026', value: 4.45, unit: '%', note: 'Just above the 4% medium-term target' },
      { label: 'WPI inflation, July 2026', value: 9.78, unit: '%', note: 'Eased from June on lower energy costs' },
      { label: 'FX reserves', value: 675.2, unit: '$bn', note: 'Usable reserves estimated lower at about $460bn' },
      { label: 'Nifty, year to date', value: -8.5, unit: '%', note: 'Weak against global peers' },
      { label: 'Current account, FY26 projection', value: 0.9, unit: '% of GDP', note: 'CareEdge projection, held manageable' }
    ]
  };

  /* ------------------------------------------------------------------ *
   * Free trade agreements: India's diversification route
   * ------------------------------------------------------------------ */

  var agreements = {
    note: 'The 2025-26 FTA wave is the most substantive change to India export access in this period, and it lands in the same sectors the US tariffs hit.',
    list: [
      {
        partner: 'United Kingdom',
        abbr: 'CETA',
        status: 'In force',
        date: '15 Jul 2026',
        signed: 'July 2025',
        colour: 'navy',
        headline: 'Zero duty on most Indian goods from day one',
        detail: 'The Comprehensive Economic and Trade Agreement entered into force on 15 July 2026. Britain removed duties immediately on 96.8% of tariff lines, covering 97.7% of trade by value. India eliminated duties at once on 64.1% of tariff lines and phases out a further 21%.',
        sectors: 'Textiles, leather, footwear, marine products, gems and jewellery, processed foods and engineering goods all enter duty free. Marine, textile, leather, footwear and gems duties are eliminated outright.',
        scale: 'India exported $13.44bn of goods to Britain and imported $11.68bn in FY26. Bilateral services trade was $35.44bn in 2024, with India running a services surplus of about $7.9bn.',
        sideeffects: [
          'A Double Contribution Convention exempts eligible Indian professionals and employers from UK National Insurance for stays up to five years, benefiting about 75,000 workers and 900 employers.',
          'India opens its government procurement market worth about ₹114bn, against UK access to roughly £90bn.',
          'Passenger vehicle imports from India enter under a phased quota of 37,000 units a year at preferential rates.'
        ],
        dayone: 'Fifty consignments worth over $140m shipped on day one, including $10m of gold, diamond, silver and platinum jewellery from about 30 GJEPC members.',
        targets: [
          { label: 'Engineering exports to UK', from: '$4.7bn FY26', to: '$7.5bn by FY30', note: 'EEPC target' },
          { label: 'Gems and jewellery to UK', from: '$754m', to: '$2.5bn in three years', note: 'GJEPC target' },
          { label: 'Leather and footwear to UK', from: '$420m', to: '$1bn in three years', note: 'Industry target' }
        ]
      },
      {
        partner: 'European Union',
        abbr: 'FTA',
        status: 'Concluded 27 Jan 2026',
        date: 'Jan 2026',
        signed: '27 Jan 2026',
        colour: 'purple',
        headline: 'The largest agreement either side has ever concluded',
        detail: 'Negotiations concluded on 27 January 2026, covering a combined market of about 2 billion people and nearly a quarter of global GDP. India gains preferential access across 97% of tariff lines covering 99.5% of trade value, and the EU across 96.6% of lines.',
        sectors: 'Immediate duty elimination on 70.4% of tariff lines covering 90.7% of Indian exports, including textiles and apparel, leather and footwear, tea, coffee, spices, sports goods, toys, gems and jewellery and some marine products. A further 20.3% of lines get zero duty over three and five years.',
        scale: 'The EU is India largest trading partner, accounting for about €120bn of goods trade in 2024, or 11.5% of Indian trade. More than ₹2.87 lakh crore, roughly $33bn, of Indian exports currently facing EU duties of 4% to 26% go to zero on entry into force.',
        sideeffects: [
          'Leather and footwear tariffs of up to 17% go to zero, against EU imports from the rest of the world of about $100bn.',
          'Engineering exports of about $16.6bn gain access to a market of nearly $2 trillion, against Indian duties of up to 22%.',
          'India offers 92.1% of its tariff lines, covering 97.5% of EU exports, with 49.6% of lines eliminated immediately and the rest phased over five, seven and ten years.',
          'Self-certification of origin through a statement on origin lowers the compliance cost for smaller exporters.'
        ],
        dayone: null,
        targets: [
          { label: 'EU goods exports to India', from: '€120bn goods trade 2024', to: 'Potentially double by 2032', note: 'European Commission projection' }
        ]
      },
      {
        partner: 'EFTA (Switzerland, Norway, Iceland, Liechtenstein)',
        abbr: 'TEPA',
        status: 'In force',
        date: '1 Oct 2025',
        signed: '2025',
        colour: 'green',
        headline: 'The first of the wave, and the quietest',
        detail: 'The India-EFTA Trade and Economic Partnership Agreement entered into force on 1 October 2025. It covered about 5,800 tariff lines with an estimated 2% duty reduction on India exports to the EFTA bloc.',
        sectors: 'Gems and jewellery, pharmaceuticals, textiles and leather, with a side agreement on services and investment.',
        scale: 'Smaller in value than the UK and EU deals but it was the first of the new generation and set the negotiating template.',
        sideeffects: ['A side agreement on services and investment covers four EFTA economies on a most-favoured-nation basis.'],
        dayone: null,
        targets: []
      },
      {
        partner: 'Oman',
        abbr: 'CEPA',
        status: 'Signed Dec 2025',
        date: 'Dec 2025',
        signed: 'Dec 2025',
        colour: 'amber',
        headline: 'A small trade, a large logistics position',
        detail: 'The India-Oman CEPA was signed in December 2025 and covers tariff elimination on a long list of Indian goods alongside Indian investment commitments in Oman.',
        sectors: 'Petroleum, chemicals, textiles and leather, with Omani firms active in Indian logistics and petrochemicals.',
        scale: 'Strategically about shipping and the Strait of Hormuz, which became far more consequential after the West Asia conflict.',
        sideeffects: ['Gulf investment in Indian refining and petrochemicals predates the agreement.'],
        dayone: null,
        targets: []
      },
      {
        partner: 'New Zealand',
        abbr: 'FTA',
        status: 'Announced 22 Dec 2025',
        date: 'Dec 2025',
        signed: '22 Dec 2025',
        colour: 'navy',
        headline: 'Small but a clean first for agriculture',
        detail: 'The India-New Zealand FTA was announced on 22 December 2025 with a wide range of tariff commitments on both sides.',
        sectors: 'Agriculture, dairy, textiles, marine and pharmaceuticals.',
        scale: 'Modest two-way trade, but a notable precedent for agricultural access, which India treats as a red line in US talks.',
        sideeffects: [],
        dayone: null,
        targets: []
      }
    ]
  };

  /* ------------------------------------------------------------------ *
   * How other countries responded
   * ------------------------------------------------------------------ */

  var globalResponses = [
    {
      id: 'china-us',
      country: 'China',
      role: 'Principal rival and rare earth gatekeeper',
      tone: 'red',
      summary: 'Beijing holds the strongest retaliation available in the short run, because it controls the processing of rare earths, gallium, germanium and graphite that Western industry cannot easily replace. Its leverage is upstream, not downstream.',
      moves: [
        { label: 'Export controls on critical minerals', text: 'Controls on dual-use materials including rare earths, gallium, germanium, graphite and magnets were extended to Japan, explicitly tied to Tokyo stance on Taiwan. Rare earth exports to Japan fell 51% year on year in the first half of 2026, more than three times the 16% fall in overall Chinese rare earth exports.' },
        { label: 'Entity list retaliation', text: 'Ten US entities including rare earth miners MP Materials and USA Rare Earth were added to the export control list in June 2026, barring Chinese suppliers from selling them dual-use items.' },
        { label: 'Agricultural tariffs', text: 'China imposed a 54.3% flat rate on US pecans in August 2026 and 17.8% to 51.6% on Mexican pecans, following an anti-dumping investigation.' },
        { label: 'Trade truce', text: 'A November 2025 deal saw China commit to eliminating export controls on rare earths and to purchase US soybeans and sorghum. That truce is due to expire in November 2026, and both sides were negotiating an extension in September.' }
      ]
    },
    {
      id: 'eu-us',
      country: 'European Union',
      role: 'Allied, disappointed',
      tone: 'navy',
      summary: 'The EU signed a deal in Turnberry in 2025 and then saw the US raise tariffs on EU-made cars from 15% to 25% in May 2026, complaining that Brussels had not complied. Its response has been to invoke the deal and legislate domestically, not to retaliate.',
      moves: [
        { label: 'Car tariff dispute', text: 'The US moved EU-made car tariffs from 15% to 25% in May 2026. The German economy minister described intensive discussions with US officials, and the EU trade commissioner said both sides had concluded it was important to respect the Turnberry deal.' },
        { label: 'G7 critical minerals push', text: 'G7 trade ministers met in Paris in May 2026 on securing critical mineral supply chains. France framed it as a G7 presidency deliverable, with consensus on reducing China dependence but disagreement on how.' },
        { label: 'Defence against India', text: 'The EU imposed countervailing duties of 3.7% to 8.1% on Indian optical fibre cables in June 2025, an example of European trade defence running in the opposite direction.' }
      ]
    },
    {
      id: 'vietnam-cambodia',
      country: 'Vietnam, Cambodia, Indonesia, Malaysia',
      role: 'The beneficiaries, and then the targets',
      tone: 'green',
      summary: 'These four economies were the intended winners of the China-plus-one shift and did capture apparel orders. They were then given preferential textile tariff-rate quotas under the July 2026 US measure, which explicitly excluded India.',
      moves: [
        { label: 'Apparel order capture', text: 'Bangladesh stayed the second-largest apparel supplier to the US and ahead of China for a fourth consecutive month through January to April 2026, as Chinese shipments to the US fell more than 50%. Vietnam held the top supplier position with $5.16bn, Indonesia grew 2.3% and Cambodia expanded 14.1%.' },
        { label: 'Quota access', text: 'These four were named as eligible for tariff-rate quotas allowing specified textile and apparel shipments made with US-origin cotton and fibre to enter the US free of the Section 301 duty. India was excluded, which CITI called a disadvantage.' },
        { label: 'The qualification', text: 'Bangladesh exports to the US also declined in the period, so the China-plus-one opportunity redistributed share without expanding the total pie much.' }
      ]
    },
    {
      id: 'japan',
      country: 'Japan',
      role: 'Caught in the middle',
      tone: 'amber',
      summary: 'Japan has the largest rare earth magnet sector outside China and remains dependent on Chinese inputs. Chinese export controls triggered by a diplomatic rift over Taiwan comments have left it without gallium, dysprosium, terbium or yttrium shipments in some months.',
      moves: [
        { label: 'Critical minerals throttling', text: 'Chinese customs data showed no gallium, dysprosium, terbium or yttrium sent to Japan in June 2026, extending a throttling that began after comments by the Japanese prime minister in November.' },
        { label: 'Exports halved', text: 'Rare earth exports to Japan fell 51% year on year in the first half of 2026, against a 16% fall in overall Chinese rare earth exports.' }
      ]
    },
    {
      id: 'transshipment',
      country: 'The tariff-evasion question',
      role: 'A risk to India specifically',
      tone: 'red',
      summary: 'The US has placed India among the countries most at risk of being used to circumvent tariffs on Chinese goods, citing an estimated $67bn of goods allegedly transshipped through India, Mexico and Vietnam in 2025. India has requested further information and asked the GTRI to examine manufacturing and export data.',
      moves: [
        { label: 'The allegation', text: 'A US report alleged Chinese exporters were routing goods through more than forty countries, targeting the Pune-Gujarat-Chennai corridor for pumps and compressors.' },
        { label: 'The response', text: 'India has asked the US for more information on the shadow trans-shipment network claims and has itself asked the GTRI to check Indian manufacturing and export data.' },
        { label: 'Why it matters', text: 'The claim carries a tariff consequence independent of the original measures, and India is the only major economy in this group that is simultaneously a large beneficiary of a China-plus-one shift and an exporter of the machinery that shift uses.' }
      ]
    }
  ];

  /* ------------------------------------------------------------------ *
   * Scenarios for the outlook
   *
   * Deliberately conditional rather than predictive. Each is anchored to
   * something observable, and given a rough likelihood the author would
   * defend, with the indicator that would tell you it is happening.
   * ------------------------------------------------------------------ */

  var scenarios = [
    {
      id: 'framework-deal',
      name: 'A limited framework agreement is signed',
      likelihood: 'possible',
      probability: 35,
      tone: 'navy',
      headline: 'India gets a rate below Bangladesh and Cambodia, without the full package',
      detail: 'The framework announced in February 2026 is ready but unsigned. The realistic version of this scenario is not a comprehensive agreement on India terms, but a narrow trade arrangement that resolves the textile disadvantage and buys a rate advantage, leaving agriculture, dairy and the strategic purchases largely where they are.',
      triggers: [
        'A US rate for India below the 19% applied to Bangladesh, Cambodia, Indonesia and Malaysia',
        'Signature of the framework agreement following the Section 301 consultation closing',
        'Public confirmation that the textile quota exclusion is reversed'
      ],
      effects: [
        'Textile and apparel regain parity with the quota economies and CITI differential disadvantage ends.',
        'A rate advantage on a $11bn export line is worth more to the textile sector than several billion dollars of headline relief elsewhere.',
        'India continues to decline full concessions on agriculture and dairy, so the package stays narrow.'
      ],
      tells: 'Watch for a US Federal Register notice changing India tariff lines, or a joint ministerial statement after the next negotiating round.'
    },
    {
      id: 'status-quo',
      name: 'The low-duty status quo persists',
      likelihood: 'most likely',
      probability: 45,
      tone: 'saffron',
      headline: 'The 10% Section 301 levy stands, the framework stays unsigned, and the FTAs do the work',
      detail: 'This is the path of least resistance for both governments. India keeps the 10% additional duty, the framework remains ready but unsigned, and the diversification story runs through the UK, EU, EFTA and Oman agreements rather than through Washington.',
      triggers: [
        'No framework signature through the first half of FY28',
        'Continued FTA-driven export growth in textiles, leather, gems and engineering',
        'No new US measure on Indian goods beyond the existing 10% levy'
      ],
      effects: [
        'India export growth continues at recent rates, with the UK and EU taking the growth that the US did not.',
        'The textile quota exclusion persists as a structural disadvantage against four competitors.',
        'Gems and jewellery stays near a five-year low in the US while diversifying slowly into Europe.'
      ],
      tells: 'Watch India monthly export releases for UK and EU growth, and the GJEPC quarterly data for any US recovery.'
    },
    {
      id: 'escalation',
      name: 'Escalation via Section 301 or the Lindsey Graham Act',
      likelihood: 'possible',
      probability: 20,
      tone: 'red',
      headline: 'Tariffs rise again on trade-balance or transshipment grounds',
      detail: 'The Lindsey Graham Act, passed in September 2026, authorises tariffs of up to 100% on Indian exports. It is a statutory authority rather than an imposed measure, and the more likely route is a further Section 301 action on the transshipment allegations or a trade-balance justification.',
      triggers: [
        'A Section 301 determination following the consultation on the transshipment claims',
        'Invocation of the Lindsey Graham Act authority',
        'A fall in the bilateral surplus that Washington judges unsustainable'
      ],
      effects: [
        'The worst case is not unprecedented: India absorbed 50% for five and a half months.',
        'The bilateral surplus has already fallen from $40.88bn in FY25 to $34.41bn in FY26, mostly because imports from the US rose rather than exports fell.',
        'A transshipment finding would hit the Pune-Gujarat-Chennai engineering corridor, which is the fastest-growing part of the export base.'
      ],
      tells: 'Watch for US Federal Register notices, and the annual US trade deficit figure with India, which the White House has cited in past actions.'
    },
    {
      id: 'external-shock',
      name: 'An external shock dominates the tariff question',
      likelihood: 'plausible',
      probability: 25,
      tone: 'purple',
      headline: 'Oil and geopolitics matter more than tariffs in the next twelve months',
      detail: 'In 2026 the rupee record low, the Sensex path and Indian inflation were all driven more by West Asia crude prices and the resulting FPI outflows than by the US tariff schedule. The tariff episode has been, at the margin, a second-order driver of the Indian macroeconomy.',
      triggers: [
        'Brent sustained above $100, which would push the import bill and inflation together',
        'A Strait of Hormuz disruption, which India is especially exposed to through the Oman relationship',
        'RBI reserves depletion forcing a change in intervention policy'
      ],
      effects: [
        'Growth in textiles and apparel would come under pressure from energy and freight costs regardless of the US duty.',
        'A weaker rupee flatters exporters dollar revenue and cushions the tariff, but raises imported input costs.',
        'The Reserve Bank faces the hardest version of this trade-off: defend the currency, or defend reserves.'
      ],
      tells: 'Watch Brent, the RBI reserves figure, and whether the special deposit programme for overseas Indians continues to attract inflows.'
    }
  ];

  var scenarioProbabilityTotal = scenarios.reduce(function (a, s) { return a + s.probability; }, 0);

  /* ------------------------------------------------------------------ *
   * Employment
   * ------------------------------------------------------------------ */

  var employment = {
    caveat: 'Tariffs do not produce a clean employment count. The closure series below runs from April 2023, well before the reciprocal tariffs began, and reflects input costs and pre-existing competitiveness problems alongside them.',
    national: [
      { label: 'Textile MSME units closed, Apr 2023 to Mar 2026', value: '7,894', note: 'Registered on the Udyam portal' },
      { label: 'Jobs attached to those units', value: '59,374', note: 'Self-reported at closure' },
      { label: 'Textile jobs, India total', value: '~35 million', note: 'Industry estimate, direct and indirect' },
      { label: 'Cotton requirement FY26, projected', value: '337 lakh bales', note: 'Against 292 lakh bales of arrivals' }
    ],
    byState: stateTextileExports.filter(function (s) {
      return s.jobsAffected >= 1000;
    }).sort(function (a, b) { return b.jobsAffected - a.jobsAffected; }),
    mechanisms: [
      { label: 'Order hesitation, not cancellation', text: 'The first effect is hours worked and shift patterns, not headcount. Tiruppur exporters reported strong first-half orders and a sharp second-half slowdown as buyers waited to see the tariff outcome.' },
      { label: 'Margin compression', text: 'Where an exporter absorbs part of the duty to keep the order, the margin goes. That shows up as deferred maintenance, slower wage revisions and unpaid overtime before it shows up as closures.' },
      { label: 'MSME fragility', text: 'Small units carry the tariff because they have less pricing power and thinner cash buffers. Gujarat and Tamil Nadu together account for 2,711 of the 7,894 recorded closures.' },
      { label: 'Input cost shocks', text: 'The 11% import duty on cotton raised input costs, until it was temporarily removed from 1 June to 30 October 2026. Competing exporters could buy cotton at international prices throughout.' },
      { label: 'Freight and energy', text: 'The Cape of Good Hope diversion added days and cost to every container, and natural gas and crude prices rose at the same time. These are tariff-adjacent costs that do not appear in any duty calculation.' }
    ]
  };

  /* ------------------------------------------------------------------ *
   * Glossary
   * ------------------------------------------------------------------ */

  var glossary = [
    { t: 'MFN duty', d: 'The standard import duty the US applies to all trading partners equally. Every rate on this site is additional to MFN unless stated otherwise.', cat: 'Tariffs' },
    { t: 'Reciprocal tariff', d: 'The country-specific duty framework announced on 2 April 2025 under Executive Order 14257, struck down by the US Supreme Court in February 2026.', cat: 'Tariffs' },
    { t: 'Section 232', d: 'The national-security statute behind the steel, aluminium, copper, auto component and patented pharmaceutical duties. Applies to all partners.', cat: 'Tariffs' },
    { t: 'Section 301', d: 'The trade statute used for the 2026 forced-labour tariffs of 10% to 12.5% on 60 economies, including India, and also the basis of the transshipment allegations.', cat: 'Tariffs' },
    { t: 'IEEPA', d: 'International Emergency Economic Powers Act, the presidential emergency authority the administration relied on for the reciprocal tariffs, and which the Supreme Court ruling of February 2026 constrains.', cat: 'Tariffs' },
    { t: 'De minimis', d: 'The duty-free threshold for low-value shipments. Its suspension for China, Mexico and Canada was upheld by the US Court of International Trade in August 2026.', cat: 'Tariffs' },
    { t: 'Turnberry', d: 'The 2025 US-EU trade agreement, whose terms the US later disputed when raising EU car tariffs to 25% in May 2026.', cat: 'Tariffs' },
    { t: 'Tariff-rate quota', d: 'A threshold below which imports enter at a lower rate. The 2026 textile mechanism gave preferential access to Bangladesh, Cambodia, Indonesia and Malaysia but excluded India.', cat: 'Tariffs' },
    { t: 'TRQ', d: 'Tariff-rate quota. Same thing, abbreviated. Also used for agricultural quotas in the India-EU FTA for cars, steel and certain shrimp.', cat: 'Tariffs' },
    { t: 'RoDTEP', d: 'Remission of Duties and Taxes on Exported Products. Refunds embedded central, state and local levies as transferable e-scrips usable for customs duty.', cat: 'Export support' },
    { t: 'RoSCTL', d: 'Rebate of State and Central Taxes and Levies, the apparel-specific parallel to RoDTEP. Operational since March 2019.', cat: 'Export support' },
    { t: 'Duty drawback', d: 'Refund of customs duty on inputs used in exports. Claimable alongside RoDTEP in most cases.', cat: 'Export support' },
    { t: 'EPCG', d: 'Export Promotion Capital Goods. Permits duty-free import of machinery used to manufacture export goods.', cat: 'Export support' },
    { t: 'PLI', d: 'Production Linked Incentive, the domestic manufacturing subsidy scheme. The textiles PLI is one of the measures cited in the sector export-preparedness programme.', cat: 'Export support' },
    { t: 'PM MITRA', d: 'PM Mega Integrated Textile Regions and Apparel Parks. Includes the Nagpur and Amravati parks in Maharashtra, with 190.44 acres allotted in Tamil Nadu.', cat: 'Export support' },
    { t: 'TCDS', d: 'Textile Cluster Development Scheme, under which Gujarat received ₹516 crore of central share and Maharashtra ₹451 crore, for integrated textile parks.', cat: 'Export support' },
    { t: 'TEFC', d: 'Textile Export Facilitation Centre. Six have been set up, including at Ichalkaranji in Maharashtra, to help smaller exporters meet compliance requirements.', cat: 'Export support' },
    { t: 'AEPC', d: 'Apparel Export Promotion Council. The body that reported the Tiruppur order slowdown and the 12-14% growth expectation.', cat: 'Bodies' },
    { t: 'CITI', d: 'Confederation of Indian Textile Industry. Flagged the textile disadvantage created by the quota exclusion in July 2026.', cat: 'Bodies' },
    { t: 'GJEPC', d: 'Gem and Jewellery Export Promotion Council. Reported exports falling to a five-year low and the UK day-one shipment figures.', cat: 'Bodies' },
    { t: 'GTAI', d: 'Global Trade Research Initiative, the think tank that estimated about 70% of Indian exports to the US would face regular duties plus the new levy.', cat: 'Bodies' },
    { t: 'DGCI&S', d: 'Directorate General of Commercial Intelligence and Statistics, the source of the commodity-level export and import tables.', cat: 'Bodies' },
    { t: 'MPEDA', d: 'Marine Products Export Development Authority, source of the FY26 seafood export record.', cat: 'Bodies' },
    { t: 'Udyam', d: 'The MSME registration portal on which the textile closure counts are recorded. Closures are self-reported and the series is not complete.', cat: 'Bodies' },
    { t: 'DGFT', d: 'Directorate General of Foreign Trade, which issues RoDTEP and RoSCTL notifications.', cat: 'Bodies' },
    { t: 'CETA', d: 'Comprehensive Economic and Trade Agreement, the India-UK agreement in force from 15 July 2026.', cat: 'Agreements' },
    { t: 'CEPA', d: 'Comprehensive Economic Partnership Agreement, the form used for the India-Oman agreement.', cat: 'Agreements' },
    { t: 'TEPA', d: 'Trade and Economic Partnership Agreement, the India-EFTA instrument in force from 1 October 2025.', cat: 'Agreements' },
    { t: 'EFTA', d: 'European Free Trade Association: Switzerland, Norway, Iceland and Liechtenstein.', cat: 'Agreements' },
    { t: 'PSR', d: 'Product-specific rule of origin. The India-EU FTA requires adequate processing or manufacturing for a product to qualify for preferential access.', cat: 'Agreements' },
    { t: 'Statement on origin', d: 'Self-certification of origin under the India-EU FTA, which reduces the compliance cost for smaller exporters compared with a third-party certificate.', cat: 'Agreements' },
    { t: 'DCC', d: 'Double Contribution Convention. The India-UK social security agreement exempting eligible professionals from UK National Insurance for stays up to five years.', cat: 'Agreements' },
    { t: 'Current account deficit', d: 'The gap between exports and imports of goods and services. Projected at 0.9% of GDP for FY26.', cat: 'Macro' },
    { t: 'FPI', d: 'Foreign portfolio investor. FPI equity selling forces dollar repatriation and is a direct channel from risk-off sentiment to the rupee.', cat: 'Macro' },
    { t: 'NDF', d: 'Non-deliverable forward, an offshore rupee contract. RBI intervention in the NDF market is invisible in onshore spot data.', cat: 'Macro' },
    { t: 'VIX', d: 'The India VIX, the implied volatility index derived from Nifty options. It fell 4% to 12.01 on 29 July 2026 as tariff anxiety eased.', cat: 'Macro' },
    { t: 'India VIX reading of 12.01', d: 'Historically low implied volatility. Markets priced tariff resolution before the negotiation that would deliver it actually concluded.', cat: 'Macro' },
    { t: 'Ural-Brent spread', d: 'The discount Russian Urals crude fetches against Brent. Narrowing to about $3/bbl from roughly $20 in 2023 removed the main incentive for buying it.', cat: 'Macro' },
    { t: 'iCET', d: 'US-India Initiative on Critical and Emerging Technology, the bilateral framework for technology and supply chain cooperation.', cat: 'Agreements' },
    { t: 'SHANTI Act 2025', d: 'Indian legislation enabling foreign participation in the nuclear power sector, cited as a benefit of the framework agreement.', cat: 'Agreements' },
    { t: 'RMG', d: 'Ready-made garments. India is the third-largest exporter of ready-made garments to the US, behind Vietnam and Bangladesh.', cat: 'Sectors' },
    { t: 'MMF', d: 'Man-made fibre. The 5-10% of Tiruppur output that is not cotton, and the growth area, because Indian capacity is stronger in synthetic than natural fibres.', cat: 'Sectors' },
    { t: 'RMG pipeline', d: 'The order book, as distinct from the shipped value. The gap between the two during 2026 is exactly what the tariff uncertainty cost.', cat: 'Sectors' },
    { t: 'PMC', d: 'Pots, pans and compressors. The product category the US says is transshipped through the Pune-Gujarat-Chennai corridor.', cat: 'Sectors' },
    { t: 'Tariff incidence', d: 'Tariff incidence is not the same as exporter incidence. Absorbed margins, currency moves and buyer substitution all sit between the headline rate and the realised loss.', cat: 'Method' },
    { t: 'Attribution problem', d: 'West Asia crude prices, shipping diversions and the Russia-Ukraine war all moved Indian export numbers in the same period as the tariffs. Most sector deltas in 2026 cannot be cleanly attributed to the duties alone.', cat: 'Method' },
    { t: 'Five and a half months', d: 'How long Indian goods sat at 50% additional duty, from 28 August 2025 to 24 February 2026. Sectors exposed for the full period show the deepest damage.', cat: 'Method' }
  ];

  global.TARIFF_DATA = {
    lastVerified: lastVerified,
    headline: headline,
    timeline: timeline,
    section232: section232,
    costEstimates: costEstimates,
    sectors: sectors,
    monthlyExports: monthlyExports,
    monthlyDetail: monthlyDetail,
    categoryGrowth: categoryGrowth,
    competitorRates: competitorRates,
    exportBasket: exportBasket,
    macro: macro,
    response: response,
    openQuestions: openQuestions,
    bilateralTrade: bilateralTrade,
    destinations: destinations,
    chinaTrade: chinaTrade,
    stateTextileExports: stateTextileExports,
    textileMsmeTotal: textileMsmeTotal,
    clusters: clusters,
    rupee: rupee,
    equityMarkets: equityMarkets,
    macroSeries: macroSeries,
    agreements: agreements,
    globalResponses: globalResponses,
    scenarios: scenarios,
    scenarioProbabilityTotal: scenarioProbabilityTotal,
    employment: employment,
    glossary: glossary,
    sources: sources,
    method: method
  };
})(window);
