import time
import random
from kafka import KafkaProducer

# Define function to generate mock sensor data
def generate_sensor_data():
    sensor_data = {
        "temperature": round(random.uniform(20, 30), 2),
        "humidity": round(random.uniform(40, 60), 2),
        "pressure": round(random.uniform(1000, 1010), 2)
    }
    return sensor_data

def connect_to_kafka():
    _producer = None
    try:
        _producer = KafkaProducer(bootstrap_servers=["localhost:9092"])
    except Exception as ex:
        print("Error while connecting to Kafka")
        print(str(ex))
    finally:
        return _producer

# Define function to publish sensor data to Kafka
def publish_alert(sensor_data, producer):
    producer.send("alert", value=sensor_data)
    producer.send()


if __name__ == "__main__":
    print("Running Sensor Data Generator")
    print("Press Ctrl + C to terminate program")
    print("-------------------------------")
    # Continuously generate mock sensor data and publish it to Kafka
    while True:
        sensor_data = generate_sensor_data()
        producer = connect_to_kafka()
        if producer is not None:
            publish_alert(sensor_data, producer)
        time.sleep(1)
