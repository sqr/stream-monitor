async function fetchData() {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    };
    const response = await fetch('/api', options);
    const streamList = await response.json();
    updateStyle(streamList.streamList);
}

function updateStyle(streamList) {
    for (item in streamList) {
        const streamID = document.getElementById(streamList[item].id);
        if (streamList[item].online) {
            streamID.classList.remove('offline');
            streamID.classList.add('online');
        } else {
            streamID.classList.remove('online');
            streamID.classList.add('offline');
        }
        console.log(streamList[item].id)
    }
}

fetchData();
setInterval(fetchData, 10000);

const button = document.getElementById('online');
    button.addEventListener('click', async event => {
        id =  document.getElementById("VZJK9ps6FkBq88wr");
        if (id.classList.contains("online")){
            console.log('already online');
        }else {
            id.classList.add("online");
        };
    });
const button2 = document.getElementById('offline');
button2.addEventListener('click', async event => {
    id =  document.getElementById("VZJK9ps6FkBq88wr");
    if (id.classList.contains("offline")){
        console.log('already offline');
    }else {
        id.classList.add("offline");
    };
    if (id.classList.contains("online")){
        id.classList.remove("online");
    }
});