export const currentMonth = new Date()
  .toLocaleDateString("en-us", {
    month: "short",
  })
  .toLowerCase();
