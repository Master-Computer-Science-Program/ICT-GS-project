import { Table, Button} from 'antd';
import dayjs from 'dayjs';

const OrderTable = ({ data, onOpen }) => {
    const columns = [
        { title: 'ID', dataIndex: 'id' },
        { title: 'Customer ID', dataIndex: 'customer_id' },
        { title: 'Total Amount', dataIndex: 'totalAmount' },
        { title: 'Date', dataIndex: 'date' },
        { title: 'Status', dataIndex: 'status' },
        {
            title: 'Action',
            render: (_, record) => (
                <>
                    <Button type="link" onClick={() => onOpen(record)}>Detail</Button>
                </>
            ),
        },
    ];


    return <Table rowKey="id" columns={columns} dataSource={data}/>;
};

export default OrderTable;
