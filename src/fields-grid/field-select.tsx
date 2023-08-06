import React, { FunctionComponent, useState } from "react";
import Typography from "@material-ui/core/Typography";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import {
  IFieldProps,
  renderPlainTextField,
  selectOption,
  renderProposed,
  listOption,
} from "./field-utils";
import AutoCompleteSelectValidator from "../input-validators/autocomplete-select-validator";
import { DateRange } from "react-date-range";

export const FieldSelect: FunctionComponent<IFieldProps> = (
  props: IFieldProps,
) => {
  const {
    id,
    title,
    options = [],
    inputType,
    value: propsValue,
    valueKey = "value",
    proposedValue,
    onChange: propsOnChange = () => {},
    showChanges,
    disabled: propsDisabled,
    editable,
    validators,
    errorMessages,
    defaultValue,
  } = props;
  const [value, setValue] = useState(propsValue ?? defaultValue ?? null);
  const classes = useStyles();
  const disabled = propsDisabled || !editable;
  const editLabelHighlight =
    editable && !propsDisabled
      ? { classes: { root: classes.editableHighlight }, shrink: true }
      : { classes: { root: classes.inputLabel }, shrink: true };

  const onChange = (
    event: any,
    val:
      | string
      | boolean
      | any[]
      | Date
      | DateRange
      | selectOption
      | listOption
      | ((
          prevState:
            | string
            | boolean
            | any[]
            | Date
            | DateRange
            | selectOption
            | listOption
            | undefined,
        ) =>
          | string
          | boolean
          | any[]
          | Date
          | DateRange
          | selectOption
          | listOption
          | undefined)
      | undefined,
  ) => {
    setValue(val);
    if (val) {
      const normalizedValue =
        typeof val === "object" && "id" in val ? val : { id: val, value: val };
      propsOnChange({ id, value: normalizedValue });
    }
  };

  function onInputChange(e: any, _value: any, reason: string) {
    if (reason === "clear") {
      setValue(null);
      propsOnChange({ id, value: defaultValue || null });
    }
  }

  const renderInput = (_inputType: string) => {
    switch (_inputType) {
      case "select": {
        // Render a text field in read-only mode. Change to Select in edit mode.
        let _component;
        if (disabled) {
          _component = renderPlainTextField({
            title,
            props: { inputProps: { "data-testid": id } },
            value: (value as selectOption)?.[valueKey],
            defaultValue: (defaultValue as selectOption)?.[valueKey],
            disabled: true,
            onChange,
            validators,
            errorMessages,
            editLabelHighlight,
            classes,
          });
        } else {
          const _value = value ?? defaultValue ?? null;
          _component = (
            <AutoCompleteSelectValidator
              className={classes.autocompleteContainer}
              name={title}
              defaultValue={_value}
              value={_value}
              options={options}
              getOptionLabel={(option: { [x: string]: any }) =>
                option?.[valueKey] || ""
              }
              getOptionSelected={(option: { id: any }, __value: { id: any }) =>
                option?.id === __value?.id
              }
              validators={validators}
              errorMessages={errorMessages}
              renderInputProps={{
                "data-testid": id,
                label: title,
                className: classes.select,
                labelProps: editLabelHighlight,
              }}
              containerProps={{ className: classes.validatorContainer }}
              onChange={onChange}
              onInputChange={onInputChange}
              groupBy={
                options.length > 30
                  ? (opt: { [x: string]: string[] }) =>
                      opt?.[valueKey][0].toUpperCase()
                  : undefined
              }
              renderOption={(option: {
                [x: string]:
                  | string
                  | number
                  | boolean
                  | React.ReactElement<
                      any,
                      string | React.JSXElementConstructor<any>
                    >
                  | Iterable<React.ReactNode>
                  | React.ReactPortal
                  | null
                  | undefined;
              }) => <Typography noWrap>{option?.[valueKey]}</Typography>}
            />
          );
        }
        return _component;
      }
      default:
        return null;
    }
  };

  return (
    <div className={classes.container}>
      {renderInput(inputType)}
      {renderProposed({ inputType, showChanges, proposedValue, classes })}
    </div>
  );
};

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      flex: 1,
    },
    autocompleteContainer: {
      flex: 1,
    },
    inputLabel: {
      fontSize: "1.3rem",
      fontWeight: 500,
    },
    inputValue: {
      fontWeight: 300,
    },
    editableHighlight: {
      fontSize: "1.5rem",
      fontWeight: 500,
      color: "#3f51b5",
    },
    validatorContainer: {
      width: "100%",
    },
    select: {
      fontWeight: 300,
      fontSize: "1.3rem",
    },
    proposed: {
      margin: "0.1rem",
      padding: "0.2rem",
      height: "auto",
      // backgroundColor: MercadoColors.orange,
    },
    proposedText: {
      color: "white",
    },
  }),
);
