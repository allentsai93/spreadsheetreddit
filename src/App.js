import React, { Component } from 'react';
import { render } from 'react-dom';
import RedditPost from './containers/RedditPost';
import Header from './components/Header';
import './App.css';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import 'typeface-roboto';

class App extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      subreddit: "",
      title: ""
    };
  }

  componentDidMount() {
    fetch(`https://www.reddit.com/r/all.json?`)
      .then(response => response.json())
      .then(posts => this.setState({ posts: posts.data.children }))
    this.setState({ subreddit: "all" })
  }

  onChangeHandler = (e) => {
    fetch(`https://www.reddit.com/r/${e.target.value}.json?`)
      .then(response => response.json())
      .then(posts => this.setState({ posts: posts.data.children }))
    this.setState({ subreddit: e.target.value })
  }

  topPostsHandler = (e) => {
    console.log(this.state.subreddit);
    fetch(`https://www.reddit.com/r/${this.state.subreddit}/top.json?`)
      .then(response => response.json())
      .then(posts => this.setState({ posts: posts.data.children }))
  }

  hotPostsHandler = (e) => {
    fetch(`https://www.reddit.com/r/${this.state.subreddit}/hot.json?`)
      .then(response => response.json())
      .then(posts => this.setState({ posts: posts.data.children }))
  }

  newPostsHandler = (e) => {
    fetch(`https://www.reddit.com/r/${this.state.subreddit}/new.json?`)
      .then(response => response.json())
      .then(posts => this.setState({ posts: posts.data.children }))
  }

  titleChangeHandler = (e) => {
    this.setState({ title: e.target.value })
  }

  render() {
    return (
      <div>
        <header className="navbar">
          <Header />
          <div className="navbar-content">
            <Typography variant="title" noWrap>
              <input type="text" placeholder="Click to change title" onChange={this.titleChangeHandler} className="title-input" />
            </Typography>
            <h2 className="r-copy">/r/</h2><input type="text" placeholder={`all`} className="input-search" onChange={this.onChangeHandler} />
          </div>
        </header>

        <Grid container direction="row">
          <Grid sm="3" xs="4" item className="filter-cell" onClick={this.hotPostsHandler}><Typography variant="button">Hot</Typography></Grid>
          <Grid sm="2" xs="4" item className="filter-cell" onClick={this.newPostsHandler}><Typography variant="button">New</Typography></Grid>
          <Grid sm="3" xs="4" item className="filter-cell" onClick={this.newPostsHandler}><Typography variant="button">Controversial</Typography></Grid>
          <Grid sm="2" xs="6" item className="filter-cell" onClick={this.topPostsHandler}><Typography variant="button">Top</Typography></Grid>
          <Grid sm="2" xs="6" item className="filter-cell" onClick={this.newPostsHandler}><Typography variant="button">Rising</Typography></Grid>
        </Grid>
        {this.state.posts ?
          <Grid container direction="row">
            <Hidden smDown>
              <Grid item className="cell section-cell" xs="1"><Typography>#</Typography></Grid>
              <Grid item className="cell section-cell" xs="1"><Typography>Image</Typography></Grid>
              <Grid item className="cell section-cell" xs="4"><Typography>Title</Typography></Grid>
              <Grid item className="cell section-cell" xs="6"><Typography>Content</Typography></Grid>
            </Hidden>
            {this.state.posts.map(post => {
              return <RedditPost key={post.data.id} post={post} />
            })}</Grid>
          : <h1>Loading Subreddit</h1>
        }
      </div>
    )
  }
}


export default App;
