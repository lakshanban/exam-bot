const express = require('express');
const cors = require('cors');
const parser = require('body-parser')
const { train, askQuestions } = require('./train-model')

const app = express();

app.use(cors({ credentials: true, origin: true }))
app.use(parser.urlencoded({extended: true}));
app.use(parser.json())

app.post('/question', (req, res) => {
    const question = req.body.question;
    console.log(req.body)
    askQuestions(question, (answer) => {
        res.status(200).json({answer})
    })
})

app.post('/train', (req, res) => {
    const text = req.body.text;
    console.log(text)
    train(text);
    res.status(200).json({result: "success"})
})

app.listen(3001, () => {
    console.log("server is running")
})