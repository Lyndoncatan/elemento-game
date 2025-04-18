"use client"

import React from "react"

// This file is a workaround for the useEffectEvent import error in Radix UI
// It provides a simple implementation that can be used as a replacement

/**
 * A simple implementation to replace the missing useEffectEvent from React
 * This helps fix deployment issues with Radix UI components
 */
export function useEffectEvent<T extends (...args: any[]) => any>(callback: T): T {
  const ref = React.useRef<T>(callback)

  React.useEffect(() => {
    ref.current = callback
  })

  return React.useCallback((...args: Parameters<T>) => {
    return ref.current(...args)
  }, []) as T
}

// Export this as a named export to be used by Radix UI components
export default { useEffectEvent }
