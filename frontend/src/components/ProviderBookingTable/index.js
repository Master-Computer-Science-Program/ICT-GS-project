import React from 'react';
import { Table, Tag, Select, Button, Space } from 'antd';

const { Option } = Select;

const ProviderBookingTable = ({ data, loading, type, onStatusChange, onViewDetail }) => {
    const isStorage = type === 'cold_storage';
    const isTruck = type === 'truck';

    const handleStatusChange = (id, newStatus) => {
        if (onStatusChange) {
            onStatusChange(id, newStatus);
        }
    };

    const handleViewDetail = (record) => {
        if (onViewDetail) {
            onViewDetail(record);
        }
    };

    const columns = [
        {
            title: 'Type',
            dataIndex: 'booking_type',
            key: 'booking_type',
            render: (type) => <Tag>{type}</Tag>,
        },
        {
            title: 'Total Price',
            dataIndex: 'total_price',
            key: 'total_price',
            render: (price) => `$${price.toFixed(2)}`,
        },
        isStorage && {
            title: 'Start Date',
            dataIndex: 'start_date',
            key: 'start_date',
        },
        isStorage && {
            title: 'End Date',
            dataIndex: 'end_date',
            key: 'end_date',
        },
        isTruck && {
            title: 'Distance (km)',
            dataIndex: 'distance',
            key: 'distance',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status, record) => (
                <Select
                value={status}
                onChange={(value) => handleStatusChange(record.id, value)}
                style={{ width: 120 }}
                >
                    <Option value="requested">Requested</Option>
                    <Option value="approved">Approved</Option>
                    <Option value="rejected">Rejected</Option>
                    <Option value="completed">Completed</Option>
                </Select>
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Space>
                <Button type="link" onClick={() => handleViewDetail(record)}>
                    View Detail
                </Button>
                </Space>
            ),
        },
    ].filter(Boolean);

    return (
        <Table
            rowKey="id"
            columns={columns}
            dataSource={data}
            loading={loading}
            pagination={false}
        />
    );
};

export default ProviderBookingTable;
