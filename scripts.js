let toAhadith = document.querySelector(".title .btn")
let sectionAhadith = document.querySelector(".ahadise")



toAhadith.addEventListener("click",()=>{
    sectionAhadith.scrollIntoView({
        behavior:"smooth"
    })
})

let header = document.querySelector(".header")
let scrollIcon = document.querySelector(".scrollIcon")

window.addEventListener("scroll", ()=>{
    if(scrollY >550){
        header.classList.add("active")
        //console.log(scrollY)
    }
    else{
        header.classList.remove("active")
    }
    if(scrollY >550){
        scrollIcon.classList.add("active")
    }
    else{
        scrollIcon.classList.remove("active")
    }
})

scrollIcon.addEventListener("click",()=>{
   window.scrollTo({
    top : 0,
    behavior : "smooth"
    
   })

})

//=====toggle menu=====
let iconNavMenu = document.querySelector(".bars")
let navMenu = document.querySelector(".header ul")
iconNavMenu.addEventListener("click",()=>{
navMenu.classList.toggle("active")
})

//========start go to section ==========

let AllSections = document.querySelectorAll("section")
let AllLinks = document.querySelectorAll(".header ul li")

AllLinks.forEach(link =>{
    link.addEventListener("click",()=>{
        document.querySelector(".header ul li.active").classList.remove("active");       
        link.classList.add("active");
        let target = link.dataset.link;
        AllSections.forEach(sec =>{
            if(sec.classList.contains(target))
             sec.scrollIntoView({
                behavior:"smooth"
             })
        })
    })
})
//========end go to section ==========


//==========ahadith==========

let hadithContainer = document.querySelector(".hadith-box")
let next = document.querySelector(".buttons .next")
let prev = document.querySelector(".buttons .prev")
let number = document.querySelector(".buttons .number");
let hadithIndex = 0;

hadithChange();
function hadithChange(){
    
   
    fetch("https://api.hadith.gading.dev/books/bukhari?range=300-500")
    .then(response =>response.json())
    .then(data =>{

        console.log(data)
        let allHadith = data.data.hadiths
        console.log(allHadith)
        numberHadith()

         next.addEventListener("click", ()=>{
            if(hadithIndex == 199){
                hadithIndex = 0
            }
            else{
                hadithIndex++
            }
            numberHadith()
        })

        prev.addEventListener("click", ()=>{
            if(hadithIndex == 0){
                hadithIndex = 199
            }
            else{
                hadithIndex--
            }
            numberHadith()
        })

        function numberHadith(){          
            hadithContainer.innerHTML = allHadith[hadithIndex].arab +"<br> "    
            number.innerHTML =`200 / ${hadithIndex +1}`
        }
 })
} 

//=======start azkar=========

let azkarContainer= document.querySelector(".azkar-box .zakr");
let des= document.querySelector(".azkar-box .des");
// let title= document.querySelector(".azkar-box .title");
// title.style.color="red"

let azkarIndex = 0;
let nextAzkar = document.querySelector(".azkar .buttons .next")
let prevAzkar = document.querySelector(".azkar .buttons .prev")
let numberAzkar = document.querySelector(".azkar .buttons .number");


azkarChange()

function azkarChange(){
    // let myRequest = new XMLHttpRequest();
    // myRequest.open("get","./azkar.json")
    // myRequest.send()
    // console.log(myRequest)
    // myRequest.onreadystatechange = function(){

    //     if(this.readyState === 4 && this.status === 200 ){
    //         let jsData = JSON.parse(this.responseText)
    //         console.log(jsData)

    //         for(let i = 0; i < jsData.length; i++){
    //             azkarContainer.innerHTML= jsData[i].zekr ;
    //             des.innerHTML =jsData[i].description
    //             numberAzkar.innerHTML =`337 / ${i +1}`
                
    //         nextAzkar.addEventListener("click", ()=>{ 
    //             azkarContainer.innerHTML= jsData[i].zekr ;
    //             des.innerHTML =jsData[i].description
    //             numberAzkar.innerHTML =`337 / ${i +1}`
    //         if(i == 336){
    //             i = 0
    //         }
    //         else{
    //             i++
    //         }
           
    //     })

    //     prevAzkar.addEventListener("click", ()=>{
    //         if(i == 0){
    //             i = 336
    //         }
    //         else{
    //             i--
    //         }
    //         azkarContainer.innerHTML= jsData[i].zekr ;
    //         des.innerHTML =jsData[i].description
    //         numberAzkar.innerHTML =`337 / ${i +1}`
    //     })
    //         }
                     

    //     }
        
    // }

    fetch("azkar.json")
    .then(res=>res.json())
    .then(data =>{
        console.log(data)   
        addZakr()
        
        nextAzkar.addEventListener("click", ()=>{ 
            addZakr()
            if(azkarIndex == 336){
                azkarIndex = 0
            }
            else{
                azkarIndex++
            }
           
        })

        prevAzkar.addEventListener("click", ()=>{
            if(azkarIndex == 0){
                azkarIndex = 336
            }
            else{
                azkarIndex--
            }
            addZakr()
        })

        
        function addZakr(){

        azkarContainer.innerHTML= data[azkarIndex].zekr ;
        des.innerHTML =data[azkarIndex].description;
        numberAzkar.innerHTML =`337 / ${azkarIndex +1}`
        }
})

    
} 
//=======end azkar=========


//========start quran ==========
let surahBox = document.querySelector(".quran .container")
getQuran()
function getQuran(){
    fetch("https://api.alquran.cloud/v1/meta").
    then(response =>response.json()).
    then(data =>{
        //console.log(data.data.surahs.references)
        let allSurah =data.data.surahs.references;
        console.log(allSurah)
        let numberSurah =114
        for(let i=0;i<numberSurah;i++){
            surahBox.innerHTML +=`
                <div class="surah">
                    <h4>${allSurah[i].name}</h4>
                    <p>${allSurah[i].englishName}</p>
                </div>
            `
        }
        let surahTitle = document.querySelectorAll(".surah")
        let popupSurah = document.querySelector(".surah-popup")
        let closePopup = document.querySelector(".surah-popup .close")
        let textAyah = document.querySelector(".surah-popup .ayah")
        surahTitle.forEach((surah,index) =>{
            surah.addEventListener("click",()=>{
                popupSurah.classList.add("active")
                fetch(`https://api.alquran.cloud/v1/surah/${index +1}`).
                then(response =>response.json()).
                then(data=>{         
                    textAyah.innerHTML=""      
                    console.log(data)
                    let ayaht = data.data.ayahs;
                    
                    ayaht.forEach(aya=>{                   
                        textAyah.innerHTML +=`
                            <p>(${aya.numberInSurah})-${aya.text} </p>
                        `
                    })
                    
                })
            })
        })
        closePopup.addEventListener("click",()=>{
            popupSurah.classList.remove("active")
        })
    })

}
//========end quran ==========

//========start payer time ==========

let cardsContainer = document.querySelector(".payer .container")
getTimePrayer()
function getTimePrayer(){
    fetch(" https://api.aladhan.com/v1/timingsByCity?city=cairo&country=egypt&method=8").
    then(res =>res.json()).
    then(data =>{
        console.log(data)
        let timing = data.data.timings;
        cardsContainer.innerHTML = "";
        for(let i in timing){
            cardsContainer.innerHTML +=`
            <div class="card">
            <div class="circle">
                <svg>
                    <Circle cx="80" cy="80" r="80"></Circle>
                </svg>
                <div class="prayTime">${timing[i]}</div>
            </div>
            <p>${i}</p>
        </div>
            `
        }

    })

}
//========end payer time ==========
