import { Col, Row } from 'antd';
import React from 'react';

function ViewStudentProfile({ data }) {
    const raw = JSON.parse(data);
    // console.log(raw);
    const labelData = [];

    labelData.push({ label: 'Name', value: `${raw.firstname} ${raw.lastname}` });
    labelData.push({ label: 'Email', value: `${raw.email}` });
    labelData.push({ label: 'Student ID', value: `${raw.student_id}` });
    labelData.push({ label: 'Session', value: `${raw.session}` });
    labelData.push({ label: 'Hall', value: `${raw.hall}` });
    labelData.push({ label: 'Phone', value: `${raw.phone}` });
    labelData.push({ label: 'Blood Group', value: `${raw.bloodgroup}` });
    labelData.push({ label: 'Permanent Address', value: `${raw.permanentaddr}` });
    labelData.push({ label: 'Facebook', value: `${raw.fblink}` });
    labelData.push({ label: 'github', value: `${raw.githublink}` });
    labelData.push({ label: 'Bio', value: `${raw.bio}` });

    // labelData.push({ label: 'Role', value: `${Object.keys(raw.roles).shift()}` });

    return (
        <div>
            <div className="profile_photo_div">
                <img
                    src={`http://localhost:3003/users/${raw.user_uuid}.png`}
                    alt=""
                    className="profile_photo"
                />
            </div>
            <div className="profile-details-div">
                {labelData.map((v) => (
                    <Row key={Math.random()} gutter={[8, 16]}>
                        <Col className="profile-details-label" span={10}>
                            {v.label}:
                        </Col>
                        <Col className="profile-details-value" span={12}>
                            {v.value}
                        </Col>
                    </Row>
                ))}
            </div>
        </div>
    );
}

export default ViewStudentProfile;
