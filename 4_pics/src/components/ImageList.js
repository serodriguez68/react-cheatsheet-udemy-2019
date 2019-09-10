import React from 'react';
import './ImageList.css'
import ImageCard from './ImageCard';


const ImageList = (props) => {
    // In this example props.images = [
    //                                   {id: ..., url: ..., description: ...},
    //                                   {id: ..., url: ..., description: ...}
    const images = props.images.map((image) => {
        return <ImageCard key={image.id} image={image} />;
    });
    return <div className="image-list">{images}</div>;
};

export default ImageList;