import React, { FunctionComponent } from 'react';

import { Controls } from '../features/controls/Controls';
import CountryList from '../features/countries/CountryList';

const HomePage: FunctionComponent = () => {
  return (
    <>
      <Controls />
      <CountryList />
    </>
  );
};

export default HomePage;
