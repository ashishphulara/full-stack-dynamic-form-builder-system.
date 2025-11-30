import { FormSchema } from "../schema/formSchema";

export interface ValidationErrors {
  [field: string]: string;
}

export const validateSubmission = (
  schema: FormSchema,
  data: Record<string, any>,
): ValidationErrors => {
  const errors: ValidationErrors = {};

  for (const field of schema.fields) {
    const value = data[field.name];
    const rules = field.validations || {};

    // required
    if (
      rules.required &&
      (value === undefined || value === null || value === "")
    ) {
      errors[field.name] = `${field.label} is required`;
      continue;
    }

    if (value === undefined || value === null || value === "") continue;

    // minLength / maxLength
    if (rules.minLength && String(value).length < rules.minLength) {
      errors[
        field.name
      ] = `${field.label} must be at least ${rules.minLength} characters`;
    }

    if (rules.maxLength && String(value).length > rules.maxLength) {
      errors[
        field.name
      ] = `${field.label} must be at most ${rules.maxLength} characters`;
    }

    // regex
    if (rules.regex) {
      const regex = new RegExp(rules.regex);
      if (!regex.test(String(value))) {
        errors[field.name] = `${field.label} is invalid`;
      }
    }

    // min / max for numbers
    if (field.type === "number") {
      const num = Number(value);
      if (Number.isNaN(num)) {
        errors[field.name] = `${field.label} must be a number`;
      } else {
        if (rules.min !== undefined && num < rules.min) {
          errors[field.name] = `${field.label} must be at least ${rules.min}`;
        }
        if (rules.max !== undefined && num > rules.max) {
          errors[field.name] = `${field.label} must be at most ${rules.max}`;
        }
      }
    }

    // minDate
    if (field.type === "date" && rules.minDate) {
      const inputDate = new Date(value);
      const minDate = new Date(rules.minDate);
      if (inputDate < minDate) {
        errors[field.name] = `${field.label} must be after ${rules.minDate}`;
      }
    }

    // minSelected / maxSelected for multi-select
    if (field.type === "multi-select" && Array.isArray(value)) {
      if (rules.minSelected && value.length < rules.minSelected) {
        errors[
          field.name
        ] = `${field.label} must have at least ${rules.minSelected} options selected`;
      }
      if (rules.maxSelected && value.length > rules.maxSelected) {
        errors[
          field.name
        ] = `${field.label} must have at most ${rules.maxSelected} options selected`;
      }
    }
  }

  return errors;
};
