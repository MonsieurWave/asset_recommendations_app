import React, { Component } from 'react'
import axios from 'axios'
import PortfolioSection from './portfolioSection'
import ArticleFeed from './articleFeed.js'
import QueryRecommendationButton from './queryRecommendationButton'

export default class mainSection extends Component {
    constructor() {
        super();
        this.state = {
          articles: [],
          portfolio_assets: []
        }
      }

    componentWillMount() {
     axios.get('/recommendations/recommendations.json') // JSON File Path
       .then( response => {
         this.setState({
         articles: response.data
       });
         console.log(response)
     })
     .catch(function (error) {
       console.log(error);
     });

      axios.get('/user_data/user_portfolio_1.txt') // JSON File Path
       .then( response => {
         this.setState({
         portfolio_assets: response.data
       });
         console.log(response)
     })
     .catch(function (error) {
       console.log(error);
     });
    }


    render() {
        const articles = this.state.articles;
        const portfolio_assets = this.state.portfolio_assets;
        let ArticleSectionPlaceHolder = '';
        let PortfolioSectionPlaceHolder = '';

        if(articles.length > 0) {
            ArticleSectionPlaceHolder = (<ArticleFeed articles={articles}/>)
        }

        if(portfolio_assets.length > 0) {
            PortfolioSectionPlaceHolder = (<PortfolioSection portfolio={portfolio_assets}/>)
        }

        return (
                <div>
                    {PortfolioSectionPlaceHolder}
                    {ArticleSectionPlaceHolder}
                    <QueryRecommendationButton/>
                </div>
        )
    }

}
