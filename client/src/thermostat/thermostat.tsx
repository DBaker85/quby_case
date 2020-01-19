import React, { FunctionComponent, useEffect, useState } from "react";
import axios from "axios";

import Button from "../shared/button/button";
import styles from "./thermostat.module.scss";

const Thermostat: FunctionComponent = () => {
  const [currentData, setCurrentData] = useState({
    temp: 0,
    time: new Date(0).toLocaleTimeString(),
    setTemp: 0
  });

  const incrementTemp = ()=>{
      console.log(currentData.temp,currentData.temp+.5)
      axios.patch("http://localhost:9090",{
        currentSetpoint: currentData.temp+.5
      }).then(res => {
        axios.get("http://localhost:9090").then(res => {
            console.log(res.status);
            if (res.status <= 200) {
              setCurrentData({
                temp: res.data.currentTemp,
                time: new Date(res.data.timestamp).toLocaleTimeString(),
                setTemp: res.data.currentSetpoint
              });
            }
          });
      });
  }

  useEffect(() => {
    axios.get("http://localhost:9090").then(res => {
      console.log(res.status);
      if (res.status <= 200) {
        setCurrentData({
          temp: res.data.currentTemp,
          time: new Date(res.data.timestamp).toLocaleTimeString(),
          setTemp: res.data.currentSetpoint
        });
      }
    });
  }, []);

  return (
    <div className={styles["thermostat-wrapper"]}>
      <div className={styles["display"]}>
        <div>
          <div>{currentData.setTemp}</div>
          <div>{currentData.time}</div>
        </div>
        <div>{currentData.temp}</div>
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
