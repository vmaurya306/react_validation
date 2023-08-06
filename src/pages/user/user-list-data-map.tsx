interface addUserFieldsInterface {
  id: string;
  fields: string[]; // key name(s) in Order model from orderById query
  title: string; // title text displayed on screen
  key: string; // key name for object values (e.g. lookup value)
  type: string; // UI control type
  editField: string; // key name from orderEditFields query
  editable?: boolean; // is field editable
  displayable?: boolean; // is field displayable
  cellScale?: number; // width multiplier
  options?: any; // options list for select drop-down controls
  apiKey?: string; // key name passed to mutation (falls back to field name if not defined)
  defaultValue?: any; // dynamic, default value for the field
}
export const addUserFields = [
  {
    fields: ["firstName"],
    title: "First Name",
    type: "text",
    apiKey: "firstName",
    cellScale: 3,
    createValidators: ["required"],
    createErrorMsgs: ["Required"],
  },
  {
    fields: ["lastName"],
    title: "Last Name",
    type: "text",
    apiKey: "lastName",
    cellScale: 3,
    createValidators: ["required"],
    createErrorMsgs: ["Required"],
  },
  {
    fields: ["email"],
    title: "Email",
    type: "text",
    apiKey: "email",
    cellScale: 3,
    createValidators: [
      "required",
      "matchRegexp:^[a-zA-Z0-9]+@[a-zA-Z0-9]+\\.[A-Za-z]+$",
    ],
    createErrorMsgs: ["Required", "Invalid email"],
  },

  {
    fields: ["phone"],
    title: "Phone",
    type: "number",
    apiKey: "phone",
    cellScale: 3,
    createValidators: [
      "required",
      "matchRegexp:^[0-9]{10}$",
      "minNumber:0",
    ],
    createErrorMsgs: [
      "Required",
      "Please enter 10 digit's number only",
      "Value must be greater than 0",
    ],
  },
  {
    fields: ["role"],
    title: "Role",
    type: "select",
    cellScale: 3,
    apiKey: "role",
    valueKey: "value",
    options: [{ value: "Developer" }, { value: "B.A" }, { value: "Teaster" }],
    createValidators: ["required"],
    createErrorMsgs: ["Required"],
  },
  {
    fields: ["address"],
    title: "Address",
    type: "text",
    apiKey: "address",
    cellScale: 3,
  },

  // {
  //   fields: ["Radio"],
  //   title: "Radio",
  //   type: "radio",
  //   cellScale: 3,
  //   valueKey: "value",
  //   options: [
  //     { value: "Male" },
  //     { value: "Female" },
  //     { value: "Other" },
  //   ]
  // },
] as addUserFieldsInterface[];
