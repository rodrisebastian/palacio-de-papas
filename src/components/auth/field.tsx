type FieldProps = {
  id: string;
  label: string;
  type?: "text" | "email" | "password";
  autoComplete: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
};

export function Field({
  id,
  label,
  type = "text",
  autoComplete,
  value,
  onChange,
  error,
}: FieldProps) {
  const errorId = `${id}-error`;

  return (
    <div>
      <label htmlFor={id} className="mb-1 block font-bold">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        autoComplete={autoComplete}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className="min-h-12 w-full rounded-xl border-2 border-muted-foreground bg-card px-4 text-base aria-invalid:border-ruby"
      />
      {error && (
        <p id={errorId} className="mt-1 text-sm font-bold text-ruby">
          {error}
        </p>
      )}
    </div>
  );
}