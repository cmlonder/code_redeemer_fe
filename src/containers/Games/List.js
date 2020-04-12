import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Layout from '../../components/Games/List';

class GamesListContainer extends Component {
  constructor(props) {
    super();


    this.state = {
      error: null, loading: false,
    };
  }

  componentDidMount = () => this.fetchData();

  /**
   * Fetch Data
   */
  fetchData = async ({ forceSync = false } = {}) => {
    const { fetchData } = this.props;

    this.setState({ loading: true, error: null });

    try {
      await fetchData({ forceSync });
      this.setState({ loading: false, error: null });
    } catch (err) {
      this.setState({ loading: false, error: err.message });
    }
  };

  /**
   * Render
   */
  render = () => {
    const {
      listFlat,
    } = this.props;
    const { loading, error } = this.state;

    return (
      <Layout
        error={error}
        loading={loading}
        listFlat={listFlat}
        reFetch={this.fetchData}
      />
    );
  };
}

GamesListContainer.propTypes = {
  listFlat: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  fetchData: PropTypes.func.isRequired,
};

GamesListContainer.defaultProps = {
};

const mapStateToProps = (state) => ({
  listFlat: state.games.listFlat || [],
});

const mapDispatchToProps = (dispatch) => ({
  fetchData: dispatch.games.fetchList,
});

export default connect(mapStateToProps, mapDispatchToProps)(GamesListContainer);
