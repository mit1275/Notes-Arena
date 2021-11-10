import React, { useState } from "react";
import clsx from "clsx";
import { fade, makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
// import "./header.css";
import Axios from "axios";
import Link from '@material-ui/core/Link';
import {useHistory } from "react-router-dom";
// import Feedback from './../Screens/SiteFeedback/Feedback';
import { toast } from 'react-toastify';
// import { Toast } from "react-toastify/dist/components";

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

export default function Logout() {
    let history = useHistory();
    React.useEffect(() => {
        try{
          const userinfo=localStorage.getItem('userinfo');
    
          console.log(userinfo);
    
          if(userinfo)
          {
            localStorage.removeItem('userinfo');
            toast.success('Successfuly Logout',{

                position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined
            })
            history.push('/');
          }
          else
          {
            toast.error(
              'Please sign in first',
              {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined
              }
          );
          history.push('/');
          }
    
          
      }catch(err){
          console.log(err);
          toast.error(err);
          toast.error(
              'Please sign in first',
              {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined
              }
          );
          history.push('/');
      }
        
      }, []);
    
    return (
 <>
    
    </>
  );
};
