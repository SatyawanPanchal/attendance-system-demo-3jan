import shortid from "shortid";

function generateSpecifiedId(idFor, prefixString) {
  let Id = "";

  const shortID = shortid.generate();

  const now = new Date();

  // Abbreviations for months and days
  const monthAbbreviations = [
    "jan",
    "feb",
    "mar",
    "apr",
    "may",
    "jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const dayAbbreviations = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

  // Get components
  const year = now.getFullYear();
  const month = monthAbbreviations[now.getMonth()]; // Three-letter month name
  const day = String(now.getDate()).padStart(2, "0");
  const dayName = dayAbbreviations[now.getDay()]; // Three-letter day name
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  const dateAndTime = `${dayName}_${day}_${month}_${year}_${hours}_${minutes}_${seconds}`;
if(prefixString.length==1)
{
  const firstTwoLetters = prefixString.substring(0, 1).toUpperCase().trim();
    Id = `${idFor.toUpperCase()}_${firstTwoLetters}_${dateAndTime}${shortID}`;
}

  if (prefixString.length == 2) {
    const firstTwoLetters = prefixString.substring(0, 2).toUpperCase().trim();
    Id = `${idFor.toUpperCase()}_${firstTwoLetters}_${dateAndTime}${shortID}`;
  } else if (prefixString.length > 2) {
    const firstThreeLetters = prefixString.substring(0, 3).toUpperCase().trim();
    Id = `${idFor.toUpperCase()}_${firstThreeLetters}_${dateAndTime}${shortID}`;
  }

  return Id;
}

export { generateSpecifiedId };
