import { Col, Row } from 'antd';
import '../../app.css';
import Coursecard from '../../components/course-card/Coursecard';
import DefaultLayout from '../../components/DefaultLayout';
import Greetings from '../../components/Greetings/Greetings';
import Todo from '../../components/todo/Todo';

function Dashboard() {
    return (
        <DefaultLayout>
            <Row gutter={[0, 8]}>
                <Col span={12} style={{ marginBottom: '8px' }}>
                    <Greetings userName="User" />
                    <Coursecard days={[1, 2, 3]} />
                </Col>
                <Col span={12}>
                    <Todo userId={3} />
                </Col>
            </Row>
            <Row gutter={[0, 8]}>
                <Col span={12}>
                    <Coursecard days={[1, 2, 3]} />
                </Col>
                <Col span={12}>
                    <Coursecard days={[1, 2, 3]} />
                </Col>
                <Col span={12}>
                    <Coursecard days={[1, 2, 3]} />
                </Col>
                <Col span={12}>
                    <Coursecard days={[1, 2, 3]} />
                </Col>
            </Row>
        </DefaultLayout>
    );
}

export default Dashboard;
