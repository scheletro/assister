import React from 'react';
import { Icon, IconButton, Whisper, Tooltip } from 'rsuite';

import './index.style.less';

export interface ConfigurationProps {

}

export const ConfigurationInner: React.FC<ConfigurationProps> = () => {
    return (
        <div className="configuration-module-container">
            <div className="configuration-module-icon-block">
                <IconButton icon={<Icon icon="cog" />} />
            </div>
            <div className="configuration-module-icon-block">
                <IconButton icon={<Icon icon="cog" />} />
            </div>
            <div className="configuration-module-icon-block">
                <IconButton icon={<Icon icon="cog" />} />
            </div>
            <div className="configuration-module-icon-block">
                <IconButton icon={<Icon icon="cog" />} />
            </div>
            <div className="configuration-module-icon-block">
                <IconButton icon={<Icon icon="cog" />} />
            </div>
            <div className="configuration-module-icon-block">
                <IconButton icon={<Icon icon="cog" />} />
            </div>
            <div className="configuration-module-icon-block">
                <IconButton icon={<Icon icon="cog" />} />
            </div>
        </div>
    )
}
// TODO: DND 下面无法正常触发
const Configuration: React.FC<ConfigurationProps> = () => {
    return (
        <Whisper placement='top' trigger="click" speaker={
            <Tooltip>
                <ConfigurationInner />
            </Tooltip>
        }>
            <div className="configuration">
                <IconButton icon={<Icon icon="cube" />} circle size="lg" />
            </div>
        </Whisper>
    )
}

export default Configuration;