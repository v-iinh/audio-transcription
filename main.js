const carCanvas=document.getElementById("carCanvas");
carCanvas.width=200;
const carCtx = carCanvas.getContext("2d"); 
const road = new Road(carCanvas.width/2, carCanvas.width*0.9); 

let N = parseInt(localStorage.getItem("numberOfCars")) || 200;
function addCars() {
    N += 100;
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
    localStorage.setItem("mutationRate", P.toString());
    resetSimulation();
}

function changeRateDown() {
    P = Math.max(0.1, P - 0.1);
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

const traffic=[
    new Car(road.getLaneCenter(1),-100,30,50, "DUMMY", 2),
    new Car(road.getLaneCenter(0),-300,30,50, "DUMMY", 2),
    new Car(road.getLaneCenter(2),-300,30,50, "DUMMY", 2),
    new Car(road.getLaneCenter(0),-500,30,50, "DUMMY", 2),
    new Car(road.getLaneCenter(1),-500,30,50, "DUMMY", 2),
    new Car(road.getLaneCenter(1),-700,30,50, "DUMMY", 2),
    new Car(road.getLaneCenter(2),-700,30,50, "DUMMY", 2),
    new Car(road.getLaneCenter(0),-900,30,50, "DUMMY", 2),
    new Car(road.getLaneCenter(3),-900,30,50, "DUMMY", 2),
    new Car(road.getLaneCenter(1),-1100,30,50, "DUMMY", 2)
];

animate(); 

function save(){
    localStorage.setItem("bestBrain",
    JSON.stringify(bestCar.brain)
    );
}

function discard(){
    localStorage.removeItem("bestBrain"); 
}

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

var localStorageData = localStorage.getItem('bestBrain');
var localStorageDiv = document.getElementById('localBest');
localStorageDiv.innerHTML = localStorageData;

function dataDisplay() {
    var trueContainer = document.getElementById('trueContainer');
    trueContainer.style.display = "flex"
}

function refreshPage() {
    location.reload(true);
}