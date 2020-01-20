import React, { FunctionComponent, useEffect, useState, useRef } from "react";
import Axios from "../axios";
import { timer, from, interval } from "rxjs";
import {
  map,
  switchMap,
  filter,
  retryWhen,
  take,
  retry
} from "rxjs/operators";

import Button from "../shared/elements/button/button";
import styles from "./thermostat.module.scss";

interface TempData {
  currentTemp: number;
  timestamp: Date;
  currentSetpoint: number;
}

interface LocalTempData extends Omit<TempData, "timestamp"> {
  timestamp: string;
}

const Thermostat: FunctionComponent = () => {
  const [currentData, setCurrentData] = useState<LocalTempData>({
    currentTemp: 0,
    timestamp: new Date(0).toLocaleTimeString(),
    currentSetpoint: 0
  });

  const updatingValue = useRef(false);
  const tempSetPoint = useRef(0);

  let fetchSubscription;
  let tempTimeout;

  // TODO: fix throw for retry on fail
  const fetchTemp = () => {
    fetchSubscription = interval(2000)
      .pipe(
        filter(() => updatingValue.current === false),
        switchMap(() => Axios.get<TempData>("/")),
        map(response => {
          if (response.status > 200) {
            console.log("map", response);
            throw { error: "error" };
          } else {
            return response;
          }
        }),
        retry()
      )
      .subscribe(res => {
        setCurrentData({
          currentTemp: res.data.currentTemp,
          timestamp: new Date(res.data.timestamp).toLocaleTimeString(),
          currentSetpoint: res.data.currentSetpoint
        });
        tempSetPoint.current = res.data.currentSetpoint;
      });
  };

  const updateTemp = (type: "increment" | "decrement" = "increment") => {
    tempSetPoint.current =
      type === "increment"
        ? (tempSetPoint.current += 0.5)
        : (tempSetPoint.current -= 0.5);

    if (tempTimeout) {
      clearTimeout(tempTimeout);
    }
    tempTimeout = setTimeout(() => {
      updatingValue.current = true;
      Axios.patch("", { currentSetpoint: tempSetPoint.current }).pipe(retry()).subscribe(
        () => {
          updatingValue.current = false;
        }
      );
    }, 1000);
  };

  useEffect(() => {
    fetchTemp();
    return () => fetchSubscription.unsubscribe();
  }, []);
  // TODO: Add user feedback for updating
  return (
    <div className={styles["thermostat-wrapper"]}>
      <div className={styles["display"]}>
        <div>
          <div>Target temperature: {currentData.currentSetpoint}°</div>
          <div>Last Updated: {currentData.timestamp}</div>
        </div>
        <div>Current temperature: {currentData.currentTemp}°</div>
      </div>
      <div className={styles["button-left"]}>
        <Button id="increment-button" disabled={currentData.currentTemp < 1} onClick={() => updateTemp("increment")}>+</Button>
      </div>
      <div className={styles["button-right"]}>
        <Button id="decrement-button" disabled={currentData.currentTemp < 1} onClick={() => updateTemp("decrement")}>-</Button>
      </div>
    </div>
  );
};

export default Thermostat;
