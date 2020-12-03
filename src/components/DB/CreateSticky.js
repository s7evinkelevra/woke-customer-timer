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
    console.log(getValues());
    const entry = await createSticky(user, {
      ...getValues()
    });
  }


   const recurringIntervalField = () => (
    <div>
      <label htmlFor="recurringInterval">Intervall [Tage]</label>
      <input type="number" name="recurringInterval" defaultValue={0} ref={register} />
      {errors.recurringInterval && <span>recurring error lul error</span>}
    </div>
  )

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="title">Titel</label>
        <input name="title" ref={register({ required: true })} />
        {errors.title && <span>yeeee</span>}
      </div>

      <div>
        <label htmlFor="description">Beschreibung</label>
        <textarea type="textfield" name="description" placeholder="description" ref={register({ required: true })} />
        {errors.description && <span>Pflichtfeld</span>}
      </div>

      <div>
        <label htmlFor="dueDate">Ablaufdatum</label>
        <input type="date" name="dueDate" ref={register} />
        {errors.dueDate && <span>Datum error</span>}
      </div>
      
      <div>
        <label htmlFor="recurring">Wiederholen</label>
        <input type="checkbox" name="recurring" ref={register} />
        {errors.recurring && <span>recurring error lul error</span>}
      </div>
      
      {watch("recurring") && 
        recurringIntervalField()
      }

      {errors.errorMessage?.message}

      <input type="submit" />
    </form>
  ); 
};

export default CreateSticky;