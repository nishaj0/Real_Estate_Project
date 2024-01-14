// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
   authDomain: 'estate-clg-project.firebaseapp.com',
   projectId: 'estate-clg-project',
   storageBucket: 'estate-clg-project.appspot.com',
   messagingSenderId: '411103467097',
   appId: '1:411103467097:web:1a9fea8f110978f7f4c348',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
