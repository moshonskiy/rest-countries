import React, { FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoArrowBack } from 'react-icons/io5';

import { Button } from '../components/Button';
import CountryDetails from '../features/details/CountryDetails';

const Details: FunctionComponent = () => {

  const navigate = useNavigate();

  return (
    <div>
      <Button onClick={() => navigate(-1)}>
        <IoArrowBack /> Back
      </Button>
      <CountryDetails navigate={navigate} />
    </div>
  );
};

export default Details;
