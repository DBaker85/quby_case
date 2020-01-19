import React, { FunctionComponent, useEffect, useState } from "react";
import axios from "axios";

import Button from "../shared/button/button";
import styles from "./thermostat.module.scss";

interface TemperatureData{
  currentTemp: number;
  timestamp: Date;
  currentSetpoint: number;
}

interface LocalTemperatureData extends Omit<TemperatureData,'timestamp'>{
  timestamp: string;
}

const Thermostat: FunctionComponent = () => {
  const [currentData, setCurrentData] = useState<LocalTemperatureData>({
    currentTemp: 0,
    timestamp: new Date(0).toLocaleTimeString(),
    currentSetpoint: 0
  });

  const fetchTemp = ()=>{
     axios.get<TemperatureData>("http://localhost:9090").then(res => {
      console.log(res.status);
      if (res.status <= 200) {
        setCurrentData({
          currentTemp: res.data.currentTemp,
          timestamp: new Date(res.data.timestamp).toLocaleTimeString(),
          currentSetpoint: res.data.currentSetpoint
        });
      }
    });
  }

  const incrementTemp = ()=>{
      console.log(currentData.currentTemp,currentData.currentTemp+.5)
      axios.patch("http://localhost:9090",{
        currentSetpoint: currentData.currentTemp+.5
      }).then(res => {
        axios.get("http://localhost:9090").then(res => {
            console.log(res.status);
            if (res.status <= 200) {
              setCurrentData({
                currentTemp: res.data.currentTemp,
                timestamp: new Date(res.data.timestamp).toLocaleTimeString(),
                currentSetpoint: res.data.currentSetpoint
              });
            }
          });
      });
  }

  useEffect(() => {
    fetchTemp();
  }, []);

  return (
    <div className={styles["thermostat-wrapper"]}>
      <div className={styles["display"]}>
        <div>
          <div>{currentData.currentSetpoint}</div>
          <div>{currentData.timestamp}</div>
        </div>
        <div>{currentData.currentTemp}</div>
      </div>
      <div className={styles["button-left"]}>
        <Button
          onClick={incrementTemp}
        >
          +
        </Button>
      </div>
      <div className={styles["button-right"]}>
        <Button
          onClick={() => {
            console.log("increment");
          }}
        >
          -
        </Button>
      </div>
    </div>
  );
};

export default Thermostat;
