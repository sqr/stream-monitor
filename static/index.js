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

// Push notification
function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

const publicVapidKey = 'BCXPNhnMFiAbiosghdT-Ca04Y6VNQ4QjwpdmthgD1Ui4jY95D451NuH_3bRePVESvlQXLSIwd3UQbazW4rsBZNI';
const triggerPush = document.querySelector('.push');

async function triggerPushNotification() {
    if ('serviceWorker' in navigator) {
    const register = await navigator.serviceWorker.register('/static/sw/sw.js', {
        scope: '/'
    });

    const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
    });

    await fetch('/subscribe', {
        method: 'POST',
        body: JSON.stringify(subscription),
        headers: {
        'Content-Type': 'application/json',
        },
    });
    } else {
    console.error('Service workers are not supported in this browser');
    }
}

triggerPush.addEventListener('click', () => {
    triggerPushNotification().catch(error => console.error(error));
});
