import React, { Component } from 'react';
import './App.css';
import {usersRef,logged_events} from "./config/firebase";


class App extends Component {
  render() {
    console.log(usersRef)
    console.log('----------')
    console.log(logged_events.val)
    logged_events.orderByChild('createdAt').limitToLast(50).on("child_added",function(snapshot) {
            console.log(snapshot.key);
    });
    
    return (
      <div className="App">
        <header className="App-header">
         
        </header>
      </div>
    );
  }
}

export default App;
