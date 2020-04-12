import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Layout from '../../components/Games/Single';

class GamesSingleContainer extends Component {
  constructor() {
    super();
    this.state = { loading: false, error: null, game: {} };
  }

  componentDidMount = () => this.fetchData();

  /**
   * Fetch Data
   */
  fetchData = async () => {
    const { fetchData, id } = this.props;

    this.setState({ loading: true, error: null });

    try {
      const game = await fetchData(id);
      this.setState({ loading: false, error: null, game });
    } catch (err) {
      this.setState({ loading: false, error: err.message, game: {} });
    }
  };

  /**
   * Render
   */
  render = () => {
    const { loading, error, game } = this.state;

    return <Layout loading={loading} error={error} game={game} reFetch={this.fetchData} />;
  };
}

GamesSingleContainer.propTypes = {
  fetchData: PropTypes.func.isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

GamesSingleContainer.defaultProps = {
  id: null,
};

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
  fetchData: dispatch.games.fetchSingle,
});

export default connect(mapStateToProps, mapDispatchToProps)(GamesSingleContainer);
