import React from 'react';
import { useDrop, XYCoord } from 'react-dnd';

import { useAssisterState } from '../../contexts/Assister';
import { DragColumn, DragType } from '../../interfaces/Drag';

import { Column } from './Column';

import './Container.style.less';

export const Container: React.FC<{}> = () => {
    const { state } = useAssisterState();
    const [, drop] = useDrop({
        accept: [DragType.COLUMN],
        drop(item: DragColumn, monitor) {
            // const delta = monitor.getDifferenceFromInitialOffset() as XYCoord;
            // return undefined;
        }
    });

    return (
        <div className="drag-container" ref={drop}>
            {
                // @ts-ignore
                state.columns.map((column: DragColumn, i: number) => (
                    <Column key={i} column={column}>
                        {/* {} */}
                    </Column>
                ))
            }
        </div>
    )
}