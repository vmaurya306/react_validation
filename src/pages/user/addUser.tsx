import { useState, forwardRef, useRef } from "react";
import { FieldsGrid } from "../../fields-grid/fields-grid";
import { addUserFields } from "./user-list-data-map";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import { ValidatorForm } from "react-material-ui-form-validator";
export const UsertAddDialog = forwardRef(() => {
  const [fieldsMap] = useState(addUserFields);
  const newUserRef = useRef({} as any);
  function renderActions() {
    return (
      <>
        <DialogActions>
          <Button type="submit" color="primary">
            Save
          </Button>
        </DialogActions>
      </>
    );
  }

  function onFieldChange({ id, value }) {
    const fieldMap = fieldsMap.find((f) => f.fields.includes(id));
    if (fieldMap) {
      console.log("value", value);
      const apiKey = fieldMap.apiKey || id;
      if (value?.id !== undefined) {
        newUserRef.current[apiKey] = value.id;
      } else {
        newUserRef.current[apiKey] = value;
      }
    } else {
      newUserRef.current[id] = value;
    }
  }

  const saveUser = async () => {};
  function renderForm() {
    return (
      <DialogContent>
        <ValidatorForm onSubmit={saveUser}>
          <FieldsGrid
            title=""
            mode="create"
            fieldsMap={fieldsMap}
            disabled={false}
            onChange={onFieldChange}
          />
          {renderActions()}
        </ValidatorForm>
      </DialogContent>
    );
  }
  return (
    <>
      <DialogContent className="user-register">
        <DialogTitle id="form-dialog-title">Registration</DialogTitle>
        {renderForm()}
      </DialogContent>
    </>
  );
});
