import { useState, useEffect } from "react";
import io from "socket.io-client";
import { format } from 'date-fns';

export function useDashboard24HoursPerformanceChart() {
  const [mqttData, setMqttData] = useState([]);

  useEffect(() => {
    const socket = io("http://localhost:3001");

    socket.on('data', (data) => {
      const jsonData = JSON.parse(data);
      jsonData.time = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
      setMqttData((prevData) => {
        if (prevData.length >= 10) {
          prevData.splice(0, 1);
        }
        return [...prevData, jsonData];
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return mqttData;
}
