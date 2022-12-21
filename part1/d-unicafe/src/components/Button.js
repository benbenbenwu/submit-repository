import React from 'react'

const Button = ({ text, onHandlder }) => {
  return (
    <>
      <button onClick={onHandlder}>{text}</button>
    </>
  )
}

export default Button