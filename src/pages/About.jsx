import React from 'react'
import {Box, Container, Grow,Typography} from "@mui/material"

function About() {
   return (
      <Container>
         <Grow in timeout={800}>
            <Box sx={{mt: 6, p: 6}} alignItems="center" justifyContent="center">
               <Typography sx={{m: 1}} variant="h6">ABOUT</Typography>
               <Typography sx={{m: 1}} variant="p">
                  Welcome to our image sharing website powered by IPFS (InterPlanetary File System)! We are a community-driven platform that allows users to share and discover images in a decentralized way.
                  With IPFS, we are able to store and share images in a distributed manner, meaning that the images are not stored on a central server but rather on a network of computers. This makes our platform more resilient to downtime and censorship, as there is no single point of failure.
                  Our goal is to provide a fast, reliable, and secure way for users to share and discover images. Whether you are an artist looking to showcase your work, a photographer looking to share your images with the world, or just someone who enjoys looking at beautiful pictures, we have something for everyone.
                  We hope you enjoy using our platform and we look forward to seeing what you will share with us!
               </Typography>
            </Box>
         </Grow>
      </Container>
   )
}

export default About
