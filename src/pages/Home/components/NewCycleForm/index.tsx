import { useContext } from 'react'
import { CyclesContext } from '../../../../contexts/CyclesContextProvider'
import { FormContainer, MinutesAmountInput, TaskInput } from './styles'
import { useFormContext } from 'react-hook-form'

export function NewCycleForm() {
  const { register } = useFormContext()
  const { activeCycle } = useContext(CyclesContext)

  return (
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
        <option value="Estudo de Desenvolvimento WEB" />
        <option value="Estudo testes de software" />
        <option value="Estudo hobby" />
        <option value="Leitura" />
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
  )
}
