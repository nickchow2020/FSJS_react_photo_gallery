import React, { Component } from 'react';
import {BrowserRouter,Route,Switch} from "react-router-dom";
import axios from "axios";
import Form from "./app_components/Form";
import Nav from "./app_components/Nav";
import Cat from "./routes_components/Cat";
import Dog from "./routes_components/Dog";
import Lion from "./routes_components/Lion";
import FormSearch from "./routes_components/FormSearch";
import config from "./config";
import PageNotFount from './routes_components/PageNotFound';


class App extends Component {
  state = {
    cat: [],
    dog: [],
    lion: [],
    search: []
  }


  componentDidMount = ()=>{
    this.fetchingDataFromFlickr("cat")
    this.fetchingDataFromFlickr("dog")
    this.fetchingDataFromFlickr("lion") 
  }


  fetchingDataFromFlickr = (searchKey) => {
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${config}&tags=${searchKey}&per_page=16&format=json&nojsoncallback=1`)
    .then(response => response.data.photos.photo)
    .then(response => this.convertToPhotoURL(response))
    .then(url => {
      this.setState({
        [searchKey] : url
      })
    })
    .catch(err => console.log("Fetching Error Occurs,please Double Check on the Fetching States",err))
  }


  convertToPhotoURL = ( data )=>{
    const url = data.map(date => `https://live.staticflickr.com/${date.server}/${date.id}_${date.secret}.jpg`);
    return url;
  }


  render(){
    return(
      <div className="container">
          <BrowserRouter>
            <Form />
            <Nav />
            <Switch>
                <Route path="/defcat/:id" render={()=> <Cat catURL={this.state.cat} fetchCat={this.fetchingDataFromFlickr} />} />
                  <Route path="/defdog/:id" render={()=> <Dog dogURL={this.state.dog} fetchDog={this.fetchingDataFromFlickr} />} />
                  <Route path="/deflion/:id" render={()=> <Lion lionURL={this.state.lion} fetchLion={this.fetchingDataFromFlickr} />} />
                  <Route path="/search/:id" render={()=> <FormSearch />} />
                  <Route path="/:id" component={PageNotFount} />
            </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default App;
