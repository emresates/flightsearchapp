import React from "react";

function TripTypeChoice({ isOneWay, setIsOneWay }) {
  return (
    <div className='flex gap-x-5 text-xl'>
      <div className='flex gap-x-1'>
        <input
          defaultChecked
          onClick={() => setIsOneWay(true)}
          type='radio'
          id='oneway'
          name='flight'
          value='oneway'
          className='cursor-pointer'
        />
        <label htmlFor='oneway' className='cursor-pointer'>
          One Way
        </label>
      </div>
      <div className='flex gap-x-1'>
        <input
          onChange={() => setIsOneWay(false)}
          checked={!isOneWay}
          type='radio'
          id='roundtrip'
          name='flight'
          value='roundtrip'
          className='cursor-pointer'
        />
        <label htmlFor='roundtrip' className='cursor-pointer'>
          Round Trip
        </label>
      </div>
    </div>
  );
}

export default TripTypeChoice;
