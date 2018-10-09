import React, { Component } from 'react';
import { connect } from 'react-redux';
import RedditPost from './RedditPost';
import Header from '../components/Header';
import './App.css';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import { setSearchField, requestSubs, setCategory } from '../actions';
import 'typeface-roboto';

const mapStateToProps = state => {
  return {
    searchField: state.searchSubs.searchField,
    category: state.searchSubs.category,
    posts: state.requestSubs.posts,
    isPending: state.requestSubs.isPending,
    error: state.requestSubs.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onCategoryChange: (cat) => dispatch(setCategory(cat)),
    onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
    onRequestSubs: () => dispatch(requestSubs())
  }
}
  
class App extends Component {
  
  componentDidMount() {
    this.props.onRequestSubs();
  }
  
  componentDidUpdate(prevProps, prevState) {
      if (prevProps.searchField !== this.props.searchField || prevProps.category !== this.props.category) {
        this.props.onRequestSubs();
      }
  }
  
  categoryChange = () => {
    let category = this.state.subredditFilter ? this.state.subredditFilter : "";
    fetch(`https://www.reddit.com/r/${this.state.subreddit}/${category}.json?`)
      .then(response => response.json())
      .then(posts => this.setState({ posts: posts.data.children }))
  }

  render() {
    const { searchField, onSearchChange, posts, isPending, onCategoryChange } = this.props;
    return (
      <div>
        <header className="navbar">
          <Header />
          <div className="navbar-content">
            <Typography variant="title" noWrap>
              <input type="text" placeholder="Click to change title" className="title-input" />
            </Typography>
            <h2 className="r-copy">/r/</h2><input type="text" placeholder={`all`} className="input-search" onChange={onSearchChange} />
          </div>
        </header>

        <Grid container direction="row">
          <Grid sm={3} xs={4} item className="filter-cell" onClick={() => onCategoryChange('/hot')}><Typography variant="button">Hot</Typography></Grid>
          <Grid sm={2} xs={4} item className="filter-cell" onClick={() => onCategoryChange('/new')}><Typography variant="button">New</Typography></Grid>
          <Grid sm={3} xs={4} item className="filter-cell" onClick={() => onCategoryChange('/controversial')}><Typography variant="button">Controversial</Typography></Grid>
          <Grid sm={2} xs={6} item className="filter-cell" onClick={() => onCategoryChange('/top')}><Typography variant="button">Top</Typography></Grid>
          <Grid sm={2} xs={6} item className="filter-cell" onClick={() => onCategoryChange('/rising')}><Typography variant="button">Rising</Typography></Grid>
        </Grid>
        {!isPending ?
          <Grid container direction="row">
            <Hidden smDown>
              <Grid item className="cell section-cell" xs={1}><Typography>#</Typography></Grid>
              <Grid item className="cell section-cell" xs={1}><Typography>Image</Typography></Grid>
              <Grid item className="cell section-cell" xs={4}><Typography>Title</Typography></Grid>
              <Grid item className="cell section-cell" xs={6}><Typography>Content</Typography></Grid>
            </Hidden>
            {posts.map(post => {
              return <RedditPost key={post.data.id} post={post} />
            })}</Grid>
          : <h1>Loading Subreddit</h1>
        }
      </div>
    )
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
