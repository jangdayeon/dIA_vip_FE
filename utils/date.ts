// export function formatDate(date: Date): string {
//   const year = date.getFullYear().toString();
//   const month = (date.getMonth() + 1).toString().padStart(2, '0');
//   const day = date.getDate().toString().padStart(2, '0');

//   return `${year}${month}${day}`;
// }

/**
 * yyyy-mm-dd 날짜 형식을 yyyy.mm.dd 형식으로 지정해주는 함수입니다.
 */
export function formatDate(date: string): string {
  return date.split('-').join('.');
}

/**
 * yyyyMMdd 형식으로 생성된 날짜 string을 Date 객체로 바꾸는 함수입니다.
 * JSON으로 받은 날짜를 Date 객체로 관리하고 싶다면 밑의 parseFormattedDate 함수를 사용해주시길 바랍니다.
 */
export function parseFormattedDate(dateString: string): Date {
  const year = parseInt(dateString.slice(0, 4), 10);
  const month = parseInt(dateString.slice(4, 6), 10) - 1;
  const day = parseInt(dateString.slice(6, 8), 10);

  return new Date(year, month, day);
}
