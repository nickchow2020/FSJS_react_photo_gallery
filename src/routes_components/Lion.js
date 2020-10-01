import React, { Component } from "react" ;
import {withRouter} from "react-router-dom";
import PhotowrapList from "../app_components/PhotowrapList";

class Lion extends Component{

    state = { 
        defKey : ""
    }

    componentDidMount = ()=>{
        const defKey = this.props.match.params.id;
        this.props.fetchLion(defKey)
        this.setState({
            defKey
        })
    }


    render(){
        
        return(
            <div className="photo-container">
                <h2>{this.state.defKey}</h2>
                <ul>
                    {
                        this.props.lionURL.map((url,index) =>  <PhotowrapList urlV={url} key={index} /> )
                    }
                </ul>
            </div>
        )
    }
}

export default withRouter(Lion); // set up the Router History