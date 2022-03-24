import React, { useEffect, useState } from 'react';
 import {Typography} from 'antd';
 const { Title } = Typography;

export function Clock() {
  const [time, setTime] = useState(new Date().toLocaleString());

  useEffect(() => {
    setInterval(
        () => setTime(new Date().toLocaleString()),
        1000
      );
        },[time]);

  return (
    <>
    <Title>{time}</Title>
  </>);
}