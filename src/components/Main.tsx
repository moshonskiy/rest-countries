import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { Container } from './Container';

const Wrapper = styled.main`
  padding: 2rem 0;

  @media (min-width: 767px) {
    padding: 4rem 0;
  }
`;

interface MainProps {
  children: React.ReactNode;
}

export const Main: FunctionComponent<MainProps> = ({ children }) => {
  return (
    <Wrapper>
      <Container>{children}</Container>
    </Wrapper>
  );
};
