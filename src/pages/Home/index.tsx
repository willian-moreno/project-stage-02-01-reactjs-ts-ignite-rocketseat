import { HandPalm, Play } from 'phosphor-react'
import { useContext } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as zod from 'zod'
import { Countdown } from './components/Countdown'
import { NewCycleForm } from './components/NewCycleForm'
import {
  Cycle,
  CyclesContext,
  CyclesContextProvider,
} from './contexts/CyclesContext'
import { CountdownButton, HomeContainer } from './styles'

export const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe o nome da tarefa'),
  minutesAmount: zod
    .number()
    .min(5, 'O valor deve ser de no mínimo 5 minutos')
    .max(60, 'O valor deve ser no máximo 60 minutos'),
})

export type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home() {
  const { setCycles, setActiveCycleId, activeCycle, updateActiveCycle } =
    useContext(CyclesContext)

  const form = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 5,
    },
  })

  const inputTaskValue = form.watch('task')
  const inputMinutesAmountValue = form.watch('minutesAmount')

  const isSubmitDisabled =
    !inputTaskValue ||
    !inputMinutesAmountValue ||
    inputMinutesAmountValue < 5 ||
    inputMinutesAmountValue > 60

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
    form.reset()
  }

  function handleInterruptCountdown() {
    document.title = 'Ignite Timer'
    updateActiveCycle({ interruptedDate: new Date() })
    setActiveCycleId(null)
  }

  return (
    <HomeContainer>
      <CyclesContextProvider>
        <form onSubmit={form.handleSubmit(handleCreateNewCycle)}>
          <NewCycleForm form={form} />

          <Countdown />

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
      </CyclesContextProvider>
    </HomeContainer>
  )
}
