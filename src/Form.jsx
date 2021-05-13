import React, { useState} from 'react'
import firebase from './firebase'


const auth = firebase.auth();

const firestore = firebase.firestore();

const Form = () => {
    const itemsRef = firestore.collection('items');   

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [imgsrc, setImgsrc] = useState('');

    const [error, setError] = useState('');

   
    const sendItem = async (e)=>{
        e.preventDefault();
        const {uid, photoURL} = auth.currentUser;

        if(name!=='' && description!=='' && price!=='' && quantity!=='' && imgsrc !==''){
            await itemsRef.add({
            text: name,
            description: description,
            price: price,
            src: imgsrc,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            uid,
            photoURL
        })
         .then(()=>{
            alert("Your message has been submitted 👌")
        })
        } else{
            setError('Užpildykite formos laukus')
        }

        
        setName('');
        setDescription('');
        setPrice('');
        setQuantity('');
        setImgsrc('');
    }

  return(
      <div className='container'>
          
          <h2 className='p-3'>Best App to Sell Your Stuff</h2>
        
        <form onSubmit={sendItem}>          
             {error ? <p>{error}</p> : null  } 
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
                <label>Image</label>
                <input type="text" className="form-control"  placeholder="Image address"
                value={imgsrc} onChange={(e) => setImgsrc(e.target.value)}/>
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
