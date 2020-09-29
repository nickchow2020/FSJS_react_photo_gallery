import React, { Component } from "react";
import PhotowrapList from "../app_components/PhotowrapList";
import {withRouter} from "react-router-dom";
import PhotowrapNotFount from "../app_components/PhotowrapNotFount"

class FormSearch extends Component{

    componentDidMount = ()=>{
        // when the component is mounted set a interval for each 0.8 second,retrieve the current match.params.id to the parent component,via the props updateStatedId.
        this.theInterval = setInterval(()=>{
            this.tag = this.props.match.params.id;
            this.props.updateStateId(this.tag);
            console.log(this.props.noResult);
        },800)
    }


    componentWillUnmount = ()=> {
        // when the component is un-mounted clear hte interval
        clearInterval(this.theInterval)
    }


    render(){

        let  hasResult ;  // initial the photo lists variable 
        if(this.props.photoURL.length !== 0){
            // if the  state value theURL is an empty array, set it the photo lists variable to Not Found component,else map theURL array and return a list of image.
            hasResult = this.props.photoURL.map((url,index) => {
                return <PhotowrapList urlV={url} key={index}/>
            }) 
        }else{
            hasResult = <PhotowrapNotFount />
        }

        let showTitle = true;// hide the search component title if it's no result found
        if(this.props.photoURL.length === 0){
            showTitle = !showTitle;
        }

        return(
            <div className="photo-container">
                {/* hide the search component title if it's no result found */}
                {showTitle ? <h2>{this.tag}</h2> : null }
                
                <ul>
                    {/* display the photo results */}
                    {hasResult}
                </ul>
            </div>
        )
    }
}

export default withRouter(FormSearch);