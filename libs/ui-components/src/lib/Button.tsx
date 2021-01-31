import styled, { css } from 'styled-components';
import { ThemeColorOptions } from './Theme';

export const Button = styled.button<ThemeColorOptions>`
  margin-top: 22px;
  outline: none;
  border: none;
  display: inline-block;
  line-height: 50px;
  padding: 0 50px;
  transition: all 0.4s ease;
  cursor: pointer;
  font-size: 18px;
  border-radius: 5px;

  ${(p) => ButtonTheme(p.theme)}

  &:hover,
  &:focus,
  &:active {
    filter: brightness(1.3);
  }

  ${(p) => p.primary && ButtonTheme(p.theme.primary)}

  ${(p) => p.accent && ButtonTheme(p.theme.accent)}

  ${(p) => p.warning && ButtonTheme(p.theme.warning)}

  ${(p) =>
    p.disabled &&
    css`
      filter: brightness(0.75);
    `}
`;

export const IconButton = styled.button<ThemeColorOptions>`
  cursor: pointer;
  outline: none;
  line-height: 1.5;
  border-radius: 0.55rem;
  display: flex;
  font-weight: 400;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  letter-spacing: 0.025em;
  font-size: 1rem;
  position: relative;
  width: 2.5rem;
  height: 2.5rem;
  background-color: #ffffff;
  border: 0.0625rem solid;
  border-color: #e8e9eb;
  box-shadow: 3px 3px 6px #b8b9be, -3px -3px 6px #fff;

  ${(p) => IconButtonStates(p.theme.foreground)}

  ${(p) => p.primary && IconButtonStates(p.theme.primary.surface)}

  ${(p) => p.accent && IconButtonStates(p.theme.accent.surface)}

  ${(p) => p.warning && IconButtonStates(p.theme.warning.surface)}

  ${(p) =>
    p.disabled &&
    css`
      filter: brightness(0.75);
      box-shadow: none;
    `}
`;

const ButtonTheme = ({ surface, foreground }: any) => {
  return css`
    background: ${surface};
    color: ${foreground};
  `;
};

const IconButtonStates = (color: any) => {
  return css`
    color: ${color};
    &:enabled:hover,
    &:enabled:focus,
    &:enabled:active {
      color: ${color};
      box-shadow: inset 2px 2px 5px #b8b9be, inset -3px -3px 7px #fff;
      background-color: #fafafa;
      border-color: #d1d9e6;
    }
  `;
};
