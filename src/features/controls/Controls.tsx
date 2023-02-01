import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

import { useAppDispatch, useAppSelector } from '../../hook';
import { Search } from '../../components/Search';
import { CustomSelect } from './CustomSelect';

import { selectRegion, setRegion, ControlsInitialState } from './controlsSlice'

interface IOption {
  value: string;
  label: string;
}

const optionsMap: Record<string, IOption> = {
  'Africa': { value: 'Africa', label: 'Africa' },
  'America': { value: 'America', label: 'America' },
  'Asia': { value: 'Asia', label: 'Asia' },
  'Europe': { value: 'Europe', label: 'Europe' },
  'Oceania': { value: 'Oceania', label: 'Oceania' },
}
const options = Object.values(optionsMap);

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media (min-width: 767px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

export const Controls: FunctionComponent = () => {
  const dispatch = useAppDispatch();

  const region = useAppSelector(selectRegion);

  const handleRegion = (reg: IOption) => {
    dispatch(setRegion(reg?.value || ''))
  }

  return (
    <Wrapper>
      <Search />
      <CustomSelect
        options={options}
        placeholder="Filter by Region"
        isClearable
        isSearchable={false}
        value={optionsMap[region] || ''}
        onChange={handleRegion}
      />
    </Wrapper>
  );
};
