import React, { useEffect, useState } from "react";
function Results({
  resultsOneWay,
  resultsReturn,
  isOneWay,
  isFormIncomplete,
  from,
  to,
  dateDeparture,
  dateReturn,
}) {
  console.log(isFormIncomplete);
  console.log(resultsOneWay);
  console.log(resultsReturn);

  const [sortedResultsOneWay, setSortedResultsOneWay] = useState();
  const [sortedResultsReturn, setSortedResultsReturn] = useState();
  const [sortKey, setSortKey] = useState(null);
  const [ascending, setAscending] = useState(true);

  useEffect(() => {
    setSortedResultsOneWay(resultsOneWay);
    setSortedResultsReturn(resultsReturn);
  }, [resultsOneWay, resultsReturn]);

  const formatTo24Hour = (timeString) => {
    const [hours, minutes] = timeString.split(".");
    let totalMinutes = parseInt(hours) * 60 + parseInt(minutes);

    if (hours.startsWith("0")) {
      totalMinutes += 24 * 60;
    }

    return totalMinutes;
  };

  const handleSort = (key, dataType) => {
    if (key === sortKey) {
      setAscending(!ascending);
    } else {
      setSortKey(key);
      setAscending(true);
    }

    if (dataType === "oneway") {
      const sorted = [...sortedResultsOneWay].sort((a, b) => {
        const aValue = key === "arrivaltime" ? formatTo24Hour(a[key]) : a[key];
        const bValue = key === "arrivaltime" ? formatTo24Hour(b[key]) : b[key];

        if (aValue < bValue) return ascending ? -1 : 1;
        if (aValue > bValue) return ascending ? 1 : -1;
        return 0;
      });

      setSortedResultsOneWay(sorted);
    } else {
      const sorted = [...sortedResultsReturn].sort((a, b) => {
        const aValue = key === "arrivaltime" ? formatTo24Hour(a[key]) : a[key];
        const bValue = key === "arrivaltime" ? formatTo24Hour(b[key]) : b[key];

        if (aValue < bValue) return ascending ? -1 : 1;
        if (aValue > bValue) return ascending ? 1 : -1;
        return 0;
      });

      setSortedResultsReturn(sorted);
    }
  };

  return (
    <div className='flex w-1/2 h-screen mx-auto mt-10 items-center justify-between rounded-xl overflow-hidden'>
      <div className={`bg-red-400 h-full ${isOneWay ? "w-2/3 m-auto" : "w-1/2"}`}>
        {!isFormIncomplete ? (
          <h1 className='text-3xl text-center p-5 border-black border-b-2'>
            {from} - {to}
            <p>{dateDeparture}</p>
          </h1>
        ) : (
          <p className='text-center mt-5 text-3xl'>Please Fill the Blanks</p>
        )}

        {!resultsOneWay.length > 0 && !isFormIncomplete ? (
          <p className='text-center mt-5 text-3xl'>There is no result</p>
        ) : (
          <table className='w-full'>
            {!isFormIncomplete && (
              <tr className='border-b-4 border-blue-300 h-10'>
                <th
                  className='cursor-pointer select-none w-1/5 transition-all hover:bg-red-800'
                  onClick={() => handleSort("company", "oneway")}
                >
                  Company
                </th>
                <th
                  className='cursor-pointer select-none w-1/5 transition-all hover:bg-red-800'
                  onClick={() => handleSort("departuretime", "oneway")}
                >
                  Departure
                </th>
                <th
                  className='cursor-pointer select-none w-1/5 transition-all hover:bg-red-800'
                  onClick={() => handleSort("time", "oneway")}
                >
                  Duration
                </th>
                <th
                  className='cursor-pointer select-none w-1/5 transition-all hover:bg-red-800'
                  onClick={() => handleSort("arrivaltime", "oneway")}
                >
                  Arrival
                </th>
                <th
                  className='cursor-pointer select-none w-1/5 transition-all hover:bg-red-800'
                  onClick={() => handleSort("price", "oneway")}
                >
                  Price
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
                    <td>{result.departuretime}</td>
                    <td>{result.time}</td>
                    <td>{result?.arrivaltime}</td>
                    <td>{result.price} $</td>
                  </tr>
                );
              })}
          </table>
        )}
      </div>

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

          {!resultsReturn.length > 0 && !isFormIncomplete ? (
            <p className='text-center mt-5 text-3xl'>There is no result</p>
          ) : (
            <table className='w-full'>
              {!isFormIncomplete && (
                <tr className='border-b-4 border-blue-300 h-10'>
                  <th
                    className='cursor-pointer select-none w-1/5 transition-all hover:bg-red-800'
                    onClick={() => handleSort("company")}
                  >
                    Company
                  </th>
                  <th
                    className='cursor-pointer select-none w-1/5 transition-all hover:bg-red-800'
                    onClick={() => handleSort("departuretime")}
                  >
                    Departure
                  </th>
                  <th
                    className='cursor-pointer select-none w-1/5 transition-all hover:bg-red-800'
                    onClick={() => handleSort("time")}
                  >
                    Duration
                  </th>
                  <th
                    className='cursor-pointer select-none w-1/5 transition-all hover:bg-red-800'
                    onClick={() => handleSort("arrivaltime")}
                  >
                    Arrival
                  </th>
                  <th
                    className='cursor-pointer select-none w-1/5 transition-all hover:bg-red-800'
                    onClick={() => handleSort("price")}
                  >
                    Price
                  </th>
                </tr>
              )}
              {!isFormIncomplete &&
                sortedResultsReturn.map((result, index) => {
                  return (
                    <tr
                      key={index}
                      className='h-20 text-center border-b-2 border-black'
                    >
                      <td>{result.company}</td>
                      <td>{result.departuretime}</td>
                      <td>{result.time}</td>
                      <td>{result?.arrivaltime}</td>
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
