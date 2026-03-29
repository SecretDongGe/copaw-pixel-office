import { useState, useEffect } from 'react'
import Cheetah from './components/Cheetah'
import OfficeScene from './components/OfficeScene'
import ControlPanel from './components/ControlPanel'
import { useMultiAgentStatus, AGENT_STATUS } from './hooks/useAgentStatus'
import './App.css'

// 模拟 Agent 数据
const INITIAL_AGENTS = [
  { id: '5BoFvi', name: 'Yiming', role: 'engineer' },
  { id: 'abc123', name: 'Designer', role: 'designer' },
  { id: 'def456', name: 'PM', role: 'pm' },
]

function App() {
  const [systemStatus, setSystemStatus] = useState('online')
  const [activeTasks, setActiveTasks] = useState([
    { id: 1, name: '集成 Cheetah 组件', agent: 'Yiming' },
    { id: 2, name: '创建 OfficeScene', agent: 'Designer' },
  ])

  // 使用多 Agent 状态 Hook
  const {
    agents,
    stats,
    updateAgentStatus,
    addAgent,
    removeAgent,
    getAgentsByStatus,
  } = useMultiAgentStatus(INITIAL_AGENTS)

  // 模拟状态更新
  useEffect(() => {
    const interval = setInterval(() => {
      const statuses = [
        AGENT_STATUS.IDLE,
        AGENT_STATUS.WRITING,
        AGENT_STATUS.RESEARCHING,
        AGENT_STATUS.EXECUTING,
      ]
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)]
      updateAgentStatus('5BoFvi', randomStatus)
    }, 5000)

    return () => clearInterval(interval)
  }, [updateAgentStatus])

  const handleAgentClick = (agent) => {
    console.log('Agent clicked:', agent)
  }

  const handleTaskClick = (task) => {
    console.log('Task clicked:', task)
  }

  return (
    <div className="app-container">
      {/* 头部 */}
      <header className="app-header">
        <h1>🐆 CoPaw Pixel Office</h1>
        <p className="subtitle">AI-Powered Multi-Agent System</p>
      </header>

      {/* 主内容区 */}
      <main className="app-main">
        {/* 左侧：场景展示 */}
        <section className="scene-section">
          <OfficeScene
            background="office"
            width="100%"
            height="400px"
            positions={[
              {
                position: 'centerLeft',
                element: (
                  <Cheetah
                    state={agents.find(a => a.id === '5BoFvi')?.status || 'idle'}
                    size={64}
                    animationSpeed={150}
                  />
                ),
              },
            ]}
          >
            {/* 场景内其他内容 */}
            <div className="scene-overlay">
              <div className="stats-badge">
                📊 {stats.total} Agents | 
                🟢 {stats.idle} 空闲 | 
                🟡 {stats.busy} 工作中
              </div>
            </div>
          </OfficeScene>

          {/* 快速状态切换 */}
          <div className="quick-status">
            <button onClick={() => updateAgentStatus('5BoFvi', AGENT_STATUS.IDLE)}>
              😌 待命
            </button>
            <button onClick={() => updateAgentStatus('5BoFvi', AGENT_STATUS.WRITING)}>
              ✍️ 写作
            </button>
            <button onClick={() => updateAgentStatus('5BoFvi', AGENT_STATUS.RESEARCHING)}>
              🔍 调研
            </button>
            <button onClick={() => updateAgentStatus('5BoFvi', AGENT_STATUS.EXECUTING)}>
              ⚙️ 执行
            </button>
            <button onClick={() => updateAgentStatus('5BoFvi', AGENT_STATUS.ERROR)}>
              ❌ 报错
            </button>
          </div>
        </section>

        {/* 右侧：控制面板 */}
        <aside className="panel-section">
          <ControlPanel
            agents={agents}
            systemStatus={systemStatus}
            activeTasks={activeTasks}
            onAgentClick={handleAgentClick}
            onTaskClick={handleTaskClick}
          />
        </aside>
      </main>

      {/* 底部：团队展示 */}
      <section id="team" className="team-section">
        <h2>👥 Meet the Team</h2>
        <div className="team-grid">
          {agents.map((agent) => (
            <div key={agent.id} className="team-member">
              <Cheetah state={agent.status || 'idle'} size={64} />
              <h3>{agent.name}</h3>
              <p className="role">{agent.role}</p>
              <p className="status">
                {agent.status === 'idle' && '😌 待命'}
                {agent.status === 'writing' && '✍️ 写作'}
                {agent.status === 'researching' && '🔍 调研'}
                {agent.status === 'executing' && '⚙️ 执行'}
                {agent.status === 'syncing' && '🔄 同步'}
                {agent.status === 'error' && '❌ 报错'}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 特性展示 */}
      <section id="features" className="features-section">
        <h2>✨ Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🧠</div>
            <h3>Multi-Agent</h3>
            <p>Collaborative AI agents</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💬</div>
            <h3>Chat Interface</h3>
            <p>Natural conversations</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔧</div>
            <h3>Skills System</h3>
            <p>Extensible capabilities</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📚</div>
            <h3>Memory</h3>
            <p>Persistent knowledge</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default App
