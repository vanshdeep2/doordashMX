export const ACTUAL_AHT = 467.8
export const REPEAT_CONTACTS = 9
export const UNNECESSARY_ESCALATIONS = 87
export const PAYMENT_CONTACTS = 63
export const MERCHANT_CHURN_PROXY = 15
export const PERIOD_WEEKS = 5

export const FCR = 47.0
export const CSAT = 3.91
export const ESC_RATE = 17.47
export const TR_RATE = 0.0
export const RCR_RATE = 0.0
export const ER_TARGET = 10
export const TR_TARGET = 15
export const RCR_TARGET = 10

export const DEFAULTS = {
  targetAht: 450,
  costPerMin: 0.35,
  escMultiplier: 1.5,
  weeklyCalls: 450,
}

export const WK5 = ['Wk 1', 'Wk 2', 'Wk 3', 'Wk 4', 'Wk 5']

export const TREND = {
  aht: [477.9, 471.1, 470.0, 472.1, 467.8],
  fcr: [28.8, 31.7, 33.7, 44.7, 47.0],
  esc: [1.96, 7.57, 3.27, 17.25, 17.47],
  csat: [3.20, 3.35, 3.30, 3.92, 3.91],
  tr: [6.90, 5.45, 5.74, 0.26, 0.0],
  rcr: [1.23, 2.09, 2.09, 0.53, 0.0],
}

export const DRIVER_ROWS = [
  { name: 'SMS 2FA Verification Failure', volume: 46, share: 10.2, fcr: 100, aht: 467, esc: 0 },
  { name: 'Store Not Appearing on DoorDash', volume: 44, share: 9.8, fcr: 93.2, aht: 464, esc: 6.8 },
  { name: 'Not Receiving Orders', volume: 43, share: 9.6, fcr: 86, aht: 470, esc: 14 },
  { name: 'Account Lockout', volume: 40, share: 8.9, fcr: 100, aht: 460, esc: 0 },
  { name: 'Missing Payout', volume: 39, share: 8.7, fcr: 92.3, aht: 485, esc: 7.7 },
]

export const CROSS_KPI_PATTERNS = [
  {
    label: 'Cross-KPI Pattern 1',
    headline: 'Legal and policy contacts hit a mandatory escalation wall',
    body: 'Frontline agents cannot resolve or clarify legal and policy issues under current workflows - 100% escalation on these calls, low FCR, and CSAT near 2.0. Merchants threaten legal action but mandatory escalation leaves issues unresolved. Sipho Khumalo and similar cases reflect process boundaries, not agent error.',
  },
  {
    label: 'Cross-KPI Pattern 2',
    headline: 'Structured troubleshooting drives AHT, FCR and CSAT together',
    body: 'Top performing agents demonstrate that structured troubleshooting and clear communication consistently achieve high FCR, low AHT, and strong CSAT - with week 5 showing the best practice pattern scaling across the team.',
  },
  {
    label: 'Cross-KPI Pattern 3',
    headline: 'Backend dependencies suppress FCR and inflate AHT on payment contacts',
    body: 'Payment discrepancies and account changes require backend processing agents cannot complete in-call - AHT +100s above target, FCR suppressed, and moderate CSAT. Agents follow process but real-time resolution is impossible, driving frustration and repeat contacts.',
  },
  {
    label: 'Cross-KPI Pattern 4',
    headline: 'End-to-end resolution is the strongest multi-KPI lever this period',
    body: 'Agents who resolve routine technical and account issues without escalation or transfer achieve lower handle times and higher satisfaction. Transfer rate at 0% this period - end-to-end resolution is the strongest operational lever for efficiency and merchant experience.',
  },
]

export const LIVE_LABEL = 'Live · May 2026'
export const CALLS_PILL = '2,250 calls analysed · 5 weeks'
