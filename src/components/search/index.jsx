"use client";

import React, { useEffect, useRef, useState } from "react";

// Components
import Results from "../results";
import TripChoice from "../tripChoice";
import DatePick from "../datePick";

// Mock Data
import Cities from "../../data/cities.json";
import Flights from "../../data/flights.json";

// This turns the date to our common usage
function formatDate(inputDate) {
  const parts = inputDate.split("-");
  const formattedDate = `${parts[2]}.${parts[1]}.${parts[0]}`;
  return formattedDate;
}

// NOTES:
// Süsleme gerekli
// Sonuçlar gelirken bekleme özelliği eklenecek

function SearchUi() {
  const [fromText, setFromText] = useState("");
  const [toText, setToText] = useState("");
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

  const onBlurTimeout = useRef(null);
  const handleBlur = (type) => {
    if (onBlurTimeout.current) {
      clearTimeout(onBlurTimeout.current);
    }

    if (type === "to") {
      onBlurTimeout.current = setTimeout(() => {
        setShowOptionsTo(false);
      }, 100);
    } else {
      onBlurTimeout.current = setTimeout(() => {
        setShowOptionsFrom(false);
      }, 100);
    }
  };

  // Handle Click From Options
  const handleClickFromOptions = (option) => {
    setFormData((prevData) => ({
      ...prevData,
      from: option,
    }));
    setFromText(option);
    setShowOptionsFrom(false);

    if (formData.to === option) {
      setFormData((prevData) => ({
        ...prevData,
        from: option,
        to: formData.from,
      }));
      setToText(formData.from);
    }
  };

  // Handle Click To Options
  const handleClickToOptions = (option) => {
    setFormData((prevData) => ({
      ...prevData,
      to: option,
    }));
    setShowOptionsTo(false);
    setToText(option);

    if (formData.from === option) {
      setFormData((prevData) => ({
        ...prevData,
        to: option,
        from: formData.to,
      }));
      setFromText(formData.to);
    }
  };

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
                value={fromText}
                onChange={(e) => {
                  setFromText(e.target.value);
                }}
                placeholder='Type or select...'
                onFocus={() => {
                  setShowOptionsFrom(true);
                }}
                className='rounded-md p-1 border-black border text-lg w-auto'
                onBlur={() => handleBlur("from")}
              />
              {showOptionsFrom && (
                <ul className='absolute top-full left-0 w-full z-10 text-lg'>
                  {fromOptions
                    .filter((option) =>
                      option.toLowerCase().includes(fromText.toLowerCase())
                    )
                    .map((option, index) => (
                      <option
                        key={index}
                        onClick={() => handleClickFromOptions(option)}
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
                value={toText}
                onChange={(e) => setToText(e.target.value)}
                placeholder='Type or select...'
                onFocus={() => setShowOptionsTo(true)}
                className='p-1 rounded-md border-black border text-lg'
                onBlur={() => handleBlur("to")}
              />
              {showOptionsTo && (
                <ul className='absolute top-full left-0 w-full z-10 text-lg'>
                  {toOptions
                    .filter((option) =>
                      option.toLowerCase().includes(toText.toLowerCase())
                    )
                    .map((option, index) => (
                      <option
                        key={index}
                        onClick={() => handleClickToOptions(option)}
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
          isOneWay={isOneWay}
          setFormData={setFormData}
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
