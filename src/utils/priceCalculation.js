export function getSessionExtra(sessionTypeName) {
  if (sessionTypeName === "in_person") return 30;
  if (sessionTypeName === "hybrid") return 50;
  return 0;
}

export function getTotalPrice(basePrice, sessionType) {
  const sessionExtra = getSessionExtra(sessionType?.name);

  const totalPrice = basePrice + sessionExtra;

  return {
    sessionExtra,
    totalPrice,
  };
}
