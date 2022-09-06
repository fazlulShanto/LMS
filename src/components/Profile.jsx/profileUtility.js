/* eslint-disable default-param-last */
/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
import axios from 'axios';

const postUrl = `http://localhost:3003/api/user`;

export function updateUserInfo(userId = 3, data) {
    const config = {
        method: 'post',

        url: `${postUrl}/set/${userId}`,
        headers: { ...data },
    };

    axios(config)
        .then((response) => {
            console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
            console.log(error);
        });
}
