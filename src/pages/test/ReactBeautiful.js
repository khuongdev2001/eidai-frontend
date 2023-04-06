// import React, { useState } from "react";
// import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
// import Modal from "../../components/layout/Modal";

function ReactBeautifulDev() {
    const [data, setData] = useState(() => {
        return [
            {
                id: 1,
                name: "Box1"
            },
            {
                id: 2,
                name: "Box2"
            },
            {
                id: 3,
                name: "Box3"
            }
        ]
    })

    const getListStyle = (isDraggingOver, itemsLength) => ({
        background: isDraggingOver ? "lightblue" : "lightgrey",
        display: "flex",
        padding: 8,
        width: itemsLength * 68.44 + 16
    });

    return (
        <DragDropContext>
            <Modal isShow={true} size="lg">
                <div style={{margin:"0px auto" }}>
                    <Droppable droppableId="droppable" direction="horizontal" key={"droppable"}>
                        {(provided, snapshot) => {
                            return (
                                <div ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver, data.length)} {...provided.droppableProps}>
                                    {data.map((value, index) => {
                                        return (<Draggable index={index} key={index} draggableId={"dev" + index}>
                                            {
                                                (provided, snapshot) => {
                                                    return (<div key={index} className="socket22" ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                    >
                                                        {value.name}
                                                    </div>)
                                                }
                                            }
                                        </Draggable>)
                                    })}
                                </div>
                            )
                        }}
                    </Droppable>
                </div>
            </Modal>
        </DragDropContext>
    )
}

export default ReactBeautiful;