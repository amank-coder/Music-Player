let songIndex=0;
let audioElement= new Audio('songs/1.mp3')
const masterPlay=document.getElementById('masterPlay')
const myProgressBar=document.getElementById('myProgressBar')
const gif=document.getElementById('gif')
const songItem=Array.from(document.getElementsByClassName('songItem'))
const songItemPlay=Array.from(document.getElementsByClassName('songItemPlay'))
const prev=document.getElementById('prev')
const next=document.getElementById('next')
const masterSongName=document.getElementById('masterSongName')

const song= [
    {songName:'Let me Love You', filePath:'songs/1.mp3', coverPath:'covers/1.jpg',duration:'3:25'},
    {songName:'Shape of You', filePath:'songs/2.mp3', coverPath:'covers/2.jpg',duration:'4:23'},
    {songName:'Let me Down Slowly', filePath:'songs/3.mp3', coverPath:'covers/3.jpg',duration:'2:57'},
    {songName:'Believer', filePath:'songs/4.mp3', coverPath:'covers/4.jpg',duration:'3:24'},
    {songName:'Unstoppable', filePath:'songs/5.mp3', coverPath:'covers/5.jpg',duration:'4:06'}
]

masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play()
        masterPlay.classList.remove('fa-circle-play')
        masterPlay.classList.add('fa-circle-pause')
        Array.from(document.getElementsByClassName('songItemPlay'))[songIndex-1].classList.remove('fa-circle-play')
        Array.from(document.getElementsByClassName('songItemPlay'))[songIndex-1].classList.add('fa-circle-pause')
        gif.style.opacity=1
    }
    else{
        audioElement.pause()
        masterPlay.classList.remove('fa-circle-pause')
        masterPlay.classList.add('fa-circle-play')
        Array.from(document.getElementsByClassName('songItemPlay'))[songIndex-1].classList.remove('fa-circle-pause')
        Array.from(document.getElementsByClassName('songItemPlay'))[songIndex-1].classList.add('fa-circle-play')
        gif.style.opacity=0
    }
})

audioElement.addEventListener('timeupdate',()=>{   //triggered when current time changes
    progress=((audioElement.currentTime/audioElement.duration)*100)
    myProgressBar.value=progress
})

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime=(myProgressBar.value*audioElement.duration)/100

})

songItem.forEach((element,i)=>{  //array.forEach(function(currentValue, index, arr), thisValue)
    element.getElementsByTagName('img')[0].src=song[i].coverPath
    element.getElementsByClassName('songName')[0].textContent=song[i].songName
    element.getElementsByClassName('durationItem')[0].textContent=song[i].duration
})

const makeAllPlays=()=>{
    songItemPlay.forEach((element)=>{
        element.classList.remove('fa-circle-pause')
        element.classList.add('fa-circle-play')
    })
}

songItemPlay.forEach((element)=>{
    element.addEventListener('click',(e)=>{
        makeAllPlays()
        
        if(audioElement.paused || audioElement.currentTime<=0){
        
        gif.style.opacity=1
        element.classList.remove('fa-circle-play')
        element.classList.add('fa-circle-pause')
        
        songIndex=element.id
        audioElement.src=`songs/${songIndex}.mp3`
        masterSongName.textContent=song[songIndex-1].songName
        audioElement.currentTime=0
        audioElement.play()
        
        masterPlay.classList.remove('fa-circle-play')
        masterPlay.classList.add('fa-circle-pause')
        
        }
        else{
        gif.style.opacity=0
        element.classList.remove('fa-circle-pause')
        element.classList.add('fa-circle-play')
        
        songIndex=element.id
        audioElement.src=`songs/${songIndex}.mp3`
        masterSongName.textContent=song[songIndex-1].songName
        audioElement.pause()
        
        masterPlay.classList.remove('fa-circle-pause')
        masterPlay.classList.add('fa-circle-play')

        
        }
    })
})

prev.addEventListener('click',()=>{
    if(songIndex<2)
    {
        songIndex=5
    }
    else{
        songIndex-=1
    }
    audioElement.src=`songs/${songIndex}.mp3`
    masterSongName.textContent=song[songIndex-1].songName
    audioElement.currentTime=0
    audioElement.play()
    masterPlay.classList.remove('fa-circle-play')
    masterPlay.classList.add('fa-circle-pause')
    document.getElementsByClassName('songItemPlay')[songIndex-1].classList.remove('fa-circle-play')
    document.getElementsByClassName('songItemPlay')[songIndex-1].classList.add('fa-circle-pause')

})

next.addEventListener('click',()=>{
    if(songIndex>4)
    {
        songIndex=1
    }
    else{
        songIndex+=1
    }
    audioElement.src=`songs/${songIndex}.mp3`
    masterSongName.textContent=song[songIndex-1].songName
    audioElement.currentTime=0
    audioElement.play()
    masterPlay.classList.remove('fa-circle-play')
    masterPlay.classList.add('fa-circle-pause')
    makeAllPlays()
    document.getElementsByClassName('songItemPlay')[songIndex-1].classList.remove('fa-circle-play')
    document.getElementsByClassName('songItemPlay')[songIndex-1].classList.add('fa-circle-pause')

})

// songitem playpause

