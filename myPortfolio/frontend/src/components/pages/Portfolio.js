import React, {Component, Fragment, useState, useEffect} from 'react';
import axios from 'axios';
import { Zoom } from 'react-slideshow-image';
import {withAlert} from "react-alert";

import "./portfolio.scss"
import "./../general.scss"
import "../modules/modal.css"

import 'react-slideshow-image/dist/styles.css'

axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.withCredentials = true;

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
    DateMonthYear = (string)=>{
        const months = {
            0: 'January',
            1: 'February',
            2: 'March',
            3: 'April',
            4: 'May',
            5: 'June',
            6: 'July',
            7: 'August',
            8: 'September',
            9: 'October',
            10: 'November',
            11: 'December'
        };
        const parsed_date = new Date(string);
        return `${months[parsed_date.getMonth()]} ${parsed_date.getFullYear()}`;
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

        if (!this.state.showModal) {
            element_content.classList.add("modal-active-content");
            element.classList.add("modal-active");
            main_html.classList.add('main-stop-scroll');
        }

        else {
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
        this.props.alert.show("Sending email to Yuhan ",{type: "info"});
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
                    <script>
                        {document.getElementById("favicon").href = pageContent.favicon}
                    </script>
                    <div className={`bgBlueWhite`} style={{
                        backgroundImage:`url(${pageContent.portfolio.back_image})`
                    }}>
                        <div className="container defaultFont">
                            <div className="topnav" id={`navbar`}>
                                {/*<a href="#top"><img className={`nav-logo`} src={pageContent.favicon} href="#top"/></a>*/}
                                <div className="topnav-right">
                                    <a href="#top">Portfolio</a>
                                    <a href="#projects">Projects</a>
                                    <a href="#experience">Experiences</a>
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

                                        <a className="button"
                                           href={pageContent.portfolio.my_resume} target="_blank"
                                        ><span>View Resume</span></a>
                                    </div>
                                </div>
                                <div className={`paddingTop5 marginBelow2 subHeadingStyle`}  id={`projects`}>
                                    <h1>My Projects</h1>
                                </div>
                                <div className={`secondSectionContainer`}>
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
                                <div className={`paddingTop5 marginBelow2 subHeadingStyle`} id={`experience`}>
                                    <h1>My Experiences</h1>
                                </div>
                                <div className={`secondSectionContainer`} >
                                    {pageContent.experiences.map(experience => {
                                        const {id, title, company, location, time_start, time_end, description} = experience;
                                        return(
                                            <div key={`exp-${id}`} className={`experience-container marginBelow4`}>
                                                <div style={{marginBottom:'1rem', paddingRight:'1rem'}}>
                                                    <h4 className={`marginBelow1`}>{title}</h4>
                                                    <p><span>{this.DateMonthYear(time_start)}</span>{time_end ? ` - ${this.DateMonthYear(time_end)}`:' - Current'}</p>
                                                    <p><span>At {location} - {company}</span></p>
                                                </div>
                                                <div>
                                                    <p className={`longText`}>{description}</p>
                                                </div>
                                            </div>
                                        )
                                    })}

                                </div>
                                <div className={`paddingTop5 marginBelow2 subHeadingStyle`}  id={`projects`}>
                                    <h1>Contact Me</h1>
                                </div>
                                <div className={`secondSectionContainer leftrightMargin`} id={`contact`}>
                                    <form onSubmit={this.onSubmit} className={`form-body`}>
                                        <div className="half-form">
                                            <input
                                                className="form-control"
                                                type="text"
                                                name="name"
                                                placeholder={"Your Full Name"}
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
                                            <textarea
                                                className="form-control"
                                                type="text"
                                                name="message"
                                                placeholder={"Your Message"}
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
                                        <i className="fab fa-linkedin-in fa-2x"></i></a> : ""
                                    }
                                    { pageContent.facebook ?
                                    <a href={pageContent.facebook} target={`_blank`}>
                                        <i className="fab fa-facebook-f fa-2x"></i></a> : ""
                                    }
                                    { pageContent.git ?
                                    <a href={pageContent.git} target={`_blank`}>
                                        <i className="fab fa-github fa-2x"></i></a> : ""
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