$(document).ready(function() {


let submit = document.getElementById("submit")

submit.addEventListener ("click", musicSearch)

function musicSearch (){
    $.ajax({
	       async: true,
	       crossDomain: true,
	       url: "https://deezerdevs-deezer.p.rapidapi.com/search?q=artist:" + '"'+inputArtist.value+'"'+" album:"+ '"'+inputAlbum.value+'"',
	       method: "GET",
	       headers: {
               "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
               "x-rapidapi-key": "Need your own deezer API key"
	       },
        success: function(musicData) {
            console.log(musicData)
            console.log("success")
            displayMusicData(musicData)
        }
    })
}

function displayMusicData (data) {
   
    let albumData =data.data[0].album
    

    
        let albumCover = document.getElementById('alblum')
        albumCover.style.width = '120px';
        albumCover.style.height = '120px';
        albumCover.style.backgroundImage = "url(" + albumData.cover + ")"
        albumCover.style.backgroundSize = "100% 100%"

//build tracklist based off of the id value
     let trackList=[]
    for (let i=0; i<data.data.length; i++) {
        console.log(data.data[i].id)
        trackList.push(data.data[i])
    }
    console.log(trackList)

    
    //BoomBox logic

var myAudio = new Audio();

function Boombox (trackList) {
    
    this.currentSong = 0
    this.songs = trackList;

    this.playSongs = function () { console.log(myAudio.src)
        if (!myAudio.paused || !myAudio.src){
                myAudio.src = this.songs[this.currentSong].preview;
            }
        myAudio.play()
        document.getElementById('trackName').innerHTML = '<marquee>'+this.songs[this.currentSong].title + ' by '+ this.songs[this.currentSong].artist.name+'</marquee>'
    }
    this.pauseSongs = function () {
        myAudio.pause()
        
    }
    
    this.nextSong = function () {
        this.currentSong++
        myAudio.src = this.songs[this.currentSong].preview
        myAudio.play()
        document.getElementById('trackName').innerHTML = '<marquee>'+this.songs[this.currentSong].title + ' by '+ this.songs[this.currentSong].artist.name+'</marquee>'
    }
    this.previousSong = function () {
        this.currentSong--
        myAudio.src = this.songs[this.currentSong].preview
        myAudio.play()
        document.getElementById('trackName').innerHTML = '<marquee>'+this.songs[this.currentSong].title + ' by '+ this.songs[this.currentSong].artist.name+'</marquee>'
    }
    this.stopSongs = function () {
        myAudio.src = this.songs[this.currentSong].preview
        myAudio.pause()
    }
    this.shuffleSongs = function (){
        console.log('current song' + this.currentSong)
        let shuffle = undefined;
        do{
            shuffle = Math.floor(Math.random()* trackList.length)
            console.log(' shuffle '+ shuffle)
        }
        while (this.currentSong == shuffle)
        this.currentSong = shuffle
        this.playSongs ()
    }
}

var music = new Boombox(trackList)

let playButton = document.getElementById('playButton')
let pauseButton = document.getElementById('pauseButton')
let nextButton = document.getElementById('nextButton')
let previousButton = document.getElementById('previousButton')
let stopButton = document.getElementById('stopButton')
let shuffleButton =document.getElementById('shuffleButton')

playButton.addEventListener("click", function() {
    music.playSongs()
})
pauseButton.addEventListener("click", function() {
    music.pauseSongs()
})
nextButton.addEventListener("click", function() {
    music.nextSong()
})
previousButton.addEventListener("click", function() {
    music.previousSong()
})
stopButton.addEventListener("click", function() {
    music.stopSongs()
})
shuffleButton.addEventListener("click", function() {
    music.shuffleSongs()
})
myAudio.addEventListener("ended", function() {
    music.nextSong()
})
    
    
    
    
}
})



