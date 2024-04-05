# Starting with Ubuntu
FROM ubuntu:latest

# Install Python, pip, FFmpeg, and libsndfile1 in one RUN to make the build cleaner
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    ffmpeg \
    libsndfile1 \
 && rm -rf /var/lib/apt/lists/*

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . .

# Install any needed packages specified in requirements.txt
RUN pip3 install --no-cache-dir -r requirements.txt

# Expose the port Flask runs on
EXPOSE 8000

# Command to run the Flask app
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "--timeout", "1800", "--workers", "2", "--worker-class", "gevent", "app:app"]



