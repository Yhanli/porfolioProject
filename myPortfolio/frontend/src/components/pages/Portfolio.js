import React, {Component, Fragment, useState, useEffect} from 'react';
import axios from 'axios';

class Portfolio extends Component {
    state = {
        loading: true,
        pageContent:null,
        portfolios: null,
    };

    componentDidMount(){
        this.fetPageContent();
    }

    fetPageContent () {
        this.setState({loading: true});
        axios.get('/api/webpages/').then(res=>{
            const page_content = res.data;
            this.setState({pageContent:page_content})
        });
        axios.get('/api/portfolios/').then(res=>{
            const portfolios = res.data;
            this.setState({loading: false, portfolios:portfolios})
        })
    }


    render(){
        const {loading, pageContent, portfolios} = this.state;
        const ready = (!loading && portfolios !== null && pageContent !== null)
        if (ready){
            console.log(loading);
            return (
                <Fragment>
                    <div>
                        <h1>{pageContent.portfolio.page_title}</h1>
                        <h2>{pageContent.portfolio.name}</h2>
                        <p>{pageContent.portfolio.description}</p>
                    </div>

                    <div>
                        {portfolios.map(portfolio => {
                            const {id, title, description, project_startdate, project_enddate, direct_url, project_image} = portfolio;
                            return (
                                <div key={id}>
                                    <h3>{title}</h3>
                                    <p>{description}</p>
                                    <p>{project_startdate} - {project_enddate}</p>
                                    <p>{direct_url}</p>
                                    {/*<p>{project_image}</p>*/}
                                </div>
                            )
                        })}
                    </div>

                </Fragment>
            )
        }
        else{
            return (<div>content not loaded</div>)
        }
    }
}

export default Portfolio;