function GetStars(rating) {
  if (!rating) return "☆☆☆☆☆";

  const roundedRating = Math.round(rating);

  return "★".repeat(roundedRating) + "☆".repeat(5 - roundedRating);
}

export default GetStars;
