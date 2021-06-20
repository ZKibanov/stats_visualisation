import React, { FC, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import Button from '@material-ui/core/Button';
import { ShortCountryInfo } from '../types';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary'
import classes from './Card.module.scss';


interface CardProps {
  name: string;
  regionInfo: ShortCountryInfo[];
}

const Card: FC<CardProps> = (props: CardProps) => {
  const { regionInfo, name } = props;
  const [mainData, setMainData] = useState(regionInfo);
  const labels = mainData.map((el) => el.name);
  const populationQuantity = mainData.map((el) => el.population);
  const [order, setOrder] = useState('name');

  const data = {
    labels,
    datasets: [
      {
        label: 'Populatuon',
        data: populationQuantity,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: 'y',
    // Elements options apply to all of the options unless overridden in a dataset
    // In this case, we are setting the border of each horizontal bar to be 2px wide
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: name,
      },
    },
  };

  const sortData = () => {
    if (order === 'name') {
      setMainData([...mainData].sort(byField('population')));
      setOrder('population');
    } else {
      setMainData([...mainData].sort(byField('name')));
      setOrder('name');
    }
  };
  return (
    <ErrorBoundary>
    <div className={classes.card}>
      <Bar className={classes.bar} type="bar" data={data} options={options} />
      <Button variant="contained" color="primary" onClick={sortData}>
  Сортировка
</Button>
    </div>
    </ErrorBoundary>
  );
};

export default Card;

function byField(field: 'name' | 'population') {
  return (a: ShortCountryInfo, b: ShortCountryInfo) =>
    a[field] > b[field] ? 1 : -1;
}
