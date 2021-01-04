import React, { useState } from 'react';
import { Icon, Drawer } from 'rsuite';

import './index.style.less';

export interface ArchiveProps {

}

const Archive: React.FC<ArchiveProps> = () => {
    const [disable, setDisable] = useState(false);
    return (
        <div className="archive">
            <div className="archive-controller" onClick={() => (setDisable(true))}>
                <Icon icon="angle-left" />
            </div>
            <Drawer
                show={disable}
                onHide={() => (setDisable(false))}
            >
                <Drawer.Header>
                    <Drawer.Title>计划归档</Drawer.Title>
                </Drawer.Header>
                <Drawer.Body>
                </Drawer.Body>
            </Drawer>
        </div>
    );
}

export default Archive;