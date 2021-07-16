
const firebase = require("firebase")

const firebaseConfig = {
  apiKey: "AIzaSyCgaC_6dLirpmRNL21NJnqGELpWzPrt9aA",
  authDomain: "expressserver-5025a.firebaseapp.com",
  //databaseURL: "https://expressserver-5025a-default-rtdb.firebaseio.com/",
  projectId: "expressserver-5025a",
  storageBucket: "expressserver-5025a.appspot.com",
  messagingSenderId: "576488831445",
  appId: "1:576488831445:web:8d914ec31e4cd349c9255c"
};

const db = firebase.initializeApp(firebaseConfig);
module.exports = db;
