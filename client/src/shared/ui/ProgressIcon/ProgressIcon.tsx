import React from 'react';

import './ProgressIcon.scss';

interface ProgressIconChild {
    children: React.ReactNode
    fill: string
}

function ProgressIcon({ children: Icon, fill }: ProgressIconChild) {
    return (
        <div
            className='progressIcon'
            style={{ backgroundColor: fill }}
        >
            <div className='__topEffect'></div>
            <div className='__icon'>
                {Icon}
            </div>
        </div>
    );
}

export default ProgressIcon;
