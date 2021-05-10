import { Rate } from "antd"
import React from "react"

interface PinProps extends React.ComponentProps<typeof Rate> {
  checked: boolean
  onCheckedChnage?: (checked: boolean) => void
}

export const Pin = ({ checked, onCheckedChnage, ...restProps }: PinProps) => {
  return (
    <Rate
      count={1}
      value={checked ? 1 : 0}
      onChange={(num) => onCheckedChnage?.(!!num)}
      {...restProps}
    />
  )
}
