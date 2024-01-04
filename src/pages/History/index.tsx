import { HistoryContainer, HistoryList, Status } from './styles'

export function History() {
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
            {[...Array(10)].map((_, index) => {
              return (
                <tr key={index}>
                  <td>Tarefa</td>
                  <td>20 minutos</td>
                  <td>Há cerca de 2 min</td>
                  <td>
                    <Status type="in-progress" />
                    <Status type="concluded" />
                    <Status type="interrupted" />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}
