import moment from 'moment';

export  const generateDateOptions = () => {
    const yesterday = moment().subtract(1, 'days').format('YYYY-MM-DD');
    const today = moment().format('YYYY-MM-DD');
    const tomorrow = moment().add(1, 'days').format('YYYY-MM-DD');

    const dateOptions = [
      { label: 'Yesterday', value: yesterday },
      { label: 'Today', value: today },
      { label: 'Tomorrow', value: tomorrow },
    ];

    for (let i = 1; i <= 22; i++) {
      const futureDate = moment().add(i, 'days').format('YYYY-MM-DD');
      const labelDate = moment().add(i, 'days').format('DD MMMM');
      dateOptions.push({ label: labelDate, value: futureDate });
    }

    return dateOptions;
  };

  export const getCardColor = (status) => {
    switch (status) {
      case 'Departed':
        return '#90EE90'; // light green
      case 'Scheduled':
        return '#ADD8E6'; // light blue
      case 'Delayed':
        return '#FFFFE0'; // light yellow
      case 'Canceled':
        return '#FFC0CB'; // light pink
      default:
        return '#FFFFFF'; // white
    }
  };
