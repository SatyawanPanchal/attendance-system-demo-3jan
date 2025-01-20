import { useEffect, useState } from "react";

const Test = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [minDate, setMinDate] = useState("");
  const [maxDate, setMaxDate] = useState("");

  

  useEffect(()=>{
    const today = new Date();
    const twoDaysAgo = new Date(today);

    twoDaysAgo.setDate(today.getDate() - 2);

    const formatDate=(date)=>{
        return date.toISOString().split("T")[0];
    }

    setMinDate(formatDate(twoDaysAgo));
    setMaxDate(formatDate(today));



  },[]);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    
  };


  return (
    <div>
      <input
        type="date"
        name="datePicker"
        min={minDate}
        max={maxDate}
        value={selectedDate}
        onChange={handleDateChange}
      />
    </div>
  );
};

export default Test;
