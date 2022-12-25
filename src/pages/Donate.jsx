import React from 'react'
import {Box, Container, Grow,Typography} from "@mui/material"

function Donate() {
   return (
      <Container>
         <Grow in timeout={800}>
            <Box sx={{mt: 6, p: 6}} alignItems="center" justifyContent="center">
               <Typography sx={{m: 1}} variant="h6">Donate!</Typography>
               <Typography sx={{m: 1}} variant="p">
                 This site runs on merely by your donations. Please consider donating. <br/>
                  You can send ETH and MATIC to this address: 0x3BbE6b998D130aE9C1cfF19D069E69Dcd672332d <br/>
                  You can send BTC to this address: bc1qax7pkfpljutvx2qnj0xjxjc8vw0jr06tr9cdf5
               </Typography>
            </Box>
         </Grow>
      </Container>
   )
}

export default Donate
