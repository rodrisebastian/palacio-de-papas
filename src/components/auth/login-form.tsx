"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Field } from "@/components/auth/field";
import { Button } from "@/components/ui/button";
import { signInErrorMessage } from "@/lib/auth-errors";
import { signIn } from "@/lib/auth-client";
import { toFieldErrors } from "@/lib/form-errors";
import { loginSchema } from "@/schemas/auth";

type LoginErrors = Partial<Record<"email" | "password", string>>;

export function LoginForm({ next }: { next: string }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<LoginErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const registerHref =
    next === "/" ? "/register" : `/register?next=${encodeURIComponent(next)}`;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);

    const parsed = loginSchema.safeParse({ email: email.trim(), password });

    if (!parsed.success) {
      setErrors(toFieldErrors<"email" | "password">(parsed.error.issues));
      return;
    }

    setErrors({});
    setPending(true);

    const { error } = await signIn.email(parsed.data);

    if (error) {
      setFormError(signInErrorMessage(error));
      setPending(false);
      return;
    }

    router.push(next);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <Field
        id="email"
        label="Email"
        type="email"
        autoComplete="email"
        value={email}
        onChange={setEmail}
        error={errors.email}
      />
      <Field
        id="password"
        label="Contraseña"
        type="password"
        autoComplete="current-password"
        value={password}
        onChange={setPassword}
        error={errors.password}
      />
      {formError && (
        <p role="alert" className="rounded-xl border-2 border-ruby p-3 font-bold text-ruby">
          {formError}
        </p>
      )}
      <Button
        type="submit"
        size="lg"
        disabled={pending}
        className="h-12 w-full text-base font-extrabold"
      >
        {pending ? "Ingresando..." : "Ingresar"}
      </Button>
      <p className="text-center">
        ¿No tenés cuenta?{" "}
        <Link href={registerHref} className="font-bold text-ruby underline underline-offset-4">
          Registrate
        </Link>
      </p>
    </form>
  );
}