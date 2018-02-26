
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.raw({ type: '*/*', limit: '50mb' }))

// import * as twilio from 'twilio';


app.post('/sendSms',(req,res) => {
  

var phoneNumber = JSON.parse(req.body);
var number = phoneNumber.test
var message = phoneNumber.message

  const accountSid = 'AC337aa387cfff0cd085a7d8fa5ce0029d';
  const authToken = 'dfa890f3d103a7b7c9581d2a495fda3b';
  const client = require('twilio')(accountSid, authToken);
  
  client.messages.create({
      to: number,
      from: '+15146002367',
      body: message,
    })

    
    .then(res.send(JSON.stringify("SENDING")))
})

app.listen(3005, () => console.log('Port 3005'))








//////

// sendSms = () => {
//   var number = '+15147120366';
//   var message = 'Bon matin antoine'
//    fetch('/sendSms', {
//      method: "POST",
     
//      body: JSON.stringify({
//       test: number,
//       message: message
//      })
 
//    }).then()
//    }