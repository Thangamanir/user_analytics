import React from 'react';
import { VictoryPie, VictoryTooltip } from "victory";

const UserCharts =(props)=>{
    const dataItems={};
    const items = props.data.map((key,item)=>{
        if (key in dataItems){
            dataItems.createdAt=item.createdAt;
            dataItems.type=item.type;
        }
        return dataItems;
    });
    const users = props.users
              
           /*<td>{new Date(element.createdAt.toLocaleString())}</td>*/
   // console.log("ITEMS")        
    //console.log(items)   
    return(
        <div>
        <VictoryPie
            data={items}
            x="type"
            y="createdAt"
        
        />
        </div>
        )
};
export default UserCharts;