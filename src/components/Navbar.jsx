import React, {useEffect, useState} from "react"
import {AppBar, Box, Button, Grow, Toolbar, Typography, useMediaQuery, useTheme} from "@mui/material"
import {useLocation, useNavigate} from "react-router-dom"
import firebase from "firebase"
import {DrawerComponent} from "./index"

const links = [
   {name: "HOME", linkTo: "/"},
   {name: "ABOUT", linkTo: "/about"},
   {name: "PROFILE", linkTo: "/profile"},
   {name: "CREATE", linkTo: "/create"},
]

const NavLink = ({name, isActive, handleClick}) => (
   <Button
      sx={{mx: 1, transition: "all ease 200ms"}}
      onClick={handleClick}
      color="inherit"
      variant={isActive === name ? "outlined" : "text"}
   >
      {name}
   </Button>
)

const Navbar = ({setUser, user}) => {

   const navigate = useNavigate()
   const location = useLocation()
   const provider = new firebase.auth.GoogleAuthProvider()
   const theme = useTheme()
   const isMobile = useMediaQuery(theme.breakpoints.down("md"))

   const [isActive, setIsActive] = useState("")
   const [openDrawer, setOpenDrawer] = useState(false)



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
                  <Typography  onClick={() => {
                     setIsActive("/")
                     navigate("/")
                  }} variant="h6"  sx={{cursor: "pointer", flexGrow: 1}}>
                     XEQIA
                  </Typography>
                  {isMobile ? (
                     <DrawerComponent openDrawer={openDrawer} setOpenDrawer={setOpenDrawer}/>
                     ):
                     (
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
                     )
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
