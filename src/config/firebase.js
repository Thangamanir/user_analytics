import * as firebase from "firebase";

import firestore from "firebase/firestore";

import {FirebaseConfig} from "./dev"


const app = firebase.initializeApp(FirebaseConfig);


/*var base = process.env.PWD;
var fs = Npm.require('fs');
var PeerServer = require('peer').PeerServer;
const fs = require('fs');
const rules = fs.readFileSync('../firebase.json','utf8');*/

//const lRules = rules;
const databaseRef = firebase.database().ref();
const firestore_dbref = firebase.firestore(app)

/*firebase.loadDatabaseRules({
  databaseName: FirebaseConfig.databaseName,
  rules: rules,
});*/

export const usersRef = databaseRef.child("users");
export const logged_events = firestore_dbref.collection("logged_events").orderBy('createdAt','desc').limit(100);
export const activity_events = databaseRef.child("analytics/activityAttempts");
export const pathsRef = databaseRef.child("paths");
export const activityRef = databaseRef.child("activities");
/*var admin = require('firebase-admin');

var serviceAccount = require('path/to/serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://<DATABASE_NAME>.firebaseio.com'
});*/