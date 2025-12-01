import React, { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { useFormSchemaQuery } from "../../api/formApi";
import { useCreateSubmissionMutation } from "../../api/submissionsApi";

// Field components
import TextField from "./fields/TextField";
import NumberField from "./fields/NumberField";
import SelectField from "./fields/SelectField";
import MultiSelectField from "./fields/MultiSelectField";
import TextareaField from "./fields/TextareaField";
import SwitchField from "./fields/SwitchField";

import { useNavigate } from "react-router-dom";
import DateField from "./fields/DateField";

// ✅ TYPE DEFINITIONS
interface FormField {
  name: string;
  label: string;
  type: string;
  validations?: { required?: boolean };
  placeholder?: string;
  options?: Array<{ label: string; value: string }>;
}

interface FormSchema {
  title: string;
  fields: FormField[];
}

interface FormValues {
  [key: string]: string | number | boolean | string[] | undefined | null;
}

//
// DYNAMIC FORM
// --------------------------------------------------

const DynamicForm: React.FC = () => {
  // Load form schema from API
  const { data: schema, isLoading, isError } = useFormSchemaQuery();

  // Mutation hook to create a submission
  const createSubmission = useCreateSubmissionMutation();
  const navigate = useNavigate();

  // Local state to show temporary success toast
  const [showSuccess, setShowSuccess] = useState(false);
  const [submitErrors, setSubmitErrors] = useState<Record<string, string>>({});

  // TanStack form instance
  const form = useForm({
    defaultValues: {},
    onSubmit: async ({ value }) => {
      try {
        await createSubmission.mutateAsync(value);
        setShowSuccess(true);
        navigate("/submissions");
        setTimeout(() => setShowSuccess(false), 3000);
      } catch (error: any) {
        // ✅ Backend field errors
        if (error?.response?.data?.errors) {
          setSubmitErrors(error.response.data.errors);
        }
      }
    },
  });

  // -------------------- STATES: loading / error --------------------

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fef3ea]">
        <div className="text-center space-y-4 animate-pulse">
          <div className="w-16 h-16 mx-auto border-4 border-orange-400 border-t-transparent rounded-full animate-spin" />
          <p className="text-lg text-slate-700 font-medium">Loading form...</p>
        </div>
      </div>
    );
  }

  if (isError || !schema) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fef3ea]">
        <div className="text-center space-y-4 p-8 bg-white rounded-2xl shadow-lg max-w-md border border-orange-100">
          <div className="w-16 h-16 mx-auto bg-red-50 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <p className="text-lg text-red-600 font-medium">
            Error loading form schema
          </p>
        </div>
      </div>
    );
  }

  // ✅ FIXED handleFormSubmit with proper typing
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!schema || !form.state.values) return;

    // Frontend validation
    const errors: Record<string, string> = {};
    const formValues = form.state.values as FormValues;

    (schema as FormSchema).fields.forEach((field: FormField) => {
      const value = formValues[field.name];

      if (
        field.validations?.required &&
        (!value || value === "" || value === null)
      ) {
        errors[field.name] = `${field.label} is required`;
      }
    });

    if (Object.keys(errors).length > 0) {
      setSubmitErrors(errors);
      return;
    }

    // Clear errors and submit
    setSubmitErrors({});
    form.handleSubmit();
  };

  // -------------------- MAIN UI --------------------

  return (
    <div className="min-h-screen bg-[#fef3ea] flex items-center justify-center px-4 py-10 w-full">
      {/* Card wrapper */}
      <div className="w-full max-w-xl">
        <div className="bg-white rounded-3xl shadow-xl border border-orange-100 overflow-hidden">
          {/* Brand top section */}
          <div className="flex flex-col items-center pt-8 pb-6 px-8">
            <div className="w-10 h-10 rounded-full border border-orange-300 flex items-center justify-center text-sm font-semibold text-orange-500">
              YC
            </div>
            <span className="mt-2 text-sm font-semibold text-orange-500">
              YourCompany
            </span>
          </div>

          {/* Heading stripe */}
          <div className="bg-[#f6e4d4] text-center py-4 px-8 border-y border-orange-100">
            <h1 className="text-base font-semibold text-slate-800 tracking-wide">
              {schema.title}
            </h1>
          </div>

          {/* Full‑screen overlay while submission is in progress */}
          {createSubmission.isPending && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 backdrop-blur-sm">
              <div className="bg-white rounded-3xl p-8 shadow-2xl text-center space-y-4 max-w-sm w-full border border-orange-100">
                <div className="w-12 h-12 mx-auto border-4 border-orange-400 border-t-transparent rounded-full animate-spin" />
                <p className="text-lg font-semibold text-slate-900">
                  Submitting your form...
                </p>
                <p className="text-slate-500 text-sm">Please wait a moment</p>
              </div>
            </div>
          )}

          {/* Top‑right success toast after submit */}
          {showSuccess && (
            <div className="fixed top-6 right-6 bg-emerald-500 text-white px-6 py-3 rounded-2xl shadow-lg flex items-center space-x-3 z-50">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="font-semibold text-sm">
                Submitted successfully!
              </span>
            </div>
          )}

          {/* Actual form body */}
          <form
            onSubmit={handleFormSubmit}
            className="px-8 pt-6 pb-8 space-y-5 text-slate-900">
            {/* Dynamically render each field based on schema */}
            {(schema as FormSchema).fields.map(
              (field: FormField, index: number) => (
                <div
                  key={field.name}
                  className="animate-slide-up"
                  style={{ animationDelay: `${index * 0.05}s` }}>
                  <form.Field name={field.name}>
                    {(fieldApi) => {
                      const commonProps: any = {
                        label: field.label,
                        required: field.validations?.required,
                        error:
                          fieldApi.state.meta.errors?.[0] ||
                          submitErrors[field.name] ||
                          "",
                        placeholder: field.placeholder,
                        validations: field.validations,
                        clearError: () =>
                          setSubmitErrors((prev) => ({
                            ...prev,
                            [field.name]: "",
                          })),
                      };

                      // Decide which field component to render
                      switch (field.type) {
                        case "text":
                          return (
                            <TextField
                              {...commonProps}
                              value={String(fieldApi.state.value ?? "")}
                              onChange={fieldApi.handleChange}
                            />
                          );

                        case "number":
                          return (
                            <NumberField
                              {...commonProps}
                              value={
                                typeof fieldApi.state.value === "number"
                                  ? fieldApi.state.value
                                  : undefined
                              }
                              onChange={(val: number) =>
                                fieldApi.handleChange(Number(val))
                              }
                            />
                          );

                        case "select":
                          return (
                            <SelectField
                              {...commonProps}
                              value={String(fieldApi.state.value ?? "")}
                              onChange={fieldApi.handleChange}
                              options={field.options || []}
                            />
                          );

                        case "multi-select":
                          return (
                            <MultiSelectField
                              {...commonProps}
                              value={
                                Array.isArray(fieldApi.state.value)
                                  ? fieldApi.state.value
                                  : []
                              }
                              onChange={fieldApi.handleChange}
                              options={field.options || []}
                            />
                          );

                        case "date":
                          return (
                            <DateField
                              label={field.label}
                              required={field.validations?.required}
                              error={
                                fieldApi.state.meta.errors?.[0] ||
                                submitErrors[field.name] ||
                                ""
                              }
                              placeholder={field.placeholder}
                              // clearError={() =>
                              //   setSubmitErrors((prev) => ({
                              //     ...prev,
                              //     [field.name]: "",
                              //   }))
                              // }
                              value={String(fieldApi.state.value ?? "")}
                              onChange={fieldApi.handleChange}
                            />
                          );

                        case "textarea":
                          return (
                            <TextareaField
                              {...commonProps}
                              value={String(fieldApi.state.value ?? "")}
                              onChange={fieldApi.handleChange}
                            />
                          );

                        case "switch":
                          return (
                            <SwitchField
                              {...commonProps}
                              value={Boolean(fieldApi.state.value)}
                              onChange={(val: boolean) =>
                                fieldApi.handleChange(val)
                              }
                            />
                          );

                        default:
                          return null;
                      }
                    }}
                  </form.Field>
                </div>
              )
            )}

            {/* Submit button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={createSubmission.isPending}
                className="w-full h-12 rounded-md bg-[#f39b5c] hover:bg-[#e88b48] text-white font-semibold text-sm tracking-wide shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed">
                {createSubmission.isPending ? "Submitting..." : "REGISTER NOW"}
              </button>
            </div>

            {/* API error message */}
            {createSubmission.isError && (
              <div className="mt-3 bg-red-50 border-l-4 border-red-500 p-3 rounded-md">
                <p className="text-red-700 text-sm font-medium">
                  {(
                    createSubmission.error as {
                      response?: { data?: { message?: string } };
                    }
                  )?.response?.data?.message ||
                    "Submission failed. Please try again."}
                </p>
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Small helper CSS just for slide-up animation */}
      <style>{`
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out both;
        }
      `}</style>
    </div>
  );
};

export default DynamicForm;
