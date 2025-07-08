#include <WiFi.h>
#include <PubSubClient.h>

const char* ssid       = "";
const char* password   = "";

const char* mqttServer = "";
const int   mqttPort   = "";
const char* mqttUser   = "";              
const char* mqttPassword = ""; 

WiFiClient espClient;
PubSubClient client(espClient);

const int LED_PIN = 2;

void callback(char* topic, byte* payload, unsigned int length) {
  String msg;
  for (int i = 0; i < length; i++) {
    msg += (char)payload[i];
  }

  Serial.println("========== NOVA MENSAGEM RECEBIDA ==========");
  Serial.print("Tópico: ");
  Serial.println(topic);
  Serial.print("Conteúdo: ");
  Serial.println(msg);
  Serial.println("===============================================");


  if (String(topic) == "esp32/commands") {
    if (msg == "led_on") {
      digitalWrite(LED_PIN, HIGH);
      Serial.println("LED LIGADO");
    } else if (msg == "led_off") {
      digitalWrite(LED_PIN, LOW);
      Serial.println("LED DESLIGADO");
    }
  }
}


void reconnect() {
  while (!client.connected()) {
    Serial.print("Tentando conexão MQTT...");
    if (client.connect("ESP32Client", mqttUser, mqttPassword)) {
      Serial.println("Conectado ao broker MQTT!");
      client.subscribe("esp32/commands");
    } else {
      Serial.print("Falha na conexão, rc=");
      Serial.print(client.state());
      Serial.println(" | Tentando novamente em 5 segundos...");
      delay(5000);
    }
  }
}

void setup() {
  pinMode(LED_PIN, OUTPUT);
  Serial.begin(115200);

  WiFi.begin(ssid, password);
  Serial.print("Conectando ao Wi-Fi");

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("\nWi-Fi conectado com sucesso!");
  Serial.print("IP local: ");
  Serial.println(WiFi.localIP());

  client.setServer(mqttServer, mqttPort);
  client.setCallback(callback);
}

void loop() {
  if (!client.connected()) {
    reconnect();
  }
  client.loop();
}
