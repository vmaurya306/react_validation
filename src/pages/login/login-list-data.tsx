interface LoginFieldsInterface {
  id: string;
  fields: string[];
  title: string;
  key: string;
  type: string;
  editField: string;
  editable?: boolean;
  displayable?: boolean;
  cellScale?: number;
  options?: any;
  apiKey?: string;
  defaultValue?: any;
}

export const LoginFields = [
  {
    fields: ["email"],
    placeholder: "Enter your email",
    type: "text",
    apiKey:"email",
    cellScale: 6,
    createValidators: [
      "required",
      "matchRegexp:^[a-zA-Z0-9]+@[a-zA-Z0-9]+\\.[A-Za-z]+$",
    ],
    createErrorMsgs: ["Required", "Invalid email"],
  },
  {
    fields: ["password"],
    placeholder: "Enter your password",
    type: "text",
    cellScale: 6,
    apiKey:"password",
    createValidators: ["required"],
    createErrorMsgs: ["Required"],
  },
  {
    fields: ["Accept"],
    title: "Keep me Logged In",
    type: "checkbox",
    cellScale: 6,
  },
] as LoginFieldsInterface[];
