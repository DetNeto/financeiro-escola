export function calculateAge(
  date
) {

  if (!date) {
    return "-";
  }

  const today =
    new Date();

  const birthDate =
    new Date(date);

  let age =
    today.getFullYear() -
    birthDate.getFullYear();

  const monthDiff =
    today.getMonth() -
    birthDate.getMonth();

  if (

    monthDiff < 0 ||

    (
      monthDiff === 0 &&
      today.getDate() <
        birthDate.getDate()
    )
  ) {

    age--;
  }

  return `${age} anos`;
}