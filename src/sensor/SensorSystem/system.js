"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const kafkajs_1 = require("kafkajs");
const kafka = new kafkajs_1.Kafka({
    clientId: 'sensor-consumer',
    brokers: ['kafka:19092'],
});
const consumer = kafka.consumer({ groupId: 'sensor-group' });
const handleMessage = ({ topic, partition, message }) => __awaiter(void 0, void 0, void 0, function* () {
    if (topic === 'alert') {
        //(document.getElementById('alertText') as HTMLParagraphElement).textContent = "ALERT";
        console.log(message);
    } //else {
    //(document.getElementById('alertText') as HTMLParagraphElement).textContent = "";}
    yield consumer.commitOffsets([{ topic, partition, offset: message.offset }]);
});
const runConsumer = () => __awaiter(void 0, void 0, void 0, function* () {
    yield consumer.connect();
    yield consumer.subscribe({ topic: 'alert' });
    yield consumer.run({
        eachMessage: handleMessage,
    });
});
runConsumer()
    .then(() => {
    console.log('Consumer is running...');
})
    .catch((error) => {
    console.error('Failed to run kafka consumer', error);
});
