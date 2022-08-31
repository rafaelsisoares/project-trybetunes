import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  state = {
    loading: true,
    userName: '',
  };

  componentDidMount() {
    this.loadHeader();
  }

  loadHeader = async () => {
    const data = await getUser();
    const { name } = data;
    this.setState({ userName: name, loading: false });
  };

  render() {
    const { userName, loading } = this.state;
    return (
      <header data-testid="header-component">
        {loading ? <Loading /> : (
          <p data-testid="header-user-name">
            Bem Vindo(a)
            {' '}
            {userName}
          </p>
        )}
        <nav>
          <Link data-testid="link-to-search" to="/search">Pesquisar</Link>
          <Link data-testid="link-to-favorites" to="/favorites">Músicas Favoritas</Link>
          <Link data-testid="link-to-profile" to="/profile">Meu Perfil</Link>
        </nav>
      </header>
    );
  }
}

export default Header;
