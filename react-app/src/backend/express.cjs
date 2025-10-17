const express = require("express")
const app = express()
const cors = require("cors")

app.use(cors())
app.use(express.json())

const port = 3333

app.post("/api/result", (req, res) => {
    console.log(req.body)
    res.sendStatus(200)
    
})

app.get("/api/results", (req, res) => {
    res.sendStatus(200)
})

app.listen(port, ()=> {
    console.log("Szerver mükszik itt: ", port)
})