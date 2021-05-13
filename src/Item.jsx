import React from 'react';
import './Item.css';
import firebase from './firebase';
import {useCollectionData} from "react-firebase-hooks/firestore";

const firestore = firebase.firestore();

const Item = () => {
        const itemsRef = firestore.collection('items');
        const query = itemsRef.orderBy('createdAt').limit(25);

        const [items] = useCollectionData(query, {idField: 'id'});
        
    return (
       <div className="homescreen_products">
            {items && items.map(item=> (
                <div className="product">
                    <div  key={item.id} className="product_info">
                            <img alt="item" src={item.src}/>
                            <p className="info_name">{item.text}</p>
                            <p className="info_description">{item.description}</p>
                            <p className="info_price">{item.price} $</p>
                            <button className="info_button">Buy</button>
                    </div>
                    </div>
                ))}
       </div>
    )
}

export default Item