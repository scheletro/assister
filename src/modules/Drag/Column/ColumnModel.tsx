import React, { useState, Fragment } from 'react';
import { Modal, IconButton, Icon, Placeholder, InputGroup, Input, DatePicker } from 'rsuite';

export interface ColumnCreateModelProps {

}

export const ColumnCreateModel: React.FC<ColumnCreateModelProps> = () => {
    const [disable, setDisable] = useState(false);

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
                        <Input />
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

                </Modal.Footer>
            </Modal>
        </Fragment>
    )
}
