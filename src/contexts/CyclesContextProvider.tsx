import { ReactNode, createContext, useEffect, useReducer } from 'react'
import {
  createNewCycleAction,
  finishActiveCycleAction,
  interruptActiveCycleAction,
} from '../reducers/cycles/actions'
import { Cycle, cyclesReducer } from '../reducers/cycles/reducer'

interface CreateCycleData {
  task: string
  minutesAmount: number
}

interface CyclesContextType {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  createNewCycle: (
    onValid: CreateCycleData,
    onInvalid?: CreateCycleData,
  ) => void
  interruptActiveCycle: () => void
  finishActiveCycle: () => void
}

export const CyclesContext = createContext({} as CyclesContextType)

interface CyclesContextProviderProps {
  children: ReactNode
}

export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  const [cyclesState, dispatchCycles] = useReducer(
    cyclesReducer,
    {
      cycles: [],
      activeCycleId: null,
    },
    (initialState) => {
      const storedStateAsJSON = localStorage.getItem(
        '@ignite-timer:cycles-state-1.0.0',
      )

      if (storedStateAsJSON) {
        return JSON.parse(storedStateAsJSON)
      }

      return initialState
    },
  )

  useEffect(() => {
    const cyclesStateAsJSON = JSON.stringify(cyclesState)
    localStorage.setItem('@ignite-timer:cycles-state-1.0.0', cyclesStateAsJSON)
  }, [cyclesState])

  const { cycles, activeCycleId } = cyclesState

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  function createNewCycle({ task, minutesAmount }: CreateCycleData) {
    const now = new Date()
    const id = String(now.getTime())
    const newCycle: Cycle = {
      id,
      task,
      minutesAmount,
      startedDate: now,
    }

    dispatchCycles(createNewCycleAction(newCycle))
  }

  function interruptActiveCycle() {
    if (!activeCycleId) return

    document.title = 'Ignite Timer'

    dispatchCycles(interruptActiveCycleAction())
  }

  function finishActiveCycle() {
    if (!activeCycleId) return

    document.title = 'Ignite Timer'

    dispatchCycles(finishActiveCycleAction())
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        createNewCycle,
        interruptActiveCycle,
        finishActiveCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
