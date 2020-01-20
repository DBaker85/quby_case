import React from "react";
import ReactDOM from "react-dom";
import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import axios from "../axios";

import Thermostat from "./thermostat";

configure({ adapter: new Adapter() });

jest.mock("axios");

let thermostatInstance;

describe("Thermostat", () => {
  beforeEach(() => {
    thermostatInstance = mount(<Thermostat />);
  });

  it("renders", () => {
    mount(<Thermostat />);
  });

  // TODO: Test there is data visible

  

  it("should fetch temperature", () => {
    jest.useFakeTimers();
    const getSpy = jest.spyOn(axios, "get");
    setTimeout(() => {
      expect(getSpy).toBeCalled();
    }, 3000);
  });

  // Test clicking 3 times only does 1 api call
  it("should update temperature once", () => {
    jest.useFakeTimers();
    const patchSpy = jest.spyOn(axios, "patch");
    const button = thermostatInstance
      .find("#increment-button")
      .at(0);
    
      button.simulate("click");
      button.simulate("click");
      button.simulate("click");
      
    setTimeout(() => {
      expect(patchSpy).toHaveBeenCalledTimes(5);
    }, 3000);
  }
  );
});

//TODO: test that buttons are disabled if value is 0
