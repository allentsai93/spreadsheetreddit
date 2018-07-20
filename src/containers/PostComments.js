import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CommentReplies from '../components/CommentReplies';
import PostImage from './PostImage';
import './PostComments.css';

class PostComments extends Component {
  
  state = {
    containsImg: false
  }

  render() {
    const { post, comments } = this.props;
    return (
      <Grid container className="highlightedcell">
        <Grid item xs="12" zeroMinWidth className="highlightedcell">
          <Typography align="center"><PostImage post={post}/></Typography>
        </Grid>
        <Grid item xs="12" zeroMinWidth className="highlightedcell">
          <Typography variant="title" gutterBottom align="center">{post.selftext ? post.selftext : post.title}</Typography>
        </Grid>
        <Grid item xs="12" zeroMinWidth className="highlightedcell">
          <Typography variant="title" gutterBottom>Comments</Typography>
        </Grid>
        <Grid item xs="12" zeroMinWidth>
          {comments.map(comments => {
            return <CommentReplies comment={comments} />;
          })}
        </Grid>
      </Grid>
    )
  }
}

export default PostComments;