import React from 'react'
import '../styles/ToggleButton.scss'

interface ToggleButtonType {
  isToggled: boolean
  toggle: () => void
}

const ToggleButton = ({ isToggled, toggle }: ToggleButtonType) => {
  return (
    <label className='switch'>
      <input type='checkbox' checked={isToggled} onChange={toggle} />
      <span className='slider'></span>
    </label>
  )
}

export default ToggleButton
