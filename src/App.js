import React from 'react'
import Navbar from './Component/Navbar';
import News from './Component/News'

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
const App = () => {
  const pageSize = 9;
  // const [page, setpage] = useState()
    return ( 
     <>
     <div>
      <Router>
       <Navbar/>
     <Switch>
     <Route exact path="/"><News key="general" pageSize={pageSize} country={"in"} category={"general"}/></Route>
     <Route exact path="/Entertainment"><News key="entertainment" pageSize={pageSize} country={"in"} category={"entertainment"}/></Route>
     <Route exact path="/Science"><News key="science" pageSize={pageSize} country={"in"} category={"science"}/></Route>
     <Route exact path="/Sports"><News key="sports" pageSize={pageSize} country={"in"} category={"sports"}/></Route>
     <Route exact path="/Technology"><News key="technology" pageSize={pageSize} country={"in"} category={"technology"}/></Route>
     <Route exact path="/Business"><News key="business" pageSize={pageSize} country={"in"} category={"business"}/></Route>
        </Switch>
        </Router>
      </div>
      </>
    )
  
}
export default App;

