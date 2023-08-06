import  { FunctionComponent, useState, useEffect } from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { IFieldProps, renderPlainTextField, listOption } from "./field-utils";
import { Radio } from "@material-ui/core";
export const Field: FunctionComponent<IFieldProps> = (props: IFieldProps) => {
  const {
    id,
    title,
    inputType,
    value: propsValue,
    onChange: propsOnChange = () => {},
    disabled: propsDisabled,
    editable,
    validators,
    errorMessages,
    defaultValue,
    placeholder,
    extraDataId,
    isExtraData,
    options = [],
  } = props;
  const [value, setValue] = useState(propsValue);
  const classes = useStyles();
  const disabled = propsDisabled || !editable;
  const editLabelHighlight =
    editable && !propsDisabled
      ? { classes: { root: classes.editableHighlight }, shrink: true }
      : { classes: { root: classes.inputLabel }, shrink: true };
  const checkboxLabel = `${classes.checkboxLabel} ${
    editable && !propsDisabled ? classes.editableCheckboxHighlight : ""
  }`;
  useEffect(() => {
    setValue(propsValue);
  }, [propsValue, disabled]);

  const onChange = (event: { target: any }) => {
    let _value;
    let onChangeValue;
    switch (inputType) {
      case "checkbox":
        _value = event.target.checked;
        onChangeValue = _value;
        break;
      case "currency":
      case "number":
        _value = event.target.value;
        onChangeValue = parseFloat(_value);
        break;
      case "image":
        _value = event.target.files[0];
        onChangeValue = _value;
        break;
      case "text":
      default:
        _value = event.target.value;
        onChangeValue = _value;
    }
    if (isExtraData) {
      // Callback for extraData expects an object value.
      onChangeValue = {
        id: extraDataId,
        key: title,
        value: _value,
        dataType: inputType,
        isExtraData: true,
      };
    }
    setValue(_value);
    propsOnChange({ id, value: onChangeValue });
  };

  const renderInput = (_inputType: string) => {
    let _value = value;
    switch (_inputType) {
      case "image":
        return (
          <label className="btn btn-outline btn-success">
            <input type="file" onChange={onChange} />
          </label>
        );
      case "currency":
        return renderPlainTextField({
          title,
          value: _value,
          defaultValue,
          placeholder,
          disabled,
          onChange,
          validators,
          errorMessages,
          editLabelHighlight,
          classes,
          inputType: "number",
        });
      case "number":
        return renderPlainTextField({
          title,
          value: _value,
          props: { inputProps: { "data-testid": id } },
          defaultValue,
          placeholder,
          disabled,
          onChange,
          validators,
          errorMessages,
          editLabelHighlight,
          classes,
          inputType: _inputType,
        });
      case "text":
        if (id === "extraData") {
          _value = (value as listOption)?.value || value;
        }
        return renderPlainTextField({
          title,
          value: _value,
          props: { inputProps: { "data-testid": id } },
          defaultValue,
          placeholder,
          disabled,
          onChange,
          validators,
          errorMessages,
          editLabelHighlight,
          classes,
        });
      case "checkbox":
        if (value == null) {
          // coercion
          _value = defaultValue;
        }
        return (
          <FormControlLabel
            label={title}
            labelPlacement="end"
            checked={!!_value}
            onChange={onChange}
            classes={{ root: classes.checkboxRoot, label: checkboxLabel }}
            disabled={disabled}
            control={<Checkbox data-testid={id} color="primary" />}
          />
        );
      case "radio":
        if (value == null) {
          _value = defaultValue;
        }
        return (
          <>
            {options.map((option) => (
              <FormControlLabel
                key={option.value}
                label={option.value}
                control={
                  <Radio
                    checked={value === option.value}
                    onChange={onChange}
                    value={option.value}
                    className={classes.radio}
                    disabled={disabled}
                  />
                }
              />
            ))}
          </>
        );

      case "TBD":
        return <span>TBD</span>;
      case "NA":
        return <span>N/A</span>;
      default:
        return null;
    }
  };

  return <div className={classes.container}>{renderInput(inputType)}</div>;
};

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      flex: 1,
    },
    autocompleteContainer: {
      flex: 1,
    },
    checkboxRoot: {
      display: "flex",
    },
    checkboxLabel: {
      color: "black !important",
      fontWeight: 400,
      fontSize: "1.2rem",
    },
    inputLabel: {
      fontSize: "1.3rem",
      fontWeight: 300,
    },
    inputValue: {
      fontWeight: 300,
    },
    editableHighlight: {
      fontSize: "1.5rem",
      fontWeight: 300,
      color: "#3f51b5",
    },
    editableCheckboxHighlight: {
      fontSize: "1.2rem",
      fontWeight: 500,
      color: "#1dc6c9",
    },
    validatorContainer: {
      width: "100%",
    },
    select: {
      fontWeight: 200,
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
    radio: {
      fontSize: "1.2rem",
      fontWeight: 500,
      color: "#1dc6c9",
    },
  }),
);
