import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import searchStore from './search-store';

const handleCustomerSelection =
  (dispatch, item) => dispatch({ type: 'CUSTOMER_GET', payload: item.Name });

const App = ({ dispatch, searchText, showResultsDisplay, searchResults }) => (
  <div>
    <h1>Hello from react!</h1>
    <button onClick={() => dispatch({ type: 'PING' })}>Dispatch Ping</button>
    <div>Check the console to see if ping was mapped to pong by cycle on Dispatch Ping</div>
    <div>
      <label htmlFor="searchTextInput">
        Search Customer:
        <input
          type="text"
          value={searchText}
          id="searchTextInput"
          onChange={e => dispatch({ type: 'UPDATE_SEARCH_TEXT', payload: e.target.value })}
        />
        <button onClick={() => dispatch({ type: 'CUSTOMER_SEARCH', payload: searchText })}>Search</button>
      </label>
    </div>
    <div>
      { showResultsDisplay &&
        searchResults.map(item =>
          (<div>
            <input
              type="radio"
              onChange={() => handleCustomerSelection(dispatch, item)}
              name="selectResult"
            />
            { item.Name }
          </div>)) }
    </div>
  </div>
);

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  searchText: PropTypes.string.isRequired,
  showResultsDisplay: PropTypes.bool.isRequired,
  searchResults: PropTypes.arrayOf(PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Id: PropTypes.number.isRequired,
    Code: PropTypes.string.isRequired,
    Address: PropTypes.string.isRequired,
  })).isRequired,
};

const mapStateToProps = state => ({
  showResultsDisplay: searchStore.selectors.showResultsDisplay(state),
  searchText: searchStore.selectors.searchText(state),
  searchResults: searchStore.selectors.searchResults(state),
});

export default connect(mapStateToProps)(App);
