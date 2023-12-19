export const formatDateTime = (dateTime) => {
    const formattedDate = new Date(dateTime).toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });

    const formattedTime = new Date(dateTime).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

    return { formattedDate, formattedTime };
  };


