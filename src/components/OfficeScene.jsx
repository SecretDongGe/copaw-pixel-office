import './OfficeScene.css'

// 导入场景背景图片 (800x600)
import sceneDesk from '../assets/scene_desk.png'
import sceneLounge from '../assets/scene_lounge.png'
import sceneBug from '../assets/scene_bug.png'

// 背景配置
const BACKGROUNDS = {
  desk: sceneDesk,
  lounge: sceneLounge,
  bug: sceneBug,
}

// 预设位置（百分比）
const PRESET_POSITIONS = {
  topLeft: { left: '10%', top: '20%' },
  topRight: { right: '10%', top: '20%' },
  bottomLeft: { left: '10%', bottom: '20%' },
  bottomRight: { right: '10%', bottom: '20%' },
  center: { left: '50%', top: '50%', transform: 'translate(-50%, -50%)' },
  centerLeft: { left: '20%', top: '50%', transform: 'translate(-50%, -50%)' },
  centerRight: { right: '20%', top: '50%', transform: 'translate(-50%, -50%)' },
}

const OfficeScene = ({
  background = 'office',
  width = '100%',
  height = '400px',
  children,
  className = '',
  positions = [], // [{ position: 'topLeft', element: <Cheetah /> }]
}) => {
  const bgImage = BACKGROUNDS[background] || BACKGROUNDS.office

  return (
    <div
      className={`office-scene office-scene-${background} ${className}`}
      style={{
        width,
        height,
        backgroundImage: `url(${bgImage})`,
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      {positions.map(({ position, element, customStyle }, index) => {
        const presetPos = PRESET_POSITIONS[position]
        return (
          <div
            key={index}
            className="scene-element"
            style={{
              ...presetPos,
              ...customStyle,
            }}
          >
            {element}
          </div>
        )
      })}
      {children}
    </div>
  )
}

export default OfficeScene
export { PRESET_POSITIONS, BACKGROUNDS }
