export const LTV_DEFAULT_ASSUMPTION_TEXT =
  'DoorDash average merchant LTV calculated from Q2 2025 public filings ($97B annualised GOV, ~700,000 merchants, 15% commission rate, 3-year average merchant lifetime based on 85%+ quarterly retention). Churn risk rates - critical failure 15%, repeat contact 10%, unresolved contact 8% - are industry standard BPO estimates. Unique merchants affected by critical failures estimated conservatively at 40 (from quality cluster analysis). All figures are estimates.'

export const RISK_LINES = [
  {
    key: 'cfRisk',
    title: 'Critical Failures',
    label: '40 merchants affected · 15% churn risk per incident',
    description:
      'Agent misconduct, PII breaches, and wrongful deactivation create significant churn risk. Each critical failure exposes DoorDash to potential merchant loss.',
    legendLabel: 'Critical failures',
    dotColor: '#c0392b',
  },
  {
    key: 'repeatRisk',
    title: 'Repeat Contacts',
    label: '9 merchants called back · 10% churn risk',
    description:
      'Merchants who contact support twice on the same issue have a measurably worse experience and elevated churn risk.',
    legendLabel: 'Repeat contacts',
    dotColor: '#d9534f',
  },
  {
    key: 'unresolvedRisk',
    title: 'Unresolved Contacts',
    label: '65 unresolved contacts · 8% churn risk',
    description:
      'Contacts that end without resolution - due to premature escalation or process failures - leave merchants without answers and at risk of disengagement.',
    legendLabel: 'Unresolved contacts',
    dotColor: '#e8806f',
  },
]

export const PROTECTED_LINES = [
  {
    key: 'cfProtected',
    title: 'Critical Failures Eliminated',
    label: 'Zero critical failures after coaching',
    description:
      'All weekly critical failures were eliminated following QiQ coaching. Zero agent misconduct incidents after coaching was applied.',
    legendLabel: 'Critical failures eliminated',
    dotColor: '#1a7a4a',
  },
  {
    key: 'repeatProtected',
    title: 'Repeat Contacts Eliminated',
    label: 'Zero repeat contacts after coaching',
    description:
      'Payment resolution protocol coaching - generated and deployed by QiQ - eliminated confirmed repeat contacts. Merchants are getting issues resolved on first contact.',
    legendLabel: 'Repeat contacts eliminated',
    dotColor: '#228b5a',
  },
]
