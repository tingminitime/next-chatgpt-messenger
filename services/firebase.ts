import { getApp, getApps, initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_APP_KEY,
  authDomain: 'next-chatgpt-e136d.firebaseapp.com',
  projectId: 'next-chatgpt-e136d',
  storageBucket: 'next-chatgpt-e136d.appspot.com',
  messagingSenderId: '989411771417',
  appId: process.env.FIREBASE_APP_ID,
}

// > Singleton pattern
// - getApp() will return default app
const app = getApps().length ? getApp() : initializeApp(firebaseConfig)
const db = getFirestore(app)

export { db }
