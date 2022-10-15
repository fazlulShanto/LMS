import { Result } from 'antd';
import React from 'react';

function UserNotApproved() {
    const titleText = 'Almost Done!';
    const Extra = (
        <div>
            <h1>Please wait till an Admin verify your identity.</h1>
        </div>
    );
    return (
        <Result
            style={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                justifyContent: 'center',
                width: '100vw',
                height: '100vh',
            }}
            title={titleText}
            extra={Extra}
        />
    );
}

export default UserNotApproved;
