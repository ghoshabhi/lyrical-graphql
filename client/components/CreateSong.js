import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Link, hashHistory } from 'react-router';

class CreateSong extends Component{
  constructor(props) {
    super(props);
    this.state = {
      title: '',
    };
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.mutate({
      variables: {
        title: this.state.title,
      }
    }).then(() => hashHistory.push('/'));
  }

  render(){
    return(
      <div>
        <form onSubmit={this.onSubmit.bind(this)}>
          <Link to='/'>Back</Link>
          <h3>Create a New Song</h3>
          <label>Song Title:</label>
          <input 
            onChange={e => this.setState({ title: e.target.value })}
            value={this.state.title}
          />
        </form>
      </div>
    );
  }
};

const mutation = gql`
  mutation createNewSong($title: String) {
    addSong(title: $title) {
      title
    }
  }
`;

export default graphql(mutation)(CreateSong);
