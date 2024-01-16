import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useContext } from 'react'
import { CyclesContext } from '../../contexts/CyclesContextProvider'
import { Cycle } from '../../reducers/cycles/reducer'
import { HistoryContainer, HistoryList, Status, StatusType } from './styles'

export function History() {
  const { cycles } = useContext(CyclesContext)
  const historyCycles = cycles.map((cycle) => {
    return {
      status: defineCycleStatus(cycle),
      startedDateDistanceToNow: startedDateDistanceToNow(cycle.startedDate),
      ...cycle,
    }
  })

  function startedDateDistanceToNow(startedDate: Date) {
    return formatDistanceToNow(new Date(startedDate), {
      locale: ptBR,
      addSuffix: true,
    })
  }

  function defineCycleStatus(cycle: Cycle): StatusType {
    const { finishedDate, interruptedDate } = cycle

    if (!finishedDate && !interruptedDate) {
      return 'in-progress'
    }

    if (interruptedDate) {
      return 'interrupted'
    }

    return 'concluded'
  }

  return (
    <HistoryContainer>
      <h1>Meu histórico</h1>
      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {historyCycles.map(
              ({
                id,
                task,
                minutesAmount,
                startedDateDistanceToNow,
                status,
              }) => {
                return (
                  <tr key={id}>
                    <td>{task}</td>
                    <td>{minutesAmount} minutos</td>
                    <td>{startedDateDistanceToNow}</td>
                    <td>
                      <Status $type={status} />
                    </td>
                  </tr>
                )
              },
            )}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}
