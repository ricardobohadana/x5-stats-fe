import React from "react"
import { FaExclamationCircle } from "react-icons/fa" // For the error icon (FontAwesome)

interface ErrorOverlayProps {
  hasError: boolean
  errorMessage?: string
}

export const ErrorOverlay: React.FC<ErrorOverlayProps> = ({
  hasError,
  errorMessage,
}) => {
  if (!hasError) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="text-center">
        <FaExclamationCircle className="text-red-500 text-6xl mb-4" />
        <h1 className="text-2xl font-bold text-gray-800">
          Oops! Something went wrong.
        </h1>
        {errorMessage && <p className="mt-2 text-gray-600">{errorMessage}</p>}
      </div>
    </div>
  )
}
