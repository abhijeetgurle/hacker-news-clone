export const getProcessedTIme = (posts) => {
  const timestamp = [];

  for (const post of posts) {
    const diffInMiliSec = new Date() - new Date(post.created_at);
    const diffInHour = Math.round(diffInMiliSec / (1000 * 60 * 60));
    const diffInDays = Math.round(diffInHour / 24);
    const diffInMonths = Math.round(diffInDays / 30);
    const diffInYears = Math.round(diffInMonths / 12);

    if (diffInYears >= 1) {
      timestamp.push(diffInYears + " years ago");
    } else if (diffInMonths >= 1) {
      timestamp.push(diffInMonths + " months ago");
    } else if (diffInDays >= 1) {
      timestamp.push(diffInDays + " days ago");
    } else if (diffInHour >= 1) {
      timestamp.push(diffInHour + " hours ago");
    } else {
      timestamp.push("just now");
    }
  }

  return timestamp;
};
