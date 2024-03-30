export function isIntervalValid(start: string, end: string): boolean {
  if(start == "" || end == "") return false;
  const startDate = new Date(start);
  const endDate = new Date(end);
  return startDate <= endDate;
}

export function formatSocialSecurity(socialSecurity: string) {
  const groups = socialSecurity.match(/.{1,3}/g);
  if (groups) {
    return groups.join('-');
  }
  return socialSecurity;
}

export function formatDate(dateString: string) {
  const parts = dateString.split('-');
  const year = parts[0];
  const month = parts[1];
  const day = parts[2];

  const formattedDate = `${year}. ${month}. ${day}.`;

  return formattedDate;
}
