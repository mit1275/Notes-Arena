import "./App.css";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import React, { createContext, useReducer } from 'react';
import UserSignin from "./components/Screens/SignIn/UserSignIn";
import Register from "./components/Screens/SignUp/Register";
import NotFound from "./components/NotFound/NotFound";
import {SearchFiles} from "./components/Screens/Find";
import Footer from "./components/Footers/footer";


import Header from "./components/Header/Header";
import AboutUs from "./components/Screens/AboutUs/aboutus";
import Feedback from "./components/Screens/SiteFeedback/Feedback.jsx";
import OP from "./components/Screens/op";
import Upload from "./components/upload";
import Logout from "./components/Screens/Logout";

import { initialState, reducer } from './reducer/reducer';

// crete context
export const userContext = createContext();


function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    
    <BrowserRouter>
    <userContext.Provider value={{ state, dispatch }}>
      <div className="grid-container">
        <header>
          <Header />
        </header>
        <main>
          <Switch>
            <Route path="/search" component={OP} exact  />
           
            <Route path="/" component={UserSignin} exact />
            <Route path="/upload" component={Upload} exact/>
            
            <Route path="/signup" component={Register} exact />
            
           
            <Route path="/search" component={SearchFiles}/>
           
            <Route path="/aboutus" component={AboutUs} />
            
            <Route path="/feedback" component={Feedback} />
            <Route path="/logout" component={Logout}/>
            
            <Route component={NotFound} />
          </Switch>
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
      </userContext.Provider>
    </BrowserRouter>
  );
}

export default App;
