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
import { Observable } from "@reactivex/rxjs";

export class App extends Component {
  state = { stop: false };
  componentDidMount() {
    this.myEmitter = new EventEmitter();

    this.myEmitter.on("data", ({ timing, eventName }) => {
      this.props[`${eventName}Change`](timing);
    });

    const humidity = Observable.interval()
      .concatMap(function(x) {
        return Observable.of(x)
          .delay(Math.round(Math.random() * (1200 - 100)) + 100)
          .map(() => "humidity");
      })
      .timeInterval();
    const temperature = Observable.interval()
      .concatMap(function(x) {
        return Observable.of(x)
          .delay(Math.round(Math.random() * (1200 - 100)) + 100)
          .map(() => "temperature");
      })
      .timeInterval();
    const airPressure = Observable.interval()
      .concatMap(function(x) {
        return Observable.of(x)
          .delay(Math.round(Math.random() * (1200 - 100)) + 100)
          .map(() => "airPressure");
      })
      .timeInterval();

    this.merge = Observable.merge(temperature, airPressure, humidity);

    this.subscribe();
  }

  subscribe = () =>
    (this.subscription = this.merge.subscribe(x => {
      if (x.interval > 1000) x.interval = "N/A";
      this.myEmitter.emit("data", {
        timing: x.interval,
        eventName: x.value
      });
    }));

  toggleAction = async () => {
    await this.setState({ stop: !this.state.stop });
    if (this.state.stop) this.subscription.unsubscribe();
    else this.subscribe();
  };

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

// export default App;
