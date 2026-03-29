import { useState } from 'react'
import './ControlPanel.css'

// 状态图标映射
const STATUS_ICONS = {
  online: '🟢',
  offline: '🔴',
  busy: '🟡',
  idle: '⚪',
}

// Agent 角色图标
const ROLE_ICONS = {
  engineer: '👨‍💻',
  designer: '🎨',
  pm: '📋',
  analyst: '📊',
  default: '🤖',
}

const ControlPanel = ({
  agents = [],
  systemStatus = 'online',
  activeTasks = [],
  onAgentClick,
  onTaskClick,
  className = '',
  compact = false,
}) => {
  const [expandedSection, setExpandedSection] = useState('agents')

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  return (
    <div className={`control-panel ${compact ? 'control-panel-compact' : ''} ${className}`}>
      {/* 系统状态 */}
      <div className="panel-section panel-header">
        <div className="system-status">
          <span className="status-indicator">{STATUS_ICONS[systemStatus]}</span>
          <span className="status-text">
            {systemStatus === 'online' ? '系统在线' : 
             systemStatus === 'offline' ? '系统离线' : 
             systemStatus === 'busy' ? '系统繁忙' : '系统空闲'}
          </span>
        </div>
      </div>

      {/* Agent 列表 */}
      <div className="panel-section">
        <button 
          className="section-title"
          onClick={() => toggleSection('agents')}
        >
          <span>🤖 Agents</span>
          <span className="expand-icon">{expandedSection === 'agents' ? '▼' : '▶'}</span>
        </button>
        
        {expandedSection === 'agents' && (
          <div className="section-content">
            {agents.length === 0 ? (
              <div className="empty-state">暂无活跃 Agents</div>
            ) : (
              <div className="agent-list">
                {agents.map((agent, index) => (
                  <div
                    key={agent.id || index}
                    className={`agent-item ${agent.status || 'idle'}`}
                    onClick={() => onAgentClick?.(agent)}
                  >
                    <span className="agent-icon">{ROLE_ICONS[agent.role] || ROLE_ICONS.default}</span>
                    <div className="agent-info">
                      <span className="agent-name">{agent.name || `Agent ${index + 1}`}</span>
                      <span className="agent-role">{agent.role || 'Unknown'}</span>
                    </div>
                    <span className="agent-status">{STATUS_ICONS[agent.status || 'idle']}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* 活跃任务 */}
      <div className="panel-section">
        <button 
          className="section-title"
          onClick={() => toggleSection('tasks')}
        >
          <span>📋 活跃任务</span>
          <span className="expand-icon">{expandedSection === 'tasks' ? '▼' : '▶'}</span>
          {activeTasks.length > 0 && (
            <span className="task-badge">{activeTasks.length}</span>
          )}
        </button>
        
        {expandedSection === 'tasks' && (
          <div className="section-content">
            {activeTasks.length === 0 ? (
              <div className="empty-state">暂无活跃任务</div>
            ) : (
              <div className="task-list">
                {activeTasks.map((task, index) => (
                  <div
                    key={task.id || index}
                    className="task-item"
                    onClick={() => onTaskClick?.(task)}
                  >
                    <span className="task-name">{task.name || task.description || `Task ${index + 1}`}</span>
                    <span className="task-agent">{task.agent || 'Unknown'}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* 快速操作 */}
      <div className="panel-section">
        <div className="section-title">⚡ 快速操作</div>
        <div className="quick-actions">
          <button className="action-btn">🔄 刷新</button>
          <button className="action-btn">📊 日志</button>
          <button className="action-btn">⚙️ 设置</button>
        </div>
      </div>
    </div>
  )
}

export default ControlPanel
