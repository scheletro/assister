import React, { useContext, useReducer } from 'react';
import { v4 } from 'uuid';
import { cloneDeep } from 'lodash';
import { DragBox, DragType } from '../../interfaces/Drag';

import {
    AssisterState,
    AssisterStateContextProps,
    AssisterAction,
    AssisterActionType
} from '../../interfaces/Assister';

const AssisterStateContext = React.createContext<AssisterStateContextProps>({} as AssisterStateContextProps);

const AssisterStateReducer = (state: AssisterState, action: AssisterAction): AssisterState => {
    const { type, payload } = action;

    switch (type) {
        case AssisterActionType.ADD_COLUMN: {
            return state;
        }
        case AssisterActionType.ADD_BOX: {
            const _state = cloneDeep(state);
            const { columns } = _state;
            const { column_id } = payload as DragBox;
            const target = columns.find(target => (target.id === column_id));

            if (target) {
                // @ts-ignore
                target.boxes = [].concat(target.boxes, payload);
            }

            return _state;
        }
        case AssisterActionType.SET_TARGET_BOX: {
            return Object.assign({}, state, {
                box: payload
            });
        }
        case AssisterActionType.SET_TARGET_COLUMN: {
            return Object.assign({}, state, {
                column: payload
            });
        }
        case AssisterActionType.SET_BOX_TO_COLUMN: {
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

const InitialState: AssisterState = {
    column: undefined,
    box: undefined,
    columns: [
        {
            type: DragType.COLUMN,
            id: v4(),
            name: '调研',
            boxes: [],
        },
        {
            type: DragType.COLUMN,
            id: v4(),
            name: '规划',
            boxes: [
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