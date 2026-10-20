type IssueLike = { path: PropertyKey[]; message: string };

export function toFieldErrors<K extends string>(issues: IssueLike[]) {
  const errors: Partial<Record<K, string>> = {};

  for (const issue of issues) {
    const key = String(issue.path[0]) as K;
    if (!errors[key]) {
      errors[key] = issue.message;
    }
  }

  return errors;
}