import React from 'react';
import { Table, Tag, Space, Button } from 'antd';

const DiscountTable = ({ data, loading, onDelete }) => {
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Percentage (%)',
            dataIndex: 'percentage',
            key: 'percentage',
            render: (percentage) => <Tag color="blue">{percentage}%</Tag>,
        },
        {
            title: 'Valid Until',
            dataIndex: 'valid_until',
            key: 'valid_until',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Space>
                    <Button type="link" danger onClick={() => onDelete(record.id)}>
                        Delete
                    </Button>
                </Space>
            ),
        },
    ];

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

export default DiscountTable;
