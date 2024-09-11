# CountrySys

This is an system for showing countries their informations

### Running in Dev Mode

To run this web application you must follow the instructions below:

#### 1. Clone this repo
First, clone this repo:

```bash
git clone https://github.com/victor-renan/nest-next-cities
```
#### 2. Backend

Enter in the `backend` folder and copy the content of the `.env.example` file to a `.env` file. If you're in a Unix Like system, you can run:

```bash
cd backend
cp .env.example >> .env
```

Then, you must set the environment variables with the resticted data. (Don't edit if you want to use the current example environment)

After that, you must install the dependencies and run the server:

```
npm install
npm run start:dev
```

#### 3. Frontend

Enter in the `frontend` folder, and copy the content of the `.env.example` file to a `.env.local` file. If you're in a Unix Like system, you can run:

```bash
cd frontend
cp .env.example >> .env.local
```

Then, you must set the **NEXT_PUBLIC_BACKEND_URL** to the URL based on the port that relies on `backend/.env`, for example, if the port of `.env` is 3002, the **NEXT_PUBLIC_BACKEND_URL** will be `http://localhost:3002`. (Don't edit if you want to use the current example environment)

At last, run the frontend with:

```bash
npm install
npm run dev
```

