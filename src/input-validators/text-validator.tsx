import React from "react";
import { ValidatorComponent } from "react-material-ui-form-validator";
import { StyledTextField } from "../common/components/styledTextField";

class TextValidator extends ValidatorComponent {
  renderValidatorComponent() {
    const {
      error,
      errorMessages,
      validators,
      requiredError,
      helperText,
      validatorListener,
      withRequiredValidator,
      containerProps,
      InputLabelProps,
      ...rest
    } = this.props;
    const { isValid } = this.state as any;
    return (
      <StyledTextField
        InputLabelProps={{ ...(InputLabelProps ?? {}) }}
        {...rest}
        error={!isValid || error}
        helperText={(!isValid && this.getErrorMessage()) || helperText}
      />
    );
  }
}

export default TextValidator;
