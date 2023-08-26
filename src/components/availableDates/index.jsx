import React from "react";

function AvailableDates() {
  return (
    <div className='absolute top-5 left-10 bg-white p-3 rounded-lg'>
      <h1 className="text-center text-2xl">Available Dates</h1>
      <div className='flex items-center justify-between w-96'>
        <p>Istanbul Airport - Ankara</p>
        <span className='text-right'>28.08 - 29.08</span>
      </div>
      <div className='flex items-center justify-between w-96'>
        <p>Ankara - Istanbul Airport</p>
        <span className='text-right'>31.08 - 01.09 - 02.09</span>
      </div>
      <br />

      <div className='flex items-center justify-between w-96'>
        <p>Istanbul Airport - Munih</p>
        <span className='text-right'>28.08</span>
      </div>
      <div className='flex items-center justify-between w-96'>
        <p>Munih - Istanbul Airport</p>
        <span className='text-right'>01.09 - 02.09 - 03.09</span>
      </div>
      <br />

      <div className='flex items-center justify-between w-96'>
        <p>Istanbul S.G. - Paris</p>
        <span className='text-right'>29.08 - 30.08 -31.08</span>
      </div>
      <div className='flex items-center justify-between w-96'>
        <p>Paris - Istanbul S.G.</p>
        <span className='text-right'>02.09 - 03.09 - 04.09</span>
      </div>
    </div>
  );
}

export default AvailableDates;
