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
    console.log("yeee");
  }

  console.log(watch("recurring"));


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="title">Titel</label>
      <input name="title" ref={register({ required: true })} />
      {errors.title && <span>yeeee</span>}

      <label htmlFor="description">Beschreibung</label>
      <input name="description" defaultValue="description" ref={register({ required: true })} />
      {errors.description && <span>Pflichtfeld</span>}

      <label htmlFor="dueDate">Ablaufdatum</label>
      <input type="date" name="dueDate" ref={register} />
      {errors.dueDate && <span>Datum error</span>}

      <label htmlFor="recurring">Wiederholen</label>
      <input type="checkbox" name="recurring" ref={register} />
      {errors.recurring && <span>recurring error lul error</span>}

      {getValues("recurring") && 
          <p>yee suck my dick</p>
      }

      {errors.errorMessage?.message}


      <input type="submit" />
    </form>
  );
};

export default CreateSticky;