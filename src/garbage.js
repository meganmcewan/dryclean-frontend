var firebase = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://washr-data.firebaseio.com"
});

export function getUsers() {
  //read data
  return database.ref('/Users').once('value')
  .then(snapshot => snapshot.val())
}

write data
database.ref('/Users/' + userID).set({
  name: 'paul'
});
//push example
database.ref('/Merchants/' + merchantID + '/orders').push().set(orderID);
//
var childref = ref.push();
console.log("new random key returned by firebase", childref.key);
childref.set({userName: "noe", passWord: '123'})

var ancestorRef = database.ref('/users/')
ancestorRef.once('value').then(d => {
    var obj = d.val();
    console.log(Object.keys(obj))
});
