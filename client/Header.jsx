import React, {render} from 'react';
import AppBar from 'material-ui/AppBar';
import ExitIcon from 'material-ui/svg-icons/action/exit-to-app';
import IconButton from 'material-ui/IconButton';
import Login from './Login.jsx';
import SearchMovie from './Searchmovie.jsx';
import {Redirect} from 'react-router-dom';
import Favorite from 'material-ui/svg-icons/action/favorite';
import Request from 'superagent';
import Drawer from 'material-ui/Drawer';
import {List, ListItem} from 'material-ui/List';
import Paper from 'material-ui/Paper';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import Snackbar from 'material-ui/Snackbar';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      cc: '',
      appbarState: true,
      user: '',
      open: false
    }
    this.handleLogout = this.handleLogout.bind(this);
    this.handleshowFav = this.handleshowFav.bind(this);
    this.verifyUsers = this.verifyUsers.bind(this);
    this.closeDrawer = this.closeDrawer.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.togglecomponent = this.togglecomponent.bind(this);
  }

  componentWillMount() {
    const token = localStorage.getItem('token')
    console.log(token, "token n route")
    console.log(this.props.successLogin,"successLogin")
    if (token !== null || this.props.successLogin) {
      this.verifyUsers();
    } else {
      this.setState({cc: <Login func ={this.togglecomponent}/>});
    }
  }

  verifyUsers() {
    console.log("verify", localStorage.getItem('token'))
    let th = this
    Request.get('/users/verifyusers').set({'Authorization': localStorage.getItem('token')}).end(function(err, res) {
      if (err) {
        console.log(err, "err");
      } else {
        th.setState({appbarState: false, user: res.body.userobj, cc: <SearchMovie user={res.body.userobj.Username}/>});
      }
    });
  }

  togglecomponent() {
    console.log("login called me")
    this.setState({appbarState: false})
  }
  handleLogout() {
    localStorage.removeItem('token');
    this.setState({redirect: true, appbarState: true})
  }

  handleshowFav() {
    this.setState({
      open: !this.state.open
    })
  }

  closeDrawer() {
    this.setState({open: false})
  }

  handleDelete(item) {
    let th = this;
    Request.post('/users/removefavorite').send({title: item, username: th.state.user.Username}).set({'Authorization': localStorage.getItem('token')}).end(function(err, res) {
      if (err)
        console.log(err)
      else {
        console.log(res.body, "res")
      }
    })
  }
  render() {
    let th = this;
    console.log(th.state.appbarState, "app")
    console.log(this.state.cc, "cc")
    const rightButtons = (
      <div>
        <IconButton tooltip="Favourites" iconStyle={{
          color: "white"
        }}><Favorite onClick={this.handleshowFav} style={{
        cursor: 'pointer',
        color: 'red'
      }}/></IconButton>
        <IconButton tooltip="Logout" iconStyle={{
          color: "white"
        }}><ExitIcon onClick={this.handleLogout}/></IconButton>
      </div>
    );
    if (th.state.user != '') {
      console.log(th.state.user, "user")
      var uniqueArray = th.state.user.Favourites.filter(function(value, i) {
        return th.state.user.Favourites.indexOf(value) == i;
      });
    }
    return (
      <div>
        {this.state.appbarState
          ? <AppBar title="Movie Search " showMenuIconButton={false}/>
          : <AppBar title="Movie Search " showMenuIconButton={false} iconElementRight={rightButtons}/>
}
        {this.state.open && uniqueArray.length != 0 && <Drawer style={{
          overflow: 'auto'
        }} docked={false} openSecondary={true} open={this.state.open} onRequestChange={this.closeDrawer}>
          <List>
            {uniqueArray.map((item, i) => {
              return (
                <ListItem key={i}>
                  {item}
                  <DeleteIcon tooltip="DELETE" style={{
                    cursor: 'pointer',
                    color: 'grey'
                  }} onClick={this.handleDelete.bind(this, item)}/>
                </ListItem>
              )
            })
}
          </List>
        </Drawer>
}
        {this.state.open && uniqueArray.length == 0 && <Snackbar open={true} message="Oops!!! No Favourite movies" autoHideDuration={2000}/>}

        {!this.state.redirect
          ? this.state.cc
          : <Login func ={this.togglecomponent}/>}
      </div>
    )
  }

}
