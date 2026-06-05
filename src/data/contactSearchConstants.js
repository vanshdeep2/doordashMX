import { FLAGGED_CALLS } from './teamleadConstants'

export const Q_NAMES = {
  q1: 'Resolution',
  q2: 'Diagnosis',
  q3: 'Efficiency',
  q4: 'Verification',
  q5: 'Escalation',
  q6: 'Expectation Setting',
  q7: 'Communication',
  q8: 'Callback',
  q9: 'Closing the Loop',
  q10: 'Merchant Appreciation',
  q11: 'Case Notes',
  q12: 'Internal Process',
  q13: 'Business Policy',
  q14: 'Compliance',
}

export const PASS_FAIL_QS = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8', 'q9', 'q11']

export const AGENT_SLUGS = {
  'Ayanda Mbeki': 'ayanda-mbeki',
  'Busisiwe Maseko': 'busisiwe-maseko',
  'Janine Jacobs': 'janine-jacobs',
  'Lerato Nkosi': 'lerato-nkosi',
  'Michael Naidoo': 'michael-naidoo',
  'Nomsa Dlamini': 'nomsa-dlamini',
  'Pieter Botha': 'pieter-botha',
  'Sipho Khumalo': 'sipho-khumalo',
  'Thabo van der Merwe': 'thabo-van-der-merwe',
  'Zanele Ndlovu': 'zanele-ndlovu',
}

export const DEFAULT_FILTERS = {
  agent: 'all',
  category: 'all',
  dateFrom: '2026-04-26',
  dateTo: '2026-05-30',
  scoreFilter: 'all',
  criticalOnly: false,
}

export const WEEK_BOUNDARIES = [
  { start: '2026-04-26', end: '2026-05-02' },
  { start: '2026-05-03', end: '2026-05-09' },
  { start: '2026-05-10', end: '2026-05-16' },
  { start: '2026-05-17', end: '2026-05-23' },
  { start: '2026-05-24', end: '2026-05-30' },
]

export const CF_QUICK_LINKS = FLAGGED_CALLS.filter((c) => c.callId.startsWith('DD-MX-CF')).map((c) => ({
  callId: c.callId,
  agent: c.agent,
  label: c.callId,
}))

export const SORTABLE_FIELDS = ['call_id', 'agent_name', 'call_date', 'call_category', 'qa_score']
