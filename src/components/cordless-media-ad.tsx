import React from 'react'
import cs from 'classnames'
import type { CMWrapper } from '../cordless-media'

const id = 'put-an-ad-here-please'

export function CordlessMediaAd(props: React.ComponentProps<'div'>) {
  const { className, ...rest } = props

  React.useEffect(() => {
    setTimeout(() => {
      const cmWrapper = window.cmWrapper || ({} as CMWrapper)
      console.log('-------- Requesting ad units --------')
      cmWrapper.que?.push(() => {
        cmWrapper.ads.defineUnit(id)
        cmWrapper.ads.requestUnits()
      })
    }, 5000)
  }, [])

  return (
    <div
      {...rest}
      id={id}
      className={cs(
        'rounded-xl border border-gray-300 bg-gray-100 text-gray-400',
        'flex justify-center items-center',
        className,
      )}
      style={{ height: 90 }}
    >
      Cordless Media Ad here???
    </div>
  )
}
