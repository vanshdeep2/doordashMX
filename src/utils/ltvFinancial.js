export const LTV_DEFAULTS = {
  govBillions: 97,
  merchantCount: 700000,
  commissionRate: 15,
  lifetimeYears: 3,
  cfChurnRisk: 15,
  repeatChurnRisk: 10,
  unresolvedChurnRisk: 8,
}

const CF_MERCHANTS = 40
const REPEAT_MERCHANTS = 9
const UNRESOLVED_CONTACTS = 65

export function computeLtvFinancials(assumptions) {
  const {
    govBillions,
    merchantCount,
    commissionRate,
    lifetimeYears,
    cfChurnRisk,
    repeatChurnRisk,
    unresolvedChurnRisk,
  } = assumptions

  const commission = commissionRate / 100
  const ltvPerMerchant =
    (govBillions * 1e9 / merchantCount / 12) * commission * 12 * lifetimeYears

  const cfRisk = CF_MERCHANTS * (cfChurnRisk / 100) * ltvPerMerchant
  const repeatRisk = REPEAT_MERCHANTS * (repeatChurnRisk / 100) * ltvPerMerchant
  const unresolvedRisk = UNRESOLVED_CONTACTS * (unresolvedChurnRisk / 100) * ltvPerMerchant
  const totalRisk = cfRisk + repeatRisk + unresolvedRisk

  const cfProtected = cfRisk
  const repeatProtected = repeatRisk
  const totalProtected = cfProtected + repeatProtected

  return {
    ltvPerMerchant,
    cfRisk,
    repeatRisk,
    unresolvedRisk,
    totalRisk,
    cfProtected,
    repeatProtected,
    totalProtected,
  }
}
