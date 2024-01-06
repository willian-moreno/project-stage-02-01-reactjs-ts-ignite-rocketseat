import {
  Dispatch,
  ReactNode,
  createContext,
  useCallback,
  useState,
} from 'react'

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
  setCycles: Dispatch<React.SetStateAction<Cycle[]>>
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  setActiveCycleId: Dispatch<React.SetStateAction<string | null>>
  updateActiveCycle: (newData: UpdatableCycleData) => void
}

export const CyclesContext = createContext({} as CyclesContextType)

export function CyclesContextProvider(props: { children: ReactNode }) {
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

  const providerValues = {
    cycles,
    setCycles,
    activeCycle,
    activeCycleId,
    setActiveCycleId,
    updateActiveCycle,
  } as CyclesContextType

  return (
    <CyclesContext.Provider value={providerValues}>
      {props.children}
    </CyclesContext.Provider>
  )
}
