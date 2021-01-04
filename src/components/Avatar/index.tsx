import React from 'react';

import './index.style.less';

export interface AvatarProps {
    image: string;
    name: string;
    style: React.CSSProperties;
}

export const Avatar: React.FC<AvatarProps> = ({ image, name, style }) => {
    return (
        <div className="avatar" title={name} style={{ ...style }}>
            <img src={image} alt="name" />
        </div>
    )
}