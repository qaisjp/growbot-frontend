const drawerWidth = 240;

const styles = theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  image: {
    maxWidth: "200px",
    maxheight: "200px",
    margin: "20px 15px",
    padding: "5px"
  },
  drawerPaper: {
    width: drawerWidth,
    background: theme.palette.primary.main
  },
  listItemText: {
    color: "white"
  }
});

export default styles;
