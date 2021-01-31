import styled from 'styled-components';

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const FormField = styled.div`
  display: flex;
  flex-direction: column;

  & + & {
    margin-top: 22px;
  }
`;

export const Label = styled.label`
  font-size: 1.1rem;
  color: ${(t) => t.theme.foreground};
  text-transform: capitalize;
  display: block;
  margin-bottom: 5px;
  transition: all 0.4s ease;
`;

export const Input = styled.input`
  outline: none;
  margin: 0;
  border: none;
  line-height: 3rem;
  background: ${(t) => t.theme.surface};
  box-shadow: inset 0px 1px 3px 0px rgba(0, 0, 0, 0.08);
  border-radius: 5px;
  padding: 0 20px;
  height: 2.5em;
  font-size: 1.2rem;
  color: ${(t) => t.theme.foreground};
`;

export const TextArea = styled.textarea`
  outline: none;
  margin: 0;
  border: none;
  line-height: 3rem;
  resize: vertical;
  background: ${(t) => t.theme.surface};
  box-shadow: inset 0px 1px 3px 0px rgba(0, 0, 0, 0.08);
  border-radius: 5px;
  padding: 0 20px;
  font-size: 1.2rem;
  color: ${(t) => t.theme.foreground};
`;

export const Select = styled.select`
  outline: none;
  margin: 0;
  border: none;
  line-height: 3rem;
  background: ${(t) => t.theme.surface};
  box-shadow: inset 0px 1px 3px 0px rgba(0, 0, 0, 0.08);
  border-radius: 5px;
  padding: 0 20px;
  height: 2.5em;
  font-size: 1.2rem;
  color: ${(t) => t.theme.foreground};
`;

export const FieldError = styled.div`
  color: ${(t) => t.theme.warning.surface};
  font-size: 0.8rem;
  display: block;
`;
