import { connect } from 'react-redux';

import UserInfo from "./components/UserInfo";
import PhotoElement from "./components/PhotoElement";
import DateCreated from "./components/DateCreated";
import LikesSum from "./components/LikesSum";






App = connect(
    mapStateToProps,
    mapDispatchToProps
)(App);

export default App;