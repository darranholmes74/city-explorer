import React from 'react';

class Movie extends React.Component{
    render(){
        console.log(this.props.movies)
        return (
            <div>
                
            {this.props.movies.map((items, idx) => (
          <div key={idx}>
          <ul>
            <li>{items.title}</li>
            <li>{items.overview}</li>
          </ul>
          </div>
            ))}


    </div>
        )
    }
}

export default Movie;