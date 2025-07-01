const selectTag=document.querySelectorAll("select");
const translateBtn=document.querySelector("#transfer");
const fromText=document.querySelector("#fromText");
const twoText=document.querySelector("#twoText");
const icons= document.querySelectorAll("img");

selectTag.forEach((tag,id)=>{

for(const countriesCode in countries){
    let selected;
    if(id==0 && countriesCode=="en-GB"){
        selected="selected";
    }
    else if(id==1 && countriesCode=="hi-IN"){
            selected="selected";
    }
  let option= ` <option values="${countriesCode}" ${selected}>${countries[countriesCode]}</option>` ;
  tag.insertAdjacentHTML("beforeend",option);
    }
});

translateBtn.addEventListener("click",()=>{
let Text=fromText.value,
translateFrom=selectTag[0].value,
translateTwo=selectTag[1].value;
let apiURL=`https://api.mymemory.translated.net/get?q=${Text}&langpair=${translateFrom}|${translateTwo}`;
fetch(apiURL).then(res => res.json()).then(data => {
    twoText.value=data.responseData.translatedText;

});
});
icons.forEach(icon =>{
icon.addEventListener("click", ({target}) => {
    if(target.classList.contains("copy") ){
                if(target.id == "from"){
                    navigator.clipboard.writeText(fromText.value)
                }
                else{
                    navigator.clipboard.writeText(twoText.value)

                }
            }
            else{
                    let utterance;
                    if(target.id == "from"){
                    utterance =new SpeechSynthesisUtterance(fromText.value);
                    utterance.lang= selectTag[0].value;
                    }
                    else{
                        utterance =new SpeechSynthesisUtterance(twoText.value);
                        utterance.lang= selectTag[1].value;
                    }
//                     if (!utterance.voice) {
//                         alert("Selected language is not supported for speech synthesis.");
//                         return;
//                     }
// //                     let voices = speechSynthesis.getVoices();
// console.log(voices);

        
                    speechSynthesis.speak(utterance);
            }
           // speechSynthesis.speak(utterance);

        });   
});
