const mqtt = require('mqtt')
const fs = require('fs')
const path = require('path')
const moment = require('moment')
const mqttHelper = require('./src/helpers/mqtt')

const url = `mqtt://${process.env.MQTT_SERVER}:${process.env.MQTT_PORT}`
const conf = {
    clientId: process.env.MQTT_CLIENT,
    clean: true,
    connectTimeout: 4000,
    username: process.env.MQTT_USERNAME,
    password: process.env.MQTT_PASSWORD,
    reconnectPeriod: 1000,
}

const connect = () => {
    console.log('Connecting to MQTT Server - ' + url);
    const client = mqtt.connect(url, conf);
    const logPath = path.resolve(__dirname, 'mqtt.log')
        
    client.on('connect', () => {
        client.subscribe([process.env.MQTT_TOPIC], () => {
            console.log(`Subscribed to topic '${process.env.MQTT_TOPIC}'`)
            console.log(logPath)
        })
    });

    client.on('message', (topic, payload) => {
        console.log('Received Message:', topic, payload.toString())
        fs.appendFile(logPath, `[${moment().format()}]\n${payload}\n\n`, err => {
            console.log(err)
        });
        mqttHelper.parse(payload);
    });

    return client;
}

module.exports = connect;