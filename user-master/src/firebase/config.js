import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'
const firebaseConfig = {
  apiKey: "AIzaSyCsWNgBjt1Fc27KPByMaxl3xl7bPj_7EK8",
  authDomain: "shopzone-newjuly.firebaseapp.com",
  projectId: "shopzone-newjuly",
  storageBucket: "shopzone-newjuly.appspot.com",
  messagingSenderId: "362826685259",
  appId: "1:362826685259:web:3c233e6aa77e7f45d966ce",
};

export const Firebase= firebase.initializeApp(firebaseConfig)//named export