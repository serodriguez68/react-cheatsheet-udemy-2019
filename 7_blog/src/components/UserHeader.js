import React from 'react';
import {connect} from 'react-redux';

class UserHeader extends React.Component {

    render(){
        const {user} = this.props;
        if(!user) {
            return null;
        }
        return(
            <div>{user.name}</div>
        );
    }
}
// mapStateToProps gets called with 2 args:
// 1) The complete redux store,
// 2) The props that have been injected to the particular instance of the component (e.g. <UserHeader userId=2/> )
// With those 2 pieces of information, we can do any pre-calculation needed to give the component just the right
// data from the redux store.
const mapStateToProps = (state, ownProps) => {
    const user = state.users.find( user => user.id === ownProps.userId);
    return { user: user };
};
export default connect(mapStateToProps)(UserHeader);