import React, { useCallback } from 'react';
import Axios from 'axios';
import Card from '@material-ui/core/Card';
import Link from '@material-ui/core/Link';
import "./Amit.css";
import { createBrowserHistory } from 'history';
import {useHistory} from 'react-router-dom';
import { FaWindowClose } from "react-icons/fa";
// import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { toast } from 'react-toastify';
import CardActionArea from '@material-ui/core/CardActionArea';
import { GridList } from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MIT from '../../images/download.jfif';
import imag from '../../images/images.png';
import { Grid } from '@material-ui/core';


import { Container, Row, Col } from 'react-grid-system';
import Header from '../Header/Header';
toast.configure();


const jwt = require('jsonwebtoken');
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1.6,
    padding: theme.spacing(2),
    maxWidth: 700,
    marginBottom:0,
    marginTop:0.00001,
    textAlign:'center',
    boxShadow:"5px 10px #888888",
    transition:"0.3s",
    borderRadius:"22px",
    perspective: "1000px",
    // opacity: "0.9",
    cursor: "pointer",
    fontfamily: "Arial, Helvetica, sans-serif"
    
  },
  media: {
    height: 240,
    width:305,
    textAlign:"center",
    justifyContent:"center",
    fontfamily: "Arial, Helvetica, sans-serif"
  },
  
}));

function MediaCard(props) {
  const classes = useStyles();
  const [name, setname] = React.useState('kl');
  
  return (
    <>
      {
        <Link href={'http://localhost:3001/files/' + props.filename}>
          <Card className={classes.root}>
             <div className="column">
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={imag}
                title={props.filename}
                fontfamily= "Arial, Helvetica, sans-serif"
                
              />
              <CardContent>
                <Typography gutterBottom variant='h5' component='h2'>
                
                  {/* <h6>File-</h6> */}
                  {props.filename}
                  <p></p>
                </Typography>
                <Typography
                  variant='body2'
                  fontfamily="Arial, Helvetica, sans-serif"
                  color='textSecondary'
                  component='p'
                ></Typography>
              </CardContent>
            </CardActionArea>
            <CardActions></CardActions>
            </div>
          </Card>
        </Link>
      }
    </>
  );
}

export default function HomePage() {

  if (document.referrer !== document.location.href) {
    setTimeout(function() {
        document.location.reload()
  }, 3000);
}
  const classes = useStyles();

  let history = useHistory();
  const [Files, setFiles] = React.useState([]);
  const [search,setsearch]=React.useState("");
  const [id, setId] = React.useState("");
  const address = 'http://localhost:3001/allfiles';
  React.useEffect(() => {
    // <Header/>
    try{
      const userinfo=localStorage.getItem('userinfo');

      console.log(userinfo);

      if(userinfo)
      {
        Axios.post(address).then((result) => {
          console.log(result);
          setFiles(result.data.files);

          history.push('/search');
        });
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
    
    <div style={{background:'#12c2e9'}} >
       
      
       <div className="Appy">
       <input type="text" class="textbox"  placeholder="Search"   onChange={event=>{setsearch(event.target.value)}} ></input >
       </div>
        <div className="home" >
      <Container className="root-container">
        <Grid className="sample-grid" container spacing={1}>
        
          {Files.filter((value)=>{
          if(search==="")
          {
            return value;
          }
          else if(value.filename.toLowerCase().includes(search.toLowerCase()))
          {
               return value;
          }
        }).map((item,index) => {
            return (
              <>
             
             <Grid className="feedback-requesters-grid" container item xs={4}>
             <div style={{ marginRight: '10px', width: '21rem',marginTop:'20px',justifyContent:"center",textAlign:"center"}}>
              <MediaCard {...item} />
              </div>
              </Grid>
              </>
            );
          })}
        

       
      </Grid>
      </Container>
    </div>
    </div>
  );
  
}
