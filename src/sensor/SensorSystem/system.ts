import { type EachMessagePayload, Kafka, Consumer } from 'kafkajs';

const kafka = new Kafka({
    clientId: 'sensor-consumer',
    brokers: ['kafka:19092'],
});

const consumer: Consumer = kafka.consumer({ groupId: 'sensor-group', sessionTimeout: 5500, heartbeatInterval: 100 });

const handleMessage = async ({ topic, partition, message }: EachMessagePayload): Promise<void> => {
    if (topic === 'alert') {
        //(document.getElementById('alertText') as HTMLParagraphElement).textContent = "ALERT";
        console.log(`Key: ${message.key} Value: ${message.value}`);
    } //else {
    //(document.getElementById('alertText') as HTMLParagraphElement).textContent = "";}

    await consumer.commitOffsets([{ topic, partition, offset: message.offset }]);
};

const runConsumer = async (): Promise<void> => {
    await consumer.connect();
    await consumer.subscribe({ topic: 'alert' });

    await consumer.run({
        eachMessage: handleMessage,
    });
};

runConsumer()
    .then(() => {
        console.log('Consumer is running...');
    })
    .catch((error) => {
        console.error('Failed to run kafka consumer', error);
    });