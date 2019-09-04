import React  from 'react';

const CommentDetail = (props) => {
    return (
        <div className="comment">
            <a className="avatar" href="/">
                <img alt="avatar" src={props.avatarUrl}/>
            </a>
            <div className="content">
                <a href="/" className="author">{props.author}</a>
                <div className="metadata"><span className="date">{props.timeAgo}</span></div>
                <div className="text">{props.body}</div>
            </div>
        </div>
    );
};

export default CommentDetail;