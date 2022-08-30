import React from 'react';
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
      </header>
    );
  }
}

export default Header;
