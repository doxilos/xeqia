import React, {useState} from "react"
import {useNavigate} from "react-router-dom"
import {FileUploader} from "react-drag-drop-files"
import {v4 as uuidv4} from "uuid"

import {db} from "../utils/firebase.utils"
import {storeFiles} from "../utils/web3storage.utils"
import {Box, Button, Container, Grow, Paper, TextField, Typography} from "@mui/material"

const fileTypes = ["JPG", "PNG"]

const Create = ({user}) => {

   const navigate = useNavigate()

   const [isLoading, setIsLoading] = useState(false)
   const [form, setForm] = useState({
      title: ""
   })
   const [file, setFile] = useState(null)

   const handleFileChange = (file) => {
      setFile(file)
   }

   const onSubmit = async (e) => {
      e.preventDefault()

      if (file && form.title) {
         setIsLoading(true)
         const cid = await storeFiles([file])

         try {
            await db.collection("posts").add({
               postId: uuidv4(),
               owner: user.uid,
               title: form.title,
               url: `https://w3s.link/ipfs/${cid}/${file.name}`,
               createdAt: new Date(),
            })

            setIsLoading(false)
            navigate("/")
         } catch (e) {
            console.log(e)
         }

         setIsLoading(false)
      }
   }

   if (!user) {
      return (
         <Container>
            <Grow in timeout={700}>
               <Box sx={{mt: 12}} display="flex" alignItems="center" justifyContent="center">
                  <Typography>
                     You need to login to create posts.
                  </Typography>
               </Box>
            </Grow>
         </Container>
      )
   } else return (
      <Grow in timeout={700}>
         <Box sx={{mt: 12}} display="flex" justifyContent="center" alignContent="center">
            <Paper sx={{m: 2, p: 4, px: 6}}>
               <Typography variant="h5">
                  Create a New Post
               </Typography>
               <Typography variant="p">
                  User ID: {user.uid}
               </Typography>
               <Box

                  justifyContent="center"
                  alignContent="center"
                  component="form"
                  noValidate
                  autoComplete="off"
               >
                  <TextField value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} required label="Title"
                             variant="standard"/>
                  <Box sx={{mt: 2}}>
                     <FileUploader handleChange={handleFileChange} name="file" types={fileTypes}/>
                  </Box>
                  <Button disabled={isLoading} variant="contained"
                          onClick={onSubmit}
                          sx={{mt: 2, backgroundColor: "#4CAF50", ":hover": {backgroundColor: "#81C784"}}}
                          type="submit">{isLoading ? "Submitting..." : "Submit"}</Button>
               </Box>
            </Paper>
         </Box>
      </Grow>
   )
}

export default Create
