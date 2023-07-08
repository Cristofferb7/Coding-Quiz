var savedData = JSON.parse(localStorage.getItem("savedScores"))
console.log (savedData)

var highScores = document.getElementById("highScores")

for (let index = 0; index < savedData.length; index++) {
    const element = savedData[index];
    var newLi = document.createElement("li")

newLi.textContent = element.initials + "-" + element.score 

highScores.append(newLi)
}



