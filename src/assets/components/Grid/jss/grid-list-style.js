const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 225,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  }
});

export default styles;