import React, {useState} from 'react'
import {List, ListItem, ListItemText, Drawer, IconButton, Button, Box} from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu'
import {Link, useNavigate} from "react-router-dom"

const links = [
   {name: "HOME", linkTo: "/"},
   {name: "ABOUT", linkTo: "/about"},
   {name: "PROFILE", linkTo: "/profile"},
   {name: "CREATE", linkTo: "/create"},
]

const NavLink = ({name, isActive, handleClick}) => (
   <ListItem>
      <Button
         sx={{mx: 1, transition: "all ease 200ms"}}
         onClick={handleClick}
         color="inherit"
         variant={isActive === name ? "outlined" : "text"}
      >
         {name}
      </Button>
   </ListItem>
)


function DrawerComponent({openDrawer, setOpenDrawer}) {

   const navigate = useNavigate()

   const [isActive, setIsActive] = useState("")

   return (
      <>
         <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
            <Box>
               {
                  links.map((link) => (
                     <NavLink
                        key={link.name}
                        name={link.name}
                        isActive={isActive}
                        handleClick={() => {
                           setIsActive(link.name)
                           setOpenDrawer(false)
                           navigate(link.linkTo)
                        }}
                     />
                  ))
               }
            </Box>
         </Drawer>

         <IconButton sx={{mr: 2}} onClick={() => setOpenDrawer(prev => !prev)}>
            <MenuIcon/>
         </IconButton>

      </>
   )
}

export default DrawerComponent
