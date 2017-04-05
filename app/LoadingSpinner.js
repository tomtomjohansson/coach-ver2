import React, {Component} from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import { connect } from 'react-redux';
import {colors} from './themes';


class LoadingSpinner extends Component {
  constructor (props) {
    super(props);
  }
  render(){
    return (
      <Spinner visible={this.props.loading > 0} textStyle={{color: colors.grassy}} color={colors.grassy} overlayColor={colors.semiPlusTransparentBlack} />
    );
  }
}

function mapStateToProps(state) {
  const loading = state.ajax;
  return {
    loading
  };
}

export default connect(mapStateToProps)(LoadingSpinner);
