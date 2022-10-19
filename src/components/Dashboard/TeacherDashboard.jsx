import { Col, Row } from 'antd';
import '../../app.css';
import useAuth from '../../Hooks/useAuth';
import Coursecard from '../course-card/Coursecard';
import DefaultLayout from '../default-layout/DefaultLayout';
import Greetings from '../Greetings/Greetings';
import Todo from '../todo/Todo';

function TeacherDashboard() {
    const { userUuid } = useAuth();
    return (
        <DefaultLayout>
            <Row gutter={[0, 8]}>
                <Col span={12} style={{ marginBottom: '8px' }}>
                    <Greetings userName="User" />
                    <Coursecard days={[1, 2, 3]} />
                </Col>
                <Col span={12}>
                    <Todo userId={userUuid} />
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

export default TeacherDashboard;
