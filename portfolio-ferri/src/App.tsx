import './App.css'
import Background from './assets/Background'
import Welcome from './Welcome/Welcome'
import Header from './Header/Header'

function App() {
  return (
    <>
    <Background/>
      <div>
        <Header></Header>
      </div>
      <div>
          <Welcome/>
      </div>

    </>
  )
}

export default App
