import React from 'react'
import {Box, Container, Grow, IconButton, Typography} from "@mui/material"
import InstagramIcon from '@mui/icons-material/Instagram'

function Footer() {
   return (
      <Container>
         <Grow in timeout={800}>
            <Box sx={{mt: 6, p: 6}} display="flex" alignItems="center" justifyContent="center">
               <Typography sx={{m: 1}} variant="p">
                  Copyright © 2022 Doxilos Development
               </Typography>
               <IconButton sx={{m: 1}} href="https://www.instagram.com/dozajltd/"><InstagramIcon/></IconButton>
            </Box>
         </Grow>
      </Container>
   )
}

export default Footer
