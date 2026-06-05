import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Nav from '../components/Nav'
import FlowBar from '../components/FlowBar'
import HealthStatCard from '../components/HealthStatCard'
import LedgerTable from '../components/LedgerTable'
import DrawerShell from '../components/DrawerShell'
import SparkAgentCard from '../components/SparkAgentCard'
import { CALLS_PILL, LIVE_LABEL } from '../data/executiveConstants'
import { SPARK_DATA, SPARK_PREVIEW_SLUGS } from '../data/agents'
import {
  ALERT_AGENTS,
  COACHING_QUEUE,
  COACHING_QUEUE_SUMMARY,
  FLAGGED_CALLS,
  MATRIX_ROWS,
  TEAM_HEALTH_STATS,
} from '../data/teamleadConstants'
import '../styles/teamlead.css'

export default function TeamLead() {
  const navigate = useNavigate()
  const [agentsDrawerOpen, setAgentsDrawerOpen] = useState(false)

  const previewAgents = useMemo(
    () => SPARK_PREVIEW_SLUGS.map((slug) => SPARK_DATA.find((a) => a.slug === slug)).filter(Boolean),
    [],
  )

  const matrixRows = MATRIX_ROWS.map((row) => {
    const deltaText = row.deltaClass === 'delta-flat' ? '0.0' : `${row.delta > 0 ? '+' : ''}${row.delta.toFixed(1)}`
    return (
      <tr key={row.slug} onClick={() => navigate(`/agent/${row.slug}`)} role="link" tabIndex={0}>
        <td>{row.name}</td>
        <td>{row.qaW5.toFixed(1)}</td>
        <td>{row.qaW1.toFixed(1)}</td>
        <td className={row.deltaClass}>{deltaText}</td>
        <td>{row.pa}</td>
        <td>{row.rr}</td>
        <td>{row.topic}</td>
        <td>
          <span className={`badge ${row.badgeClass}`}>{row.status}</span>
        </td>
      </tr>
    )
  })

  return (
    <>
      <Nav currentPage="teamlead" liveLabel={LIVE_LABEL} callsPill={CALLS_PILL} />
      <div className="page">
        <div className="briefing-kicker">QiQ Team Intelligence</div>
        <h1 className="briefing-title">Team Leader View</h1>
        <div className="briefing-subtitle">
          Kagiso de Villiers · 10 agents · Week 5 of 5 · May 2026
        </div>

        <div className="connector">Team Health Summary</div>
        <div className="coaching-health">
          {TEAM_HEALTH_STATS.map((stat) => (
            <HealthStatCard key={stat.label} {...stat} />
          ))}
        </div>

        <div className="connector">Agent Performance Matrix · Week 5</div>
        <p className="section-sublabel">
          Quality score, process adherence, resolution rate, and coaching status for all 10 agents
        </p>
        <LedgerTable
          tableClassName="matrix-table"
          columns={[
            'Agent',
            'QA Score (W5)',
            'QA Score (W1)',
            'Delta',
            'Process Adherence',
            'Resolution Rate',
            'Coaching Topic',
            'Status',
          ]}
          rows={matrixRows}
        />

        <div className="connector">Agents Needing Attention</div>
        <p className="section-sublabel">QiQ-flagged agents requiring team leader action this week</p>
        <div className="alert-agent-grid">
          {ALERT_AGENTS.map((agent) => (
            <div key={agent.slug} className="alert-agent-card">
              <div className="alert-agent-top">
                <Link to={`/agent/${agent.slug}`} className="alert-agent-name">
                  {agent.name}
                </Link>
                <span className={`badge ${agent.badgeClass}`}>{agent.status}</span>
              </div>
              <div className="alert-agent-metrics">{agent.metrics}</div>
              <p className="alert-agent-insight">{agent.insight}</p>
              <p className="alert-agent-action">
                <strong>Recommended action:</strong> {agent.action}
              </p>
            </div>
          ))}
        </div>

        <section id="team-coaching">
          <div className="connector">Coaching Queue · Week 5</div>
          <p className="section-sublabel">Active coaching assignments with source insight and status</p>
          <LedgerTable
            columns={['Agent', 'Coaching Topic', 'Source', 'Deployed', 'Status', 'Outcome so far']}
            summary={COACHING_QUEUE_SUMMARY}
            rows={COACHING_QUEUE.map((row) => (
              <tr key={row.agent + row.topic}>
                <td>{row.agent}</td>
                <td>{row.topic}</td>
                <td>{row.source}</td>
                <td>{row.deployed}</td>
                <td>
                  <span className={`badge ${row.badgeClass}`}>{row.status}</span>
                </td>
                <td>{row.outcome}</td>
              </tr>
            ))}
          />
        </section>

        <div className="connector">Quality Score Trends · All Agents · 5 Weeks</div>
        <div className="chart-section-head">
          <p className="section-sublabel">
            Coaching deployed at week 3 · TL priority agents shown · QA score 0–100 scale
          </p>
          <button type="button" className="metrics-cta" onClick={() => setAgentsDrawerOpen(true)}>
            See all agents →
          </button>
        </div>
        <div className="spark-section">
          <div className="spark-grid">
            {previewAgents.map((agent) => (
              <SparkAgentCard key={agent.slug} agent={agent} />
            ))}
          </div>
        </div>

        <section id="flagged-calls">
          <div className="connector">Calls QiQ Wants You to Review</div>
          <p className="section-sublabel">
            Flagged contacts requiring team leader attention · Click any row to open in Contact Search
          </p>
          <LedgerTable
            tableClassName="flagged-table"
            columns={['Call ID', 'Agent', 'Date', 'Category', 'Flag Reason', 'QA Score']}
            rows={FLAGGED_CALLS.map((call) => (
              <tr
                key={call.callId}
                onClick={() => navigate(`/search?call=${call.callId}`)}
                role="link"
                tabIndex={0}
              >
                <td>{call.callId}</td>
                <td>{call.agent}</td>
                <td>{call.date}</td>
                <td>{call.category}</td>
                <td>
                  <span className={call.flagClass}>{call.flagReason}</span>
                </td>
                <td className={call.qaClass}>{call.qaScore}</td>
              </tr>
            ))}
          />
        </section>

        <FlowBar activePage="teamlead" />
      </div>

      <DrawerShell
        open={agentsDrawerOpen}
        onClose={() => setAgentsDrawerOpen(false)}
        title="Quality Score Trends · All Agents"
        subtitle="5 weeks · Coaching deployed at week 3 · Click an agent to open coaching view"
      >
        {SPARK_DATA.map((agent) => (
          <SparkAgentCard key={agent.slug} agent={agent} variant="drawer" />
        ))}
      </DrawerShell>
    </>
  )
}
