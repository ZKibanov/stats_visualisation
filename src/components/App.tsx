import React, { useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useAppSelector } from '../hooks';
import apiService from '../api/apiService';
import Card from './Card';

import './App.css';

function App() {
  const isLoading = useAppSelector((state) => state.info.isLoading);
  const countries = useAppSelector((state) => state.data.countries);

  useEffect(() => {
    apiService();
  }, []);
  const content = [];
  for (const key in countries) {
    if (Object.prototype.hasOwnProperty.call(countries, key)) {
      content.push(<Card key={key} regionInfo={countries[key]} name={key} />);
    }
  }
  return (
    <div className="App">
      {isLoading && <CircularProgress />}
      {content}
    </div>
  );
}

export default App;
