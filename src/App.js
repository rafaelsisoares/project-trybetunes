import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';
import Header from './components/Header';
import { createUser } from './services/userAPI';

const MIN_USERNAME_CHAR = 3;
const MIN_SEARCH_CHAR = 2;

class App extends React.Component {
  state = {
    userName: '',
    loginButtonDisabled: true,
    isLoading: false,
    loginValid: false,
    searchArtist: '',
    searchButtonDisabled: true,
  };

  checkSearch = () => {
    const { searchArtist } = this.state;
    if (searchArtist.length >= MIN_SEARCH_CHAR) {
      this.setState({ searchButtonDisabled: false });
    }
  };

  handleChanges = ({ target }) => {
    const { name, type } = target;
    const value = type === 'checkbox' ? target.checked : target.value;
    this.setState({ [name]: value }, () => {
      const { userName } = this.state;
      if (userName.length >= MIN_USERNAME_CHAR) {
        this.setState({
          loginButtonDisabled: false,
        });
      }
      this.checkSearch();
    });
  };

  handleClick = async () => {
    const { userName } = this.state;
    this.setState({ isLoading: true });
    await createUser({ name: userName }).then(() => this.setState({
      loginValid: true,
      isLoading: false,
    }));
  };

  render() {
    const {
      loginButtonDisabled,
      userName,
      loginValid,
      isLoading,
      searchButtonDisabled,
    } = this.state;
    return (
      <section>
        <h1>TrybeTunes</h1>
        <Switch>
          <Route exact path="/">
            <div data-testid="page-login">
              <Login
                handleChange={ this.handleChanges }
                loginButtonDisabled={ loginButtonDisabled }
                userName={ userName }
                loginValid={ loginValid }
                handleClick={ this.handleClick }
                isLoading={ isLoading }
              />
            </div>
          </Route>
          <Route exact path="/search">
            <div data-testid="page-search">
              <Header />
              <Search
                handleChange={ this.handleChanges }
                buttonDisabled={ searchButtonDisabled }
              />
            </div>
          </Route>
          <Route
            exact
            path="/album/:id"
            render={ (props) => (
              <div data-testid="page-album">
                <Header />
                <Album { ...props } />
              </div>
            ) }
          />
          <Route path="/favorites">
            <div data-testid="page-favorites">
              <Header />
              <Favorites />
            </div>
          </Route>
          <Route exact path="/profile">
            <div data-testid="page-profile">
              <Header />
              <Profile />
            </div>
          </Route>
          <Route exact path="/profile/edit">
            <div data-testid="page-profile-edit">
              <Header />
              <ProfileEdit />
            </div>
          </Route>
          <Route path="*">
            <div data-testid="page-not-found">
              <NotFound />
            </div>
          </Route>
        </Switch>
      </section>
    );
  }
}

export default App;
