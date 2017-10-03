import React, {render} from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Request from 'superagent';
import {Card, CardMedia, CardText} from 'material-ui/Card';
import Dialog from 'material-ui/Dialog';
import {Redirect} from 'react-router-dom';
import Header from './Header.jsx';




export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username : '',
      password : '',
      passwordType: "password",
      open : false,
      usernameErrorText : '',
      passwordErrorText : '',
      Error:'',
      successLogin : false
    }
     this.ChangeName = this.ChangeName.bind(this);
     this.ChangePassword = this.ChangePassword.bind(this);
     this.handleLogin = this.handleLogin.bind(this);
     this.handleOpen = this.handleOpen.bind(this);
     this.handleClose = this.handleClose.bind(this);
     this.handleCloseCancel = this.handleCloseCancel.bind(this);
     this.handleCreateNewUser = this.handleCreateNewUser.bind(this);
      }

   ChangeName(e){
       this.setState({
          username : e.target.value,
          usernameErrorText: '',
          Error : ''
       })
     }

     ChangePassword(e){
       this.setState({
         password : e.target.value,
         passwordErrorText:'',
           Error : ''
       })
     }


       handleOpen(){
         this.setState({
           open : true
         })
       }

       handleCloseCancel(){
         this.setState({
           open : false
         })
       }
      handleClose(){
        this.setState({
           open : false
        })
        this.handleCreateNewUser();
      }
     handleLogin(){
       let th = this;
       if(th.state.username.length == 0){
         th.setState({
            usernameErrorText : 'Username cannot be empty'
         })
       }
       if(th.state.password.length == 0){
         th.setState({
            passwordErrorText : 'password cannot be empty'
         })
       }
       if(th.state.username.length != 0 && th.state.password.length !=0){
       let loginuserobj = {}
           loginuserobj.username = th.state.username;
           loginuserobj.password = th.state.password;
       Request
             .post('/users/login')
             .send({loginuserobj:loginuserobj})
             .end(function(err,res){
               if(err){
                 console.log("err")
                 th.setState({
                   Error : 'User not found..Create user and Try again'
                 })
               }

              else{
                 console.log(res.body,"res")
                 console.log(res.body.Generatedtoken)
                 localStorage.setItem('token',res.body.Generatedtoken)
                 //console.log(token)
                 th.setState({
                   successLogin : true
                 })
                 th.props.func();
               }
             })
     }
}
     handleCreateNewUser(){
       let newuserobj = {}
           newuserobj.username = this.state.username;
           newuserobj.password = this.state.password;
       Request
             .post('/users/newusers')
             .send({newuserobj:newuserobj})
             .end(function(err,res){
               if(err)
                 console.log(err)
               else{
                 console.log(res.body,"res")
               }
             })
     }



     render() {
       let th = this;
             const actions = [
             <RaisedButton
               label="Cancel"
               primary={true}
               onClick={this.handleCloseCancel}
             />,
             <RaisedButton
               label="Create"
               secondary={true}
               onClick={this.handleClose}
             />,
            ];

    return (
        <div >
        <Card style={{
          width: '373px',
          marginBottom: '450px',
          marginTop: '200px',
          marginLeft: '450px'}}>
        <CardText>
        <form className="commentForm" >
        <TextField
            hintText="Username"
            value={this.state.username}
            onChange={this.ChangeName}
            style={{width: '100%'}}
            errorText={this.state.usernameErrorText}
        /> <br />
        <TextField
          hintText="Password"
          type={this.state.passwordType}
          onChange={this.ChangePassword}
          style={{width: '100%'}}
          errorText={this.state.passwordErrorText}
          />
        <br /><br />
       &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
        <RaisedButton  onClick={this.handleLogin} backgroundColor="#a4c639" >
        LOGIN
        </RaisedButton> &nbsp; &nbsp;
        <RaisedButton  secondary={true} onClick={this.handleOpen} >
        NEW USER
        </RaisedButton>
        </form>
        <br />
        <div style={{color: 'red', fontWeight: 'bold', textAlign: 'center'}}>{th.state.Error}</div>
        </CardText>
        </Card>
        <Dialog
         title="WELCOME!!!"
         actions={actions}
         modal={true}
         open={this.state.open}
       >
       <TextField
           hintText="Username"
           value={this.state.username}
           onChange={this.ChangeName}
           style={{width: '100%'}}
       /> <br />
       <TextField
         hintText="Password"
         type={this.state.passwordType}
         onChange={this.ChangePassword}
         style={{width: '100%'}}
         />
       <br /><br />
       </Dialog>
       {this.state.successLogin && <Header successLogin={this.state.successLogin}/>}
        </div>
  );
  }
}
