import styled from 'styled-components'

export const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;

  background-color: ${(props) => props.theme['gray-800']};

  max-width: calc(100vw - 2rem);
  width: 118.4rem;
  max-height: calc(100vh - 2rem);
  height: calc(100vh - 16rem);
  min-height: 56rem;

  margin: auto;
  padding: 4rem;

  border-radius: 8px;

  opacity: 0;

  animation:
    default-layout-fade-in 0.45s forwards,
    default-layout-slide-y-in 0.25s forwards;

  @keyframes default-layout-fade-in {
    100% {
      opacity: 1;
    }
  }

  @keyframes default-layout-slide-y-in {
    0% {
      transform: translateY(-10vh);
    }

    100% {
      transform: translateY(0);
    }
  }
`
