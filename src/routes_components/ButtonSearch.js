import React, { Component } from "react" ;
import {withRouter} from "react-router-dom";
import PhotowrapList from "../app_components/PhotowrapList";
class ButtonSearch extends Component{

    componentDidMount = ()=>{
        this.theInterval = setInterval(() => {
            this.id = this.props.match.params.id
            this.props.updateStateId(this.id)
        }, 500);
    }

    componentWillUnmount = ()=>{
        clearInterval(this.theInterval)
    }

    render(){
        return(
            <div className="photo-container">
                <h2>{this.id}</h2>
                <ul>
                    {
                        this.props.photoURL.map((url,index)=>{
                            return <PhotowrapList urlV={url} key={index}/>
                        })
                    }
                </ul>
            </div>
        )
    }
}

export default withRouter(ButtonSearch);