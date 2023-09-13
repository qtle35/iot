import React from "react";
import io from "socket.io-client";
// react plugin used to create charts
import { useState, useEffect } from "react";
import { Line, Pie } from "react-chartjs-2";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
} from "reactstrap";
import ReactSwitch from 'react-switch';
// core components
import {
  useDashboard24HoursPerformanceChart,
} from "variables/charts.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
<<<<<<< HEAD
import { faLightbulb } from "@fortawesome/free-regular-svg-icons";
=======
import { faLightbulb, faFan } from "@fortawesome/free-solid-svg-icons";
>>>>>>> 4c7b335ed8ed89353acd2ffd84a9ae441db11cdb
import "assets/css/light-buld.css";
import "assets/css/fixed.css";

function Dashboard(props) {
  const [isLightOn, setIsLightOn] = useState(false);
  const [isFanSpinning, setIsFanSpinning] = useState(false);
  const [imageSrc, setImageSrc] = useState("");
  const [textClass, setTextClass] = useState("");
  const [humidity, setHumidity] = useState(70);
  const [humidityColor, setHumidityColor] = useState("#00ff00");
  const [lux, setLux] = useState(400);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [temperature, setTemperature] = useState(30);
  const [rgbColor, setRgbColor] = useState('#ff00ff');
  const [bui, setBui] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    setImageSrc(require("../assets/img/hot.png"));
    setTextClass("hot-text hot-effect");

    return () => {
      clearInterval(interval);
    };
  }, []);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io("http://localhost:3001");
    setSocket(newSocket);
    return () => {
      newSocket.disconnect();
    };
  }, []);

  const toggleLight = (e) => {
    setIsLightOn(prevState => !prevState);
    if (socket) socket.emit('led', !isLightOn ? 'on' : 'off');
  }
  const formattedDate = currentTime.toLocaleDateString();
  const formattedTime = currentTime.toLocaleTimeString();

  const mqttData = useDashboard24HoursPerformanceChart();
  useEffect(() => {
    if (mqttData.length >= 1) {
      const newTemperature = mqttData[mqttData.length - 1].temperature;
      if (newTemperature < 10) {
        setTemperature(newTemperature);
        setImageSrc(require("../assets/img/cold.png"));
        setTextClass("cold-text cold-effect");
      } else if (newTemperature >= 10 && newTemperature < 30) {
        setTemperature(newTemperature);
        setImageSrc(require("../assets/img/thermometer.png"));
        setTextClass("normal-text normal-effect");
      } else {
        setTemperature(newTemperature);
        setImageSrc(require("../assets/img/hot.png"));
        setTextClass("hot-text hot-effect");
      }
      const newHumidity = mqttData[mqttData.length - 1].humidity;
      setHumidity(newHumidity);
      setHumidityColor(calculateHumidityColor(newHumidity));
      const newLux = mqttData[mqttData.length - 1].light;
      setLux(newLux);
      const newBui = mqttData[mqttData.length - 1].bui;
      setBui(newBui);
    }
<<<<<<< HEAD
  }, [mqttData]);
  const toggleFan = () => {
    setIsFanSpinning(prevState => !prevState);
    if (socket) socket.emit('RGB', !isFanSpinning ? 'on' : 'off');
    if (isFanSpinning){
      setRgbColor('#ff00ff');
    }
  };
  const handleRGB = (e) =>{
    setRgbColor(e.target.value);
    let hex = e.target.value.replace("#", "");
    let red = parseInt(hex.substring(0, 2), 16);
    let green = parseInt(hex.substring(2, 4), 16);
    let blue = parseInt(hex.substring(4, 6), 16);
    socket.emit('RGB',`Red:${red}, G: ${green}, B: ${blue}`);
  }
=======
  }, [temperature])
  const toggleFan = () => {
    setIsFanSpinning(prevState => !prevState);
  };
>>>>>>> 4c7b335ed8ed89353acd2ffd84a9ae441db11cdb
  const calculateHumidityColor = (humidity) => {
    const hue = (humidity * 2.4);
    return `hsl(${hue}, 100%, 50%)`;
  };
  const calculateLightColor = (lux) => {
    const hue = (30 + (lux * 0.9));
    return `hsl(${hue}, 100%, 50%)`;
  };

  useEffect(() => {
    setHumidityColor(calculateHumidityColor(humidity));
  }, [humidity]);
  // console.log(mqttData);
  const dashboard24HoursPerformanceChart = {
    data: (canvas) => {
      return {
        labels: mqttData.map((data) => data.time),
        datasets: [
          {
            label: "Temperature",
            data: mqttData.map((data) => data.temperature),
            fill: false,
            borderColor: "#4acccd",
            backgroundColor: "transparent",
            pointBorderColor: "#4acccd",
            // pointRadius: 4,
            pointHoverRadius: 4,
            // pointBorderWidth: 8,
            tension: 0.4,
          },
          {
            label: "Humidity",
            fill: false,
            borderColor: "#fbc658",
            backgroundColor: "transparent",
            pointBorderColor: "#fbc658",
            // pointRadius: 4,
            pointHoverRadius: 4,
            // pointBorderWidth: 8,
            tension: 0.4,
            data: mqttData.map((data) => data.humidity),
          },
          {
            label: "Light",
            fill: false,
            borderColor: "#d8bfd8",
            backgroundColor: "transparent",
            pointBorderColor: "#d8bfd8",
            // pointRadius: 4,
            pointHoverRadius: 4,
            // pointBorderWidth: 8,
            tension: 0.4,
            data: mqttData.map((data) => data.light),
          },
          {
            label: "Bui",
            fill: false,
            borderColor: "#d8bfd8",
            backgroundColor: "transparent",
            pointBorderColor: "#d8bfd0",
            // pointRadius: 4,
            pointHoverRadius: 4,
            // pointBorderWidth: 8,
            tension: 0.4,
            data: mqttData.map((data) => data.bui),
          },
        ],
      };
    },
    options: {
      reponsive: true,
      interaction: {
        intersect: true,
        mode: 'index'
      },
      plugins: {
        legend: { display: true },
        tooltip: { },
      },
      scales: {
        y: {
          ticks: {
            color: "#9f9f9f",
            beginAtZero: true,
            maxTicksLimit: 5,
          },
          grid: {
            drawBorder: true,
            display: true,
          },
        },
        x: {
          barPercentage: 1.6,
          grid: {
            drawBorder: false,
            display: false,
          },
          ticks: {
            padding: 20,
            color: "#9f9f9f",
          },
        },
      },
    },
  };

  return (
    <>
      <div className="" style={{
        background: `linear-gradient(${props.startColor}, ${props.endColor})`,
      }}>

        <div className="content">
          <h1>{mqttData.humidity}</h1>
          <Row>
<<<<<<< HEAD
            <Col lg="3" md="3" sm="3" xs="12">
=======
            <Col lg="4" md="4" sm="4" xs="4">
>>>>>>> 4c7b335ed8ed89353acd2ffd84a9ae441db11cdb
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="4" xs="5" >
                      <div className="icon-big text-center icon-warning">
                        <img src={require("../assets/img/humidity.gif")} />
                      </div>
                    </Col>
                    <Col md="8" xs="7" className="d-flex justify-content-center">
                      <div className="numbers">
                        <p className={`card-category`}>Bui</p>
                        <CardTitle tag="p" style={{ color: humidityColor }}>{bui}</CardTitle>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="stats">
                    <i className="fas fa-sync-alt" /> Update Now
                  </div>
                </CardFooter>
              </Card>
            </Col>
<<<<<<< HEAD
            <Col lg="3" md="3" sm="3" xs="12">
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-warning">
                        <img src={imageSrc} />
                      </div>
                    </Col>
                    <Col md="8" xs="7" className="d-flex justify-content-center">
                      <div className="numbers">
                        <p className={`card-category ${textClass}`}>Nhiệt Độ</p>
                        <CardTitle tag="p" className={textClass}>
                          {temperature}°C
                        </CardTitle>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="stats">
                    <i className="fas fa-sync-alt" /> Update Now
                  </div>
                </CardFooter>
              </Card>
            </Col>
            <Col lg="3" md="3" sm="3" xs="12">
=======
            <Col lg="4" md="4" sm="4" xs="4">
>>>>>>> 4c7b335ed8ed89353acd2ffd84a9ae441db11cdb
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="4" xs="5" >
                      <div className="icon-big text-center icon-warning">
                        <img src={require("../assets/img/humidity.gif")} />
                      </div>
                    </Col>
                    <Col md="8" xs="7" className="d-flex justify-content-center">
                      <div className="numbers">
                        <p className={`card-category`}>Độ Ẩm</p>
                        <CardTitle tag="p" style={{ color: humidityColor }}>{humidity}%</CardTitle>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="stats">
                    <i className="far fa-calendar" /> Last day
                  </div>
                </CardFooter>
              </Card>
            </Col>
<<<<<<< HEAD
            <Col lg="3" md="3" sm="3" xs="12">
=======
            <Col lg="4" md="4" sm="4" xs="4">
>>>>>>> 4c7b335ed8ed89353acd2ffd84a9ae441db11cdb
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-warning">
                        <img src={require("../assets/img/sun.gif")} />
                      </div>
                    </Col>
                    <Col md="8" xs="7" className="d-flex justify-content-center">
                      <div className="numbers">
                        <p className="card-category">Ánh Sáng</p>
                        <CardTitle tag="p" style={{ color: calculateLightColor(lux) }}>{lux}Lx</CardTitle>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="stats">
                    <i className="fas fa-sync-alt" /> Update now
                  </div>
                </CardFooter>
              </Card>
            </Col>
          </Row>
          <Row >
<<<<<<< HEAD
            <Col lg="10" md="10" xs="12">
=======
            <Col md="10" xs="10">
>>>>>>> 4c7b335ed8ed89353acd2ffd84a9ae441db11cdb
              <Card>
                <CardHeader>
                  <CardTitle tag="h5">Users Behavior</CardTitle>
                  <p className="card-category">24 Hours performance</p>
                </CardHeader>
                <CardBody>
                  <Line
                    data={dashboard24HoursPerformanceChart.data}
                    options={dashboard24HoursPerformanceChart.options}
                    width={80}
                    height={30}
                  />
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="stats">
                    <i className="fa fa-history" /> Updated 3 minutes ago
                  </div>
                </CardFooter>
              </Card>
            </Col>
<<<<<<< HEAD
            <Col lg="2" md="2" xs="8" className="d-flex flex-column align-items-center justify-content-center">
=======
            <Col md="2" xs="2" className="d-flex flex-column align-items-center justify-content-center">
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="12">
                      <div className="d-flex justify-content-center">
                        <p className="card-category">Fan</p>
                        <p />
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <div className="icon-big text-center icon-warning">
                        <FontAwesomeIcon
                          icon={faFan}
                          spin={isFanSpinning}
                          style={{ color: "#405e91" }}
                          className={`fan ${isFanSpinning ? "spin" : ""}`}
                          onClick={toggleFan}
                        />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="stats">
                    <i className="fas fa-sync-alt" /> Update now
                  </div>
                </CardFooter>
              </Card>
>>>>>>> 4c7b335ed8ed89353acd2ffd84a9ae441db11cdb
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="12" xs="12">
                      <div className="d-flex justify-content-center">
<<<<<<< HEAD
                        <p className="card-category">LED RGB</p>
=======
                        <p className="card-category">LED</p>
                        {/* <CardTitle tag="p">2</CardTitle> */}
>>>>>>> 4c7b335ed8ed89353acd2ffd84a9ae441db11cdb
                        <p />
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12" xs="12">
                      <div className="icon-big text-center icon-warning">
                        <FontAwesomeIcon
                          icon={faLightbulb}
                          size="xl"
                          style={{
                            color: rgbColor,
                            filter: isFanSpinning
                              ? `drop-shadow(0 0 3px ${rgbColor}) drop-shadow(0 0 20px ${rgbColor}) drop-shadow(0 0 30px ${rgbColor})`
                              : 'none',
                          }}
                          // className={`lightbulb ${isFanSpinning ? "on" : ""}`}
                        // onClick={toggleFan}
                        />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <hr />
                  <ReactSwitch
                    checked={isFanSpinning}
                    onChange={toggleFan}
                    checkedIcon={false}
                    uncheckedIcon={false}
                    onColor="#86d3ff"
                    onHandleColor="#2693e6"
                    size="xl"
                  />
                  {isFanSpinning && (<input
                    type="color"
                    className="color-picker"
                    value={rgbColor}
                    onChange={(e) => handleRGB(e)}
                  />
                  )}
                </CardFooter>
              </Card>
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="12" xs="12">
                      <div className="d-flex justify-content-center">
                        <p className="card-category">LED</p>
                        <p />
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs="12">
                      <div className="icon-big text-center icon-warning">
                        <FontAwesomeIcon
                          icon={faLightbulb}
                          size="xl"
                          className={`lightbulb ${isLightOn ? "on" : ""}`}
                        // onClick={toggleLight}
                        />

                      </div>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <hr />
                  <ReactSwitch
                    checked={isLightOn}
                    onChange={toggleLight}
                    checkedIcon={false}
                    uncheckedIcon={false}
                    onColor="#86d3ff"
                    onHandleColor="#2693e6"
                    size="xl"
                  />
                </CardFooter>
              </Card>
            </Col>
          </Row>

        </div>
      </div >

    </>
  );
}

export default Dashboard;