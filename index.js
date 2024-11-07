const express = require('express')
const app=express()
const port = 3000

app.get('/', (req, res)=>{
    res.sendFile(__dirname + "/index.html")
})
app.get('/about', (req, res)=>{
    res.send("Server running")
})
app.get('/contactus', (req,res)=>{
   res.send("How can we help you")
})


app.listen(port, (error)=>{
    if(!error){
        console.log(`Server is listening on ${port}`)
    }
    else {
        console.log("Error occcured, server can't start")
    }
    
})
