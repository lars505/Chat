// Initial config
// This is not "real security", API Keys are
// able to authenticate users, anything else :D
const firebaseConfig = {
    apiKey: "AIzaSyCdT7M9Vsfu_37sLBYaKE4i-I53A4WwxCk",
    authDomain: "autenticacion09.firebaseapp.com",
    databaseURL: "https://autenticacion09.firebaseio.com",
    projectId: "autenticacion09",
    storageBucket: "autenticacion09.appspot.com",
    messagingSenderId: "27182972676",
    appId: "1:27182972676:web:75c858b8fd9494766e9a51",
    measurementId: "G-X59VQ6N1KC"

  };
  
  firebase.initializeApp(firebaseConfig);
  
  
  // Connect application with firebase
  const form = document.forms['loginForm'];
  firebase.auth().onAuthStateChanged(handleAuthState);
  form.addEventListener('submit', handleFormSubmit);
  
  
  // Application defs
  function handleAuthState(user) {
    if (user) {
      showPrivateInfo()
      return console.log('Habemus user');
    }
  
    showLoginForm()
    return console.log('No habemus user');
  }
  
  function handleFormSubmit(event) {
    event.preventDefault();
  
    const email = form['email'].value;
    const password = form['password'].value;
    const isLoginOrSignup = form['isLoginOrSignup'].value;
  
    if (isLoginOrSignup === 'isLogin') {
      return loginUser({ email, password });
    }
  
    return createUser({ email, password });
  }
  
  
  // Application Utils
  function showPrivateInfo(user) {
    const loginForm = document.getElementById('loginFormUI');
    loginForm.style.display = 'none';
  
    const hiddenPrivateInfo = document.getElementById('hiddenPrivateInfo');
    hiddenPrivateInfo.style.display = 'block';
    hiddenPrivateInfo.innerHTML = `
      <p>Esto <b>SI</b> es información confidencial ㊙</p>
      <button id="btnLogout" class="button">Logout</button>
    `;
  
    const btnLogout = document.getElementById('btnLogout');
    btnLogout.addEventListener('click', signoutUser);
  }
  
  function showLoginForm() {
    const loginForm = document.getElementById('loginFormUI');
    loginForm.style.display = 'block';
  
    const hiddenPrivateInfo = document.getElementById('hiddenPrivateInfo');
    hiddenPrivateInfo.style.display = 'none';
    hiddenPrivateInfo.innerHTML = `
      <p>Nada que mostrar, tenes que logearte, bro...</p>
    `;
  }
  
  
  // Firebase defs
  function createUser({ email, password }) {
    console.log('Creating user ' + email);
  
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(function (user) {
        console.log('¡Creamos el Usuario, CRACK!');
      })
      .catch(function (error) {
        if (error.code === 'auth/email-already-in-use') {
          console.log('Ya existe el usuario');
          const soLogin = confirm(
            `Ya te habias registrado con este email, CRACK!.
            ¿Quieres iniciar sesión?`
          );
          return !!soLogin ? loginUser({ email, password }) : alertTryAgain(error);;
        }
  
        return alertTryAgain(error);
      });
  }
  
  function loginUser({ email, password }) {
    console.log('Loging user ' + email);
  
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(function (user) {
        console.log('Credenciales correctas, CRACK, Bienvenido.');
      })
      .catch(function (error) {
        console.log(error);
        alertTryAgain(error);
      });
  }
  
  function signoutUser() {
    firebase.auth().signOut();
  }
  
  
  // General Utils
  function alertTryAgain(error) {
    console.log(error);
    return alert('Error, intenta de nuevo ⛈');
  }