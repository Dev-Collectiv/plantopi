import * as React from 'react';
import { useState, useEffect } from 'react';
import styles from './Days.module.scss';
import DayItem from './DayItem/DayItem';
import { ICurrentWeather } from 'types/weatherInterfaces';
import { getWeatherForTheWeek } from './Days.helper';

export interface Props {
  activeDays: number[],
  daysInWeek: string[],
  handleSelectDayFn: (idx: number, active: boolean) => void,
  currentWeather?: ICurrentWeather
}

const Day: React.FC<Props> = ({daysInWeek, activeDays, handleSelectDayFn, currentWeather}) => {
  useEffect(() => {
    async function logggieeeto (currentWeather: ICurrentWeather) {
      const weatherForTheWeek = await getWeatherForTheWeek(currentWeather);
      console.log(weatherForTheWeek);
      return weatherForTheWeek;
    }
    if (currentWeather) logggieeeto(currentWeather);
    console.log('neler ölüyö yea');

  }, []);

  return (
    <div className={styles.dayContainer}>
      {daysInWeek.map((day, idx) => {
        const active: boolean = activeDays.includes(idx);
        return (<DayItem active={active} day={day} idx={idx} handleSelectDayFn={handleSelectDayFn}/>);
      })}
    </div>
  );
};

export default Day;