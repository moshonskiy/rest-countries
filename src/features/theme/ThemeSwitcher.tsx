import React, { useEffect, FunctionComponent } from 'react';
import styled from 'styled-components';

import { IoMoon, IoMoonOutline } from 'react-icons/io5';
import { useAppDispatch, useAppSelector } from '../../hook';

import { setTheme } from './themeSlice';
import { RootState } from '../../store';

const ModeSwitcher = styled.div`
  color: var(--colors-text);
  font-size: var(--fs-sm);
  cursor: pointer;
  // font-weight: var(--fw-bold);
  text-transform: capitalize;
`;

const ThemeSwitcher: FunctionComponent = () => {
    const theme = useAppSelector((state: RootState) => state.theme);
    const dispatch = useAppDispatch();

    const toggleTheme = () => {
        dispatch(setTheme(theme === 'light' ? 'dark' : 'light'));
    }

    useEffect(() => {
        document.body.setAttribute('data-theme', theme);
    }, [theme]);

    return (
        <ModeSwitcher
            onClick={toggleTheme}
        >
            {theme === 'light' ? (
                <IoMoonOutline size="14px" />
            ) : (
                <IoMoon size="14px" />
            )}{' '}
            <span style={{ marginLeft: '0.75rem' }}>{theme} Theme</span>
        </ModeSwitcher>
    )
}

export default ThemeSwitcher;
