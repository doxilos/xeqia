import React, {useEffect, useState} from 'react'
import {useNavigate} from "react-router-dom"
import {Box, Button, Card, CardContent, CardMedia, Container, Grow, Paper, Typography} from "@mui/material"
import Grid2 from "@mui/material/Unstable_Grid2"

import {db} from "../utils/firebase.utils"

function Profile({user}) {

   const navigate = useNavigate()
   const [listOfPosts, setListOfPosts] = useState([])
   const [isLoading, setIsLoading] = useState(false)
   const [isEmpty, setIsEmpty] = useState(false)

   const [lastKey, setLastKey] = useState()

   const postsRef = db.collection("posts").orderBy("createdAt", "desc")

   useEffect(() => {
      if(user){
         postsRef.limit(6).where("owner", "==", user.uid)
            .get().then((collections) => {
            updateState(collections)
         })
      }
   }, [user])

   const updateState = (collections) => {
      const isCollectionEmpty = collections.size === 0
      if(!isCollectionEmpty){
         const posts = collections.docs.map((post) => post.data())
         const lastDoc = collections.docs[collections.docs.length - 1]
         setListOfPosts([...listOfPosts, ...posts])
         setLastKey(lastDoc)
      }else{
         setIsEmpty(true)
      }
      setIsLoading(false)
   }

   const fetchMorePosts = () => {
      setIsLoading(true)
      postsRef.startAfter(lastKey)
         .limit(6)
         .where("owner", "==", user.uid)
         .get()
         .then((collections) => {
            updateState(collections)
         })
   }
   if (!user) {
      return (
         <Container>
            <Grow in timeout={700}>
               <Box sx={{mt: 12}} display="flex" alignItems="center" justifyContent="center">
                  <Typography>
                     You need to login.
                  </Typography>
               </Box>
            </Grow>
         </Container>
      )
   } else return (
      <Container>

         <Box display="flex" justifyContent="center" alignItems="center">
            <Paper sx={{mt: 12, p: 2}} >
               <img src={user.photoURL} alt="user photo" style={{maxWidth: "75px", borderRadius: "12px"}}/>
            </Paper>
            <Paper sx={{mt: 12, p: 5, ml: 2}}>
               <Typography sx={{my: 2, mx: 2}} gutterBottom variant="p">
                  Logged in as: {user.displayName}<br/>
               </Typography>
            </Paper>
         </Box>


         <Box display="flex" justifyContent="center" alignItems="center">
            <Paper sx={{mt: 2, p: 2, ml: 2}}>
               <Typography sx={{my: 2, mx: 2}} gutterBottom variant="p">
                  Your Posts<br/>
               </Typography>
            </Paper>
         </Box>

         <Grid2 sx={{mt: 6}} container alignItems="center" justifyContent="center" spacing={{xs: 2, md: 3}}
                columns={{xs: 2, sm: 8, md: 12}}>
         {
            listOfPosts.map((post) => (
               <Grow in timeout={800} key={post.postId}>
                  <Grid2 xs={2} sm={4} md={4}>
                     <Card onClick={() => navigate(`/details/${post.postId}`)} sx={{
                        maxWidth: 480,
                        cursor: "pointer",
                        transition: "all ease 350ms",
                        ":hover": {backgroundColor: "#3F51B5"},
                     }}>
                        <CardMedia
                           sx={{height: 320}}
                           image={post.url}
                        />
                        <CardContent>
                           <Typography gutterBottom variant="h5" component="div">
                              {post.title}
                           </Typography>
                        </CardContent>
                     </Card>
                  </Grid2>
               </Grow>
            ))
         }
         </Grid2>

         <Grow in timeout={800}>
            <Box sx={{mt: 6, mb: 6, transition: "all ease 500ms"}} display="flex" alignItems="center"
                 justifyContent="center">
               <Button disabled={isEmpty || isLoading} onClick={() => fetchMorePosts()}
                       variant="outlined">{isEmpty ? "NO MORE DATA" : "MORE"}</Button>
            </Box>
         </Grow>

      </Container>
   )
}

export default Profile
