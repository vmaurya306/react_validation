import { FunctionComponent, useMemo } from "react";
import Grid from "@material-ui/core/Grid";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { mapFieldsData } from "./fields-data-map";
export interface IFieldsGridProps {
  title?: string;
  data?: object;
  mode?: "create" | "edit";
  fieldsMap: any[];
  disabled?: boolean;
  onChange?: Function;
  showChanges?: boolean;
  companyPrefs?: any;
}
export const FieldsGrid: FunctionComponent<IFieldsGridProps> = (
  props: IFieldsGridProps
) => {
  const {
    data,
    mode = "create",
    disabled,
    fieldsMap = [],
    onChange = () => { },
    showChanges,
    companyPrefs,
  } = props;
  const classes = useStyles();
  const isDestinationAddressEnabled = useMemo(() => companyPrefs?.displayDestinationAddress || false, [companyPrefs]);
  const fields = useMemo(() =>
    mapFieldsData({
      data,
      mode,
      fieldsMap,
      disabled,
      classes,
      onChange,
      useDateRange: false,
      showChanges,
      isDestinationAddressEnabled,
    }),
    [
      data,
      mode,
      fieldsMap,
      disabled,
      classes,
      onChange,
      showChanges,
      isDestinationAddressEnabled,
    ]
  );
  return (
    <div className={classes.container}>
      <Grid container spacing={2}>
        {fields.length > 0 ? (
          fields
        ) : (
          <h1>No fields to display</h1>
        )}
      </Grid>
    </div>
  );
};

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      width: "100%",
    },
  })
);

export default FieldsGrid;
