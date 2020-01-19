import React, { FunctionComponent, useEffect, useState, useRef } from "react";
import Axios from "../axios";
import { timer, from, interval } from "rxjs";
import { map, switchMap, skipWhile, filter, retryWhen, take } from "rxjs/operators";

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

  let fetchSubscription;

  const fetchTemp = () => {
    fetchSubscription = interval(2000)
      .pipe(
        filter(() => updatingValue.current === false),
        switchMap(()=>Axios.get<TempData>("/")),
        map((response)=>{
          if(response.status > 200){
            console.log('map', response)
            throw { error : 'error' };
          } else {
          return response;
        }
        }),
        retryWhen((errors)=> {
          console.log('error', errors.pipe(take(10)))
          return errors
        }))
      .subscribe(res => {
        setCurrentData({
          currentTemp: res.data.currentTemp,
          timestamp: new Date(res.data.timestamp).toLocaleTimeString(),
          currentSetpoint: res.data.currentSetpoint
        });
      });
  };

  let incrementTimeout;
  let decrementTimeout;

  const incrementTemp = () => {
    if (incrementTimeout) {
      console.log(clearTimeout);
      clearTimeout(incrementTimeout);
    }
    incrementTimeout = setTimeout(() => {
      console.log("set temps");
      updatingValue.current = true;
    }, 500);

    // count final set temp with a debounce
    // after debounce then set temp via api
    //
  };
  const decrementTemp = () => {
    if (decrementTimeout) {
      console.log(clearTimeout);
      clearTimeout(decrementTimeout);
    }
    decrementTimeout = setTimeout(() => {
      console.log("- set temps");
    }, 500);
  };

  useEffect(() => {
    fetchTemp();
    return () => fetchSubscription.unsubscribe();
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
        <Button onClick={incrementTemp}>+</Button>
      </div>
      <div className={styles["button-right"]}>
        <Button onClick={decrementTemp}>-</Button>
      </div>
    </div>
  );
};

export default Thermostat;
