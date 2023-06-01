import React, {useEffect} from 'react';
import {connect} from 'react-redux';

import RootScreen from 'src/screens/_Root/RootScreen';
import StartupActions from 'src/stores/startup/Actions';

function RootScreenContainer(props) {
  const {startup} = props;

  useEffect(() => {
    startup();
  }, [startup]);

  return (
    <RootScreen {...props} />
  );
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({
  startup: () => dispatch(StartupActions.startup()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RootScreenContainer);
