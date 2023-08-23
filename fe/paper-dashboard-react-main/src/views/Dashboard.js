import React from "react";
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
// core components
import {
  dashboard24HoursPerformanceChart,
} from "variables/charts.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLightbulb } from "@fortawesome/free-solid-svg-icons";
import "assets/css/light-buld.css";

function Dashboard(props) {
  const [isLightOn, setIsLightOn] = useState(false);
  const [imageSrc, setImageSrc] = useState("");
  const [textClass, setTextClass] = useState("");
  const [humidity, setHumidity] = useState(70);
  const [humidityColor, setHumidityColor] = useState("#00ff00");
  const [lux, setLux] = useState(400);

  let temperature = 35;
  useEffect(() => {
    if (temperature < 10) {
      setImageSrc(require("../assets/img/cold.png"));
      setTextClass("cold-text cold-effect");
    } else if (temperature >= 10 && temperature <= 30) {
      setImageSrc(require("../assets/img/thermometer.png"));
      setTextClass("normal-text normal-effect");
    } else {
      setImageSrc(require("../assets/img/hot.png"));
      setTextClass("hot-text hot-effect");
    }
  }, [temperature])
  const calculateHumidityColor = (humidity) => {
    const hue = (humidity*2.4);
    return `hsl(${hue}, 100%, 50%)`;
  };
  const calculateLightColor = (lux) => {
    const hue = (30 + (lux * 0.9));
    return `hsl(${hue}, 100%, 50%)`;
  };

  useEffect(() => {
    setHumidityColor(calculateHumidityColor(humidity));
  }, [humidity]);

  return (
    <>
      <div className="" style={{ background: `linear-gradient(to right, ${props.startColor}, ${props.endColor})` }}>

        <div className="content">
          <Row>
            <Col lg="4" md="4" sm="4">
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
                        <CardTitle tag="p" className={textClass}>{temperature}°C</CardTitle>
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
            <Col lg="4" md="4" sm="4">
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
            <Col lg="4" md="4" sm="4">
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
            <Col md="10">
              <Card>
                <CardHeader>
                  <CardTitle tag="h5">Users Behavior</CardTitle>
                  <p className="card-category">24 Hours performance</p>
                </CardHeader>
                <CardBody>
                  <Line
                    data={dashboard24HoursPerformanceChart.data}
                    options={dashboard24HoursPerformanceChart.options}
                    width={400}
                    height={130}
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
            <Col md="2" className="d-flex flex-column align-items-center justify-content-center">
              <Card className="card-stats mb-5">
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-favourite-28 text-primary" />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers">
                        <p className="card-category">Followers</p>
                        <CardTitle tag="p">+45K</CardTitle>
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
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="12">
                      <div className="d-flex justify-content-center">
                        <p className="card-category">LED 2</p>
                        {/* <CardTitle tag="p">2</CardTitle> */}
                        <p />
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12" xs="5">
                      <div className="icon-big text-center icon-warning">
                        <FontAwesomeIcon
                          icon={faLightbulb}
                          className={`lightbulb ${isLightOn ? "on" : ""}`}
                          onClick={() => setIsLightOn(prevState => !prevState)}
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
            </Col>
          </Row>

        </div>
      </div>

    </>
  );
}

export default Dashboard;