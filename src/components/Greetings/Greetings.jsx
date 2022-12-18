/* eslint-disable no-unused-vars */
import { Spin } from 'antd';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../Context/AuthContext';

import './greetings.css';

const apiLink = `https://fosholi.com/idss_api//home/notifications?upazila_id=280&union_id=2918`;
/*
    fosholi link : 
    https://fosholi.com/idss_api//home/notifications?upazila_id=280&union_id=2918
*/
export default function Greetings() {
    const { userName } = useContext(AuthContext);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    // eslint-disable-next-line no-unused-vars
    const [weather, setWeather] = useState([]);
    const [loading, setLoading] = useState(true);
    const getWeatherInfo = () => {
        axios
            .get(apiLink)
            .then((res) => {
                // console.log(res.data.data);
                const weatherInfoObj = {
                    humidity: res.data.data.todaysWeatherInfo.humidity,
                    temp: res.data.data.todaysWeatherInfo.max_temp,
                    wind_speed: res.data.data.todaysWeatherInfo.wind_speed,
                    rain_probability: res.data.data.todaysWeatherInfo.rain_probability,
                };
                setLoading(false);
                setWeather(weatherInfoObj);
            })
            .catch((er) => {
                const weatherInfoObj = {
                    humidity: 0,
                    temp: 0,
                    wind_speed: 0,
                    rain_probability: 0,
                };
                setLoading(false);
                setWeather(weatherInfoObj);
            });
    };
    useEffect(() => {
        getWeatherInfo();
    }, []);
    // getWeatherInfo();
    return (
        <Spin spinning={loading}>
            <div className="greetings-container">
                <h1>Hello , {userName}!</h1>
                <span>Today is {new Date().toLocaleDateString('en-US', options)}</span>
                <br />
                <ul className="weather-data">
                    <li>Temperature {Math.round(weather.temp)}°C</li>
                    <li>Humidity {Math.round(weather.humidity)}%</li>
                    <li>wind Speed {weather.wind_speed}</li>
                    <li>Rain Probability {Math.round(weather.rain_probability * 100)}%</li>
                </ul>
            </div>
        </Spin>
    );
}
