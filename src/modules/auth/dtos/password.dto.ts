import { z } from 'zod';

export type ForgotPasswordDto = z.output<typeof ForgotPassword>;
export const ForgotPassword = z.object({
  credential: z.string().trim().email(),
});

export type ResetPasswordDto = z.output<typeof ResetPassword>;
export const ResetPassword = z.object({
  credential: z.string().trim().email(),
  code: z.string().trim().min(1),
  password: z.string().trim().min(8),
  confirmPassword: z.string().trim(),
})
.refine(
  (body) => {
    return (body.password === body.confirmPassword);
  },
  {
    message: 'Senhas informadas estão diferentes.',
  },
);
