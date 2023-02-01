import React, { useEffect, FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';

import { loadCountries, selectVisibleCountries, selectCountriesInfo } from './countriesSlice';
import { selectControls } from '../controls/controlsSlice';
import { RootState, } from '../../store';
import { useAppDispatch, useAppSelector } from '../../hook';

import { List } from '../../components/List';
import { Card } from '../../components/Card';

const CountryList: FunctionComponent = () => {
    const navigate = useNavigate();

    const countriesInfo = useAppSelector(selectCountriesInfo);
    const { search, region } = useAppSelector(selectControls);
    const countries = useAppSelector((state: RootState) => selectVisibleCountries(state, { search, region }));

    const { status, qty, error } = countriesInfo;

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!qty) {
            dispatch(loadCountries());
        }
    }, [dispatch, qty]);

    const list = countries.length > 0
        ? (
            <List>
                    {countries.map((c) => {
                    const countryInfo = {
                        img: c.flags.png,
                        name: c.name,
                        info: [
                        {
                            title: 'Population',
                            description: c.population.toLocaleString(),
                        },
                        {
                            title: 'Region',
                            description: c.region,
                        },
                        {
                            title: 'Capital',
                            description: c.capital,
                        },
                        ],
                    };

                    return (
                        <Card
                        key={c.name}
                        onClick={() => navigate(`/country/${c.name}`)}
                        {...countryInfo}
                        />
                    );
                    })}
                </List>
        ) : (<h2>No countries found</h2>)

    return (
        <>
            {error && <h2>{error}</h2> }
            {status === 'loading' && <h2>Data is loading</h2>}

            {status === 'received' && list}
        </>
    )
}

export default CountryList;
