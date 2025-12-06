// let btn=document.querySelector("#btn")
// let content=document.querySelector("#content")
// let voice=document.querySelector("#voice")

// function speak(text){
//     let text_speak=new SpeechSynthesisUtterance(text)
//     text_speak.rate=1
//     text_speak.pitch=1
//     text_speak.volume=1
//     text_speak.lang="hi-GB"
//     window.speechSynthesis.speak(text_speak)
    
// }
// function WishMe(){
//     let day=new Date()
//     let hours=day.getHours()
//     if(hours>=0 && hours<12){
//         speak("good morning sir")
//    }
//    else if(hours>=12 && hours <16){
//         speak("Good afternoon sir")
//    }else{
//         speak("good evening sir")
//    }
// }
// window.addEventListener('load',()=>{
//     WishMe()
// })
// let speechRecognition= window.SpeechRecognition || window.webkitSpeechRecognition
// let recognition =new speechRecognition()
// recognition.onresult=(event)=>{
//     let currentIndex=event.resultIndex
//     let transcript=event.results[currentIndex][0].transcript
//     content.innerText=transcript
    
//     takeCommand(transcript.toLowerCase())

// }

// btn.addEventListener("click",()=>{
//     recognition.start()
//     btn.style.display="none"
//     voice.style.display="block"
// })
// function takeCommand(message){
//     btn.style.display="flex"
//     voice.style.display="none"
//     if(message.includes("hello")||message.includes("hey")){
//         speak("hello sir,what can i help you")
//     }
//     else if(message.includes("who are you")){
//         speak("i am virtual assistant ,created by gulshan sir")
//     }
//     else if(message.includes("open youtube")){
//         speak("opening youtube....")
//         window.open("https://youtube.com/","_blank")
//     }
//     else if(message.includes("open google")){
//         speak("opening google....")
//          window.open("https://google.com/","_blank")
//     }
//     else if(message.includes("open instagram")){
//         speak("opening instagram....")
//         window.open("https://instagram.com/","_blank")
//     }
//     else if(message.includes("time")){
//         let time=new Date().toLocaleString(undefined,{hour:"numeric",minute:"numeric"})
//         speak(time)
//     }
//     else if(message.includes("date")){
//         let date=new Date().toLocaleString(undefined,{hour:"numeric",minute:"short"})
//         speak(date)
//     }
//     else{
//         let finalText="this is what i found on internet regarding"+message.replace("tommy"," ")
//         speak(finalText)
//         speak(`this is what i found on internet regarding `)
//         window.open(`https://www.google.com/search?q=${message.replace("tommy","")}`,"_blank")
//     }
   
// }  
let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");

/* -------------------------------
   TEXT-TO-SPEECH FUNCTION
--------------------------------*/
function speak(text){
    const utter = new SpeechSynthesisUtterance(text);

    utter.rate = 1;
    utter.pitch = 1;
    utter.volume = 1;
    utter.lang = "en-US";   // more accurate speech

    window.speechSynthesis.cancel(); // prevents voice overlap
    window.speechSynthesis.speak(utter);
}

/* -------------------------------
   AUTO GREETING FUNCTION
--------------------------------*/
function WishMe(){
    let hours = new Date().getHours();

    if(hours >= 0 && hours < 12){
        speak("Good Morning Sir");
    }
    else if(hours >= 12 && hours < 16){
        speak("Good Afternoon Sir");
    }
    else{
        speak("Good Evening Sir");
    }
}

window.addEventListener("load", () => {
    setTimeout(WishMe, 500);   // slight delay for smoothness
});

/* -------------------------------
   SPEECH RECOGNITION SETUP
--------------------------------*/
let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new speechRecognition();

recognition.continuous = false;
recognition.interimResults = false;
recognition.maxAlternatives = 1;

recognition.onerror = (err) => {
    speak("Sorry, I could not hear properly. Please try again.");
    console.error("Speech Recognition Error:", err);
};

recognition.onresult = (event) => {
    let index = event.resultIndex;
    let transcript = event.results[index][0].transcript.trim();

    content.innerText = transcript;
    takeCommand(transcript.toLowerCase());
};

/* -------------------------------
   BUTTON CLICK — START LISTENING
--------------------------------*/
btn.addEventListener("click", () => {
    speechSynthesis.cancel();
    recognition.start();
    btn.style.display = "none";
    voice.style.display = "block";
});

/* -------------------------------
   COMMAND HANDLER
--------------------------------*/
function takeCommand(message){
    btn.style.display = "flex";
    voice.style.display = "none";

    // Greetings
    if(message.includes("hello") || message.includes("hey")){
        speak("Hello Sir, how can I help you?");
    }

    else if(message.includes("who are you")){
        speak("I am your personal virtual assistant, created to help you anytime.");
    }

    // Open YouTube
    else if(message.includes("open youtube")){
        speak("Opening YouTube...");
        window.open("https://youtube.com", "_blank");
    }

    // Open Google
    else if(message.includes("open google")){
        speak("Opening Google...");
        window.open("https://google.com", "_blank");
    }

    // Open Instagram
    else if(message.includes("open instagram")){
        speak("Opening Instagram...");
        window.open("https://instagram.com", "_blank");
    }

    // Time
    else if(message.includes("time")){
        let time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
        speak("The time is " + time);
    }

    // Date
    else if(message.includes("date")){
        let date = new Date().toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" });
        speak("Today is " + date);
    }

    /* ----------------------------------------------------------
       DEFAULT GOOGLE SEARCH (IMPROVED & NO DUPLICATE SPEECH)
    ----------------------------------------------------------- */
    else{
        let cleaned = message.replace("tommy", "").trim();
        speak("Here is what I found on the internet regarding " + cleaned);
        window.open(`https://www.google.com/search?q=${cleaned}`, "_blank");
    }
}

