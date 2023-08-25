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
        />
        <label htmlFor='oneway'>One Way</label>
      </div>
      <div className='flex gap-x-1'>
        <input
          onChange={() => setIsOneWay(false)}
          checked={!isOneWay}
          type='radio'
          id='roundtrip'
          name='flight'
          value='roundtrip'
        />
        <label htmlFor='roundtrip'>Round Trip</label>
      </div>
    </div>
  );
}

export default TripTypeChoice;
