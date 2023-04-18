
import { withRouter } from 'react-router-dom';

import React, { Component } from 'react';

function Home(props) {


    return (
        <div>
            <h1>Patients Monitoring Application </h1>
            <p>Login/Signup to check patients info</p>
        </div>
    );

}

export default withRouter(Home);