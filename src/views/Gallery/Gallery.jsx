import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Card from "../../components/Card/Card";
import Modal from "../../components/Modal/Modal";
import endpoints from "../../endpoints";
import httpDeletePhoto from "../../http/remove_photo";
import httpFetchPhotos from "../../http/fetch_photos";

const Gallery = props => {
  const [photos, setPhotos] = useState([]);
  const [viewPhotoModalOpen, viewPhotoModalVisible] = useState(false);
  const [photo, setPhoto] = useState(null);

  const createViewPhotoModalContent = () => {
    return (
      <React.Fragment>
        {photo && (
          <img style={{ width: "100%" }} src={photo.img} alt={photo.id} />
        )}
      </React.Fragment>
    );
  };

  const createViewPhotoModalFooter = () => {
    return (
      <React.Fragment>
        <button onClick={onDeletePhoto} className="btn btn-danger">
          Delete Photo
        </button>
        <button
          onClick={() => viewPhotoModalVisible(false)}
          className="btn btn-danger"
        >
          Close
        </button>
      </React.Fragment>
    );
  };

  const onDeletePhoto = async () => {
    const { loginToken } = props;
    const response = await httpDeletePhoto(loginToken, photo.id);

    if (response.status === 200) {
      setPhotos(photos.filter(item => item.id !== photo.id));
      setPhoto(null);
      viewPhotoModalVisible(false);
    }
  };

  const onClickPhoto = photo => {
    setPhoto(photo);
    viewPhotoModalVisible(true);
  };

  const fetchPhotos = async () => {
    const { loginToken } = props;
    const fetchPhotosResult = await httpFetchPhotos(loginToken);

    if (!(fetchPhotosResult instanceof Error)) {
      const { photos } = fetchPhotosResult;

      setPhotos(
        photos.map(photo => {
          const photoUrl =
            endpoints.photos + "/" + photo.id + "?token=" + loginToken;

          return {
            id: photo.id,
            img: photoUrl
          };
        })
      );
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  return (
    <div className="content">
      <Modal
        open={viewPhotoModalOpen}
        close={() => viewPhotoModalVisible(false)}
        title={"View Image"}
        content={createViewPhotoModalContent()}
        footer={createViewPhotoModalFooter()}
      />
      <Card
        title={"Photo gallery"}
        content={
          <div className="container-fluid">
            <center>
              <div className="row">
                {photos.map((photo, idx) => (
                  <div
                    key={idx}
                    onClick={() => onClickPhoto(photo)}
                    className="col-md-6"
                  >
                    <img
                      style={{
                        height: "50%",
                        width: "80%",
                        marginBottom: "25px"
                      }}
                      src={photo.img}
                      alt={photo.id}
                    />
                  </div>
                ))}
              </div>
            </center>
          </div>
        }
      />
    </div>
  );
};

const mapStateToProps = state => {
  const { auth } = state;
  return {
    loginToken: auth.loginToken
  };
};

const mapDispatchToProps = () => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Gallery);
