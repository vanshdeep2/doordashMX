import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Nav from '../components/Nav'
import FlowBar from '../components/FlowBar'
import HealthStatCard from '../components/HealthStatCard'
import LedgerTable from '../components/LedgerTable'
import DrawerShell from '../components/DrawerShell'
import SparklineChart from '../components/charts/SparklineChart'
import SparkBarChart from '../components/charts/SparkBarChart'
import { CALLS_PILL, LIVE_LABEL } from '../data/executiveConstants'
import {
  AHT_WASTE,
  BEST_PRACTICE_CARDS,
  CF_BAR_COLORS,
  CF_WEEKLY,
  COACHING_HEALTH_STATS,
  COACHING_LEDGER_ROWS,
  COACHING_LEDGER_SUMMARY,
  COACHING_WEEK_INDEX,
  HERO_CHIPS,
  HERO_STATS,
  PATTERN_CARDS,
  QUALITY_SUMMARY,
  TREND,
  WK_LABELS,
  getMetricsDrawerSections,
} from '../data/ccmConstants'
import { AGENT_SLUGS } from '../data/contactSearchConstants'
import { formatAht, fmtPct } from '../utils/format'
import '../styles/ccm.css'

const coachingWeekLabel = WK_LABELS[COACHING_WEEK_INDEX]

function DrawerTrendChart({ dataKey, color, formatValue }) {
  return (
    <div className="drawer-chart-wrap">
      <SparklineChart
        labels={WK_LABELS}
        data={TREND[dataKey]}
        color={color}
        height={130}
        formatValue={formatValue}
        coachingWeekLabel={coachingWeekLabel}
      />
    </div>
  )
}

export default function CCM() {
  const navigate = useNavigate()
  const [metricsDrawerOpen, setMetricsDrawerOpen] = useState(false)
  const drawerSections = getMetricsDrawerSections()

  const formatDrawerValue = (section, v) => {
    if (section.dataKey === 'aht') return formatAht(v)
    if (section.dataKey === 'fcr' || section.dataKey === 'er') return `${v.toFixed(2)}%`
    return v.toFixed(2)
  }

  return (
    <>
      <Nav currentPage="ccm" liveLabel={LIVE_LABEL} callsPill={CALLS_PILL} />
      <div className="page">
        <div className="briefing-kicker">QiQ Operations Intelligence</div>
        <h1 className="briefing-title">CCM / Operations Director</h1>
        <div className="briefing-subtitle">
          5-week performance trends · Coaching impact analysis · Team health overview · May 2026
        </div>

        <div className="connector">Intelligence Summary</div>
        <div className="hero">
          <div className="hero-left">
            <div className="hero-eyebrow">QiQ Operations Intelligence · Week 5 of 5</div>
            <div className="hero-headline">
              Coaching intervention at week 3 drives measurable improvement - NPS up 44 points, FCR up 13% in two weeks
            </div>
            <div className="hero-narrative">
              <p>
                The coaching deployment at week 3 has produced the clearest multi-KPI improvement seen in this analysis period - NPS moved from -1.12 in week 3 to 43.69 in week 4, FCR improved from 33.7% to 44.7%, and CSAT recovered from 3.30 to 3.92.
              </p>
              <p>
                Legal and policy escalation contacts remain a structural bottleneck - 100% of these contacts escalate at T1 level, suppressing FCR and driving negative NPS and CSAT scores that are unresolvable through agent coaching alone.
              </p>
              <p>
                Repeat contacts driven by backend-dependent payment issues represent a systemic process gap - agents follow correct protocol but cannot resolve in-call, leading to merchant frustration and callbacks.
              </p>
              <p>
                Three agents are showing strong post-coaching improvement trajectories while two agents handling legal and complex account contacts continue to show elevated handle times due to process constraints outside their control.
              </p>
            </div>
            <div className="hero-chips">
              {HERO_CHIPS.map((chip) => (
                <div key={chip.text} className={`hero-chip ${chip.className}`}>
                  <span className="chip-dot" style={{ background: chip.dotColor }} />
                  {chip.text}
                </div>
              ))}
            </div>
          </div>
          <div className="hero-divider" />
          <div className="hero-right">
            <div className="hero-stats">
              {HERO_STATS.map((stat) => (
                <div key={stat.label} className="hero-stat-row">
                  <span className="hero-stat-val">{stat.value}</span>
                  <span className="hero-stat-lbl">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="connector">Performance Trends · 5 Weeks</div>
        <div className="chart-section-head">
          <p className="section-sublabel">Coaching deployed at week 3 - improvement visible from week 4</p>
          <button type="button" className="metrics-cta" onClick={() => setMetricsDrawerOpen(true)}>
            See all metrics →
          </button>
        </div>
        <div className="chart-grid">
          <button type="button" className="chart-card" onClick={() => setMetricsDrawerOpen(true)}>
            <div className="chart-top">
              <div className="chart-top-main">
                <div className="chart-title">Average Handle Time</div>
                <div className="chart-current val-amber">7m 48s</div>
                <div className="chart-meta">Target: 7m 30s</div>
                <div className="chart-var chg-amber">+3.96% vs target</div>
              </div>
              <span className="chart-drill">All metrics →</span>
            </div>
            <div className="chart-area">
              <SparklineChart
                labels={WK_LABELS}
                data={TREND.aht}
                color="#d97706"
                height={140}
                formatValue={formatAht}
                coachingWeekLabel={coachingWeekLabel}
              />
            </div>
            <div className="chart-note">
              AHT improving gradually - Thabo van der Merwe&apos;s coaching producing consistent reduction
            </div>
          </button>

          <button type="button" className="chart-card" onClick={() => setMetricsDrawerOpen(true)}>
            <div className="chart-top">
              <div className="chart-top-main">
                <div className="chart-title">First Contact Resolution</div>
                <div className="chart-current val-green">46.97%</div>
                <div className="chart-meta">No target set · Trending positive</div>
              </div>
              <span className="chart-drill">All metrics →</span>
            </div>
            <div className="chart-area">
              <SparklineChart
                labels={WK_LABELS}
                data={TREND.fcr}
                color="#1a7a4a"
                height={140}
                formatValue={fmtPct}
                coachingWeekLabel={coachingWeekLabel}
              />
            </div>
            <div className="chart-note">
              Consistent improvement across all 5 weeks - structured troubleshooting protocols driving resolution quality
            </div>
          </button>

          <button
            type="button"
            className="chart-card"
            onClick={() => navigate('/search?criticalOnly=true')}
          >
            <div className="chart-top">
              <div className="chart-top-main">
                <div className="chart-title">Critical Failures per Week</div>
                <div className="chart-current val-green">0</div>
              </div>
              <span className="chart-drill">View contacts →</span>
            </div>
            <div className="chart-area">
              <SparkBarChart
                labels={WK_LABELS}
                data={CF_WEEKLY}
                barColors={CF_BAR_COLORS}
                coachingWeekLabel={coachingWeekLabel}
                height={140}
              />
            </div>
            <div className="chart-note">
              All 25-29 weekly critical failures were agent misconduct. Zero critical failures in weeks 4 and 5 following coaching deployment - the most significant improvement in this dataset.
            </div>
          </button>

          <div className="pattern-card pattern-card-green qi-summary-card">
            <div className="pattern-top">
              <div className="pattern-title">Quality Improvement Summary</div>
            </div>
            {QUALITY_SUMMARY.map((item) => (
              <div key={item.label} className="qi-stat-row">
                <div className="qi-stat-val">{item.value}</div>
                <div className="qi-stat-lbl">{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="connector">Coaching Health · Week 5</div>
        <div className="coaching-health">
          {COACHING_HEALTH_STATS.map((stat) => (
            <HealthStatCard key={stat.label} {...stat} />
          ))}
        </div>

        <div className="connector">AHT Waste Cost · Cluster Output</div>
        <p className="section-sublabel">Validated ops cluster figures for handle-time waste over the 5-week period</p>
        <div className="aht-waste-panel">
          <div className="aht-waste-grid">
            {AHT_WASTE.items.map((item) => (
              <div key={item.label} className="aht-waste-item">
                <div className="aht-waste-lbl">{item.label}</div>
                <div className={`aht-waste-val ${item.valueClass}`}>{item.value}</div>
              </div>
            ))}
          </div>
          <p className="aht-waste-delta">
            <strong>Down $26.43/week from week 1</strong> - coaching-driven AHT efficiency
          </p>
        </div>

        <div className="connector">Coaching Impact Ledger · 5-Week Period</div>
        <p className="section-sublabel">Tracking from insight identification through coaching deployment to measurable outcome</p>
        <LedgerTable
          columns={['Agent', 'Issue Identified', 'Coaching Topic', 'Coaching Deployed', 'Outcome (weeks 4-5)', 'Status']}
          summary={COACHING_LEDGER_SUMMARY}
          rows={COACHING_LEDGER_ROWS.map((row) => (
            <tr key={row.agent + row.topic}>
              <td>
                <Link to={`/agent/${AGENT_SLUGS[row.agent]}`} className="ledger-agent-link">
                  {row.agent}
                </Link>
              </td>
              <td>{row.issue}</td>
              <td>{row.topic}</td>
              <td>{row.deployed}</td>
              <td>{row.outcome}</td>
              <td className={row.statusCell ? 'status-cell' : undefined}>
                {row.badges.map((badge) => (
                  <span key={badge.text} className={badge.className}>
                    {badge.text}
                  </span>
                ))}
              </td>
            </tr>
          ))}
        />

        <div className="connector">Systemic Patterns Identified · Week 5</div>
        <p className="section-sublabel">Issues that span multiple KPIs and require structural or team-level intervention</p>
        <div className="pattern-grid">
          {PATTERN_CARDS.map((card) => (
            <div key={card.title} className={`pattern-card pattern-card-${card.variant}`}>
              <div className="pattern-top">
                <div className="pattern-title">{card.title}</div>
                <span className="pattern-level">{card.level}</span>
              </div>
              <div className="pattern-body">{card.body}</div>
              <div className="pattern-tags">
                {card.tags.map((tag) => (
                  <span key={tag.text} className={tag.className}>
                    {tag.text}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="connector">Validated Best Practices · Week 5</div>
        <div className="bp-grid">
          {BEST_PRACTICE_CARDS.map((card) => (
            <div key={card.title} className="bp-card">
              <div className="bp-title">{card.title}</div>
              <div className="bp-evidence">{card.evidence}</div>
              <div className="bp-agents">{card.agents}</div>
              <div className="bp-rec">{card.rec}</div>
            </div>
          ))}
        </div>

        <FlowBar activePage="ccm" />
      </div>

      <DrawerShell
        open={metricsDrawerOpen}
        onClose={() => setMetricsDrawerOpen(false)}
        title="Performance Trends - All Metrics"
        subtitle="5-week trends with coaching deployed at week 3. All metrics include the coaching intervention marker."
      >
        {drawerSections.map((section) => (
          <div key={section.id} className="drawer-section" id={section.id}>
            <div className="drawer-kpi-header">
              <div>
                <div className="drawer-section-lbl">{section.label}</div>
                <div className={`drawer-kpi-val ${section.valueClass}`}>{section.value}</div>
                <div className="drawer-kpi-sub">{section.sub}</div>
                {section.change && (
                  <div className={`drawer-kpi-chg ${section.changeClass}`}>{section.change}</div>
                )}
              </div>
              <div className="drawer-w5-badge">Week 5</div>
            </div>
            <DrawerTrendChart
              dataKey={section.dataKey}
              color={section.color}
              formatValue={(v) => formatDrawerValue(section, v)}
            />
            {section.alert && <div className="alert-box alert-amber">{section.alert}</div>}
            <div className="drawer-note">{section.note}</div>
          </div>
        ))}
      </DrawerShell>
    </>
  )
}
