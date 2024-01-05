import styled from 'styled-components'

export const CountdownContainer = styled.div`
  display: flex;
  gap: 1.6rem;

  font-family: 'Roboto Mono', monospace, sans-serif;
  font-size: 16rem;
  line-height: 12.8rem;

  color: ${(props) => props.theme['gray-100']};

  span {
    background-color: ${(props) => props.theme['gray-700']};

    padding: 3.2rem 1.6rem;

    border-radius: 8px;
  }
`

export const Separator = styled.div`
  display: flex;
  justify-content: center;

  width: 6.4rem;

  padding: 3.2rem 0;

  color: ${(props) => props.theme['green-500']};

  overflow: hidden;
`
