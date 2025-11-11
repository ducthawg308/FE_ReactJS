import { notification, Table } from "antd";
import { useEffect, useState } from "react";
import { getUserApi } from '../util/api';

const UserPage = () => {
    const [dataSource, setDataSource] = useState([]);

    useEffect(()=> {
        const fetchUser = async() => {
            const res = await getUserApi();
            if(!res?.message){
                setDataSource(res)
            }else{
                notification.error({
                    message: "Unauthorized",
                    description: res.message
                })
            }
        }
        fetchUser();
    }, []);

    const columns = [
        {
            title: 'ID',
            dataIndex: '_id',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Role',
            dataIndex: 'role',
        },
    ];

    return (
        <div
            style={{
                maxWidth: 1200,
                margin: "40px auto",
                background: "#fff",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                padding: "24px",
            }}
        >
            <Table
                dataSource={dataSource}
                columns={columns}
                bordered
                rowKey={"_id"}
            />
        </div>
    );
};

export default UserPage;
