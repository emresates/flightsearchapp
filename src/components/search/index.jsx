"use client";

import React, { useEffect, useState } from "react";
import Cities from "../../data/cities.json";
import Flights from "../../data/flights.json";
import Results from "../results";
import TripChoice from "../tripChoice";
import DatePick from "../datePick";

function formatDate(inputDate) {
  const parts = inputDate.split("-"); // Tarihi parçalara ayırıyoruz
  const formattedDate = `${parts[2]}.${parts[1]}.${parts[0]}`; // Gün.ay.yıl formatına dönüştürüyoruz
  return formattedDate;
}

function SearchUi() {
  //* States
  const [showOptionsFrom, setShowOptionsFrom] = useState(false);
  const [showOptionsTo, setShowOptionsTo] = useState(false);

  const [fromOptions, setFromOptions] = useState();
  const [toOptions, setToOptions] = useState();

  const [isOneWay, setIsOneWay] = useState(false); // Is the trip one way or not
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    departure: "",
    return: "",
  });

  // When it loads first time, it takes the data
  useEffect(() => {
    setFromOptions(Cities.results);
    setToOptions(Cities.results);
  }, []);

  // Input handleChange func
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  console.log(formData);
  // Reformat the types of choosen dates
  const dateDeparture = formatDate(formData.departure);
  const dateReturn = formatDate(formData.return);

  // Search Results for Departure
  const searchDataDeparture = Flights.results.filter((item) => {
    return (
      item.from === formData.from &&
      item.to === formData.to &&
      item.departuredate === dateDeparture
    );
  });

  // Search Results for Departure
  const searchDataReturn = Flights.results.filter((item) => {
    return (
      item.from === formData.to &&
      item.to === formData.from &&
      item.departuredate === dateReturn
    );
  });

  // If form is incomplete, it doesn't show the data
  const isFormIncomplete = isOneWay
    ? ["from", "to", "departure"].some((field) => formData[field] === "")
    : Object.values(formData).some((value) => value === "");

  return (
    <div>
      <section className='bg-yellow-300 rounded-xl text-black w-1/3 mx-auto mt-10 p-14'>
        {/* Trip Type Choice */}
        <TripChoice isOneWay={isOneWay} setIsOneWay={setIsOneWay} />

        <div className='flex gap-x-4 w-full justify-between'>
          {/* From Cities */}
          <div className='flex gap-x-1 items-center w-full'>
            <label htmlFor='from'>From</label>
            <div className='relative'>
              <input
                type='text'
                id='from'
                name='from'
                value={formData.from}
                onChange={handleChange}
                placeholder='Type or select...'
                onFocus={() => {
                  setShowOptionsFrom(true);
                }}
                className='rounded-md p-1 border-black border text-lg w-auto'
              />
              {showOptionsFrom && (
                <ul className='absolute top-full left-0 w-full z-10 text-lg'>
                  <li
                    onClick={() => {
                      setFormData((prevData) => ({
                        ...prevData,
                        from: "",
                      }));
                      setShowOptionsFrom(false);
                    }}
                    className='border-b pl-2 rounded-md bg-white border-black cursor-pointer hover:bg-yellow-200 transition-all'
                  >
                    Select
                  </li>
                  {fromOptions
                    .filter((option) =>
                      option.toLowerCase().includes(formData.from.toLowerCase())
                    )
                    .map((option, index) => (
                      <option
                        disabled={formData.to === option}
                        key={index}
                        onClick={() => {
                          setFormData((prevData) => ({
                            ...prevData,
                            from: option,
                          }));
                          setShowOptionsFrom(false);
                        }}
                        className={`border-b pl-2 rounded-md bg-white border-black cursor-pointer hover:bg-yellow-200 transition-all ${
                          formData.to === option ? "text-red-400" : ""
                        }`}
                      >
                        {option}
                      </option>
                    ))}
                </ul>
              )}
            </div>
          </div>

          {/* To Cities */}
          <div className='flex gap-x-1 items-center relative'>
            <label htmlFor='to'>To</label>
            <div className='relative'>
              <input
                type='text'
                name='to'
                value={formData.to}
                onChange={handleChange}
                placeholder='Type or select...'
                onFocus={() => {
                  setShowOptionsTo(true);
                }}
                className='p-1 rounded-md border-black border text-lg'
              />
              {showOptionsTo && (
                <ul className='absolute top-full left-0 w-full z-10 text-lg'>
                  <li
                    onClick={() => {
                      setFormData((prevData) => ({
                        ...prevData,
                        to: "",
                      }));
                      setShowOptionsTo(false);
                    }}
                    className='border-b pl-2 rounded-md bg-white border-black cursor-pointer hover:bg-yellow-200 transition-all'
                  >
                    Select
                  </li>
                  {toOptions
                    .filter((option) =>
                      option.toLowerCase().includes(formData.to.toLowerCase())
                    )
                    .map((option, index) => (
                      <option
                        disabled={formData.from === option}
                        key={index}
                        onClick={() => {
                          setFormData((prevData) => ({
                            ...prevData,
                            to: option,
                          }));
                          setShowOptionsTo(false);
                        }}
                        className={`border-b pl-2 rounded-md bg-white border-black cursor-pointer hover:bg-yellow-200 transition-all ${
                          formData.from === option ? "text-red-400" : ""
                        }`}
                      >
                        {option}
                      </option>
                    ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        {/* Data Pickers */}
        <DatePick
          formData={formData}
          handleChange={handleChange}
          isOneWay={isOneWay}
        />
      </section>
      <Results
        resultsOneWay={searchDataDeparture}
        resultsReturn={searchDataReturn}
        isOneWay={isOneWay}
        isFormIncomplete={isFormIncomplete}
        from={formData.from}
        to={formData.to}
        dateDeparture={dateDeparture}
        dateReturn={dateReturn}
      />
    </div>
  );
}

export default SearchUi;
