import React from "react"
import { LoadingSpinner } from "./LoadingSpinner"

interface LoadingOverlayProps {
  isLoading: boolean
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ isLoading }) => {
  if (!isLoading) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <LoadingSpinner />
    </div>
  )
}

export default LoadingOverlay
