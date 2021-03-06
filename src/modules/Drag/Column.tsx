import React, { useRef } from 'react';

import { useDrag, useDrop } from 'react-dnd';

import { ColumnCreateModel } from './Column/ColumnModel';
import { ColumnWhisper } from './Column/ColumnWhisper';

import { DragColumn, DragType } from '../../interfaces/Drag';

import { useAssisterState } from '../../contexts/Assister';

import './Column.style.less';
import { Box } from './Box';

export interface ColumnProps {
    column: DragColumn
}

export interface ColumnHeaderProps {
    title: string,
    column: DragColumn
}

export const ColumnHeader: React.FC<ColumnHeaderProps> = ({ title, column }) => {
    return (
        <div className="drag-column-header">
            <div>
                <span>{(title || '').toLocaleUpperCase()}</span>
            </div>
            <div className="icon-group">
                <ColumnCreateModel column={column} />
                <ColumnWhisper />
            </div>
        </div>
    );
}

export const Column: React.FC<ColumnProps> = ({ column, children }) => {
    const { dispatch } = useAssisterState()
    const ref = useRef<HTMLDivElement>(null);

    const { id, name, boxes, } = column;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [{ isDragging }, drag] = useDrag({
        item: {
            type: DragType.COLUMN
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        })
    })

    const [, drop] = useDrop({
        accept: DragType.BOX,
        drop(item, monitor) {
            // const delta = monitor.getDifferenceFromInitialOffset() as XYCoord;
            // console.warn('hahah', id);
            dispatch({
                type: 'SET_TARGET_COLUMN',
                payload: column
            });
            // const left = Math.round(item.left + delta.x);
            // const top = Math.round(item.top + delta.y);
            return undefined;
        }
    });

    drag(drop(ref));

    return (
        <div className="drag-column" data-id={id} ref={ref}>
            <ColumnHeader title={name} column={column} />
            <div className="drag-column-list">
                {boxes.map((box, i) => {
                    // const { id } = box;
                    return (<Box key={i} box={box} />);
                })}
            </div>
        </div>
    )
}