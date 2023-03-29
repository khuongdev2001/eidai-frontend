import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import styles from "./productProperty.module.scss";
import { Box, Chip, IconButton, InputAdornment } from '@mui/material';
import { BoxFlex } from '../../components/layout/Base';
import { Delete } from '@mui/icons-material';
import Divider from '@mui/material/Divider';
import { useEffect, useState } from 'react';
import { schema } from './validates/FormSubProductProperty';
import axiosCommon from '../../api/axios';
import { API_GET_LIST_PROPERTY, API_GET_PROPERTY_GROUP } from '../../api/productProperty';

function ProductProperty({ productRef }) {
    const [productProperties, setProductProperties] = useState(schema);
    const [priorities, setPriorities] = useState([]);
    useEffect(() => {
        axiosCommon.get(API_GET_LIST_PROPERTY).then(({ data }) => {
            setPriorities(data.result.data.items);
        })
    }, []);

    useEffect(() => {
        console.log(productProperties);
        if (productRef.current.action == "create") {
            return;
        }
        axiosCommon.get(API_GET_PROPERTY_GROUP, {
            params: {
                product_id: productRef.current.product_id
            }
        }).then(({ data }) => {
            setProductProperties((prevState)=>{
                return {
                    ...prevState,
                    properties:data.result.data
                }
            });
        })
    }, []);

    useEffect(() => {
        productRef.current.dataProperty = productProperties;
    }, [productProperties]);

    function handleChangeProperty(property) {
        const isExist = productProperties.properties.find(function (item) {
            return item.property_id == property.id;
        })
        console.log(property);
        if (!isExist) {
            const data = productProperties.properties;
            data.push({
                property_id: property.id,
                property_name: property.property_name,
                values: []
            });
            setProductProperties((prevState) => {
                return {
                    ...prevState,
                    properties: data
                }
            });
            console.log(data);
        }
    }

    function handlePushProperty() {

    }

    function handleDeleteProperty(index) {
        const data = productProperties.properties;
        data.splice(index, 1);
        setProductProperties((prevState) => {
            return {
                ...prevState,
                properties: data
            }
        });
    }

    function handleDeletePropertyValue(indexParent, indexValue) {
        const data = productProperties.properties;
        data[indexParent].values.splice(indexValue, 1);
        setProductProperties((prevState) => {
            return {
                ...prevState,
                properties: data
            }
        });
    }

    function handleAddValue(index, event) {
        if (event.key == "Enter") {
            const data = productProperties.properties;
            data[index].values.push(event.target.value);
            setProductProperties((prevState) => {
                return {
                    ...prevState,
                    properties: data
                }
            })
            event.target.value = "";
        }
    }

    return (<div>
        <FormControl sx={{ mt: 2 }}>
            <InputLabel id="demo-simple-select-label">Thuộc tính</InputLabel>
            <Select
                size='small'
                sx={{ width: 230 }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Age"
                onChange={(e) => {
                    handleChangeProperty(e.target.value);
                }}
            >
                {priorities.map((item) => {
                    return (
                        <MenuItem key={item.id} value={item}>{item.property_name}</MenuItem>
                    )
                })}
            </Select>
        </FormControl>
        <Divider sx={{ my: 2 }} variant="middle" />
        <Box className={styles.listProperty}>
            {productProperties.properties.map((item, index) => {
                return (
                    <BoxFlex key={item.property_id} style={{ paddingTop: 15 }} justifyContent="space-between">
                        <TextField
                            sx={{ width: 230 }}
                            size='small'
                            id="outlined-required"
                            label="Tên thuộc tính"
                            disabled
                            value={item.property_name}
                        />
                        <div className={styles.boxAction}>
                            <TextField id="input-with" onKeyDown={(event) => {
                                handleAddValue(index, event);
                            }} size='small' InputProps={{
                                startAdornment: <InputAdornment position="start">
                                    {
                                        item.values.map((item, key) => {
                                            return (<Chip key={key} size="small" label={item} onDelete={() => { handleDeletePropertyValue(index, key) }} />)
                                        })
                                    }
                                </InputAdornment>,
                            }} />
                            <IconButton onClick={(e) => {
                                handleDeleteProperty(index)
                            }} sx={{ mx: 2 }}>
                                <Delete />
                            </IconButton>
                        </div>
                    </BoxFlex>
                )
            })}
        </Box>
        <Divider sx={{ my: 3 }} variant="middle" />
    </div>)
}

export default ProductProperty;