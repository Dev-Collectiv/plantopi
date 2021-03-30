import React from 'react';
import { IAddArea, IGetArea } from 'types/areaInterfaces';
import SocketIOClient from 'socket.io-client';

import TopCard from 'components/Cards/TopCard/TopCard';
import BottomCard from 'components/Cards/BottomCard/BottomCard';
import SensorCard from 'components/Cards/SensorCard/SensorCard';
import styles from './DashboardInfo.module.scss';
import ScheduleCard from 'components/Cards/ScheduleCard/ScheduleCard';
import { fetchCurrentWeather } from 'services/apiWeather/apiWeather';
import { useEffect, useState } from 'react';
import { ICurrentWeather } from 'types/weatherInterfaces';
import { SocketContext, socket } from 'context/socket';
import { ISensorReading } from 'types/sensorsInterfaces';

const DashboardInfo: React.FC<{selectedArea: IGetArea}> = ({ selectedArea }) => {
  let [currentWeather, setCurrentWeather] = useState<ICurrentWeather>();
  let [currentHumidity, setCurrentHumidity] = useState<number>(0);

  // AREA ID HARDCODED IN CURRENT WEATHER FETCH BELOW - SWAP WITH AREAID LATER
  console.log('selectedArea',selectedArea );
  useEffect(() => {
    const initializeWeather = async () => {
      try {
        const weather = await fetchCurrentWeather('1');
        if (weather.cod === 401) throw new Error();
        setCurrentWeather(weather);
      } catch (err) {
        console.log('Could not initialize current weather.');
      }
    };

    socket.on('sensors', (sensorData: ISensorReading) => setCurrentHumidity(sensorData.value));

    initializeWeather();
  }, []);

  return (
    <div className={styles.container}>
      <TopCard>
        {/*TODO <SensorCard id={area.sensors[0].id} name={area.sensors[0].name} type={area.sensors[0].type} reading={area.sensors[0].value} /> */}
        <SensorCard id="1" name="Humidity" type="humidity" reading={currentHumidity}/>
        {/*TODO <SensorCard id={area.sensors[1].id} name={area.sensors[1].name} type={area.sensors[1].type} reading={area.sensors[1].value} /> */}


        {selectedArea && <h1>{selectedArea.name}</h1>}

        <SensorCard id="2" name="Temperature" type="temperature" reading={Math.round(currentWeather?.current.temp)} />
      </TopCard>
      <BottomCard>
        {/* TODO controllerId={areas[selectedArea].controllers[0].id} type issue */}
        <ScheduleCard controllerId="1" controllerTopic="pump1" currentWeather={currentWeather} />
      </BottomCard>
    </div>
  );
};

export default DashboardInfo;