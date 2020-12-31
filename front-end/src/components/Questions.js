import React, { useState } from 'react';
import { TextField, TextareaAutosize, Button, CircularProgress, Backdrop, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

export const Questions = ({setTrain}) => {

    const classes = useStyles();
    const [questionQ, setQuestionQ] = useState('')
    const [question, setQuestion] = useState('')
    const [answer, setAnswer] = useState('')

    const askQuestion = () => {
        fetch('http://localhost:3001/question', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ question: questionQ })
        }).then(res => {
            return res.json()
        }).then(data => {
            setQuestion(questionQ)
            setAnswer(data.answer)
            setQuestionQ('')
        })

    }

    return <div>
        <h1 style={{ color: 'black', paddingTop: '30px', paddingBottom: '30px' }}>Ask Questions?</h1> 
        <TextField style={{ width: '60vw' }} variant="outlined" focused={true} autoFocus={true} value={questionQ} onChange={(e) => { setQuestionQ(e.target.value) }} />
        <br />
        <Button variant='contained' style={{ backgroundColor: '#6200EE', color: 'white', marginTop: '20px' }} onClick={askQuestion}>Get Answer</Button>

        <div style={{marginTop: '10vh'}}>
        <h1 style={{ color: 'black', paddingTop: '30px', paddingBottom: '30px' }}>{question}</h1>
        <TextField style={{ width: '60vw', fontSize:'20px', color: 'red' }} variant="outlined" value={answer} focused={false} />
        <br />
        <Button style={{marginTop:'20vh', backgroundColor:'green', color:'white'}} onClick={()=>{setTrain(false)}}>Train New Modal</Button>
        </div>
        </div>
}