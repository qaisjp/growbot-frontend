import React, {useState} from "react";
import Card from "../../components/Card/Card";
import data from "../../assets/components/Grid/data";

const Gallery = props => {

  const [viewImageModalOpen, viewImageModalVisible] = useState(false);

  return (
    <div className="content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <Card
              title={"Photo gallery"}
              content={<div className="container-fluid">
                <center><div className="row">
                  {
                    data.map((image, idx) => <div key={idx} onClick={()=>console.log("clicked!")}className="col-md-6"><img style={{height: "50%", width: "80%", marginBottom: "25px"}} src={image.img} alt={image.title} /></div>)
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