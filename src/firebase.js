import firebase from 'firebase';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyBr-u3_mkKyTsNJzK120Say9aRIYziNn08",
  authDomain: "booklynx2.firebaseapp.com",
  databaseURL: "https://booklynx2.firebaseio.com",
  projectId: "booklynx2",
  storageBucket: "booklynx2.appspot.com",
  messagingSenderId: "293945816139"   
};
firebase.initializeApp(config);


// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();
var auth = firebase.auth();

// Disable deprecated features
db.settings({
  timestampsInSnapshots: true
});

export { db, auth };