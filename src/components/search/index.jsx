"use client";

import React, { useEffect, useRef, useState } from "react";

// Components
import Results from "../results";
import DatePick from "../datePick";
import TripTypeChoice from "../tripChoice";

// Mock Data
import Cities from "../../data/cities.json";
import Flights from "../../data/flights.json";

// This turns the date to our common usage
function formatDate(inputDate) {
  const parts = inputDate.split("-");
  const formattedDate = `${parts[2]}.${parts[1]}.${parts[0]}`;
  return formattedDate;
}

function SearchUi() {
  //! *********************** STATES ************************* !\\
  // Written text states
  const [fromText, setFromText] = useState("");
  const [toText, setToText] = useState("");

  // City option show states
  const [showOptionsFrom, setShowOptionsFrom] = useState(false);
  const [showOptionsTo, setShowOptionsTo] = useState(false);

  // City Options
  const [fromOptions, setFromOptions] = useState();
  const [toOptions, setToOptions] = useState();

  // Is the trip one way or not
  const [isOneWay, setIsOneWay] = useState(false);

  // FORM DATA
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    departure: "",
    return: "",
  });

  // If data comes from an API call, these are unneccessary, because
  // there will be a load time automatically
  // But i use mock data and i have created a loading situation.
  const [isLoadingDeparture, setIsLoadingDeparture] = useState(false); // Departure loading sit.
  const [isLoadingReturn, setIsLoadingReturn] = useState(false); // Return loading sit.

  const [searchDataDeparture, setSearchDataDeparture] = useState([]); // Departure results
  const [searchDataReturn, setSearchDataReturn] = useState([]); // Return results

  //! *********************** REFS ************************* !\\
  // Mouse leave ref
  const onBlurTimeout = useRef(null);

  //! *********************** MANDATORY DEFINITIONS ************************* !\\
  // If form is incomplete, it doesn't show the data
  const isFormIncomplete = isOneWay
    ? ["from", "to", "departure"].some((field) => formData[field] === "")
    : Object.values(formData).some((value) => value === "");

  // Reformat the types of choosen dates
  const dateDeparture = formatDate(formData.departure);
  const dateReturn = formatDate(formData.return);

  //! *********************** USE EFFECTS ************************* !\\
  // When it loads first time, it takes the cities data
  useEffect(() => {
    setFromOptions(Cities.results);
    setToOptions(Cities.results);
  }, []);

  // Departure data loading situation
  useEffect(() => {
    if (!isFormIncomplete) {
      setIsLoadingDeparture(true);
      setTimeout(() => {
        const searchData = Flights.results.filter((item) => {
          return (
            item.from === formData.from &&
            item.to === formData.to &&
            item.departuredate === dateDeparture
          );
        });
        console.log(searchData);
        setSearchDataDeparture(searchData);
        setIsLoadingDeparture(false);
      }, 2000);
    }
  }, [formData.from, formData.to, dateDeparture, isFormIncomplete]);

  // Return data loading situation
  useEffect(() => {
    if (!isFormIncomplete) {
      setIsLoadingReturn(true);
      setTimeout(() => {
        const searchData = Flights.results.filter((item) => {
          return (
            item.from === formData.to &&
            item.to === formData.from &&
            item.departuredate === dateReturn
          );
        });
        console.log(searchData);
        setSearchDataReturn(searchData);
        setIsLoadingReturn(false);
      }, 2000);
    }
  }, [formData.from, formData.to, dateReturn, isFormIncomplete]);

  //! *********************** FUNCTIONS ************************* !\\

  //  When you click another place, this function closes the options
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
      <section className='backdrop-blur-xl rounded-xl shadow-2xl shadow-black text-white w-1/3 mx-auto p-14'>
        {/* Trip Type Choice */}
        <TripTypeChoice isOneWay={isOneWay} setIsOneWay={setIsOneWay} />

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
                placeholder='Type or select...'
                onChange={(e) => setFromText(e.target.value)}
                onFocus={() => setShowOptionsFrom(true)}
                onBlur={() => handleBlur("from")}
                className='rounded-md pl-2 py-0.5 border placeholder-slate-950 text-lg w-auto shadow-md shadow-white text-white bg-transparent outline-none border-white'
                autocomplete='off'
              />
              {showOptionsFrom && (
                <ul className='absolute top-full left-0 w-full z-10 text-lg text-black'>
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
                placeholder='Type or select...'
                onChange={(e) => setToText(e.target.value)}
                onFocus={() => setShowOptionsTo(true)}
                onBlur={() => handleBlur("to")}
                className='rounded-md pl-2 py-0.5 border placeholder-slate-950 text-lg w-auto shadow-md shadow-white text-white bg-transparent outline-none border-white'
                autocomplete='off'
              />
              {showOptionsTo && (
                <ul className='absolute top-full left-0 w-full z-10 text-lg text-black'>
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
        isLoadingReturn={isLoadingReturn}
        isLoadingDeparture={isLoadingDeparture}
      />
    </div>
  );
}

export default SearchUi;
