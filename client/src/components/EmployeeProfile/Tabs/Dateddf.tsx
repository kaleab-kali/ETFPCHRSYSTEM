import React, { useState } from "react";
import { DatePicker } from "antd";
import moment from "moment";
import { EthDateTime } from "ethiopian-calendar-date-converter";

const EthiopianDatePicker: React.FC = () => {
  const [date, setDate] = useState<moment.Moment | null>(null);

  const amharicMonths = [
    "መስከረም",
    "ጥቅምት",
    "ኅዳር",
    "ታኅሳስ",
    "ጥር",
    "የካቲት",
    "መጋቢት",
    "ሚያዝያ",
    "ግንቦት",
    "ሰኔ",
    "ሐምሌ",
    "ነሐሴ",
    "ጳጉሜን",
  ];

  const handleDateChange = (date: moment.Moment | null) => {
    setDate(date);
    if (date) {
const correctedDate = date.clone().add(1, "day");
        // Convert the corrected Gregorian date to Ethiopian date
      const ethDateTime = EthDateTime.fromEuropeanDate(correctedDate.toDate());
      const day = ethDateTime.date;
      const month = ethDateTime.month;
      const year = ethDateTime.year;
      const amharicMonthName = amharicMonths[month - 1];
      console.log(
        `Selected Ethiopian Date: ${day} ${amharicMonthName} ${year}`
      );
    }
  };

  const currentEthDateTime = EthDateTime.now();
  const currentDay = currentEthDateTime.date;
  const currentMonth = currentEthDateTime.month;
  const currentYear = currentEthDateTime.year;
  const currentAmharicMonthName = amharicMonths[currentMonth - 1];

  return (
    <div>
      <h3>
        Today's Ethiopian Date: {currentDay} {currentAmharicMonthName}{" "}
        {currentYear}
      </h3>
      <DatePicker
        value={date}
        onChange={handleDateChange}
        format="YYYY-MM-DD"
        placeholder="Select Date"
      />
    </div>
  );
};

export default EthiopianDatePicker;
