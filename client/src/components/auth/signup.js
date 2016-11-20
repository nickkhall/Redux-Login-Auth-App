import React, { Component } from 'react';
import * as actions from '../../actions';
import { reduxForm } from 'redux-form';

class Signup extends Component {
  handleFormSubmit(formProps) {
    // Call action creator to sign up the user
    this.props.signupUser(formProps);
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert-danger">
          { this.props.errorMessage }
        </div>
      )
    }
  }

  render() {
    const { handleSubmit, fields: { email, password, passwordConfirm }} = this.props;

    return (
      <form onSubmit={ handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset className="form-group">
          <label>Email:</label>
          <input className="form-control" { ...email } />
          { email.touched && email.error && <div className="alert-danger">{ email.error }</div> }
        </fieldset>
        <fieldset className="form-group">
          <label>Password:</label>
          <input className="form-control" type="password" { ...password } />
          { password.touched && password.error && <div className="alert-danger">{ password.error }</div> }
        </fieldset>
        <fieldset className="form-group">
          <label>Password Confirmation:</label>
          <input className="form-control" type="password" { ...passwordConfirm } />
          { passwordConfirm.touched && passwordConfirm.error && <div className="alert-danger">{ passwordConfirm.error }</div> }
        </fieldset>
        { this.renderAlert() }
        <button action="submit" className="btn btn-primary">Sign up!</button>
      </form>
    );
  }
}

function validate(formProps) {
  const errors = {};

  if (!formProps.email) errors.email = 'Please enter an email';
  if (!formProps.password) errors.password = 'Please enter an password';
  if (!formProps.passwordConfirm) errors.passwordConfirm = 'Please enter an password confirmation';
  if (formProps.password != formProps.passwordConfirm) {
    errors.passwordConfirm = 'Passwords must match';
  }

  return errors;
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

export default reduxForm({
  form: 'signup',
  fields: [ 'email', 'password', 'passwordConfirm' ],
  validate
}, mapStateToProps, actions)(Signup);
