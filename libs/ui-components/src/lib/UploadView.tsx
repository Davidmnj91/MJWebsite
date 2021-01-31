import styled from 'styled-components';

export const UploadView = styled.div`
  margin: 1rem 0.5rem;
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  overflow-x: auto;

  > * + * {
    margin-left: 1rem;
  }
`;
