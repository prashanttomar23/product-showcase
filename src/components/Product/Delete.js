import React from 'react'
import { EuiButtonIcon} from '@elastic/eui';

function Delete(props) {
    const {callBackDelete}=props
    return (
        <div>
              <EuiButtonIcon iconType="trash" onClick={()=>callBackDelete()} ></EuiButtonIcon>
        </div>
    )
}

export default Delete