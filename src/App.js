import React, { Component } from 'react';
import logo from './logo.svg';
import './form.css';
import FormErrors from './FormErrors';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      formErrors: {email: '', password: ''},
      emailValid: false,
      passwordValid: false,
      formValid: false
    }
    this.handleUserInput = this.handleUserInput.bind(this);
    this.validateField = this.validateField.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }
  handleUserInput(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({[name]: value}, () => {
      this.validateField(name, value);
    });
  }
  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;

    switch(fieldName) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : ' is invalid';
        break;
      case 'password':
        passwordValid = value.length >= 6;
        fieldValidationErrors.password = passwordValid ? '' : ' is too short';
        break;
      default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,
      emailValid: emailValid,
      passwordValid: passwordValid
    }, this.validateForm);
  }
  validateForm() {
    this.setState({formValid: this.state.emailValid && this.state.passwordValid});
  }
  errorClass(error) {
    return(error.length === 0 ? '' : 'has-error');
  }
  render() {
    return (
      <div className="App">
        <form className="form">
          <div className={`form-group ${this.errorClass(this.state.formErrors.email)}`}>
            <label htmlFor="email">Email address</label>
            <input value={this.state.email} type="email" name="email" onChange={(event) => this.handleUserInput(event)} />
          </div>
          <div className={`form-group ${this.errorClass(this.state.formErrors.password)}`}>
            <label htmlFor="password">Password</label>
            <input value={this.state.password} type="password" name="password" onChange={(event) => this.handleUserInput(event)} />
          </div>
          <button type="submit" disabled={!this.state.formValid}>Sign Up</button>
        </form>
        <div>
          <FormErrors formErrors={this.state.formErrors} />
        </div>
      </div>
    );
  }
}

export default App;
