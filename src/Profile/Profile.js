import React from 'react';
import PropTypes from 'prop-types';

class Profile extends React.Component{
    constructor(props){
        super(props);
        this.imgURL = props.imgURL;
        this.title = props.title;
        this.desc = props.desc;
        this.profileId = props.profileId;
        this.handleRemoveProfile = this.handleRemoveProfile.bind(this);
    }

    handleRemoveProfile(id){
        this.props.removeProfile(id);
    }

    render(){
        return(
          <div className="profile">
              <img src={this.imgURL} alt=""></img>
               <h3>{this.title}</h3>
                <p>{this.desc}</p>
                <button onClick={() => this.handleRemoveProfile(this.profileId)}>Delete</button>
          </div>
        )
    }
}

Profile.propTypes = {
    imgURL: PropTypes.string,
    title: PropTypes.string,
    desc: PropTypes.string
}


export default Profile