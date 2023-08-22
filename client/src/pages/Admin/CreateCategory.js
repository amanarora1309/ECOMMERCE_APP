import React, { useState, useEffect } from 'react'
import Layout from '../../component/Layout/Layout'
import AdminMenu from '../../component/Layout/AdminMenu'
import axios from 'axios';
import CategoryForm from '../../component/forms/CategoryForm';
import { Modal } from 'antd';
import { tostE, tostS } from '../../toast/Toast';

const CreateCategory = () => {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState(" ");
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState(null);
    const [updatedName, setUpdatedName] = useState("")
    const update = true;
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/category/create-category`, { name });
            setName("");

            if (data?.success) {
                tostS(`${name} is created`);
                getAllCategory();
            }
            else {
                tostE(data.message);
            }
        } catch (error) {
            console.log(error);
            tostE(error.response.data.message);
        }

    }

    const getAllCategory = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`);
            if (data?.success) {
                setCategories(data?.category);
            }
        } catch (error) {
            console.log(error);
            tostE(error.response.data.message);
        }
    };

    useEffect(() => {
        getAllCategory();
    }, [])

    // update category

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/category/update-category/${selected._id}`, { name: updatedName });
            if (data?.success) {
                tostS(data.message);
                setSelected(null);
                setUpdatedName("");
                setVisible(false);
                getAllCategory();
            }
            else {
                tostE(data.message);
            }
        } catch (error) {
            console.log(error);
            tostE(error.response.data.message);
        }
    }

    // delete category

    const handleDelete = async (pid) => {


        try {
            const { data } = await axios.delete(`${process.env.REACT_APP_API}/api/v1/category/delete-category/${pid}`);
            if (data?.success) {
                tostS(data.message);
                getAllCategory();
            }
            else {
                tostE(data.message);
            }
        } catch (error) {
            console.log(error);
            tostE(error.response.data.message);
        }
    }
    return (
        <Layout title={"Dashboard - Create Category"}>
            <div style={{ "margin-top": "5rem" }} >
                <div className="container-fluid m-3 p-3" >
                    <div className="row">
                        <div className="col-md-3">
                            <AdminMenu />
                        </div>
                        <div className="col-md-9">
                            <h1>Manage Category</h1>
                            <div className="p-3 w-50">
                                <CategoryForm value={name} setValue={setName} handleSubmit={handleSubmit} />
                            </div>
                            <div className='w-75'>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Name</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {categories.map((c) => (
                                            <tr>
                                                <td key={c._id}>{c.name}</td>
                                                <td>
                                                    <button className="btn btn-primary mx-2" onClick={() => { setVisible(true); setUpdatedName(c.name); setSelected(c) }}>Edit</button>
                                                    <button className="btn btn-danger mx-2 " onClick={() => handleDelete(c._id)} >Delete</button>
                                                </td>
                                            </tr>
                                        ))}

                                    </tbody>
                                </table>

                            </div>
                            <Modal onClancle={() => setVisible(false)} footer={null} open={visible} >
                                <CategoryForm value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdate} update={update} />
                            </Modal>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CreateCategory
