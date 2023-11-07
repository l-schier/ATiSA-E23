# Use an official Python runtime as a parent image
FROM python:3.9-slim-buster

# Copy the current directory contents into the container at /app
COPY ./app .

# Install any needed packages specified in requirements.txt
#RUN apt-get update \
#    && apt-get install python3-pip -y
RUN pip install -r requirements.txt
# Run app.py when the container launches
CMD ["python", "alert.py"]
