export const TEAM_HEALTH_STATS = [
  { label: 'Team QA Score', value: '93.3', valueClass: 'val-green', sub: 'Avg quality score · Week 5' },
  { label: 'Critical Failures', value: '0', valueClass: 'val-green', sub: 'This week · Down from 29 in week 3' },
  { label: 'Agents Improving', value: '9/10', valueClass: 'val-green', sub: 'Quality score up vs week 1' },
  { label: 'TL Action Required', value: '2', valueClass: 'val-amber', sub: 'Agents needing intervention' },
]

export const MATRIX_ROWS = [
  { slug: 'michael-naidoo', name: 'Michael Naidoo', qaW5: 99.9, qaW1: 99.9, delta: 0.0, deltaClass: 'delta-flat', pa: '88.9%', rr: '4.4%', topic: 'Benchmark', status: 'Benchmark', badgeClass: 'badge-navy' },
  { slug: 'janine-jacobs', name: 'Janine Jacobs', qaW5: 100.0, qaW1: 79.2, delta: 20.8, deltaClass: 'delta-pos', pa: '100.0%', rr: '95.6%', topic: 'Closing and Verification', status: 'On Track', badgeClass: 'badge-green' },
  { slug: 'ayanda-mbeki', name: 'Ayanda Mbeki', qaW5: 95.7, qaW1: 55.7, delta: 40.0, deltaClass: 'delta-pos', pa: '100.0%', rr: '97.8%', topic: 'T1 Escalation Eligibility', status: 'On Track', badgeClass: 'badge-green' },
  { slug: 'nomsa-dlamini', name: 'Nomsa Dlamini', qaW5: 96.8, qaW1: 75.8, delta: 21.0, deltaClass: 'delta-pos', pa: '71.1%', rr: '53.3%', topic: 'Payment Resolution', status: 'On Track', badgeClass: 'badge-green' },
  { slug: 'pieter-botha', name: 'Pieter Botha', qaW5: 94.8, qaW1: 31.7, delta: 63.1, deltaClass: 'delta-pos', pa: '88.9%', rr: '0.0%', topic: 'Empathy and Communication', status: 'On Track', badgeClass: 'badge-green' },
  { slug: 'thabo-van-der-merwe', name: 'Thabo van der Merwe', qaW5: 97.2, qaW1: 99.8, delta: -2.6, deltaClass: 'delta-neg', pa: '100.0%', rr: '46.7%', topic: 'Handle Efficiency', status: 'Watch', badgeClass: 'badge-amber' },
  { slug: 'sipho-khumalo', name: 'Sipho Khumalo', qaW5: 96.9, qaW1: 44.3, delta: 52.6, deltaClass: 'delta-pos', pa: '100.0%', rr: '24.4%', topic: 'Legal Escalation Protocol', status: 'Watch', badgeClass: 'badge-amber' },
  { slug: 'zanele-ndlovu', name: 'Zanele Ndlovu', qaW5: 85.8, qaW1: 78.4, delta: 7.4, deltaClass: 'delta-pos', pa: '57.8%', rr: '100.0%', topic: 'Verification Compliance', status: 'Watch', badgeClass: 'badge-amber' },
  { slug: 'lerato-nkosi', name: 'Lerato Nkosi', qaW5: 85.0, qaW1: 72.2, delta: 12.8, deltaClass: 'delta-pos', pa: '17.8%', rr: '0.0%', topic: 'Deactivation Process Adherence', status: 'Action Needed', badgeClass: 'badge-red' },
  { slug: 'busisiwe-maseko', name: 'Busisiwe Maseko', qaW5: 86.0, qaW1: 80.3, delta: 5.7, deltaClass: 'delta-pos', pa: '31.1%', rr: '48.9%', topic: 'Structured Call Flow', status: 'Action Needed', badgeClass: 'badge-red' },
]

export const ALERT_AGENTS = [
  {
    slug: 'lerato-nkosi',
    name: 'Lerato Nkosi',
    status: 'Action Needed',
    badgeClass: 'badge-red',
    metrics: 'QA Score: 85.0 · PA: 17.8% · RR: 0.0% · CF total: 1',
    insight: 'Low process adherence due to missed identity verification and incomplete workflow steps. Resolution rate is zero in week 5 - all contacts escalated or unresolved.',
    action: 'Structured 1-on-1 session on identity verification and deactivation workflow. Review the permanent deactivation critical failure from week 2. Target: PA above 60% within 2 weeks.',
  },
  {
    slug: 'busisiwe-maseko',
    name: 'Busisiwe Maseko',
    status: 'Action Needed',
    badgeClass: 'badge-red',
    metrics: 'QA Score: 86.0 · PA: 31.1% · RR: 48.9% · CF total: 0',
    insight: 'Process adherence gaps in merchant identity verification and closing recaps. New agent profile - gaps are understandable but require structured support to close.',
    action: 'Pair with Janine Jacobs for peer coaching on verification and closing protocols. New agent support plan - daily check-in for 2 weeks.',
  },
]

export const COACHING_QUEUE = [
  { agent: 'Lerato Nkosi', topic: 'Deactivation Process Adherence', source: 'QA Cluster · PA 17.8%', deployed: 'Week 3', status: 'In Progress', badgeClass: 'badge-amber', outcome: 'PA improving but still below target - TL review required' },
  { agent: 'Busisiwe Maseko', topic: 'Structured Call Flow', source: 'QA Cluster · New agent profile', deployed: 'Week 3', status: 'In Progress', badgeClass: 'badge-amber', outcome: 'Steady improvement - AHT reducing week on week' },
  { agent: 'Zanele Ndlovu', topic: 'Verification Compliance', source: 'QA Cluster · PA 57.8%', deployed: 'Week 3', status: 'In Progress', badgeClass: 'badge-amber', outcome: 'PA improved from 15.6% to 57.8% - continuing' },
  { agent: 'Thabo van der Merwe', topic: 'Handle Efficiency', source: 'Ops Cluster · AHT 477s', deployed: 'Week 3', status: 'In Progress', badgeClass: 'badge-amber', outcome: 'AHT reducing - 477s to 467s - TL monitor' },
  { agent: 'Sipho Khumalo', topic: 'Legal Escalation Protocol', source: 'QA Cluster · Inconsistent PA', deployed: 'Week 3', status: 'Monitor', badgeClass: 'badge-amber', outcome: 'Week 4 strong, week 5 slight dip - reinforcement needed' },
  { agent: 'Nomsa Dlamini', topic: 'Payment Resolution Protocol', source: 'Ops Cluster · Repeat contacts', deployed: 'Week 3', status: 'Improving', badgeClass: 'badge-green', outcome: 'Repeat contacts eliminated weeks 4-5' },
  { agent: 'Ayanda Mbeki', topic: 'T1 Escalation Eligibility', source: 'Ops Cluster · ER pattern', deployed: 'Week 3', status: 'Improving', badgeClass: 'badge-green', outcome: 'PA 2.2% to 100% - dramatic improvement' },
  { agent: 'Pieter Botha', topic: 'Empathy and Communication', source: 'QA Cluster · CF count 80', deployed: 'Week 3', status: 'Improving', badgeClass: 'badge-green', outcome: 'QA 31.7 to 94.8 - CF eliminated' },
  { agent: 'Janine Jacobs', topic: 'Closing and Verification', source: 'QA Cluster · Generic closings', deployed: 'Week 3', status: 'Improving', badgeClass: 'badge-green', outcome: 'QA 79.2 to 100.0 - top performer' },
  { agent: 'Michael Naidoo', topic: 'Benchmark', source: '-', deployed: '-', status: 'Benchmark', badgeClass: 'badge-navy', outcome: '99.9 QA consistently - peer coaching source' },
]

export const COACHING_QUEUE_SUMMARY = [
  { text: '10 agents in queue', className: 'summary-chip' },
  { text: '5 improving', className: 'summary-chip summary-chip-green' },
  { text: '3 in progress', className: 'summary-chip summary-chip-amber' },
  { text: '1 monitoring', className: 'summary-chip summary-chip-amber' },
  { text: '1 benchmark', className: 'summary-chip summary-chip-muted' },
]

export const FLAGGED_CALLS = [
  { callId: 'DD-MX-CF0001', agent: 'Pieter Botha', date: '2026-05-06', category: 'Account Changes', flagReason: 'Critical failure · Dismissive conduct · Abrupt disconnection', flagClass: 'flag-badge-critical', qaScore: '0', qaClass: 'val-red' },
  { callId: 'DD-MX-CF0002', agent: 'Zanele Ndlovu', date: '2026-05-06', category: 'Account Security', flagReason: 'Critical failure · PII breach · Full credentials read back', flagClass: 'flag-badge-critical', qaScore: '0', qaClass: 'val-red' },
  { callId: 'DD-MX-CF0003', agent: 'Lerato Nkosi', date: '2026-05-13', category: 'Store Management', flagReason: 'Critical failure · Permanent deactivation without warning', flagClass: 'flag-badge-critical', qaScore: '0', qaClass: 'val-red' },
  { callId: 'DD-MX-CF0004', agent: 'Sipho Khumalo', date: '2026-05-13', category: 'Legal and Compliance', flagReason: 'Critical failure · Incorrect legal guidance provided', flagClass: 'flag-badge-critical', qaScore: '0', qaClass: 'val-red' },
  { callId: 'DD-MX-000247', agent: 'Busisiwe Maseko', date: '2026-05-07', category: 'Payment Issue', flagReason: 'Process adherence gap · Verification step skipped', flagClass: 'flag-badge-gap', qaScore: '62', qaClass: 'val-amber' },
]
