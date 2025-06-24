import React,{useState} from "react";
import Navbar from "./Components/Navbar";
import News from "./Components/News";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import LoadingBar from "react-top-loading-bar"


const  App=()=>{

const apiKey = "97055e9f2f3f43d2a287e4f5b0a8b9b5";
console.log(apiKey,"key");
const [progress, setProgress] = useState(0)

{/*state={
  progress:0  
}


setProgress=(progress)=>{
  this.setState({progress:progress});
}*/}

    return (
      <div>
      <Router>
      <Navbar/>
      <LoadingBar
        color='#f11946'
        progress={progress}
      />
      <Switch>
          <Route exact key="general" path="/"><News setProgress={setProgress} apiKey={apiKey}  pageSize={6} country="in" category="general"/></Route>
          <Route exact key="business" path="/business"><News setProgress={setProgress} apiKey={apiKey}  pageSize={6} country="in" category="business"/></Route>
          <Route exact key="entertainment" path="/entertainment"><News setProgress={setProgress} apiKey={apiKey}  pageSize={6} country="in" category="entertainment"/></Route>
          <Route exact key="sports" path="/sports"><News setProgress={setProgress} apiKey={apiKey}  pageSize={6} country="in" category="sports"/></Route>
          <Route exact key="science" path="/science"><News setProgress={setProgress} apiKey={apiKey}  pageSize={6} country="in" category="science"/></Route>
        </Switch>
    
      </Router> 
      </div>
      )
  }

export default App;


