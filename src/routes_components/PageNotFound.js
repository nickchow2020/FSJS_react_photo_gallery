import React from "react"
import {Link} from "react-router-dom";
const PageNotFount = ()=>{
    return(
        <div className="errorWrap">
            <h1 className="errorState">404</h1>
            <h2 className="errorMessage">Page Not Found</h2>
            <p className="errorDetail">I'm Sorry,But I can't find the page you were looking for,to go back,click any of the buttons above,or click on the go home button below</p>
            <Link to="/">Go Home Page</Link>
        </div>
    )
}

export default PageNotFount
