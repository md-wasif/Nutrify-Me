import React, { Component } from 'react';
import { connect } from 'react-redux';


export default (OriginalComponent) => {
    class MixedComponent extends Component {
        checkAuth() {
            console.log(this.props.isAuth);
            if(!this.props.isAuth && !this.props.jwtToken){
                window.location.href = '/';
            }
        }
        componentDidMount() {
            //Whether the user is authenticated.
            this.checkAuth();
        }
        componentDidUpdate() {
              this.checkAuth();
        }
        render(){
            return <OriginalComponent {...this.props}/>
        }
    }
    
    function mapStateToProps(state){
        return {
         isAuth: state.auth.isAuthenticated,
         jwtToken: state.auth.token
        }
    }
   return connect(mapStateToProps)(MixedComponent);
};

