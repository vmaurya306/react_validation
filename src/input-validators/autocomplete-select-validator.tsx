import { ValidatorComponent } from "react-material-ui-form-validator";
import { AutoCompleteSelectVirtualized } from "../common/components/autocomplete-select-virtualized";
class AutoCompleteSelectValidator extends ValidatorComponent {
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
      options,
      renderInputProps,
      ...rest
    } = this.props;
    const { labelProps = {}, ...inputProps } = renderInputProps;
    const { isValid } = this.state as any;
    return (
      <AutoCompleteSelectVirtualized
        containerProps={undefined}
        {...rest}
        options={options}
        renderInputProps={{
          labelProps,
          ...inputProps,
          helperText: (!isValid && this.getErrorMessage()) || helperText,
          error: !isValid || error,
        }}
      />
    );
  }
}

export default AutoCompleteSelectValidator;
