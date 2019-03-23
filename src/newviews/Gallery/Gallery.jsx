import React from "react";
import Card from "../../components/Card/Card";
import data from "../../assets/components/Grid/data";

const Gallery = props => {
  return (
    <div className="content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <Card
              title={"Photo gallery"}
              content={<div className="container-fluid">
                <div className="row">
                  {
                    data.map(image => <div className="gallery_product col-lg-4 col-md-4 col-sm-4 col-xs-6 filter spray"><img src={image.img} alt={image.title} /></div>)
                  }
                </div>
              </div>}
            />
          </div>
        </div>
      </div>
    </div>
  )
};

export default Gallery;