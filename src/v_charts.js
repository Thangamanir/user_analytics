import React from 'react';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryStack,VictoryScatter,VictoryLine, VictoryPie } from 'victory';



const VictoryChart_Users =(props)=>{
    const data = props.data
    const users = props.users
   /* const items = props.data.map((element,key) => {

        const userDetails = props.users.map((user_element,user_key)=>{
                 if(user_element.key===element.uid){
               // console.log(user_element.key + " " + element.uid)
                element.uname=user_element.displayName
            }
          
        })
       // return(element);
      }
    );*/
              
           /*<td>{new Date(element.createdAt.toLocaleString())}</td>*/
    console.log("ITEMS")        
    console.log(data) 
    console.log(users)  
    return(
        <div>
            <VictoryChart
                domainPadding={10}
                theme={VictoryTheme.material}
            >
            <VictoryAxis
                tickValues="Timestamp"
            />
            <VictoryAxis
                dependentAxis
                tickFormat={"type"}
            />
            <VictoryStack
                 colorScale={"warm"}
            >
                </VictoryStack>
                <VictoryLine
                data={data}
                interpolation="linear"
                x={data.type}
                y={new Date(data.createdAt).toLocaleString()}
                style={{data: {stroke: '#c43a31', strokeWidth: 1}}}>
                <VictoryScatter 
  style={{data: {fill: 'green'}}}
  size={7} 
  data={data} 
/>
            </VictoryLine>
            <VictoryPie>
                data={data}
                x={data.type}
                y={data.createdAt}

            </VictoryPie>
            </VictoryChart>
            
            
        </div>
        )
};
export default VictoryChart_Users;