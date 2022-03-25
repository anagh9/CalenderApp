console.log('Hello World');
let tbody = document.querySelector('tbody')

let days = []

function formattedDate(d = new Date) {
    return [d.getDate(), d.getMonth()+1, d.getFullYear()]
        .map(n => n < 10 ? `0${n}` : `${n}`).join('-');
}

date =new Date()
date.setDate(date.getDate()-5)
for(let i=1;i<=31;i++){
    days.push(`${formattedDate(date)}`)
    date.setDate(date.getDate()+1)
}

let days_in = 1
for(let i=1;i<=8;i++){
    let tr = document.createElement('tr')
    
    for(let j=1;j<=4;j++){
        
        if(i==8 && j==4) break;
        let td = document.createElement('td')
        td.innerHTML = days[days_in-1] 
        tr.appendChild(td)
        days_in++;
        if(i%2!=0 && j%2==0){
            td.classList.add("table-warning")
        }else if(i%2==0 && j%2!=0){
            td.classList.add("table-info")
        }
    }
    tbody.appendChild(tr)
}

document.querySelectorAll('td').forEach((td)=>{
    td.ondblclick = ()=>{
        console.log('clicked');
        sendData(td.innerText)
        td.style.backgroundColor = 'red'
    }

    td.addEventListener('click',()=>{
        console.log('clicked');
        td.style.backgroundColor = 'white'
    })
})

const sendData = (data)=>{
    console.log(data);
    fetch('http://localhost:3000/',{
        method: "POST",
        body:JSON.stringify({
            date:data
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then(response => response.json())
    .then(json => console.log(json));
}