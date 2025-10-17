const express = require("express")
const app = express()
const cors = require("cors")

const port = 3333

app.listen(port, ()=> {
    console.log("Szerver mükszik itt: ", port)
})