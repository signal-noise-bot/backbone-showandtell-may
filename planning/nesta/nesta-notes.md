// Make new loop

Pictures instead of video??
Show staging site auto thingy

# What is it
- Interactive installation made up of 2 parts, big visualisation and ipad web app

# Big Visualisation 
- Made using backbone and pixie.js
- Entirely data driven meaning it could carry on after crashing, not only reason......
- Connected to server via web sockets
- Websockets kept 3 collections in sync

# Backend
- Built using node.js, hapi and mongoose (mongoDB)
- Used mongoDB because it makes it easy to aggregate. Means you are not tied down to schema
- Each mongoose model had a number of custom methods for fetching data and endpoints to return these over websockets

# iPad App
- Simple animations
- Touch events
- Spent twice as much time on ipad app than visualisation
- Tried to ensure the was experience nice and easy, visual dealt with itself

# Y ajax?
- Backbones current native methods use ajax
- Easy to set up backed end to handle the difference request types. DELETE PUT
- Intention was to override backbone sync function which was prototyped but due lack of time didnt use (show??)