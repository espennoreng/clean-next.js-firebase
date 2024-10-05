import { signUpUseCase } from "@/src/application/use-cases/auth/sign-up.use-case";
import { ValidationError } from "@/src/entities/errors/validation.error";
import { z } from "zod";

const inputSchema = z
  .object({
    email: z.string().email(),
    userName: z.string().min(3).max(31),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });

export async function signUpController(
  input: Partial<z.infer<typeof inputSchema>>
) {
  const { data, error } = inputSchema.safeParse(input);

  if (error) {
    const errors = error.issues.map((issue) => issue.message);
    throw new ValidationError(errors);
  }

  return await signUpUseCase(data);
}
