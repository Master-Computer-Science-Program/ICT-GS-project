import React from 'react';
import { Table, Button, Popconfirm, Tag } from 'antd';

const TruckTable = ({ data, loading, onEdit, onDelete }) => {
    const columns = [
        {
        title: 'Route',
        dataIndex: 'route',
        key: 'route',
        },
        {
        title: 'Capacity',
        dataIndex: 'capacity',
        key: 'capacity',
        },
        {
        title: 'Price per Km',
        dataIndex: 'pricePerKm',
        key: 'pricePerKm',
        render: (value) => `$${value.toFixed(2)}`,
        },
        {
        title: 'Availability',
        dataIndex: 'availability',
        key: 'availability',
        render: (available) =>
            available ? (
            <Tag color="green">Available</Tag>
            ) : (
            <Tag color="red">Unavailable</Tag>
            ),
        },
        {
        title: 'Actions',
        key: 'actions',
        render: (_, record) => (
            <>
            <Button type="link" onClick={() => onEdit(record)}>
                Edit
            </Button>
            <Popconfirm
                title="Are you sure you want to delete this truck?"
                onConfirm={() => onDelete(record.id)}
                okText="Yes"
                cancelText="No"
            >
                <Button type="link" danger>
                Delete
                </Button>
            </Popconfirm>
            </>
        ),
        },
    ];

    return <Table columns={columns} dataSource={data} rowKey="id" loading={loading} />;
};

export default TruckTable;
