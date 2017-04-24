// import preact
import { h, render, Component } from 'preact';
import style from './style';

export default class DetailsBox extends Component {
    render() {
      return(
        <div>
          <h2>Details</h2>
          <div style={style.detailsCont}>
           <div class={style.clearfix}>
            <span class={style.floatLeft}>Feels Like</span> 
            <span class={style.floatRight}>{this.props.feelslike}°c</span>
           </div>
           <div style="clear:both;"></div>
           <div class={style.clearfix}>
            <span class={style.floatLeft}>Visibility</span> 
            <span class={style.floatRight}>{this.props.visibility} miles</span>
           </div>
           <div style="clear:both;"></div>
           <div class={style.clearfix}>
            <span class={style.floatLeft}>UV Index</span> 
            <span class={style.floatRight}>{this.props.UV}</span>
           </div>
           <div style="clear:both;"></div>
           <p>{this.props.description}</p>
          </div>
        </div>
        )
    }
}
