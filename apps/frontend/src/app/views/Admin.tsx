import React from 'react';
import styled from 'styled-components';
import CategoryAdmin from '../domain/Category/components/CategoryAdmin';
import ClientAdmin from '../domain/Client/components/ClientAdmin';
import ProjectAdmin from '../domain/Project/components/ProjectAdmin';

const Grid = styled.div`
  box-sizing: border-box;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;

  > * {
    padding: 10px;
  }
`;

const FullSizeContainer = styled.div`
  display: flex;
  flex-grow: 0;
  max-width: 100%;
  flex-basis: 100%;
`;
const HalfSizeContainer = styled.div`
  display: flex;
  flex-grow: 0;
  max-width: 50%;
  flex-basis: 50%;
`;

const Admin = () => {
  return (
    <div>
      <h1>Admin</h1>
      <Grid>
        <FullSizeContainer>
          <ProjectAdmin />
        </FullSizeContainer>
        <HalfSizeContainer>
          <ClientAdmin />
        </HalfSizeContainer>
        <HalfSizeContainer>
          <CategoryAdmin />
        </HalfSizeContainer>
      </Grid>
    </div>
  );
};

export default Admin;
