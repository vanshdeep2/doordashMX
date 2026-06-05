import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Nav from '../components/Nav'
import FlowBar from '../components/FlowBar'
import SparkQaChart from '../components/charts/SparkQaChart'
import { AGENT_ORDER, AGENTS, COACHING_WEEK_INDEX, DEFAULT_SLUG, WK_LABELS } from '../data/agents'
import { CALLS_PILL, LIVE_LABEL } from '../data/executiveConstants'
import {
  formatDate,
  formatDelta,
  metricColor,
  statusBadgeClass,
} from '../utils/format'
import '../styles/agent.css'

export default function Agent() {
  const { agentSlug } = useParams()
  const navigate = useNavigate()
  const slug = agentSlug && AGENTS[agentSlug] ? agentSlug : DEFAULT_SLUG
  const agent = AGENTS[slug]
  const [evidenceOpen, setEvidenceOpen] = useState({})

  useEffect(() => {
    if (agentSlug && !AGENTS[agentSlug]) {
      navigate('/teamlead', { replace: true })
    }
  }, [agentSlug, navigate])

  useEffect(() => {
    setEvidenceOpen({})
  }, [slug])

  const delta = formatDelta(agent.qa_w5 - agent.qa_w1)
  const cfCls = agent.cf > 0 ? 'val-red' : 'val-green'
  const coachingLabel = WK_LABELS[COACHING_WEEK_INDEX]

  const roleSelect = (
    <label className="nav-role-wrap">
      <span className="nav-role-label">Viewing as:</span>
      <select
        className="nav-role-select"
        aria-label="View role"
        value="agent"
        onChange={(e) => {
          if (e.target.value === 'teamlead') navigate('/teamlead')
        }}
      >
        <option value="agent">Agent</option>
        <option value="teamlead">Team Leader</option>
      </select>
    </label>
  )

  return (
    <>
      <Nav
        currentPage="agent"
        liveLabel={LIVE_LABEL}
        callsPill={CALLS_PILL}
        navExtra={roleSelect}
      />
      <div className="page">
        <header className="agent-header">
          <div className="agent-header-toolbar">
            <Link to="/teamlead" className="back-btn">
              ← Back to Team Leader
            </Link>
            <div className="agent-select-wrap">
              <select
                className="agent-select"
                aria-label="Select agent"
                value={slug}
                onChange={(e) => navigate(`/agent/${e.target.value}`)}
              >
                {AGENT_ORDER.map((s) => (
                  <option key={s} value={s}>
                    {AGENTS[s].name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <h1 className="agent-name">{agent.name}</h1>
            <div className="agent-meta">
              <span>{agent.role}</span>
              <span className="agent-meta-sep">·</span>
              <span>
                Team lead: <strong>{agent.team}</strong>
              </span>
              <span className="agent-meta-sep">·</span>
              <span className="header-chip">
                QA W5 <strong className={metricColor(agent.qa_w5)}>{agent.qa_w5.toFixed(1)}</strong>
              </span>
              <span className="header-chip">
                PA <strong className={metricColor(agent.pa)}>{agent.pa.toFixed(1)}%</strong>
              </span>
              <span className="header-chip">
                RR <strong className={metricColor(agent.rr)}>{agent.rr.toFixed(1)}%</strong>
              </span>
              <span className="header-chip">
                CF <strong className={cfCls}>{agent.cf}</strong>
              </span>
            </div>
          </div>
        </header>

        <div className="perf-card">
          <div className="perf-metrics">
            <div className="perf-metric-main">
              <div className="perf-metric-lbl">QA Score · Week 5</div>
              <div className={`perf-metric-val ${metricColor(agent.qa_w5)}`}>
                {agent.qa_w5.toFixed(1)}
              </div>
              <div className="perf-metric-sub">
                Week 1: {agent.qa_w1.toFixed(1)} · <span className={delta.cls}>{delta.text}</span>
              </div>
            </div>
            <div className="perf-metric-grid">
              <div className="perf-metric-item">
                <div className="perf-item-lbl">Process Adherence</div>
                <div className={`perf-item-val ${metricColor(agent.pa)}`}>{agent.pa.toFixed(1)}%</div>
              </div>
              <div className="perf-metric-item">
                <div className="perf-item-lbl">Resolution Rate</div>
                <div className={`perf-item-val ${metricColor(agent.rr)}`}>{agent.rr.toFixed(1)}%</div>
              </div>
              <div className="perf-metric-item">
                <div className="perf-item-lbl">Critical Failures</div>
                <div className={`perf-item-val ${cfCls}`}>{agent.cf}</div>
              </div>
              <div className="perf-metric-item perf-status-item">
                <div className="perf-item-lbl">Status</div>
                <span className={`badge ${statusBadgeClass(agent.status)}`}>{agent.status}</span>
              </div>
            </div>
          </div>
          <div className="perf-spark-wrap">
            <div className="perf-spark-lbl">QA trend · 5 weeks</div>
            <div className="perf-spark-chart">
              <SparkQaChart
                labels={WK_LABELS}
                data={agent.qa_series}
                coachingWeekLabel={coachingLabel}
                height={120}
              />
            </div>
          </div>
        </div>

        <div className="connector">My Coaching This Week</div>
        <p className="section-sublabel">Coaching generated by QiQ from your call data</p>
        {agent.coaching.map((card, i) => {
          const evidenceId = `ev-${slug}-${i}`
          const isOpen = evidenceOpen[evidenceId]
          return (
            <div key={card.topic} className="coach-card">
              <div className="coach-card-top">
                <h3 className="coach-title">{card.topic}</h3>
                {card.type === 'strength' ? (
                  <span className="coach-badge coach-badge-green">Strength</span>
                ) : (
                  <span className="coach-badge coach-badge-amber">Development</span>
                )}
              </div>
              <p className="coach-body">{card.content}</p>
              <button
                type="button"
                className="evidence-toggle"
                aria-expanded={isOpen ? 'true' : 'false'}
                onClick={() =>
                  setEvidenceOpen((prev) => ({ ...prev, [evidenceId]: !prev[evidenceId] }))
                }
              >
                Evidence from your calls
              </button>
              {isOpen && (
                <div className="evidence-body">
                  <p>{card.evidence}</p>
                </div>
              )}
              {card.lms && (
                <button
                  type="button"
                  className="lms-link"
                  onClick={() => alert(`LMS module (demo only):\n\n${card.lms}`)}
                >
                  LMS Module: {card.lms}
                </button>
              )}
            </div>
          )
        })}

        <div className="connector">QiQ Performance Insight · Week 5</div>
        <div className="insight-card">{agent.insight}</div>

        <div className="connector">Coaching Thread</div>
        <p className="section-sublabel">Notes between you and {agent.team}</p>
        <div className="thread-panel">
          <div className="notes-list">
            {agent.notes.map((note) => {
              const isTl = note.role === 'Team Lead'
              return (
                <article key={`${note.from}-${note.date}`} className="note-card">
                  <div className="note-card-top">
                    <span className="note-card-name">{note.from}</span>
                    <span className={isTl ? 'note-badge-tl' : 'note-badge-agent'}>
                      {isTl ? 'Team Lead' : 'Agent'}
                    </span>
                    <span className="note-card-date">{formatDate(note.date)}</span>
                  </div>
                  <p className="note-card-body">{note.message}</p>
                </article>
              )
            })}
          </div>
          <p className="thread-footnote">
            Coaching notes are recorded by the team leader and shared here.
          </p>
        </div>

        <FlowBar activePage="agent" />
      </div>
    </>
  )
}
