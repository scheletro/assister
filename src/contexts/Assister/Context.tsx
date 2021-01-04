import React, { useContext, useReducer } from 'react';
import { v4 } from 'uuid';
import { cloneDeep } from 'lodash';
import { DragBox, DragColumn, DragType } from '../../interfaces/Drag';

export interface AssisterState {
    column: DragColumn | undefined,
    box: DragBox | undefined,
    columns: Array<DragColumn>,
}

interface AssisterStateContextProps {
    state: {},
    dispatch: React.Dispatch<any>
}

type Action = {
    type: 'ADD_COLUMN' | 'SET_TARGET_BOX' | 'SET_TARGET_COLUMN' | 'SET_BOX_TO_COLUMN',
    payload: DragColumn | DragBox,
}

const AssisterStateContext = React.createContext<AssisterStateContextProps>({} as AssisterStateContextProps);

const AssisterStateReducer = (state: AssisterState, action: Action): AssisterState => {
    const { type, payload } = action;

    switch (type) {
        case 'ADD_COLUMN': {
            return state;
        }
        case 'SET_TARGET_BOX': {
            return Object.assign({}, state, {
                box: payload
            });
        }
        case 'SET_TARGET_COLUMN': {
            return Object.assign({}, state, {
                column: payload
            });
        }
        case 'SET_BOX_TO_COLUMN': {
            // TODO: 对象引用的问题
            const _state = cloneDeep(state);
            const { columns, column, box } = _state;


            if (column) {
                const target = columns.find(target => (target.id === column.id));
                const parent = columns.find(target => (target.id === box?.column_id));

                if (box) {
                    // @ts-ignore
                    target.boxes = [].concat(target.boxes, Object.assign({}, box, {
                        // @ts-ignore
                        column_id: target.id
                    }));
                    // @ts-ignore
                    parent.boxes = parent.boxes.filter(column => column.id !== box.id);
                }
            }

            return _state;
        }
        default: {
            return state;
        }
    }
}

const TestID = v4()
const TargetId = v4()

const InitialState: AssisterState = {
    column: undefined,
    box: undefined,
    columns: [
        {
            type: DragType.COLUMN,
            id: TargetId,
            name: '调研',
            boxes: [],
        },
        {
            type: DragType.COLUMN,
            id: TestID,
            name: '规划',
            boxes: [
                {
                    type: DragType.BOX,
                    column_id: TestID,
                    id: v4(),
                    name: 'This is Box !!!',
                    content: '',
                    timestamp: Date.now()
                },
                {
                    type: DragType.BOX,
                    column_id: TestID,
                    id: v4(),
                    name: 'This is Box !!!',
                    content: '',
                    timestamp: Date.now()
                }
            ],
        },
        {
            type: DragType.COLUMN,
            id: v4(),
            name: '实现',
            boxes: [],
        },
        {
            type: DragType.COLUMN,
            id: v4(),
            name: '回归',
            boxes: [],
        },
    ]
}

export const AssisterStateProvider = ({ children }: React.PropsWithChildren<{}>) => {
    const [state, dispatch] = useReducer(AssisterStateReducer, InitialState);

    return (
        <AssisterStateContext.Provider value={{ state, dispatch }}>
            {children}
        </AssisterStateContext.Provider>
    );
};


export const useAssisterState = () => {
    return useContext(AssisterStateContext);
}