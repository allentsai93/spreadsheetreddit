import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const CommentReplies = ({ comment }) => {
  return (
    <Grid container>
      <Grid item sm="1" xs="4" className="cell">
        <Typography variant="body2" noWrap>{comment.data.author}</Typography>
        <Typography variant="body2" noWrap>{comment.data.ups} upvotes</Typography>
      </Grid>
      <Grid item sm="11" xs="8" className="cell">
        <Typography alignLeft gutterBottom>{comment.data.body}</Typography>
      </Grid>
    </Grid>
  )
}

export default CommentReplies;