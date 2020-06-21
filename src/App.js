import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import ProfileForm from './Profile/ProfileForm'
import Profile from './Profile/Profile'
import {DB_CONFIG} from './Config/config';
import firebase from 'firebase/app';
import 'firebase/database';

class App extends React.Component {
       constructor(props){
         super(props);
         this.addProfile = this.addProfile.bind(this);
         this.removeProfile=this.removeProfile.bind(this);


         this.app = firebase.initializeApp(DB_CONFIG);
         this.database = this.app.database().ref().child('profiles');

         this.state ={
           profiles: [],
         }
       }

       componentWillMount(){
        const previousProfiles = this.state.profiles;
    
        // DataSnapshot
        this.database.on('child_added', snap => {
          previousProfiles.push({
            id: snap.key,
            imgURL: snap.val().profile.imgURL,
            title: snap.val().profile.title,
            desc: snap.val().profile.desc,
          })
    
          this.setState({
            profiles: previousProfiles
          })
        })

        this.database.on('child_removed', snap => {
          for(var i=0; i < previousProfiles.length; i++){
            if(previousProfiles[i].id === snap.key){
              previousProfiles.splice(i, 1);
            }
          }
    
          this.setState({
            profiles: previousProfiles
          })
        })
    
      }


       addProfile(imgURL,title,desc){
          this.database.push().set({ profile:{ imgURL: imgURL, title:title, desc: desc} });
      }

      removeProfile(profileId){
        // console.log(this.database.child(profileId));
        this.database.child(profileId).remove();
      }

  render(){
    return (
      <div>
        <Container fluid>
        <Row>
          <Col lg="4">
          <ProfileForm addProfile={this.addProfile}/>
          </Col>
          <Col lg="8">
            
           <h2 className="heading">All Events</h2>
           {
           this.state.profiles.map((pro) => {
               return(
                <Profile 
                imgURL={pro.imgURL} 
                title={pro.title} 
                desc={pro.desc} 
                profileId={pro.id} 
                key={pro.id} 
                removeProfile={this.removeProfile}/>
               )
            })
          }
          </Col>
        </Row>
      </Container>
      </div>
    )
  }
}

export default App;
