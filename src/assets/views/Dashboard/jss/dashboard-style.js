//root

//        flexGrow: 1,
//         width: '100%',
//         maxWidth: 345,

//card 345 maxwidth

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper
  },
  card: {
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2
  },
  media: {
    height: 140
  },
  inline: {
    display: "inline"
  },
  paper: {
    padding: theme.spacing.unit * 2
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  dateTimePicker: {
    marginTop: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 4,
    marginBottom: theme.spacing.unit * 30
  }
});

export default styles;
