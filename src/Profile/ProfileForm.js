import React from 'react'
import { Label } from 'reactstrap';

class ProfileForm extends React.Component{
    constructor(props){
        super(props);
        this.state= {
            imgURL : "",
            title: "",
            desc: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event){
        const {name, value} = event.target 
        this.setState({ [name] : value});
    }

    handleSubmit(event) {
    
     this.props.addProfile(this.state.imgURL,this.state.title,this.state.desc);

        this.setState({
            imgURL: "",
            title: "",
            desc: "",
        })
        event.preventDefault(); 
        
      }

    render(){
        return(
            <div>
           <h2 className="heading">Form to enter events</h2>
              <form className="form" onSubmit={this.handleSubmit}>
                <Label>Enter Image URL : &nbsp;&nbsp;</Label>
                <input type="text"
                 name="imgURL"
                 value={this.state.imgURL}
                 placeholder="Enter Image URL"
                 onChange={this.handleChange} 
                  ></input>
                <br></br><br></br>

                <Label>Enter Title : &nbsp;&nbsp;&nbsp;&nbsp;</Label>
                <input type="text"
                 name="title"
                 value={this.state.title}
                 placeholder="Enter Title"
                 onChange={this.handleChange} 
                  ></input>
                  <br></br><br></br>

                  <Label>Enter Description : &nbsp;&nbsp;</Label>
                  <textarea 
                  name="desc"
                 value={this.state.desc}
                 onChange={this.handleChange}
                ></textarea>
                <br></br><br></br>

                <button>Submit</button>
            </form>
            </div>
            
        )
    }
}

export default ProfileForm