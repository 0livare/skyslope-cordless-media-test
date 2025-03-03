import React from 'react'

export function useId(args: { prefix: string }) {
  const [id] = React.useState(() => Math.random().toString(36).substring(2))
  return `${args.prefix}-${id}`
}
