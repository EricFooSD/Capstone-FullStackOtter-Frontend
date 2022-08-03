/* eslint-disable consistent-return */
/* eslint-disable import/no-cycle */
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
// import { UserContext } from '../components/UserContext.jsx';

import mergeAnnotations from '../components/FakeDocusign/MergeAnnotations/MergeAnnotations.js';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();

const provider = new firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = () => {
  auth.signInWithPopup(provider);
};

const getUserDocument = async (uid) => {
  if (!uid) return null;
  try {
    const userDocument = await firestore.doc(`users/${uid}`).get();
    return {
      uid,
      ...userDocument.data(),
    };
  } catch (error) {
    console.error('Error fetching user', error);
  }
};
export const generateUserDocument = async (user, additionalData) => {
  if (!user) return;
  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();
  if (!snapshot.exists) {
    const { email, displayName, photoURL } = user;
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        ...additionalData,
      });
    } catch (error) {
      console.error('Error creating user document', error);
    }
  }
  return getUserDocument(user.uid);
};
export const addDocumentToSign = async (uid, email, docRef, emails) => {
  if (!uid) return;
  const signed = false;
  const xfdf = [];
  const signedBy = [];
  const requestedTime = new Date();
  const signedTime = '';
  firestore
    .collection('documentsToSign')
    .add({
      uid,
      email,
      docRef,
      emails,
      xfdf,
      signedBy,
      signed,
      requestedTime,
      signedTime,
    })
    .then((docRef) => {
      console.log('Document written with ID: ', docRef.id);
    })
    .catch((error) => {
      console.error('Error adding document: ', error);
    });
};

export const updateDocumentToSign = async (docId, email, xfdfSigned) => {
  const documentRef = firestore.collection('documentsToSign').doc(docId);
  documentRef
    .get()
    .then(async (doc) => {
      if (doc.exists) {
        const {
          signedBy, emails, xfdf, docRef,
        } = doc.data();
        if (!signedBy.includes(email)) {
          const signedByArray = [...signedBy, email];
          const xfdfArray = [...xfdf, xfdfSigned];
          await documentRef.update({
            xfdf: xfdfArray,
            signedBy: signedByArray,
          });

          if (signedByArray.length === emails.length) {
            const time = new Date();
            await documentRef.update({
              signed: true,
              signedTime: time,
            });
            console.log(docRef, xfdfArray);
            mergeAnnotations(docRef, xfdfArray);
          }
        }
      } else {
        console.log('No such document!');
      }
    })
    .catch((error) => {
      console.log('Error getting document:', error);
    });
};

export const searchForDocumentToSign = async (email) => {
  const documentsRef = firestore.collection('documentsToSign');
  console.log(documentsRef);
  const query = documentsRef
    .where('emails', 'array-contains', email)
    .where('signed', '==', false);

  const querySigned = documentsRef
    .where('signedBy', 'array-contains', email);

  const docIds = [];
  const docIdSigned = [];

  await querySigned
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const docId = doc.id;
        docIdSigned.push(docId);
      });
    })
    .catch((error) => {
      console.log('Error getting documents: ', error);
    });

  await query
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const { docRef, email, requestedTime } = doc.data();
        const docId = doc.id;
        if (!docIdSigned.includes(docId)) {
          docIds.push({
            docRef, email, requestedTime, docId,
          });
        }
      });
    })
    .catch((error) => {
      console.log('Error getting documents: ', error);
    });
  return docIds;
};

export const searchForDocumentsSigned = async (email) => {
  console.log(email);

  const documentsRef = firestore.collection('documentsToSign');
  console.log(documentsRef);

  const docIds = [];

  const query = documentsRef
    .where('email', '==', email)
    .where('signed', '==', true);

  await query
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const { docRef, emails, signedTime } = doc.data();
        const docId = doc.id;
        docIds.push({
          docRef, emails, signedTime, docId,
        });
      });
    })
    .catch((error) => {
      console.log('Error getting documents: ', error);
    });

  return docIds;
};
