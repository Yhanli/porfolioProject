import React, {Component, Fragment, useState, useEffect} from 'react';
import axios from 'axios';
import { Zoom } from 'react-slideshow-image';
import {withAlert} from "react-alert";

import "./portfolio.scss"
import "./../general.scss"
import "../modules/modal.css"

import 'react-slideshow-image/dist/styles.css'

class Portfolio extends Component {

    constructor(props){
        super (props);
        this.state = {
            loading: true,
            pageContent:null,
            portfolios: null,
            showModal: false,
            name:"",
            email:"",
            subject:"",
            message:"",
            sendto:""
        }
    }


    componentDidMount(){
        this.fetPageContent();
    };

    fetPageContent () {
        this.setState({loading: true});
        axios.get('/api/webpages/').then(res=>{
            const page_content = res.data;

            this.setState({
                pageContent:page_content,
                sendto: page_content.contact_email
            })

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
        const max_length = 220;
        if (string.length > max_length){
            return string.substring(0,max_length) + "...";
        }
        else{
            return string;
        }
    };

    showModalAction = (id) =>{
        const element = document.getElementById(`post-modal-${id}`);
        const element_content = document.getElementById(`post-modal-${id}-content`);
        const main_html = document.body;
        const navbar = document.getElementById(`navbar`);

        if (!this.state.showModal) {
            navbar.classList.add('notActive')
            element_content.classList.add("modal-active-content");
            element.classList.add("modal-active");
            main_html.classList.add('main-stop-scroll');
        }

        else {
            navbar.classList.remove('notActive')
            element_content.classList.remove("modal-active-content");
            element.classList.remove("modal-active");
            main_html.classList.remove('main-stop-scroll');
        }

        this.setState({showModal: !this.state.showModal});

    };

    onSubmit = e =>{
        e.preventDefault();
        const {name, email, subject, message, sendto} = this.state
        const query = {
            name,
            email,
            message,
            subject,
            sendto
        }
        axios.post("/api/webpages/", query)
            .then(res => {
                console.log(res.status);
                this.props.alert.show(res.data,{type: "success"});
            })
            .catch(error => {
                if (error.response) {
                    this.props.alert.show(error.response.data,{type: "error"});
                }
            });

        this.setState({
            name:"",
            email:"",
            subject:"",
            message:""
        })
    };

    onChange = e =>{
        this.setState({[e.target.name]: e.target.value})
    };



    render(){
        const zoomInProperties = {
            indicator:"true",
            scale: 1.4,
            duration: 4000,
            pauseOnHover: true,
            indicators: i => (<div className="indicator">{i + 1}</div>),
            // prevArrow: <div style={{width: "40px", marginRight: "-40px"}}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#fff"><path d="M242 180.6v-138L0 256l242 213.4V331.2h270V180.6z"/></svg></div>,
            // nextArrow: <div style={{width: "40px", marginLeft: "-40px"}}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#fff"><path d="M512 256L270 42.6v138.2H0v150.6h270v138z"/></svg></div>
        };
        const {loading, pageContent, portfolios} = this.state;
        const {name, email, subject, message} = this.state
        const ready = (!loading && portfolios !== null && pageContent !== null);
        if (ready){
            return (
                <Fragment>
                    <div className={`bgBlueWhite`}>
                        <div className="container defaultFont">
                            {/*<div className={`frontContainer`}>*/}
                            {/*    <div className={`gradientBg`}></div>*/}
                            {/*    <div className={`imgBgContainer`}>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                            <div className="topnav" id={`navbar`}>
                                <div className="topnav-right">
                                    <a href="#top">Portfolio</a>
                                    <a href="#projects">My Projects</a>
                                    <a href="#experience">My Experiences</a>
                                    <a href="#contact">Contact</a>
                                </div>
                            </div>

                            <div className={`mainSectionContainer`} id={`top`} value={pageContent? document.title = `My Portfolio` : ''}>

                                <div className={`topSection`}>
                                    <div className={`twoCol`}>
                                        <img src={pageContent.portfolio.front_image} />
                                    </div>
                                    <div className={`twoCol`}>
                                        <h1 className={`marginBelow1`}>{pageContent.portfolio.name}</h1>
                                        <h2 className={`marginBelow1`}>{pageContent.portfolio.page_title}</h2>
                                        <p className={`marginBelow1 longText`}>{pageContent.portfolio.description}</p>
                                    </div>
                                </div>

                                <div className={`secondSectionContainer paddingTop5`} id={`projects`}>
                                    {portfolios.map(portfolio => {
                                        const {id, title, description, project_startdate, project_enddate, direct_url,
                                            project_image, source_code_url} = portfolio;
                                        return (
                                            <div key={`post-${id}`} >
                                                <div className={`modal-bg`} id={`post-modal-${id}`}
                                                     onClick={this.showModalAction.bind(this, id)}
                                                >
                                                </div>
                                                <div className={`modal-bg-content`} id={`post-modal-${id}-content`}>
                                                    <div className={`modal-content`}>
                                                        <div className={`modal-image-slide`}>
                                                            <Zoom {...zoomInProperties}>
                                                                {project_image.map(
                                                                    image =>
                                                                        <a key={`slid-img-${image.id}`} href={image.picture_direct} target="_blank" style={{width: "100%",
                                                                            maxHeight:'550px'
                                                                        }}>
                                                                        <img  className={`modal-image`}
                                                                             title={image.picture_direct ? `${image.picture_alt}` : ''}
                                                                              src={image.picture}
                                                                        /></a>
                                                                )}
                                                            </Zoom>
                                                        </div>
                                                        <div>
                                                            <h2 className={`mainTitleStyle`}>{title}</h2>
                                                            <p className={`mainDateStyle marginBelow2`}>{this.cleanseDate(project_startdate)} To {this.cleanseDate(project_enddate)}</p>
                                                        </div>
                                                        <div>
                                                            <h4 className={`mainSubTitleStyle marginBelow1`}>Description</h4>
                                                            <p className={`mainTextStyle longText marginBelow2`}>{description}</p>
                                                        </div>
                                                        <div className={`mainTextStyle`}>
                                                            {  source_code_url? <a className="button"
                                                                href={source_code_url} target="_blank"
                                                                ><span>Open Code</span></a>
                                                                : ""
                                                            }
                                                            {  direct_url? <a className="button"
                                                                                   href={direct_url} target="_blank"
                                                                ><span>Open Project</span></a>
                                                                : ""
                                                            }
                                                        </div>
                                                    </div>
                                                </div>

                                                <div  className={`projectPreContainer`} onClick={this.showModalAction.bind(this, id)}>
                                                        <h2 className={`marginBelow2`}>
                                                            <i className="fa fa-book"></i>
                                                            &nbsp;
                                                            {title}</h2>
                                                        <p>{this.previewText(description)}</p>
                                                        {/*<p>{direct_url}</p>*/}
                                                        <div className={`marginBelow1 previewImageContainer`}>{project_image.slice(0,20).map(image => {
                                                            const {id,picture} = image;
                                                            return(
                                                                <img key={`img-${id}`} className={`previewImage`} src={picture}/>
                                                            )
                                                            }
                                                        )}</div>
                                                        <p className={``}>Duration : {this.cleanseDate(project_startdate)} To {this.cleanseDate(project_enddate)}</p>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>

                                <div className={`secondSectionContainer paddingTop5`} id={`experience`}>
                                    {pageContent.experiences.map(experience => {
                                        const {id, title, company, location, time_start, time_end, description} = experience;
                                        return(
                                            <div key={`exp-${id}`} className={`experience-container marginBelow4`}>
                                                <div style={{marginBottom:'1rem', paddingRight:'1rem'}}>
                                                    <h4 className={`marginBelow1`}>{title}</h4>
                                                    <p><span>{time_start}</span>{time_end ? ` - ${time_end}`:' - Current'}</p>
                                                    <p><span>At {location} - {company}</span></p>
                                                </div>
                                                <div>
                                                    <p className={`longText`}>{description}</p>
                                                </div>
                                            </div>
                                        )
                                    })}

                                </div>

                                <div className={`secondSectionContainer paddingTop4`} id={`contact`}>
                                    <h3>Contact Me</h3>
                                    <form onSubmit={this.onSubmit} className={`form-body`}>
                                        <div className="half-form">
                                            <input
                                                className="form-control"
                                                type="text"
                                                name="name"
                                                placeholder={"Your Full Name*"}
                                                onChange={this.onChange}
                                                value={name}
                                            />
                                        </div>
                                        <div className="half-form">
                                            <input
                                                className="form-control"
                                                type="email"
                                                name="email"
                                                placeholder={"Your Email"}
                                                onChange={this.onChange}
                                                value={email}
                                            />
                                        </div>
                                        <div className="full-form">
                                            <input
                                                className="form-control"
                                                type="text"
                                                name="subject"
                                                placeholder={"Subject"}
                                                onChange={this.onChange}
                                                value={subject}
                                            />
                                        </div>
                                        <div className="full-form">
                                            {/*<label>Message</label>*/}
                                            <textarea
                                                className="form-control"
                                                type="text"
                                                name="message"
                                                placeholder={"Your Message*"}
                                                onChange={this.onChange}
                                                value={message}
                                            />
                                        </div>
                                        <div className="full-form submit-button">
                                            <button type="submit" className="button">
                                                Submit
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>

                        </div>
                        <div className="footer">
                            <div className={`footer-max`}>
                                <div className="topnav-right">
                                    { pageContent.linkedin ?
                                        <a href={pageContent.linkedin} target={`_blank`}>
                                        <i className="fab fa-linkedin-in"></i></a> : ""
                                    }
                                    { pageContent.facebook ?
                                    <a href={pageContent.facebook} target={`_blank`}>
                                        <i className="fab fa-facebook-f"></i></a> : ""
                                    }
                                    { pageContent.git ?
                                    <a href={pageContent.git} target={`_blank`}>
                                        <i className="fab fa-github"></i></a> : ""
                                    }
                                </div>
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

export default withAlert() (Portfolio);