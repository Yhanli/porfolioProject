import React, {Component, Fragment, useState, useEffect} from 'react';
import axios from 'axios';

import "./portfolio.scss"
import "./../general.scss"

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

    cleanseDate = (string) => {
        return string.split("T")[0];
    }

    render(){
        const {loading, pageContent, portfolios} = this.state;
        const ready = (!loading && portfolios !== null && pageContent !== null)
        if (ready){
            console.log(loading);
            return (
                <Fragment>
                    <div className="container bgBlueWhite defaultFont">
                        {/*<div className={`frontContainer`}>*/}
                        {/*    <div className={`gradientBg`}></div>*/}
                        {/*    <div className={`imgBgContainer`}>*/}
                        {/*    </div>*/}
                        {/*</div>*/}

                        <div className={`mainSectionContainer`} value={pageContent? document.title = `My Portfolio` : ''}>
                            <div className={`topSection`}>
                                <div className={`twoCol`}>
                                    <img src={pageContent.portfolio.front_image} />
                                </div>
                                <div className={`twoCol`}>
                                    <h1 className={`marginBelow2`}>{pageContent.portfolio.page_title}</h1>
                                    <h2 className={`marginBelow1`}>{pageContent.portfolio.name}</h2>
                                    <p className={`marginBelow1`}>{pageContent.portfolio.description}</p>
                                </div>
                            </div>

                            <div className={`secondSectionContainer`}>
                                {portfolios.map(portfolio => {
                                    const {id, title, description, project_startdate, project_enddate, direct_url, project_image} = portfolio;
                                    return (
                                        <div key={id} className={`projectPreContainer`}>
                                                <h2 className={`marginBelow2`}>{title}</h2>
                                                <p>{description}</p>
                                                {/*<p>{direct_url}</p>*/}
                                                {/*<p>{project_image}</p>*/}
                                                <p className={``}>Duration : {this.cleanseDate(project_startdate)} To {this.cleanseDate(project_enddate)}</p>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

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