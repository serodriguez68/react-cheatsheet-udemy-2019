import React from 'react';

class ImageCard extends React.Component {

    // Refs need to be created in the constructor
    constructor(props) {
        super(props);
        this.state = { spans: 0 };
        // Create a ref and store it in the `imageRef` prop
        this.imageRef = React.createRef();
    }

    componentDidMount() {
        // Use ref to access the DOM element
        this.imageRef.current.addEventListener('load', this.setSpans)
    }

    setSpans = () => {
        const height = this.imageRef.current.clientHeight;
        const spans = Math.ceil(height / 10);
        // This is equivalent to {spans: spans}
        this.setState({spans});
        console.log(this.imageRef.current.clientHeight);
    };

    render () {
        // Destructure the image object to extract the properties we care about
        const { description, urls } = this.props.image;
        return (
            <div style={{gridRowEnd: `span ${this.state.spans}`}}>
                {/* Assign  ref to jsx element */}
                <img ref={this.imageRef}
                     src={urls.regular}
                     alt={description} />
            </div>
        )
    }
}

export default ImageCard;