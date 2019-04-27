import React from 'react';
import moment from 'moment';

const FromNow = ({createdAt}) => {
    let diff = moment(createdAt).fromNow();
    return <span>{diff}</span>
}

export default React.memo(FromNow);