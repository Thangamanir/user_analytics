import React, { Component } from 'react';
import {usersRef,logged_events} from "./config/firebase";
import LogData from "./LogData";
import UserCharts from './UserCharts';


class Log_List extends Component {
  constructor(props){
    super(props);
    this.state={
     dbArray:[],
     userArray:[]
    };
    logged_events.onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change=>{
        //console.log(change.doc.id,"=>",change.doc.data())
      });  
      //console.log("snapshot logged_events")
      //console.log(snapshot)
      this.setState({dbArray:this.firestore_snapshotToArray(snapshot)});

    });
    
    usersRef.on("value",snapshot =>{
        this.setState({userArray:this.snapshotToArray(snapshot)});
    })
    
  }

  firestore_snapshotToArray(snapshot) {
    var returnArr = [];
    snapshot.forEach(function(childSnapshot) {
        var item = childSnapshot.data();
        item.key = childSnapshot.id;
        //console.log("Key Item="+item.key+" "+item);
        returnArr.push(item);
    });
    console.log("firestore return array=="+returnArr)    
    return returnArr;
  }

  snapshotToArray(snapshot) {
    var returnArr = [];
    snapshot.forEach(function(childSnapshot) {
        var item = childSnapshot.val();
        item.key = childSnapshot.key;
        //console.log("Key Item="+item.key+" "+item);
        returnArr.push(item);
    });
    console.log("return array=="+returnArr)    
    return returnArr;
  }

  mapUserName=() =>{
    this.state.dbArray.map((item,key)=>{
        
    })
  }
  
  
  render() {
    console.log("userArray:")
    console.log(this.state.userArray)
    console.log('----------')
    
    console.log(this.state.dbArray)
    
    return (
      <div className="App">
       <UserCharts data={this.state.dbArray} users={this.state.userArray}/>                             
      </div>
    );
  }
}

export default Log_List;