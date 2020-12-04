import React from 'react';
import firebase from 'firebase';
import { useSession } from '../Auth/helper';
import { getUserFields, createSticky } from './helper';
import { useForm } from 'react-hook-form';
import { Button, Form } from 'react-bootstrap';



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

const CustomFormGroup = (props) => {

  return(
    <Form.Group controlId={props.controlId}>
      <Form.Label>{props.label}</Form.Label>
      <Form.Control {...props.control} />
      <Form.Text className="text-muted">
        {props.errors[props.title] && <span>{props.errorMessage}</span>}
      </Form.Text>
    </Form.Group>
  )
}


const CreateSticky = (props) => {
  const user = useSession();
  const { register, handleSubmit, watch, errors, getValues } = useForm();

  const onSubmit = async (data, e) => {
    console.log(getValues());
    const entry = await createSticky(user, {
      ...getValues()
    });
    e.target.reset();
  }
  
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group controlId="formTitle">
        <Form.Label>Titel</Form.Label>
        <Form.Control type="text" name="title" placeholder="Titel eingeben" ref={register({required:true})} />
        <Form.Text className="text-muted">
          {errors.title && <span>Title is required!</span>}
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="formDescription">
        <Form.Label>Beschreibung</Form.Label>
        <Form.Control as="textarea" type="text" name="description" placeholder="Beschreibung eingeben" ref={register} />
        <Form.Text className="text-muted">
          {errors.descriptions && <span>Was da los?</span>}
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="formDueDate">
        <Form.Label>Stichtag</Form.Label>
        <Form.Control type="date" name="dueDate" ref={register} />
        <Form.Text className="text-muted">
          {errors.dueDate && <span>Was da los?</span>}
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="formRecurring">
        <Form.Check type="checkbox" label="Wiederholen?" name="recurring" ref={register} />
        <Form.Text className="text-muted">
          {errors.dueDate && <span>Was da los?</span>}
        </Form.Text>
        {/* conditionally render the number input form lul */}
        {watch("recurring") && 
          <React.Fragment>
            <Form.Label>Interval [Tage]</Form.Label>
            <Form.Control type="number" name="interval" defaultValue="1" min="1" ref={register({min:1})} />
            {errors.interval && <span>Interval muss mindestens 1 Tag sein!</span>}
          </React.Fragment>}
      </Form.Group>

      <Button variant="primary" block type="submit">Sticky erstellen!</Button>


    </Form>


/*     <form onSubmit={handleSubmit(onSubmit)}>
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
    </form> */
  ); 
};

export default CreateSticky;