import firebase from 'firebase/app';
import _ from 'lodash';

export const fs = firebase.firestore();

export const getUserFields = (user) => {
  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
  }
}

export const createEntry = (options) => {
  console.log("creating entry....");
  return fs.collection('stickies').add({
    ..._.omitBy(options,_.isNil),
    updatedAt: firebase.firestore.Timestamp.fromDate(new Date()),
  })
}

// create user with some additional info when an account is created.
// also add all the user info we have here
export const createUserData = (user, userData) => {
  console.log("creating user in database....");
  return fs.collection('users').doc(user.uid).set({
    ..._.omitBy(userData,_.isNil),
    ...getUserFields(user)
  });
}


// this also creates a user in users collection and add a strickies collection to the user doc in case there isn't one already
export const createSticky = (user, stickyData) => {
  console.log("creating sticky....");
  console.log(user.uid);
  return fs.collection('users').doc(user.uid).collection('stickies').add({
    ..._.omitBy(stickyData,_.isNil),
    createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
    user: getUserFields(user),
  });
}

// returns promise, as do all the other db helper functions
export const updateStickyDueDate = (stickyDocReference, newDueDateString) => {
  console.log("updating sticky...")
  return stickyDocReference.update({dueDateString: newDueDateString});
}

export const deleteSticky = (stickyDocReference) => {
  return stickyDocReference.delete();
}