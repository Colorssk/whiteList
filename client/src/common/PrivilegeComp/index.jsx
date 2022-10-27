import React from 'react';
//util
import { judgeRight } from './util'

const PrivilegeComp = props => {
    const { privilegeKey } = props
    const externalContainer = typeof props.isValid === 'boolean' ? props.isValid : false
    return (
        <>{externalContainer ? props.children : (judgeRight(privilegeKey) ? props.children : <></>)}</>
    )
}
export default PrivilegeComp