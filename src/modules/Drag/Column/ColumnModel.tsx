import React, { useState, Fragment } from 'react';
import {
    Modal,
    IconButton,
    Icon,
    Placeholder,
    InputGroup,
    Input,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    DatePicker,
    Button
} from 'rsuite';

import { v4 } from 'uuid';

import { useAssisterState } from '../../../contexts/Assister';
import { DragColumn, DragType } from '../../../interfaces/Drag';

export interface ColumnCreateModelProps {
    column: DragColumn
}

export const ColumnCreateModel: React.FC<ColumnCreateModelProps> = ({ column }) => {
    const { dispatch } = useAssisterState();

    const [disable, setDisable] = useState(false);
    const [name, setName] = useState('');

    function handlerCreateBox() {
        const { id } = column;
        dispatch({
            type: 'ADD_BOX',
            payload: {
                type: DragType.BOX,
                id: v4(),
                column_id: id,
                name,
                content: '',
                timestamp: Date.now()
            }
        });
        setDisable(false);
    }

    return (
        <Fragment>
            <IconButton size="xs" icon={<Icon icon="plus" />} onClick={() => { setDisable(true) }} />
            <Modal show={disable} onHide={() => { setDisable(false) }}>
                <Modal.Header>
                    <Modal.Title>新建计划</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup>
                        <InputGroup.Addon>标题</InputGroup.Addon>
                        <Input value={name} onChange={setName} />
                    </InputGroup>
                    {/* <div>
                        <DatePicker format="DD MMM YYYY hh:mm:ss A" showMeridian ranges={[
                            {
                                label: 'Now',
                                value: new Date()
                            }
                        ]} />
                    </div>
                    <div>
                        <DatePicker format="DD MMM YYYY hh:mm:ss A" showMeridian ranges={[
                            {
                                label: 'Now',
                                value: new Date()
                            }
                        ]} />
                    </div> */}
                    <Placeholder.Graph active />
                </Modal.Body>
                <Modal.Footer>
                    <Button appearance="primary" onClick={() => { handlerCreateBox() }}>确定</Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    )
}
