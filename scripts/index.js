firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.  
      document.querySelector('.page__logged').style.display = "block";
      document.querySelector('.background').style.display = "none";
      document.querySelector('#userEmail').innerHTML = user.email;
      document.querySelector('#userEmailVery').innerHTML = user.emailVerified;
    } else {
      // No user is signed in.
      document.querySelector('.page__logged').style.display = "none";
      document.querySelector('.background').style.display = "block";

      //wszystkie małe zmienia się duży
      //duże zmienia się wszystkie małe mały 
  }
});

function login(){
    
    let userEmail = document.querySelector('#emailField').value;
    let userPass = document.querySelector('#passwordField').value;

    
    firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        window.alert(`Error : ${errorMessage}`);
        // ...
      });
   

}

function logout(){
    firebase.auth().signOut();
}

function openRegister(){
    document.querySelector(".log-in").style.display = "none";
    document.querySelector(".register").style.display = "flex";
}

function openLogin(){
    document.querySelector(".log-in").style.display = "flex";
    document.querySelector(".register").style.display = "none";
}

function toProfile(){
    document.querySelector(".page__profile").style.display = "inline-block";
    document.querySelector(".page__logged").style.display = "none";
    document.querySelector(".page__history").style.display = "none";
}

function toMain(){
    document.querySelector(".page__logged").style.display = "block";
    document.querySelector(".page__profile").style.display = "none";
    document.querySelector(".page__history").style.display = "none";
}
function toHistory(){
    document.querySelector(".page__history").style.display = "block";
    document.querySelector(".page__logged").style.display = "none";
    document.querySelector(".page__profile").style.display = "none";
}

function registerUser(){
    let userEmail, userPass1, userPass2;

    userEmail = document.querySelector(`#emailFieldRegister`).value;
    userPass1 = document.querySelector(`#passwordFieldRegister1`).value;
    userPass2 = document.querySelector(`#passwordFieldRegister2`).value;

    if(userPass1 === userPass2){
        firebase.auth().createUserWithEmailAndPassword(userEmail, userPass1).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            
            window.alert(`Error :${errorMessage}`)
            // ...
          });
    }else window.alert("Passwords are not the same.")
}

function passData(){
    let input = document.querySelector('.add__list').value;

    let newPostKey = firebase.database().ref();
    let currentEmail = firebase.auth().currentUser.email
    currentEmail = currentEmail.toString();

    newPostKey.child("Email").child("List").push(input);
}