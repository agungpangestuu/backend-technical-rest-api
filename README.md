# Backend Test 
Demo basic REST API.

## REST API  

list news of filter routes :

| Route | HTTP | Description |
|--------|------|-------------|
| /api/news | POST | Create a News |
| /api/news | GET | Get all the News  |
| /api/news/:id | GET | Get a single News  |
| /api/news/:id | DELETE |  Delete a News  |
| /api/news/:id | PUT | Update a News with new info |
| /api/news/?status=publish | GET | get all News with status info (publish,delete, draft) |
| /api/news/?topic=(topicid) | GET | filter News with topic id  |

list topic of filter routes :

| Route | HTTP | Description |
|--------|------|-------------|
| /api/topic | POST | Create a topic |
| /api/topic | GET | Get all the topic  |
| /api/topic/:id | GET | Get a single topic  |
| /api/topic/:id | DELETE |  Delete a topic  |
| /api/topic/:id | PUT | Update a topic with new info |

## Usage

With only npm :
```
npm install
npm start
npm run dev
```
Access the website via `http://localhost:3000` or `https://rest-api.pangestu.tech`

## Usage Api

to create News :

data must be require 
```
curl -X POST -H 'Content-Type: application/json' -d '{"image":"http://testImage.com","title":"test title","deskripsi": "lorem ipsum", "status": "publish"}' http://rest-api.pangestu.tech:3000
```
if you want to insert tag or topic you must be include it in form 

```
curl -X POST -H 'Content-Type: application/json' -d '{"image":"http://testImage.com","title":"test title","deskripsi": "lorem ipsum", "status": "publish", "topicId": ["5aa1400579edf145f843b640", "5aa14048609f0246423d0282"]}' http://rest-api.pangestu.tech:3000

```