import React, {useState} from "react";
import Card from "../../components/Card/Card";
import Modal from "../../components/Modal/Modal";
import data from "../../assets/components/Grid/data";

const Gallery = props => {

  const [viewImageModalOpen, viewImageModalVisible] = useState(false);
  const [image, setImage] = useState(null);

  const createViewImageModalContent = () => {
    return (
      <React.Fragment>
        {image && <img style={{width: "100%"}} src={image.img} alt={image.title} /> }
      </React.Fragment>
    )
  };

  const createViewImageModalFooter = () => {
    return (
      <React.Fragment />
    )
  };

  const onClickImage = image => {
    setImage(image);
    viewImageModalVisible(true);
  };

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
              content={<div className="container-fluid">
                <center><div className="row">
                  {
                    data.map((image, idx) => <div key={idx} onClick={()=>onClickImage(image)} className="col-md-6"><img style={{height: "50%", width: "80%", marginBottom: "25px"}} src={image.img} alt={image.title} /></div>)
                  }
                </div></center>
              </div>}
            />
          </div>
        </div>
      </div>
    </div>
  )
};

export default Gallery;