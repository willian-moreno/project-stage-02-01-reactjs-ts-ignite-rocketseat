import { HandPalm, Play } from 'phosphor-react'
import { ChangeEvent, FormEvent, useState } from 'react'
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
  const [task, setTask] = useState('')
  const [minutesAmount, setMinutesAmount] = useState(0)
  const [countdownStarted, setCountdownStarted] = useState(true)

  const isCountdownDisabled = [!task, minutesAmount < 0].includes(true)

  function handleCountdown(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
  }

  function handleNewTask(event: ChangeEvent<HTMLInputElement>) {
    setTask(event.target.value)
  }

  function handleNewMinutesAmount(event: ChangeEvent<HTMLInputElement>) {
    const value = +event.target.value
    const newValue = value > 60 ? 60 : value < 0 ? 0 : value

    setMinutesAmount(newValue)
  }

  function handleToggleCountdownStatus() {
    setCountdownStarted((state) => !state)
  }

  return (
    <HomeContainer>
      <form onSubmit={handleCountdown}>
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            type="text"
            id="task"
            value={task}
            placeholder="Dê um nome para o seu projeto"
            list="task-suggestions"
            onChange={handleNewTask}
          />

          <datalist id="task-suggestions">
            <option value="Exemplo" />
          </datalist>

          <label htmlFor="">durante</label>
          <MinutesAmountInput
            type="number"
            id="minutesAmount"
            value={minutesAmount}
            placeholder="00"
            min={5}
            max={60}
            step={5}
            onChange={handleNewMinutesAmount}
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
            $variant="primary"
            disabled={isCountdownDisabled}
            onClick={handleToggleCountdownStatus}
          >
            <Play size={24} />
            Começar
          </CountdownButton>
        ) : (
          <CountdownButton
            type="submit"
            $variant="danger"
            onClick={handleToggleCountdownStatus}
          >
            <HandPalm size={24} />
            Interromper
          </CountdownButton>
        )}
      </form>
    </HomeContainer>
  )
}
