import React from 'react';
import PropTypes from 'prop-types';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import Loading from './Loading';

class Album extends React.Component {
  state = {
    musics: [],
    isLoading: true,
  };

  componentDidMount() {
    this.fetchMusic();
  }

  fetchMusic = async () => {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    const data = await getMusics(id);
    this.setState({
      isLoading: false,
      musics: data,
    });
  };

  render() {
    const { musics, isLoading } = this.state;
    return (
      <section>
        {isLoading ? (
          <Loading />
        ) : (
          <section>
            <div>
              <img
                src={ musics[0].artworkUrl100 }
                alt={ `Capa do álbum ${musics[0].collectionName}` }
              />
              <h3 data-testid="album-name">{musics[0].collectionName}</h3>
              <p data-testid="artist-name">{musics[0].artistName}</p>
            </div>
            {musics.map(({ trackName, previewUrl, trackId }, i) => (i > 0 && (
              <div key={ trackId }>
                <MusicCard trackName={ trackName } previewUrl={ previewUrl } />
              </div>
            )))}
          </section>
        )}
      </section>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;

export default Album;
