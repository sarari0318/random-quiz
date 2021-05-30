FROM python:3.8-alpine

WORKDIR /random-quiz/backend

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN apk update \
    && apk add --virtual build-deps gcc python3-dev musl-dev \
    && apk add postgresql-dev \
    && pip install psycopg2 \
    && apk del build-deps

RUN pip install --upgrade pip \
    && pip install pipenv

COPY ./Pipfile /random-quiz/backend/Pipfile

RUN pipenv install --skip-lock --system --dev

COPY ./entrypoint.sh /random-quiz/backend/entrypoint.sh

COPY . /random-quiz/backend

ENTRYPOINT ["/random-quiz/backend/entrypoint.sh"]