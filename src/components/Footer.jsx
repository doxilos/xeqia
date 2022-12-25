import React from 'react'
import {Box, Button, Container, Grow, IconButton, Typography} from "@mui/material"
import InstagramIcon from '@mui/icons-material/Instagram'

function Footer() {

   return (
      <Container>
         <Grow in timeout={800}>
            <Box sx={{mt: 6, p: 6}} display="flex" alignItems="center" justifyContent="center">
               <Typography sx={{m: 1}} variant="p">
                  Copyright © 2022 Doxilos Development
               </Typography>
               <a href="https://www.instagram.com/dozajltd/" target="_blank" rel="noreferrer">
                  <InstagramIcon sx={{color: "white"}}/>
               </a>
            </Box>
         </Grow>
      </Container>
   )
}

export default Footer
