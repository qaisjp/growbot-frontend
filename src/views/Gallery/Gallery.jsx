import React, { Component } from "react";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core";

import { connect } from "react-redux";

import FullScreenDialogue from "../../components/Dialogue/FullScreenDialogue";
import ImageGridList from "../../components/Grid/ImageGridList";

import vegetables from "../../assets/components/Grid/img/vegetables.jpg";
import styles from "../../assets/views/Controller/jss/controller-styles";

import fetchPhotos from "../../http/fetch_photos";
import endpoints from "../../endpoints";

class Gallery extends Component {
  state = {
    photoDialogue: false,
    photos: [],
    tile: {
      img: vegetables,
      title: "Vegetables",
      author: "Raees"
    }
  };
  fetchPhotos = async () => {
    const { loginToken } = this.props;
    const fetchPhotosResult = await fetchPhotos(loginToken);
    
    if (fetchPhotosResult instanceof Error) {
      this.setState({ photos: [] });
    } else {
      const { photos } = fetchPhotosResult;

      const photosMapped = [];

      photos.forEach(photo => {
        const photoUrl =
          endpoints.photos + "/" + photo.id + "?token=" + loginToken;

        const photosObj = {
          title: photo.id,
          img: photoUrl
        };

        photosMapped.push(photosObj);
      });

      this.setState({ photos: photosMapped });
    }
  };
  createPhotoDialogueContent = () => {
    const { tile } = this.state;
    return <img src={tile.img} alt={tile.title} />;
  };
  handleCloseDialogue = dialogue => {
    this.setState({ [dialogue]: false });
  };
  componentDidMount = async () => {
    this.fetchPhotos();
  };
  render() {
    const { photos, photoDialogue, tile } = this.state;
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <br />
        <FullScreenDialogue
          open={photoDialogue}
          close={() => this.handleCloseDialogue("photoDialogue")}
          title={tile.title}
          content={this.createPhotoDialogueContent()}
        />
        <Grid container spacing={24}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Card className={classes.card}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Pictures
                </Typography>
                <ImageGridList
                  tiles={photos}
                  click={tile => this.setState({ tile, photoDialogue: true })}
                  author="Raees"
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = props => {
  const { auth } = props;
  return {
    loginToken: auth.loginToken
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Gallery));
