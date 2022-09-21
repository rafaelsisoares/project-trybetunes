import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import '../styles/Profile.css';

class Profile extends React.Component {
  state = {
    isLoading: true,
    userName: '',
    userEmail: '',
    userDescription: '',
    userImage: '',
  };

  componentDidMount() {
    this.renderUserInfo();
  }

  renderUserInfo = async () => {
    const { name, email, description, image } = await getUser();
    this.setState({
      userName: name,
      userEmail: email,
      userDescription: description,
      userImage: image,
      isLoading: false,
    });
  };

  render() {
    const { isLoading, userName, userDescription, userEmail, userImage } = this.state;
    return (
      <section>
        {isLoading ? (
          <Loading />
        ) : (
          <div className="profile-container">
            <img src={ userImage } alt={ userName } data-testid="profile-image" />
            <p>
              Nome:
              {' '}
              {userName}
            </p>
            <p>
              E-mail:
              {' '}
              {userEmail}
            </p>
            <p>
              Descrição:
              {' '}
              {userDescription}
            </p>
            <Link to="/profile/edit" className="link-edit">
              Editar perfil
            </Link>
          </div>
        )}
      </section>
    );
  }
}

export default Profile;
