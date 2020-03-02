import { connect } from 'react-redux';
import { compose } from 'recompose';

import * as globalActions from "src/redux/actions/GlobalActions";

export default function globalConnect(mappings?: (state: any) => object) {
  return function (component: any): any {
    // eslint-disable-next-line no-underscore-dangle
    return compose(
      connect(
        (state, ownProps) => (mappings ? mappings(state) : {}),
        (dispatch: any) => globalActions.actionBuilder(dispatch),
      ),
    )(component);
  };
}
