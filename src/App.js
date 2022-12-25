import {useEffect, useState} from "react"
import {Routes, Route} from "react-router-dom"

import {Create, Home, Details, About, Profile} from "./pages"
import {Footer, Navbar} from "./components"

// FIREBASE
import {app} from "./utils/firebase.utils"
import {Container} from "@mui/material"

function App() {

   const [user, setUser] = useState(null)

   app.auth().onAuthStateChanged((user) => {
      if (user) setUser(user)
   })

   return (
      <Container>
         <Navbar setUser={setUser} user={user}/>
         <Routes>
            <Route path="/" element={<Home user={user}/>}/>
            <Route path="/create" element={<Create user={user}/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/profile" element={<Profile user={user}/>}/>
            <Route path="/details/:postId" element={<Details/>}/>
         </Routes>
         <Footer/>
      </Container>
   )
}

export default App
