export type Environment = "local" | "development" | "production" | "test";

export function getEnv(): Environment {
  return (process.env.NODE_ENV as Environment) || "local";
}