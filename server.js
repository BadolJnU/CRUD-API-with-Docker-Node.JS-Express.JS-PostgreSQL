const express = require('express')
const pool = require('./db')

const port = 1337

const app = express()
app.use(express.json())

//routes
//get api
app.get('/', async(req, res) => {
    try {
        const data = await pool.query('SELECT * FROM schools')
        res.status(200).send(data.rows)
    } catch (err) {
        await res.send(500)
    }
})

//post api
app.post('/', async(req, res) => {
    const { name, location } = req.body
    try {
        await pool.query('INSERT INTO schools (name, address) VALUES ($1, $2)', [name, location])
        res.status(200).send({
            message: "successfully inserted data into the table"
        })
    } catch (err) {
        await res.send(500)
    }
})

app.get('/createTable', async(req, res) => {
    try {
        await pool.query('CREATE TABLE schools(id SERIAL PRIMARY KEY, name VARCHAR(100), address VARCHAR(100))')
        res.status(200).send({
            message: "successfully created the table"
        })
    } catch (err) {
        res.sendStatus(500)
    }
})


app.listen(port, () => console.log(`Server has started on port: ${port}`))