import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { useAppDispatch } from '../hook';

import { Link } from 'react-router-dom';
import { Container } from './Container';


import { clearControls } from '../features/controls/controlsSlice'
import ThemeSwitcher from '../features/theme/ThemeSwitcher';

const HeaderEl = styled.header`
  box-shadow: var(--shadow);
  background-color: var(--colors-ui-base);
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 0;
`;

const Title = styled(Link).attrs({
  to: '/',
})`
  color: var(--colors-text);
  font-size: var(--fs-sm);
  text-decoration: none;
  font-weight: var(--fw-bold);
`;

export const Header: FunctionComponent = () => {
  const dispatch = useAppDispatch();

  const handleClear = () => {
    dispatch(clearControls());
  }

  return (
    <HeaderEl>
      <Container>
        <Wrapper>
          <Title
            onClick={handleClear}
          >
            Where is the world?
          </Title>
          <ThemeSwitcher />
        </Wrapper>
      </Container>
    </HeaderEl>
  );
};
