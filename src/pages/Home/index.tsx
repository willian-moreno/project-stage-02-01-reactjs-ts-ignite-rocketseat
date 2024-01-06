import { HandPalm, Play } from 'phosphor-react'
import { useContext } from 'react'
import { Countdown } from './components/Countdown'
import { NewCycleForm } from './components/NewCycleForm'
import { CyclesContext } from '../../contexts/CyclesContextProvider'
import { CountdownButton, HomeContainer } from './styles'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'

export const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe o nome da tarefa'),
  minutesAmount: zod
    .number()
    .min(5, 'O valor deve ser de no mínimo 5 minutos')
    .max(60, 'O valor deve ser no máximo 60 minutos'),
})

export type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home() {
  const cyclesContext = useContext(CyclesContext)

  const { activeCycle, interruptActiveCycle, createNewCycle } = cyclesContext

  console.log('cyclesContext', createNewCycle)

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 5,
    },
  })

  const { watch, handleSubmit, reset } = newCycleForm

  const inputTaskValue = watch('task')
  const inputMinutesAmountValue = watch('minutesAmount')

  const isSubmitDisabled =
    !inputTaskValue ||
    !inputMinutesAmountValue ||
    inputMinutesAmountValue < 5 ||
    inputMinutesAmountValue > 60

  function handleCreateNewCycle(onValid: NewCycleFormData) {
    createNewCycle(onValid)
    reset()
  }

  function handleInterruptCycle() {
    interruptActiveCycle()
  }

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>

        <Countdown />

        {activeCycle ? (
          <CountdownButton
            type="button"
            $variant="danger"
            onClick={handleInterruptCycle}
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
