import React, { useState} from 'react'
import firebase from './firebase'
import {useAuthState} from "react-firebase-hooks/auth";
import {useCollectionData} from "react-firebase-hooks/firestore";
import MyDashboard from './MyDashboard'

const auth = firebase.auth();

const firestore = firebase.firestore();

const Form = () => {
    const [user] = useAuthState(auth);
    const itemsRef = firestore.collection('items');
    const query = itemsRef.orderBy('createdAt').limit(25);

  const [items] = useCollectionData(query, {idField: 'id'});

  const [formValue, setFormValue] = useState('');

  const sendItem = async (e)=>{
    e.preventDefault();
    const {uid, photoURL} = auth.currentUser;

    await itemsRef.add({
        text: formValue,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid,
        photoURL
      })
      setFormValue('');
  }

  return(
      <>
      <div>
        {items && items.map(item=> <MyDashboard key={item.id} message={item}/>)}
      </div>

        <form onSubmit={sendItem}>

          <input value={formValue} onChange={(e) => setFormValue(e.target.value)}/>
          <button type="submit">sent</button>
        </form>
        </>
  )
}


export default Form
