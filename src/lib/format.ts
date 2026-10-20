const currency = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

export function formatArs(amount: number) {
  return currency.format(amount);
}

const DAY_NAMES = [
  "domingo",
  "lunes",
  "martes",
  "miércoles",
  "jueves",
  "viernes",
  "sábado",
];

const WEEK_ORDER = [1, 2, 3, 4, 5, 6, 0];

export function formatOpenDays(openDays: number[]) {
  const open = WEEK_ORDER.filter((day) => openDays.includes(day));
  const runs: number[][] = [];

  for (const day of open) {
    const last = runs[runs.length - 1];
    if (
      last &&
      WEEK_ORDER.indexOf(day) ===
        WEEK_ORDER.indexOf(last[last.length - 1]) + 1
    ) {
      last.push(day);
    } else {
      runs.push([day]);
    }
  }

  const text = runs
    .map((run) =>
      run.length === 1
        ? DAY_NAMES[run[0]]
        : `${DAY_NAMES[run[0]]} a ${DAY_NAMES[run[run.length - 1]]}`,
    )
    .join(", ");

  return text.charAt(0).toUpperCase() + text.slice(1);
}