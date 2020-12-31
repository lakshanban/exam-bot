const fs = require('fs')
const brain = require('brain.js')
const neuNet = new brain.recurrent.LSTM();

let array = [];

const train = (sampleData) => {
    array = sampleData.toString().split('.');
    neuNet.train(array, {
        iterations: 1000,
        log: true,
        errorThresh: 0.01
    })
    fs.writeFile('learnt.json', JSON.stringify(neuNet.toJSON()),(err) => {
        console.log(err)
    })
}

const askQuestions = (question, fn) => {
    let answer = ''
    fs.readFile('learnt.json', (err, data) => {
        if(err) return err;
        if(data.toString() === ''){
          train();
          neuNet.fromJSON(JSON.parse(data.toString()))
        }else {
            neuNet.fromJSON(JSON.parse(data.toString())) 
        }
        answer = neuNet.run(question)
        answer === '' ? answer= 'Sorry....': null
        fn(answer)
    })
}

module.exports = {
    train,
    askQuestions
}