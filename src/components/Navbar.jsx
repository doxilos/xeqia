import React, {useEffect, useState} from "react"
import {AppBar, Box, Button, Grow, Toolbar, Typography} from "@mui/material"
import {useLocation, useNavigate} from "react-router-dom"
import firebase from "firebase"

const links = [
   {name: "HOME", linkTo: "/"},
   {name: "CREATE", linkTo: "/create"},
   {name: "PROFILE", linkTo: "/profile"},
]

const NavLink = ({name, isActive, handleClick}) => (
   <Button
      sx={{mx: 1, transition: "all ease 200ms"}}
      onClick={handleClick}
      color="primary"
      variant={isActive === name ? "outlined" : "text"}
   >
      {name}
   </Button>
)

const Navbar = ({setUser, user}) => {

   const navigate = useNavigate()
   const [isActive, setIsActive] = useState("")

   const location = useLocation()

   const provider = new firebase.auth.GoogleAuthProvider()

   useEffect(() => {
      if (location.pathname === "/") {
         setIsActive("HOME")
      } else if (location.pathname === "/create") {
         setIsActive("CREATE")
      }
   }, [location.pathname])

   const loginWithGoogle = () => {
      firebase.auth().signInWithPopup(provider)
         .then((result) => {
            const user = result.user
            setUser(user)
         })
   }

   const logout = () => {
      firebase.auth().signOut().then(() => {
         setUser(null)
      })
   }

   return (
      <Box sx={{flexGrow: 1}}>
         <Grow in timeout={800}>
            <AppBar color="transparent" elevation={0} sx={{backdropFilter: "blur(30px)"}} style={{position: 'fixed'}} position="sticky">
               <Toolbar>
                  <Typography  onClick={() => navigate("/")} variant="h6" component="div" sx={{flexGrow: 1, cursor: "pointer"}}>
                     XEQIA
                  </Typography>
                  {
                     links.map((link) => (
                        <NavLink
                           key={link.name}
                           name={link.name}
                           isActive={isActive}
                           handleClick={() => {
                              setIsActive(link.name)
                              navigate(link.linkTo)
                           }}
                        />
                     ))
                  }

                  <Button
                     onClick={() => {
                        if (user) {
                           logout()
                        } else if (!user) {
                           loginWithGoogle()
                        }
                     }}
                     sx={{backgroundColor: `${user ? "#EF5350" : "#4CAF50"}`, mx: 1, transition: "all ease 400ms"}}
                     color="inherit">{user ? "LOGOUT" : "LOGIN WITH GOOGLE"}
                  </Button>
               </Toolbar>
            </AppBar>
         </Grow>
      </Box>
   )
}

export default Navbar
