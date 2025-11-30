export const employeeOnboardingFormSchema = {
    title: "Employee Onboarding",
    description: "Form to onboard new employees.",
    fields: [
        {
            name: "fullName",
            label: "Full Name",
            type: "text",
            placeholder: "Enter full name",
            validations: {
                required: true,
                minLength: 3,
                maxLength: 50,
            },
        },
        {
            name: "age",
            label: "Age",
            type: "number",
            placeholder: "Enter age",
            validations: {
                required: true,
                min: 18,
                max: 60,
            },
        },
        {
            name: "department",
            label: "Department",
            type: "select",
            options: [
                { label: "Engineering", value: "engineering" },
                { label: "HR", value: "hr" },
                { label: "Marketing", value: "marketing" },
            ],
            validations: {
                required: true,
            },
        },
        {
            name: "skills",
            label: "Skills",
            type: "multi-select",
            options: [
                { label: "JavaScript", value: "js" },
                { label: "React", value: "react" },
                { label: "Node.js", value: "node" },
            ],
            validations: {
                required: true,
                minSelected: 1,
                maxSelected: 3,
            },
        },
        {
            name: "joiningDate",
            label: "Joining Date",
            type: "date",
            validations: {
                required: true,
                minDate: "2024-01-01",
            },
        },
        {
            name: "about",
            label: "About",
            type: "textarea",
            placeholder: "Tell us about yourself",
            validations: {
                minLength: 10,
                maxLength: 200,
            },
        },
        {
            name: "isRemote",
            label: "Remote Employee?",
            type: "switch",
            validations: {},
        },
        {
            name: "notes",
            label: "Notes",
            type: "text",
            placeholder: "Optional notes",
        },
    ],
};
