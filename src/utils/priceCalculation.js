export function getSessionExtra(sessionTypeName) {
  if (sessionTypeName === "in_person") return 30;
  if (sessionTypeName === "hybrid") return 50;
  if (sessionTypeName === "online") return "Included";
  return 0;
}

export function getTotalPrice(basePrice, sessionType) {
  const sessionExtra = getSessionExtra(sessionType?.name);

  const totalPrice = Number(sessionExtra)
    ? Number(basePrice) + Number(sessionExtra)
    : Number(basePrice);

  return {
    sessionExtra,
    totalPrice,
  };
}
