import React, { useState } from "react"
import { formatThousands } from "../helpers/formatThousand"

interface NumberInputProps {
  value?: number
  onChange?: (value: number) => void
  className?: string
  placeholder?: string
}

export const ThousandInput: React.FC<NumberInputProps> = ({
  value = 0,
  onChange,
  className,
  placeholder,
}) => {
  const [displayValue, setDisplayValue] = useState(
    formatThousands(value.toString())
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, "") // Strip non-numeric characters
    const formattedValue = formatThousands(rawValue)

    setDisplayValue(formattedValue)
    onChange?.(Number(rawValue)) // Pass numeric value back to parent
  }

  return (
    <input
      type="text"
      placeholder={placeholder}
      value={displayValue}
      onChange={handleChange}
      className={className + " text-right"}
    />
  )
}
