import { useState, useEffect, useCallback } from 'react'

// Agent 状态定义
export const AGENT_STATUS = {
  IDLE: 'idle',
  WRITING: 'writing',
  RESEARCHING: 'researching',
  EXECUTING: 'executing',
  SYNCING: 'syncing',
  ERROR: 'error'
}

// 场景定义
export const SCENES = {
  LOUNGE: 'lounge',
  DESK: 'desk',
  BUG: 'bug'
}

// 状态到场景的映射
export const STATUS_TO_SCENE = {
  [AGENT_STATUS.IDLE]: SCENES.LOUNGE,
  [AGENT_STATUS.WRITING]: SCENES.DESK,
  [AGENT_STATUS.RESEARCHING]: SCENES.DESK,
  [AGENT_STATUS.EXECUTING]: SCENES.DESK,
  [AGENT_STATUS.SYNCING]: SCENES.DESK,
  [AGENT_STATUS.ERROR]: SCENES.BUG
}

// 状态中文描述
export const STATUS_LABELS = {
  [AGENT_STATUS.IDLE]: '待命',
  [AGENT_STATUS.WRITING]: '写作',
  [AGENT_STATUS.RESEARCHING]: '调研',
  [AGENT_STATUS.EXECUTING]: '执行',
  [AGENT_STATUS.SYNCING]: '同步',
  [AGENT_STATUS.ERROR]: '报错'
}

// 状态 Emoji
export const STATUS_EMOJIS = {
  [AGENT_STATUS.IDLE]: '😌',
  [AGENT_STATUS.WRITING]: '✍️',
  [AGENT_STATUS.RESEARCHING]: '🔍',
  [AGENT_STATUS.EXECUTING]: '⚡',
  [AGENT_STATUS.SYNCING]: '🔄',
  [AGENT_STATUS.ERROR]: '❌'
}

/**
 * Agent 状态管理 Hook
 * @param {string} agentId - Agent ID
 * @param {string} initialStatus - 初始状态
 */
export function useAgentStatus(agentId = 'default', initialStatus = AGENT_STATUS.IDLE) {
  const [status, setStatus] = useState(initialStatus)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [history, setHistory] = useState([])

  // 获取当前场景
  const scene = STATUS_TO_SCENE[status]

  // 更新状态
  const updateStatus = useCallback(async (newStatus, reason = '') => {
    if (!AGENT_STATUS[newStatus.toUpperCase()]) {
      setError(`无效的状态：${newStatus}`)
      return false
    }

    setLoading(true)
    setError(null)

    try {
      // 记录历史
      const timestamp = new Date().toISOString()
      setHistory(prev => [{
        status,
        timestamp,
        reason
      }, ...prev].slice(0, 50)) // 保留最近 50 条

      setStatus(newStatus.toLowerCase())

      // TODO: 调用 API 同步状态
      // await api.updateStatus(agentId, newStatus)

      return true
    } catch (err) {
      setError(err.message)
      return false
    } finally {
      setLoading(false)
    }
  }, [status, agentId])

  // 重置状态
  const reset = useCallback(() => {
    setStatus(AGENT_STATUS.IDLE)
    setHistory([])
    setError(null)
  }, [])

  return {
    status,
    scene,
    loading,
    error,
    history,
    statusLabel: STATUS_LABELS[status],
    statusEmoji: STATUS_EMOJIS[status],
    updateStatus,
    reset
  }
}

/**
 * 多 Agent 状态管理 Hook
 * @param {Array} initialAgents - 初始 Agent 列表
 */
export function useMultiAgentStatus(initialAgents = []) {
  const [agents, setAgents] = useState(initialAgents)

  // 更新单个 Agent 状态
  const updateAgentStatus = useCallback((agentId, newStatus, reason = '') => {
    setAgents(prev => prev.map(agent => {
      if (agent.id === agentId) {
        return {
          ...agent,
          status: newStatus.toLowerCase(),
          lastUpdated: new Date().toISOString()
        }
      }
      return agent
    }))
  }, [])

  // 添加新 Agent
  const addAgent = useCallback((agent) => {
    setAgents(prev => [...prev, {
      ...agent,
      status: AGENT_STATUS.IDLE,
      lastUpdated: new Date().toISOString()
    }])
  }, [])

  // 移除 Agent
  const removeAgent = useCallback((agentId) => {
    setAgents(prev => prev.filter(agent => agent.id !== agentId))
  }, [])

  // 获取特定状态的 Agent
  const getAgentsByStatus = useCallback((status) => {
    return agents.filter(agent => agent.status === status)
  }, [agents])

  // 统计信息
  const stats = {
    total: agents.length,
    idle: agents.filter(a => a.status === AGENT_STATUS.IDLE).length,
    working: agents.filter(a => [AGENT_STATUS.WRITING, AGENT_STATUS.RESEARCHING, AGENT_STATUS.EXECUTING, AGENT_STATUS.SYNCING].includes(a.status)).length,
    error: agents.filter(a => a.status === AGENT_STATUS.ERROR).length
  }

  return {
    agents,
    updateAgentStatus,
    addAgent,
    removeAgent,
    getAgentsByStatus,
    stats
  }
}
