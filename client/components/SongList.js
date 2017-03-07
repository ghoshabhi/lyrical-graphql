import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class SongList extends Component {
  renderSongs() {
    const {
      songs,
      loading,
    } = this.props.data;
    if (loading) {
      return <div>Loading...</div>;
    }
    return songs.map((song,key) => {
      return (
        <li key={key}>
          {song.title}
        </li>
      )
    });
  }
  render() {
    return (
      <div>
        {this.renderSongs()}
      </div>
    )
  }
};

const query = gql`
  {
    songs {
      title
    }
  }
`;

export default graphql(query)(SongList);
 ;
