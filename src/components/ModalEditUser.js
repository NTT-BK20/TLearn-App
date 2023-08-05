import { useEffect, useState, TextField } from 'react';
import {Modal, Button} from 'react-bootstrap'
import {MDBInput} from 'mdb-react-ui-kit';
import dayjs from 'dayjs';
import { updateUser } from '../services/UserService';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const ModalEditUser = (props) => {
    const {show, handleClose, dataUserEdit} = props;
    const [id, setID] = useState("");
    const [username, setUsername] = useState("");
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [birth, setBirth] = useState(dayjs(dataUserEdit.dayofbirth));
    const [school, setSchool] = useState("");
    const [major, setMajor] = useState("");
    const [course_ids, setIDCourse] = useState("");
    const [isFocused, setIsFocused] = useState(false);

    const handleEditUser = async (user) => {
        console.log("DataEdit: ", dataUserEdit);
        //let res = await updateUser()
    }
    
    const ResetPassword = () => {
        
    }

    useEffect(() => {
        if(show){
            setID(dataUserEdit.id);
            setFullname(dataUserEdit.fullname);
            setUsername(dataUserEdit.username);
            setEmail(dataUserEdit.email);
            setPhone(dataUserEdit.phone);
            setBirth(dayjs(dataUserEdit.dayofbirth));
            setSchool(dataUserEdit.school);
            setMajor(dataUserEdit.major);
            setIDCourse(dataUserEdit.course_ids);
        }
    }, [dataUserEdit])

    return (
        <>
        <Modal show={show} onHide={handleClose} className="custom-modal">
            <Modal.Header closeButton>
            <Modal.Title>Edit User</Modal.Title>
            </Modal.Header>
            <Modal.Body className='h=50'> 
                <MDBInput wrapperClass='mb-4' label='MSSV' id='form1' type='text' value={id} onChange={(event) => setID(event.target.value)}/>
                <MDBInput wrapperClass='mb-4' label='Full Name' id='form1' type='text' value={fullname} onChange={(event) => setFullname(event.target.value)}/>
                <MDBInput wrapperClass='mb-4' label='Username' id='form1' type='text' value={username} onChange={(event) => setUsername(event.target.value)}/>
                <MDBInput wrapperClass='mb-4' label='Email' id='form1' type='email' value={email} onChange={(event) => setEmail(event.target.value)}/>
                <MDBInput wrapperClass='mb-4' label='Phone' id='form1' type='text' value={phone} onChange={(event) => setPhone(event.target.value)}/>
                <MDBInput wrapperClass='mb-4' label='School' id='form1' type='text' value={school} onChange={(event) => setSchool(event.target.value)}/>
                <MDBInput wrapperClass='mb-4' label='Major' id='form1' type='text' value={major} onChange={(event) => setMajor(event.target.value)}/>
                <MDBInput wrapperClass='mb-4' label='Courses' id='form1' type='text' value={course_ids} onChange={(event) => setIDCourse(event.target.value)}/>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Day of Birth"
                        value={birth}
                        onChange={(value) => setBirth(value)}
                        renderInput={(params) => <TextField {...params} />}
                        format="DD/MM/YYYY"  // Format added here
                        sx={{ width: 368 }}
                    />
                </LocalizationProvider>
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-evenly">
                <Button variant="secondary" onClick={() => ResetPassword()}>
                    Reset Password
                </Button>
                <Button variant="primary" onClick={() => handleEditUser()}>
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
        </>
    )
}

export default ModalEditUser;