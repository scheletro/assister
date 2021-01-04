export const DragType = {
    COLUMN: 'column',
    BOX: 'box'
}

export interface DragColumn {
    type: string,
    id: string,
    name: string,
    boxes: Array<DragBox>
}

export interface DragBox {
    type: string,
    id: string,
    column_id: string,
    name: string,
    content: string,
    timestamp: number
}