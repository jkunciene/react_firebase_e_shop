import React from 'react'
import firebase from './firebase'

const auth = firebase.auth();

const MyDashboard = (props) => {
        const {text, uid, description, price} = props.message;
        console.log(props.message)
        const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  return (
      <div className={ messageClass}>       
        <h3>{text}</h3>
        <p>{description}</p>
        <p>{price} $ </p>
      </div>
  )

  
}

export default MyDashboard
