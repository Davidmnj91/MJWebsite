import styled, { css, keyframes } from 'styled-components';
import { ThemeColorOptions } from './Theme';

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Spinner = styled.div<ThemeColorOptions>`
  animation: ${rotate360} 1s linear infinite;
  transform: translateZ(0);

  border-top: 2px solid ${(p) => p.theme.surface};
  border-right: 2px solid ${(p) => p.theme.surface};
  border-bottom: 2px solid ${(p) => p.theme.surface};
  border-left: 4px solid ${(p) => p.theme.foreground};
  background: transparent;
  width: 24px;
  height: 24px;
  border-radius: 50%;

  ${(p) =>
    p.primary &&
    css`
      border-top: 2px solid ${p.theme.primary.surface};
      border-right: 2px solid ${p.theme.primary.surface};
      border-bottom: 2px solid ${p.theme.primary.surface};
      border-left: 4px solid ${(p) => p.theme.primary.foreground};
    `}

  ${(p) =>
    p.accent &&
    css`
      border-top: 2px solid ${p.theme.accent.surface};
      border-right: 2px solid ${p.theme.accent.surface};
      border-bottom: 2px solid ${p.theme.accent.surface};
      border-left: 4px solid ${(p) => p.theme.accent.foreground};
    `}

  ${(p) =>
    p.warning &&
    css`
      border-top: 2px solid ${p.theme.warningun.surface};
      border-right: 2px solid ${p.theme.warningun.surface};
      border-bottom: 2px solid ${p.theme.warningun.surface};
      border-left: 4px solid ${(p) => p.theme.warningun.foreground};
    `}
`;
