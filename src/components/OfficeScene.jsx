import './OfficeScene.css'

// 导入背景图片
import officeBg from '../assets/office.png'
import cloudBg from '../assets/cloud.png'
import terminalBg from '../assets/terminal.png'

// 背景配置
const BACKGROUNDS = {
  office: officeBg,
  cloud: cloudBg,
  terminal: terminalBg,
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
