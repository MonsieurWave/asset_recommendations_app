import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { makeStyles } from '@material-ui/core/styles';
import { scaleThreshold } from 'd3-scale';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

function palette(min, max) {
    const d = (max-min)/9;
    return scaleThreshold()
        .range(['#00429d', '#2d58a8', '#456fb2', '#5b87bc', '#709fc6', '#87b7d1', '#a0cedb', '#c1e5e5', '#fff3ef'])
        .domain([min + d*1,min + d*2,min + d*3,min + d*4,min + d*5,min + d*6,min + d*7,min + d*8]);
}

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    maxWidth: '50%',
    margin: 'auto',
    marginBottom: '15px',
    marginTop: '15px'
  },
}));

export default function PortfolioSection(props) {
  const classes = useStyles();
  const portfolio_assets = props.portfolio;
  const equityAssets = portfolio_assets.filter(asset => asset.assetType === 'EQUITY');
  const labelDataArray = equityAssets.map(asset => asset.isinDescription);
  const valueDataArray = equityAssets.map(asset => asset.price * asset.quantity);
  const min = Math.min(...valueDataArray);
  const max = Math.max(...valueDataArray);
  const colorPalette = valueDataArray.map((value) => palette(min,max)(value));

  const data = {
    datasets: [{
        data: valueDataArray,
        backgroundColor: colorPalette
    }],
    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: labelDataArray
};


  return (
      <Paper className={classes.root}>
        <Typography variant="h5" component="h2">
            Equity Portfolio
        </Typography>
        <Typography variant="body2" component="p">
          by Issuer
        </Typography>
        <Doughnut data={data}/>
      </Paper>
  );
};