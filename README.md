
# Self Driving Car

This is my first project involving AI. While following FCC's guide on making an AI car, I improved upon it by making the program interactive and customizable by the user, whereas it can only be edited in the source code originally.

## Acknowledgements

- _Sourced from freeCodeCamp's [Neural Networks and Machine Learning](https://www.youtube.com/watch?v=Rs_rAxEsAvI&t=8339s) video._

- _Credits to [Dr. Radu Mariescu-Istodor](https://radufromfinland.com) for creating this course!_

## Languages & Tools

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
## Logic & Guide

-   The course creates a neural network that incorporates a basic genetic algorithm. We improve the neural network of the car by trial and error with parallelisation added to speed this process up. Sensors from the front of the car work by ray casting and detect the road barriers and the neighbouring cars using a segment intersection formula.

-   Visit the [Deployed Site](https://v-iinh.github.io/self-driving-car/). The goal is to get the car to navigate past traffic. The vast majority will initially be bugged. If this happens, just refresh the page to try another batch of iterations. If there is a car that does well through the obstacles, you can save it to use this car's neural network as the basis for the next set of cars when you refresh.

## Run Locally

Clone the project

```bash
  git clone https://github.com/v-iinh/self-driving-car.git
```

Go to the Project Directory

```bash
  cd /
```

## Updates

-   Users able to set the number of car iterations.
-   Users able to set how much to mutate the neural network.
-   Local data is displayed and updated live. 
-   User interface for the above made intuitive.
