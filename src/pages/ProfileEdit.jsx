import React from 'react';
import { Redirect } from 'react-router-dom';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends React.Component {
  state = {
    name: '',
    email: '',
    description: '',
    image: '',
    buttonDisabled: true,
    isValid: false,
  };

  componentDidMount() {
    this.fetchUser();
  }

  fetchUser = async () => {
    const { name, email, description, image } = await getUser();
    this.setState({
      name,
      email,
      description,
      image,
    });
  };

  handleChange = ({ target }) => {
    const { id, value } = target;
    this.setState({ [id]: value }, () => {
      const { name, email, description, image } = this.state;
      if (name && email && description && image) {
        this.setState({ buttonDisabled: false });
      }
    });
  };

  handleClick = async () => {
    const { name, email, description, image } = this.state;
    await updateUser({ name, email, description, image });
    this.setState({ isValid: true });
  };

  render() {
    const { name, email, description, image, buttonDisabled, isValid } = this.state;
    return (
      <section>
        <form>
          <label htmlFor="name">
            Nome:
            <input
              type="text"
              id="name"
              placeholder="Você pode usar seu nome de registro ou nome social"
              value={ name }
              onChange={ this.handleChange }
              data-testid="edit-input-name"
              required
            />
          </label>
          <label htmlFor="email">
            E-mail:
            <input
              type="email"
              id="email"
              placeholder="Insira um e-mail válido"
              value={ email }
              onChange={ this.handleChange }
              data-testid="edit-input-email"
              required
            />
          </label>
          <label htmlFor="image">
            Imagem:
            <input
              type="text"
              id="image"
              placeholder="Vincule aqui sua imagem de qualquer rede social"
              value={ image }
              onChange={ this.handleChange }
              data-testid="edit-input-image"
              required
            />
          </label>
          <label htmlFor="description">
            Descrição:
            <textarea
              id="description"
              value={ description }
              placeholder="Conte-nos um pouco sobre você"
              onChange={ this.handleChange }
              data-testid="edit-input-description"
              required
            />
          </label>
          <button
            type="button"
            disabled={ buttonDisabled }
            data-testid="edit-button-save"
            onClick={ this.handleClick }
          >
            Salvar
          </button>
        </form>
        {
          isValid && (<Redirect to="/profile" />)
        }
      </section>
    );
  }
}

export default ProfileEdit;
