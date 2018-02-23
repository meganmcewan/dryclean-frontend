import * as firebase from 'firebase';

var serviceAccount = require("./key.json");

var config = {
    apiKey: "AIzaSyAtYDJn0gbF88ReFYIAi_F1EBTcl3rAGTE",
    authDomain: "washr-data.firebaseapp.com",
    databaseURL: "https://washr-data.firebaseio.com",
    projectId: "washr-data",
    storageBucket: "washr-data.appspot.com",
    messagingSenderId: "700840172175"
  };
const app = firebase.initializeApp(config);

var database = firebase.database();



/////////login, sign up and singout functions//////////

export function registerMerchant (merchantObj, priceObj){
    // this is to write the data
    var userID = merchantObj.userID

    database.ref('/Merchants/' + userID).set({ 
      userID: userID,
      businessAddress: merchantObj.businessAddress,
      city: merchantObj.city, 
      province: merchantObj.province,
      postalCode: merchantObj.postalCode,
      businessPhoneNum: merchantObj.businessPhoneNum
  
    })

    console.log('merchant is registered')

    database.ref('/Prices/'+ userID + '/Regular/').set({
      userID: userID,
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

    console.log("regular prices are registered for user:", userID)

    database.ref('/Prices/'+ userID + '/Express/').set({
      userID: userID,
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

    console.log('express prices are registered for user:', userID)
  
}

export function registerPrices (priceObj){

}

export function registerUser(email, userType, password ) {
  return firebase.auth().createUserWithEmailAndPassword(email, password)
  .then(firebaseUser => {
    database.ref('/Users/' + firebaseUser.uid).set({
        email: email,
        userType: userType.toLowerCase(),
      
    });
 
  return firebaseUser.uid;
  })

  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    if (errorCode == 'auth/weak-password') {
      alert('The password is too weak.');
    } else {
      alert(errorMessage);
    }
    console.log(error);
  });
}



export function login (email, password){
    return firebase.auth().signInWithEmailAndPassword(email, password)
    .then (firebaseuser => {
       
        return firebaseuser.uid  })

         // Handle Errors here.

      .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage)
        console.log(errorCode)
        if(errorCode == 'auth/user-not-found' || errorCode == 'auth/wrong-password'){
           alert ('username or password incorrect')
           
        }
    

      });
      
}

export function signout(){
    firebase.auth().signOut().then(function() {
        console.log("sign out sucessful")
    // Sign-out successful.
  }).catch(function(error) {
      console.log('something bad')
    // An error happened.
  });
}


///////// order related functions ///////

// this order creates a new orderID, generates a readable order number
// send the merchant ID and details, the current date and generates 
// standard and express delivery dates

export function createNewOrder (userId) {
  console.log('create new order running on back')

  database.ref('Merchants/' + userId + '/Orders/').push().set({
     orderNum: '10001',

  })

  database.ref('/Orders/').push().set({
    orderNum: '10000',
    merchantID: userId,
    date: 'currentDate',
    standardReady: 'current date + 3 days',
    expressReady: 'current date +1 day'

  })

  database.ref('/Merchants/' + userId).once('value')
  .then(snapshot => { console.log('this is snapshot',snapshot.val())
    return snapshot.val()})
  
 
}

// this function checks to see if the phone number exists. if exits will return
// user object, if not will create a new user with this number


export async function checkPhoneNum (phoneNumber, merchantID){

    //checks if phone number exits. if it does send obj
    var users= [];
    var orderByChild = await database.ref('/Users/')
    .orderByChild('phoneNumber')
    .equalTo(phoneNumber)
    .once('value')
    .then(snapshot => {
      snapshot.forEach(item => {
        users.push({value:item.val(), key: item.key})
        
      })
    })

    if (!users.length){
        var newUser = await database.ref('/Users/').push();
        await newUser.set({
           phoneNumber: phoneNumber,
       })
      
      //  console.log('new user just added', newUser.key)
       return {status: 1, msg: "User added!", key: newUser.key, phoneNumber: phoneNumber}
     }
     else{
       //
       return {status: 0, msg: "User found!", key: users[0].key, phoneNumber: users[0].value.phoneNumber}
     }
  
    // database.ref('/Users/').once('value')
    // .then(snapshot => {console.log('this is snapshot of users', snapshot.val())
    // var users = snapshot.val();

    // })

}

/////// adds order details to order created previously above /////







// export function addOrder(orderObj){

//   // this is to write the data

//   database.ref('/Orders/' + orderID).set({
//     orderID: orderID,
//     userID: userID,
//     info1: "input info1",
//     info2: "input info2",
//     orderStatus: "open",
//     orderConf: Math.floor((Math.random() * 100000) + 1)

//   })

//   database.ref('Merchants/' +userID + '/Orders/').push().set({
//     allOrders: orderID
//   })

//   //this is to read the data 

//   database.ref('/Orders/'+ orderID).once('value')
//   // .then(snapshot => console.log(snapshot.val()))
// }

  export function ordersDashboard (userID){

    
    database.ref('/Orders/').once('value')
    .then(snapshot => console.log(snapshot.val()) )
  }
  
  // .then (showAlert => alert(info))

// }


///////  testing area ////////



// async function test() {
//  const user = await addOrder('293847', '3u3y', 'hello', 'hi');


// //   setTimeout(signout, 2000)
    
// }

// test();