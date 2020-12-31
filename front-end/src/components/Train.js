import React, { useState } from 'react';
import { TextField, TextareaAutosize, Button , CircularProgress, Backdrop, makeStyles} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }));

export const Train = ({setTrain}) => {

    const classes = useStyles();
    const[text, setText] = useState('')
    const[loading, setLoading] = useState(false)

    const startTrain = () => {
        setLoading(true)
        fetch('http://localhost:3001/train', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: text })
        }).then(res => {
            return res.json()
        }).then(data => {
            setLoading(false)
            setTrain(true)
        })
    }

    return <div style={{backgroundColor: '#85ABFF', height: '100vh'}}>
        <h1 style={{color:'white' ,paddingTop: '30px',paddingBottom: '30px'}}>Enter Text to train model</h1>
        <TextareaAutosize style={{width: '60vw'}} variant="outlined" focused={true} autoFocus={true} value={text} onChange={(e) => {setText(e.target.value)}}  />
        <br />
        <Button variant='contained' style={{backgroundColor:'#6200EE', color: 'white',marginTop:'20px'}} onClick={startTrain}>Start Training</Button>
        <Backdrop open={loading} className={classes.backdrop}>
            <CircularProgress color='inherit' value='training' />
            <br />
            <p style={{marginTop: '15px', marginLeft:'10px'}}>training...</p>
        </Backdrop>
    </div>
}