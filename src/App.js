import React, { Component } from 'react'
import Navbar from './Component/Navbar'
import News from './Component/News'

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
export default class App extends Component {
  page = 9;
  render() {
    return ( 
     <>
     <div>
      <Router>
       <Navbar></Navbar>
     <Switch>
     <Route exact path="/"><News key="general" pageSize={this.page} country={"in"} category={"general"}/></Route>
     <Route exact path="/Entertainment"><News key="entertainment" pageSize={this.page} country={"in"} category={"entertainment"}/></Route>
     <Route exact path="/Science"><News key="science" pageSize={this.page} country={"in"} category={"science"}/></Route>
     <Route exact path="/Sports"><News key="sports" pageSize={this.page} country={"in"} category={"sports"}/></Route>
     <Route exact path="/Technology"><News key="technology" pageSize={this.page} country={"in"} category={"technology"}/></Route>
     <Route exact path="/Business"><News key="business" pageSize={this.page} country={"in"} category={"business"}/></Route>
        </Switch>
        </Router>
      </div>
      </>
    )
  }
}

