FROM python:3.7
ENV PYTHONUNBUFFERED 1
WORKDIR /usr/src/disp
COPY . .
RUN pip install --no-cache-dir -r ../disp/requirements.txt
RUN chmod +x ./start.sh
CMD ./start.sh
