import * as React from "react";
import {Modal, Box, Button } from "@mui/material";

const info_box = {
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    p: 2,
};

const styleImge = {
    width: "100%",
    height: "20rem",
};

export default function profileMore({ data }) {
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { nombre,url_foto,descripcion} = data;

    return (
        <div>
            <Button className="button_more" onClick={handleClickOpen}></Button>
            <Modal open={open} onClose={handleClose}>
                <Box className="Information" sx={info_box}>
                    <img style={styleImge} src={url_foto}/>
                    <Box className='profileName'>
                        Nombre: {nombre}
                    </Box>
                    <Box className='profileDescp'>
                        Descripcion:{descripcion}
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}