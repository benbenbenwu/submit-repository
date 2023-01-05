import React from 'react'
import PropTypes from 'prop-types'

const Notification = ({ errorMessage, correctMessage }) => {
  return (
    <>
      <h2 style={errorMessage ? { color: 'red', border: '2px solid red' } : {}}>{errorMessage}</h2>
      <h2 style={correctMessage ? { color: 'green', border: '2px solid green' } : {}}>{correctMessage}</h2>
    </>
  )
}

Notification.propTypes = {
  errorMessage: PropTypes.string,
  correctMessage: PropTypes.string
}

export default Notification