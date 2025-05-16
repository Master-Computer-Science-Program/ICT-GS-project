import { Table, Tag } from 'antd';

const BookingTable = ({ data, loading, type }) => {
    const isStorage = type === 'cold_storage';
    const isTruck = type === 'truck';

    const columns = [
        { title: 'Type', dataIndex: 'booking_type', key: 'booking_type', render: (type) => <Tag>{type}</Tag> },
        { title: 'Total Price', dataIndex: 'total_price', key: 'total_price', render: (price) => `$${price.toFixed(2)}` },
        isStorage && { title: 'Start Date', dataIndex: 'start_date', key: 'start_date' },
        isStorage && { title: 'End Date', dataIndex: 'end_date', key: 'end_date' },
        isTruck && { title: 'Distance (km)', dataIndex: 'distance', key: 'distance' },
        { title: 'Status', dataIndex: 'status', key: 'status', render: (status) => <Tag color={status === 'approved' ? 'green' : 'orange'}>{status}</Tag> },
    ].filter(Boolean); // remove false entries

    return <Table rowKey="id" columns={columns} dataSource={data} loading={loading} pagination={false} />;
};

export default BookingTable;
