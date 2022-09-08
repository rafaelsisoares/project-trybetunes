import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Loading from './Loading';
import '../styles/Login.css';

class Login extends React.Component {
  render() {
    const {
      loginButtonDisabled,
      handleChange,
      isLoading,
      loginValid,
      handleClick,
    } = this.props;
    return (
      <section className="login-container">
        <form>
          <h1>Bem Vindo ao TrybeTunes!</h1>
          <input
            type="text"
            name="userName"
            className="user-name"
            data-testid="login-name-input"
            placeholder="Nome:"
            onChange={ handleChange }
          />
          <button
            type="button"
            className="btn-login"
            data-testid="login-submit-button"
            disabled={ loginButtonDisabled }
            onClick={ handleClick }
          >
            Entrar
          </button>
        </form>
        {isLoading && <Loading />}
        {loginValid && <Redirect to="/search" />}
      </section>
    );
  }
}

Login.propTypes = {
  loginButtonDisabled: PropTypes.bool,
  handleChange: PropTypes.func,
  loginValid: PropTypes.bool,
  handleClick: PropTypes.func,
}.isRequired;

export default Login;
