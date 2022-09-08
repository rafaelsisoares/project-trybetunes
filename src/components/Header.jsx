import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';
import '../styles/Header.css';

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
        {loading ? (
          <Loading />
        ) : (
          <div className="div-header">
            <h1>TrybeTunes</h1>
            <p data-testid="header-user-name">
              Bem Vindo(a)
              {' '}
              {userName}
            </p>
          </div>
        )}
        <nav className="links">
          <Link data-testid="link-to-search" to="/search">
            Pesquisar
          </Link>
          <Link
            data-testid="link-to-favorites"
            to="/favorites"
          >
            Favoritas
          </Link>
          <Link
            data-testid="link-to-profile"
            to="/profile"
          >
            Perfil
          </Link>
        </nav>
      </header>
    );
  }
}

export default Header;
