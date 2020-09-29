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

  // initial the component state,
  state = {
    theID : null, // initial the match params id value to null
    theURL : [], // initial the fetching date from flickr to actual URL an empty array
  }

  
// when the component is mounted to the dom
  componentDidMount = ()=>{
    if(this.state.theId !== null){ //prevent setInterval method runs when the theID state value is null
      this.theInterval = setInterval(()=>{ // set up the setInterval method to retrieve data from state each time when the state is being updated
        axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${config}&tags=${this.state.theID}&per_page=16&format=json&nojsoncallback=1`) // using axios to fetching date
                  // api_key parameter import from separate file,that file is name config.js 
                  // tag value set it to component state theID.
        .then(response => {
          const responseData = response.data.photos.photo // convert data from axios
          const theURL = responseData.map(data => `https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}.jpg`)
                      // use map the map through each data array from flickr and convert it's data to actual URL format
          this.setState({
            theURL  //Update component state theURL each time the theURL is return an array value
          })
        })
      },500) // set Interval to every half second
    }
  }

  updateTheID = (theID)=>{
    this.setState({
      theID 
    })
    // method pass through the child component to retrieve each match.params.id value and update to the component state theID
  }


  shouldComponentUpdate = (nextP,nextS)=>{
    if(nextS.theID === this.state.theID && nextS.theURL[1] !== this.state.theURL[1]){
      return true
    }
    return false

    //if the next state theID value is equal the the current state theID and the next state theURL value is not equal to current states theURL allow the state to update,else return false
  }

  render(){
    return(
      <div className="container">
          <BrowserRouter>
            <Form />
            <Nav />
            <Switch>
              <Route path="/buttonSearch/:id" render={()=> <ButtonSearch updateStateId={this.updateTheID} photoURL={this.state.theURL} />} />
                {/* set up the buttonSerach Route that render it component each time when the button is click ,pass updateTheID method to buttonSerach component to retrieve the back to App component,and pass the photoURL to it. */}
              <Route path="/search/:id" render={()=> <FormSearch updateStateId={this.updateTheID} photoURL={this.state.theURL} />} />
              {/* set up the search Route and do that same thing as the buttonSearch route */}
              <Route path="/:id" component={PageNotFount} />
              {/* set up the page not found Route,it display each time when user navigated to an un-existing Route */}
            </Switch>
        </BrowserRouter>
      </div>
    )
  }
}
export default App;
