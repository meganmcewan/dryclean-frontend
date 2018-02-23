import * as firebase from 'firebase'

var serviceAccount = require('./key.json')

var config = {
  apiKey: 'AIzaSyAtYDJn0gbF88ReFYIAi_F1EBTcl3rAGTE',
  authDomain: 'washr-data.firebaseapp.com',
  databaseURL: 'https://washr-data.firebaseio.com',
  projectId: 'washr-data',
  storageBucket: 'washr-data.appspot.com',
  messagingSenderId: '700840172175'
}
const app = firebase.initializeApp(config)

var database = firebase.database()

/// //////login, sign up and singout functions//////////

export function registerMerchant (merchantObj, priceObj) {
    // this is to write the data
  var merchantId = merchantObj.merchantId
  console.log(merchantId)

  database.ref('/Merchants/' + merchantId).set({
    merchantId: merchantId,
    businessAddress: merchantObj.businessAddress,
    city: merchantObj.city,
    province: merchantObj.province,
    postalCode: merchantObj.postalCode,
    businessPhoneNum: merchantObj.businessPhoneNum
    
  })

// export function registerMerchant (merchantObj, priceObj){
//     // this is to write the data
//     var merchantId= merchantObj.merchantId

//     database.ref('/Merchants/' + merchantId).set({ 
//       merchantID: merchantId, 
//       businessAddress: merchantObj.businessAddress,
//       city: merchantObj.city,  
//       province: merchantObj.province,
//       postalCode: merchantObj.postalCode,
//       businessPhoneNum: merchantObj.businessPhoneNum
  
  
//   })

  console.log('merchant is registered')

    database.ref('/Prices/'+ merchantId + '/Regular/').set({
      merchantId: merchantId,
      trousers: priceObj.regular.trousers,
      suit: priceObj.regular.suit,
      overcoat: priceObj.regular.overcoat,
      ladiesSuit: priceObj.regular.ladiesSuit,
      dress: priceObj.regular.dress,
      skirt: priceObj.regular.skirt,
      jacket: priceObj.regular.jacket,
      blouse: priceObj.regular.blouse,
      tie: priceObj.regular.tie

  })

    console.log("regular prices are registered for user:", merchantId)

    database.ref('/Prices/'+ merchantId + '/Express/').set({
      merchantId: merchantId,
      trousers: priceObj.express.trousers,
      suit: priceObj.express.suit,
      overcoat: priceObj.express.overcoat,
      ladiesSuit: priceObj.express.ladiesSuit,
      dress: priceObj.express.dress,
      skirt: priceObj.express.skirt,
      jacket: priceObj.express.jacket,
      blouse: priceObj.express.blouse,
      tie: priceObj.express.tie

  })

    console.log('express prices are registered for user:', merchantId)
  
}

// export function registerPrices (priceObj) {

// }

export function registerUser (email, userType, password) {
  return firebase.auth().createUserWithEmailAndPassword(email, password)
  .then(firebaseUser => {
    database.ref('/Users/' + firebaseUser.uid).set({
      email: email,
      userType: userType.toLowerCase()

    })

    return { userId: firebaseUser.uid }
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

export function login (email, password) {
  return firebase.auth().signInWithEmailAndPassword(email, password)
    .then(firebaseuser => {
      return firebaseuser.uid
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

export function signout () {
  firebase.auth().signOut().then(function () {
    console.log('sign out sucessful')
    // Sign-out successful.
  }).catch(function (error) {
    console.log('something bad')
    // An error happened.
  })
}

/// ////// order related functions ///////

// this order creates a new orderID, generates a readable order number
// send the merchant ID and details, the current date and generates
// standard and express delivery dates

export function createNewOrder (userId) {
  console.log('create new order running on back')

  database.ref('Merchants/' + userId + '/Orders/').push().set({
    orderNum: '10001'

  })

  database.ref('/Orders/').push().set({
    orderNum: '10000',
    merchantID: userId,
    date: 'currentDate',
    standardReady: 'current date + 3 days',
    expressReady: 'current date +1 day'

  })

  database.ref('/Merchants/' + userId).once('value')
  .then(snapshot => {
    console.log('this is snapshot', snapshot.val())
    return snapshot.val()
  })
}

// this function checks to see if the phone number exists. if exits will return
// user object, if not will create a new user with this number

function getUser(snapshot) {
  let users = [];
  snapshot.forEach(item => {
    users.push({value:item.val(), userId: item.key})
  })
  return users.length > 0 ? users[0] : null;
}

export async function checkPhoneNum (phoneNumber, merchantID){

    //checks if phone number exits. if it does send obj


    var snapshot = await database.ref('/Users/')
    .orderByChild('phoneNumber')
    .equalTo(phoneNumber)
    .once('value');
    
    let user = getUser(snapshot);

    if (!user){
        var newUser = await database.ref('/Users/').push();
        await newUser.set({
           phoneNumber: phoneNumber,
       })
       
       return {status: 1, msg: "User added!", userId: newUser.key, phoneNumber: phoneNumber}
     }
     else{
       return {status: 0, msg: "User found!", userId: user.userId, phoneNumber: user.value.phoneNumber}
     }


}

/////// adds user details if user is new, or updates info if necessary/////

export async function addUserDetails (userObj, merchantID){
  console.log("user obj is" ,userObj, "merchant id is", merchantID,
"this is userobj.userId", userObj.userId)

 

  var newClient = await database.ref('/Users/' + userObj.userId).set({
      phoneNumber: userObj.phoneNumber,
      clientName: userObj.clientName,
      clientAddress: userObj.clientAddress,
      city: userObj.city,
      province: userObj.province,
      postalCode: userObj.postalCode

  })
//   database.ref('/Orders/'+ ).push().set({
//     orderNum: '10001',

//  })

//need to map address to current user ID as well as order number

}




export function addOrder(orderObj, merchantID, userID){

  // this is to write the data
var orderID = 10001
  database.ref('/Orders/' + orderID).set({
    orderID: orderID,
    userID: userID,
    info1: "input info1",
    info2: "input info2",
    orderStatus: "open",
    orderConf: Math.floor((Math.random() * 100000) + 1)

  })

  database.ref('Merchants/' +userID + '/Orders/').push().set({
    allOrders: orderID
  })

  //this is to read the data 

  database.ref('/Orders/'+ orderID).once('value')
  // .then(snapshot => console.log(snapshot.val()))
}

export function ordersDashboard (userID) {
  database.ref('/Orders/').once('value')
    .then(snapshot => console.log(snapshot.val()))
}

    
  
  
