import React from 'react'

const Notification = ({message, successful}) => {
  const errorMsgStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  const successMsgStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  if (message === null | message === 'Hello') { return null }

  if (!successful) {
    return (
      <div className="errorMsg" style={errorMsgStyle}>
        {message}
      </div>
    )
  } else {
    return (
      <div className="successMsg" style={successMsgStyle}>
        {message}
      </div>
    )
  } 
}

export default Notification