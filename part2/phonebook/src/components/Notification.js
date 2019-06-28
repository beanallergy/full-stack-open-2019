import React from 'react'

const Notification = ({message}) => {
  const notiStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }
  if (message === null | message === 'Hello') { return null }
  return (
    <div className="noti" style={notiStyle}>
      {message}
    </div>
  )
}

export default Notification