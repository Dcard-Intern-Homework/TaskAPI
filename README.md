# Github Task API

This project uses Github Issue API and Github search API, as well as Github Authentication, to assist users and teams in managing repo issues. The following functions are available:

- Create an issue: Users can create an issue by providing a title, body, and label through this app.
- Edit an issue: Users can change the title, body, and label through this app.
- Search for an issue: Users can search for a specific title or body through this app.
- Delete an issue: Users can delete an issue through this app.

## Installation

To install and run the project, follow these instructions:

1. Clone the repository:

git clone https://github.com/Dcard-Intern-Homework/TaskAPI.git
cd TaskAPI

2. Start the frontend:
```
cd client
npm install
npm start
```
3. Start the backend:
```
cd server
npm install
```
Before starting the server, create a `.env` file in the `./server` directory and enter the following information:

```json
CLIENT_ID = <YOUR CLIENT ID>
CLIENT_SECRET = <YOU SERVER ID>
```
4. Create a fine-grained personal access token for the repository you want to edit: https://github.com/settings/developers. After creating the token, create a .env file in the ./server directory and enter the following information:
```json
API_TOKEN = <YOUR API TOKEN>
```
5. Start the server:
```json
npm start
```