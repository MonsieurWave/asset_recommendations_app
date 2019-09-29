import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SentimentBadge from './sentimentBadge';
import ArticleCard from "./articleCard";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
    articles: {
        maxWidth: 750,
        display: 'table',
        margin: 'auto',
    },
    title: {
        marginTop: '10px',
        marginBottom: '10px',
        fontStyle: 'italic'
    }
});

export default function ArticleFeed(props) {
  const classes = useStyles();

  const ArticleSection = props.articles.map(article => {
    console.log(article)
    let companyTag = article.Companies;
    if (Array.isArray(article.Companies)) {
        companyTag = article.Companies[0];
    }

    return (
        <div>
        <SentimentBadge
            content={
                 <ArticleCard title={article.title}
                 body={article.desc}
                 date={new Date(article.publication_date/1)}
                 company_tag={companyTag}
                />
            }
            sentiment={article.sentiment}
        />
        </div>
    )
  });

  return (
    <div className={classes.articles}>
        <Typography variant="h5" component="h2" className={classes.title}>
            Recommended News
        </Typography>
        {ArticleSection}
    </div>
  );
}