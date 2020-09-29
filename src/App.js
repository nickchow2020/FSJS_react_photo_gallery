import React, { Component } from 'react';
import {BrowserRouter,Route,Switch} from "react-router-dom";
import axios from "axios";
import Form from "./app_components/Form";
import Nav from "./app_components/Nav";
import ButtonSearch from "./routes_components/ButtonSearch";
import FormSearch from "./routes_components/FormSearch";
import config from "./config";
import PageNotFount from './routes_components/PageNotFound';




class App extends Component {


  state = {
    theID : null,
    theURL : [],
  }

  

  componentDidMount = ()=>{
    if(this.state.theId !== null){
      this.theInterval = setInterval(()=>{
        axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${config}&tags=${this.state.theID}&per_page=16&format=json&nojsoncallback=1`)
        .then(response => {
          const responseData = response.data.photos.photo
          const theURL = responseData.map(data => `https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}.jpg`)
          this.setState({
            theURL
          })
        })
      },500)
    }
  }

  updateTheID = (theID)=>{
    this.setState({
      theID 
    })
  }


  shouldComponentUpdate = (nextP,nextS)=>{
    if(nextS.theID === this.state.theID && nextS.theURL[1] !== this.state.theURL[1]){
      return true
    }
    return false
  }

  render(){
    return(
      <div className="container">
          <BrowserRouter>
            <Form />
            <Nav />
            <Switch>
              <Route path="/buttonSearch/:id" render={()=> <ButtonSearch updateStateId={this.updateTheID} photoURL={this.state.theURL} />} />
              <Route path="/search/:id" render={()=> <FormSearch updateStateId={this.updateTheID} photoURL={this.state.theURL} />} />
              <Route path="/:id" component={PageNotFount} />
            </Switch>
        </BrowserRouter>
      </div>
    )
  }
}
export default App;
