## Postgresql timezone 변경

```
환경변수

PGTZ=Asia/Seoul
```

## 주소 -> 좌표 변환 api

GCP의 geolocoding api 사용

- 대시보드

  - https://console.cloud.google.com/
  - API Key 생성
    - API 및 서비스
    - 사용자 인증 정보
    - API 생성

- Geocoding API 사용
  - Get 방식 호출
    - https://maps.googleapis.com/maps/api/geocode/json?address=주소값&key=API_KEY
    - 주의점
      - 주소값의 경우, 띄어쓰기를 '+'로 대체 해줘야 함
      - 주소값의 경우, 한글이라면 encodeURI 함수를 통해 변환시켜야 함

## EC2 배포 준비

- 인스턴스 탄력적 ip 설정

  - https://artiiicy.tistory.com/17

- MobaX 설정
  - https://minjii-ya.tistory.com/23

## EC2 Docker 구성

- Docker 설치

  - ref: https://docs.aws.amazon.com/ko_kr/AmazonECS/latest/developerguide/docker-basics.html

- Docker-compose 설치
  - $ sudo curl -L "https://github.com/docker/compose/releases/download/1.26.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
  - $ sudo chmod +x /usr/local/bin/docker-compose
  - $ docker-compose --version

## EC2 Nodejs 구성(nvm, npm ...)

- ref: https://docs.aws.amazon.com/ko_kr/sdk-for-javascript/v2/developer-guide/setting-up-node-on-ec2-instance.html

- npm 버전 변경
  - $ npm install -g npm@4.6.1
