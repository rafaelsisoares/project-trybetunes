import React from 'react';
import PropTypes from 'prop-types';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

class MusicCard extends React.Component {
  state = {
    favoriteSong: false,
    isLoading: false,
  };

  componentDidMount() {
    this.checkFavorite();
  }

  checkFavorite = async () => {
    const { trackId } = this.props;
    this.setState({ isLoading: true });
    const favoriteSong = await getFavoriteSongs();
    const isFavorite = favoriteSong.some((music) => music.trackId === trackId);
    this.setState({ favoriteSong: isFavorite, isLoading: false });
  };

  render() {
    const { trackName, previewUrl, trackId, favorite } = this.props;
    const { favoriteSong, isLoading } = this.state;
    return (
      <div>
        {isLoading ? (
          <Loading />
        ) : (
          <div>
            <p>{trackName}</p>
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              {' '}
              <code>audio</code>
              .
            </audio>
            <label htmlFor="favorite">
              <input
                type="checkbox"
                name="favorite"
                id={ trackId }
                checked={ favoriteSong }
                data-testid={ `checkbox-music-${trackId}` }
                onChange={ favorite }
              />
              Favorita
            </label>
          </div>
        )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
}.isRequired;

export default MusicCard;
