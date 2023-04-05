import AdminLayout from '../../components/admin-layout';
import {BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid} from 'recharts';
import {useState, useEffect} from 'react';
import {statistic} from '../../utils/services';
import checkRole from './../../utils/checkRole';
import {cssTransition} from 'react-toastify';
import css from './style.module.css';
import svg from '../../assets/svg';
const renderCustomBarLabel = ({payload, x, y, width, height, value}) => {
    return (
        <text x={x + width / 2} y={y} fill='#666' textAnchor='middle' dy={-6}>{`${(value / 1000000).toFixed(
            2,
        )}M`}</text>
    );
};
const renderCustomBarLabel2 = ({payload, x, y, width, height, value}) => {
    return <text x={x + width / 2} y={y} fill='#666' textAnchor='middle' dy={-6}>{`${value}`}</text>;
};

function getYear() {
    let rs = [];
    for (let index = 2000; index < 2050; index++) {
        rs.push(index);
    }
    return rs;
}
function Statistic() {
    checkRole();
    const [data, setData] = useState([]);
    const [year, setYear] = useState(2023);
    console.log(data);
    useEffect(() => {
        statistic(year).then((rs) => {
            setData(rs.data[0]);
        });
    }, []);
    const handleChangeYear = (e) => {
        setYear(e.target.value);
        statistic(e.target.value).then((rs) => {
            setData(rs.data[0]);
        });
    };
    return (
        <AdminLayout>
            <div className='col-wrapper flex-align-l'>
                <div>
                    <select value={year} onChange={handleChangeYear} className={css.select}>
                        {getYear().map((e) => {
                            return (
                                <option value={e} key={e}>
                                    {e}
                                </option>
                            );
                        })}
                    </select>
                </div>
                <div className={css['chart-container']}>
                    <h1>Doanh thu theo tháng:</h1>
                    {data.statisticRevenue && data.statisticDestination.length ? (
                        <BarChart
                            width={800}
                            height={250}
                            data={data.statisticRevenue}
                            margin={{top: 5, right: 20, left: 10, bottom: 5}}>
                            <XAxis dataKey='month' />
                            <YAxis />
                            <Tooltip />
                            <CartesianGrid stroke='#f5f5f5' />
                            <Bar dataKey='totalMoney' barSize={30} fill='#8884d8' label={renderCustomBarLabel} />
                        </BarChart>
                    ) : (
                        <p>'Không có dữ liệu!'</p>
                    )}
                </div>
                <div className={css['chart-container']}>
                    <h1>Lượt khách theo tháng:</h1>
                    {data.statisticDestination && data.statisticDestination.length ? (
                        <BarChart
                            width={800}
                            height={250}
                            data={data.statisticPerson}
                            margin={{top: 5, right: 20, left: 10, bottom: 5}}>
                            <XAxis dataKey='month' />
                            <YAxis />
                            <Tooltip />
                            <CartesianGrid stroke='#f5f5f5' />
                            <Bar dataKey='totalPerson' barSize={30} fill='#8884d8' label={renderCustomBarLabel2} />
                        </BarChart>
                    ) : (
                        <p>'Không có dữ liệu!'</p>
                    )}
                </div>
            </div>

            <div className={css['card-container']}>
                <h1>Top nơi nhiều người đi:</h1>
                {data.statisticDestination && data.statisticDestination.length
                    ? data.statisticDestination.map((e, i) => {
                          return (
                              <div className={css.card} key={i}>
                                  <p className={css.top}>Top {i + 1}</p>
                                  <div className='row-wrapper flex-align-l'>
                                      <img src={svg.destinationBlack} alt='' />
                                      <p className={css.destination}>{e.tourDestination}</p>
                                  </div>
                                  <div className='row-wrapper flex-align-l'>
                                      <img src={svg.groupPersonBlack} alt='' />
                                      Số người đi:
                                      <p className={css.quantity}>{e.quantity}</p>
                                  </div>
                              </div>
                          );
                      })
                    : 'Không có dữ liệu'}
            </div>
        </AdminLayout>
    );
}

export default Statistic;
