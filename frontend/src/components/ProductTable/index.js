import { Table, Button, Popconfirm, Tag } from 'antd';
import dayjs from 'dayjs';
import './index.css';

const ProductTable = ({ data, loading, onEdit, onDelete, actionRenderer }) => {
    const HARVEST_SOON_DAYS = 3;

    const columns = [
        { title: 'Type', dataIndex: 'type' },
        { title: 'Quantity', dataIndex: 'quantity' },
        { title: 'Harvest Date', dataIndex: 'harvestDate' },
        { title: 'Price', dataIndex: 'price' },
        {
            title: 'Status',
            render: (_, record) => {
                const today = dayjs();
                const harvestDate = dayjs(record.harvestDate);
                if (harvestDate.isBefore(today.add(1, 'day'))) {
                    return <Tag color="green">For Sale</Tag>;
                } else if (harvestDate.isBefore(today.add(HARVEST_SOON_DAYS + 1, 'day'))) {
                    return <Tag color="orange">Harvest Soon</Tag>;
                }
                return <Tag color="blue">Growing</Tag>;
            },
        },
        {
            title: 'Action',
            render: (_, record) =>
                actionRenderer ? (
                    actionRenderer(record)
                ) : (
                    <>
                        <Button type="link" onClick={() => onEdit(record)}>Edit</Button>
                        <Popconfirm title="Are you sure?" onConfirm={() => onDelete(record.id)}>
                            <Button type="link" danger>Delete</Button>
                        </Popconfirm>
                    </>
                ),
        },
    ];

    const rowClassName = (record) => {
        const today = dayjs();
        const harvestDate = dayjs(record.harvestDate);
        if (harvestDate.isBefore(today.add(1, 'day'))) return '';
        if (harvestDate.isBefore(today.add(HARVEST_SOON_DAYS + 1, 'day'))) return 'harvest-soon-row';
        return '';
    };

    return <Table rowKey="id" columns={columns} dataSource={data} loading={loading} rowClassName={rowClassName} />;
};


export default ProductTable;
