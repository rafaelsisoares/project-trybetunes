import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Loading from './Loading';

class Search extends React.Component {
  render() {
    const {
      handleChange,
      buttonDisabled,
      searchArtist,
      isLoading,
      albums,
      handleClick,
      inputValue,
    } = this.props;
    return (
      <section>
        <form>
          <input
            type="text"
            name="inputValue"
            placeholder="Nome do artista ou banda"
            data-testid="search-artist-input"
            onChange={ handleChange }
            value={ inputValue }
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ buttonDisabled }
            onClick={ handleClick }
          >
            Pesquisar
          </button>
        </form>
        {isLoading && <Loading />}
        {albums.length === 0 ? (
          <p>Nenhum álbum foi encontrado</p>
        ) : (
          <section>
            <h3>
              Resultado de álbuns de:
              {' '}
              {searchArtist}
            </h3>
            {albums.map(
              ({
                artistName,
                collectionName,
                artworkUrl100,
                collectionId,
              }) => (
                <div key={ collectionId }>
                  <img
                    src={ artworkUrl100 }
                    alt={ `Capa do álbum ${collectionName}` }
                  />
                  <strong>{collectionName}</strong>
                  <p>
                    By:
                    {' '}
                    {artistName}
                  </p>
                  <Link
                    to={ `/album/${collectionId}` }
                    data-testid={ `link-to-album-${collectionId}` }
                  >
                    Mais detalhes
                  </Link>
                </div>
              ),
            )}
          </section>
        )}
      </section>
    );
  }
}

Search.propTypes = {
  handleChange: PropTypes.func,
  buttonDisabled: PropTypes.bool,
  searchArtist: PropTypes.string,
}.isRequired;

export default Search;
