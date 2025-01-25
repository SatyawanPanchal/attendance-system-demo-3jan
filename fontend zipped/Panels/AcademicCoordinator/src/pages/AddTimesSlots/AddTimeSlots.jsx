import { useEffect, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MultiSectionDigitalClock } from "@mui/x-date-pickers/MultiSectionDigitalClock";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";

const server_url = import.meta.env.VITE_SERVER_URL;
const AddTimeSlots = () => {
  const [allData, setAllData] = useState({
    slotName: "",
    classStartsFrom: "",
    classEndsAt: "",
  });

  const slotValues = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting data: ", allData);

    try {
      const response = await axios.post(
        `${server_url}/api/academics/addTimeTableSlots`,
        allData
      );
      console.log(
        "response from server while submitting the slots..",
        response.data
      );
    } catch (error) {
      console.log(
        "response from server while submitting the slots..",
        error.message
      );
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAllData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleTimeChange = (time, name) => {
    setAllData((prevData) => ({
      ...prevData,
      [name]: time ? time.format("hh:mm A") : "",
    }));
  };

  useEffect(() => {
    console.log("Updated Data:", allData);
  }, [allData]);

  return (
    <>
    <Navbar/>
    <h1>We will add here timing of classes in Institute </h1>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="main_container">
        <form onSubmit={handleSubmit}>
          {/* Choose Slot */}
          <div className="elements">
            <label>
              Choose <b>Slot No.</b>
            </label>
            <select
              name="slotName"
              value={allData.slotName}
              onChange={handleChange}
              required
            >
              <option value="">Select Slot Number Below</option>
              {slotValues.map((slot, index) => (
                <option key={index} value={slot.toUpperCase()}>
                  {slot.toUpperCase()}
                </option>
              ))}
            </select>
          </div>

          {/* Class Starts From */}
          <div className="elements">
            <label>
              Class <b>Starts From</b>
            </label>
            <input
              type="text"
              value={allData.classStartsFrom}
              readOnly
              placeholder="Select start time" required
            />
            <MultiSectionDigitalClock
              onChange={(time) => handleTimeChange(time, "classStartsFrom")}
              ampm
            />
          </div>

          {/* Class Ends At */}
          <div className="elements">
            <label>
              Class <b>Ends At</b>
            </label>
            <input
              type="text"
              value={allData.classEndsAt}
              readOnly
              placeholder="Select end time" required
            />
            <MultiSectionDigitalClock
              onChange={(time) => handleTimeChange(time, "classEndsAt")}
              ampm
            />
          </div>

          <button className="submitButton">Add</button>
        </form>
      </div>
    </LocalizationProvider>
</>

  );
};

export default AddTimeSlots;
