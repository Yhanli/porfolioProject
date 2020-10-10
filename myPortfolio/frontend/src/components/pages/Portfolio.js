import React, {Component, Fragment, useState, useEffect} from 'react';
import axios from 'axios';

import "./portfolio.scss"
import "./../general.scss"
import "./../parts/modal.css"

class Portfolio extends Component {

    constructor(props){
        super (props);
        this.state = {
            loading: true,
            pageContent:null,
            portfolios: null,
            showModal: false
        }
    }


    componentDidMount(){
        this.fetPageContent();
    };

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
    };

    cleanseDate = (string) => {
        return string.split("T")[0];
    };

    previewText = (string) => {
        const max_length = 240;
        if (string.length > max_length){
            return string.substring(0,max_length) + "...";
        }
        else{
            return string;
        }
    };

    showModalAction = (id) =>{
        console.log(id);
        console.log(`showing ${id}`);
        const element = document.getElementById(`post-modal-${id}`);
        const element_content = document.getElementById(`post-modal-${id}-content`);
        const main_html = document.body;

        if (!this.state.showModal) {
            element_content.classList.add("modal-active-content");
            element.classList.add("modal-active");
            main_html.classList.add('main-stop-scroll');
            // console.log(main_html.classList)
        }

        else {
            element_content.classList.remove("modal-active-content");
            element.classList.remove("modal-active");
            main_html.classList.remove('main-stop-scroll');
        }

        this.setState({showModal: !this.state.showModal});

    };

    render(){
        const {loading, pageContent, portfolios} = this.state;
        const ready = (!loading && portfolios !== null && pageContent !== null);
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
                                        <div key={`post-${id}`} >
                                            <div className={`modal-bg`} id={`post-modal-${id}`}
                                                 onClick={this.showModalAction.bind(this, id)}
                                            >
                                            </div>
                                            <div className={`modal-bg-content`} id={`post-modal-${id}-content`}>
                                                <div className={`modal-content`}>
                                                    <div>
                                                        <p>this is gonna be image</p>
                                                    </div>
                                                    <div>
                                                        <p>this is gonna be contents</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div  className={`projectPreContainer `} onClick={this.showModalAction.bind(this, id)}

                                            >
                                                    <h2 className={`marginBelow2`}>{title}</h2>
                                                    <p>{this.previewText(description)}</p>
                                                    {/*<p>{direct_url}</p>*/}
                                                    <div className={`marginBelow1`}>{project_image.slice(0,4).map(image => {
                                                        const {picture} = image;
                                                        return(
                                                            <img className={`previewImage`} src={picture}/>
                                                        )
                                                        }
                                                    )}</div>
                                                    <p className={``}>Duration : {this.cleanseDate(project_startdate)} To {this.cleanseDate(project_enddate)}</p>
                                            </div>
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
            return (<div></div>)
        }
    }
}

export default Portfolio;