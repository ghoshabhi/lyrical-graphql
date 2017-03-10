import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import query from '../queries/fetchSongs';

class SongList extends Component {
  onSongDelete(id) {
    this.props.mutate({
      vairables: {
        id,
      }
    }).then(() => this.props.data.refetch());
  }

  renderSongs() {
    const {
      songs,
      loading,
    } = this.props.data;
    if (loading) {
      return <div>Loading...</div>;
    }
    console.log(songs);
    return songs.map(({ title, id }) => {
      console.log(id);
      return (
        <li className="collection-item" key={id}>
          {title}
          <i
            onClick={() => this.onSongDelete(id)}
            className="material-icons right"
          >
            delete
          </i>
        </li>
      )
    });
  }
  render() {
    return (
      <div>
        <ul className="collection">
        {this.renderSongs()}
        </ul>
        <Link
          to="/songs/new"
          className="btn-floating btn-large red right"
        >
          <i className="material-icons">add</i>
        </Link>
      </div>
    )
  }
};

const mutation = gql`
  mutation DeleteSong($id: ID){
    deleteSong(id: $id){
      id
    }
  }
`;

export default graphql(mutation)(
  graphql(query)(SongList)
);
