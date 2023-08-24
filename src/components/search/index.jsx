"use client";

import React, { useEffect, useState } from "react";
import { DateIcon } from "../icons";
import Cities from "../../data/cities.json";
import Flights from "../../data/flights.json";
import Results from "../results";

function formatDate(inputDate) {
  const parts = inputDate.split("-"); // Tarihi parçalara ayırıyoruz
  const formattedDate = `${parts[2]}.${parts[1]}.${parts[0]}`; // Gün.ay.yıl formatına dönüştürüyoruz
  return formattedDate;
}

// Notes: 
//  - From şehrini seçince To şehrine veri geri gelmiyor

function SearchUi() {
  const [showOptionsFrom, setShowOptionsFrom] = useState(false);
  const [showOptionsTo, setShowOptionsTo] = useState(false);

  const [fromOptions, setFromOptions] = useState();
  const [toOptions, setToOptions] = useState();

  const [isOneWay, setIsOneWay] = useState(false);
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    departure: "",
    return: "",
  });

  useEffect(() => {
    setFromOptions(Cities.results);
    setToOptions(Cities.results);
  }, []);

  useEffect(() => {
    if (formData.from) {
      const updatedToOptions = toOptions?.filter(
        (option) => option !== formData.from
      );
      setToOptions(updatedToOptions);
    }
  }, [formData.from]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const TripChoice = () => {
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
  };

  const DatePick = () => {
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
  };

  console.log(formData);
  const date = formatDate(formData.departure);
  console.log(date);

  const searchData = Flights.results.filter((item) => {
    return (
      item.from === formData.from &&
      item.to === formData.to &&
      item.departuredate === date
    );
  });

  console.log("Search Data", searchData);

  return (
    <div>
      <section className='bg-yellow-300 rounded-xl text-black w-1/3 mx-auto mt-10 p-14'>
        <TripChoice />

        <div className='flex gap-x-4 w-full justify-between'>
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
                  <option
                    onClick={() =>
                      setFormData((prevData) => ({
                        ...prevData,
                        from: "Select",
                      }))
                    }
                    className='border-b pl-2 rounded-md bg-white border-black cursor-pointer hover:bg-yellow-200 transition-all'
                  >
                    Select
                  </option>
                  {fromOptions
                    .filter((option) =>
                      option.toLowerCase().includes(formData.from.toLowerCase())
                    )
                    .map((option, index) => (
                      <li
                        key={index}
                        onClick={() => {
                          setFormData((prevData) => ({
                            ...prevData,
                            from: option,
                          }));
                          setShowOptionsFrom(false);
                        }}
                        className='border-b pl-2 rounded-md bg-white border-black cursor-pointer hover:bg-yellow-200 transition-all'
                      >
                        {option}
                      </li>
                    ))}
                </ul>
              )}
            </div>
          </div>
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
                  <option
                    onClick={() => {
                      setFormData((prevData) => ({
                        ...prevData,
                        to: "Select",
                      }));
                      setShowOptionsTo(false);
                    }}
                    className='border-b pl-2 rounded-md bg-white border-black cursor-pointer hover:bg-yellow-200 transition-all'
                  >
                    Select
                  </option>
                  {toOptions
                    .filter((option) =>
                      option.toLowerCase().includes(formData.to.toLowerCase())
                    )
                    .map((option, index) => (
                      <option
                        key={index}
                        onClick={() => {
                          setFormData((prevData) => ({
                            ...prevData,
                            to: option,
                          }));
                          setShowOptionsTo(false);
                        }}
                        className='border-b pl-2 rounded-md bg-white border-black cursor-pointer hover:bg-yellow-200 transition-all'
                      >
                        {option}
                      </option>
                    ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        <DatePick />
      </section>
      <Results resultsOneWay={searchData} />
    </div>
  );
}

export default SearchUi;
