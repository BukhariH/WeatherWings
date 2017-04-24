// import preact
import { h, render, Component } from 'preact';
import windBoxStyle from './windBox';

export default class WindBox extends Component {
    render() {
      return(

      <div>
          <h2>Wind</h2>
          <div class={ windBoxStyle.windmillCont }>
              <img class={ windBoxStyle.pole } src="https://i.imgur.com/XTcQktD.png" />
              <img class={ this.props.spinnerFast ? windBoxStyle.spinFast : windBoxStyle.spinSlow } id="spinner" src="https://i.imgur.com/HEP6mDn.png" />
              <img class={ windBoxStyle.pole2 } src="https://i.imgur.com/XTcQktD.png" />
              <img class={ this.props.spinnerFast ? windBoxStyle.spinFast2 : windBoxStyle.spinSlow2 } id="spinner" src="https://i.imgur.com/HEP6mDn.png" />
              <img src={require('../upArrow.png')} class={windBoxStyle.upArrow} style={this.props.wind_degrees}  />
              <br />
              <br />
              <p>{this.props.windString}</p>
          </div>
      </div>

        )
    }
}
