import React, { Component } from 'react';  // import React and Component
import {BrowserRouter,Route,Switch,withRouter} from "react-router-dom"; // import BrowserRounter,Router,Switch,and WithoutRouter from react-router-dom
import axios from "axios"; // import axios
import Form from "./app_components/Form"; // import Form component
import Nav from "./app_components/Nav"; // import Nav Component 
import Cat from "./routes_components/Cat"; // import Cat Component 
import Dog from "./routes_components/Dog"; // import Dog Component 
import Lion from "./routes_components/Lion"; // Import Lion Component 
import FormSearch from "./routes_components/FormSearch"; // import FormSearch Component 
import config from "./config"; // import flickr API key
import PageNotFount from './routes_components/PageNotFound'; // Import PageNotFound Component


class App extends Component {

  //Set up component State use constructor method.
  constructor(){
    super() 
    this.state = {
      cat: [], // store cat url
      dog: [], // store dog url
      lion: [], // store lion url
      searchURL : [], // store search url
      searchKey : "", // store search key
      loading: false // initial loading to false
    }
  }

  // Fetching Data when The App component is Mounted,hard code the default Fetching Key Word to Cat,dog and lion
  componentDidMount = ()=>{
    this.fetchingDataFromFlickr("cat") // 
    this.fetchingDataFromFlickr("dog")
    this.fetchingDataFromFlickr("lion")
  }


  //method fetching data from flickr use Axios 
  fetchingDataFromFlickr = (searchKey) => {
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${config}&tags=${searchKey}&per_page=16&format=json&nojsoncallback=1`)
    .then(response => response.data.photos.photo) //convert data from flickr 
    .then(this.loadingToFalse()) // set loading boolean value to false 
    .then(response => this.convertToPhotoURL(response)) // convert data to actual URL with convertToPhotoURL function
    .then(url => { // set the default topic search key value and update it data to it's states array.
      if(searchKey === "cat" || searchKey === "dog" || searchKey === "lion"){
        this.setState({
          [searchKey] : url
        })
      }else{
        // update search keywords and it's url set the state loading property to true
        this.setState({
          searchURL : url,
          searchKey ,
          loading: true
        })
      }
    })
    //fetching error display 
    .catch(err => console.log("Fetching Error Occurs,please Double Check on the Fetching States",err))
  }


  //method convert the data to it's actual url array 
  convertToPhotoURL = ( data )=>{
    const url = data.map(date => `https://live.staticflickr.com/${date.server}/${date.id}_${date.secret}.jpg`);
    return url;
  }

  // method to update loading state to false
  loadingToFalse = ()=>{
    this.setState({
      loading: false
    })
  }


  render(){
    return(
      <BrowserRouter>
        <div className="container">
              {/* Passing FetchingDataFromFlickr method to Form Component */}
              <Form fetchSearch={this.fetchingDataFromFlickr} />
              <Nav />
              <Switch>
                    {/* pass url and fetchingDataFromFlickr method to it's responsive component and Route*/}
                    <Route path="/defcat/:id" render={()=> <Cat catURL={this.state.cat} fetchCat={this.fetchingDataFromFlickr} />} />
                    <Route path="/defdog/:id" render={()=> <Dog dogURL={this.state.dog} fetchDog={this.fetchingDataFromFlickr} />} />
                    <Route path="/deflion/:id" render={()=> <Lion lionURL={this.state.lion} fetchLion={this.fetchingDataFromFlickr} />} />
                    <Route path="/search/:id" render={()=> <FormSearch searchURL={this.state.searchURL} 
                                                                        searchKey={this.state.searchKey} 
                                                                        loading={this.state.loading} 
                                                                        fetchSearch={this.fetchingDataFromFlickr}
                                                                        /> } />
                    {/* Display the page not found */}
                    <Route path="/:id" component={PageNotFount} />
              </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default withRouter(App);
