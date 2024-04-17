// setInterval(function() {
//    location.reload();
// }, 2000); 

let puk=0;
let pass = {};
let j;
let alf = 'a';
let g ='A';
let desk = document.querySelector(".desk");
let num = document.querySelector(".num");
let buk = document.querySelector(".buk");
let desks = document.querySelector(".desks");
let numer = document.querySelector(".numer");
let bukvi = document.querySelector(".bukvi");
let ready = document.querySelector(".start");
let start = false;
const resetButton = document.getElementById('resetBtn');
//localStorage.clear()
console.log(localStorage)
function createGrid(){

for(let p = 0;p<2;p++){
    g = 'A'
    for (; g <='J'; ) {
    if(p==0){
        buk.textContent += g;
    buk.textContent += " ";}
    else{
        bukvi.textContent += g;
        bukvi.textContent += " ";  
    }
    g = String.fromCharCode(g.charCodeAt(0) + 1);
}

for(let i = 0;i<10;i++){
    alf='a';
    var digit = document.createElement('div');
    
    digit.textContent = i;
    
    digit.style.display = 'inline-block';
    digit.style.padding = '5px';
    if(p==0){
       
    desk.appendChild(digit);}
    else{
        desks.appendChild(digit);
    }
        for( j = 0;j<10;j++){
        let butt = document.createElement("button");
        if(p==0){
        butt.id = "g"+i+alf;}
        else{
            butt.id = i+alf;
        }
        if(p==0){
        butt.className = 'data-get';}
        else{
            butt.className = 'data-send';
        }
        if(alf<'z'){
            alf = String.fromCharCode(alf.charCodeAt(0) + 1);
        }
        if(p==0){
            butt.style.background = "#1852FF"; 
            butt.addEventListener('dragover', dragOver);
        butt.addEventListener('drop', drop);
            desk.appendChild(butt);}
            else{
                desks.appendChild(butt);
            }
    }
}
}
}
createGrid();




$.ajax({
    url: 'http://seabattle/backBatlle.php',
    method: 'GET',
    success: function(response) {
        data = JSON.parse(response);
        
        if(data.poshta=="2get"){
            
            sendAnswer(data);
        }
        if(data.poshta=="2attac"){
        send(data,1)}
        if(data.plaer==2&&data.poshta!="2get"){
            main(data);
        }
        
    },
    error: function(xhr, status, error) {
        console.error(xhr);
        console.error(status);
        console.error(error);
    }
});
document.querySelectorAll('.data-get').forEach(function(button){
    let idBt = button.id;
    let pup = false;
    pass[idBt] = pup;
    
    
})

document.querySelectorAll('.data-send').forEach(function(button) {
    button.addEventListener('click', function() {
        
        fetch('/bd.php', {
            method: 'POST',
            body: JSON.stringify({ 
                id: this.id,
                pass:null,
                plaer:'1',
                poshta:'1attac'}), 
            headers: {
                'Content-Type': 'application/json'
            }
        })
    });
});

function handleResetButtonClick() {

    document.querySelectorAll('.data-get').forEach(button => {
        button.textContent = "";
    button.style.fontSize = "";
    button.style.background ="#1852FF" 
     pass[button.id] = false;   
        localStorage.removeItem("1"+button.id);
});
document.querySelectorAll('.ship').forEach(ship =>{
    let shipell = document.getElementById(ship.id);
    shipell.style.display = 'flex'
    let count = shipell.querySelector('.count')
    let countNum = count.id
    count.innerText = 'X'+countNum[3];
    
localStorage.removeItem('1shipStatus'+ship.id)
localStorage.removeItem('1shipNum'+ship.id)
});
    
    document.querySelectorAll('.data-send').forEach(button => {
        
        button.textContent = "";
        button.style.fontSize = "";
        button.style.background =""
        
        localStorage.removeItem("1"+button.id);
    });
    send(data,0)
}
resetButton.addEventListener('click', handleResetButtonClick);
document.querySelectorAll('.data-get').forEach(button => {

    const savedColor = localStorage.getItem("1"+button.id);
    
    
     if(savedColor ==="no"){
        button.textContent = "O";
    button.style.fontSize = "20px";
    }
    else if(savedColor ==="ship"){
        pass[button.id] = true;
        let btn = document.getElementById(button.id)
        btn.style.backgroundColor = "rgb(31, 27, 27)";
    }
    else if(savedColor === "yes"){
        let btn = document.getElementById(button.id)
        btn.style.backgroundColor = "red";
    }
});
document.querySelectorAll('.ship').forEach(ship =>{
    const shipStatus = localStorage.getItem('1shipStatus'+ship.id);
    const shipNum = localStorage.getItem('1shipNum'+ship.id);
    let shipvis = document.getElementById(ship.id);
    let count = shipvis.querySelector('.count');
    
    
    if(shipNum==null){
        let countNum = count.innerText[1];
        count.innerText = 'X'+countNum;
    }else{
        count.innerText = 'X'+shipNum;
    }
    if(shipStatus=='none'){
        shipvis.style.display = 'none';
    }

});
document.querySelectorAll('.data-send').forEach(button => {
    
    const savedColor = localStorage.getItem("1"+button.id);

    if (savedColor === "ok") {
        
        button.textContent = "X";
    button.style.fontSize = "15px";
    }
    else if(savedColor ==="non"){
        button.textContent = "O";
    button.style.fontSize = "20px";
    }
});
function main(data) {
    console.log(data);
    console.log(pass);
    let btn = document.getElementById("g"+data.id);
     if(pass["g"+data.id]==false){
    btn.textContent = "O";
    btn.style.fontSize = "20px";
    localStorage.setItem("1g"+data.id, "no");
   }
   else if(pass["g"+data.id]==true){
    btn.style.background = "red"
    localStorage.setItem("1g"+data.id, "yes");
   }
   
 }
 function send(data,b){
    if(b==0){
        fetch('/bd.php', {
            method: 'POST',
            body: JSON.stringify({ 
                id: data.id,
                pass:pass["g"+data.id].toString(),
                plaer:'0',
                poshta:'1get' }), 
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
    else{
    fetch('/bd.php', {
        method: 'POST',
        body: JSON.stringify({ 
            id: data.id,
            pass:pass["g"+data.id].toString(),
            plaer:'1',
            poshta:'1get' }), 
        headers: {
            'Content-Type': 'application/json'
        }
    })}}
function sendAnswer(data){
    let btn = document.getElementById(data.id);
    
    if(data.pass=="true"){
    btn.textContent = "X";
    btn.style.fontSize = "15px";
    localStorage.setItem("1"+data.id, "ok");}
    else if(data.pass=="false"){
        btn.textContent = "O";
        btn.style.fontSize = "20px";
        localStorage.setItem("1"+data.id, "non");
    }
}

function dragStart(event) {
    const offsetX = event.clientX;
    const offsetY = event.clientY;
    let shipId = event.target.id
    event.dataTransfer.setData('ship',shipId)
    const ship = document.getElementById(shipId);

    const shipParts = ship.querySelectorAll('.ship_part');
    let count = ship.querySelector(".count");
    
    event.dataTransfer.setData('count',count.id);
    var buttonId = event.target.parentNode.id; 
    
    if (!pass[buttonId]) {
        
      let width = event.target.childElementCount;
      width = width-1
      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.setData('width', width);

      
      for (const part of shipParts) {
        
      const rect = part.getBoundingClientRect();
      
      if (offsetX >= rect.left && offsetX <= rect.right && offsetY >= rect.top && offsetY <= rect.bottom) {
        
        let targetPartClass = part.className.split(' ')[1];
        
        event.dataTransfer.setData('text', targetPartClass);
        
        break;
      }
    }
    } else {
      
      event.preventDefault();
    }
  }
function dragOver(event) {
    event.preventDefault(); 
  }
  function drop(event) {
    let build = true;
    event.preventDefault(); 
  
  var data = event.dataTransfer.getData('text');
  var width = event.dataTransfer.getData('width');
  var countId = event.dataTransfer.getData('count');
  
  

  var button = event.target;
  let newData = data[5]
  let fine = 'norm';
  



  while(build){
    let i =1;
   

    if(newData==1&&width==1){
        if(!shipserch(button.id,'solo')){
            return;
        }
        build = false
    }
    

    for(;newData<parseInt(width);newData++){
        
        let btnId = button.id; 
        
        if(parseInt(newData)+1==width){

            
            fine = 'last';
        }
        
        if(newData==1){
            fine = 'first'
            if(!shipserch(btnId,fine)){
                
                return;
            }
            fine = 'norm'
        }
        

        
        let btnIdArray = btnId.split(""); 
        
        btnIdArray[2] = String.fromCharCode(btnIdArray[2].charCodeAt(0) + parseInt(i)); 
        btnId = btnIdArray.join(""); 
        let newBtn = document.getElementById(btnId);
    if(newBtn==undefined){
        return;
    }
        if(!shipserch(btnId,fine)){
           
            return;
        }
        i++
        
    }
    let j = 1;
  newData = data[5];
  for(;1<newData;newData--){
    
    let btnId = button.id;
    
    if(newData-1==1){
        fine = 'first';
    }
    else if(newData==width){
        
        fine = 'last'
        if(!shipserch(btnId,fine)){
            return;
        }
        fine = 'norm'
    }
    else{
        fine = 'norm'
    }
    
    let btnIdArray = btnId.split(""); 
    
    btnIdArray[2] = String.fromCharCode(btnIdArray[2].charCodeAt(0) - parseInt(j)); 
    btnId = btnIdArray.join(""); 
    let newBtn = document.getElementById(btnId);
    if(newBtn==undefined){
        return;
    }
    if(!shipserch(btnId,fine)){
        
        return;
    }
    j++
    
}
    newData = data[5];
    i =1
  for(;newData<width;newData++){
    
    let btnId = button.id;
    
    let btnIdArray = btnId.split(""); 
    
    btnIdArray[2] = String.fromCharCode(btnIdArray[2].charCodeAt(0) + parseInt(i)); 
    btnId = btnIdArray.join(""); 
    
    
    let newBtn = document.getElementById(btnId);
    if(newBtn==undefined){
        return;
    }
    
    newBtn.style.backgroundColor = "rgb(31, 27, 27)";
    pass[btnId] = true;
  localStorage.setItem("1"+btnId,"ship");
    i++
    if(parseInt(newData)+1==width){
    build = false
    }
  }

  
j=1;
newData = data[5];
  for (;1<newData;newData--) {
    let btnId = button.id;
    
    let btnIdArray = btnId.split(""); 
    
    btnIdArray[2] = String.fromCharCode(btnIdArray[2].charCodeAt(0) - parseInt(j)); 
    btnId = btnIdArray.join(""); 
    
    let newBtn = document.getElementById(btnId);
    if(newBtn==undefined){
        return;
    }
    newBtn.style.backgroundColor = "rgb(31, 27, 27)";
    pass[btnId] = true;
  localStorage.setItem("1"+btnId,"ship");
    j++
    if(parseInt(newData)-1==1){
    build = false
    }
    
  }
  
  
  }
  pass[event.target.id] = true;
  localStorage.setItem("1"+event.target.id,"ship");
  
  button.style.background = "rgb(31, 27, 27)";
 
 let count = document.getElementById(countId);
 let shipId = event.dataTransfer.getData('ship')
 var countNum = parseInt(count.innerText[1]);
 
  countNum--
  count.innerText = 'X' + countNum;
  localStorage.setItem('1shipStatus'+shipId,"block");   
  localStorage.setItem('1shipNum'+shipId,countNum);
  if (countNum === 0) {
            
            localStorage.removeItem('1shipStatus'+shipId)
            localStorage.setItem('1shipStatus'+shipId,"none");
            var ship = document.getElementById(shipId);
            ship.style.display = 'none'; 
             
        }
        
   
    }
   
function shipserch(id,width){
    let buk  =id[2]
    let num = id[1];
    
    
    if(pass['g'+(parseInt(num)-1).toString()+String.fromCharCode(buk.charCodeAt(0) - 1)]==true)return false;
    if(pass['g'+(parseInt(num)-1).toString()+buk]==true)return false
    if(pass['g'+(parseInt(num)-1).toString()+String.fromCharCode(buk.charCodeAt(0) + 1)]==true)return false;
    if(pass['g'+(parseInt(num)+1).toString()+String.fromCharCode(buk.charCodeAt(0) - 1)]==true)return false;
    if(pass['g'+(parseInt(num)+1).toString()+String.fromCharCode(buk.charCodeAt(0) + 1)]==true)return false;
    if(pass['g'+(parseInt(num)+1).toString()+buk]==true)return false;
    if(width=='solo'||width=='first'){if(pass['g'+num+String.fromCharCode(buk.charCodeAt(0) - 1)]==true)return false;}
    if(width=='solo'||width=='last'){if(pass['g'+num+String.fromCharCode(buk.charCodeAt(0) + 1)]==true)return false;}

    return true;
}   
// function ready(data){

// if(){

// }
// else if(){

// }
// else if(){

// }

// }
ready.addEventListener('click',function(){
start = true;
console.log(start)
go()
});
function go() {
    fetch('/movego.php', {
        method: 'POST',
        body: JSON.stringify({ 
            move:1,
        start:start}), 
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

$.ajax({
    url: 'http://seabattle/moveget.php',
    method: 'GET',
    success: function(response) {
        data = JSON.parse(response);
        ready(data);
    
    },
    error: function(xhr, status, error) {
        console.error(xhr);
        console.error(status);
        console.error(error);
    }
});



