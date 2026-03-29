import { useState, useEffect } from 'react'
import './Cheetah.css'

// 导入 idle 状态的多尺寸帧
import idle32Frame1 from '../assets/cheetah_states/idle/cheetah_idle_frame1_32x32.png'
import idle32Frame2 from '../assets/cheetah_states/idle/cheetah_idle_frame2_32x32.png'
import idle32Frame3 from '../assets/cheetah_states/idle/cheetah_idle_frame3_32x32.png'
import idle64Frame1 from '../assets/cheetah_states/idle/cheetah_idle_frame1_64x64.png'
import idle64Frame2 from '../assets/cheetah_states/idle/cheetah_idle_frame2_64x64.png'
import idle64Frame3 from '../assets/cheetah_states/idle/cheetah_idle_frame3_64x64.png'
import idle128Frame1 from '../assets/cheetah_states/idle/cheetah_idle_frame1_128x128.png'
import idle128Frame2 from '../assets/cheetah_states/idle/cheetah_idle_frame2_128x128.png'
import idle128Frame3 from '../assets/cheetah_states/idle/cheetah_idle_frame3_128x128.png'

// 导入 error 状态帧
import errorFrame0 from '../assets/cheetah_states/error/frame_0.png'
import errorFrame1 from '../assets/cheetah_states/error/frame_1.png'
import errorFrame2 from '../assets/cheetah_states/error/frame_2.png'

// 导入 executing 状态帧
import executingFrame0 from '../assets/cheetah_states/executing/frame_0.png'
import executingFrame1 from '../assets/cheetah_states/executing/frame_1.png'
import executingFrame2 from '../assets/cheetah_states/executing/frame_2.png'
import executingFrame3 from '../assets/cheetah_states/executing/frame_3.png'

// 导入 researching 状态帧
import researchingFrame0 from '../assets/cheetah_states/researching/frame_0.png'
import researchingFrame1 from '../assets/cheetah_states/researching/frame_1.png'
import researchingFrame2 from '../assets/cheetah_states/researching/frame_2.png'

// 导入 syncing 状态帧
import syncingFrame0 from '../assets/cheetah_states/syncing/frame_0.png'
import syncingFrame1 from '../assets/cheetah_states/syncing/frame_1.png'

// 导入 writing 状态帧
import writingFrame0 from '../assets/cheetah_states/writing/frame_0.png'
import writingFrame1 from '../assets/cheetah_states/writing/frame_1.png'
import writingFrame2 from '../assets/cheetah_states/writing/frame_2.png'
import writingFrame3 from '../assets/cheetah_states/writing/frame_3.png'

// 状态帧配置
const STATE_FRAMES = {
  idle: {
    32: [idle32Frame1, idle32Frame2, idle32Frame3],
    64: [idle64Frame1, idle64Frame2, idle64Frame3],
    128: [idle128Frame1, idle128Frame2, idle128Frame3],
  },
  error: [errorFrame0, errorFrame1, errorFrame2],
  executing: [executingFrame0, executingFrame1, executingFrame2, executingFrame3],
  researching: [researchingFrame0, researchingFrame1, researchingFrame2],
  syncing: [syncingFrame0, syncingFrame1],
  writing: [writingFrame0, writingFrame1, writingFrame2, writingFrame3],
}

const STATE_FRAME_COUNTS = {
  idle: 3,
  error: 3,
  executing: 4,
  researching: 3,
  syncing: 2,
  writing: 4,
}

const Cheetah = ({ 
  state = 'idle', 
  size = 64, 
  animated = true,
  animationSpeed = 150, // 每帧毫秒数
  className = '',
  alt = 'Cheetah'
}) => {
  const [currentFrame, setCurrentFrame] = useState(0)

  // 获取当前帧的图片源
  const getFrameSrc = (stateName, size, frameIndex) => {
    if (stateName === 'idle') {
      return STATE_FRAMES.idle[size]?.[frameIndex] || STATE_FRAMES.idle[64][frameIndex]
    }
    return STATE_FRAMES[stateName]?.[frameIndex] || STATE_FRAMES.error[0]
  }

  // 动画逻辑
  useEffect(() => {
    if (!animated) return

    const frameCount = STATE_FRAME_COUNTS[state] || 1
    if (frameCount <= 1) return

    const interval = setInterval(() => {
      setCurrentFrame(prev => (prev + 1) % frameCount)
    }, animationSpeed)

    return () => clearInterval(interval)
  }, [state, animated, animationSpeed])

  // 获取当前帧的图片源
  const currentSrc = getFrameSrc(state, size, currentFrame)

  return (
    <img
      src={currentSrc}
      width={size}
      height={size}
      alt={alt}
      className={`cheetah cheetah-${state} ${animated ? 'cheetah-animated' : ''} ${className}`}
      style={{ width: size, height: size }}
    />
  )
}

export default Cheetah
