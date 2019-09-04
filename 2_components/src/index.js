import React from 'react';
import ReactDOM from 'react-dom';
import faker from 'faker';
import CommentDetail from './CommentDetail';
import ApprovalCard from "./ApprovalCard";

const App = () => {
    return (
        <div className="ui container comments">

            <ApprovalCard>
                <CommentDetail author='Sam'
                               timeAgo="Today at 4:45pm"
                               body='This is comment 1'
                               avatarUrl={faker.image.avatar()}/>
            </ApprovalCard>

            <ApprovalCard>
                <CommentDetail author='Bob'
                               timeAgo="Today at 10:00 am"
                               body='This is comment 2'
                               avatarUrl={faker.image.avatar()}/>
            </ApprovalCard>

            <ApprovalCard>
                <CommentDetail author='Sean'
                               timeAgo="Yesterday at 6:45pm"
                               body='This is comment 3'
                               avatarUrl={faker.image.avatar()}/>
            </ApprovalCard>
        </div>
    );
};

ReactDOM.render(
    <App />,
    document.querySelector('#root')
);