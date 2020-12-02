import React from 'react';
import firebase from 'firebase';
import { useSession } from '../Auth/helper';
import { getUserFields, createSticky } from './helper';
import { useForm } from 'react-hook-form';


const testEntry = async (user) => {
  const entry = await createSticky(user.uid, {
    userId: user.uid,
    createdBy: getUserFields(user),
    title: "Dinge endlich tun",
    descriptions: "yee yeee",
    createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
    dueAt: firebase.firestore.Timestamp.fromDate(new Date(2020,11,1)),
    recurring: 5,
  });
  console.log(entry);
}

const CreateSticky = (props) => {
  const user = useSession();
  const { register, handleSubmit, watch, errors, getValues } = useForm();

  const onSubmit = async (data) => {
    
  }

  return (
    <div>
      <h2>Create Sticky yee yee</h2>
      { user && <button onClick={() => testEntry(user)}>create</button> }
    </div>
  );
};

export default CreateSticky;