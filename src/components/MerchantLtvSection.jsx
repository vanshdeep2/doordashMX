import { useEffect, useState } from 'react'

import DonutWithCentre from './DonutWithCentre'

import LtvBreakdownDrawer from './LtvBreakdownDrawer'

import { PROTECTED_LINES, RISK_LINES } from '../data/ltvCopy'

import { fmtDonutCentre, fmtMillionShort, fmtUSDK } from '../utils/format'



const RISK_DONUT_COLORS = ['#c0392b', '#d9534f', '#e8806f']

const PROTECTED_DONUT_COLORS = ['#1a7a4a', '#228b5a']

const PERIOD_WEEKS = 5



function openBreakdown(setBreakdown, panel) {

  return (e) => {

    e.stopPropagation()

    setBreakdown(panel)

  }

}



function finCardKeyDown(setBreakdown, panel) {

  return (e) => {

    if (e.key === 'Enter' || e.key === ' ') {

      e.preventDefault()

      setBreakdown(panel)

    }

  }

}



export default function MerchantLtvSection({ ltv, onOpenSettings }) {

  const [breakdown, setBreakdown] = useState(null)



  useEffect(() => {

    if (!breakdown) return undefined

    function onKey(e) {

      if (e.key === 'Escape') setBreakdown(null)

    }

    document.addEventListener('keydown', onKey)

    return () => document.removeEventListener('keydown', onKey)

  }, [breakdown])



  const riskDonut = [ltv.cfRisk, ltv.repeatRisk, ltv.unresolvedRisk]

  const protectedDonut = [ltv.cfProtected, ltv.repeatProtected]

  const annualisedRisk = (ltv.totalRisk / PERIOD_WEEKS) * 52

  const annualisedProtected = (ltv.totalProtected / PERIOD_WEEKS) * 52

  const totalSurfaced = ltv.totalRisk + ltv.totalProtected
  const annualisedSurfaced = (totalSurfaced / PERIOD_WEEKS) * 52



  return (

    <>

      <div className="connector">Merchant LTV Impact Analysis · 5-Week Period</div>

      <div className="ltv-section-head">

        <p className="section-sublabel ltv-section-sublabel">

          Based on DoorDash public market data and quality cluster outputs · Adjust assumptions using view / edit assumptions

        </p>

        <button

          type="button"

          className="metrics-cta ltv-assumptions-cta"

          onClick={onOpenSettings}

        >

          View / edit assumptions

        </button>

      </div>



      <div className="fin-row">

        <div

          className="fin-card"

          onClick={() => setBreakdown('risk')}

          role="button"

          tabIndex={0}

          onKeyDown={finCardKeyDown(setBreakdown, 'risk')}

        >

          <div className="fin-card-top">

            <div className="fin-label">Merchant LTV at Risk · Pre-coaching baseline</div>

            <div className="fin-drill" onClick={openBreakdown(setBreakdown, 'risk')}>

              View breakdown →

            </div>

          </div>

          <div className="fin-body">

            <DonutWithCentre

              data={riskDonut}

              colors={RISK_DONUT_COLORS}

              total={ltv.totalRisk}

              valueClass="val-red"

            />

            <div className="fin-legend">

              {RISK_LINES.map((line) => (

                <div key={line.key} className="leg-item">

                  <span className="leg-dot" style={{ background: line.dotColor }} />

                  <span className="leg-label">{line.legendLabel}</span>

                  <span className="leg-val val-red">{fmtDonutCentre(ltv[line.key])}</span>

                </div>

              ))}

              <div className="leg-divider" />

              <div className="leg-item">

                <span className="leg-label" style={{ fontWeight: 600, color: 'var(--muted)' }}>

                  Annualised

                </span>

                <span className="leg-val val-red">{fmtUSDK(annualisedRisk)}</span>

              </div>

            </div>

          </div>

        </div>



        <div

          className="fin-card"

          onClick={() => setBreakdown('protected')}

          role="button"

          tabIndex={0}

          onKeyDown={finCardKeyDown(setBreakdown, 'protected')}

        >

          <div className="fin-card-top">

            <div className="fin-label">LTV Protected by Coaching · QiQ impact</div>

            <div className="fin-drill" onClick={openBreakdown(setBreakdown, 'protected')}>

              View breakdown →

            </div>

          </div>

          <div className="fin-body">

            <DonutWithCentre

              data={protectedDonut}

              colors={PROTECTED_DONUT_COLORS}

              total={ltv.totalProtected}

              valueClass="val-green"

            />

            <div className="fin-legend">

              {PROTECTED_LINES.map((line) => (

                <div key={line.key} className="leg-item">

                  <span className="leg-dot" style={{ background: line.dotColor }} />

                  <span className="leg-label">{line.legendLabel}</span>

                  <span className="leg-val val-green">{fmtDonutCentre(ltv[line.key])}</span>

                </div>

              ))}

              <div className="leg-divider" />

              <div className="leg-item">

                <span className="leg-label" style={{ fontWeight: 600, color: 'var(--muted)' }}>

                  Annualised

                </span>

                <span className="leg-val val-green">{fmtUSDK(annualisedProtected)}</span>

              </div>

            </div>

          </div>

        </div>



        <div className="net-card">

          <div className="net-eyebrow">Total LTV impact surfaced this period</div>

          <div className="net-val">{fmtMillionShort(totalSurfaced)}</div>

          <div className="net-sub">Merchant LTV at risk + LTV protected by coaching</div>

          <div className="net-annualised">Annualised · {fmtUSDK(annualisedSurfaced)}</div>

        </div>

      </div>



      <div className="ltv-assumptions-card">

        Assumptions: DoorDash average merchant LTV calculated from Q2 2025 public filings ($97B annualised GOV,

        ~700,000 merchants, 15% commission rate, 3-year average merchant lifetime based on 85%+ quarterly retention).

        Churn risk rates - critical failure 15%, repeat contact 10%, unresolved contact 8% - are industry standard BPO

        estimates. Unique merchants affected by critical failures estimated conservatively at 40 (from quality cluster

        analysis). All figures are estimates. Update assumptions using view / edit assumptions.

      </div>



      <LtvBreakdownDrawer panel={breakdown} ltv={ltv} onClose={() => setBreakdown(null)} />

    </>

  )

}

