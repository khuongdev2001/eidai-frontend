import FA from "react-fontawesome";
import styles from "./uploadImage.module.scss";
import IconButton from '@mui/material/IconButton';
import { BoxFlex } from "../../components/layout/Base";
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { API_DELETE_UPLOAD_IMAGE, API_UPLOAD_IMAGE } from "../../api/product";
import axiosCommon, { BASE_URL_STOREAGE } from "../../api/axios";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

function UploadImage({ product, setProduct }) {

    function hanldeUploadFile(e) {
        if (typeof e.target.files[0] == "undefined") {
            return false;
        }
        var formData = new FormData();
        formData.append("file", e.target.files[0]);
        axiosCommon.post(API_UPLOAD_IMAGE, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(({ data }) => {
            setProduct((prevState) => {
                return {
                    ...prevState,
                    images: [...prevState.images, data.files[0].url]
                }
            })
        })
    }

    function handleRemoveFile(index) {
        // axiosCommon.post(API_DELETE_UPLOAD_IMAGE, "", {
        //     params: {
        //         path: product.images[index]
        //     }
        // })
        //     .finally(function () {
        // setProduct((preveState) => {
        //     const images = product.images;
        //     images.splice(index, 1);
        //     return {
        //         ...preveState,
        //         images
        //     }
        // })
        // });
    }

    const getItemStyle = (isDragging, draggableStyle) => ({
        // some basic styles to make the items look a bit nicer
        userSelect: "none",
        padding: 8 * 2,
        margin: `0 ${8}px 0 0`,

        // change background colour if dragging
        background: isDragging ? "lightgreen" : "grey",

        // styles we need to apply on draggables
        ...draggableStyle
    });

    const getListStyle = isDraggingOver => ({
        background: isDraggingOver ? "lightblue" : "lightgrey",
        display: "flex",
        "flex-wrap": "wrap",
        padding: 8,
        overflow: "auto",
        width: "500px",
        height: "500px"
    });

    return (
        <DragDropContext onDragEnd={(e) => {
            console.log(e);
        }}>
            <Droppable droppableId="droppable" direction="horizontal" key={"droppable"} isCombineEnabled>
                {
                    (provided, snapshot) => (
                        <BoxFlex ref={provided.innerRef} {...provided.droppableProps} style={getListStyle(snapshot.isDraggingOver)} className={styles.listImageProduct}>
                            {
                                product.images.map((item, index) => {
                                    return (
                                        <Draggable index={index} key={index} draggableId={"dev" + index}>
                                            {(provided, snapshot) => (
                                                <div key={index}
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    style={
                                                        getItemStyle(
                                                            snapshot.isDragging,
                                                            provided.draggableProps.style
                                                        )
                                                    }
                                                    className={styles.imageItem}>
                                                    <img src={BASE_URL_STOREAGE + "/" + item} />
                                                    <IconButton
                                                        onClick={() => {
                                                            handleRemoveFile(index);
                                                        }}
                                                        className={styles.btn} color="info" aria-label="upload picture" component="label">
                                                        <FA name="times" className={styles.btnIcon} />
                                                    </IconButton>
                                                </div>
                                            )}
                                        </Draggable >
                                    )
                                })
                            }
                            {/* <IconButton className={[styles.itemUpload, styles.imageItem].join(" ")} color="primary" aria-label="upload picture" component="label">
                                <input hidden accept="image/*" type="file" onChange={hanldeUploadFile} />
                                <PhotoCamera />
                            </IconButton> */}
                        </BoxFlex>
                    )
                }
            </Droppable>
        </DragDropContext>
    )
}

export default UploadImage;