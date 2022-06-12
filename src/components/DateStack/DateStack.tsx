import React from 'react'

function DateStack({ date }: { date: Date }): JSX.Element {
  return (
    <div className="stack">
      <span className="title">
        {date.toLocaleDateString('default', {
          month: 'long',
          day: 'numeric',
          year: '2-digit',
        })}
      </span>
      <span className="subtitle">
        {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </span>
    </div>
  )
}

export default DateStack
