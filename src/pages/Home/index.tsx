import { HandPalm, Play } from 'phosphor-react'
import { FormEvent, useState } from 'react'
import {
  CountdownButton,
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  TaskInput,
} from './styles'

export function Home() {
  const [countdownStarted, setCountdownStarted] = useState(true)

  function handleToggleStowatchStatus() {
    setCountdownStarted((state) => !state)
  }

  function handleStowatch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
  }

  return (
    <HomeContainer>
      <form onSubmit={handleStowatch}>
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            type="text"
            id="task"
            placeholder="Dê um nome para o seu projeto"
            list="task-suggestions"
          />

          <datalist id="task-suggestions">
            <option value="Exemplo" />
          </datalist>

          <label htmlFor="">durante</label>
          <MinutesAmountInput
            type="number"
            id="minutesAmount"
            placeholder="00"
            min={5}
            max={60}
            step={5}
          />

          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        {countdownStarted ? (
          <CountdownButton
            type="submit"
            variant="primary"
            onClick={handleToggleStowatchStatus}
          >
            <Play size={24} />
            Começar
          </CountdownButton>
        ) : (
          <CountdownButton
            type="submit"
            variant="danger"
            onClick={handleToggleStowatchStatus}
          >
            <HandPalm size={24} />
            Interromper
          </CountdownButton>
        )}
      </form>
    </HomeContainer>
  )
}
