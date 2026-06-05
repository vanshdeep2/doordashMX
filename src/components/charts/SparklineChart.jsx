import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import CoachingWeekMarker from './CoachingWeekMarker'
import '../../styles/components.css'
const TICK_STYLE = { fontSize: 9, fill: '#9b9b9b', fontFamily: 'DM Sans, sans-serif' }

function ChartTooltip({ active, payload, formatValue }) {
  if (!active || !payload?.length) return null
  const raw = payload[0].value
  const text = formatValue ? formatValue(raw) : raw
  return (
    <div className="chart-tooltip">
      <span className="chart-tooltip-val">{text}</span>
    </div>
  )
}

export default function SparklineChart({
  labels,
  data,
  color,
  height = 80,
  formatValue,
  coachingWeekLabel,
  yDomain,
}) {
  const chartData = labels.map((label, i) => ({ label, value: data[i] }))
  const gradientId = `fill-${color.replace('#', '')}`
  const topMargin = coachingWeekLabel ? 22 : 4

  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={chartData} margin={{ top: topMargin, right: 8, left: 4, bottom: 0 }}>
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.094} />
            <stop offset="100%" stopColor={color} stopOpacity={0.094} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke="#f0f0ee" vertical horizontal />
        <XAxis
          dataKey="label"
          tick={TICK_STYLE}
          axisLine={false}
          tickLine={false}
          interval={0}
        />
        <YAxis
          width={32}
          tick={TICK_STYLE}
          axisLine={false}
          tickLine={false}
          tickCount={4}
          domain={yDomain || ['auto', 'auto']}
        />
        {coachingWeekLabel && <CoachingWeekMarker weekLabel={coachingWeekLabel} variant="ccm" />}
        <Tooltip
          content={<ChartTooltip formatValue={formatValue} />}
          cursor={{ stroke: color, strokeWidth: 1, strokeDasharray: '3 3' }}
        />
        <Area
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={2}
          fill={`url(#${gradientId})`}
          dot={{ r: 2.5, fill: color, strokeWidth: 0 }}
          activeDot={{ r: 4, fill: color, stroke: '#fff', strokeWidth: 1 }}
          isAnimationActive={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
