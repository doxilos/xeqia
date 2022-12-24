import React from "react"
import ReactDOM from "react-dom/client"
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import {ThemeProvider, createTheme} from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"

import App from "./App"
import "./index.css"

const router = createBrowserRouter([
   {
      path: "*",
      element: <App/>,
   },
])

const darkTheme = createTheme({
   palette: {mode: "dark"},
})

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
   <React.StrictMode>
      <ThemeProvider theme={darkTheme}>
         <CssBaseline/>
         <RouterProvider router={router}/>
      </ThemeProvider>
   </React.StrictMode>,
)
