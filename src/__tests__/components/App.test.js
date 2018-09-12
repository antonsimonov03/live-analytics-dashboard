import React from "react";
import ReactDOM from "react-dom";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { App } from "../../Components/App/App";

Enzyme.configure({ adapter: new Adapter() });

describe("<App/> component", () => {
  it("should initial render", () => {
    const props = {
      temperature: [],
      airPressure: [],
      humidity: [],
      temperatureChange: jest.fn(),
      airPressureChange: jest.fn(),
      humidityChange: jest.fn()
    };

    const appComponent = shallow(<App {...props} />);
    expect(appComponent.find("h1").text()).toBe(
      " Test Medical Operating Room "
    );
    expect(appComponent.find(".warning").length).toEqual(1);
    const button = appComponent.find("button");
    button.simulate("click");
    expect(appComponent.state().stop).toEqual(true);
  });
  it("should render with props", () => {
    const props = {
      temperature: [12, 13, 15],
      airPressure: ["N/A", 42, 21],
      humidity: [23],
      temperatureChange: jest.fn(),
      airPressureChange: jest.fn(),
      humidityChange: jest.fn()
    };

    const appComponent = shallow(<App {...props} />);
    expect(appComponent.find(".table-cell").length).toEqual(3);
    expect(
      appComponent
        .find(".table-cell")
        .at(1)
        .text()
    ).toBe("N/A");
  });
});
