FROM python:3.7
ENV PYTHONUNBUFFERED 1
WORKDIR /usr/apps/
COPY ./requirements.txt ./requirements.txt
RUN pip install --no-cache-dir -r ./requirements.txt
COPY ./start.sh ./start.sh
RUN chmod +x ./start.sh
CMD ./start.sh
COPY . .

