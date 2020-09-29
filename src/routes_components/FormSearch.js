import React, { Component } from "react";
import PhotowrapList from "../app_components/PhotowrapList";
import {withRouter} from "react-router-dom";
import PhotowrapNotFount from "../app_components/PhotowrapNotFount"

class FormSearch extends Component{

    componentDidMount = ()=>{
        this.theInterval = setInterval(()=>{
            this.tag = this.props.match.params.id;
            this.props.updateStateId(this.tag);
            console.log(this.props.noResult);
        },800)
    }


    componentWillUnmount = ()=> {
        clearInterval(this.theInterval)
    }


    render(){

        let  hasResult ; 
        if(this.props.photoURL.length !== 0){
            hasResult = this.props.photoURL.map((url,index) => {
                return <PhotowrapList urlV={url} key={index}/>
            }) 
        }else{
            hasResult = <PhotowrapNotFount />
        }

        let showTitle = true;
        if(this.props.photoURL.length === 0){
            showTitle = !showTitle;
        }

        return(
            <div className="photo-container">

                {showTitle ? <h2>{this.tag}</h2> : null }
                
                <ul>
                    {hasResult}
                </ul>
            </div>
        )
    }
}

export default withRouter(FormSearch);