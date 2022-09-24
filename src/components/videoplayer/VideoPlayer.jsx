/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable no-unused-vars */
import React from 'react';

// Render a YouTube video player

function VideoPlayer({ videoSource }) {
    return (
        <div className="course-video-player">
            <video height="320px" controls>
                <source src={videoSource} type="video/mp4" />
                <source src={videoSource} type="video/ogg" />
                <source src={videoSource} type="video/webm" />
                unplayable Content.
            </video>
        </div>
    );
}

export default VideoPlayer;
