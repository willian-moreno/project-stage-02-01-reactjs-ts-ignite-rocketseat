import styled from 'styled-components'

export const FormContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  flex-wrap: wrap !important;

  width: 100%;

  color: ${(props) => props.theme['gray-100']};

  font-size: 1.8rem;
  font-weight: 700;
`

const BaseInput = styled.input`
  background-color: transparent;
  color: ${(props) => props.theme['gray-100']};

  height: 4rem;
  padding: 0 0.8rem;

  border: 0;
  border-bottom: 2px solid ${(props) => props.theme['gray-500']};

  font-weight: 700;
  font-size: 1.8rem;

  &:focus {
    box-shadow: none;
    border-color: ${(props) => props.theme['green-500']};
  }

  &::placeholder {
    color: ${(props) => props.theme['gray-500']};
  }
`

export const TaskInput = styled(BaseInput)`
  flex: 1;

  &::-webkit-calendar-picker-indicator {
    display: none !important;
  }

  &:disabled {
    cursor: not-allowed;
  }
`

export const MinutesAmountInput = styled(BaseInput)`
  width: 6.4rem;

  &:disabled {
    cursor: not-allowed;
  }
`
