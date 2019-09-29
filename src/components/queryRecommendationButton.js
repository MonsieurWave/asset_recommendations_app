import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBrain } from '@fortawesome/free-solid-svg-icons'
import Fab from '@material-ui/core/Fab';
import Typography from '@material-ui/core/Typography';

const PYTHON_BACKEND_ENDPOINT = 'http://localhost:5000/get_recommendations';

const useStyles = makeStyles(theme => ({
  fab: {
    'margin-top': theme.spacing(2),
  },
  background: {
    'background-color': 'black'
  },
    label:{
      color: 'white',
      'padding-bottom': theme.spacing(2),
    },
}));

function httpGetAsync(theUrl, callback) {
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState === 4)
            callback(xmlHttp.responseText);
    };
    xmlHttp.open("GET", theUrl, true); // true for asynchronous
    xmlHttp.send(null);
}

export default function QueryRecommendationButton(props) {
  const classes = useStyles();
  const [requestPending, setRequestPending] = useState(false);

  const defaultIcon = () => {
          return (<FontAwesomeIcon icon={faBrain} />)
      };
  const waitingIcon = () => {
      return (<div>...</div>)
  };
  const [icon, setIcon] = useState(defaultIcon);


  const queryRecommendations = () => {
    if (requestPending) {
        return false;
    }
    setRequestPending(true);
    setIcon(waitingIcon);
    httpGetAsync(PYTHON_BACKEND_ENDPOINT, response => {
        console.log('Query is back.');
        setRequestPending(false);
        setIcon(defaultIcon);
        window.location.reload();
        return true;
    })
  };


  return (
    <div className={classes.background}>
        <Fab color="primary" aria-label="add" className={classes.fab} onClick={queryRecommendations}>
            {icon}
        </Fab>
        <div>
            <Typography className={classes.label} color="textSecondary">
                Compute
            </Typography>
        </div>
    </div>

  );
}