import { useState } from 'react'
import cheetahLogo from './assets/copaw_cheetah_128x128.png'
import officeScene from './assets/office_scene_400x300.png'
import cheetahHappy from './assets/copaw_cheetah_happy_32.png'
import cheetahThinking from './assets/copaw_cheetah_thinking_32.png'
import cheetahWorking from './assets/copaw_cheetah_working_32.png'
import characterEngineer from './assets/character_engineer_64x64.png'
import characterDesigner from './assets/character_designer_64x64.png'
import characterPM from './assets/character_pm_64x64.png'
import characterAnalyst from './assets/character_analyst_64x64.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [mood, setMood] = useState('happy')

  const getMoodEmoji = () => {
    if (count < 3) return cheetahHappy
    if (count < 10) return cheetahWorking
    return cheetahThinking
  }

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={cheetahLogo} className="main-logo" width="128" height="128" alt="CoPaw Cheetah Logo" />
        </div>
        <div>
          <h1>🐆 CoPaw Pixel Office</h1>
          <p className="subtitle">AI-Powered Multi-Agent System</p>
        </div>
        
        <div className="office-scene">
          <img src={officeScene} alt="Office Scene" className="office-bg" />
          <img src={getMoodEmoji()} alt="Mood" className="office-cheetah" />
        </div>

        <button
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          {count === 0 ? '👋 Say Hi!' : count === 1 ? ' Hello!' : ` ${count} interactions!`}
        </button>

        <div className="mood-status">
          <span>CoPaw is: </span>
          <strong>{count < 3 ? '😊 Happy' : count < 10 ? '💼 Working' : '🤔 Thinking'}</strong>
        </div>
      </section>

      <div className="ticks"></div>

      <section id="team">
        <h2>👥 Meet the Team</h2>
        <div className="team-grid">
          <div className="team-member">
            <img src={characterEngineer} alt="Engineer" width="64" height="64" />
            <h3>Engineer</h3>
            <p>Builds amazing things</p>
          </div>
          <div className="team-member">
            <img src={characterDesigner} alt="Designer" width="64" height="64" />
            <h3>Designer</h3>
            <p>Makes it beautiful</p>
          </div>
          <div className="team-member">
            <img src={characterPM} alt="PM" width="64" height="64" />
            <h3>PM</h3>
            <p>Keeps us on track</p>
          </div>
          <div className="team-member">
            <img src={characterAnalyst} alt="Analyst" width="64" height="64" />
            <h3>Analyst</h3>
            <p>Finds the insights</p>
          </div>
        </div>
      </section>

      <div className="ticks"></div>

      <section id="features">
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

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
