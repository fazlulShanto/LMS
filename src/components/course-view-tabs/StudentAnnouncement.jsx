/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useEffect, useState } from 'react';

function StudentAnnouncement({ cid }) {
    const [announcement, setAnnounce] = useState(null);
    useEffect(() => {
        const data = JSON.stringify({
            cid,
        });
        const config = {
            method: 'get',
            url: 'http://localhost:3003/api/course/announcement',
            headers: {
                'Content-Type': 'application/json',
                cid,
            },
        };
        axios(config)
            .then((response) => {
                setAnnounce(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [cid]);
    return (
        <div>
            {announcement && (
                <div className="announcement-list-div">
                    {announcement.map((v) => (
                        <div className="single-announcement" key={v.id}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <h5>Posted on: {v.date}</h5>
                            </div>
                            <hr />
                            <span style={{ whiteSpace: 'pre-wrap' }}>{v.post}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default StudentAnnouncement;
