```
Setup Project below are the steps

git clone https://github.com/Ashish140501/school-software.git

create .env file in the root of the project

copy below details in .env file

DB_USER="postgres"
DB_PWD="123456"
DB_NAME="database_development"
DB_HOST="127.0.0.1"
DB_PORT="5432"
APP_PORT="5000"

JWT_SECRET="my-32-character-ultra-secure-and-ultra-long-secret"
TOKEN_PREFIX="Bearer "      

AWS_S3_ACCESS_KEY=""
AWS_S3_SECRET_KEY=""
AWS_S3_BUCKET_NAME=""
AWS_S3_BUCKET_IMG_URL=""

```

```
For installing packages please run below command

npm install
```

```
For database migrations

npm run migrate
```

```
For data seeding

npm run seed
```

```
To run development server

npm start
```
