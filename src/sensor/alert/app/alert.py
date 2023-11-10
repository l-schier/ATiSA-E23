import time
import random
from confluent_kafka import Producer
from confluent_kafka.admin import AdminClient, NewTopic

# Define function to generate mock sensor data
def generate_sensor_data():
    sensor_data = {
        "temperature": round(random.uniform(20, 30), 2),
        "humidity": round(random.uniform(40, 60), 2),
        "pressure": round(random.uniform(1000, 1010), 2)
    }
    return sensor_data

'''def connect_to_kafka():
    _producer = None
    try:
        _producer = 
    except Exception as ex:
        print("Error while connecting to Kafka")
        print(str(ex))
    finally:
        return _producer'''

# Define function to publish sensor data to Kafka
def publish_alert(sensor_data, producer):
    producer.produce("alert", key="temperature", value=str(sensor_data["temperature"]))
    producer.flush()
    producer.produce("alert", key="humidity", value=str(sensor_data["humidity"]))
    producer.flush()
    producer.produce("alert", key="pressure", value=str(sensor_data["pressure"]))
    producer.flush()
    #producer.send()

def startup(admin):
    new_topic = NewTopic("alert", num_partitions=1, replication_factor=1)
    x = admin.create_topics([new_topic])
    for topic, t in x.items():
        try:
            t.result()
            print(f"Topic {topic} created")
            return True
        except Exception as e:
            print(f"Failed to create topic {topic}: {e}")
            return False
    

if __name__ == "__main__":
    # Create Kafka producer
    print("Running Sensor Data Generator")
    print("Press Ctrl + C to terminate program")
    print("-------------------------------")
    print("Wait for Kafka to be up and running")
    time.sleep(15)
    print("Create admin and producer")
    admin = AdminClient({"bootstrap.servers": "kafka:19092"})
    producer = Producer({'bootstrap.servers': 'kafka:19092'})
    startup(admin)
    # Continuously generate mock sensor data and publish it to Kafka
    while True:
        print("Generating sensor data")
        sensor_data = generate_sensor_data()
        if sensor_data["temperature"] > 25 or sensor_data["humidity"] > 45 or sensor_data["pressure"] > 1005:
            print("Alert: Temperature, Humidity or Pressure is above threshold")
            #producer = connect_to_kafka()
            if producer is not None:
                publish_alert(sensor_data, producer)
        time.sleep(5)
