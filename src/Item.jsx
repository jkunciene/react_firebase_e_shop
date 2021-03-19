import React from 'react'
import firebase from './firebase'
import {useCollectionData} from "react-firebase-hooks/firestore";

const firestore = firebase.firestore();

const Item = () => {
        const itemsRef = firestore.collection('items');
        const query = itemsRef.orderBy('createdAt').limit(25);

        const [items] = useCollectionData(query, {idField: 'id'});
    return (
        <div className='d-flex justify-content-center m-3'>
            {items && items.map(item=> (
                <div key={item.id}>
                    <img src='data:image/jpeg;base64,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' alt='buy'/>
                        <h3>{item.text}</h3>
                        <p>{item.description}</p>
                        <p>{item.price} $</p> 
                </div>) )}
        </div>
    )
}

export default Item
