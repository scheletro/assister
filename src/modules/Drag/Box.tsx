import React from 'react';
import { Icon } from 'rsuite';

import { useDrag } from 'react-dnd';
import { DragBox, DragType } from '../../interfaces/Drag';

import './Box.style.less';
import { useAssisterState } from '../../contexts/Assister';

export interface BoxProps {
    box: DragBox
}

export interface BoxHeaderProps {
    title: string;
}

export interface BoxFooterProps {
    timestamp: string;
}

export const BoxHeader: React.FC<BoxHeaderProps> = ({ title }) => {
    return (
        <div className="drag-box-header">
            <div>
                <span>{(title || '').toLocaleUpperCase()}</span>
            </div>
            <div className="icon-group">
                <Icon icon="ellipsis-h" />
            </div>
        </div>
    );
}


export const BoxFooter: React.FC<BoxFooterProps> = ({ timestamp }) => {
    return (
        <div className="drag-box-footer">
            <div>
                <Icon icon="bookmark" />
            </div>
            <div className="icon-group">
                <span>{timestamp}</span>
            </div>
        </div>
    )
}

export const Box: React.FC<BoxProps> = ({ box, children }) => {
    const { dispatch } = useAssisterState();
    const [{ isDragging }, drag] = useDrag({
        item: {
            type: DragType.BOX
        },
        begin: () => {
            dispatch({
                type: 'SET_TARGET_BOX',
                payload: box
            });
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
        end: () => {
            dispatch({
                type: 'SET_BOX_TO_COLUMN',
            });
        }
    })

    return (
        <div className="drag-box" ref={drag}>
            <BoxHeader title="This is Box !!!" />
            <div className="drag-box-content">
                {children}
            </div>
            <BoxFooter timestamp={'2020/12/25 21:00'} />
        </div>
    )
}