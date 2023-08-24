import React from "react";
import { DateIcon } from "../icons";

function DatePick({formData, handleChange, isOneWay}) {
  return (
    <div className='flex items-center gap-x-4 mt-2 w-full justify-between'>
      <div className='flex gap-x-1 items-center justify-center'>
        <label htmlFor='departure'>Departure</label>
        <div className='relative'>
          <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
            {DateIcon}
          </div>
          <input
            name='departure'
            id='departure'
            type='date'
            value={formData.departure}
            onChange={handleChange}
            className='border text-base rounded-lg block w-full pl-10 p-1 bg-white text-black border-gray-600 placeholder-gray-400 '
          />
        </div>
      </div>
      <div className='flex gap-x-1 items-center justify-center'>
        <label
          htmlFor='return'
          className={`${isOneWay ? "pointer-events-none" : ""}`}
        >
          Return
        </label>
        <div className='relative'>
          <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
            {DateIcon}
          </div>
          <input
            name='return'
            id='return'
            type='date'
            value={formData.return}
            onChange={handleChange}
            className={`border text-base rounded-lg block w-full pl-10 p-1 border-gray-600 ${
              isOneWay
                ? "pointer-events-none bg-gray-700 text-white"
                : "bg-white text-black"
            }`}
          />
        </div>
      </div>
    </div>
  );
}

export default DatePick;
