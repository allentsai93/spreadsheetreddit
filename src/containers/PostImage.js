import React, { Component } from 'react';

class PostImage extends Component {
  state = {
    isGif: false,
    imageUrl: ""
  }

  componentWillMount() {
    const { post } = this.props;
    switch(post.domain) {
      case "v.redd.it": 
      this.setState({imageUrl: post.url});
      break;
      case "i.imgur.com":
      this.setState({imageUrl: post.url}) 
    }
    
  }

  render() {
  const { post } = this.props;
  return (
    <img className="post-image" src={post.url} />
  )
  }
}

export default PostImage;