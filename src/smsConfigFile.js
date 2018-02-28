
var sendReminderSms = (x) => {
  var number = '' + x.clientObj.clientPersonalNumber
  console.log(x.clientObj.clientPersonalNumber)
  console.log('console.log of the SmsNumber', number)
  var message = "This is friendly reminder from clnr, it's time to pick up your dry-cleaning (no. " + x.orderNumber + ') from ' + x.merchantObj.merchantAddress.businessName + '. ' + 'Have a great day ' + x.clientObj.clientFullName + '!'

  fetch('/sendSms', {
    method: 'POST',
    body: JSON.stringify({
      phoneNumber: number,
      message: message
    })
  }).then(x => console.log("I've Fetched for SmsReminder"))
}

var sendPastDueSms = (x) => {
  var number = '' + x.clientObj.clientPersonalNumber
  console.log(x.clientObj.clientPersonalNumber)
  console.log('console.log of the Past due SmsNumber', number)
  var message = 'Hey ' + x.clientObj.clientFullName + '! Missing some laundry? Just a reminder to pick up your dry-cleaning (no. ' + x.orderNumber + ') from ' + x.merchantObj.merchantAddress.businessName + '.'

  fetch('/sendSms', {
    method: 'POST',
    body: JSON.stringify({
      phoneNumber: number,
      message: message
    })
  }).then(x => console.log("I've Fetched for SmsReminder"))
}

export {
    sendPastDueSms,
    sendReminderSms
}
