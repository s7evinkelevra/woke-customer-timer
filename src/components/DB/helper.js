import React from 'react';
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
export const createUserData = (userId, userData) => {
  console.log("creating user in database....");
  return fs.collection('users').doc(userId).set({
    ..._.omitBy(userData,_.isNil)
  });
}


// this also creates a user in users collection and add a strickies collection to the user doc in case there isn't one already
export const createSticky = (userId, stickyData) => {
  console.log("creating sticky....");
  return fs.collection('users').doc(userId).collection('stickies').add({
    ..._.omitBy(stickyData,_.isNil)
  });
}