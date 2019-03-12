import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import SvgIcon from "@material-ui/core/SvgIcon";
import styles from "../../assets/components/Grid/jss/grid-list-style";

function ImageGridList(props) {
  const { classes, tiles, click, author } = props;

  tiles.forEach(tile => console.log(tile.img));

  return (
    <div>
      <GridList cellHeight={160} className={classes.gridList} cols={3}>
        {tiles.map(tile => (
          <GridListTile key={tile.img} cols={tile.cols || 1}>
            <img src={tile.img} alt={tile.id} />
            <GridListTileBar
              title={tile.title}
              subtitle={<span>by: {author}</span>}
              actionIcon={
                <IconButton
                  className={classes.icon}
                  onClick={() => click(tile)}
                >
                  <SvgIcon>
                    <path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
                  </SvgIcon>
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}

ImageGridList.propTypes = {
  classes: PropTypes.object.isRequired,
  tiles: PropTypes.array.isRequired,
  click: PropTypes.func.isRequired,
  author: PropTypes.func.isRequired
};

export default withStyles(styles)(ImageGridList);
