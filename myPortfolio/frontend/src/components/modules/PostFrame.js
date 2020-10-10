import React, {Component, Fragment} from 'react';





class PostFrame extends Component {
    constructor(props){
        super (props);
        this.state = {
            showModal:false
        };
    }

    render() {
        return(
            <Fragment>
                <div> this is gonna be a modal</div>
            </Fragment>
        )
    }
}


export default PostFrame;



// no need to use another js, the post will just show on the main js file