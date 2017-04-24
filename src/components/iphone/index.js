// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
import style from './style';
import style_iphone from '../button/style_iphone';


// import jquery for API calls
import $ from 'jquery';
// import the Button component
import Button from '../button';

import WindBox from '../windBox';

import ForecastTable from '../forecastTable';

import WeatherMap from '../weatherMap';

import DetailsBox from '../detailsBox';



export default class Iphone extends Component {
//var Iphone = React.createClass({

  // a constructor with initial set states
  constructor(props){
    super(props);
    // temperature state
    this.state.temp = "";
    // button display state
    this.setState({ display: true });
  }

	autocomp = () => {
		var input = document.getElementById('searchTextField');
		var options = {
	  types: ['(cities)'],
	  componentRestrictions: {country: 'uk'}
		};
		autocomplete = new google.maps.places.Autocomplete(input, options);
	}

  // a call to fetch weather data via wunderground
  fetchWeatherData = (city) => {
    this.setState({city: city})
    // API URL with a structure of : ttp://api.wunderground.com/api/key/feature/q/country-code/city.json
    var url = "http://api.wunderground.com/api/4a23b7dc897c8578/conditions/forecast10day/q/UK/"+city+".json";
    $.ajax({
      url: url,
      dataType: "jsonp",
      success : this.parseResponse,
      error : function(req, err){ console.log('API call failed ' + err); }
    })
    // once the data grabbed, hide the button
    // this.setState({ display: false });
  }


  getBackground = () => {
    var city = this.state.city    
    $.ajax({
      url: "http://ebird.org/ws1.1/data/obs/geo/recent?lng="+this.state.lng+"&lat="+this.state.lat+"&dist=25&maxResults=1&fmt=json&back=30",
      dataType: "json",
      success : function(ebirdData) {
          $.ajax({
            url: "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=9ba0e6cdb83174a03fa1a7bef94a6a49&text=" + ebirdData[0]["sciName"] + "&safe_search=1&content_type=1&media=photos&extras=url_l&per_page=1&page=1&format=json&nojsoncallback=1",
            dataType: "json",
            success : function(data) {
              console.log(data)
                var img = data["photos"]["photo"][0]["url_l"]
                $("."+style.container).css('background-image', 'url("'+  img  +'")');
                var url = "https://cors-anywhere.herokuapp.com/https://impalette.com/api/scan?apiKey=330eb0af-8224-4b4d-b309-5d97f7f7d000&link="+img;
                console.log(url);
                $.ajax({
                  url: url,
                  dataType: "json",
                  success : function(data1) {
                      console.log(data1);
                      $("."+style.box).css('background-color', 'rgba('+ data1[0]["primary"]["rgb"]["red"] +',' + data1[0]["primary"]["rgb"]["green"] + ',' + data1[0]["primary"]["rgb"]["blue"] + ',.66)');
                      $("."+style.locationPicker).css('background-color', 'rgba('+ data1[0]["primary"]["rgb"]["red"] +',' + data1[0]["primary"]["rgb"]["green"] + ',' + data1[0]["primary"]["rgb"]["blue"] + ',.66)');
                      $("."+style.mainInfo).css('background-color', 'rgba('+ data1[0]["primary"]["rgb"]["red"] +',' + data1[0]["primary"]["rgb"]["green"] + ',' + data1[0]["primary"]["rgb"]["blue"] + ',.66)');

                      $("."+style.box).css('color', data1[data1.length-1]["opposite"]["hex"]);
                      $("."+style.locationPicker).css('color', data1[data1.length-1]["opposite"]["hex"]);
                      $("."+style.mainInfo).css('color', data1[data1.length-1]["opposite"]["hex"]);
                      $("h2").css('border-color', data1[data1.length-1]["opposite"]["hex"]);
                      $("tr").css('color', data1[data1.length-1]["opposite"]["hex"]);
                      $("th").css('color', data1[data1.length-1]["opposite"]["hex"]);

                      $.ajax({
                        url: "http://api.wunderground.com/api/4a23b7dc897c8578/conditions/hourly/q/UK/" + city + ".json",
                        dataType: "json",
                        success : function(hourlyWeatherData) {
                          var tmpData = []
                          for (var i = 0; i < 12; i++) {
                            tmpData.push({x: parseInt(hourlyWeatherData["hourly_forecast"][i]["FCTTIME"]["epoch"]), y: parseInt(hourlyWeatherData["hourly_forecast"][i]["temp"]["metric"])})
                          }
                          var ctx = document.getElementById("tempChart");
                          var tempChart = new Chart(ctx, {
                          type: 'line',
                          data: {
                              datasets: [{
                                  data: tmpData,
                                        backgroundColor: [
                                          'rgba('+ data1[data1.length-1]["opposite"]["rgb"]["red"] +',' + data1[data1.length-1]["opposite"]["rgb"]["green"] + ',' + data1[data1.length-1]["opposite"]["rgb"]["blue"] + ',.66)'
                                      ],

                                      borderColor: [
                                          'rgba('+ data1[data1.length-1]["opposite"]["rgb"]["red"] +',' + data1[data1.length-1]["opposite"]["rgb"]["green"] + ',' + data1[data1.length-1]["opposite"]["rgb"]["blue"] + ',1)'
                                      ]
                              }]
                          },
                          options: {
                              scales: {
                                  xAxes: [{
                                      ticks: {
                                        fontColor: data1[data1.length-1]["opposite"]["hex"], // this here
                                      },
                                      type: 'linear',
                                      position: 'bottom',
                                      display: false
                                  }],
                                  yAxes: [{
                                      ticks: {
                                        fontColor: data1[data1.length-1]["opposite"]["hex"], // this here
                                      },
                                  }]

                              },
                                legend: {
                                    display: false
                                }
                          }
                      });
                          },
                        error : function(req, err){ console.log('API call failed ' + err); }
                      })

                    },
                  error : function(req, err){ console.log('API call failed ' + err); }
                })

              },
            error : function(req, err){ console.log('API call failed ' + err); }
          })
        },
      error : function(req, err){ console.log('API call failed ' + err); }
    })

  }


    componentDidMount() {
        this.fetchWeatherData("London");
        this.autocomp();

    }


  fetchSpecificWeatherData = () => {
  	var location = document.getElementById('searchTextField').value.split(",")[0]
  	this.fetchWeatherData(location);
  }


  // the main render method for the iphone component
  render() {
    // check if temperature data is fetched, if so add the sign styling to the page
    const tempStyles = this.state.temp ? `${style.temperature} ${style.filled}` : style.temperature;
    const tempStyles2 = this.state.temp ? `${style.temperature2} ${style.filled2}` : style.temperature;
    const tempStylesLow = this.state.temp ? `${style.temperatureLow} ${style.filledLow}` : style.temperature;
    const windSpeedStyle = this.state.wind ? `${style.windspeed} ${style.mph}` : style.windspeed;


    // display all weather data
    return (
      <div>
      <div class={ style.container }>
        <div class={ style.locationPicker } id="locationPicker">
          <input type="text" id="searchTextField"> </input>
          <Button class={ style_iphone.button } clickFunction={ this.fetchSpecificWeatherData }/ >
        </div>
        <div class={ style.header }>
          <div class={ style.mainInfo }>
            <div class={ style.mainInfoDetails }>
              <div class={ style.city }>{ this.state.locate }</div>
              <div class={ style.conditions }> <img src={this.state.currentIcon} width="20" /> { this.state.cond }</div>
              <span class={ tempStyles }>{ this.state.temp }</span>
            </div>
            <div class={ style.mainInfoChart }>
              <canvas id="tempChart" width="207" height="143"></canvas>
            </div>
          </div>
        </div>

        <div class={ style.box }>
          <DetailsBox feelslike={this.state.feelslike} visibility={this.state.visibility} UV={this.state.UV} description={this.state.description} />
        </div>


        <div class={ style.box }>
          <ForecastTable 
          sDay0={this.state.sDay0} sDay1={this.state.sDay1} sDay2={this.state.sDay2} sDay3={this.state.sDay3} sDay4={this.state.sDay4} sDay5={this.state.sDay5} sDay6={this.state.sDay6} sDay7={this.state.sDay7} sDay8={this.state.sDay8} sDay9={this.state.sDay9}
          sI0={this.state.sI0} sI1={this.state.sI1} sI2={this.state.sI2} sI3={this.state.sI3} sI4={this.state.sI4} sI5={this.state.sI5} sI6={this.state.sI6} sI7={this.state.sI7} sI8={this.state.sI8} sI9={this.state.sI9} 
          sWA0={this.state.sWA0} sWA1={this.state.sWA1} sWA2={this.state.sWA2}  sWA3={this.state.sWA3} sWA4={this.state.sWA4} sWA5={this.state.sWA5} sWA6={this.state.sWA6} sWA7={this.state.sWA7} sWA8={this.state.sWA8} sWA9={this.state.sWA9}
          sIc0={this.state.sIc0} sIc1={this.state.sIc1} sIc2={this.state.sIc2} sIc3={this.state.sIc3} sIc4={this.state.sIc4} sIc5={this.state.sIc5} sIc6={this.state.sIc6} sIc7={this.state.sIc7} sIc8={this.state.sIc8} sIc9={this.state.sIc9}
          sTL0={this.state.sTL0} sTL1={this.state.sTL1} sTL2={this.state.sTL2} sTL3={this.state.sTL3} sTL4={this.state.sTL4} sTL5={this.state.sTL5} sTL6={this.state.sTL6} sTL7={this.state.sTL7} sTL8={this.state.sTL8} sTL9={this.state.sTL9} 
          sTM0={this.state.sTM0} sTM1={this.state.sTM1} sTM2={this.state.sTM2} sTM3={this.state.sTM3} sTM4={this.state.sTM4} sTM5={this.state.sTM5} sTM6={this.state.sTM6} sTM7={this.state.sTM7} sTM8={this.state.sTM8} sTM9={this.state.sTM9} 
          />
        </div>

        <div class={ style.box }>
          <WindBox spinnerFast={this.state.spinnerFast} wind_degrees={this.state.wind_degrees} windString={this.state.windString} />
        </div>

        <div class={ style.box }>
          <WeatherMap city={this.state.city} />
        </div>

      </div>      
      </div>
    );
  }

  parseResponse = (parsed_json) => {

    this.setState({
      lat: parsed_json["current_observation"]["display_location"]["latitude"],
      lng: parsed_json["current_observation"]["display_location"]["longitude"],
    })
    this.getBackground();    

    var spinnerFast = false;
    if (parsed_json['current_observation']['wind_kph'] > 40) {
      spinnerFast = true;
    }

    var location = parsed_json['current_observation']['display_location']['city'];
    var conditionsString = "Conditions: ";
    var temp_c = Math.round(parsed_json['current_observation']['temp_c']);
    var windspeed = "Wind Speed: ";
    var wind_kph = parsed_json['current_observation']['wind_kph'];
    var kph = " kph";
    var conditions = parsed_json['current_observation']['weather'];

//image vairblae test
    var Img = require('../arrowUp2.png');
    var Img2 = require('../arrowNorm.png');
// detailed hourly forcast
//    var hourHumidity0 = parsed_json['forecast']['hourly_forecast']['FCTTIME'][0];


//Simple forecast thing
    var simpleDay0 = parsed_json['forecast']['txt_forecast']['forecastday'][0]['title'];
    var simpleIcon0 = parsed_json['forecast']['simpleforecast']['forecastday'][0]['icon_url'];
    var simpleWindHigh0 = parsed_json['forecast']['simpleforecast']['forecastday'][0]['maxwind']['mph'];
    var simpleWindAvg0 = parsed_json['forecast']['simpleforecast']['forecastday'][0]['avewind']['mph'];
    var simpleTempMax0 = parsed_json['forecast']['simpleforecast']['forecastday'][0]['high']['celsius'];
    var simpleTempLow0 = parsed_json['forecast']['simpleforecast']['forecastday'][0]['low']['celsius'];
//lil test, can remove at some point
    var simpleCRain0 = parsed_json['forecast']['simpleforecast']['forecastday'][0]['conditions'];
    var simpleCRain1 = parsed_json['forecast']['simpleforecast']['forecastday'][1]['conditions'];
    var simpleCRain2 = parsed_json['forecast']['simpleforecast']['forecastday'][2]['conditions'];
    var simpleCRain3 = parsed_json['forecast']['simpleforecast']['forecastday'][3]['conditions'];
    var simpleCRain4 = parsed_json['forecast']['simpleforecast']['forecastday'][4]['conditions'];
    var simpleCRain5 = parsed_json['forecast']['simpleforecast']['forecastday'][5]['conditions'];
    var simpleCRain6 = parsed_json['forecast']['simpleforecast']['forecastday'][6]['conditions'];
    var simpleCRain7 = parsed_json['forecast']['simpleforecast']['forecastday'][7]['conditions'];
    var simpleCRain8 = parsed_json['forecast']['simpleforecast']['forecastday'][8]['conditions'];
    var simpleCRain9 = parsed_json['forecast']['simpleforecast']['forecastday'][9]['conditions'];

    var simpleDay1 = parsed_json['forecast']['txt_forecast']['forecastday'][2]['title'];
    var simpleIcon1 = parsed_json['forecast']['simpleforecast']['forecastday'][1]['icon_url'];
    var simpleWindHigh1 = parsed_json['forecast']['simpleforecast']['forecastday'][1]['maxwind']['mph'];
    var simpleWindAvg1 = parsed_json['forecast']['simpleforecast']['forecastday'][1]['avewind']['mph'];
    var simpleTempMax1 = parsed_json['forecast']['simpleforecast']['forecastday'][1]['high']['celsius'];
    var simpleTempLow1 = parsed_json['forecast']['simpleforecast']['forecastday'][1]['low']['celsius'];
    var simpleDay2 = parsed_json['forecast']['txt_forecast']['forecastday'][4]['title'];
    var simpleIcon2 = parsed_json['forecast']['simpleforecast']['forecastday'][2]['icon_url'];
    var simpleWindHigh2 = parsed_json['forecast']['simpleforecast']['forecastday'][2]['maxwind']['mph'];
    var simpleWindAvg2 = parsed_json['forecast']['simpleforecast']['forecastday'][2]['avewind']['mph'];
    var simpleTempMax2 = parsed_json['forecast']['simpleforecast']['forecastday'][2]['high']['celsius'];
    var simpleTempLow2 = parsed_json['forecast']['simpleforecast']['forecastday'][2]['low']['celsius'];
    var simpleDay3 = parsed_json['forecast']['txt_forecast']['forecastday'][6]['title'];
    var simpleIcon3 = parsed_json['forecast']['simpleforecast']['forecastday'][3]['icon_url'];
    var simpleWindHigh3 = parsed_json['forecast']['simpleforecast']['forecastday'][3]['maxwind']['mph'];
    var simpleWindAvg3 = parsed_json['forecast']['simpleforecast']['forecastday'][3]['avewind']['mph'];
    var simpleTempMax3 = parsed_json['forecast']['simpleforecast']['forecastday'][3]['high']['celsius'];
    var simpleTempLow3 = parsed_json['forecast']['simpleforecast']['forecastday'][3]['low']['celsius'];
    var simpleDay4 = parsed_json['forecast']['txt_forecast']['forecastday'][8]['title'];
    var simpleIcon4 = parsed_json['forecast']['simpleforecast']['forecastday'][4]['icon_url'];
    var simpleWindHigh4 = parsed_json['forecast']['simpleforecast']['forecastday'][4]['maxwind']['mph'];
    var simpleWindAvg4 = parsed_json['forecast']['simpleforecast']['forecastday'][4]['avewind']['mph'];
    var simpleTempMax4 = parsed_json['forecast']['simpleforecast']['forecastday'][4]['high']['celsius'];
    var simpleTempLow4 = parsed_json['forecast']['simpleforecast']['forecastday'][4]['low']['celsius'];
    var simpleDay5 = parsed_json['forecast']['txt_forecast']['forecastday'][10]['title'];
    var simpleIcon5 = parsed_json['forecast']['simpleforecast']['forecastday'][5]['icon_url'];
    var simpleWindHigh5 = parsed_json['forecast']['simpleforecast']['forecastday'][5]['maxwind']['mph'];
    var simpleWindAvg5 = parsed_json['forecast']['simpleforecast']['forecastday'][5]['avewind']['mph'];
    var simpleTempMax5 = parsed_json['forecast']['simpleforecast']['forecastday'][5]['high']['celsius'];
    var simpleTempLow5 = parsed_json['forecast']['simpleforecast']['forecastday'][5]['low']['celsius'];
    var simpleDay6 = parsed_json['forecast']['txt_forecast']['forecastday'][12]['title'];
    var simpleIcon6 = parsed_json['forecast']['simpleforecast']['forecastday'][6]['icon_url'];
    var simpleWindHigh6 = parsed_json['forecast']['simpleforecast']['forecastday'][6]['maxwind']['mph'];
    var simpleWindAvg6 = parsed_json['forecast']['simpleforecast']['forecastday'][6]['avewind']['mph'];
    var simpleTempMax6 = parsed_json['forecast']['simpleforecast']['forecastday'][6]['high']['celsius'];
    var simpleTempLow6 = parsed_json['forecast']['simpleforecast']['forecastday'][6]['low']['celsius'];
    var simpleDay7 = parsed_json['forecast']['txt_forecast']['forecastday'][14]['title'];
    var simpleIcon7 = parsed_json['forecast']['simpleforecast']['forecastday'][7]['icon_url'];
    var simpleWindHigh7 = parsed_json['forecast']['simpleforecast']['forecastday'][7]['maxwind']['mph'];
    var simpleWindAvg7 = parsed_json['forecast']['simpleforecast']['forecastday'][7]['avewind']['mph'];
    var simpleTempMax7 = parsed_json['forecast']['simpleforecast']['forecastday'][7]['high']['celsius'];
    var simpleTempLow7 = parsed_json['forecast']['simpleforecast']['forecastday'][7]['low']['celsius'];
    var simpleDay8 = parsed_json['forecast']['txt_forecast']['forecastday'][16]['title'];
    var simpleIcon8 = parsed_json['forecast']['simpleforecast']['forecastday'][8]['icon_url'];
    var simpleWindHigh8 = parsed_json['forecast']['simpleforecast']['forecastday'][8]['maxwind']['mph'];
    var simpleWindAvg8 = parsed_json['forecast']['simpleforecast']['forecastday'][8]['avewind']['mph'];
    var simpleTempMax8 = parsed_json['forecast']['simpleforecast']['forecastday'][8]['high']['celsius'];
    var simpleTempLow8 = parsed_json['forecast']['simpleforecast']['forecastday'][8]['low']['celsius'];
    var simpleDay9 = parsed_json['forecast']['txt_forecast']['forecastday'][18]['title'];
    var simpleIcon9 = parsed_json['forecast']['simpleforecast']['forecastday'][9]['icon_url'];
    var simpleWindHigh9 = parsed_json['forecast']['simpleforecast']['forecastday'][9]['maxwind']['mph'];
    var simpleWindAvg9 = parsed_json['forecast']['simpleforecast']['forecastday'][9]['avewind']['mph'];
    var simpleTempMax9 = parsed_json['forecast']['simpleforecast']['forecastday'][9]['high']['celsius'];
    var simpleTempLow9 = parsed_json['forecast']['simpleforecast']['forecastday'][9]['low']['celsius'];
//10 DAY TEXT FORECAST VARIABLES


    var forecastTitle0 = parsed_json['forecast']['txt_forecast']['forecastday'][0]['title'];
    var forecastIcon0 = parsed_json['forecast']['txt_forecast']['forecastday'][0]['icon_url'];
    var forecastDescription0 = parsed_json['forecast']['txt_forecast']['forecastday'][0]['fcttext_metric'];
    var forecastIcon1 = parsed_json['forecast']['txt_forecast']['forecastday'][1]['icon_url'];
    var forecastTitle1 = parsed_json['forecast']['txt_forecast']['forecastday'][1]['title'];
    var forecastDescription1 = parsed_json['forecast']['txt_forecast']['forecastday'][1]['fcttext_metric'];
    var forecastIcon2 = parsed_json['forecast']['txt_forecast']['forecastday'][2]['icon_url'];
    var forecastTitle2 = parsed_json['forecast']['txt_forecast']['forecastday'][2]['title'];
    var forecastDescription2 = parsed_json['forecast']['txt_forecast']['forecastday'][2]['fcttext_metric'];
    var forecastIcon3 = parsed_json['forecast']['txt_forecast']['forecastday'][3]['icon_url'];
    var forecastTitle3 = parsed_json['forecast']['txt_forecast']['forecastday'][3]['title'];
    var forecastDescription3 = parsed_json['forecast']['txt_forecast']['forecastday'][3]['fcttext_metric'];
    var forecastIcon4 = parsed_json['forecast']['txt_forecast']['forecastday'][4]['icon_url'];
    var forecastTitle4 = parsed_json['forecast']['txt_forecast']['forecastday'][4]['title'];
    var forecastDescription4 = parsed_json['forecast']['txt_forecast']['forecastday'][4]['fcttext_metric'];
    var forecastIcon5 = parsed_json['forecast']['txt_forecast']['forecastday'][5]['icon_url'];
    var forecastTitle5 = parsed_json['forecast']['txt_forecast']['forecastday'][5]['title'];
    var forecastDescription5 = parsed_json['forecast']['txt_forecast']['forecastday'][5]['fcttext_metric'];
    var forecastIcon6 = parsed_json['forecast']['txt_forecast']['forecastday'][6]['icon_url'];
    var forecastTitle6 = parsed_json['forecast']['txt_forecast']['forecastday'][6]['title'];
    var forecastDescription6 = parsed_json['forecast']['txt_forecast']['forecastday'][6]['fcttext_metric'];
    var forecastIcon7 = parsed_json['forecast']['txt_forecast']['forecastday'][7]['icon_url'];
    var forecastTitle7 = parsed_json['forecast']['txt_forecast']['forecastday'][7]['title'];
    var forecastDescription7 = parsed_json['forecast']['txt_forecast']['forecastday'][7]['fcttext_metric'];
    var forecastIcon8 = parsed_json['forecast']['txt_forecast']['forecastday'][8]['icon_url'];
    var forecastTitle8 = parsed_json['forecast']['txt_forecast']['forecastday'][8]['title'];
    var forecastDescription8 = parsed_json['forecast']['txt_forecast']['forecastday'][8]['fcttext_metric'];
    var forecastIcon9 = parsed_json['forecast']['txt_forecast']['forecastday'][9]['icon_url'];
    var forecastTitle9 = parsed_json['forecast']['txt_forecast']['forecastday'][9]['title'];
    var forecastDescription9 = parsed_json['forecast']['txt_forecast']['forecastday'][9]['fcttext_metric'];
    var forecastIcon10 = parsed_json['forecast']['txt_forecast']['forecastday'][10]['icon_url'];
    var forecastTitle10 = parsed_json['forecast']['txt_forecast']['forecastday'][10]['title'];
    var forecastDescription10 = parsed_json['forecast']['txt_forecast']['forecastday'][10]['fcttext_metric'];
    var forecastIcon11 = parsed_json['forecast']['txt_forecast']['forecastday'][11]['icon_url'];
    var forecastTitle11 = parsed_json['forecast']['txt_forecast']['forecastday'][11]['title'];
    var forecastDescription11 = parsed_json['forecast']['txt_forecast']['forecastday'][11]['fcttext_metric'];
    var forecastIcon12 = parsed_json['forecast']['txt_forecast']['forecastday'][12]['icon_url'];
    var forecastTitle12 = parsed_json['forecast']['txt_forecast']['forecastday'][12]['title'];
    var forecastDescription12 = parsed_json['forecast']['txt_forecast']['forecastday'][12]['fcttext_metric'];
    var forecastIcon13 = parsed_json['forecast']['txt_forecast']['forecastday'][13]['icon_url'];
    var forecastTitle13 = parsed_json['forecast']['txt_forecast']['forecastday'][13]['title'];
    var forecastDescription13 = parsed_json['forecast']['txt_forecast']['forecastday'][13]['fcttext_metric'];
    var forecastIcon14 = parsed_json['forecast']['txt_forecast']['forecastday'][14]['icon_url'];
    var forecastTitle14 = parsed_json['forecast']['txt_forecast']['forecastday'][14]['title'];
    var forecastDescription14 = parsed_json['forecast']['txt_forecast']['forecastday'][14]['fcttext_metric'];
    var forecastIcon15 = parsed_json['forecast']['txt_forecast']['forecastday'][15]['icon_url'];
    var forecastTitle15 = parsed_json['forecast']['txt_forecast']['forecastday'][15]['title'];
    var forecastDescription15 = parsed_json['forecast']['txt_forecast']['forecastday'][15]['fcttext_metric'];
    var forecastIcon16 = parsed_json['forecast']['txt_forecast']['forecastday'][16]['icon_url'];
    var forecastTitle16 = parsed_json['forecast']['txt_forecast']['forecastday'][16]['title'];
    var forecastDescription16 = parsed_json['forecast']['txt_forecast']['forecastday'][16]['fcttext_metric'];
    var forecastIcon17 = parsed_json['forecast']['txt_forecast']['forecastday'][17]['icon_url'];
    var forecastTitle17 = parsed_json['forecast']['txt_forecast']['forecastday'][17]['title'];
    var forecastDescription17 = parsed_json['forecast']['txt_forecast']['forecastday'][17]['fcttext_metric'];
    var forecastIcon18 = parsed_json['forecast']['txt_forecast']['forecastday'][18]['icon_url'];
    var forecastTitle18 = parsed_json['forecast']['txt_forecast']['forecastday'][18]['title'];
    var forecastDescription18 = parsed_json['forecast']['txt_forecast']['forecastday'][18]['fcttext_metric'];
    var forecastIcon19 = parsed_json['forecast']['txt_forecast']['forecastday'][19]['icon_url'];
    var forecastTitle19 = parsed_json['forecast']['txt_forecast']['forecastday'][19]['title'];
    var forecastDescription19 = parsed_json['forecast']['txt_forecast']['forecastday'][19]['fcttext_metric'];


    // set states for fields so they could be rendered later on
    this.setState({

      locate: location,
      conditionsString: conditionsString,
      temp: temp_c,
      windspeed: windspeed,
      wind: wind_kph,
      kph: kph,
      windString: parsed_json['current_observation']['wind_string'],
      currentIcon: parsed_json['current_observation']['icon_url'],
      visibility: parsed_json['current_observation']['visibility_mi'],
      wind_degrees: "transform: rotate(" + parsed_json['current_observation']['wind_degrees'] + "deg);",
      cond : conditions,
      feelslike: parsed_json['current_observation']['feelslike_c'],
      visibility: parsed_json['current_observation']['visibility_mi'],
      UV: parsed_json['current_observation']['UV'],
      description: parsed_json["forecast"]["txt_forecast"]["forecastday"][0]["fcttext_metric"],
//image test
      windUp: Img,
      windNorm: Img2, 
//simple forecast
      sIc0: simpleCRain0,
      sIc1: simpleCRain1,
      sIc2: simpleCRain2,
      sIc3: simpleCRain3,
      sIc4: simpleCRain4,
      sIc5: simpleCRain5,
      sIc6: simpleCRain6,
      sIc7: simpleCRain7,
      sIc8: simpleCRain8,
      sIc9: simpleCRain9,



      sDay0: simpleDay0,
      sI0: simpleIcon0,
      sWH0: simpleWindHigh0,
      sWA0: simpleWindAvg0,
      sTM0: simpleTempMax0,
      sTL0: simpleTempLow0,
      sDay1: simpleDay1,
      sI1: simpleIcon1,
      sWH1: simpleWindHigh1,
      sWA1: simpleWindAvg1,
      sTM1: simpleTempMax1,
      sTL1: simpleTempLow1,
      sDay2: simpleDay2,
      sI2: simpleIcon2,
      sWH2: simpleWindHigh2,
      sWA2: simpleWindAvg2,
      sTM2: simpleTempMax2,
      sTL2: simpleTempLow2,
      sDay3: simpleDay3,
      sI3: simpleIcon3,
      sWH3: simpleWindHigh3,
      sWA3: simpleWindAvg3,
      sTM3: simpleTempMax3,
      sTL3: simpleTempLow3,
      sDay4: simpleDay4,
      sI4: simpleIcon4,
      sWH4: simpleWindHigh4,
      sWA4: simpleWindAvg4,
      sTM4: simpleTempMax4,
      sTL4: simpleTempLow4,
      sDay5: simpleDay5,
      sI5: simpleIcon5,
      sWH5: simpleWindHigh5,
      sWA5: simpleWindAvg5,
      sTM5: simpleTempMax5,
      sTL5: simpleTempLow5,
      sDay6: simpleDay6,
      sI6: simpleIcon6,
      sWH6: simpleWindHigh6,
      sWA6: simpleWindAvg6,
      sTM6: simpleTempMax6,
      sTL6: simpleTempLow6,
      sDay7: simpleDay7,
      sI7: simpleIcon7,
      sWH7: simpleWindHigh7,
      sWA7: simpleWindAvg7,
      sTM7: simpleTempMax7,
      sTL7: simpleTempLow7,
      sDay8: simpleDay8,
      sI8: simpleIcon8,
      sWH8: simpleWindHigh8,
      sWA8: simpleWindAvg8,
      sTM8: simpleTempMax8,
      sTL8: simpleTempLow8,
      sDay9: simpleDay9,
      sI9: simpleIcon9,
      sWH9: simpleWindHigh9,
      sWA9: simpleWindAvg9,
      sTM9: simpleTempMax9,
      sTL9: simpleTempLow9,

      fTitle0: forecastTitle0,
      fIcon0: forecastIcon0,
      fDis0: forecastDescription0,
      fTitle1: forecastTitle1,
      fIcon1: forecastIcon1,
      fDis1: forecastDescription1,
      fIcon2: forecastIcon2,
      fTitle2: forecastTitle2,
      fDis2: forecastDescription2,
      fIcon3: forecastIcon3,
      fTitle3: forecastTitle3,
      fDis3: forecastDescription3,
      fIcon4: forecastIcon4,
      fTitle4: forecastTitle4,
      fDis4: forecastDescription4,
      fIcon5: forecastIcon5,
      fTitle5: forecastTitle5,
      fDis5: forecastDescription5,
      fIcon6: forecastIcon6,
      fTitle6: forecastTitle6,
      fDis6: forecastDescription6,
      fIcon7: forecastIcon7,
      fTitle7: forecastTitle7,
      fDis7: forecastDescription7,
      fIcon8: forecastIcon8,
      fTitle8: forecastTitle8,
      fDis8: forecastDescription8,
      fIcon9: forecastIcon9,
      fTitle9: forecastTitle9,
      fDis9: forecastDescription9,
      fIcon10: forecastIcon10,
      fTitle10: forecastTitle10,
      fDis10: forecastDescription10,
      fIcon11: forecastIcon11,
      fTitle11: forecastTitle11,
      fDis11: forecastDescription11,
      fIcon12: forecastIcon12,
      fTitle12: forecastTitle12,
      fDis12: forecastDescription12,
      fIcon13: forecastIcon13,
      fTitle13: forecastTitle13,
      fDis13: forecastDescription13,
      fIcon14: forecastIcon14,
      fTitle14: forecastTitle14,
      fDis14: forecastDescription14,
      fIcon15: forecastIcon15,
      fTitle15: forecastTitle15,
      fDis15: forecastDescription15,
      fIcon16: forecastIcon16,
      fTitle16: forecastTitle16,
      fDis16: forecastDescription16,
      fIcon17: forecastIcon17,
      fTitle17: forecastTitle17,
      fDis17: forecastDescription17,
      fIcon18: forecastIcon18,
      fTitle18: forecastTitle18,
      fDis18: forecastDescription18,
      fIcon19: forecastIcon19,
      fTitle19: forecastTitle19,
      fDis19: forecastDescription19,

      spinnerFast: spinnerFast,

    });  

  }
}