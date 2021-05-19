//get elems

const container = document.querySelector('.network-container'),
      network = container.querySelector('.network'),
      wifiIcon = container.querySelector('.network__icon'),
      status = container.querySelector('.network__details-status'),
      text = container.querySelector('.network__details-text')

//wait for load
window.addEventListener('load', async (e) => {
    //check on if online on load
    const online = await checkOnlineStatus();
    //there we just show online, but if want to get data it is better to do here
    // e.g:  if (online) {
    //   getData(url).then(data => console.log(data)) 
    // }
    online ? showOnline() : showOffline();
    
    //set interval to check if we go offline , then do proper steps
    setInterval(async () => {
        //check online status and show online if we online, else show offline
        const online = await checkOnlineStatus();
        if (online) {
            
            showOnline();
        } else {
            showOffline();
        }
      }, 3000); // probably too often, try 30000 for every 30 seconds

    
})

//check online status
const checkOnlineStatus = async () => {
    try {
        //get fetch , if we online res>200&&res<300 return true, else return false
      const res = await fetch("https://jsonplaceholder.typicode.com/posts");
      return res.status >= 200 && res.status < 300; // either true or false
    } catch (err) {
      return false; // definitely offline
    }
  };

//change html if offline
const showOffline = () => {
    network.classList.add('offline');
    wifiIcon.classList.add('offline');
    status.textContent = `You're offline now`
    text.textContent = `Please connect to the internet`
}

const showOnline = () => {
    network.classList.remove('offline');
    wifiIcon.classList.remove('offline');
    status.textContent = `You're online now`
    text.textContent = `Good! internet is connected!`
    

}