import { useEffect, useState } from 'react';
import {Modal, Button} from 'react-bootstrap'
import {MDBInput} from 'mdb-react-ui-kit';
import { toast } from 'react-toastify';
import { postUser, getSchool } from '../services/UserService'
import { Autocomplete, TextField } from '@mui/material'

const ModalNewUser = (props) => {
    const {show, handleClose, handleUpdateTable, dataNewUser} = props;
    const [username, setUsername] = useState("");
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [school, setSchool] = useState("");
    const [showSchool, setshowSchool] = useState([]);

    useEffect(() => {
        getSchools();
    }, []);

    const getSchools = async () => {
        try {
            const res = await getSchool();
            setshowSchool(res.data);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    const handleSaveUser = async (user) => {
        console.log("Check Create: ", user)
        if ( !user.fullname || !user.username || !user.email || !user.phone || !user.school ) {
            toast.error("Vui lòng điền đầy đủ thông tin!") //error
            return;
        }

        // Thực hiện hành động thêm người dùng thông qua API
        let res = await postUser(user);
        // Nếu thêm người dùng thành công, cập nhật lại danh sách người dùng và đóng modal thêm người dùng
        if (res) {
            handleClose();
            setFullname('');
            setUsername('');
            setEmail('');
            setPhone('');
            setSchool('');
            toast.success("Tạo thành công user: " + username + " !");
            handleUpdateTable({ fullname: fullname, username: username, email: email, phone: phone,school: school});
        } else {
            toast.error("Có lỗi xảy ra !") //error
        }
    }

    return (
        <>
        <Modal show={show} onHide={handleClose} className="custom-modal">
            <Modal.Header className="d-flex justify-content-center">
            <Modal.Title>Thêm Học Sinh</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <MDBInput wrapperClass='mb-4' label='Full Name' id='form1' type='text' value={fullname} onChange={(event) => setFullname(event.target.value)}/>
                <MDBInput wrapperClass='mb-4' label='Username' id='form1' type='text' value={username} onChange={(event) => setUsername(event.target.value)}/>
                <MDBInput wrapperClass='mb-4' label='Email' id='form1' type='email' value={email} onChange={(event) => setEmail(event.target.value)}/>
                <MDBInput wrapperClass='mb-4' label='Phone' id='form1' type='tel' value={phone} onChange={(event) => setPhone(event.target.value)}/>
                <Autocomplete 
                    disablePortal
                    id="school_autocomplete"
                    options={showSchool.map((school) => school.name)}
                    inputValue={school}
                    onInputChange={(event, inputValue) => setSchool(inputValue)} // Handling the change event to update setCourse
                    sx={{ width: 370}}
                    renderInput={(params) => <TextField {...params} label="School"/>}
                />
            </Modal.Body>    
            <Modal.Footer className="d-flex justify-content-around">
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => handleSaveUser({ fullname, username, email, phone, school })}>
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
        </>
    )
}

export default ModalNewUser;