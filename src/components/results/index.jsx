import React from "react";
function Results({ resultsOneWay, resultRoundTrip }) {
  console.log("Results", resultsOneWay);
  return (
    <div className='flex w-1/2 mx-auto mt-10 items-center justify-between'>
      <div className='bg-red-400 w-1/2'>
        <h1 className='text-3xl text-center p-5 border-black border-b-2'>
          {resultsOneWay[0]?.from} - {resultsOneWay[0]?.to}
        </h1>
        {resultsOneWay.map((result, index) => {
          return (
            <div key={index} className='border-black border-b-2'>
              <h1>Company: {result.company}</h1>
              <h1>Departure Date: {result.departuredate}</h1>
              <h1>Departure Time: {result.departuretime}</h1>
              <h1>Price: {result.price} $</h1>
              <h1>Time: {result.time}</h1>
            </div>
          );
        })}
      </div>

      <div className='bg-green-400 w-1/2'>
        <h1 className='text-3xl text-center p-5 border-black border-b-2'>
          {resultsOneWay[0]?.to} - {resultsOneWay[0]?.from}
        </h1>
        {resultsOneWay.map((result, index) => {
          return (
            <div key={index} className='border-black border-b-2'>
              <h1>Company: {result.company}</h1>
              <h1>Departure Date: {result.departuredate}</h1>
              <h1>Departure Time: {result.departuretime}</h1>
              <h1>Price: {result.price} $</h1>
              <h1>Time: {result.time}</h1>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Results;
