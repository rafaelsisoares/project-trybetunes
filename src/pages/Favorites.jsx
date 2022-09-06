import React from 'react';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class Favorites extends React.Component {
  state = {
    isLoading: true,
    favoriteSongs: [],
  };

  componentDidMount() {
    this.getFavorites();
  }

  getFavorites = async () => {
    const songs = await getFavoriteSongs();
    this.setState({
      favoriteSongs: songs,
      isLoading: false,
    });
  };

  render() {
    const { isLoading, favoriteSongs } = this.state;
    return (
      <section>
        {isLoading ? (
          <Loading />
        ) : (
          favoriteSongs.map(({ trackId, trackName, previewUrl }) => (
            <div key={ trackId }>
              <MusicCard
                trackId={ trackId }
                trackName={ trackName }
                previewUrl={ previewUrl }
              />
            </div>
          ))
        )}
      </section>
    );
  }
}

export default Favorites;
