import { DragColumn, DragType } from '../../interfaces/Drag';

export type Action = {
    type: 'ADD_COLUMN',
    payload: DragColumn,
}