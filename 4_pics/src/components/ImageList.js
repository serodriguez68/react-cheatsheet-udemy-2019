import React from 'react';

const ImageList = (props) => {
    // In this example props.images = [
    //                                   {id: ..., url: ..., description: ...},
    //                                   {id: ..., url: ..., description: ...}
    //                                ]

    // The arrow function inside the map is making use of destructuring assignment of each image object.
    // That is equivalent to (image) => {... image.id   .... image.urls.regular ...}
    const images = props.images.map(({id, urls, description}) => {
        return <img key={id} src={urls.regular} alt={description} />;
    });
    return <div>{images}</div>;
};

export default ImageList;