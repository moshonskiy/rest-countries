import React, { useEffect, FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { NavigateFunction, useParams } from 'react-router-dom';
import { useAppDispatch } from '../../hook';

import { Info } from './Info';
import { loadCountryByName, clearDetails, selectDetails } from './detailsSlice';

interface CountryDetailsProps {
    navigate: NavigateFunction;
}

const CountryDetails: FunctionComponent<CountryDetailsProps> = ({ navigate }) => {
    const dispatch = useAppDispatch();
    const { name } = useParams();

    const { country, status, error } = useSelector(selectDetails);

    useEffect(() => {
        dispatch(loadCountryByName(name));

        return () => {
        dispatch(clearDetails());
        }
    }, [name, dispatch]);

    return (
        <>
            {status === 'loading' && <h2>loading...</h2>}
            {error && <h2>{error}</h2>}
            {country && <Info push={navigate} {...country} />}
        </>
    )
}

export default CountryDetails;
