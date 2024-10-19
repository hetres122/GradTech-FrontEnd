export interface PasswordValidationErrors {
  missingUpperCase: boolean;
  missingLowerCase: boolean;
  missingDigit: boolean;
}

export type PasswordValidationOptionalErrors = Partial<PasswordValidationErrors>;
