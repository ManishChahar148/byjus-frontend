import React from 'react'

const Button = ({label, onClick}) => {
  return (
    <button type="submit" className='px-10 py-2 text-white border-2 rounded-md hover:text-purple hover:bg-white hover:border-purple bg-purple' onClick={onClick}>{label}</button>
  )
}

export default Button