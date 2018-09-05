import _ from 'lodash';

export default props => _.pick(props, ['id', 'name', 'width', 'height']);
