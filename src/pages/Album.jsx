import React from 'react';
import PropTypes from 'prop-types';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';
import '../styles/Album.css';

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

  favorite = async ({ target }) => {
    const { id, checked } = target;
    const { musics } = this.state;
    this.setState({ isLoading: true });
    if (checked) {
      const favorite = musics.find(
        ({ trackId }, i) => i > 0 && Number(trackId) === Number(id),
      );
      await addSong(favorite).then(() => this.setState({ isLoading: false }));
    } else {
      const remove = musics.find(
        ({ trackId }, i) => i > 0 && Number(trackId) === Number(id),
      );
      await removeSong(remove).then(() => this.setState({ isLoading: false }));
    }
  };

  render() {
    const { musics, isLoading } = this.state;
    return (
      <section>
        {isLoading ? (
          <Loading />
        ) : (
          <section className="album-musics">
            <div className="album-cover">
              <img
                src={ musics[0].artworkUrl100 }
                alt={ `Capa do álbum ${musics[0].collectionName}` }
              />
              <h3 data-testid="album-name">{musics[0].collectionName}</h3>
              <p data-testid="artist-name">{musics[0].artistName}</p>
            </div>
            <div className="music-list">
              {musics.map(
                ({ trackName, previewUrl, trackId }, i) => i > 0 && (
                  <div key={ trackId } className="musics">
                    <MusicCard
                      trackName={ trackName }
                      previewUrl={ previewUrl }
                      trackId={ trackId }
                      favorite={ this.favorite }
                    />
                  </div>
                ),
              )}
            </div>
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
