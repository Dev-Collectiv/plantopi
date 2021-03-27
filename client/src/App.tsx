import styles from './App.module.scss';
import React, { useEffect, useState } from 'react';
import NavBar from 'components/NavBar/NavBar';
import Dashboard from 'components/Dashboard/Dashboard';
import DetailBar from 'components/DetailBar/DetailBar';
import AreaPanel from 'components/AreaPanel/AreaPanel';

import { apiUser } from './services/apiUser/apiUser';
import { apiArea } from './services/apiArea/apiArea';
import { apiControllers } from './services/apiControllers/apiControllers';
import { apiSensors } from './services/apiSensors/apiSensors';

import { IGetUser } from './types/userInterfaces';
import { IGetArea } from './types/areaInterfaces';
import { IGetControllers } from './types/controllersInterfaces';
import { IGetSensors } from './types/sensorsInterfaces';

const App: React.FC = () => {
  const [users, setUsers] = useState<IGetUser[]>([]);
  const [areas, setAreas] = useState<IGetArea[]>([]);
  const [controllers, setControllers] = useState<IGetControllers[]>([]);
  const [sensors, setSensors] = useState<IGetSensors[]>([]);
 
  useEffect(() => {
    apiUser.getUser().then((user) => {
      setUsers(user);
    });
  }, []);

  useEffect(() => {
    apiArea.getArea().then((area) => {
      setAreas(area);
    });
  }, []);

  useEffect(() => {
    apiControllers.getControllers().then((controller) => {
      setControllers(controller);
    });
  }, []);

  useEffect(() => {
    apiSensors.getSensors().then((sensor) => {
      setSensors(sensor);
    });
  }, []);

  return (
    <div className={styles.container}>
      <NavBar />
      <Dashboard />
      <DetailBar />
      <AreaPanel />
    </div>
  );
};

export default App;
