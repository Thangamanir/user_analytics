import React, { Component } from 'react';

const ActivityData =(props)=>{
    const items = props.data.map((item,key) =>{
        console.log("SAMBO----"+key)
        console.log("SAMBO2 :")
        console.log(item.time) 
        console.log("SAMBO3:")
        console.log(item)
        return(<tr key={key}>
            <th>{item.activityType}</th>
            <td>{new Date(item.time).toLocaleString()}</td>
            <td>{item.completed}</td>
            <td>{item.userKey}</td>                
        </tr>);
      }
    );
    
    
    return(
        <div>
        <table>
        <thead>
            <tr>
            <th>Activity Type</th>
            <th>Attempted At</th>
            <th>Completed</th>  
            <th>User</th>          
            </tr>
        </thead>
        <tbody>
            {items}
        </tbody>
        </table>
        </div>
        )
};
export default ActivityData;