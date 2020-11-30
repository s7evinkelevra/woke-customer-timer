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