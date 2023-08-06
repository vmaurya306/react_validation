import Grid, { GridSize } from "@material-ui/core/Grid";
import { Field } from "./field";
import { processOptions } from "../common/field-utils";
import { FieldSelect } from "./field-select";
export function mapFieldsData({
  data = {} as any,
  mode,
  fieldsMap,
  disabled,
  classes,
  onChange,
  showChanges,
  isDestinationAddressEnabled,
}: {
  data?: any;
  mode: string;
  fieldsMap: any[];
  disabled?: boolean;
  classes: any;
  onChange: any;
  useDateRange: any;
  showChanges: any;
  isDestinationAddressEnabled: any;
}) {
  const gridFields: any[] = [];
  fieldsMap.forEach((f, i) => {
    const key = `${i}.${f.readKey}`;
    const fieldKey = f?.field ?? f?.fields?.[0] ?? f.readKey;
    if (fieldKey === "approvedToShipDate" && !data[fieldKey]) return null;
    if (fieldKey === null) {
      // To support "line breaks" in the grid, return a blank full row.
      gridFields.push(
        <Grid container item key={i} xs={12} className={classes.lineBreak} />,
      );
      return;
    }

    const fieldProps = {
      id: fieldKey,
      title: f.title,
      editable: f.editable,
      defaultValue: f.defaultValue,
      placeholder: f.placeholder,
      proposedValue: f.proposedValue,
      inputType: f.type,
      validators: mode === "create" ? f.createValidators : f.editValidators,
      errorMessages: mode === "create" ? f.createErrorMsgs : f.editErrorMsgs,
      valueKey: f.valueKey,
      disabled,
      onChange,
      value: data && data[fieldKey] ? data[fieldKey] : null,
      showChanges,
      isExtraData: f.isExtraData,
    } as any;
    let cellScale = f.cellScale || 1;
    let gridSizes: { xs: GridSize; sm: GridSize; md: GridSize; lg: GridSize };
    switch (f.type) {
      case "date":
        fieldProps.value = fieldProps.value || null;
        break;
      case "text":
        break;
      case "select":
        fieldProps.options = processOptions(
          f.options || [fieldProps.value],
          f.readKey,
          isDestinationAddressEnabled,
        );
        break;
      case "radio":
        fieldProps.options = processOptions(
          f.options || [fieldProps.value],
          f.readKey,
          isDestinationAddressEnabled,
        );
        break;
      case "checkbox":
        break;
      case "currency":
        break;
      case "number":
        break;
      case "image":
        break;
      case "hidden":
      default:
        // Ignore field
        return;
    }

    gridSizes = generateGridSizes(cellScale);
    gridFields.push(
      renderField({
        ...fieldProps,
        key,
        gridSizes,
      }),
    );
  });
  return gridFields;
}

function renderField({
  key = "",
  id = "",
  title = "",
  value = "",
  valueKey = "",
  disabled = true,
  editable = true,
  gridSizes = {},
  inputType = "text",
  proposedValue = undefined,
  defaultValue = undefined,
  placeholder = undefined,
  options = [],
  onChange = undefined,
  showChanges = undefined,
  validators = undefined,
  errorMessages = undefined,
}) {
  let FieldComponent;
  switch (inputType) {
    case "date":
    case "select":
      FieldComponent = FieldSelect;
      break;
    default:
      FieldComponent = Field;
  }
  return (
    <Grid container item key={key} {...gridSizes}>
      <FieldComponent
        id={id}
        inputType={inputType}
        title={title}
        value={value}
        valueKey={valueKey}
        defaultValue={defaultValue}
        placeholder={placeholder}
        proposedValue={proposedValue}
        options={options}
        disabled={disabled}
        editable={editable}
        onChange={onChange}
        data-testid={id}
        showChanges={showChanges}
        validators={validators}
        errorMessages={errorMessages}
      />
    </Grid>
  );
}

function generateGridSizes(cellScale: number) {
  return {
    xs: Math.min(6 * cellScale, 12) as GridSize,
    sm: Math.min(4 * cellScale, 12) as GridSize,
    md: Math.min(3 * cellScale, 12) as GridSize,
    lg: Math.min(2 * cellScale, 12) as GridSize,
  };
}
