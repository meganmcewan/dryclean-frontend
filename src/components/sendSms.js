
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.raw({ type: '*/*', limit: '50mb' }))

app.post('/sendSms', (req, res) => {
  var smsInfo = JSON.parse(req.body)
  var number = '+1' + smsInfo.phoneNumber
  console.log('number in sendSms.js', number)
  var message = smsInfo.message
  console.log('message in sendSms.js', message)

  const accountSid = 'AC337aa387cfff0cd085a7d8fa5ce0029d'
  const authToken = 'dfa890f3d103a7b7c9581d2a495fda3b'
  const client = require('twilio')(accountSid, authToken)

  client.messages.create({
    to: number,
    from: '+15146002367',
    body: message
  })

    .then(res.send(JSON.stringify('SENDING')))
})

app.listen(3005, () => console.log('Port 3005'))

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
