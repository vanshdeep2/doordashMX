import { useCallback, useEffect, useMemo, useState } from 'react'
import Nav from '../components/Nav'
import FlowBar from '../components/FlowBar'
import KPITile from '../components/KPITile'
import NBACard from '../components/NBACard'
import SparklineChart from '../components/charts/SparklineChart'
import HealthScoreRing from '../components/charts/HealthScoreRing'
import FinancialDonut from '../components/charts/FinancialDonut'
import {
  ACTUAL_AHT,
  CALLS_PILL,
  CROSS_KPI_PATTERNS,
  DEFAULTS,
  DRIVER_ROWS,
  LIVE_LABEL,
  TREND,
  WK5,
} from '../data/executiveConstants'
import { computeFinancials } from '../utils/financial'
import {
  computeHealthScore,
  healthArcColor,
  healthBandLabel,
  healthStatusColor,
} from '../utils/healthScore'
import { driverSignal, fcrClass } from '../utils/drivers'
import {
  formatAht,
  formatVariancePct,
  fmtUSD,
  fmtUSDK,
  fmtUSDWhole,
  varianceColourClass,
} from '../utils/format'
import '../styles/executive.css'

const COST_DONUT_COLORS = ['#c0392b', '#d9534f', '#e8806f']
const REV_DONUT_COLORS = ['#1a7a4a', '#228b5a', '#2fa870', '#5ac490']

const fmtPct = (v) => `${parseFloat(v.toFixed(1))}%`
const fmtCsat = (v) => v.toFixed(2)

function DrawerLineChart({ labels, data, color, formatValue }) {
  return (
    <div className="drawer-chart-wrap">
      <SparklineChart labels={labels} data={data} color={color} height={130} formatValue={formatValue} />
    </div>
  )
}

function DetailDrawer({ drawer, onClose, financials, targetAht }) {
  if (!drawer) return null

  const varianceClass = varianceColourClass(financials.variancePct)
  const varianceDir = financials.variancePct >= 0 ? 'up' : 'down'

  const titles = {
    trends: 'Operations Snapshot - Detail',
    cost: 'Cost Exposure - Full Breakdown',
    revenue: 'Revenue Opportunity - Full Breakdown',
  }

  return (
    <>
      <div className="drawer-overlay open" onClick={onClose} role="presentation" />
      <div className="drawer open">
        <div className="drawer-header">
          <div className="drawer-title">{titles[drawer]}</div>
          <button type="button" className="drawer-close" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        {drawer === 'trends' && (
          <>
            <div className="drawer-section">
              <div className="drawer-kpi-header">
                <div>
                  <div className="drawer-section-lbl">AHT · 5-week</div>
                  <div className="drawer-kpi-val val-amber">{formatAht(ACTUAL_AHT)}</div>
                  <div className="drawer-kpi-sub">
                    Target: <span>{formatAht(targetAht)}</span>
                  </div>
                  <div className={`drawer-kpi-chg ${varianceClass}`}>
                    <span className="drawer-kpi-arrow">{varianceDir === 'up' ? '↑' : '↓'}</span>{' '}
                    {formatVariancePct(financials.variancePct)} vs target
                  </div>
                </div>
                <div className="drawer-w5-badge">Week 5</div>
              </div>
              <DrawerLineChart labels={WK5} data={TREND.aht} color="#d97706" formatValue={formatAht} />
            </div>
            <div className="drawer-section">
              <div className="drawer-kpi-header">
                <div>
                  <div className="drawer-section-lbl">FCR · 5-week</div>
                  <div className="drawer-kpi-val val-amber">47%</div>
                  <div className="drawer-kpi-sub">5-week trend</div>
                  <div className="drawer-kpi-chg chg-green">↑ +5.1% WoW · +63% since Wk 1</div>
                </div>
                <div className="drawer-w5-badge">Week 5</div>
              </div>
              <DrawerLineChart labels={WK5} data={TREND.fcr} color="#d97706" formatValue={fmtPct} />
            </div>
            <div className="drawer-section">
              <div className="drawer-kpi-header">
                <div>
                  <div className="drawer-section-lbl">Escalation Rate · 5-week</div>
                  <div className="drawer-kpi-val val-red">17.5%</div>
                  <div className="drawer-kpi-sub">Target: 10%</div>
                  <div className="drawer-kpi-chg chg-red">↑ Process spike W4-W5 · legal/account change</div>
                </div>
                <div className="drawer-w5-badge">Week 5</div>
              </div>
              <DrawerLineChart labels={WK5} data={TREND.esc} color="#c0392b" formatValue={fmtPct} />
            </div>
            <div className="drawer-section">
              <div className="drawer-kpi-header">
                <div>
                  <div className="drawer-section-lbl">CSAT · 5-week</div>
                  <div className="drawer-kpi-val val-amber">3.91</div>
                  <div className="drawer-kpi-sub">/5 scale</div>
                  <div className="drawer-kpi-chg chg-green">↑ +22% since Wk 1 · held near Wk 4 peak</div>
                </div>
                <div className="drawer-w5-badge">Week 5</div>
              </div>
              <DrawerLineChart labels={WK5} data={TREND.csat} color="#d97706" formatValue={fmtCsat} />
            </div>
            <div className="drawer-section">
              <div className="drawer-kpi-header">
                <div>
                  <div className="drawer-lbl-row">
                    <div className="drawer-section-lbl">Transfer Rate · 5-week</div>
                    <span className="kpi-info-btn">
                      i
                      <span className="kpi-tooltip">
                        Transfer rate dropped significantly in weeks 4-5 following escalation coaching.
                      </span>
                    </span>
                  </div>
                  <div className="drawer-kpi-val val-green">0%</div>
                  <div className="drawer-kpi-sub">5-week trend</div>
                  <div className="drawer-kpi-chg chg-green">
                    <span className="trend-arrow">↑</span> Improving · down from 6.9% in week 1.
                  </div>
                </div>
                <div className="drawer-w5-badge">Week 5</div>
              </div>
              <DrawerLineChart labels={WK5} data={TREND.tr} color="#1a7a4a" formatValue={fmtPct} />
            </div>
            <div className="drawer-section">
              <div className="drawer-kpi-header">
                <div>
                  <div className="drawer-lbl-row">
                    <div className="drawer-section-lbl">RCR · 5-week</div>
                    <span className="kpi-info-btn">
                      i
                      <span className="kpi-tooltip">
                        Repeat contact rate signal is present in weeks 1-3 driven by payment resolution failures. Week 5 shows improvement.
                      </span>
                    </span>
                  </div>
                  <div className="drawer-kpi-val val-amber">0%</div>
                  <div className="drawer-kpi-sub">5-week trend</div>
                  <div className="drawer-kpi-chg chg-amber">
                    <span className="trend-arrow">↑</span> Week 5 at 0% · easing from Wk 2-3 peak
                  </div>
                </div>
                <div className="drawer-w5-badge">Week 5</div>
              </div>
              <DrawerLineChart labels={WK5} data={TREND.rcr} color="#d97706" formatValue={fmtPct} />
            </div>
            <div className="alert-box alert-amber">
              W4-W5 escalation rate spike driven by mandatory legal/policy and account-change escalations - process constraints, not agent error. FCR +5.1% WoW; transfer rate 0% in week 5. Prioritize FCR and first-contact resolution over strict AHT reduction.
            </div>
          </>
        )}

        {drawer === 'cost' && (
          <>
            <div className="drawer-section">
              <div className="drawer-section-lbl">
                5-week period · Total <span style={{ color: 'var(--red)' }}>{fmtUSD(financials.costTotal)}</span>
              </div>
              <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 14 }}>
                <div style={{ position: 'relative', width: 140, height: 140, flexShrink: 0 }}>
                  <FinancialDonut data={financials.costDonut} colors={COST_DONUT_COLORS} size={140} cutout="68%" />
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--red)' }}>{fmtUSD(financials.costTotal)}</div>
                    <div style={{ fontSize: 10, color: 'var(--light)' }}>5 weeks</div>
                  </div>
                </div>
                <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr', gap: 9 }}>
                  <div className="drawer-bucket">
                    <div className="drawer-bucket-val val-red">{fmtUSD(financials.wastePeriod)}</div>
                    <div className="drawer-bucket-lbl">Wasted handle time</div>
                    <div className="drawer-bucket-formula">(468 - target) × weekly calls × cost/min ÷ 60 × 5 weeks</div>
                  </div>
                  <div className="drawer-bucket">
                    <div className="drawer-bucket-val val-red">{fmtUSD(financials.repeat)}</div>
                    <div className="drawer-bucket-lbl">Repeat contact cost</div>
                    <div className="drawer-bucket-formula">9 repeats × (AHT ÷ 60 × cost/min)</div>
                  </div>
                  <div className="drawer-bucket">
                    <div className="drawer-bucket-val val-red">{fmtUSD(financials.escalation)}</div>
                    <div className="drawer-bucket-lbl">Escalation uplift</div>
                    <div className="drawer-bucket-formula">87 escalations × handle cost × (multiplier - 1)</div>
                  </div>
                </div>
              </div>
              <div className="alert-box alert-red">Annualised: {fmtUSDK(financials.annual)}</div>
            </div>
            <div className="drawer-section">
              <div className="drawer-section-lbl">Assumptions</div>
              <div className="alert-box alert-amber" style={{ marginBottom: 0 }}>
                Figures use standard demo assumptions for target AHT, cost per minute, escalation multiplier, and weekly volume.
              </div>
            </div>
          </>
        )}

        {drawer === 'revenue' && (
          <>
            <div className="drawer-section">
              <div className="drawer-section-lbl">
                5-week period · Total <span style={{ color: 'var(--green)' }}>{fmtUSD(financials.revTotal)}</span>
              </div>
              <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 14 }}>
                <div style={{ position: 'relative', width: 140, height: 140, flexShrink: 0 }}>
                  <FinancialDonut data={financials.revDonut} colors={REV_DONUT_COLORS} size={140} cutout="68%" />
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--green)' }}>{fmtUSD(financials.revTotal)}</div>
                    <div style={{ fontSize: 10, color: 'var(--light)' }}>5 weeks</div>
                  </div>
                </div>
                <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 9 }}>
                  <div className="drawer-bucket">
                    <div className="drawer-bucket-val val-green">{fmtUSD(financials.revCoaching)}</div>
                    <div className="drawer-bucket-lbl">AHT coaching at scale</div>
                    <div className="drawer-bucket-formula">Weekly waste × 5 weeks</div>
                  </div>
                  <div className="drawer-bucket">
                    <div className="drawer-bucket-val val-green">{fmtUSD(financials.revPayment)}</div>
                    <div className="drawer-bucket-lbl">Payment protocol</div>
                    <div className="drawer-bucket-formula">9 × handle cost + 9 × $15 churn proxy</div>
                  </div>
                  <div className="drawer-bucket">
                    <div className="drawer-bucket-val val-green">{fmtUSD(financials.revEscSave)}</div>
                    <div className="drawer-bucket-lbl">Escalation savings</div>
                    <div className="drawer-bucket-formula">Full escalation uplift recoverable</div>
                  </div>
                  <div className="drawer-bucket">
                    <div className="drawer-bucket-val val-green">{fmtUSD(financials.revFcr)}</div>
                    <div className="drawer-bucket-lbl">FCR uplift on payment contacts</div>
                    <div className="drawer-bucket-formula">4% × 63 payment contacts × handle cost</div>
                  </div>
                </div>
              </div>
              <div className="alert-box alert-green">Annualised: {fmtUSDK(financials.annualRev)}</div>
            </div>
            <div className="drawer-section">
              <div className="drawer-section-lbl">Assumptions</div>
              <div className="alert-box alert-amber" style={{ marginBottom: 0 }}>
                Figures use standard demo financial assumptions for this 5-week period.
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}

function FinancialSettingsDrawer({
  open,
  onClose,
  values,
  onChange,
  onReset,
}) {
  if (!open) return null

  return (
    <>
      <div className="drawer-overlay open" onClick={onClose} role="presentation" />
      <div className="drawer open">
        <div className="drawer-header">
          <div className="drawer-title">Financial Assumptions</div>
          <button type="button" className="drawer-close" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>
        <p className="drawer-subtitle">
          Adjust operational assumptions for this demo period. All cost and revenue figures update from these values.
        </p>
        <div className="drawer-field">
          <label htmlFor="input-target-aht">Target AHT (seconds)</label>
          <input
            id="input-target-aht"
            type="number"
            value={values.targetAht}
            onChange={(e) => onChange('targetAht', Number(e.target.value))}
          />
          <div className="drawer-helper">Default: 450 (7m 30s)</div>
        </div>
        <div className="drawer-field">
          <label htmlFor="input-cost-min">Cost per handle minute ($)</label>
          <input
            id="input-cost-min"
            type="number"
            step="0.01"
            value={values.costPerMin}
            onChange={(e) => onChange('costPerMin', Number(e.target.value))}
          />
          <div className="drawer-helper">Industry standard BPO rate for demo</div>
        </div>
        <div className="drawer-field">
          <label htmlFor="input-esc-mult">Escalation cost multiplier</label>
          <input
            id="input-esc-mult"
            type="number"
            step="0.1"
            value={values.escMultiplier}
            onChange={(e) => onChange('escMultiplier', Number(e.target.value))}
          />
          <div className="drawer-helper">Specialist cost as multiple of T1 handle cost</div>
        </div>
        <div className="drawer-field">
          <label htmlFor="input-weekly-calls">Weekly call volume</label>
          <input
            id="input-weekly-calls"
            type="number"
            value={values.weeklyCalls}
            onChange={(e) => onChange('weeklyCalls', Number(e.target.value))}
          />
        </div>
        <button type="button" className="btn-recalc" onClick={onClose}>
          Apply assumptions
        </button>
        <button type="button" className="drawer-reset" onClick={onReset}>
          Reset to defaults
        </button>
      </div>
    </>
  )
}

export default function Executive() {
  const [targetAht, setTargetAht] = useState(DEFAULTS.targetAht)
  const [costPerMin, setCostPerMin] = useState(DEFAULTS.costPerMin)
  const [escMultiplier, setEscMultiplier] = useState(DEFAULTS.escMultiplier)
  const [weeklyCalls, setWeeklyCalls] = useState(DEFAULTS.weeklyCalls)
  const [detailDrawer, setDetailDrawer] = useState(null)
  const [settingsOpen, setSettingsOpen] = useState(false)

  const financials = useMemo(
    () => computeFinancials({ targetAht, costPerMin, escMultiplier, weeklyCalls }),
    [targetAht, costPerMin, escMultiplier, weeklyCalls]
  )

  const health = useMemo(() => computeHealthScore(targetAht), [targetAht])
  const healthColor = healthArcColor(health.health)
  const statusColor = healthStatusColor(health.health)

  const closeDrawers = useCallback(() => {
    setDetailDrawer(null)
    setSettingsOpen(false)
  }, [])

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === 'Escape') closeDrawers()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [closeDrawers])

  const handleAssumptionChange = (key, value) => {
    const setters = {
      targetAht: setTargetAht,
      costPerMin: setCostPerMin,
      escMultiplier: setEscMultiplier,
      weeklyCalls: setWeeklyCalls,
    }
    setters[key](value)
  }

  const resetDefaults = () => {
    setTargetAht(DEFAULTS.targetAht)
    setCostPerMin(DEFAULTS.costPerMin)
    setEscMultiplier(DEFAULTS.escMultiplier)
    setWeeklyCalls(DEFAULTS.weeklyCalls)
  }

  const maxVol = Math.max(...DRIVER_ROWS.map((r) => r.volume))
  const ahtVarianceDir = financials.variancePct >= 0 ? 'up' : 'down'

  return (
    <>
      <Nav currentPage="executive" liveLabel={LIVE_LABEL} callsPill={CALLS_PILL} />

      <div className="page">
        <div className="briefing-kicker">QiQ Client Intelligence</div>
        <h1 className="briefing-title">DoorDash Intelligence Briefing</h1>
        <div className="briefing-subtitle">
          A weekly view of merchant support contact patterns, financial exposure, revenue opportunity, and the actions that need leadership attention.
        </div>

        <div className="connector">This period - at a glance.</div>
        <div className="hero">
          <div className="hero-left">
            <div className="hero-eyebrow">QiQ Weekly Intelligence · Week 5 of 5</div>
            <div className="hero-headline">
              Process and policy gaps drive escalations and customer dissatisfaction, while structured troubleshooting delivers multi-KPI gains
            </div>
            <div className="hero-narrative">
              <p>
                Week 5 closes with mandatory legal and account-change escalations still pressuring ER and satisfaction, while structured troubleshooting on routine store and access calls is delivering measurable gains. Focus this period on process redesign plus scaling what top agents already do well.
              </p>
            </div>
            <p className="hero-wow">vs last week: FCR +5.1% · AHT -0.9% · CSAT 3.91 (-2.4% vs target) · ER 17.5% (stable)</p>
            <div className="hero-chips">
              <div className="hero-chip chip-green">
                <span className="chip-dot" style={{ background: '#4ade80' }} />
                FCR +5.1% WoW · AHT -0.9% WoW · TR 0%
              </div>
              <div className="hero-chip chip-red">
                <span className="chip-dot" style={{ background: '#fca5a5' }} />
                ER 17.5% · legal/policy process bottleneck
              </div>
              <div className="hero-chip chip-green">
                <span className="chip-dot" style={{ background: '#4ade80' }} />
                Critical failures eliminated · 25 to 0 post coaching.
              </div>
            </div>
          </div>
          <div className="hero-divider" />
          <div className="hero-right">
            <div className="score-wrap">
              <HealthScoreRing score={health.health} color={healthColor} />
              <div className="score-inner">
                <div className="score-num">{health.health}</div>
                <div className="score-lbl-row">
                  <span className="score-lbl">Health</span>
                  <span className="score-info-btn">
                    i
                    <div className="score-tooltip">
                      <div className="score-tooltip-title">Health Score - how it&apos;s calculated</div>
                      <div className="score-tooltip-row">
                        <span className="score-tooltip-kpis">FCR – First Contact Resolution</span>
                        <span className="score-tooltip-wt">45%</span>
                      </div>
                      <div className="score-tooltip-row">
                        <span className="score-tooltip-kpis">Escalation Rate</span>
                        <span className="score-tooltip-wt">20%</span>
                      </div>
                      <div className="score-tooltip-row">
                        <span className="score-tooltip-kpis">AHT – Average Handle Time</span>
                        <span className="score-tooltip-wt">15%</span>
                      </div>
                      <div className="score-tooltip-row">
                        <span className="score-tooltip-kpis">Transfer Rate</span>
                        <span className="score-tooltip-wt">10%</span>
                      </div>
                      <div className="score-tooltip-row">
                        <span className="score-tooltip-kpis">RCR – Repeat Contact Rate</span>
                        <span className="score-tooltip-wt">10%</span>
                      </div>
                      <div className="score-tooltip-ranges">
                        <div className="score-tooltip-range">
                          <div className="score-tooltip-range-dot" style={{ background: '#1a7a4a' }} />
                          80–100 · Healthy
                        </div>
                        <div className="score-tooltip-range">
                          <div className="score-tooltip-range-dot" style={{ background: '#d97706' }} />
                          60–79 · Watch
                        </div>
                        <div className="score-tooltip-range">
                          <div className="score-tooltip-range-dot" style={{ background: '#c0392b' }} />
                          Below 60 · At risk
                        </div>
                      </div>
                      <div className="score-tooltip-breakdown">
                        FCR {Math.round(health.fcrScore)} · ER {Math.round(health.erScore)} · AHT {Math.round(health.ahtScore)} · TR {Math.round(health.trScore)} · RCR {Math.round(health.rcrScore)} → <strong style={{ color: 'rgba(255,255,255,0.85)' }}>{health.health}</strong>
                      </div>
                    </div>
                  </span>
                </div>
              </div>
            </div>
            <div className="score-status-row">
              <span className="score-status" style={{ color: statusColor }}>
                {healthBandLabel(health.health)}
              </span>
              <span className="score-vel">vs last week: FCR +5.1% · AHT -0.9%</span>
            </div>
          </div>
        </div>

        <div className="connector">Operations Snapshot · Week 5</div>
        <p className="connector-sub">Week 5 operational metrics vs target and 5-week trend.</p>
        <div className="trend-row">
          <KPITile
            label="AHT · 5-week"
            value={formatAht(ACTUAL_AHT)}
            target={`Target: ${formatAht(targetAht)}`}
            variance={`${formatVariancePct(financials.variancePct)} vs target`}
            varianceDirection={ahtVarianceDir}
            colour={financials.variancePct > 5 ? 'red' : financials.variancePct > 0 ? 'amber' : 'green'}
            onClick={() => setDetailDrawer('trends')}
          >
            <SparklineChart labels={WK5} data={TREND.aht} color="#d97706" formatValue={formatAht} />
          </KPITile>
          <KPITile
            label="FCR · 5-week"
            value="47%"
            target="5-week trend"
            changeText="↑ +5.1% WoW · +63% since Wk 1"
            colour="amber"
            onClick={() => setDetailDrawer('trends')}
          >
            <SparklineChart labels={WK5} data={TREND.fcr} color="#d97706" formatValue={fmtPct} />
          </KPITile>
          <KPITile
            label="Escalation Rate · 5-week"
            value="17.5%"
            target="Target: 10%"
            changeText="↑ Process spike W4-W5 · legal/account change"
            colour="red"
            onClick={() => setDetailDrawer('trends')}
          >
            <SparklineChart labels={WK5} data={TREND.esc} color="#c0392b" formatValue={fmtPct} />
          </KPITile>
        </div>

        <div className="connector">Cost of Poor Quality · May 2026</div>
        <p className="section-sublabel">Based on standard operational assumptions for this demo period</p>
        <div className="fin-row">
          <div className="fin-card" onClick={() => setDetailDrawer('cost')} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && setDetailDrawer('cost')}>
            <div className="fin-card-top">
              <div className="fin-label">Cost Exposure · 5-week period</div>
              <div className="fin-drill">View breakdown →</div>
            </div>
            <div className="fin-body">
              <div className="donut-wrap">
                <FinancialDonut data={financials.costDonut} colors={COST_DONUT_COLORS} />
                <div className="donut-centre">
                  <div className="donut-total val-red">{fmtUSD(financials.costTotal)}</div>
                  <div className="donut-total-lbl">5 weeks</div>
                </div>
              </div>
              <div className="fin-legend">
                <div className="leg-item">
                  <span className="leg-dot" style={{ background: '#c0392b' }} />
                  <span className="leg-label">Wasted handle time</span>
                  <span className="leg-val val-red">{fmtUSD(financials.wastePeriod)}</span>
                </div>
                <div className="leg-item">
                  <span className="leg-dot" style={{ background: '#d9534f' }} />
                  <span className="leg-label">Repeat contact cost</span>
                  <span className="leg-val val-red">{fmtUSD(financials.repeat)}</span>
                </div>
                <div className="leg-item">
                  <span className="leg-dot" style={{ background: '#e8806f' }} />
                  <span className="leg-label">Escalation uplift cost</span>
                  <span className="leg-val val-red">{fmtUSD(financials.escalation)}</span>
                </div>
                <div className="leg-divider" />
                <div className="leg-item">
                  <span className="leg-label" style={{ fontWeight: 600, color: 'var(--muted)' }}>Weekly waste</span>
                  <span className="leg-val val-red">{fmtUSD(financials.weekly)}</span>
                </div>
                <div className="leg-item">
                  <span className="leg-label" style={{ fontWeight: 600, color: 'var(--muted)' }}>Annualised</span>
                  <span className="leg-val val-red">{fmtUSDK(financials.annual)}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="fin-card" onClick={() => setDetailDrawer('revenue')} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && setDetailDrawer('revenue')}>
            <div className="fin-card-top">
              <div className="fin-label">Revenue Opportunity · 5-week period</div>
              <div className="fin-drill">View breakdown →</div>
            </div>
            <div className="fin-body">
              <div className="donut-wrap">
                <FinancialDonut data={financials.revDonut} colors={REV_DONUT_COLORS} />
                <div className="donut-centre">
                  <div className="donut-total val-green">{fmtUSD(financials.revTotal)}</div>
                  <div className="donut-total-lbl">addressable</div>
                </div>
              </div>
              <div className="fin-legend">
                <div className="leg-item">
                  <span className="leg-dot" style={{ background: '#1a7a4a' }} />
                  <span className="leg-label">AHT coaching at scale</span>
                  <span className="leg-val val-green">{fmtUSD(financials.revCoaching)}</span>
                </div>
                <div className="leg-item">
                  <span className="leg-dot" style={{ background: '#228b5a' }} />
                  <span className="leg-label">Payment protocol - repeat elimination</span>
                  <span className="leg-val val-green">{fmtUSD(financials.revPayment)}</span>
                </div>
                <div className="leg-item">
                  <span className="leg-dot" style={{ background: '#2fa870' }} />
                  <span className="leg-label">Escalation coaching savings</span>
                  <span className="leg-val val-green">{fmtUSD(financials.revEscSave)}</span>
                </div>
                <div className="leg-item">
                  <span className="leg-dot" style={{ background: '#5ac490' }} />
                  <span className="leg-label">FCR uplift on payment contacts</span>
                  <span className="leg-val val-green">{fmtUSD(financials.revFcr)}</span>
                </div>
                <div className="leg-divider" />
                <div className="leg-item">
                  <span className="leg-label" style={{ fontWeight: 600, color: 'var(--muted)' }}>Annualised</span>
                  <span className="leg-val val-green">{fmtUSDK(financials.annualRev)}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="net-card">
            <div className="net-eyebrow">Total value surfaced this period</div>
            <div className="net-val">{fmtUSD(financials.netTotal)}</div>
            <div className="net-sub">Cost exposure + revenue opportunity · 5-week period</div>
          </div>
        </div>

        <div className="coq-assumptions-row">
          <p className="coq-assumptions" style={{ marginBottom: 0, flex: 1 }}>
            Assumptions: cost per handle minute ${costPerMin.toFixed(2)} (industry standard BPO rate), target AHT {formatAht(targetAht)}, escalation specialist cost {escMultiplier}× T1 rate, merchant churn-risk proxy $15 per avoidable repeat contact. All figures are estimates based on operational data and standard demo assumptions.
          </p>
          <button type="button" className="metrics-cta" onClick={() => setSettingsOpen(true)}>
            Edit assumptions →
          </button>
        </div>

        <div className="connector">What is driving this.</div>
        <div className="driving-panel">
          <div className="driving-tab-bar">
            <span className="driving-tab">Contact drivers</span>
          </div>
          <div className="drivers-table-wrap">
            <table className="drivers-table">
              <thead>
                <tr>
                  <th>Subcategory</th>
                  <th>Volume</th>
                  <th>Share</th>
                  <th>FCR</th>
                  <th>AHT</th>
                  <th>Signal</th>
                </tr>
              </thead>
              <tbody>
                {DRIVER_ROWS.map((row) => {
                  const sig = driverSignal(row)
                  const barPct = Math.round((row.volume / maxVol) * 100)
                  const barCls = sig.cls === 'signal-green' ? 'vol-bar vol-bar-green' : 'vol-bar'
                  return (
                    <tr key={row.name}>
                      <td className="subcat-name">{row.name}</td>
                      <td>
                        <div className="vol-cell">
                          <span className="vol-num">{row.volume}</span>
                          <div className="vol-bar-wrap">
                            <div className={barCls} style={{ width: `${barPct}%` }} />
                          </div>
                        </div>
                      </td>
                      <td>{row.share}%</td>
                      <td className={fcrClass(row.fcr)}>{row.fcr}%</td>
                      <td className={row.aht > 480 ? 'aht-bad' : 'aht-ok'}>{formatAht(row.aht)}</td>
                      <td>
                        <span className={`signal-badge ${sig.cls}`}>{sig.label}</span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <div className="driving-cross-kpi">
            <div className="ckp-grid">
              {CROSS_KPI_PATTERNS.map((pattern) => (
                <div key={pattern.label} className="ckp-card">
                  <div className="ckp-label">{pattern.label}</div>
                  <div className="ckp-headline">{pattern.headline}</div>
                  <div className="ckp-body">{pattern.body}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="connector">Actions.</div>
        <div className="bottom-row">
          <div className="bottom-card">
            <div className="bottom-top">
              <div className="bottom-label">Decide now</div>
            </div>
            <div className="dec-row">
              <div className="dec-bar" style={{ background: 'var(--red)' }} />
              <div className="dec-body">
                <div className="dec-title">Deploy agent-accessible legal/policy FAQ and streamline escalation workflow with clear merchant timelines</div>
                <span className="dec-type type-pol">System</span>
              </div>
              <div className="dec-cost">-{fmtUSDWhole(financials.escalation)}</div>
            </div>
            <div className="dec-row">
              <div className="dec-bar" style={{ background: 'var(--amber)' }} />
              <div className="dec-body">
                <div className="dec-title">Implement proactive CRM status updates for all escalated account and payment cases</div>
                <span className="dec-type type-pol">Process</span>
              </div>
              <div className="dec-cost">↓ repeats</div>
            </div>
          </div>
          <div className="bottom-card">
            <div className="bottom-top">
              <div className="bottom-label">Ready to execute</div>
            </div>
            <NBACard
              number={1}
              title="Scale structured troubleshooting protocols and communication templates from Ayanda Mbeki and Janine Jacobs across all frontline teams"
              kpis={['FCR', 'AHT', 'CSAT']}
              impact="High"
            />
            <NBACard
              number={2}
              title="Automate diagnostic workflows for common payment and account issues to enable more in-call resolutions"
              kpis={['AHT', 'FCR', 'CSAT']}
              impact="Medium"
            />
            <NBACard
              number={3}
              title="Reinforce verification and recovery flows for account access - update knowledge base and training materials"
              kpis={['FCR', 'RCR']}
              impact={`-${fmtUSDWhole(financials.weekly)}/wk`}
            />
          </div>
          <div className="bottom-card">
            <div className="bottom-top">
              <div className="bottom-label">Watch next week</div>
            </div>
            <div className="watch-row">
              <div className="watch-dot" style={{ background: 'var(--red)' }} />
              <div>
                <div className="watch-title">Escalation rate ~17.5% - stable until process redesign</div>
                <div className="watch-proj">W4-W5 spike driven by mandatory legal/policy and account-change escalations. Track whether FAQ and workflow changes reduce ER without penalizing compliant agents.</div>
              </div>
            </div>
            <div className="watch-row">
              <div className="watch-dot" style={{ background: 'var(--amber)' }} />
              <div>
                <div className="watch-title">3 agents drive ~30% of medium-negative FCR calls</div>
                <div className="watch-proj">Concentrated FCR underperformance requires targeted coaching. Team FCR improved +5.1% WoW - sustain momentum with protocol scaling.</div>
              </div>
            </div>
            <div className="watch-row">
              <div className="watch-dot" style={{ background: 'var(--amber)' }} />
              <div>
                <div className="watch-title">CSAT 3.91/5 - near target, legal escalations remain drag</div>
                <div className="watch-proj">CSAT -2.4% vs target of 4.0. Routine calls strong; monitor whether status-update protocol and legal workflow changes lift CSAT above target within 2 weeks.</div>
              </div>
            </div>
          </div>
        </div>

        <FlowBar activePage="executive" />
      </div>

      <DetailDrawer
        drawer={detailDrawer}
        onClose={() => setDetailDrawer(null)}
        financials={financials}
        targetAht={targetAht}
      />

      <FinancialSettingsDrawer
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        values={{ targetAht, costPerMin, escMultiplier, weeklyCalls }}
        onChange={handleAssumptionChange}
        onReset={resetDefaults}
      />
    </>
  )
}
