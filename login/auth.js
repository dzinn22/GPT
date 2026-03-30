import { auth } from "../firebase.js";

import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

const msg = document.getElementById("msg");

function showError(text){
  msg.style.display = "block";
  msg.innerText = text;
}

function saveUser(user){
  localStorage.setItem("zr_user", JSON.stringify({
    name: user.displayName || user.email.split("@")[0],
    email: user.email,
    photo: user.photoURL || null
  }));
}

window.loginGoogle = async function(){
  try{
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    saveUser(result.user);

    window.location.href = "https://zr-gpt.vercel.app/";

  }catch(err){
    showError("Erro ao logar com Google: " + err.message);
  }
};

window.loginEmail = async function(){
  try{
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if(!email || !password){
      return showError("Preencha email e senha.");
    }

    const result = await signInWithEmailAndPassword(auth, email, password);

    saveUser(result.user);

    window.location.href = "https://zr-gpt.vercel.app/";

  }catch(err){
    showError("Erro: Email ou senha inválidos.");
  }
};

window.registerEmail = async function(){
  try{
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if(!email || !password){
      return showError("Digite email e senha para cadastrar.");
    }

    if(password.length < 6){
      return showError("A senha deve ter no mínimo 6 caracteres.");
    }

    const result = await createUserWithEmailAndPassword(auth, email, password);

    saveUser(result.user);

    window.location.href = "https://zr-gpt.vercel.app/";

  }catch(err){
    showError("Erro ao cadastrar: " + err.message);
  }
};
