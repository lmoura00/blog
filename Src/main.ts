import express from 'express'
import jwt from 'jsonwebtoken'
import brypt from 'bcryptjs'


const app = express()
app.use(express.json())

app.listen(3333, ()=> console.log("Server running..."))