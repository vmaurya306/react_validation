import { cloneDeep } from "lodash";
import { FunctionComponent } from "react";
export type FieldType =
  | "boolean"
  | "checkbox"
  | "containers"
  | "currency"
  | "date"
  | "daterange"
  | "link"
  | "notes"
  | "numeric"
  | "packageGroup"
  | "select"
  | "string"
  | "tags"
  | "text"
  | "voyages";

export interface APIFieldConfig {
  calcSum?: boolean;
  cellScale?: number;
  chainPath?: string;
  containerMode?: string;
  defaultSort?: string;
  defaultValue?: any;
  displayable: boolean;
  editable: boolean;
  export?: boolean;
  fields?: [string];
  isExtraData?: boolean;
  lookupName?: string;
  mode?: string;
  msDetailKey?: string;
  options?: [any];
  readKey: string;
  renderTarget?: string;
  renderValue?: string;
  createErrorMsgs?: [string];
  required?: boolean;
  title?: string;
  type?: FieldType;
  valueKey?: string;
  float: boolean;
}
export interface FieldConfigRenderer {
  render: (rowData: any) => JSX.Element;
  editComponent?: FunctionComponent;
}
export interface FieldMap extends APIFieldConfig {
  createValidators?: [string];
  createErrorMsgs?: [string];
  formatter: (value: any) => string | number;
  renderer?: FieldConfigRenderer;
  currencyType?: string;
}
export interface IPreferenceGroup {
  enabled: boolean;
  disabledOrgTypes?: Array<string>;
}

export const processOptions = (
  options: any[],
  key: string,
  isDestinationAddressEnabled: any,
) => {
  return options.map((op) => {
    const _option = cloneDeep(op);
    if (key === "destination" && isDestinationAddressEnabled) {
      return {
        ..._option,
        name: `${_option.name} - ${getLocationAddress(_option)}`,
      };
    }
    return _option;
  });
};

export const getRenderValue = (value: any, options: any[], key: string) => {
  let formattedValue = value;
  if (key === "destination") {
    const location = options.find((op) => op.name.includes(value));
    if (location) {
      formattedValue = `${value} - ${getLocationAddress(location)}`;
    }
  }
  return formattedValue;
};

export const getLocationAddress = (location: any) => {
  const { address1, address2, city, state } = location;
  return [address1, address2, city, state].filter(Boolean).join(" ");
};
