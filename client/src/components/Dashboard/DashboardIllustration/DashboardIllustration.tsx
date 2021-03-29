import React, { useEffect, useState, useContext } from 'react';
import { SocketContext } from 'context/socket';
import Select from 'components/Select/Select';
import { gsap } from 'gsap';

import styles from './DashboardIllustration.module.scss';

import { Drop, Plant } from 'assets';

const durationOptions = Array(60)
  .fill(null)
  .map((_, idx) => idx + 1);

const DashboardIllustration: React.FC<{ controllerId: string }> = (props) => {
  const socket = useContext(SocketContext);
  const { controllerId } = props;
  const [duration, setDuration] = useState<number | string>(5);

  let [irrigating, setIrrigating] = useState<boolean>(false);

  function handleDuration(label: string, value: number | string) {
    setDuration(value);
  }

  function handleIrrigate(e: React.FormEvent) {
    e.preventDefault();
    socket.emit('action', { id: controllerId, action: 'on', duration: duration });
    setIrrigating(true); // TODO receive web socket with response before changing 'irrigating' variable
  }

  function abortIrrigation() {
    socket.emit('action', { id: controllerId, action: 'off', duration: 0 });
    setIrrigating(false); // TODO receive web socket with response before changing 'irrigating' variable
  }

  // useEffect(() => {
  //   gsap.to('.top-dark-leaves', {
  //     duration: 2,
  //     transformOrigin: 'center center',
  //     rotate: '5deg',
  //     x: 7,
  //     yoyo: true,
  //     repeat: -1,
  //     ease: 'Sine.easeInOut'
  //   });

  //   gsap.to('.top-light-leaves', {
  //     duration: 2,
  //     transformOrigin: 'center center',
  //     rotate: '-3deg',
  //     x: 4,
  //     yoyo: true,
  //     repeat: -1,
  //     ease: 'Sine.easeInOut'
  //   });

  //   gsap.to('.trunk', {
  //     duration: 2,
  //     transformOrigin: 'center bottom',
  //     rotate: '2deg',
  //     yoyo: true,
  //     repeat: -1,
  //     ease: 'Sine.easeInOut'
  //   });

  //   return () => {
  //     gsap.killTweensOf('*');
  //   };
  // }, []);

  useEffect(() => {
    if (irrigating) {
      gsap.fromTo(
        '.drop',
        {
          stagger: 0.5,
          y: -400,
          opacity: 0.8
        },
        {
          stagger: 0.5,
          duration: 2,
          repeat: -1,
          y: 400,
          opacity: 0,
          ease: 'Power1.easeIn'
        }
      );
    } else {
      gsap.set('.drop', { opacity: 0 });
    }

    return () => {
      gsap.killTweensOf('.drop');
    };
  }, [irrigating]);

  return (
    <div className={styles.container}>
      <div className={styles.illustrationContainer}>
        <Plant className={styles.plant} />
      </div>

      <div className={styles.irrigateOptionsContainer}>
        <div className={styles.durationContainer}>
          <label htmlFor="duration" className={styles.label}>
            DURATION
          </label>
          <p>|</p>
          <Select options={durationOptions} onChangeFn={handleDuration} label="duration" initialOption={duration} />
        </div>

        <div onClick={handleIrrigate} className={styles.irrigateButton}>
          <Drop className={styles.svg} />
        </div>
        {/* <Stop onClick={abortIrrigation} className={`${styles.button} ${styles.svg}`} /> */}
      </div>
    </div>
  );
};

export default DashboardIllustration;
