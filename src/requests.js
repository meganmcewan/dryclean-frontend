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


export function signup(email, username, password) {
  return firebase.auth().createUserWithEmailAndPassword(email, password)
  .then(firebaseUser => {
    database.ref('/Users/' + firebaseUser.uid).set({
        name: username,
        email: email
         
    });
    return firebaseUser;
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
        console.log(firebaseuser.uid)
        return firebaseuser.uid})

      .catch(function(error) {

        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage)
        console.log(errorCode)
        if(errorCode == 'auth/user-not-found' || errorCode == 'auth/wrong-password'){
           alert ('username or password incorrect')
        }
    
       
        // ...
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

export function addOrder(orderID, userID, info1, info2){

  database.ref('/Orders/' + orderID).set({
    orderID: orderID,
    userID: userID,
    info1: "input info1",
    info2: "input info2",
    orderConf: Math.floor((Math.random() * 100000) + 1)

  })
  database.ref('/Orders/'+ orderID).once('value')
  .then(snapshot => console.log(snapshot.val().orderConf))

  
  // .then (showAlert => alert(info))

}



async function test() {
 const user = await addOrder('293847', '3u3y', 'hello', 'hi');


//   setTimeout(signout, 2000)
    
}


test();