"use client"

import React from "react"

// Add useEffectEvent polyfill if it doesn't exist
if (!("useEffectEvent" in React)) {
  ;(React as any).useEffectEvent = function useEffectEvent<T extends (...args: any[]) => any>(callback: T): T {
    const ref = React.useRef<T>(callback)

    React.useEffect(() => {
      ref.current = callback
    })

    return React.useCallback((...args: Parameters<T>) => {
      return ref.current(...args)
    }, []) as T
  }
}
