#include <Wire.h>
#include <ESP8266WiFi.h>               
#include <PubSubClient.h>
#include "DHT.h"             
#include <vector>
#define DHTPIN 2
#define LEDPIN 14
#define R_PIN 0
#define G_PIN 4
#define B_PIN 5
#define DHTTYPE DHT11
#define PHOTOPIN A0
DHT dht(DHTPIN, DHTTYPE);

const char* wifi_ssid = "hnáht";
const char* wifi_password = "thethanh";
const char* mqtt_server = "192.168.8.90";
const char* topic = "dht11";
const char* ledTopic = "Led";
const char* RGBTopic = "LedRGB";
const int MIN_ANALOG = 1023;
const int MAX_ANALOG = 0;
const int DEFAULT_COLOR  = 0;
int R = 255;
int G = 0;
int B = 255;

WiFiClient espClient;
PubSubClient client(espClient);


void callback(char *topic, byte *payload, unsigned int length) {
    Serial.print("Message arrived in topic: ");
    Serial.print(topic);
    Serial.print("Message: ");
    String message;
    for (int i = 0; i < length; i++) {
        message += (char) payload[i];
    }
    Serial.print(message);
    if (String(topic) == ledTopic){
      Serial.println("led thuong");
      if (message == "on") {
          digitalWrite(LEDPIN, HIGH);
      } else if (message == "off") {
          digitalWrite(LEDPIN, LOW);
      } 
    }
    else {
      Serial.println("led RGB");
      if(message == "on"){
        analogWrite(R_PIN, 0);
        analogWrite(G_PIN, 255);
        analogWrite(B_PIN, 0);
      }
      else if(message == "off"){
        analogWrite(R_PIN, 255);
        analogWrite(G_PIN, 255);
        analogWrite(B_PIN, 255);
      }
      else{
        std::vector<int> a;
        String p;
        int pos = 0;
        int end = message.length();

        while (pos < end) {
            int commaIndex = message.indexOf(",", pos);
            if (commaIndex == -1) {
                commaIndex = end;
            }

            p = message.substring(pos, commaIndex);
            Serial.println(p);

            int num = 0;
            for (int i = 0; i < p.length(); i++) {
                if (isdigit(p[i])) {
                    num = num * 10 + (p[i] - '0');
                }
            }
            a.push_back(255 - num);

            pos = commaIndex + 1;
        }

        Serial.println(a[0]);
        Serial.println(a[1]);
        Serial.println(a[2]);
        analogWrite(R_PIN,a[0]);
        analogWrite(G_PIN,a[1]);
        analogWrite(B_PIN,a[2]);
      }
      
    }
    Serial.println("-----------------------");
}

void setup() {
  Serial.begin(9600);
  setup_wifi();
  pinMode(R_PIN, OUTPUT);
  pinMode(G_PIN, OUTPUT);
  pinMode(B_PIN, OUTPUT);
  pinMode(LEDPIN, OUTPUT);
  analogWrite(R_PIN, 255);
  analogWrite(G_PIN, 255);
  analogWrite(B_PIN, 255);
  digitalWrite(LEDPIN, LOW);
  client.setServer(mqtt_server, 1883);
  client.setCallback(callback);
  client.subscribe(ledTopic);
  client.subscribe(RGBTopic);
}
unsigned long previousMillis = 0;
const long interval = 2000;
void loop() {
  if (!client.connected()) {
    reconnect();
  }
  client.loop();
  unsigned long currentMillis = millis();
  if (currentMillis - previousMillis >= interval) {
    float h = dht.readHumidity();
    float t = dht.readTemperature();
    int analog_value = analogRead(PHOTOPIN);
    int a = random(0,20);
    Serial.println(a);
    if (!isnan(h) && !isnan(t)) {
      char temp[100];
      snprintf(temp, sizeof(temp), "{\"temperature\": %.2f, \"humidity\": %.2f, \"light\": %d, \"bui\": %d}", t, h, analog_value,a);
      Serial.println(temp);
      client.publish(topic, temp);
    } else {
      Serial.println("Failed to read from DHT sensor!");
    }
    previousMillis = currentMillis;
  }
}

void setup_wifi() {
  delay(10);
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(wifi_ssid);

  WiFi.begin(wifi_ssid, wifi_password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}

void reconnect() {
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    
    if (client.connect("ESP8266Client")) {
      Serial.println("connected");
      client.subscribe(ledTopic);
      client.subscribe(RGBTopic);
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      delay(5000);
    }
  }
}