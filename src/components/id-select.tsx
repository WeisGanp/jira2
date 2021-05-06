import { Select } from "antd"
import React from "react"
import { Raw } from "types"

type SelectProps = React.ComponentProps<typeof Select>

interface IdSelectProps
  extends Omit<SelectProps, "value" | "onChange" | "options"> {
  value: Raw | null | undefined
  onChange: (value?: number) => void
  defaultOptionName?: string
  options?: { name: string; id: number }[]
}

export const IdSelect = (props: IdSelectProps) => {
  const { value, onChange, defaultOptionName, options, ...restProps } = props
  return (
    <Select
      value={options?.length ? toNumber(value) : 0}
      onChange={(value) => onChange(toNumber(value) || undefined)}
      {...restProps}
    >
      {defaultOptionName ? (
        <Select.Option value={0}>{defaultOptionName}</Select.Option>
      ) : null}
      {options?.map((option) => {
        return (
          <Select.Option value={option.id} key={option.id}>
            {option.name}
          </Select.Option>
        )
      })}
    </Select>
  )

  function toNumber(value: unknown) {
    console.log(111, value)
    const n = Number(value)
    return isNaN(n) ? 0 : n
  }
}
