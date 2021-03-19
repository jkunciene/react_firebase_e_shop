import React, { useState} from 'react'
import firebase from './firebase'
import {useCollectionData} from "react-firebase-hooks/firestore";
import MyDashboard from './MyDashboard'

const auth = firebase.auth();

const firestore = firebase.firestore();

const Form = () => {
  
    const itemsRef = firestore.collection('items');
    const query = itemsRef.orderBy('createdAt').limit(25);

    const [items] = useCollectionData(query, {idField: 'id'});

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');


    const sendItem = async (e)=>{
        e.preventDefault();
        const {uid, photoURL} = auth.currentUser;

        await itemsRef.add({
            text: name,
            description: description,
            price: price,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            uid,
            photoURL
        })
        setName('');
        setDescription('');
        setPrice('');
        setQuantity('');
    }

  return(
      <div className='container'>
          
          <h2 className='p-3'>Best App to Sell Your Stuff</h2>
        <div className='d-flex justify-content-center'>            
            {items && items.map(item=> <MyDashboard key={item.id} message={item}/>)}
        </div>
        <form onSubmit={sendItem}>          
            
            <div className="form-group">
                <label >Item</label>
                <input type="text" className="form-control" placeholder="Item"
                value={name} onChange={(e) => setName(e.target.value)}/>
            </div>
            <div className="form-group">
                <label>Description</label>
                <input type="text" className="form-control"  placeholder="Description"
                value={description} onChange={(e) => setDescription(e.target.value)}/>
            </div>
            <div className="form-group">
                <label >Price</label>
                <input type="number" className="form-control"  placeholder="Price"
                value={price} onChange={(e) => setPrice(e.target.value)}/>
            </div>  
            <div className="form-group">
                <label >Quantity</label>
                <input type="number" className="form-control"  placeholder="Quantity"
                value={quantity} onChange={(e) => setQuantity(e.target.value)}/>
            </div>       
            <button type="submit" className="btn btn-primary">Submit</button>      
        </form>       
        </div>
  )
}

export default Form
