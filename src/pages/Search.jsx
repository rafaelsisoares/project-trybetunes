import React from 'react';
import PropTypes from 'prop-types';

class Search extends React.Component {
  render() {
    const { handleChange, buttonDisabled } = this.props;
    return (
      <section>
        <form>
          <input
            type="text"
            name="searchArtist"
            placeholder="Nome do artista"
            data-testid="search-artist-input"
            onChange={ handleChange }
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ buttonDisabled }
          >
            Pesquisar
          </button>
        </form>
      </section>
    );
  }
}

Search.propTypes = {
  handleChange: PropTypes.func,
  buttonDisabled: PropTypes.bool,
}.isRequired;

export default Search;
