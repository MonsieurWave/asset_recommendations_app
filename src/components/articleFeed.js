import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ArticleCard from "./articleCard";


const useStyles = makeStyles({
    articles: {
        maxWidth: 750,
        display: 'table',
        margin: 'auto',
    }
});

export default function ArticleFeed(props) {
  const classes = useStyles();

  const ArticleSection = props.articles.map(article => {
    console.log(article)
    return (<div>
        <ArticleCard title={article.title}
                     body={article.desc}
                     date={new Date(article.publication_date/1)}
                     company_tag={article.Companies[0]}
        />
    </div>)
  });
  return (
    <div className={classes.articles}>
        {ArticleSection}
    </div>
  );
}