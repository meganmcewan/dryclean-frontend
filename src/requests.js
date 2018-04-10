import { sendReminderSms, sendPastDueSms } from './smsConfigFile.js'
import firebase from './firebaseConfig.js'


var database = firebase.database()

/// //////login, sign up and singout functions//////////

/// ///////SIGN UP FUNCITON /////////////

export function registerUser (email, password) {
  return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(firebaseUser => {
      database.ref('/Merchants/' + firebaseUser.uid).set({
        merchantId: firebaseUser.uid,
        email: email

      })

      return { merchantId: firebaseUser.uid }
    })

    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code
      var errorMessage = error.message
      if (errorCode == 'auth/weak-password') {
        alert('The password is too weak.')
      } else {
        alert(errorMessage)
      }
      console.log(error)
    })
}

export function checkLogin () {
  var user = firebase.auth().currentUser
  return {user}
}

/// //////LOGIN FUNCTION////////

export function login (email, password) {
  return firebase.auth().signInWithEmailAndPassword(email, password)
    .then(firebaseuser => {
      return { merchantId: firebaseuser.uid, firebaseuser }
    })

    // Handle Errors here.

    .catch(function (error) {
      var errorCode = error.code
      var errorMessage = error.message
      console.log(errorMessage)
      console.log(errorCode)
      if (errorCode == 'auth/user-not-found' || errorCode == 'auth/wrong-password') {
        alert('username or password incorrect')
      }
    })
}

/// ///////SIGN OUT FUNCTION/////////

export function signout () {
  firebase.auth().signOut().then(function () {
    console.log('sign out sucessful')
    // Sign-out successful.
  }).catch(function (error) {
    console.log('something bad')
    // An error happened.
  })
}

/// /////////REGSITER A MERCHANT///////////

export async function registerMerchant (merchantObj, priceObj) {
  // this is to write the data
  var merchantId = await merchantObj.merchantId
  console.log('here is merchant id', merchantObj.merchantId)

  var newMerchant = await database.ref('/Merchants/' + merchantId).set({
    merchantId: merchantId,
    merchantFullName: merchantObj.merchantFullName,
    merchantPersonalNumber: merchantObj.merchantPersonalNumber,
    businessName: merchantObj.businessName,
    businessAddress: merchantObj.businessAddress,
    city: merchantObj.city,
    province: merchantObj.province,
    postalCode: merchantObj.postalCode,
    businessPhoneNum: merchantObj.businessPhoneNum

  })

  console.log('merchant is registered')

  database.ref('/Merchants/' + merchantId + '/Prices/' + '/Regular/').set({
    trousers: priceObj.regular.trousers,
    suit: priceObj.regular.suit,
    overcoat: priceObj.regular.overcoat,
    ladiesSuit: priceObj.regular.ladiesSuit,
    dress: priceObj.regular.dress,
    skirt: priceObj.regular.skirt,
    jacket: priceObj.regular.jacket,
    blouse: priceObj.regular.blouse,
    shirt: priceObj.regular.shirt,
    tie: priceObj.regular.tie

  })

  console.log('regular prices are registered for user:', merchantId)

 
}

/// ////// order related functions ///////

/// ///checks if phone number exits. if it does send obj//////

// this function checks to see if the phone number exists. if exits will return
// user object, if not will create a new user with this number

function getUser (snapshot) {
  let users = []
  snapshot.forEach(item => {
    users.push({ value: item.val(), userId: item.key })
  })
  return users.length > 0 ? users[0] : null
}

export async function checkPhoneNum (phoneNumber, merchantId) {
  console.log('merchant mrechant id that is in the back of checkphone', merchantId)

  var snapshot = await database.ref('/Merchants/' + merchantId + '/Users/')
    .orderByChild('phoneNumber')
    .equalTo(phoneNumber)
    .once('value')

  let user = getUser(snapshot)

  if (!user) {
    var newUser = await database.ref('/Merchants/' + merchantId + '/Users/').push()
    await newUser.set({
      phoneNumber: phoneNumber, merchantId: merchantId
    })

    return {
      status: 1,
      msg: 'User added!',
      userId: newUser.key,
      phoneNumber: phoneNumber,
      merchantId: merchantId
    }
  } else {
    return {
      status: 0,
      msg: 'User found!',
      userId: user.userId,
      clientName: user.value.clientName,
      clientAddress: user.value.clientAddress,
      clientCity: user.value.clientCity,
      clientProvinceState: user.value.clientProvinceState,
      clientPostalZip: user.value.clientPostalZip,
      phoneNumber: user.value.phoneNumber,
      merchantId: merchantId
    }
  }
}

/// //// adds user details if user is new, or updates info if necessary/////

export async function addUserDetails (userObj, merchantId) {
  var newClient = await database.ref('/Merchants/' + merchantId.merchantId + '/Users/' + userObj.userId).update({
    phoneNumber: userObj.phoneNumber,
    clientName: userObj.clientName,
    clientAddress: userObj.clientAddress,
    clientCity: userObj.clientCity,
    clientProvinceState: userObj.clientProvinceState,
    clientPostalZip: userObj.clientPostalZip,
    userId: userObj.userId

  })
}

/// ///a function to get prices of  merchants when you open a new order form/////

export async function getMerchantPrices (merchantObj) {
  var prices = await database.ref('Merchants/' + merchantObj.merchantId + '/Prices/')
    .once('value')

  return {merchantId: merchantObj.merchantId, prices: prices.val()}
}

export async function findOrder (merchantId, orderId) {
  var orderObject = await database.ref('Merchants/' + merchantId + '/Orders/' + orderId)
    .once('value')

  var merchant = await database.ref('/Merchants/' + merchantId)
    .once('value')

  var merchantAddress = merchant.val()
  console.log('this is the return from view order funciton ', {orderObject: orderObject.val(), merchantAddress: merchantAddress})

  return {
    orderObject: orderObject.val(),
    merchantAddress: {

      merchantFullName: merchantAddress.merchantFullName,
      merchantPersonalNumber: merchantAddress.merchantPersonalNumber,
      businessName: merchantAddress.businessName,
      businessAddress: merchantAddress.businessAddress,
      city: merchantAddress.city,
      province: merchantAddress.province,
      postalCode: merchantAddress.postalCode,
      businessPhoneNum: merchantAddress.businessPhoneNum
    }
  }
}

/// ///////get the address of the merchant so it can be displayed in the confirmation ///////

export async function getMerchantAddress (merchantObj) {
  var address = await database.ref('Merchants/' + merchantObj.merchantId)
    .once('value')
  var merchantAddress = address.val()

  return {

    merchantAddress: {

      merchantFullName: merchantAddress.merchantFullName,
      merchantPersonalNumber: merchantAddress.merchantPersonalNumber,
      businessName: merchantAddress.businessName,
      businessAddress: merchantAddress.businessAddress,
      city: merchantAddress.city,
      province: merchantAddress.province,
      postalCode: merchantAddress.postalCode,
      businessPhoneNum: merchantAddress.businessPhoneNum
    }
  }
}

/// /////create new order function stores the order summary object in firebase///////////
let ndate = new Date()  /// // give the curent that in time
let year = ndate.getFullYear()
let month = ndate.getMonth() + 1
let day = ndate.getDate()
let date = month + '/' + day + '/' + year
let timestamp = ndate.getTime()



export async function createNewOrder (theWholeState) {
  var newOrder = await database.ref('/Merchants/' + theWholeState.orderSummary.merchantObj.merchantId + '/Orders/')
  .push(
    {

      merchantId: theWholeState.orderSummary.merchantObj.merchantId,
      timestamp: timestamp,
      date: date,
      standardReady:  month + '/' + (day+3) + '/' + year,
      expressReady:  month + '/' + (day+1) + '/' + year,
      orderStatus: 'open',
      inProgress: true,
      clientObj: theWholeState.orderSummary.clientObj,
      blouse: theWholeState.orderSummary.blouse,
      dress: theWholeState.orderSummary.dress,
      jacket: theWholeState.orderSummary.jacket,
      ladiesSuit: theWholeState.orderSummary.ladiesSuit,
      overcoat: theWholeState.orderSummary.overcoat,
      shirt: theWholeState.orderSummary.shirt,
      skirt: theWholeState.orderSummary.skirt,
      suit: theWholeState.orderSummary.suit,
      tie: theWholeState.orderSummary.tie,
      trousers: theWholeState.orderSummary.trousers,
      totalPrice: theWholeState.totalPrice,
      surCharge:  theWholeState.surCharge,
      orderNumber: theWholeState.orderSummary.orderNumber,
      merchantObj: theWholeState.orderSummary.merchantObj,
      isExpress: theWholeState.isExpress

    }
  )

  var getKey = await database.ref('/Merchants/' + theWholeState.orderSummary.merchantObj.merchantId + '/Orders/' + newOrder.key)
  .update({
    orderId: newOrder.key
  })

  var orderConfirmation = await database.ref('/Merchants/' + theWholeState.orderSummary.merchantObj.merchantId + '/Orders/' + newOrder.key)
  .once('value')

  return {orderConfirmation: orderConfirmation.val()}
}

/// //////////////DASHBOARD FUNCTIONS ///////////////////////

/// ////this function gets all of the orders for the requested merchant and is called //////

function makeOrdersArr (snapshot) {
 
  let allOrders = []

  snapshot.forEach(item => {
    allOrders.push(item.val())
  })
  return allOrders

}


/// /////check and mark past due orders /////////////

export async function getOpenOrders (merchantObj) {
  var snapshot = await database.ref('/Merchants/' + merchantObj.merchantId + '/Orders/')
      .once('value')

  let openOrders = []
  let merchantOrders = makeOrdersArr(snapshot)
  let onlyOpenOrders = []
  let pastDueOrders = []

  var getOpenOrders = await merchantOrders.forEach(order => {
    if (order.orderStatus === 'open') {
      openOrders.push(order)
    }
  })

  var checkTimeStamp = await openOrders.forEach(order => {
    console.log('this is the math', ndate.getTime() - order.timestamp)
    if ((ndate.getTime() - order.timestamp) > 30000 && (ndate.getTime() - order.timestamp) < 300000) {
      var updateProgress = database.ref('/Merchants/' + order.merchantId +
          '/Orders/' + order.orderId)
          .update({
            inProgress: false
          })
      sendReminderSms(order)
    } else if ((ndate.getTime() - order.timestamp) > 600000) {
      var updateStatus = database.ref('/Merchants/' + order.merchantId +
            '/Orders/' + order.orderId)
            .update({
              orderStatus: 'past due'
            })
    }
    sendPastDueSms(order)
  })

  var newSnapshot = await database.ref('/Merchants/' + merchantObj.merchantId + '/Orders/')
      .once('value')

  let newMerchantOrders = makeOrdersArr(newSnapshot)

  newMerchantOrders.forEach(order => {
    if (order.orderStatus === 'open') {
      onlyOpenOrders.push(order)
    } else if (order.orderStatus === 'past due') { pastDueOrders.push(order) }
  })

  console.log('this is the return ', { openOrders: onlyOpenOrders, pastDueOrders: pastDueOrders })

  return { openOrders: onlyOpenOrders, pastDueOrders: pastDueOrders }
}

/// / closed order function/////

export async function getClosedOrders (merchantObj) {
  var snapshot = await database.ref('/Merchants/' + merchantObj.merchantId + '/Orders/')
    .once('value')

  let closedOrders = []
  let merchantOrders = makeOrdersArr(snapshot)

  merchantOrders.forEach(order => {
    if (order.orderStatus === 'closed') {
      closedOrders.push(order)
    }
  })

  return { closedOrders: closedOrders }
}

/// /////past due function///////

export async function getPastDueOrders (merchantObj) {
  var snapshot = await database.ref('/Merchants/' + merchantObj.merchantId + '/Orders/')
    .once('value')

  let pastDueOrders = []
  let merchantOrders = makeOrdersArr(snapshot)

  merchantOrders.forEach(order => {
    if (order.orderStatus === 'past due') {
      pastDueOrders.push(order)
    }
  })

  return { pastDueOrders: pastDueOrders }
}

/// /////////update status of an existing order by clicking on picked up in dahsboard/////////

export async function markPickedUp (orderObj) {
  var updateStatus = await database.ref('/Merchants/' + orderObj.merchantId +
  '/Orders/' + orderObj.orderId)
  .update({
    orderStatus: 'closed'
  })

  var updatedOrder = await database.ref('/Merchants/' + orderObj.merchantId +
  '/Orders/' + orderObj.orderId)
  .once('value')

  console.log('this is the updated order from back', updatedOrder.val())
  return {orderDetails: updatedOrder.val()}
}

//////////////////////SEARCH FUNCTION////////////////////////////////

export async function getSearchResults (merchantId, searchInput) {

  var snapshot = await database.ref('/Merchants/' + merchantId + '/Orders/')
      .once('value')

  let merchantOrders = makeOrdersArr(snapshot)
  
  var searchResults = []
  searchInput = searchInput.toLowerCase()

  console.log("this is merchant orders", merchantOrders)
  console.log("this is search in put", searchInput)

  for (let i in merchantOrders) {
      var searchOrderNumber = merchantOrders[i].orderNumber.toString()
      
      var searchClientName = merchantOrders[i].clientObj.clientFullName.toLowerCase()
     
      var searchPhoneNumber = merchantOrders[i].clientObj.clientPersonalNumber

    if (searchOrderNumber === searchInput || searchClientName.includes(searchInput) || searchPhoneNumber.includes(searchInput)) {
      searchResults = searchResults.concat(merchantOrders[i])
    }
  }
  console.log('this are the search results', searchResults)
  return {searchResults: searchResults}
}



