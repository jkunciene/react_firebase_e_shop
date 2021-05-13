import React from 'react';
import './Items.css';
import Item from './Item';


const Items = () => {
    return (
       <div className='homescreen'>
            <h2 className="homescreen_title">Lastest Products</h2>
          
               <Item/>
            
        </div>
    )
}

export default Items
