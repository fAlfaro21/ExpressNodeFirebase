
  // document  //1. Lectura GET estática
  // .querySelector("#getAWord")
  // .addEventListener("click", () => {
  //   fetch("/getWord") //manipula el endpoint en el navegador
  //     .then(response => response.json())
  //     .then(data => {
  //       data.map(myWord => {
  //         wordDiv = document.querySelector("#getAWordDiv");
  //         printWord = document.createElement("p");
  //         printWord.innerHTML = myWord.word;
  //         wordDiv.appendChild(printWord);              
  //     })
  //   })
  // });

  // document  //2. Lectura GET a un fichero
  // .querySelector("#getAWordFromFile")
  // .addEventListener("click", () => {
  //   fetch("wordsFile.json") 
  //     .then(response => response.json())
  //     .then(data => {
  //       data.map(myWord => {
  //         wordDiv = document.querySelector("#getAWordDiv");
  //         printWord = document.createElement("p");
  //         printWord.innerHTML = myWord.word;
  //         wordDiv.appendChild(printWord);
  //       })
  //     })
  //     .catch(error => console.error('Error:', error))
  //     .then(response => console.log('Success:', response));
  // });

  let wordId;
  let wordsArray = [];

  function eraseContainer (array){
    for (let i = 0; i < array.length; i++) {
      wordsArray[i].remove();
    };
  }

  document  //3. Lectura GET a firebase
  .querySelector("#getAWordFromFireBase")
  .addEventListener("click", () => {
    fetch("/getAWordFromFireBase") 
      .then(response => response.json())
      .then(data => {

          //eraseContainer(wordsArray);

          Object.values(data).map(myWord => { //Object me permite pasar un objeto a array, para poder utilizar un map
          wordDiv = document.querySelector("#getAWordDiv");
          printWord = document.createElement("p");
          printWord.innerHTML = myWord.word;
          wordDiv.appendChild(printWord);

          //wordsArray.push(wordDiv);

          printModButton = document.createElement("button");
          printModButton.innerText = "Modificar palabra";
          wordDiv.appendChild(printModButton); 

          //wordsArray.push(printModButton);

          printId = document.createAttribute("id"); 
          printId.value = myWord.id;            
          printModButton.setAttributeNode(printId);  
          
          document  // PUT in firebase
              .getElementById(myWord.id)
              .addEventListener("click", () => {

              const user = {
                id: myWord.id,
                word: document.querySelector("#newWord").value
                };
              
              console.log(user);

              const options = {
              method: 'PUT',
              body: JSON.stringify(user),
              headers: {
                'Content-Type': 'application/json'
                }
              }
              
              fetch("/putWordInFireBase/" + myWord.id, options)
              .then(response => response.json())
              .then(data => {
                console.log(data.result);
              })
          })
        })
      })
      .catch(error => console.error('Error:', error))
      .then(response => console.log('Success:', response));
  });

  document  //Escritura POST in firebase
      .querySelector("#postAWord")
      .addEventListener("click", () => {

        const user = {
          word: newWord.value
        };
    
        const options = {
          method: 'POST',
          body: JSON.stringify(user),
          headers: {
            'Content-Type': 'application/json'
          }
        }

        fetch("/postAWordInFireBase", options)
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => console.log('Success:', response));
  });