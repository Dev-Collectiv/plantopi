import styles from './Dashboard.module.scss';
import React, { useEffect, useState } from 'react';

import { SocketContext, socket } from 'context/socket';

import { apiUser } from 'services/apiUser/apiUser';
import { apiArea } from 'services/apiArea/apiArea';
import { apiControllers } from 'services/apiControllers/apiControllers';
import { apiSensors } from 'services/apiSensors/apiSensors';

import { IGetUser } from 'types/userInterfaces';
import { IAddArea, IGetArea } from 'types/areaInterfaces';
import { IGetControllers } from 'types/controllersInterfaces';
import { IGetSensors } from 'types/sensorsInterfaces';

import DashboardIllustration from './DashboardIllustration/DashboardIllustration';
import DashboardInfo from './DashboardInfo/DashboardInfo';
import AreaPanel from 'components/AreaPanel/AreaPanel';

const Dashboard = () => {
  const [users, setUsers] = useState<IGetUser[]>([]);
  const [areas, setAreas] = useState<IGetArea[]>([]);
  const [selectedArea, setSelectedArea] = useState<number>(0);
  const [controllers, setControllers] = useState<IGetControllers[]>([]);
  const [sensors, setSensors] = useState<IGetSensors[]>([]);

  useEffect(() => {
    apiUser.getUser().then((user) => {
      setUsers(user);
    });

    apiArea.getAreas().then((area) => {
      setAreas(area);
    });

    apiControllers.getControllers().then((controller) => {
      setControllers(controller);
    });

    apiSensors.getSensors().then((sensor) => {
      setSensors(sensor);
    });
  }, []);

  const addingArea = (area: IAddArea): void => {
    apiArea.postArea(area).then((area) => {
      setAreas((prevAreas: any) => [...prevAreas, area]);
    });
  };

  const deleteArea = (id: number): void => {
    apiArea.deleteArea(id);
    let areasfiltered: IGetArea[] = [];
    areas.map((el: IGetArea) => {
      if (el.id !== id) areasfiltered.push(el);
    });
    setAreas(areasfiltered);
  };

  return (
    <SocketContext.Provider value={socket}>
      <div className={styles.container}>
        {/* TODO controllerId={areas[selectedArea].controllers[0].id} type issue */}
        <DashboardIllustration controllerId="pump1" />
        {/* TODO area={areas[selectedArea]} */}
        <DashboardInfo area={areas && areas[0]} />
        {/* TODO user={users[selectedUser].id} */}
        <AreaPanel user="0" areas={areas} addingArea={addingArea} deleteArea={deleteArea} />
      </div>
    </SocketContext.Provider>
  );
};
export default Dashboard;
