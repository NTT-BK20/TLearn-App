import Table from 'react-bootstrap/Table';
import { useEffect, useState } from 'react'
import { getAllUser, deleteUser } from '../services/UserService';
import ReactPaginate from 'react-paginate';
import ModalEditUser from '../components/ModalEditUser';
import ModalAddUser from '../components/ModalNewUser';
import { toast } from 'react-toastify';

const TableUsers = (props) => {

    const [listUsers, setListUsers] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [isShowEditUser, setIsShowEditUser] = useState(false);
    const [isShowAddUser, setIsShowAddUser] = useState(false);
    const [dataUserEdit, setDataUserEdit] = useState({});
    const [refreshSignal, setRefreshSignal] = useState(false);

    const handleClose = () => {
        setIsShowEditUser(false);
        setIsShowAddUser(false);
    }

    const handleUpdateTable = (user) => {
        setListUsers([user, ...listUsers]);
        setIsShowAddUser(false);
    }

    const handleDeleteUser = async (id) => {
        let res = await deleteUser(id);
        if(res)
        {
            toast.success("Xóa thành công !");
            setRefreshSignal(prevSignal => !prevSignal); // Đảo ngược giá trị để kích hoạt cập nhật
        }
        else
        {
            toast.error("Xóa thất bại !");
        }
    }

    useEffect(() => {
        // call apis
        // res
        getUsers(1);
    }, [refreshSignal])

    const getUsers = async (page) => {
        let res = await getAllUser(page); //let
        //const { data, totalUsers, totalPages } = res.data;
        
        if(res && res.data)
        {
            setListUsers(res.data);
            setTotalUsers(res.currentPage);
            setTotalPages(res.totalPages);
        }
        else{
            console.error('API response does not contain data.');
        }
    }

    const handlePageClick = (event) => {
        getUsers(+event.selected + 1); // Dấu + ở đầu event nhầm covert kiểu string sang number
    }

    const handleEditUser = (user) => {
        setDataUserEdit(user);
        setIsShowEditUser(true);
    }

    return (<>
        <div className='my-3 add-new'>
          <h3>Danh sách học sinh</h3>
          <button className = "btn btn-success" onClick={()=>setIsShowAddUser(true)}>
            <i className="fa-solid fa-circle-plus"></i> Thêm học sinh
          </button>
        </div>
        <Table striped bordered hover className='nameTable text-center'>
        <thead>
            <tr>
            <th>MSSV</th>
            <th>Full Name</th>
            <th>Username</th>
            <th>Contact</th>
            <th>Course</th>
            <th>Manager</th>
            </tr>
        </thead>
        <tbody>
            {listUsers && listUsers.length > 0 &&
                listUsers.map((item, index) => {
                    return(
                        <tr key={`user-${index}`}>
                            <td>{item.id}</td>
                            <td>{item.fullname}</td>
                            <td>{item.username}</td>
                            <td>{item.phone}<br />{item.email}</td>
                            <td>
                                {
                                item.course_ids
                                ? item.course_ids.split(',').map((course, index) => (
                                    <span key={`course-${index}`}>
                                    {course}
                                    {index < item.course_ids.split(',').length - 1 && <br />}
                                    </span>
                                ))
                                : 'Chưa tham gia khóa học nào!'
                                }
                            </td>
                            <td>
                                <button className='btn btn-warning mx-3' onClick={() => handleEditUser(item)}>
                                    <i className="fa-solid fa-user-pen"></i>
                                </button>
                                <button className='btn btn-danger' onClick={() => handleDeleteUser(item.id)}><i className="fa-solid fa-trash"></i></button>
                            </td>
                        </tr>
                    )
                })
            }
        </tbody>
        </Table>

        <ReactPaginate
            previousLabel="< Previous"
            nextLabel="Next >"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            pageCount={totalPages}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName="pagination justify-content-center"
            activeClassName="active"
        />

        <ModalEditUser
            show={isShowEditUser}
            dataUserEdit={dataUserEdit}
            handleClose={handleClose}
            handleUpdateTable={handleUpdateTable}
        />
        <ModalAddUser
            show={isShowAddUser}
            handleUpdateTable={handleUpdateTable}
            handleClose={handleClose}
        />
    </>)
}

export default TableUsers;