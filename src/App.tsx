import { Header } from "./components/Header"
import { Main } from "./components/Main"
import { GlobalStyle } from "./styles/global"


function App() {

  return (
    <div className="App">
      <GlobalStyle/>
      <Header/>
      <Main/>
    </div>
  )
}

export default App
