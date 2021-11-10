import React, { useState } from "react";
import clsx from "clsx";
import { fade, makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import "./header.css";
import Axios from "axios";
import Link from '@material-ui/core/Link';
import {useHistory } from "react-router-dom";
import Feedback from './../Screens/SiteFeedback/Feedback';

const jwt = require("jsonwebtoken");
const env = require("dotenv");
env.config();

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },

  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  title: {
    flexGrow: 1,
  },
}));
function refreshPage() {
  window.location.reload(true);
}


export default function Header() {

 
  if (document.referrer !== document.location.href) {
    setTimeout(function() {
        document.location.reload()
  }, 3000);
}
  const [userId, setUserId] = useState("");
 
  
  React.useEffect(async () => {
    try{
        // his


      const userinfo=localStorage.getItem('userinfo');

      console.log(userinfo);

      if(userinfo)
      {
        console.log("This is "+userinfo);
        // window.location.reload(false);
        setUserId(userinfo._id);
      }
      else
      {
        console.log("User is not logged in");
      }
      //

      
  }catch(err){
      console.log(err);
      console.log("user in catch block");
  }
    
  }, []);
    return (
     
 <>
 
    <div className="nav">
  <ul>
    
    {userId===""?(
    <li>
      <Button href="/" className="nav-link" onClick={refreshPage}>
        <h2 style={{color:'black',fontFamily:"'Mukta', sans-serif",fontWeight:"bold",fontStyle:'italic'}}>Home</h2>
      </Button>
    </li>
    ):""}
    {userId===""?(
    <li>
      <Button href="/signup"  className="nav-link" onClick={refreshPage}>
      {/* window.location.reload(false); */}
      <h2 style={{color:'black',fontFamily:"'Mukta', sans-serif",fontWeight:"bold",fontStyle:'italic'}}>Register</h2>
      </Button>
    </li>
    ):""}
    {userId!==""?(
    <li>
      <Button href="/search" className="nav-link" onClick={refreshPage}>
      <h2 style={{color:'black',fontFamily:"'Mukta', sans-serif",fontWeight:"bold",fontStyle:'italic'}}>Files</h2>
      </Button>
    </li>
    ):""}
    <li>
      <Button href="/feedback" className="nav-link" onClick={refreshPage}>
      <h2 style={{color:'black',fontFamily:"'Mukta', sans-serif",fontWeight:"bold",fontStyle:'italic'}}>Give Your Feedback</h2>
      </Button>
    </li>
    {userId!==""?(
    <li>
      <Button href="/upload" className="nav-link" onClick={refreshPage}>
      <h2 style={{color:'black',fontFamily:"'Mukta', sans-serif",fontWeight:"bold",fontStyle:'italic'}}>Upload Your Notes</h2>
      </Button>
    </li>
    ):""}
    {userId!==""?(
    <li>
      <Button href="/logout" className="nav-link" onClick={refreshPage}>
      <h2 style={{color:'black',fontFamily:"'Mukta', sans-serif",fontWeight:"bold",fontStyle:'italic'}}>Log Out</h2>
      </Button>
    </li>
    ):""}
    
  </ul>
</div>
    </>
  );
};
