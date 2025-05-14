import { Table, Button, Popconfirm } from 'antd';

const ProductTable = ({ data, onEdit, onDelete, loading }) => {
    const columns = [
        { title: 'Type', dataIndex: 'type' },
        { title: 'Quantity', dataIndex: 'quantity' },
        { title: 'Harvest Date', dataIndex: 'harvestDate' },
        { title: 'Price', dataIndex: 'price' },
        {
        title: 'Action',
        render: (_, record) => (
            <>
            <Button type="link" onClick={() => onEdit(record)}>Edit</Button>
            <Popconfirm title="Are you sure?" onConfirm={() => onDelete(record.id)}>
                <Button type="link" danger>Delete</Button>
            </Popconfirm>
            </>
        ),
        },
    ];

    return <Table rowKey="id" columns={columns} dataSource={data} loading={loading} />;
};

export default ProductTable;
