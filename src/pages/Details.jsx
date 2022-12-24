import React, {useEffect, useState} from "react"
import {useNavigate, useParams} from "react-router-dom"

import {db} from "../utils/firebase.utils"
import {Box, Container, Grow, Paper, Typography} from "@mui/material"

const Details = () => {

   const params = useParams()
   const navigate = useNavigate()

   const [post, setPost] = useState({})

   async function getPostById() {
      const query = await db
         .collection("posts")
         .where("postId", "==", params.postId).get()
      if (!query.empty) {
         const snapshot = query.docs[0]
         const data = snapshot.data()
         setPost(data)
      } else {
         navigate("/")
      }
   }

   useEffect(() => {
      getPostById()
   }, [])


   return (
      <Container>
         <Grow in timeout={600}>
            <Box sx={{mt: 12}} display="flex" alignContent="center" justifyContent="center">
               <Paper sx={{m: 6, p: 4}}>
                  <img src={post.url} alt="post" style={{maxWidth: "640px"}}/>
                  <Typography sx={{mt: 2}} variant="h5">
                     {post.title}
                  </Typography>
               </Paper>
            </Box>
         </Grow>
      </Container>
   )
}

export default Details
