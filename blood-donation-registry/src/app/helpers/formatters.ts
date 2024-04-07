//000000000 to 000-000-000
export function formatSocialSecurity(socialSecurity: string) {
  const groups = socialSecurity.match(/.{1,3}/g);
  if (groups) {
    return groups.join('-');
  }
  return socialSecurity;
}

//yyyy-MM-dd to yyyy. MM. dd.
export function formatDate(dateString: string) {
  const parts = dateString.split('-');
  const year = parts[0];
  const month = parts[1];
  const day = parts[2];

  const formattedDate = `${year}. ${month}. ${day}.`;

  return formattedDate;
}
