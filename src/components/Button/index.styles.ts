import styled from 'styled-components'

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success'

interface ButtonContainerProps {
  variant: ButtonVariant
}

export const ButtonContainer = styled.button<ButtonContainerProps>`
  width: 10rem;
  height: 4rem;

  border: 0;
  border-radius: 4px;

  margin: 8px;

  background-color: ${(p) => p.theme['green-700']};
  color: ${(p) => p.theme.white};
`
