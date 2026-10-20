type AuthError = { status: number; code?: string };

export function signInErrorMessage(error: AuthError) {
  if (error.status === 429) {
    return "Demasiados intentos. Esperá un momento y probá de nuevo.";
  }
  if (error.status === 401 || error.code === "INVALID_EMAIL_OR_PASSWORD") {
    return "El email o la contraseña no son correctos.";
  }
  return "No pudimos iniciar sesión. Probá de nuevo.";
}

export function signUpErrorMessage(error: AuthError) {
  if (error.status === 429) {
    return "Demasiados intentos. Esperá un momento y probá de nuevo.";
  }
  if (error.code?.includes("ALREADY_EXISTS")) {
    return "Ya existe una cuenta con ese email. Probá iniciar sesión.";
  }
  return "No pudimos crear tu cuenta. Probá de nuevo.";
}