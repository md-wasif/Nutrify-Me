import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';
import  FacebookLogin  from 'react-facebook-login';
import  GoogleLogin from 'react-google-login';


import CustomInput from './CustomInput';
import * as actions from '../actions';



class SignUp extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.responseGoogle = this.responseGoogle.bind(this);
        this.responseFacebook = this.responseFacebook.bind(this);
    }
    async onSubmit(formData) {
        //We need to call actionCreators
        await this.props.signUp(formData);
        if(!this.props.errorMessage){
            console.log(this.props.errorMessage)
             window.location.href = '/dashboard';
        }
    }


     async responseFacebook(res){
         console.log('Response Facebook', res);
        await this.props.oauthFacebook(res.accessToken);
        if(!this.props.errorMessage){
            window.location.href = '/dashboard';
        }
    }

      async responseGoogle(res){
        console.log('Response Google', res);
        await this.props.oauthGoogle(res.accessToken);
        if(!this.props.errorMessage){
            window.location.href = '/dashboard';
        }
    }
    

    render() {
        const { handleSubmit } = this.props;
        return (
            <div className="row">
                <div className="col">
                    <form onSubmit={handleSubmit(this.onSubmit)}>
                        <fieldset>
                            <Field
                                name="email"
                                type="text"
                                id="email"
                                lable="Enter you email"
                                placeholder="Enter you're email"
                                component={CustomInput} />
                        </fieldset>
                        <fieldset>
                            <Field
                                name="password"
                                type="password"
                                id="password"
                                label="Enter your password"
                                placeholder="Enter you're password"
                                component={CustomInput} />
                        </fieldset>

                        {this.props.errorMessage ?
                            <div className="alert alert-danger">
                                {this.props.errorMessage}
                            </div> : null}

                        <button type="submit" className="btn btn-primary">Sign Up</button>
                    </form>
                </div>
                <div className="col">
                    <div className="text-center">
                        <div className="alert alert-primary">
                            or Sign Up using third party authentication
                        </div>
                        <FacebookLogin 
                        appId="3359726484255537"
                        autoLoad={false}
                        textButton="Facebook"
                        fields="name,email,picture"
                        callback={this.responseFacebook}
                        cssClass="btn btn-outline-primary"/>
                        <GoogleLogin 
                        clientId="154252860338-ldenceepq7q3fjp4n91qdt55il5v2i4t.apps.googleusercontent.com"
                        buttonText="Google"
                        onSuccess={this.responseGoogle}
                        onFailure={this.responseGoogle}
                        className="btn btn-outline-danger"
                        />
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        errorMessage: state.auth.errorMessage
    }
}

export default compose(
    connect(mapStateToProps, actions),
    reduxForm({ form: 'signup' })
)(SignUp);