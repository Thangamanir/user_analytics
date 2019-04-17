import React, { Component } from 'react';
import {usersRef,activity_events,pathsRef,activityRef} from "./config/firebase";
import ActivityData from "./ActivityData";
import {userId} from "./config/dev";

class Activity_List extends Component {
  constructor(props){
    super(props);
    this.state={
     dbArray:[],
     userArray:[],
     pathArray:[],
     userActivitiesArray:[],
     pathIds:[]
    };
    /*activity_events.orderByChild('time').limitToLast(50).on("value",
    snapshot => {
      //console.log("snapshot values=");
      //console.log(snapshot.val());
      //console.log("snapshot="+snapshot);
      this.setState({dbArray:this.snapshotToArray(snapshot)});
    });*/

    //Fetch list of users
    usersRef.on("value",snapshot =>{
        this.setState({userArray:this.snapshotToArray(snapshot)});
    })

    //console.log("user Array");
    //console.log(this.state.userArray);
    
    //Fetch Owned Paths for the Logged user 
    pathsRef.orderByChild("owner").equalTo(userId).on("value",snapshot=>{
      this.setState({pathArray:this.snapshotToArray(snapshot)})
    })
    
    this.setState({pathIds:this.snapshotToArray(this.getPathIds())})
    //Fetch Activities for the Logged in User
    
   /* this.setState({userActivitiesArray:this.snapshotToArray(
      this.state.pathIds.map(id=>{
      return activityRef.orderByChild("path").child(id).on("value",s=>s)
    }))}) */ 
    
      
    activityRef.orderByChild("path").on("value",snapshot=>{
      this.setState({userActivitiesArray:
        this.loopArrays(this.snapshotToArray(snapshot),this.state.pathArray)})
    })
    //Check here --Not working
    this.setState({dbArray:this.snapshotToArray(
      this.state.userActivitiesArray.map(id=>{
      return activity_events.orderByChild("time").limitToLast(5000).on("value",s=>s)
    }))})      
   
    activity_events.orderByChild("time").limitToLast(5000).on("value",snapshot=>{
      this.setState({dbArray:this.getActivityEvents
        (this.snapshotToArray(snapshot),this.state.userActivitiesArray)})})
  }
  

  getPathIds(){
    const pathIds=[];
    console.log("getPathIds")
    console.log(this.state.pathArray)
    this.state.pathArray.map(path=>{
      console.log(path.key)
      pathIds.push(path.key)
    })
    console.log("In getPathIds")
    console.log(pathIds)
    return pathIds;
  }
  loopArrays(listValues,smallerList){
   
    const lstValues=listValues.slice();
    const smlList=[...smallerList];
    const returnArray=[];
    console.log("smaller list")
    console.log(smallerList)
    lstValues.map(value=>{      
      smlList.map(userPaths=>{
        //console.log("outside "+userPaths.key +" " +value.path)
        if(userPaths.id===value.path){
          //console.log("inside")          
          returnArray.push(value);
        }            
      })
    })
    console.log("returning loops");
    console.log(returnArray);
    return returnArray;

  }

  getActivityEvents(listValues,smallerList){
   
    const lstValues=listValues.slice();
    const smlList=[...smallerList];
    const returnArray=[];
    console.log("smaller list")
    console.log(smallerList)
    lstValues.map(value=>{      
      smlList.map(activity=>{
        //console.log("outside "+userPaths.key +" " +value.path)
        if(activity.key===value.activityKey){
          //console.log("inside")          
          returnArray.push(value);
        }            
      })
    })
    console.log("Activity returning loops");
    console.log(returnArray);
    return returnArray;

  }
  snapshotToArray(snapshot) {
    var returnArr = [];
    snapshot.forEach(function(childSnapshot) {
        var item = childSnapshot.val();
        item.key = childSnapshot.key;
        //console.log("Key Item=");
       // console.log(item.key);
       // console.log(item);
        returnArr.push(item);
    });
    console.log("return array==");
    console.log(returnArr);    
    return returnArr;
  }

  mapUserName=() =>{
    this.state.dbArray.map((item,key)=>{
        
    })
  }
  
  /*fetchActivitiesForUserPath=(userId)=>{
      userId=userId;
      const userActivitiesOnly = this.setState.pathArray.map(id => {
        return activityRef.orderByChild("path").equalTo(this.state.pathArray).
        on("value", snapshot=>{
          this.setState({userActivitiesArray:this.snapshotToArray(snapshot)})
        })
      })
  }*/
  
  render() {
    console.log("userArray:")
    console.log(this.state.userArray)
    console.log('----------')
    
    console.log(this.state.dbArray)
    console.log('----------')
    console.log("pathArray")
    console.log(this.state.pathArray)

    console.log('----------')
    console.log("userActivitiesArray")
    console.log(this.state.userActivitiesArray)

    return (
      <div className="App">
       <ActivityData data={this.state.dbArray}/>                             
      </div>
    );
  }
}

export default Activity_List;