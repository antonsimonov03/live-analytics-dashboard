import React, { Component } from "react";
import { EventEmitter } from "events";
import { connect } from "react-redux";
import "./App.css";
import {
  temperatureChange,
  airPressureChange,
  humidityChange
} from "../../redux/DataReducer/actions";
import PropTypes from "prop-types";

export class App extends Component {
  state = {
    stop: false
  };
  componentDidMount() {
    const myEmitter = new EventEmitter();

    myEmitter.on("data", ({ timing, eventName }) => {
      let data = timing;
      if (timing > 1000) data = "N/A";
      if (!this.state.stop && data !== this.props[eventName][0])
        this.props[`${eventName}Change`](data);
    });

    (function getTemperature() {
      const rand = Math.round(Math.random() * (1200 - 100)) + 100;
      setTimeout(function() {
        myEmitter.emit("data", {
          timing: rand,
          eventName: "temperature"
        });
        getTemperature();
      }, rand);
    })();
    (function getAirPressure() {
      const rand = Math.round(Math.random() * (1200 - 100)) + 100;
      setTimeout(function() {
        myEmitter.emit("data", {
          timing: rand,
          eventName: "airPressure"
        });

        getAirPressure();
      }, rand);
    })();
    (function getHumidity() {
      const rand = Math.round(Math.random() * (1200 - 100)) + 100;
      setTimeout(function() {
        myEmitter.emit("data", { timing: rand, eventName: "humidity" });
        getHumidity();
      }, rand);
    })();
  }

  getRandom = () => Math.round(Math.random() * (1200 - 100)) + 100;

  toggleAction = () => this.setState({ stop: !this.state.stop });
  render() {
    const { temperature, airPressure, humidity } = this.props;
    return (
      <div className="container">
        <h1 className="header"> Test Medical Operating Room </h1>
        <div className="table-row">
          <div className="table-header table-item">Temperature</div>
          <div className="table-header table-item">Air Pressure</div>
          <div className="table-header table-item">Humidity</div>
        </div>
        {temperature.length > 0 &&
        airPressure.length > 0 &&
        humidity.length > 0 ? (
          <div className="table-row">
            <div className="table-item table-cell">{temperature[0]}</div>
            <div className="table-item table-cell">{airPressure[0]}</div>
            <div className="table-item table-cell">{humidity[0]}</div>
          </div>
        ) : (
          <div className="warning">There is no data yet.</div>
        )}
        <button className="toggle-button" onClick={this.toggleAction}>
          {this.state.stop ? "Start" : "Stop"}
        </button>
      </div>
    );
  }
}

App.propTypes = {
  temperature: PropTypes.array.isRequired,
  airPressure: PropTypes.array.isRequired,
  humidity: PropTypes.array.isRequired,
  temperatureChange: PropTypes.func.isRequired,
  airPressureChange: PropTypes.func.isRequired,
  humidityChange: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  temperature: state.temperature,
  airPressure: state.airPressure,
  humidity: state.humidity
});

const mapDispatchToProps = dispatch => ({
  temperatureChange: temperature => dispatch(temperatureChange(temperature)),
  airPressureChange: airPressure => dispatch(airPressureChange(airPressure)),
  humidityChange: humidity => dispatch(humidityChange(humidity))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
