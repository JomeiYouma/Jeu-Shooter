import ShooterGame from './ShooterGame'
import './App.css'

function App() {
  return (
    <main className="app">
      <header className="app-header">
        <h1>Shooter Component</h1>
        <p>Clique dans le jeu pour passer en plein écran.</p>
      </header>
      <section className="game-wrapper">
        <ShooterGame width={900} height={540} />
      </section>
      <div className="integration-note">
        <p>
          Ce composant est réutilisable : importe simplement
          {' '}<code>{'<ShooterGame />'}</code>{' '}
          dans n’importe quelle page React.
        </p>
      </div>
    </main>
  )
}

export default App
