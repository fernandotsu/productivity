import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyA8xrd4mc3KJaYvw3V_LmM31p35MMFwyYo",
    authDomain: "project-planning-d0446.firebaseapp.com",
    databaseURL: "https://project-planning-d0446.firebaseio.com",
    projectId: "project-planning-d0446",
    storageBucket: "",
    messagingSenderId: "360865436765"
};
const fire = firebase.initializeApp(config);

export default fire;