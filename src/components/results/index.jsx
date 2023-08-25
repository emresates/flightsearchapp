import React, { useEffect, useState } from "react";
import { Loader1, Loader2 } from "../loading";

// ICONS
import { BsArrowRight } from "react-icons/bs";
import { GiAirplaneArrival, GiAirplaneDeparture } from "react-icons/gi";
import { PiArrowsDownUpFill } from "react-icons/pi";
import { HiOutlineArrowSmallDown, HiOutlineArrowSmallUp } from "react-icons/hi2";

function Results({
  resultsOneWay,
  resultsReturn,
  isOneWay,
  isFormIncomplete,
  from,
  to,
  dateDeparture,
  dateReturn,
  isLoadingDeparture,
  isLoadingReturn,
}) {
  //! *********************** STATES ************************* !\\
  const [sortedResultsOneWay, setSortedResultsOneWay] = useState(); // Sorted One Way results
  const [sortedResultsReturn, setSortedResultsReturn] = useState(); // Sorted Round Trip results
  const [sortKey, setSortKey] = useState(null); // Key of sort
  const [ascending, setAscending] = useState(true); // Asc- Desc

  // Arrows States
  const [sortTypeDeparture, setSortTypeDeparture] = useState(null);
  const [ascendingDeparture, setAscendingDeparture] = useState(true);

  const [sortTypeReturn, setSortTypeReturn] = useState(null);
  const [ascendingReturn, setAscendingReturn] = useState(true);

  //! *********************** USE EFFECTS ************************* !\\
  // I added the data into another state for sorting
  useEffect(() => {
    setSortedResultsOneWay(resultsOneWay);
    setSortedResultsReturn(resultsReturn);
  }, [resultsOneWay, resultsReturn]);

  //! *********************** FUNCTIONS ************************* !\\
  // Because of 24hour system, sometimes i wasn't seen well. This function fix that
  const formatTo24Hour = (timeString) => {
    const [hours, minutes] = timeString.split(".");
    let totalMinutes = parseInt(hours) * 60 + parseInt(minutes);

    if (hours.startsWith("0")) {
      totalMinutes += 24 * 60;
    }

    return totalMinutes;
  };

  // Sort function
  const handleSort = (key, dataType) => {
    if (key === sortKey) {
      setAscending(!ascending);
    } else {
      setSortKey(key);
      setAscending(true);
    }

    const isAscending = key === sortKey ? !ascending : true; // Yeni sıralama yönü

    if (dataType === "oneway") {
      setSortTypeDeparture(key);
      setAscendingDeparture(isAscending);
      const sorted = [...sortedResultsOneWay].sort((a, b) => {
        const aValue = key === "arrivaltime" ? formatTo24Hour(a[key]) : a[key];
        const bValue = key === "arrivaltime" ? formatTo24Hour(b[key]) : b[key];

        if (aValue < bValue) return isAscending ? -1 : 1;
        if (aValue > bValue) return isAscending ? 1 : -1;
        return 0;
      });

      setSortedResultsOneWay(sorted);
    } else {
      setSortTypeReturn(key);
      setAscendingReturn(isAscending);
      const sorted = [...sortedResultsReturn].sort((a, b) => {
        const aValue = key === "arrivaltime" ? formatTo24Hour(a[key]) : a[key];
        const bValue = key === "arrivaltime" ? formatTo24Hour(b[key]) : b[key];

        if (aValue < bValue) return isAscending ? -1 : 1;
        if (aValue > bValue) return isAscending ? 1 : -1;
        return 0;
      });

      setSortedResultsReturn(sorted);
    }
  };

  // Arrows for departure section
  const ArrowsDeparture = (key) => {
    return (
      <>
        {sortTypeDeparture === key && ascendingDeparture == true ? (
          <HiOutlineArrowSmallDown />
        ) : sortTypeDeparture === key && ascendingDeparture == false ? (
          <HiOutlineArrowSmallUp />
        ) : (
          <PiArrowsDownUpFill />
        )}
      </>
    );
  };

  // Arrows for return section
  const ArrowsReturn = (key) => {
    return (
      <>
        {sortTypeReturn === key && ascendingReturn == true ? (
          <HiOutlineArrowSmallDown />
        ) : sortTypeReturn === key && ascendingReturn == false ? (
          <HiOutlineArrowSmallUp />
        ) : (
          <PiArrowsDownUpFill />
        )}
      </>
    );
  };

  return (
    <div
      className={`flex h-screen mx-auto mt-10 items-center justify-between rounded-xl overflow-hidden ${
        isOneWay ? "w-1/2" : "w-2/3 "
      }`}
    >
      <div
        className={`bg-red-400 h-full ${
          isOneWay ? "w-2/3 m-auto rounded-xl" : "w-1/2"
        }`}
      >
        {/* HEADERS */}
        {!isFormIncomplete ? (
          <h1 className='text-3xl text-center p-5 border-black border-b-2'>
            {from} - {to}
            <p>{dateDeparture}</p>
          </h1>
        ) : (
          <p className='text-center mt-5 text-3xl'>Please Fill the Blanks</p>
        )}

        {/* FLIGHT ONE WAY RESULTS */}
        {isLoadingDeparture ? (
          <div className='w-full h-full flex items-center justify-start mt-10 flex-col'>
            <p className='text-2xl mb-5'>Results are loading...</p>
            <Loader2 />
          </div>
        ) : !resultsOneWay.length > 0 && !isFormIncomplete ? (
          <p className='text-center mt-5 text-3xl'>There is no result</p>
        ) : (
          <table className='w-full'>
            {!isFormIncomplete && (
              <tr className='border-b-4 border-blue-300 h-10'>
                <th className='select-none w-1/5'>
                  <p className='flex items-center justify-center text-lg'>Airline</p>
                </th>
                <th
                  className='cursor-pointer select-none w-1/5 transition-all hover:bg-red-800'
                  onClick={() => handleSort("departuretime", "oneway")}
                >
                  <p className='flex items-center justify-center text-lg'>
                    Departure
                    {ArrowsDeparture("departuretime")}
                  </p>
                </th>
                <th
                  className='cursor-pointer select-none w-1/5 transition-all hover:bg-red-800'
                  onClick={() => handleSort("time", "oneway")}
                >
                  <p className='flex items-center justify-center text-lg'>
                    Duration
                    {ArrowsDeparture("time")}
                  </p>
                </th>
                <th
                  className='cursor-pointer select-none w-1/5 transition-all hover:bg-red-800'
                  onClick={() => handleSort("arrivaltime", "oneway")}
                >
                  <p className='flex items-center justify-center text-lg'>
                    Arrival
                    {ArrowsDeparture("arrivaltime")}
                  </p>
                </th>
                <th
                  className='cursor-pointer select-none w-1/5 transition-all hover:bg-red-800'
                  onClick={() => handleSort("price", "oneway")}
                >
                  <p className='flex items-center justify-center text-lg'>
                    Price
                    {ArrowsDeparture("price")}
                  </p>
                </th>
              </tr>
            )}
            {!isFormIncomplete &&
              sortedResultsOneWay?.map((result, index) => {
                return (
                  <tr
                    key={index}
                    className='select-none h-20 text-center border-b-2 border-black hover:bg-gray-500 transition-colors'
                  >
                    <td>{result.company}</td>
                    <td>
                      <p className='flex flex-col items-center justify-center'>
                        <GiAirplaneDeparture className='text-2xl' />
                        {result.departuretime}
                      </p>
                    </td>
                    <td>
                      <p className='flex flex-col items-center justify-center text-sm'>
                        {result.time}
                        <BsArrowRight className='text-2xl' />
                      </p>
                    </td>
                    <td>
                      <p className='flex flex-col items-center justify-center'>
                        <GiAirplaneArrival className='text-2xl' />
                        {result?.arrivaltime}
                      </p>
                    </td>
                    <td>{result.price} $</td>
                  </tr>
                );
              })}
          </table>
        )}
      </div>

      {/* FLIGHT ROUND TRIP RESULTS */}
      {!isOneWay && (
        <div className='bg-green-400 h-full w-1/2'>
          {!isFormIncomplete ? (
            <h1 className='text-3xl text-center p-5 border-black border-b-2'>
              {to} - {from}
              <p>{dateReturn}</p>
            </h1>
          ) : (
            <p className='text-center mt-5 text-3xl'>Please Fill the Blanks</p>
          )}

          {isLoadingReturn ? (
            <div className='w-full h-full flex items-center justify-start mt-10 flex-col'>
              <p className='text-2xl mb-5'>Results are loading...</p>
              <Loader1 />
            </div>
          ) : !resultsReturn.length > 0 && !isFormIncomplete ? (
            <p className='text-center mt-5 text-3xl'>There is no result</p>
          ) : (
            <table className='w-full'>
              {!isFormIncomplete && (
                <tr className='border-b-4 border-blue-300 h-10'>
                  <th className='cursor-pointer select-none w-1/5'>Airline</th>
                  <th
                    className='cursor-pointer select-none w-1/5 transition-all hover:bg-red-800'
                    onClick={() => handleSort("departuretime")}
                  >
                    <p className='flex items-center justify-center text-lg'>
                      Departure
                      {ArrowsReturn("departuretime")}
                    </p>
                  </th>
                  <th
                    className='cursor-pointer select-none w-1/5 transition-all hover:bg-red-800'
                    onClick={() => handleSort("time")}
                  >
                    <p className='flex items-center justify-center text-lg'>
                      Duration
                      {ArrowsReturn("time")}
                    </p>
                  </th>
                  <th
                    className='cursor-pointer select-none w-1/5 transition-all hover:bg-red-800'
                    onClick={() => handleSort("arrivaltime")}
                  >
                    <p className='flex items-center justify-center text-lg'>
                      Arrival
                      {ArrowsReturn("arrivaltime")}
                    </p>
                  </th>
                  <th
                    className='cursor-pointer select-none w-1/5 transition-all hover:bg-red-800'
                    onClick={() => handleSort("price")}
                  >
                    <p className='flex items-center justify-center text-lg'>
                      Price
                      {ArrowsReturn("price")}
                    </p>
                  </th>
                </tr>
              )}
              {!isFormIncomplete &&
                sortedResultsReturn.map((result, index) => {
                  return (
                    <tr
                      key={index}
                      className='h-20 text-center border-b-2 border-black hover:bg-gray-500 transition-colors'
                    >
                      <td>{result.company}</td>
                      <td>
                        <p className='flex flex-col items-center justify-center'>
                          <GiAirplaneDeparture className='text-2xl' />
                          {result.departuretime}
                        </p>
                      </td>
                      <td>
                        <p className='flex flex-col items-center justify-center text-sm'>
                          {result.time}
                          <BsArrowRight className='text-2xl' />
                        </p>
                      </td>
                      <td>
                        <p className='flex flex-col items-center justify-center'>
                          <GiAirplaneArrival className='text-2xl' />
                          {result?.arrivaltime}
                        </p>
                      </td>
                      <td>{result.price} $</td>
                    </tr>
                  );
                })}
            </table>
          )}
        </div>
      )}
    </div>
  );
}

export default Results;
