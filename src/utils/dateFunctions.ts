export const getTodayFormat = (
) => {
  return new Date().toLocaleString("en-ZA", {timeZone: "America/Bogota"}).replaceAll('/','-').replaceAll(',','')
}