import { LoginFields } from "./login-list-data";
import { useState, forwardRef, useRef } from "react";
import { FieldsGrid } from "../../fields-grid/fields-grid";
import { Button, DialogActions, DialogContent } from "@material-ui/core";
import { ValidatorForm } from "react-material-ui-form-validator";

export const LoginDialog = forwardRef(() => {
  const [fieldsMap] = useState(LoginFields);
  const loginRef = useRef({} as any);
  function renderActions() {
    return (
      <>
        <DialogActions>
          {/* <Button color="primary" type="reset" > Cancel </Button> */}
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
      console.log("fieldMap", fieldMap);
      const apiKey = fieldMap.apiKey || id;
      if (value?.id !== undefined) {
        loginRef.current[apiKey] = value.id;
      } else {
        loginRef.current[apiKey] = value;
      }
    } else {
      loginRef.current[id] = value;
    }
  }
  
  const loginUser = async () => {};
  function renderForm() {
    return (
      <DialogContent>
        <ValidatorForm onSubmit={loginUser}>
          {fieldsMap && fieldsMap.length > 0 ? (
            <FieldsGrid
              title=""
              mode="create"
              fieldsMap={fieldsMap}
              disabled={false}
              onChange={onFieldChange}
            />
          ) : (
            <p>Loading fields...</p>
          )}
          {renderActions()}
        </ValidatorForm>
      </DialogContent>
    );
  }
  return (
    <>
      <div className="container">
        <h1 className="title">Login</h1>
        {renderForm()}
      </div>
    </>
  );
});
