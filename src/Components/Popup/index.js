import React from 'react'
import ReactDOM from 'react-dom'
import {MdOutlineClose} from 'react-icons/md'

const Popup = ({handleClose, children, open, title}) => {
  if(!open) {
    return null;
  };
  
  return ReactDOM.createPortal(
  <>
  <div className="absolute top-0 flex items-center justify-center w-screen h-screen shadow-md bg-black/50 fade-in">
    <div className="relative h-20 bg-white border-black border-1 w-full md:w-[800px] min-h-[500px] slide-in">
      <button onClick={handleClose} className="absolute right-2 top-2">
        <MdOutlineClose size={30} fill={'white'}/>
      </button>
      <h1 className='py-2 text-xl font-semibold text-center text-white uppercase bg-purple'>{title}</h1>
      {children}
    </div>
  </div>
  </>,
   document.querySelector('#portal'))
}

export default Popup;