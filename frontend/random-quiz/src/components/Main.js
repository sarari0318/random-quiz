import React, { useState, useContext } from 'react'
import {ApiContext} from '../context/ApiContext';

import { createMuiTheme, ThemeProvider, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from "@material-ui/core/CssBaseline";
import Switch from '@material-ui/core/Switch';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {
    orange,
    deepPurple,
    deepOrange
  } from '@material-ui/core/colors';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { withCookies } from 'react-cookie';
import QuizTable from './QuizTable';

const useStyles = makeStyles((theme) => ({
    toolbar: {
        paddingRight: 24 // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar
    },
    title: {
        flexGrow: 1,
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      height: '100vh',
      overflow: 'auto'
    },
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4)
    },
}));

const Main = (props) => {
  const classes = useStyles();
  const [darkState, setDarkState] = useState(true);
  const { isSolved, setIsSolved } = useContext(ApiContext);
  const palletType = darkState ? 'dark' : 'light';
  const mainPrimaryColor = darkState ? orange[500] : '#404148';
  const mainSecondaryColor = darkState ? deepOrange[900] : deepPurple[500];
  darkState ? setIsSolved(false) : setIsSolved(true)
  
  const darkTheme = createMuiTheme({
    palette: {
      type: palletType,
      primary: {
        main: mainPrimaryColor
      },
      secondary: {
        main: mainSecondaryColor
      }
    },
    typography: {
      fontFamily:'Comic Neue',
      
    }
  });
  const handleThemeChange = () => {
    setDarkState(!darkState);
  };

  const Logout = () => event => {
    props.cookies.remove('current-token');
    window.location.href = '/'
  }


    return (
        <ThemeProvider theme={darkTheme}>
            <div className={classes.root}>
            <CssBaseline />
                <AppBar
                    position='absolute'
                >
                    <Toolbar className={classes.toolbar}>
                      {isSolved  ? 
                        <Typography
                            component='h1'
                            variant='h6'
                            noWrap
                            className={classes.title}
                            
                            >
                            Achived Tasks
                        </Typography>
                        :
                        <Typography
                            component='h1'
                            variant='h6'
                            noWrap
                            className={classes.title}
                            
                            >
                            Challenge Tasks
                        </Typography>
                        }
                        <Switch checked={darkState} onChange={handleThemeChange} />
                        <button className='signOut' onClick={Logout()}>

                          {/* ここのボタンの装飾の設定(色など)は、App.cssでできる！
                          udemy.com/course/sns-react-hooks-django-restframework-api-web/learn/lecture/20030122?start=1015#notes */}
                          <ExitToAppIcon />
                        </button>
                    </Toolbar>
                </AppBar>
              </div>
              
              

              <div className='container'>
    
                {/* ここに、テーブルなどを他のファイルで書いて、載せる */}
                <QuizTable />
                
              </div>

            
        </ThemeProvider>
    )
}

export default withCookies(Main)
