---
title: 🖥️ An algorithm for the people, controlled by the people (part 1)
author: Patrick Prunty
date: 2023-09-03
template: article.pug
---

A novel approach to user content recommendation systems which opens a two-way communication channel (web-socket) between the user and
recommendation algorithm, via a content filter configuration system on the frontend.

---

<div class="article-image-container">
  <div class="article-image">
    <img src="https://pprunty.github.io/pprunty/assets/images/articles/algorithm-for-the-people/user.png" alt="rapper">
  </div>
</div>

<div class="drop-cap">W</div><p>hen you consider the mobile and web applications you use today, nearly all of them use
recommendation systems as a vehicle to enhance user engagement.
</p>

TikTok, is notably leading this race in terms of recommendation. Their vertical scrolling mechanism is so addictive,
people have coined the term doomscrolling to refer to the feeling of impending doom, or anxiety associated with spending
an excessive amount of time scrolling through social media and contracting social media envy or a fear of missing out 
(F.O.M.O).

Additionally, companies like Instagram, YouTube and more recently, Amazon (through Amazon's Inspire, to be released
in …) have all jumped on the bandwagon and have included vertical scrolling as a feature in their product.

UI/UX Design and prototyping using Figma
Entity Relationship Diagrams
Web-socket development using Python FastAPI
iOS and Android mobile application development using React Native (with Redux)
Deep Learning neural networks using Python libraries such as Tensorflow 2, Keras, Surprise and Pandas
C++ interoperability using Boost.Python
Parallel programming using Python's standard library

1. UX/UI Desing
2. Web-socket development using Python FastAPI




I do not want to see spoilers, i want to control the content being recommended to me by the algorithm and let it naturally 
change, but always be configurable.

ORGANIC 



... how it can help TikTok (advertisements become targeted and more appropriate - likely to consider an add which advertises
football boots when i set the content configuration label "Football" above, say, 70%)


```python
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from pydantic import BaseModel, ValidationError
import json

app = FastAPI()

# Combine handlers and models into a single dictionary (key: request_type, value: (model, handler))
EVENT_HANDLERS = {
    "LATENT_TRACKED_ENGAGEMENT_EVENT": (UserTrackedEngagementRequest, handle_user_engagement_tracker),
    "LATENT_TRACKED_GEO_EVENT": (UserTrackedGeoRequest, handle_user_geo_tracker),
    "EXPLICIT_FILTER_CONFIGURATION": (UserFilterConfigurationRequest, handle_filter_configuration),
    "EXPLICIT_RATING_EVENT": (UserItemRatingRequest, handle_user_rating),
    "EXPLICIT_FEEDBACK_EVENT": (UserItemFeedbackRequest, handle_user_feedback),
    "NEW_RECOMMENDATIONS": (UserRecommendationRequest, handle_user_recommendation)
}


async def handle_request(websocket: WebSocket):
    try:
        data = await websocket.receive_text()
        message = json.loads(data)
        request_type = message["type"]
        handler_model, _ = EVENT_HANDLERS.get(request_type, (None, None))

        if handler_model:
            request_object = handler_model(**message["data"])
            return request_type, request_object
    except json.JSONDecodeError:
        await websocket.send_text("Error: Invalid JSON format")
        return None, None
    except ValidationError as e:
        await websocket.send_text(f"Error: {str(e)}")
        return None, None
    except WebSocketDisconnect:
        pass
    return None, None


async def dispatch_request(websocket: WebSocket, request_type, request_object):
    _, handler = EVENT_HANDLERS.get(request_type, (None, None))
    if handler:
        await handler(websocket=websocket, request=request_object)
    else:
        await websocket.send_text("Error: Invalid request type")


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            request_type, request_object = await handle_request(websocket)
            if request_type:
                await dispatch_request(websocket, request_type, request_object)
    except WebSocketDisconnect:
        # Handle client disconnection here, e.g., by logging or cleaning up resources
        print("Client disconnected")
```
