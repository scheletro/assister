import React, { useRef } from 'react';
import { Whisper, Tooltip, IconButton, Button, Icon, ButtonGroup } from 'rsuite';

import './ColumnWhisper.style.less';

export interface ColumnWhisperProps {

}

export const ColumnWhisper: React.FC<ColumnWhisperProps> = () => {
    const whisperRef = useRef();

    function handleSelectMenu() {
        // @ts-ignore
        whisperRef?.current.hide();
    }

    return (
        <Whisper
            trigger="click"
            placement='bottom'
            triggerRef={whisperRef}
            speaker={
                <Tooltip>
                    <ButtonGroup classPrefix="column-option-item">
                        <Button classPrefix={"option-item"} onClick={handleSelectMenu}>编辑</Button>
                        <Icon icon="info" />
                    </ButtonGroup>
                </Tooltip>
            }
        >
            <IconButton size="xs" icon={<Icon icon="ellipsis-h" />} />
        </Whisper>
    )
}