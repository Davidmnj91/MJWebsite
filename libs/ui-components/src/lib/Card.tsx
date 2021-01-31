import styled from 'styled-components';

export const Card = styled.div`
  overflow: hidden;
  width: 100%;
  min-width: 210px;
  padding: 10px;
  border-radius: 12px;
  background-color: ${(p) => p.theme.surface};
  box-shadow: 8px 8px 16px rgba(165, 177, 198, 0.8), -8px -8px 16px rgba(255, 255, 255, 0.8);
`;

export const CardHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 10px;
`;

export const CardHeading = styled.h1`
  margin: 0;
  font-size: 24px;
  color: ${(p) => p.theme.foreground};
  font-weight: bold;
  text-align: center;
`;

export const CardBody = styled.div`
  padding: 0 10px;
`;
