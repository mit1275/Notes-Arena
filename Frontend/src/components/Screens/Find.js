import React from "react";
import { Media } from "react-bootstrap";
// import "../Category/SubCategory/subcategory.scss";
// import "./Amit";
import Card from '@material-ui/core/Card';
import Link from '@material-ui/core/Link';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MIT from '../../images/download.jfif';
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
// import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import Input from "@material-ui/core/Input";
import Axios from "axios";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Rating from "@material-ui/lab/Rating";
import { useState } from "react";
import Header from "../Header/Header";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1.6,
    padding: theme.spacing(4),
    maxWidth: 380,
    
    
  },
  media: {
    height: 140,
    // Ho
  },
}));

function MediaCard(props) {
  const classes = useStyles();
  const [name, setname] = React.useState('kl');

  return (
    <>
      {
        // backgr
        <Link href={'http://localhost:3001/files/' + props.filename}>
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={MIT}
                title={props.filename}
              />
              <CardContent>
                <Typography gutterBottom variant='h5' component='h2'>
                
                  <h4>Document Name-{props.filename}</h4>
                  <p></p>
                </Typography>
                <Typography
                  variant='body2'
                  color='textSecondary'
                  // image=
                  component='p'
                ></Typography>
              </CardContent>
            </CardActionArea>
            <CardActions></CardActions>
          </Card>
        </Link>
      }
    </>
  );
}
export  function SearchFiles(props) {
 
  const [Files, setFiles] = React.useState([]);
  const [search,setsearch]=React.useState("");
  const address = 'http://localhost:3001/allfiles';
  React.useEffect(() => {
    <Header/>
    Axios.post(address).then((result) => {
      console.log(result);
      setFiles(result.data.files);
    });
  }, []);
  

  return (
    <>
    {/* <div className="App"> */}
      
      <form><input type="text" class="textbox" placeholder="Search" onChange={event=>{setsearch(event.target.value)}}></input></form>
      {
        Files.filter((value)=>{
          if(search==="")
          {
            return value;
          }
          else if(value.filename.toLowerCase().includes(search.toLowerCase()))
          {
               return value;
          }
        }).map((value, key) => {
          return (
            <div style={{ marginRight: '20px', width: '25rem',marginTop:'30px',justifyContent:"center"}}>
              {/* <margin */}
              <MediaCard {...value} />
            </div>
          )
        })
      }
    {/* </div> */}
      {/*  */}
    </>
  );
}
