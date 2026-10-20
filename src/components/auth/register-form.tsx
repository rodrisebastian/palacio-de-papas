"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Field } from "@/components/auth/field";
import { Button } from "@/components/ui/button";
import { signUpErrorMessage } from "@/lib/auth-errors";
import { signUp } from "@/lib/auth-client";
import { toFieldErrors } from "@/lib/form-errors";
import { registerSchema } from "@/schemas/auth";

type RegisterField = "name" | "email" | "password" | "confirmPassword";

export function RegisterForm({ next }: { next: string }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<Partial<Record<RegisterField, string>>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const loginHref =
    next === "/" ? "/login" : `/login?next=${encodeURIComponent(next)}`;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);

    const parsed = registerSchema.safeParse({
      name,
      email: email.trim(),
      password,
      confirmPassword,
    });

    if (!parsed.success) {
      setErrors(toFieldErrors<RegisterField>(parsed.error.issues));
      return;
    }

    setErrors({});
    setPending(true);

    const { error } = await signUp.email({
      name: parsed.data.name,
      email: parsed.data.email,
      password: parsed.data.password,
    });

    if (error) {
      setFormError(signUpErrorMessage(error));
      setPending(false);
      return;
    }

    router.push(next);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <Field
        id="name"
        label="Nombre"
        autoComplete="name"
        value={name}
        onChange={setName}
        error={errors.name}
      />
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
        label="Contraseña (mínimo 8 caracteres)"
        type="password"
        autoComplete="new-password"
        value={password}
        onChange={setPassword}
        error={errors.password}
      />
      <Field
        id="confirmPassword"
        label="Repetí la contraseña"
        type="password"
        autoComplete="new-password"
        value={confirmPassword}
        onChange={setConfirmPassword}
        error={errors.confirmPassword}
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
        {pending ? "Creando tu cuenta..." : "Crear cuenta"}
      </Button>
      <p className="text-center">
        ¿Ya tenés cuenta?{" "}
        <Link href={loginHref} className="font-bold text-ruby underline underline-offset-4">
          Ingresá
        </Link>
      </p>
    </form>
  );
}