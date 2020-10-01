import React, { Component } from "react" ;
import {withRouter} from "react-router-dom";
import PhotowrapList from "../app_components/PhotowrapList";

class Cat extends Component{

    state = { 
        defKey : "",
        url : []
    }
    
    componentDidMount = ()=>{
        const defKey = this.props.match.params.id;
        this.props.fetchCat(defKey)
        this.setState({
            defKey,
        })
    }
    

    render(){
        
        return(
            <div className="photo-container">
                <h2>{this.state.defKey}</h2>
                <ul>
                    {
                        this.props.catURL.map((url,index) => { return <PhotowrapList urlV={url} key={index} />} )
                    }
                </ul>
            </div>
        )
    }
}

export default withRouter(Cat); // set up the Router History