import styled from 'styled-components'

export const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;

  background-color: ${(props) => props.theme['gray-800']};

  max-width: calc(100vw - 2rem);
  width: 118.4rem;
  max-height: calc(100vh - 2rem);
  height: calc(100vh - 16rem);

  margin: 8rem auto;
  padding: 4rem;

  border-radius: 8px;

  @media (max-width: 768px) {
    & {
      height: calc(100vh - 2rem);
      margin: 1rem auto;
    }
  }
`
