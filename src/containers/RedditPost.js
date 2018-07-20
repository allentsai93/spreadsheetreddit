import React, { Component } from 'react';
import "./RedditPost.css";
import PostComments from './PostComments';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import 'typeface-roboto';

class RedditPost extends Component {
  constructor() {
    super();
    this.state = {
      clicked: false,
      comments: [],
      highlighted: false,
      containsImg: false
    };
  }

  postClickHandler = () => {
    this.setState(prevState => ({
      clicked: !prevState.clicked
    }));
  }

  highlightCellHandler = () => {
    this.setState(prevState => ({
      highlighted: !prevState.highlighted
    }));
  }

  componentDidMount() {
    fetch(`https://www.reddit.com/r/${this.props.post.data.subreddit}/comments/${this.props.post.data.id}.json?`)
      .then(response => response.json())
      .then(comments => this.setState({ comments: comments[1].data.children }))
  }

  render() {
    return (
      <Grid spacing="0" container direction="row" hover onClick={this.postClickHandler}>
        <Grid item md="1" sm="2" xs="4" zeroMinWidth className={this.state.highlighted ? 'highlightedcell cell section-cell' : 'cell section-cell'} onClick={this.highlightCellHandler}>
          <Typography noWrap>
            {this.props.post.data.ups} upvotes <br />
            {this.props.post.data.num_comments} comments <br />
            by {this.props.post.data.author}
          </Typography>
        </Grid>
        <Grid item md="1" sm="10" xs="8" zeroMinWidth className={this.state.highlighted ? 'highlightedcell cell' : 'cell'} onClick={this.highlightCellHandler}>
          <Typography noWrap>{this.props.post.data.thumbnail_height ? <img src={this.props.post.data.thumbnail} alt="thumbnail" /> : null}</Typography>
        </Grid>
        <Grid item md="4" sm="12" xs="12" zeroMinWidth className={this.state.highlighted ? 'highlightedcell cell' : 'cell'} onClick={this.highlightCellHandler}>
          <Typography noWrap>
            {this.props.post.data.title}
          </Typography>
        </Grid>
        <Grid item md="6" sm="12" xs="12" zeroMinWidth className={this.state.highlighted ? 'highlightedcell cell' : 'cell'} onClick={this.highlightCellHandler}>
          <Typography noWrap>{this.props.post.data.selftext}</Typography></Grid>
        {this.state.clicked && this.state.comments ?
          <PostComments post={this.props.post.data} comments={this.state.comments} />
          : null}
      </Grid>
    )
  }
}

export default RedditPost;