import { DragBox, DragColumn, DragType } from './Drag';

export const AssisterActionType = {
    ADD_COLUMN: 'ADD_COLUMN',
    ADD_BOX: 'ADD_BOX',
    SET_TARGET_BOX: 'SET_TARGET_BOX',
    SET_TARGET_COLUMN: 'SET_TARGET_COLUMN',
    SET_BOX_TO_COLUMN: 'SET_BOX_TO_COLUMN'
}

export type AssisterActionType = 'ADD_COLUMN' | 'ADD_BOX' | 'SET_TARGET_BOX' | 'SET_TARGET_COLUMN' | 'SET_BOX_TO_COLUMN';

export type AssisterAction = {
    type: AssisterActionType,
    payload: DragColumn | DragBox,
}

export interface AssisterStateContextProps {
    state: {},
    dispatch: React.Dispatch<any>
}

export interface AssisterState {
    column: DragColumn | undefined,
    box: DragBox | undefined,
    columns: Array<DragColumn>,
}
