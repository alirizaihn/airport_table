import moment from "moment";

export const generateDateOptions = () => {
  const yesterday = moment().subtract(1, "days").format("YYYY-MM-DD");
  const today = moment().format("YYYY-MM-DD");
  const tomorrow = moment().add(1, "days").format("YYYY-MM-DD");

  const dateOptions = [
    { label: "Yesterday", value: yesterday },
    { label: "Today", value: today },
    { label: "Tomorrow", value: tomorrow },
  ];

  for (let i = 1; i <= 22; i++) {
    const futureDate = moment().add(i, "days").format("YYYY-MM-DD");
    const labelDate = moment().add(i, "days").format("DD MMMM");
    dateOptions.push({ label: labelDate, value: futureDate });
  }

  return dateOptions;
};

