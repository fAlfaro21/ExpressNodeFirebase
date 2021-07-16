//--1-------------------- Importar dependencias
const express = require('express');
const bodyParser = require('body-parser');
const firebase = require("firebase");

//--2--------------------- Configuración inicial
const server = express();
const listenPort = 8080;

const firebaseConfig = {
  apiKey: "AIzaSyCgaC_6dLirpmRNL21NJnqGELpWzPrt9aA",
  authDomain: "expressserver-5025a.firebaseapp.com",
  databaseURL: "https://expressserver-5025a-default-rtdb.firebaseio.com/",
  projectId: "expressserver-5025a",
  storageBucket: "expressserver-5025a.appspot.com",
  messagingSenderId: "576488831445",
  appId: "1:576488831445:web:8d914ec31e4cd349c9255c"
};

const staticFilesPath = express.static(__dirname + '/public'); 
server.use(staticFilesPath); //le digo que utilice dicho path

//Json support
server.use(bodyParser.urlencoded({extended: false}));
server.use(bodyParser.json());

// ------------------- API REST ------------

//GET Word from Firebase
server.get("/getAWordFromFireBase",(req,res)=>{
  console.log(req.body);
  firebase.database().ref('words/').once('value')
    .then (data => {
        res.send(JSON.stringify(data));
    })
    .catch(error => {
      res.send(JSON.stringify({msgError:"No hay datos"}))
    });
  })

//Post Word in Firebase
server.post('/postAWordInFireBase', (req,res) => {
  let newPostKey = firebase
                    .database()
                    .ref('words/')
                    .push().key;
  console.log(req.body);

  firebase.database().ref('words/' + newPostKey).update({
      id: newPostKey,
      word: req.body.word
    })
      .then(data => {
        res.send(JSON.stringify({ result: "Ok" }));
      })  
      .catch(error => {
        res.send(JSON.stringify({ msgError: "No se puede escribir" }));
      });
}); 

// PUT Word in Firebase (w/ async/await)
server.put('/putWordInFireBase/:wordId', async (req, res) => {
  let body = req.body;
  let params = req.params;
  //console.log(params);
  
  await firebase.database().ref('words/' + params.wordId).update({
    word: body.word
  })

  res.send({message: "Todo bien"});
});

async function init() {
  await firebase.initializeApp(firebaseConfig);
    
  server.listen(listenPort,
      () => console.log(`Server started listening on ${listenPort}`)
    );
  }
    
init();