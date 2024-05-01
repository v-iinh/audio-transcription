const carCanvas=document.getElementById("carCanvas");
carCanvas.width=200;
const carCtx = carCanvas.getContext("2d"); 
const road = new Road(carCanvas.width/2, carCanvas.width*0.9); 

let N = parseInt(localStorage.getItem("numberOfCars")) || 200;
function addCars() {
    N += 100;
    if (N >= 100) {
        N = Math.round(N / 100) * 100;
    }
    localStorage.setItem("numberOfCars", N.toString());
    resetSimulation();
}

function removeCars() {
    N = Math.max(1, N - 100);
    localStorage.setItem("numberOfCars", N.toString());
    resetSimulation();
}

function resetSimulation() {
    cars.length = 0;
    bestCar = null;
    for (let i = 1; i <= N; i++) {
        cars.push(new Car(road.getLaneCenter(1), 100, 30, 50, "AI"));
    }
}
document.getElementById("addCarsButton").addEventListener("click", addCars);
document.getElementById("removeCarsButton").addEventListener("click", removeCars);

let P = parseFloat(localStorage.getItem("mutationRate")) || 0.1;
function changeRateUp() {
    P += 0.1;
    P = parseFloat(P.toFixed(1));
    localStorage.setItem("mutationRate", P.toString());
    resetSimulation();
}

function changeRateDown() {
    P = Math.max(0.1, P - 0.1);
    P = parseFloat(P.toFixed(1));
    localStorage.setItem("mutationRate", P.toString());
    resetSimulation();
}

function resetSimulation() {
    cars.length = 0;
    bestCar = null;
    for (let i = 1; i <= N; i++) {
        cars.push(new Car(road.getLaneCenter(1), 100, 30, 50, "AI"));
    }

    if (localStorage.getItem("bestBrain")) {
        for (let i = 0; i < cars.length; i++) {
            cars[i].brain = JSON.parse(localStorage.getItem("bestBrain"));
            if (i !== 0) {
                NeuralNetwork.mutate(cars[i].brain, P);
            }
        }
    }
}
document.getElementById("mutationUp").addEventListener("click", changeRateUp);
document.getElementById("mutationDown").addEventListener("click", changeRateDown);

const cars=generateCars(N);
let bestCar=cars[0]; 
if(localStorage.getItem("bestBrain")){
    for(i=0; i<cars.length; i++){
        cars[i].brain=JSON.parse(
            localStorage.getItem("bestBrain"));
        if(i!=0){
            NeuralNetwork.mutate(cars[i].brain, P);
        }
    }
}

let traffic = [
    new Car(road.getLaneCenter(1), -100, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(0), -300, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(2), -300, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(0), -500, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(1), -500, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(1), -700, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(2), -700, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(0), -900, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(3), -900, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(1), -1100, 30, 50, "DUMMY", 2)
];

function addObstacle() {
    const lastPosition = traffic[traffic.length - 1].y;
    let newLaneIndex = Math.floor(Math.random() * 4);
    const newPosY = lastPosition - 200;

    let consecutiveCount = 0;
    let newLaneCenter;
    do {
        newLaneCenter = road.getLaneCenter(newLaneIndex);
        newLaneIndex = (newLaneIndex + 1) % 4;
        if (newLaneIndex === traffic[traffic.length - 1].lane) {
            consecutiveCount++;
        } else {
            consecutiveCount = 0;
        }
    } while (
        traffic.length >= 2 &&
        traffic[traffic.length - 1].y === newPosY &&
        traffic[traffic.length - 1].lane === newLaneIndex &&
        traffic[traffic.length - 2].lane === newLaneIndex &&
        consecutiveCount >= 2
    );

    if (traffic[traffic.length - 1].lane !== traffic[traffic.length - 2].lane) {
        if (Math.random() < 0.5) {
            newPosY -= 200;
        }
    }
    traffic.push(new Car(newLaneCenter, newPosY, 30, 50, "DUMMY", 2));
    updateObstacleCount();
}

function removeObstacle() {
    traffic.pop();
    updateObstacleCount();
}

function updateObstacleCount() {
    document.getElementById("localObstacles").textContent = traffic.length;
}

document.addEventListener("DOMContentLoaded", function() {
    updateObstacleCount();
    var localStorageData = localStorage.getItem('numberOfCars');
    var localStorageDiv = document.getElementById('localNumber');
    localStorageDiv.innerHTML = localStorageData;

    var localStorageData = localStorage.getItem('mutationRate');
    var localStorageDiv = document.getElementById('localRate');
    localStorageDiv.innerHTML = localStorageData;
});

document.getElementById("addObstacle").addEventListener("click", addObstacle);
document.getElementById("removeObstacle").addEventListener("click", removeObstacle);

animate(); 

function save(){
    document.getElementById("localStatus").innerHTML = "Saved"
    localStorage.setItem("bestBrain",
    JSON.stringify(bestCar.brain)
    );
}

function discard(){
    document.getElementById("localStatus").innerHTML = "Outdated"
    localStorage.removeItem("bestBrain"); 
}

document.addEventListener("DOMContentLoaded", function() {
    discard();
});

function generateCars(N){
    const cars=[];
    for(let i=1; i<=N; i++){
        cars.push(new Car(road.getLaneCenter(1),100,30,50,"AI"));
    }
    return cars
}

function animate(){
    for(let i=0; i<traffic.length;i++){
        traffic[i].update(road.borders,[]); 
    }
    
    for(let i=0; i<cars.length;i++){
        cars[i].update(road.borders, traffic); 
    }

    bestCar=cars.find(
        c=>c.y==Math.min(
            ...cars.map(c=>c.y)
        )
    );

    carCanvas.height=window.innerHeight;

    carCtx.save(); 
    carCtx.translate(0, -bestCar.y+carCanvas.height*0.7); 

    road.draw(carCtx); 
    for(let i=0; i<traffic.length; i++){
        traffic[i].draw(carCtx, "#ED665C");
    }

    carCtx.globalAlpha=0.2; 
    for(let i=0; i<cars.length;i++){
        cars[i].draw(carCtx, "#00b38a"); 
    }
    carCtx.globalAlpha=1; 
    bestCar.draw(carCtx, "#00b38a", true); 

    carCtx.restore(); 

    requestAnimationFrame(animate);
}

var localStorageData = localStorage.getItem('numberOfCars');
var localStorageDiv = document.getElementById('localNumber');
localStorageDiv.innerHTML = localStorageData;

var localStorageData = localStorage.getItem('mutationRate');
var localStorageDiv = document.getElementById('localRate');
localStorageDiv.innerHTML = localStorageData;

function dataDisplay() {
    var trueContainer = document.getElementById('trueContainer');
    trueContainer.style.display = "flex"
}

function refreshPage() {
    location.reload(true);
}