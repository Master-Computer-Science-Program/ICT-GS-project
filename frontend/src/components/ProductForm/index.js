import { Form, Input, InputNumber, DatePicker, Button } from 'antd';
import dayjs from 'dayjs';

const ProductForm = ({ initialValues, onSubmit }) => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        values.harvestDate = values.harvestDate.format('YYYY-MM-DD');
        onSubmit(values);
    };

    return (
        <Form form={form} initialValues={initialValues} onFinish={onFinish} layout="vertical">
            <Form.Item name="type" label="Type" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="quantity" label="Quantity" rules={[{ required: true }]}>
                <InputNumber min={0} />
            </Form.Item>
            <Form.Item name="harvestDate" label="Harvest Date" rules={[{ required: true }]}>
                <DatePicker defaultValue={initialValues?.harvestDate ? dayjs(initialValues.harvestDate) : null} />
            </Form.Item>
            <Form.Item name="price" label="Price" rules={[{ required: true }]}>
                <InputNumber min={0} />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">Submit</Button>
            </Form.Item>
        </Form>
    );
};

export default ProductForm;
