# NASA-Asteroid-API

# Description
THis is a project which uses the NASA NeoWs (Near Earth Object Web Service) API to fetch data on the nearest asteroids close to earth. The visualization is a simplification with perfect cirular paths but pulls real data of distance, velocity and size of the asteroids. 

All distances, velocities and sizes of objects are to scale since they are based on real data however paths and distances inbetween asteroids are not 

# Note
This project is currently under development and some functionallity is still to be finished:
 
- Scaling or "zooming" in the canvas must be done manually through: 

    `let sizeRel = 2000;` try with 10000 or 100000

- The project will show more information about each asteroid when the mouse hovers over it
