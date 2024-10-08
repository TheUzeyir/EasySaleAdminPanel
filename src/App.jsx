import {BrowserRouter,Routes,Route} from "react-router-dom"
import Main from "./page/main/Main"
import ComponentsPage from "./components/componentsPage/ComponentsPage"
import ComponentsAdd from "./components/componentsAdd/ComponentsAdd"
import Login from "./page/login/Login"
import UserInfo from "./components/userInfo/UserInfo"

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="/category" element={<ComponentsPage/>}/>
        <Route path="/componentsAdd" element={<ComponentsAdd/>}/>
        <Route path="/userInfo" element={<UserInfo/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
