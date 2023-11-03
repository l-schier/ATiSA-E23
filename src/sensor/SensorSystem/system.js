const consumer = kafka.consumer({ groupId: 'shieeetDogOkay' })

await consumer.connect()

await consumer.subscribe({ topics: ['topic-A'] })

consumer.on('message', function (message) {
    if (message == "dead") {
        document.getElementById("alertText").innerHTML = "ALERT";
    }
    if (message == "notDead") {
        document.getElementById("alertText").innerHTML = "";
    }
});


//https://kafka.js.org/docs/consuming

//https://kafka.js.org/docs/consumer-example