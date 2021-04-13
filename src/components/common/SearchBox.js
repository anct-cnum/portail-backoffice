import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchActions } from '../../actions';

function SearchBox() {

  const [searchInputValue, setSearchInputValue] = useState('');
  const { search } = useSelector(state => state.search);

  const dispatch = useDispatch();

  function handleChange(e) {
    setSearchInputValue(e.target.value);
  }

  function handleKeyDown(e) {
    if (e.code === 'Enter') {
      setSearchInputValue(e.target.value);
      dispatch(searchActions.updateSearch(searchInputValue));
    }
  }

  function applySearch() {
    dispatch(searchActions.updateSearch(searchInputValue));
  }

  useEffect(() => {
    setSearchInputValue(search);
  }, [search]);

  return (
    <div className="rf-search-bar rf-mb-2w" role="search">
      <label className="rf-label" htmlFor="rf-search-input">Recherche</label>
      <input
        className="rf-input"
        placeholder="Rechercher"
        type="search"
        id="rf-search-input"
        value={searchInputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown} />
      <button className="rf-btn" title="Rechercher" onClick={applySearch}>
        Rechercher
      </button>
    </div>
  );
}

export default SearchBox;

