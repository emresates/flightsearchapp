import React, { useEffect } from "react";
import { DateIcon } from "../icons";

function DatePick({ formData, isOneWay, setFormData }) {
  // This use effect checks the isOneWay situation, if departure date value is smaller then return date value
  // It changes the values
  useEffect(() => {
    // Copy current data
    const updatedFormData = {
      ...formData,
    };

    const departureTimestamp = Date.parse(updatedFormData.departure);
    const returnTimestamp = Date.parse(updatedFormData.return);

    if (formData.return && returnTimestamp < departureTimestamp) {
      setFormData({
        ...updatedFormData,
        departure: updatedFormData.return,
        return: updatedFormData.departure,
      });
    } else {
      setFormData(updatedFormData);
    }
  }, [isOneWay]);

  // It sets the date
  const handleChange = (event) => {
    const { name, value } = event.target;

    // Copy current data
    const updatedFormData = {
      ...formData,
      [name]: value,
    };

    // Validation
    if (name === "departure" && !updatedFormData.return) {
      setFormData(updatedFormData);
      return;
    }

    if (name === "return" && !updatedFormData.departure) {
      setFormData(updatedFormData);
      return;
    }

    // If choosen return date is earlier than departure, it changes to dates. Same goes for departure.
    const departureTimestamp = Date.parse(updatedFormData.departure);
    const returnTimestamp = Date.parse(updatedFormData.return);

    if (name === "return" && returnTimestamp < departureTimestamp) {
      setFormData({
        ...updatedFormData,
        [name]: updatedFormData.departure,
        departure: value,
      });
    } else if (
      !isOneWay &&
      name === "departure" &&
      departureTimestamp > returnTimestamp
    ) {
      setFormData({
        ...updatedFormData,
        departure: updatedFormData.return,
        return: value,
      });
    } else {
      setFormData(updatedFormData);
    }
  };

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
            onChange={(e) => handleChange(e)}
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
            onChange={(e) => handleChange(e)}
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
}

export default DatePick;
