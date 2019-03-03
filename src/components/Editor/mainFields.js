import React from 'react';

import EmailEditor from './EmailTemplate';

export const mainFields = props => {
    const { input: { onChange, value }, id } = props;

    return (
        <EmailEditor
            id={id}
            onChange={onChange}
            value={value}
            {...props}
        />
    )
}

export default mainFields;