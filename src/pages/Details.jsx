import React, {useEffect, useState} from "react"
import {useNavigate, useParams} from "react-router-dom"

import {db} from "../utils/firebase.utils"
import {Box, Card, CardContent, CardMedia, Container, Grow, Paper, Typography} from "@mui/material"

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
               <Card sx={{maxWidth: 1920, minWidth: 400}}>
                  <CardMedia
                     height="650"
                     component="img"
                     image={post.url}
                     title={post.title}
                  />
                  <CardContent>
                     <Typography justifyContent="center" alignContent="center" gutterBottom variant="h5">
                        {post.title}
                     </Typography>
                  </CardContent>
               </Card>
            </Box>
         </Grow>
      </Container>
   )
}

export default Details
