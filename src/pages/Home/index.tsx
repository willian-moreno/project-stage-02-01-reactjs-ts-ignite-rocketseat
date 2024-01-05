import { zodResolver } from '@hookform/resolvers/zod'
import { differenceInSeconds } from 'date-fns'
import { HandPalm, Play } from 'phosphor-react'
import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as zod from 'zod'
import {
  CountdownButton,
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  TaskInput,
} from './styles'

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe o nome da tarefa'),
  minutesAmount: zod
    .number()
    .min(5, 'O valor deve ser de no mínimo 5 minutos')
    .max(60, 'O valor deve ser no máximo 60 minutos'),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

type UpdateableCycleData = { interruptedDate?: Date; finishedDate?: Date }
type Cycle = {
  id: string
  statedDate: Date
} & UpdateableCycleData &
  NewCycleFormData

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 5,
    },
  })

  const inputTaskValue = watch('task')
  const inputMinutesAmountValue = watch('minutesAmount')

  const isSubmitDisabled =
    !inputTaskValue ||
    !inputMinutesAmountValue ||
    inputMinutesAmountValue < 5 ||
    inputMinutesAmountValue > 60

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  const resetCountdown = useCallback(() => {
    document.title = 'Ignite Timer'

    setAmountSecondsPassed(0)
    setActiveCycleId(null)
    reset()
  }, [reset])

  const updateActiveCycle = useCallback(
    (newData: UpdateableCycleData) => {
      if (!activeCycleId) return

      setCycles((state) =>
        state.map((cycle) => {
          if (cycle.id === activeCycleId) {
            return { ...cycle, ...newData }
          }

          return cycle
        }),
      )
    },
    [activeCycleId],
  )

  useEffect(() => {
    let interval: number

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          activeCycle.statedDate,
        )

        if (secondsDifference >= totalSeconds) {
          updateActiveCycle({ finishedDate: new Date() })
          resetCountdown()
          clearInterval(interval)

          return
        }

        setAmountSecondsPassed(secondsDifference)
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [activeCycle, totalSeconds, updateActiveCycle, resetCountdown])

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`
    }
  }, [minutes, seconds, activeCycle])

  function handleCreateNewCycle({ task, minutesAmount }: NewCycleFormData) {
    const now = new Date()
    const id = String(now.getTime())
    const newCycle: Cycle = {
      id,
      task,
      minutesAmount,
      statedDate: now,
    }

    setActiveCycleId(id)
    setCycles((state) => [newCycle, ...state])
    reset()
  }

  function handleInterruptCountdown() {
    updateActiveCycle({ interruptedDate: new Date() })
    resetCountdown()
  }

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            type="text"
            id="task"
            placeholder="Dê um nome para o seu projeto"
            list="task-suggestions"
            disabled={!!activeCycle}
            {...register('task')}
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
            disabled={!!activeCycle}
            {...register('minutesAmount', { valueAsNumber: true })}
          />

          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Separator>:</Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountdownContainer>

        {activeCycle ? (
          <CountdownButton
            type="button"
            $variant="danger"
            onClick={handleInterruptCountdown}
          >
            <HandPalm size={24} />
            Interromper
          </CountdownButton>
        ) : (
          <CountdownButton
            type="submit"
            $variant="success"
            disabled={isSubmitDisabled}
          >
            <Play size={24} />
            Começar
          </CountdownButton>
        )}
      </form>
    </HomeContainer>
  )
}
