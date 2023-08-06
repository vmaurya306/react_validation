import React, { forwardRef } from "react";
import { withStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";

const _TextField = forwardRef<HTMLDivElement, any>((props, ref) => {
  const { inputClass, ...rest } = props;
  return (
    <TextField
      ref={ref}
      {...rest}
      fullWidth
      variant={"standard"}
      inputProps={{ ...rest.inputProps, className: inputClass }}
    />
  );
});

export const StyledTextField = withStyles({
  root: {
    "& .MuiInputBase-root.Mui-disabled": {
      // disabled value text
      color: "black",
    },
    "& .MuiFormLabel-root.Mui-disabled": {
      // disabled label text
      color: "rgba(0,0,0,0.8)",
    },
    "& .MuiFormHelperText-root.Mui-disabled": {
      // remove mm/dd/yyyy below date inputs
      display: "none",
    },
  },
})(_TextField);
