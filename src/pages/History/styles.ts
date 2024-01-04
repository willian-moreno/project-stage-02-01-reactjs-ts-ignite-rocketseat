import styled from 'styled-components'

/** ------------- HistoryContainer ------------- */
export const HistoryContainer = styled.main`
  display: flex;
  flex-direction: column;
  flex: 1;

  padding: 5.6rem;

  h1 {
    font-size: 2.4rem;
    color: ${(props) => props.theme['gray-100']};
  }
`

/** ------------- HistoryList ------------- */
export const HistoryList = styled.div`
  flex: 1;

  max-height: calc(100vh - 42rem);

  margin-top: 3.2rem;

  overflow: auto;

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    background: ${(props) => props.theme['gray-800']};
  }

  &::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme['gray-300']};
    border: 4px solid ${(props) => props.theme['gray-800']};
    border-radius: 2px;
  }

  table {
    width: 100%;
    min-width: 60rem;

    border-collapse: collapse;

    th {
      background-color: ${(props) => props.theme['gray-600']};
      color: ${(props) => props.theme['gray-100']};

      padding: 1.6rem;

      text-align: left;
      font-size: 1.4rem;
      line-height: 1.6;

      &:first-child {
        border-top-left-radius: 8px;
        padding-left: 2.4rem;
      }

      &:last-child {
        border-top-right-radius: 8px;
        padding-right: 2.4rem;
      }
    }

    td {
      background-color: ${(props) => props.theme['gray-700']};

      border-top: 4px solid ${(props) => props.theme['gray-800']};

      padding: 1.6rem;

      font-size: 1.4rem;
      line-height: 1.6;

      &:first-child {
        width: 50%;
        padding-left: 2.4rem;
      }

      &:last-child {
        padding-right: 2.4rem;
      }
    }
  }
`

/** ------------- Status ------------- */
export type StatusType = 'in-progress' | 'interrupted' | 'concluded'

interface StatusProps {
  type: StatusType
}

const statusConfig = {
  'in-progress': {
    bgColor: 'yellow-500',
    content: 'Em andamento',
  },
  interrupted: {
    bgColor: 'red-500',
    content: 'Interrompido',
  },
  concluded: {
    bgColor: 'green-500',
    content: 'Concluído',
  },
} as Record<StatusType, { bgColor: string; content: string }>

export const Status = styled.span<StatusProps>`
  &[type='${(props) => props.type}'] {
    display: flex;
    align-items: center;
    gap: 0.8rem;

    position: relative;

    white-space: nowrap;

    &::before {
      content: '';

      position: relative;

      width: 0.8rem;
      height: 0.8rem;

      border-radius: 50%;

      background-color: ${(props) =>
        props.theme[statusConfig[props.type].bgColor]};
    }

    &::after {
      content: '${(props) => statusConfig[props.type].content}';

      position: relative;
    }
  }
`
