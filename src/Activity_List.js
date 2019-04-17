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
    

    //Fetch list of users
    usersRef.on("value",snapshot =>{
        this.setState({userArray:this.snapshotToArray(snapshot)});
    })

      
    //Fetch Owned Paths for the Logged user 
    pathsRef.orderByChild("owner").equalTo(userId).on("value",snapshot=>{
      this.setState({pathArray:this.snapshotToArray(snapshot)})
    })
    
    //this.setState({pathIds:this.snapshotToArray(this.getPathIds())})

    //Fetch Activities for the Logged in User  
    
   /* activityRef.orderByChild("path").on("value",snapshot=>{
      this.setState({userActivitiesArray:
        this.getActivityEvents(this.snapshotToArray(snapshot),this.state.pathArray)})
    })*/
    
    //Fetch activity status for path
    
    console.log(" outside 123")
    console.log(this.state.pathIds)
    
    activity_events.where("pathKey","array-contains","-LZKOZtSSMX1KZ9MKwzQ").onSnapshot(snapshot=>{     
      snapshot.docChanges().forEach(change=>{
        console.log(change.doc.id,"=>",change.doc.data())
        //returnArray.push(change);
      });    
    })

    
    //this.setState({dbArray:this.getActivityAnalytics(this.state.pathIds)})
             
  }

  
  /*firestore_snapshotToArray(snapshot) {
    var returnArr = [];
    snapshot.map(childSnapshot=>{
        var item = childSnapshot.data();
        item.key = childSnapshot.id;
        //console.log("Key Item="+item.key+" "+item);
        returnArr.push(item);
    })
    console.log("firestore return array=="+returnArr)    
    return returnArr;
  }*/

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
  /*loopArrays(listValues,smallerList){   
    const lstValues=listValues.slice();
    const smlList=[...smallerList];
    const returnArray=[];
    console.log("smaller list")
    console.log(smallerList)
    lstValues.map(value=>{      
      smlList.map(userPaths=>{
        //console.log("outside "+userPaths.key +" " +value.path)
        if(userPaths.key===value.activityKey){
          //console.log("inside")          
          returnArray.push(value);
        }            
      })
    })
    console.log("returning loops");
    console.log(returnArray);
    return returnArray;

  }*/

  getActivityAnalytics(pathIds){
    //const pathIds = pathIds.slice()
    const returnArray=[];
    console.log("Am I being watched**")
    console.log(pathIds)
    pathIds.map((item,key)=>{
    console.log("Inside the loop ***"+item)
    activity_events.where('path','array-Contains',item.key).onSnapshot(snapshot=>{     
      snapshot.docChanges().forEach(change=>{
        console.log(change.doc.id,"=>",change.doc.data())
        returnArray.push(change);
      });    
    })

    });
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
        if(activity.key===value.path){
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
        returnArr.push(item);
    });
    console.log("return array==");
    console.log(returnArr);    
    return returnArr;
  }

      
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

    console.log("outside")
    console.log(this.state.userActivitiesArray)
  
    console.log("pathIds")
    console.log(this.state.pathIds)
    
    console.log('---------------------------')
    console.log("dbArray")
    console.log(this.state.dbArray)

    return (
      <div className="App">
       <ActivityData data={this.state.dbArray}/>                             
      </div>
    );
  }
}

export default Activity_List;