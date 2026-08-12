const registrationOf = (student) => String(
  student?.registration_no ?? student?.roll_number ?? student?.registrationNumber ?? ""
).trim();

// Registration numbers are sorted naturally: 03, 08, 19, 26 rather than
// alphabetically. Missing registration numbers are always shown last.
const registrationComparator = new Intl.Collator(undefined, {
  numeric: true,
  sensitivity: "base",
});

export const sortByRegistrationNumber = (students) => [...students].sort((left, right) => {
  const leftRegistration = registrationOf(left);
  const rightRegistration = registrationOf(right);
  const leftMissing = !leftRegistration || leftRegistration === "-";
  const rightMissing = !rightRegistration || rightRegistration === "-";

  if (leftMissing !== rightMissing) return leftMissing ? 1 : -1;
  const registrationOrder = registrationComparator.compare(leftRegistration, rightRegistration);
  if (registrationOrder !== 0) return registrationOrder;

  return registrationComparator.compare(
    String(left?.student_name ?? left?.name ?? ""),
    String(right?.student_name ?? right?.name ?? "")
  );
});
