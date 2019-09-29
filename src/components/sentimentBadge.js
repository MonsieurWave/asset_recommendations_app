import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Badge from '@material-ui/core/Badge';
import { scaleThreshold } from 'd3-scale';


function sentimentPalette(min, max) {
    const d = (max-min)/9;
    return scaleThreshold()
        .range(['#006b09', '#3c9249', '#6ab981', '#a1e0b8', '#ffffe0', '#ffbcaf', '#f4777f', '#cf3759', '#93003a'])
        .domain([min + d*1,min + d*2,min + d*3,min + d*4,min + d*5,min + d*6,min + d*7,min + d*8]);
}


const useStyles = color => {
    return makeStyles(theme => ({
        badge: {
            backgroundColor: color,
        }
    }))()
};

export default function SentimentBadge(props) {
    const [invisible, setInvisible] = React.useState(true);
  const handleBadgeVisibility = () => {
    setInvisible(!invisible);
  };

  const sentimentColorPalette = sentimentPalette(-1, 1);

  const color = sentimentColorPalette(-1 * props.sentiment);
  const classes = useStyles(color);

  return (
      <div
          onMouseEnter={handleBadgeVisibility}
          onMouseLeave={handleBadgeVisibility}
      >
          <Badge badgeContent=""
                 classes={{badge: classes.badge}}
                 invisible={invisible}
          >
            {props.content}
          </Badge>
      </div>
  )
}

