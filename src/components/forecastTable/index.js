// import preact
import { h, render, Component } from 'preact';
import style from './style';
	
export default class ForecastTable extends Component {
	render(){	
		return (
			<div class={style.table}>
				<h2>10 Day Forecast</h2>
			    <table border="0" align="center">
			        <tr>
			            <th>{this.props.sDay0}</th>
			            <td><img src={this.props.sI0} width="20" height="20" />
			            </td>
			            <td>{this.props.sWA0}mph {this.props.sWA1 >= '15' ? <img src={require( '../arrowUp2.png')} /> : <img src={require( '../arrowNorm.png')} /> }</td>
			            <td>{this.props.sIc0}</td>
			            <td>{this.props.sTL0}°c {this.props.sTL0
			                <='4' ? <img src={require( '../thermometerC.png')} /> : <img src={require( '../thermometerSmall.png')} valign="bottom" />}</td>
			            <td>{this.props.sTM0}°c {this.props.sTM0 > '11' ? <img src={require( '../thermometerH.png')} /> : <img src={require( '../thermometerSmall.png')} valign="bottom" />}</td>
			        </tr>
			        <tr>
			            <th>{this.props.sDay1}</th>
			            <td><img src={this.props.sI1} width="20" height="20" />
			            </td>
			            <td>{this.props.sWA1}mph {this.props.sWA1 >= '15' ? <img src={require( '../arrowUp2.png')} /> : <img src={require( '../arrowNorm.png')} /> }</td>
			            <td>{this.props.sIc1}</td>
			            <td>{this.props.sTL1}°c {this.props.sTL1
			                <='4' ? <img src={require( '../thermometerC.png')} /> : <img src={require( '../thermometerSmall.png')} valign="bottom" />}</td>
			            <td>{this.props.sTM1}°c {this.props.sTM1 > '11' ? <img src={require( '../thermometerH.png')} /> : <img src={require( '../thermometerSmall.png')} valign="bottom" />}</td>
			        </tr>
			        <tr>
			            <th>{this.props.sDay2}</th>
			            <td><img src={this.props.sI2} width="20" height="20" />
			            </td>
			            <td>{this.props.sWA2}mph {this.props.sWA2 >= '15' ? <img src={require( '../arrowUp2.png')} /> : <img src={require( '../arrowNorm.png')} /> }</td>
			            <td>{this.props.sIc2}</td>
			            <td>{this.props.sTL2}°c {this.props.sTL2
			                <='4' ? <img src={require( '../thermometerC.png')} /> : <img src={require( '../thermometerSmall.png')} valign="bottom" />}</td>
			            <td>{this.props.sTM2}°c {this.props.sTM2 > '11' ? <img src={require( '../thermometerH.png')} /> : <img src={require( '../thermometerSmall.png')} valign="bottom" />}</td>
			        </tr>
			        <tr>
			            <th>{this.props.sDay3}</th>
			            <td><img src={this.props.sI3} width="20" height="20" />
			            </td>
			            <td>{this.props.sWA3}mph {this.props.sWA3 >= '15' ? <img src={require( '../arrowUp2.png')} /> : <img src={require( '../arrowNorm.png')} /> }</td>
			            <td>{this.props.sIc3}</td>
			            <td>{this.props.sTL3}°c {this.props.sTL3
			                <='4' ? <img src={require( '../thermometerC.png')} /> : <img src={require( '../thermometerSmall.png')} valign="bottom" />}</td>
			            <td>{this.props.sTM3}°c {this.props.sTM3 > '11' ? <img src={require( '../thermometerH.png')} /> : <img src={require( '../thermometerSmall.png')} valign="bottom" />}</td>
			        </tr>
			        <tr>
			            <th>{this.props.sDay4}</th>
			            <td><img src={this.props.sI4} width="20" height="20" />
			            </td>
			            <td>{this.props.sWA4}mph {this.props.sWA4 >= '15' ? <img src={require( '../arrowUp2.png')} /> : <img src={require( '../arrowNorm.png')} /> }</td>
			            <td>{this.props.sIc4}</td>
			            <td>{this.props.sTL4}°c {this.props.sTL4
			                <='4' ? <img src={require( '../thermometerC.png')} /> : <img src={require( '../thermometerSmall.png')} valign="bottom" />}</td>
			            <td>{this.props.sTM4}°c {this.props.sTM4 > '11' ? <img src={require( '../thermometerH.png')} /> : <img src={require( '../thermometerSmall.png')} valign="bottom" />}</td>
			        </tr>
			        <tr>
			            <th>{this.props.sDay5}</th>
			            <td><img src={this.props.sI5} width="20" height="20" />
			            </td>
			            <td>{this.props.sWA5}mph {this.props.sWA5 >= '15' ? <img src={require( '../arrowUp2.png')} /> : <img src={require( '../arrowNorm.png')} /> }</td>
			            <td>{this.props.sIc5}</td>
			            <td>{this.props.sTL5}°c {this.props.sTL5
			                <='4' ? <img src={require( '../thermometerC.png')} /> : <img src={require( '../thermometerSmall.png')} valign="bottom" />}</td>
			            <td>{this.props.sTM5}°c {this.props.sTM5 > '11' ? <img src={require( '../thermometerH.png')} /> : <img src={require( '../thermometerSmall.png')} valign="bottom" />}</td>
			        </tr>
			        <tr>
			            <th>{this.props.sDay6}</th>
			            <td><img src={this.props.sI6} width="20" height="20" />
			            </td>
			            <td>{this.props.sWA6}mph {this.props.sWA6 >= '15' ? <img src={require( '../arrowUp2.png')} /> : <img src={require( '../arrowNorm.png')} /> }</td>
			            <td>{this.props.sIc6}</td>
			            <td>{this.props.sTL6}°c {this.props.sTL6
			                <='4' ? <img src={require( '../thermometerC.png')} /> : <img src={require( '../thermometerSmall.png')} valign="bottom" />}</td>
			            <td>{this.props.sTM6}°c {this.props.sTM6 > '11' ? <img src={require( '../thermometerH.png')} /> : <img src={require( '../thermometerSmall.png')} valign="bottom" />}</td>
			        </tr>
			        <tr>
			            <th>{this.props.sDay7}</th>
			            <td><img src={this.props.sI7} width="20" height="20" />
			            </td>
			            <td>{this.props.sWA7}mph {this.props.sWA7 >= '15' ? <img src={require( '../arrowUp2.png')} /> : <img src={require( '../arrowNorm.png')} /> }</td>
			            <td>{this.props.sIc7}</td>
			            <td>{this.props.sTL7}°c {this.props.sTL7
			                <='4' ? <img src={require( '../thermometerC.png')} /> : <img src={require( '../thermometerSmall.png')} valign="bottom" />}</td>
			            <td>{this.props.sTM7}°c {this.props.sTM7 > '11' ? <img src={require( '../thermometerH.png')} /> : <img src={require( '../thermometerSmall.png')} valign="bottom" />}</td>
			        </tr>
			        <tr>
			            <th>{this.props.sDay8}</th>
			            <td><img src={this.props.sI8} width="20" height="20" />
			            </td>
			            <td>{this.props.sWA8}mph {this.props.sWA8 >= '15' ? <img src={require( '../arrowUp2.png')} /> : <img src={require( '../arrowNorm.png')} /> }</td>
			            <td>{this.props.sIc8}</td>
			            <td>{this.props.sTL8}°c {this.props.sTL8
			                <='4' ? <img src={require( '../thermometerC.png')} /> : <img src={require( '../thermometerSmall.png')} valign="bottom" />}</td>
			            <td>{this.props.sTM8}°c {this.props.sTM8 > '11' ? <img src={require( '../thermometerH.png')} /> : <img src={require( '../thermometerSmall.png')} valign="bottom" />}</td>
			        </tr>
			        <tr>
			            <th>{this.props.sDay9}</th>
			            <td><img src={this.props.sI9} width="20" height="20" />
			            </td>
			            <td>{this.props.sWA9}mph {this.props.sWA9 >= '15' ? <img src={require( '../arrowUp2.png')} /> : <img src={require( '../arrowNorm.png')} /> }</td>
			            <td>{this.props.sIc9}</td>
			            <td>{this.props.sTL9}°c {this.props.sTL9
			                <='4' ? <img src={require( '../thermometerC.png')} /> : <img src={require( '../thermometerSmall.png')} valign="bottom" />}</td>
			            <td>{this.props.sTM9}°c {this.props.sTM9 > '11' ? <img src={require( '../thermometerH.png')} /> : <img src={require( '../thermometerSmall.png')} valign="bottom" />}</td>
			        </tr>
			    </table>
			</div>
		);
	}//close render
}//close component
