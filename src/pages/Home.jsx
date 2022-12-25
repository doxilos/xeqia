import React, {useEffect, useState} from "react"
import {useNavigate} from "react-router-dom"

import {db} from "../utils/firebase.utils"
import {Button, Card, CardContent, CardMedia, Grow, Typography, Box, Container} from "@mui/material"
import Grid2 from "@mui/material/Unstable_Grid2"

const Home = ({user}) => {

   const [listOfPosts, setListOfPosts] = useState([])
   const [lastKey, setLastKey] = useState()
   const [isLoading, setIsLoading] = useState(false)
   const [isEmpty, setIsEmpty] = useState(false)

   const navigate = useNavigate()

   const postsRef = db.collection("posts").orderBy("createdAt", "desc")

   useEffect(() => {
      postsRef.limit(6).get().then((collections) => {
         updateState(collections)
      })
   }, [])

   const updateState = (collections) => {
      const isCollectionEmpty = collections.size === 0
      if (!isCollectionEmpty) {
         const posts = collections.docs.map((post) => post.data())
         const lastDoc = collections.docs[collections.docs.length - 1]
         setListOfPosts([...listOfPosts, ...posts])
         setLastKey(lastDoc)
      } else {
         setIsEmpty(true)
      }

      setIsLoading(false)
   }

   const fetchMorePosts = () => {
      setIsLoading(true)
      postsRef.startAfter(lastKey)
         .limit(6)
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
                     You need to login to see posts.
                  </Typography>
               </Box>
            </Grow>
         </Container>
      )
   } else return (
      <Container>

         <Grow in timeout={700}>
            <Box sx={{mt: 12}} display="flex" alignItems="center" justifyContent="center">
               <Typography variant="h6">
                  This site stores images to IPFS. This means any image you uploaded CANNOT be deleted. Use with caution.<br/>
                  In addition this site may contain disturbing or adult content.
               </Typography>
            </Box>
         </Grow>

         <Grid2 sx={{mt: 12}} container alignItems="center" justifyContent="center" spacing={{xs: 2, md: 3}}
                columns={{xs: 2, sm: 8, md: 12}}>
            {listOfPosts.length > 0 && listOfPosts.map((post, index) => (
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
               <Button color="inherit" disabled={isEmpty || isLoading} onClick={() => fetchMorePosts()}
                       variant="outlined">{isEmpty ? "NO MORE DATA" : "MORE"}</Button>
            </Box>
         </Grow>
      </Container>
   )
}

export default Home
