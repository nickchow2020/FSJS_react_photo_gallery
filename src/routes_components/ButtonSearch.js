import React, { Component } from "react" ;
import {withRouter} from "react-router-dom";
import PhotowrapList from "../app_components/PhotowrapList";
class ButtonSearch extends Component{

    componentDidMount = ()=>{
        // set interval when the component is mounted and retrieve match.params.id value each half second update the theID state via the props updateStateId() 
        this.theInterval = setInterval(() => {
            this.id = this.props.match.params.id
            this.props.updateStateId(this.id)
        }, 500);
    }

    componentWillUnmount = ()=>{
        // when the component nu-mounted clear the interval.
        clearInterval(this.theInterval)
    }

    render(){
        return(
            <div className="photo-container">
                {/* display the current match.params.id value */}
                <h2>{this.id}</h2> 
                <ul>
                    {
                        // map through the photoURLs from the parent component and display each image by PhotoWrapList component
                        this.props.photoURL.map((url,index)=>{
                            return <PhotowrapList urlV={url} key={index}/>
                        })
                    }
                </ul>
            </div>
        )
    }
}

export default withRouter(ButtonSearch); // set up the Router History