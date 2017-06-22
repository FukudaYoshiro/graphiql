/**
 *  Copyright (c) Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the license found in the
 *  LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';

export default class HistoryQuery extends React.Component {
  static propTypes = {
    query: PropTypes.string,
    variables: PropTypes.string,
    operationName: PropTypes.string,
    favorite: PropTypes.bool,
    favoriteSize: PropTypes.number,
    handleToggleFavorite: PropTypes.func,
    onSelect: PropTypes.func,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const starStyles = {
      float: 'right',
    };
    const displayName =
      this.props.operationName ||
      this.props.query
        .split('\n')
        .filter(line => line.indexOf('#') !== 0)
        .join('');
    const starIcon = this.props.favorite ? '\u2605' : '\u2606';
    return (
      <div>
        <p onClick={this.handleClick.bind(this)}>
          <span>
            {displayName}
          </span>
          <span onClick={this.handleStarClick.bind(this)} style={starStyles}>
            {starIcon}
          </span>
        </p>
      </div>
    );
  }

  handleClick() {
    this.props.onSelect(
      this.props.query,
      this.props.variables,
      this.props.operationName,
    );
  }

  handleStarClick(e) {
    e.stopPropagation();
    this.props.handleToggleFavorite(
      this.props.query,
      this.props.variables,
      this.props.operationName,
    );
  }
}
