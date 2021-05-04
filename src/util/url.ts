import { useMemo } from 'react'
import { useSearchParams, } from 'react-router-dom'

export const useUrlQueryParams = <K extends string>(keys: K[]) => {
  const [searchParams, setSearchParams] = useSearchParams()
  return [
    useMemo(
      () => keys.reduce((previousValue: { [currentValue in K]: string }, currentValue: K) => {
        return { ...previousValue, [currentValue]: searchParams.get(currentValue) || '' }
      }, {} as { [currentValue in K]: string }),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [searchParams]
    ),
    setSearchParams
  ] as const
}