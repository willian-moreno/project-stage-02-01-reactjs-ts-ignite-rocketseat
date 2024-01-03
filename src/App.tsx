import { ThemeProvider } from 'styled-components'
import { Button } from './components/Button'
import { GlobalStyle } from './styles/global'
import { defaultTheme } from './styles/themes/default'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Button variant="primary">Botão</Button>
      <Button variant="secondary">Botão</Button>
      <Button variant="success">Botão</Button>
      <Button variant="danger">Botão</Button>
      <Button>Botão</Button>

      <GlobalStyle />
    </ThemeProvider>
  )
}
