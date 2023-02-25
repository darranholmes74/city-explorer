import React from 'react';



class Weather extends React.Component {
    render() {
        console.log(this.props.weather)
        return (
            <div>
                
                    {this.props.weather.map((items, idx) => (
                  <div key={idx}>
                    <p>{items.data}</p>
                    <p>{items.description}</p>
                  </div>
                    ))}


            </div>

        )
    }
}


export default Weather;