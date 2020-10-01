import React, { Component } from "react" ;
import {withRouter} from "react-router-dom";
import PhotowrapList from "../app_components/PhotowrapList";

class Dog extends Component{

    state = { 
        defKey : ""
    }

    componentDidMount = ()=>{
        const defKey = this.props.match.params.id;
        this.props.fetchDog(defKey)
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
                        this.props.dogURL.map((url,index) =>  <PhotowrapList urlV={url} key={index} /> )
                    }
                </ul>
            </div>
        )
    }
}

export default withRouter(Dog); // set up the Router History