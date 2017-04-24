// import preact
import { h, render, Component } from 'preact';

export default class WeatherMap extends Component {
    render() {
      return(
        <div>
          <h2>Weather Map</h2>
          <img src={"http://api.wunderground.com/api/4a23b7dc897c8578/animatedsatellite/q/UK/" + this.props.city + ".gif?basemap=1&timelabel=1&timelabel.y=10&num=8&delay=25&width=394&height=277&smooth=1"} />
        </div>
        )
    }
}
