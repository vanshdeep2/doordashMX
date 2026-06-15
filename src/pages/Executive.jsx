import { useCallback, useEffect, useMemo, useState } from 'react'
import Nav from '../components/Nav'
import FlowBar from '../components/FlowBar'
import KPITile from '../components/KPITile'
import NBACard from '../components/NBACard'
import SparklineChart from '../components/charts/SparklineChart'
import HealthScoreRing from '../components/charts/HealthScoreRing'
import FinancialDonut from '../components/charts/FinancialDonut'
import MerchantLtvSection from '../components/MerchantLtvSection'
import { LTV_DEFAULT_ASSUMPTION_TEXT } from '../data/ltvCopy'
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
import { computeLtvFinancials, LTV_DEFAULTS } from '../utils/ltvFinancial'
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

const LTV_FIELDS = [
  { id: 'govBillions', label: 'DoorDash annual Marketplace GOV ($B)', step: 1 },
  { id: 'merchantCount', label: 'Total merchant count', step: 1 },
  { id: 'commissionRate', label: 'Average commission rate (%)', step: 0.1 },
  { id: 'lifetimeYears', label: 'Average merchant lifetime (years)', step: 0.5 },
  { id: 'cfChurnRisk', label: 'Churn risk - critical failure (%)', step: 0.5 },
  { id: 'repeatChurnRisk', label: 'Churn risk - repeat contact (%)', step: 0.5 },
  { id: 'unresolvedChurnRisk', label: 'Churn risk - unresolved contact (%)', step: 0.5 },
]

function LtvSettingsDrawer({
  open,
  onClose,
  draft,
  onChange,
  onRecalculate,
  onReset,
}) {
  if (!open) return null

  return (
    <>
      <div className="drawer-overlay open" onClick={onClose} role="presentation" />
      <div className="drawer open">
        <div className="drawer-header">
          <div className="drawer-title">LTV Assumptions</div>
          <button type="button" className="drawer-close" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>
        <p className="drawer-subtitle">
          Adjust merchant LTV inputs. Click Recalculate to update all figures on the page.
        </p>
        {LTV_FIELDS.map((field) => (
          <div key={field.id} className="drawer-field">
            <label htmlFor={`input-ltv-${field.id}`}>{field.label}</label>
            <input
              id={`input-ltv-${field.id}`}
              type="number"
              step={field.step}
              value={draft[field.id]}
              onChange={(e) => onChange(field.id, Number(e.target.value))}
            />
          </div>
        ))}
        <button type="button" className="btn-recalc" onClick={onRecalculate}>
          Recalculate
        </button>
        <button type="button" className="drawer-reset" onClick={onReset}>
          Reset to defaults
        </button>
        <div className="drawer-assumption-info">
          <div className="drawer-assumption-info-heading">Assumption info</div>
          <div className="drawer-assumption-info-label">Default Assumption</div>
          <p className="drawer-assumption-info-text">{LTV_DEFAULT_ASSUMPTION_TEXT}</p>
        </div>
      </div>
    </>
  )
}

export default function Executive() {
  const [detailDrawer, setDetailDrawer] = useState(null)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [ltvAssumptions, setLtvAssumptions] = useState(LTV_DEFAULTS)
  const [ltvDraft, setLtvDraft] = useState(LTV_DEFAULTS)

  const financials = useMemo(() => computeFinancials(DEFAULTS), [])
  const ltv = useMemo(() => computeLtvFinancials(ltvAssumptions), [ltvAssumptions])

  const health = useMemo(() => computeHealthScore(DEFAULTS.targetAht), [])
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

  useEffect(() => {
    if (settingsOpen) setLtvDraft(ltvAssumptions)
  }, [settingsOpen, ltvAssumptions])

  const handleLtvDraftChange = (key, value) => {
    setLtvDraft((prev) => ({ ...prev, [key]: value }))
  }

  const handleLtvRecalculate = () => {
    setLtvAssumptions(ltvDraft)
    setSettingsOpen(false)
  }

  const resetLtvDefaults = () => {
    setLtvDraft({ ...LTV_DEFAULTS })
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
                        <span className="score-tooltip-kpis">FCR - First Contact Resolution</span>
                        <span className="score-tooltip-wt">45%</span>
                      </div>
                      <div className="score-tooltip-row">
                        <span className="score-tooltip-kpis">Escalation Rate</span>
                        <span className="score-tooltip-wt">20%</span>
                      </div>
                      <div className="score-tooltip-row">
                        <span className="score-tooltip-kpis">AHT - Average Handle Time</span>
                        <span className="score-tooltip-wt">15%</span>
                      </div>
                      <div className="score-tooltip-row">
                        <span className="score-tooltip-kpis">Transfer Rate</span>
                        <span className="score-tooltip-wt">10%</span>
                      </div>
                      <div className="score-tooltip-row">
                        <span className="score-tooltip-kpis">RCR - Repeat Contact Rate</span>
                        <span className="score-tooltip-wt">10%</span>
                      </div>
                      <div className="score-tooltip-ranges">
                        <div className="score-tooltip-range">
                          <div className="score-tooltip-range-dot" style={{ background: '#1a7a4a' }} />
                          80-100 · Healthy
                        </div>
                        <div className="score-tooltip-range">
                          <div className="score-tooltip-range-dot" style={{ background: '#d97706' }} />
                          60-79 · Watch
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
            target={`Target: ${formatAht(DEFAULTS.targetAht)}`}
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

        <MerchantLtvSection ltv={ltv} onOpenSettings={() => setSettingsOpen(true)} />

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
        targetAht={DEFAULTS.targetAht}
      />

      <LtvSettingsDrawer
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        draft={ltvDraft}
        onChange={handleLtvDraftChange}
        onRecalculate={handleLtvRecalculate}
        onReset={resetLtvDefaults}
      />
    </>
  )
}
