import { formatAht } from '../utils/format'

export const WK_LABELS = ['Wk 1', 'Wk 2', 'Wk 3', 'Wk 4', 'Wk 5']
export const COACHING_WEEK_INDEX = 2
export const AHT_ACTUAL = 467.8
export const AHT_TARGET = 450
export const TREND = {
  aht: [477.87, 471.15, 469.97, 472.13, 467.80],
  nps: [-8.53, 1.98, -1.12, 43.69, 39.05],
  fcr: [28.77, 31.68, 33.69, 44.68, 46.97],
  csat: [3.20, 3.35, 3.30, 3.92, 3.91],
  er: [1.96, 7.57, 3.27, 17.25, 17.47],
}
export const CF_WEEKLY = [25, 27, 29, 0, 0]
export const CF_BAR_COLORS = ['#c0392b', '#c0392b', '#c0392b', '#1a7a4a', '#1a7a4a']

export const COACHING_HEALTH_STATS = [
  { label: 'Deployed', value: '38', valueClass: '', sub: 'AI-generated sessions' },
  { label: 'Taken up', value: '24', valueClass: 'val-green', sub: 'Agent opened in QLens' },
  { label: 'In progress', value: '9', valueClass: 'val-amber', sub: 'Active coaching' },
  { label: 'Not touched', value: '0', valueClass: 'val-red', sub: 'All agents engaged this period' },
]

export const HERO_CHIPS = [
  { text: 'NPS +44 points · weeks 3→4', className: 'chip-green', dotColor: '#4ade80' },
  { text: 'FCR +13% · weeks 3→4', className: 'chip-green', dotColor: '#4ade80' },
  { text: 'Legal escalation bottleneck · structural issue', className: 'chip-amber', dotColor: '#fbbf24' },
]

export const HERO_STATS = [
  { value: '44pts', label: 'NPS improvement weeks 3-4' },
  { value: '13%', label: 'FCR improvement weeks 3-4' },
  { value: '0.62', label: 'CSAT improvement weeks 3-4' },
  { value: 'Week 3', label: 'Coaching intervention week' },
  { value: '2 of 4', label: 'Cross-KPI patterns improving' },
]

export const QUALITY_SUMMARY = [
  { value: 'Pieter Botha: 31.7 to 94.8', label: 'Biggest quality score improvement' },
  { value: 'Sipho Khumalo: 44.3 to 96.9', label: 'Most dramatic arc (inconsistent to consistent)' },
  { value: 'Janine Jacobs: 79.2 to 100.0', label: 'Top performer by week 5' },
  { value: 'Michael Naidoo: 99.9 all 5 weeks', label: 'Benchmark' },
]

export const AHT_WASTE = {
  items: [
    { label: 'Week 1 weekly waste', value: '$73.16/week', valueClass: 'val-red' },
    { label: 'Week 5 weekly waste', value: '$46.73/week', valueClass: 'val-red' },
    { label: '5-week total', value: '$285.92', valueClass: 'val-red' },
    { label: 'Annualised projection', value: '$2,973.52', valueClass: 'val-red' },
  ],
  delta: 'Down $26.43/week from week 1 - coaching-driven AHT efficiency',
}

export const COACHING_LEDGER_ROWS = [
  { agent: 'Thabo van der Merwe', issue: 'Week 1 - AHT 477s, elevated due to on-call policy review', topic: 'Handle Efficiency', deployed: 'Week 3 - Silent policy review protocol', outcome: 'AHT reduced to 467s - 10s improvement, trend continuing', badges: [{ text: 'In Progress', className: 'badge badge-amber' }, { text: 'TL action required', className: 'badge badge-tl' }], statusCell: true },
  { agent: 'Nomsa Dlamini', issue: 'Week 1 - Phantom payment resolutions, 9 repeat contacts', topic: 'Payment Resolution Protocol', deployed: 'Week 3 - Payment confirmation protocol', outcome: 'Repeat contacts dropped weeks 4-5, FCR improving', badges: [{ text: 'Improving', className: 'badge badge-green' }] },
  { agent: 'Ayanda Mbeki', issue: 'Week 1 - Premature escalation, 100% ER on store status', topic: 'T1 Escalation Eligibility', deployed: 'Week 3 - T1 troubleshooting and escalation eligibility', outcome: 'ER dropped, TR near zero weeks 4-5, structured resolution visible', badges: [{ text: 'Improving', className: 'badge badge-green' }] },
  { agent: 'Pieter Botha', issue: 'Week 1 - Low CSAT, abrupt communication style', topic: 'Empathy and Communication', deployed: 'Week 3 - Empathy and communication coaching', outcome: 'CSAT improving weeks 4-5, merchant feedback more positive', badges: [{ text: 'Improving', className: 'badge badge-green' }] },
  { agent: 'Zanele Ndlovu', issue: 'Week 1 - Verification gaps, PII oversharing', topic: 'Verification Compliance', deployed: 'Week 3 - Verification compliance coaching', outcome: 'Q4 and Q14 pass rates improving, no PII incidents weeks 4-5', badges: [{ text: 'Improving', className: 'badge badge-green' }] },
  { agent: 'Sipho Khumalo', issue: 'Weeks 1 and 3 - Inconsistent legal escalation handling', topic: 'Legal Escalation Protocol', deployed: 'Week 3 - Legal escalation protocol reinforcement', outcome: 'Week 4 strong, week 5 slight dip - monitoring required', badges: [{ text: 'Monitor', className: 'badge badge-amber' }, { text: 'TL action required', className: 'badge badge-tl' }], statusCell: true },
  { agent: 'Lerato Nkosi', issue: 'Week 2 - Permanent deactivation without irreversibility warning', topic: 'Deactivation Process Adherence', deployed: 'Week 3 - Deactivation confirmation protocol', outcome: 'Process adherence improved weeks 4-5, no further critical failures', badges: [{ text: 'Improving', className: 'badge badge-green' }] },
  { agent: 'Busisiwe Maseko', issue: 'Week 1 - New agent, high AHT, repeat questions', topic: 'Structured Call Flow', deployed: 'Week 3 - Structured call flow coaching', outcome: 'Steady AHT reduction across all 5 weeks, 599s → 490s', badges: [{ text: 'Improving', className: 'badge badge-green' }] },
  { agent: 'Janine Jacobs', issue: 'Week 1 - Generic closings, verification gaps', topic: 'Closing and Verification Protocol', deployed: 'Week 3 - Closing and verification protocol', outcome: 'Strong improvement weeks 4-5, approaching top performer tier', badges: [{ text: 'Improving', className: 'badge badge-green' }] },
  { agent: 'Michael Naidoo', issue: 'No coaching needed', topic: 'Benchmark', deployed: '-', outcome: 'Consistently high performance across all 5 weeks', badges: [{ text: 'Benchmark', className: 'badge badge-trophy' }] },
]

export const COACHING_LEDGER_SUMMARY = [
  { text: '9 agents coached', className: 'summary-chip' },
  { text: '7 improving', className: 'summary-chip summary-chip-green' },
  { text: '1 monitoring required', className: 'summary-chip summary-chip-amber' },
  { text: '1 benchmark', className: 'summary-chip summary-chip-trophy' },
  { text: '0 not touched', className: 'summary-chip summary-chip-muted' },
]

export const PATTERN_CARDS = [
  { variant: 'red', title: 'Legal/Policy Escalation Bottleneck', level: 'System level', body: 'A systemic inability for frontline agents to resolve or clarify legal/policy issues is driving mandatory escalations, unresolved calls, and negative merchant sentiment. 100% of legal contacts escalate at T1 level - this is a process/policy gap, not an agent performance issue.', tags: [{ text: 'ER +100%', className: 'tag tag-red' }, { text: 'FCR -70%', className: 'tag tag-red' }, { text: 'NPS -64pts', className: 'tag tag-red' }, { text: 'CSAT -2.0', className: 'tag tag-red' }] },
  { variant: 'green', title: 'Structured Troubleshooting Drives Multi-KPI Success', level: 'Team level - Best practice', body: 'Agents who consistently follow structured troubleshooting protocols achieve high FCR, low AHT, high NPS, and high CSAT. This pattern is the clearest evidence that coaching works - and the strongest case for scaling best practices across the full team.', tags: [{ text: 'AHT -35s', className: 'tag tag-green' }, { text: 'FCR +98%', className: 'tag tag-green' }, { text: 'NPS +53pts', className: 'tag tag-green' }, { text: 'CSAT +0.73', className: 'tag tag-green' }] },
  { variant: 'amber', title: 'Backend/Process Dependency Delays', level: 'System level', body: 'Calls requiring backend processing for payment discrepancies and account changes result in high AHT, low FCR, and lower CSAT. Agents follow correct protocol but cannot resolve in-call. Repeat contacts are driven by lack of proactive status updates on escalated cases, not agent error.', tags: [{ text: 'AHT +100-108s', className: 'tag tag-amber' }, { text: 'FCR -70%', className: 'tag tag-amber' }, { text: 'CSAT -1.19', className: 'tag tag-amber' }] },
  { variant: 'green', title: 'Escalation and Transfer Avoidance Improves All Metrics', level: 'Team level', body: 'Agents who resolve contacts without escalation or transfer consistently achieve lower handle times and higher satisfaction scores. The post-coaching improvement in weeks 4-5 directly validates this pattern - when agents attempt T1 resolution, every KPI improves. Cluster ER rose 1.96% to 17.47% over 5 weeks - appropriate escalation after coaching, not metric deterioration.', tags: [{ text: 'AHT -38s', className: 'tag tag-green' }, { text: 'CSAT +1.0', className: 'tag tag-green' }, { text: 'ER -21%', className: 'tag tag-green' }, { text: 'TR -15%', className: 'tag tag-green' }] },
]

export const BEST_PRACTICE_CARDS = [
  { title: 'Structured troubleshooting and clear communication', evidence: 'Evidence: AHT -35s below target · FCR +97.8% · NPS +53pts above target · CSAT +0.73 above target', agents: 'Agents: Janine Jacobs, Ayanda Mbeki (weeks 4-5)', rec: 'Recommendation: Scale structured troubleshooting protocols and communication templates across all frontline agents. Use peer coaching and best practice sharing from top agents.' },
  { title: 'Strict verification and recovery protocol adherence', evidence: 'Evidence: FCR +97.8% · NPS +53pts above target · Low RCR', agents: 'Agents: Janine Jacobs, Zanele Ndlovu (weeks 4-5)', rec: 'Recommendation: Reinforce training on verification and recovery flows. Ensure knowledge base is current and accessible to all agents.' },
]

export function getMetricsDrawerSections() {
  return [
    { id: 'kpi-aht-drawer', label: 'Average Handle Time', value: formatAht(AHT_ACTUAL), valueClass: 'val-amber', sub: `Target: ${formatAht(AHT_TARGET)}`, change: '+3.96% vs target', changeClass: 'chg-amber', dataKey: 'aht', color: '#d97706', note: "AHT improving gradually - Thabo van der Merwe's coaching producing consistent reduction" },
    { id: 'kpi-nps', label: 'Net Promoter Score', value: '39.05', valueClass: 'val-amber', sub: 'Target: 40', change: '-2.38% vs target', changeClass: 'chg-amber', dataKey: 'nps', color: '#1a7a4a', note: 'Dramatic improvement post coaching - week 4 exceeded target for first time' },
    { id: 'kpi-fcr-drawer', label: 'First Contact Resolution', value: '46.97%', valueClass: 'val-green', sub: 'No target set · Trending positive', dataKey: 'fcr', color: '#1a7a4a', note: 'Consistent improvement across all 5 weeks - structured troubleshooting protocols driving resolution quality' },
    { id: 'kpi-csat', label: 'Customer Satisfaction Score', value: '3.91', valueClass: 'val-amber', sub: 'Target: 4.0', change: '-2.36% vs target', changeClass: 'chg-amber', dataKey: 'csat', color: '#d97706', note: 'Strong recovery from week 3 low - week 3 dip followed by sharp improvement aligns with coaching deployment' },
    { id: 'kpi-er', label: 'Escalation Rate', value: '17.47%', valueClass: 'val-red', sub: 'Target: 10%', change: '+74.7% vs target', changeClass: 'chg-red', dataKey: 'er', color: '#c0392b', note: 'Legal and policy contacts still drive mandatory T1 escalations at the system level - separate from the coaching-success ER pattern above.', alert: 'ER rose from 1.96% (week 1) to 17.47% (week 5). This is not deterioration - it reflects coaching success. Agents who previously escalated prematurely showed artificially low ER. Post-coaching they attempt T1 resolution first and escalate only when genuinely needed, producing an appropriate ER.' },
  ]
}
