import React, { Component } from 'react'
import DeletePerson from './mutations/DeletePerson';

export default class Card extends Component {
  render() {
    console.log(this.props ,"props");
    return (
      <div className='card'>
        <h4>Character:</h4>
        <p>{this.props.name}</p>
        <p>{this.props.height}</p>
        <br/>
        <h4>Homeworld</h4>
        <p>{this.props.homeWorld.name}</p>
        <br/>
        <h4>Number of Films</h4>
        <p>{this.props.films.length}</p>
        <br />
      <DeletePerson>
        { (loading, error, deletePerson) =>{
        return(
        <div>
          <button
            onClick={ () => deletePerson({variables: {id: this.props.id }})}
          >
          Delete
          </button>
          { loading && <p> Loading...</p> }
          { error && <p>Error...</p> }
          </div>
        )
        }}
        </DeletePerson>
      </div>
    )
  }
}