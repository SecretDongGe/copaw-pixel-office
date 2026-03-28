import { useState } from 'react'
import lobsterLogo from './assets/openclaw_lobster_128x128.png'
import characterEngineer from './assets/character_engineer_64x64.png'
import characterDesigner from './assets/character_designer_64x64.png'
import characterPM from './assets/character_pm_64x64.png'
import characterAnalyst from './assets/character_analyst_64x64.png'
import emojiHappy from './assets/openclaw_emoji_happy_64.png'
import emojiThinking from './assets/openclaw_emoji_thinking_64.png'
import emojiExcited from './assets/openclaw_emoji_excited_64.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={lobsterLogo} className="main-logo" width="128" height="128" alt="OpenClaw Logo" />
        </div>
        <div>
          <h1>🦞 OpenClaw Pixel Office</h1>
          <p>
            Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <button
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          {count === 0 ? '👋 Click me' : count === 1 ? ' Once more!' : ` ${count} clicks!`}
        </button>
      </section>

      <div className="ticks"></div>

      <section id="team">
        <h2> Meet the Team</h2>
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

      <section id="emoji-status">
        <h2>😊 How's it going?</h2>
        <div className="emoji-grid">
          <div className="emoji-item">
            <img src={emojiHappy} alt="Happy" width="64" height="64" />
            <span>Happy</span>
          </div>
          <div className="emoji-item">
            <img src={emojiThinking} alt="Thinking" width="64" height="64" />
            <span>Thinking</span>
          </div>
          <div className="emoji-item">
            <img src={emojiExcited} alt="Excited" width="64" height="64" />
            <span>Excited</span>
          </div>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
