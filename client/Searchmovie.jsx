import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Request from 'superagent';
import {Grid, Row, Col} from 'react-flexbox-grid';
import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText
} from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import {Redirect} from 'react-router-dom';
import Favorite from 'material-ui/svg-icons/action/favorite';
import FavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import Header from './Header.jsx';

const styles = {
  col: {
    marginBottom: 20,
    marginRight: -20,
    width: 150
  },
  grid: {
    width: '100%'
  },
  header: {
    textTransform: 'uppercase',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  cardtext: {
    textAlign: 'center',
    fontWeight: 'bold'
  }
}
export default class SearchMovie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      moviename: '',
      result: [],
      addFav: '',
      myFav: [],
      displayMsg: false,
      username: ''
    }
    this.NameChange = this.NameChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleClickFavorite = this.handleClickFavorite.bind(this);
    this.handleClickRemoveFavorite = this.handleClickRemoveFavorite.bind(this);
    this.handleClear = this.handleClear.bind(this);

  }
  componentWillMount() {

    this.setState({
      username: this.props.user
    })
}
    NameChange(event) {
      this.setState({moviename: event.target.value})
    }

    /*handleSearch(){
   let th = this;
   Request
      .get('/search/'+th.state.moviename)
      .end(function(err,res){
        if(err)
           console.log(err)
         else
            console.log(res.body);

      })
}

.get('/search?name='+th.state.moviename)--->passing via query strings*/
    handleSearch() {
      let th = this;
      Request.get('users/search').query({name: th.state.moviename}).end(function(err, res) {
        if (err)
          console.log(err)
        else
          console.log(res.body);
        th.setState({result: res.body.results, displayMsg: true})

      })
    }

    handleClear() {
      let th = this;
      th.setState({moviename: '', result: []})

    }

    handleClickFavorite(value, title) {
      console.log(title, "title")
      console.log(value, "val")
      let th = this;
      Request.post('/users/addfavorite').send({title: title, username: th.state.username}).set({'Authorization': localStorage.getItem('token')}).end(function(err, res) {
        if (err)
          console.log(err)
        else {
          console.log(res.body, "res")
        }
      })
      console.log(this.state.myFav, "handleClickFavorite")
      let favMovies = this.state.myFav;
      favMovies.push(value)
      this.setState({myFav: favMovies})
    }

    handleClickRemoveFavorite(value, title) {
      console.log(title)
      console.log(this.props.username)
      let th = this;
      Request.post('/users/removefavorite').send({title: title, username: th.state.username}).set({'Authorization': localStorage.getItem('token')}).end(function(err, res) {
        if (err)
          console.log(err)
        else {
          console.log(res.body, "res")
          console.log(th.state.myFav, "handleClickRemoveFavorite")
          let remMovies = th.state.myFav;
          remMovies = remMovies.filter(val => val !== value);
          th.setState({myFav: remMovies})
        }
      })
    }

    render() {
      console.log(this.state.myFav, "addFav")
      let th = this;
      console.log(this.state.moviename, "moviename")
      console.log(this.state.result.length)
      console.log(this.state.result)
      return (
        <div>
          <br/>
          <br/>
          <TextField hintText="Type a movie name..." value={this.state.moviename} onChange={this.NameChange} style={{
            marginRight: '40px'
          }}/>
          &nbsp;&nbsp;
          <RaisedButton label="Search" primary={true} onClick={this.handleSearch}/>&nbsp;&nbsp;
          <RaisedButton label="Clear" secondary={true} onClick={this.handleClear}/>
          <br/>
          <br/>
          <br/>
          <br/> {!this.state.displayMsg && this.state.result.length == 0 && <h3>Want to know about a movie?<br/><br/>Just type the movie name and search!!!!</h3>}
          {this.state.result.length !== 0 && <Grid style={styles.grid}>
            <Row>
              {this.state.result.map(function(value, i) {
                return (
                  <Col xs={4} key={i} style={styles.col}>
                    <Card style={{
                      width: '373px',
                      marginRight: '20px',
                      marginBottom: '20px',
                      background: 'wheat'
                    }}>
                      <CardHeader title={value.title} style={styles.header}/> {th.state.myFav.includes(value.id)
                        ? <Favorite onClick={th.handleClickRemoveFavorite.bind(this, value.id, value.title)} style={{
                            cursor: 'pointer',
                            color: 'red'
                          }}/>
                        : <FavoriteBorder onClick={th.handleClickFavorite.bind(this, value.id, value.title)} style={{
                          cursor: 'pointer',
                          color: 'red'
                        }}/>
}

                      {value.poster_path === null
                        ? <CardMedia>
                            <img src="../images/noImageAvailable.png" style={{
                              height: '250px'
                            }}/>
                          </CardMedia>
                        : <CardMedia>
                          <img src={'http://image.tmdb.org/t/p/w185/' + value.poster_path} style={{
                            height: '250px'
                          }}/>
                        </CardMedia>
}
                      {value.release_date === ''
                        ? <CardText style={styles.cardtext}>
                            ReleasedDate : NA
                          </CardText>
                        : <CardText style={styles.cardtext}>
                          ReleasedDate : {value.release_date}
                        </CardText>
}
                    </Card>
                  </Col>
                );
              })}

            </Row>
          </Grid>
}
        </div>

      );
    }
  }
