const styles = theme => ({
  root: {
    margin: "0 auto",
    marginTop: theme.spacing.unit * 2,
    width: "70%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  },
  typography: {
    marginTop: theme.spacing.unit * 2
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  select: {
    display: "flex",
    flexDirection: "column-reverse"
  },
  selectFormControl: {
    marginLeft: theme.spacing.unit
  }
});

export default styles;
