import React from 'react';

const LogData =(props)=>{
    const items = props.data.map((element,key) => {

        const userDetails = props.users.map((user_element,user_key)=>{
         //console.log("SAMBO----"+key)
        //console.log("SAMBO2 :")
        //console.log(element.id) 
        //console.log("SAMBO3:")
        //console.log(user_element.key + " " + element.uid)
       // console.log("SAMBO4:")
      //  console.log(element.data().type)
            if(user_element.key===element.uid){
               // console.log(user_element.key + " " + element.uid)
                element.uname=user_element.displayName
            }
          
        })
        return(<tr key={key}>
              <th>{element.uname}</th>
              <td>{new Date(element.createdAt).toLocaleString()}</td>
              <td>{element.type}</td>
              <td>{element.otherActionData}</td>         
        </tr>);
      }
    );
              
           /*<td>{new Date(element.createdAt.toLocaleString())}</td>*/
   // console.log("ITEMS")        
    //console.log(items)   
    return(
        <div>
        <table>
        <thead>
            <tr>
            <th>UID</th>
            <th>Created At</th>
            <th>Event Type</th>  
            <th>Action Data</th>          
            </tr>
        </thead>
        <tbody>
            {items}
        </tbody>
        </table>
        </div>
        )
};
export default LogData;