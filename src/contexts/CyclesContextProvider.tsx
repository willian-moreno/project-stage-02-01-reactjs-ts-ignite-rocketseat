import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useCallback,
  useState,
} from 'react'

interface CreateCycleData {
  task: string
  minutesAmount: number
}

export type UpdatableCycleData = {
  interruptedDate?: Date
  finishedDate?: Date
}

export type Cycle = {
  id: string
  statedDate: Date
  task: string
  minutesAmount: number
} & UpdatableCycleData

interface CyclesContextType {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  defineActiveCycleId: Dispatch<React.SetStateAction<string | null>>
  updateActiveCycle: (newData: UpdatableCycleData) => void
  createNewCycle: (
    onValid: CreateCycleData,
    onInvalid?: CreateCycleData,
  ) => void
  interruptActiveCycle: () => void
}

export const CyclesContext = createContext({} as CyclesContextType)

interface CyclesContextProviderProps {
  children: ReactNode
}

export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const updateActiveCycle = useCallback(
    (newData: UpdatableCycleData) => {
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
    [activeCycleId, setCycles],
  )

  function createNewCycle({ task, minutesAmount }: CreateCycleData) {
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
  }

  function interruptActiveCycle() {
    document.title = 'Ignite Timer'
    updateActiveCycle({ interruptedDate: new Date() })
    setActiveCycleId(null)
  }

  function defineActiveCycleId(value: SetStateAction<string | null>) {
    setActiveCycleId(value)
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        defineActiveCycleId,
        updateActiveCycle,
        createNewCycle,
        interruptActiveCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
