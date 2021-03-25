import style from './DashboardInfo.module.scss';

const DashboardInfo: React.FC = () => {
  return (
    <div className={style.container}>
      <div className={style.gridContainer}>
        <div className={`${style.smallFirst} ${style.card} ${style.smallCard}`}>
          <h2>25%</h2>
          <p>Humidity</p>
        </div>

        <div className={`${style.smallSecond} ${style.card} ${style.smallCard}`}>
          <h2>30ºC</h2>
          <p>temperature</p>
        </div>

        <div className={`${style.card} ${style.bigCard}`}>
          {/* <img
          // src="https://png.pngtree.com/png-vector/20190223/ourlarge/pngtree-charts-glyph-black-icon-png-image_691516.jpg"
          alt=""
          className={style.chart}
        /> */}
        </div>
      </div>
    </div>
  );
};
export default DashboardInfo;
