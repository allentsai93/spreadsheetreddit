import React from 'react';
import '../containers/App.css';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import 'typeface-roboto';
import './Header.css';

const Header = () => {
  return (
          <AppBar position="sticky">
          <div className="toolbar">
            <Grid className="navbar-grid" container>
              <Grid item sm={1} xs={3}>
              <Icon className='fas fa-file-alt spreadsheet-icon' />
              </Grid>
              <Grid item sm={9} xs={3}>
              <Typography>Spreadsheet</Typography>
              </Grid>
              <Grid item sm={2} xs={6}>
                <div className="share-btn">
                  <Typography variant="button">Share</Typography>
                </div>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12}>
                <img className="toolbar-img" src="https://i.imgur.com/CvaJ0LO.jpg" alt="toolbar"/>
              </Grid>
            </Grid>
          </div>
          </AppBar>
  )
}

export default Header;