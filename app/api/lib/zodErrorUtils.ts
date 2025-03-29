import { z } from "zod";
type ValidationResult = ReturnType<typeof z.ZodType.prototype.safeParse>;

/**
 * Extracts validation errors from a Zod safeParse result.
 * 
 * @param validationData - The result of a Zod safeParse operation.
 * @returns An array of formatted validation errors, or an empty array if validation is successful.
 */
export const extractSafeParseErrors = (validationData: ValidationResult) => {
  if (!validationData?.success) {
    return validationData?.error?.errors?.map((err) => ({
      field: err.path.join("."), // Converts error path array to a dot-separated string
      message: err.message, // Retrieves the error message
      code: err.code, // Retrieves the specific error code
    }));
  }
  return []; // Returns an empty array if validation is successful
};
