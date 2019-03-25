import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Card from "../../components/Card/Card";
import Modal from "../../components/Modal/Modal";
import endpoints from "../../endpoints";
import httpFetchPhotos from "../../http/fetch_photos";

const Gallery = props => {
  const [photos, setPhotos] = useState([]);
  const [viewImageModalOpen, viewImageModalVisible] = useState(false);
  const [image, setImage] = useState(null);

  const createViewImageModalContent = () => {
    return (
      <React.Fragment>
        {image && (
          <img style={{ width: "100%" }} src={image.img} alt={image.title} />
        )}
      </React.Fragment>
    );
  };

  const createViewImageModalFooter = () => {
    return <React.Fragment />;
  };

  const onClickImage = image => {
    setImage(image);
    viewImageModalVisible(true);
  };

  const fetchPhotos = async () => {
    const { loginToken } = props;
    const fetchPhotosResult = await httpFetchPhotos(loginToken);

    if (!(fetchPhotosResult instanceof Error)) {
      const { photos } = fetchPhotosResult;

      setPhotos(photos.map(photo => {
        const photoUrl =
          endpoints.photos + "/" + photo.id + "?token=" + loginToken;

        return {
          title: photo.id,
          img: photoUrl
        };
      }));
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  return (
    <div className="content">
      <Modal
        open={viewImageModalOpen}
        close={() => viewImageModalVisible(false)}
        title={"View Image"}
        content={createViewImageModalContent()}
        footer={createViewImageModalFooter()}
      />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <Card
              title={"Photo gallery"}
              content={
                <div className="container-fluid">
                  <center>
                    <div className="row">
                      {photos.map((image, idx) => (
                        <div
                          key={idx}
                          onClick={() => onClickImage(image)}
                          className="col-md-6"
                        >
                          <img
                            style={{
                              height: "50%",
                              width: "80%",
                              marginBottom: "25px"
                            }}
                            src={image.img}
                            alt={image.title}
                          />
                        </div>
                      ))}
                    </div>
                  </center>
                </div>
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = props => {
  const { auth } = props;
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
