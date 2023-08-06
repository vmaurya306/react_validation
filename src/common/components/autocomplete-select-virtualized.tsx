import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
export function AutoCompleteSelectVirtualized(props: {
  [x: string]: any;
  containerProps: any;
  renderInputProps: any;
}) {
  const { containerProps, renderInputProps, ...rest } = props;
  const { labelProps = {}, ...inputProps } = renderInputProps;
  return (
    <Autocomplete
      options={[]}
      disableListWrap
      autoComplete={true}
      autoHighlight={true}
      autoSelect={true}
      renderInput={(params) => (
        <TextField
          {...params}
          fullWidth
          InputLabelProps={{ ...labelProps }}
          {...inputProps}
        />
      )}
      {...rest}
    />
  );
}
