/**
 * Render songs
 * Scoll top
 * Play/ pause/ seek
 * CD rotate
 * Random
 * Next / repeat when ended
 * Active song
 * Scoll active song into view
 * Play song when click
 */


const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const player = $('.main')
 var playBtn = document.getElementById("play")
var pauseBtn = document.getElementById("pause")
const audio = $('#audio')
var toPath = "";
var idMusic = "";
var dem = false;
var isPlay = true;
var playe = document.getElementById("playAll")
var playee = document.getElementById("playImg")
var process = $("progress")
var isRandomOn = false
var isRepeat = false
var nextBtn = document.getElementById("next")
const audioElenment = $$("audio")
// var numberRD = randomeID()

function formatTime(time){
    var minutes = Math.floor(time/60)
    var remainSecond = Math.floor(time%60)
    var formattedTime = (minutes < 10 ? '0':'')+minutes+':'+(remainSecond < 10 ? "0": '') + remainSecond;
    return formattedTime
}

process.addEventListener("click", function(e){
    var result = (e.clientX-process.getBoundingClientRect().left)/process.offsetWidth*100
    var valueTime = (process.max*result)/100
    process.setAttribute("value", valueTime)
    toPath.currentTime = valueTime
})



const app = {

    currentIndex: "",

    songs: [
        {
            id: "1",
            name: "Tại Vì Sao",
            path: "./IMG/1/y2mate.com - 11Tại Vì Sao  RPT MCK  99 the album.mp3",
            img: "./IMG/1/TaiViSao.jpg",
            album: "Thang deptrai",
            author: "RPT MCK"
        },
        {
            id: "2",
            name: "Anh Đã Ổn Hơn",
            path: "./IMG/2/y2mate.com - Anh Đã Ổn Hơn.mp3",
            img: "./IMG/2/AnhDaOnHon.jpg",
            album: "",
            author: "RPT MCK"
        },
        {
            id: "3",
            name: "Soda",
            path: "./IMG/3/y2mate.com - SODA  MCK prodGC.mp3",
            img: "./IMG/3/Soda.jpg",
            album: "",
            author: "RPT MCK"
        },
        {
            id: "4",
            name: "Ai mới là kẻ xấu xa",
            path: "./IMG/4/y2mate.com - 13 Ai Mới Là Kẻ Xấu Xa  RPT MCK  99 the album.mp3",
            img: "./IMG/4/AiMoiLaKeXauXa.jpg",
            album: "",
            author: "RPT MCK"
        },
        {
            id: "5",
            name: "Thôi em đừng đi",
            path: "./IMG/5/Thôi Em Đừng Đi.mp3",
            img: "./IMG/5/ThoiEmDungDI.PNG",
            album: "",
            author: "RPT MCK"
        },
        {
            id: "6",
            name: "Chỉ một đêm nữa thôi",
            path: "./IMG/6/y2mate.com - 06 Chỉ Một Đêm Nữa Thôi  RPT MCK  ft tlinh    99  the album.mp3",
            img: "./IMG/6/Chi1DemNuaThoi.PNG",
            album: "",
            author: "RPT MCK"
        },
        {
            id: "7",
            name: "Tối nay ta đi đâu nhờ",
            path: "./IMG/7/y2mate.com - 05 Tối Nay Ta Đi Đâu Nhờ  RPT MCK Remix  99 the album.mp3",
            img: "./IMG/7/ToiNayTaDiDauNho.PNG",
            album: "",
            author: "RPT MCK"
        },
        {
            id: "8",
            name: "Cuốn Cho Anh Một Điếu Nữa Đi",
            path: "./IMG/8/y2mate.com - 09 Cuốn Cho Anh Một Điếu Nữa Đi  RPT MCK   99  the album.mp3",
            img: "./IMG/8/CuonChoEm1dieu.PNG",
            album: "",
            author: "RPT MCK"
        },
        {
            id: "9",
            name: "2H",
            path: "./IMG/9/y2mate.com - 2h  MCK.mp3",
            img: "./IMG/9/2H.PNG",
            album: "",
            author: "RPT MCK"
        },
        {
            id: "10",
            name: "Nghe Như Tình Yêu",
            path: "./IMG/10/y2mate.com - Nghe như tình yêu  MCK remixx prod By Kewtiie.mp3",
            img: "./IMG/10/NgheNhuTinhYeu.PNG",
            album: "",
            author: "RPT MCK"
    }],

    //render nhạc
    render: function(){
        const htmls = this.songs.map(music => {
            return `
            <div class="music-item" id="${music.id}" onclick="app.getPath(${music.id})">
            <div class="col-5">
                <div class="music">
                    <div class="img-music">
                        <img src="${music.img}" alt="" class="img-one-music">
                        <i class="bi bi-play-fill play-icon"></i>
                    </div>
                    <div class="info-music">
                        <b>${music.name}</b>
                        <div class="title">${music.author}</div>
                    </div>
                </div>
            </div>
                <div class="col-5">${music.album}</div>
                <div class="col-2" id="time-music-${music.id}"></div>
                <audio id="music${music.id}" src="${music.path}"></audio>
            </div>
            `
        })

        document.getElementById("list-music").innerHTML = htmls.join('')
        this.getTimeMusic()
    },

    //Lấy ra bài hát hiện tại
    defineProperties: function(){
        Object.defineProperty(this, 'currentSong',{
            get:function(){
            return this.songs[this.currentIndex]
            }
        })
    },

    //Tải hình bên dưới
    loadCurrentSong: function(id){
        const load = $(".left-bottom")
        this.songs.forEach(
            music => {
            if(music.id == id){
                load.innerHTML = `
                    <div class="music">
                        <div class="img-music">
                            <img src="${music.img}" alt="" class="img-one-music">
                        </div>
                        <div class="info-music">
                            <b>${music.name}</b>
                            <div class="title">${music.author}</div>
                        </div>
                    </div>
                `
            }
        });
    },

    //Lấy thời gian
    getTimeMusic: function(){
        this.songs.forEach(function(music) {
            var timeMusic = document.getElementById("time-music-"+ music.id)
            var pathMusic = music.path;

            var audio = new Audio(pathMusic)
            audio.addEventListener('loadedmetadata', function(){
                timeMusic.innerHTML = formatTime(audio.duration)
            })
        })
    },  

    //dừng nhạc
    stopMusic: function(path){

        audioElenment.forEach(audio => {
            if(audio.src != path){
                audio.pause();
                audio.currentTime = 0;
            }
        })
    },

    getPath: function(id){
        var path = document.getElementById("music"+id);
        toPath = path;
        if(this.currentIndex == id) this.PlayMusic();
        else if(this.currentIndex != id && dem != false) this.handlePlayMusic();
        this.currentIndex = id;
        dem = true;
        this.eventMusic();
        this.stopMusic(toPath.src);
        this.handleTimeMusiclast()
        this.loadCurrentSong(this.currentIndex);
    },

    //Xử lý thanh thời gian
        
    handleTimeMusiclast:function(){
        var audio = new Audio(toPath.src);
        audio.addEventListener("loadedmetadata", function(){
            $("#timeLast").innerHTML = formatTime(toPath.duration)
            process.setAttribute("max", toPath.duration);
        })

    },

    handleTimeMusicFirst:function(){
        toPath.addEventListener("timeupdate", function(){
            $("#timeFirst").innerHTML = formatTime(toPath.currentTime)
            process.setAttribute("value", toPath.currentTime)
        })
    },

    //Event play and pause
    handlePlayMusic: function(){
        this.eventPlayMusic(toPath)
    },

    handlePauseMusic: function(){
        this.eventPauseMusic(toPath)
    },

    pauseMessage: function(){
        playe.innerHTML = `<i class="bi bi-pause-circle" style = "margin-right: 8px;"></i>TẠM NGƯNG`
        playee.innerHTML = `<img src="./IMG/327092961_756921215716358_372199567178802957_n-1-683x1024.jpg" alt="Lofi" class="img-lofi"><i class="bi bi-pause-circle play-icon"></i>`
    },

    eventPauseMusic: function(eventPause){
        playBtn.style.display = "block"
        pauseBtn.style.display = "none"
        playe.innerHTML = `<i class="bi bi-play-fill" style = "margin-right: 8px;"></i>TIẾP TỤC PHÁT`
        playee.innerHTML = `<img src="./IMG/327092961_756921215716358_372199567178802957_n-1-683x1024.jpg" alt="Lofi" class="img-lofi"><i class="bi bi-play-circle play-icon"></i>`
        eventPause.pause()
    },

    eventPlayMusic: function(eventPlay){
        playBtn.style.display = "none"
        pauseBtn.style.display = "block"
        this.pauseMessage()
        eventPlay.play()
    },

    eventMusic: function(){
        playBtn.addEventListener("mouseup", function(){
            this.eventPlayMusic(toPath)
        })

        pauseBtn.addEventListener("mouseup", function(){
            this.eventPauseMusic(toPath)
        })
    },
    

    

    randomMusic: function(){
        var rd = document.getElementById("random")
        isRandomOn = !isRandomOn
        if(isRandomOn){
            rd.style.color = "#9681EB"
        }else{
            rd.style.color = "white"
        }
    },

    //Xoa nhac
    // deletePlay : function(){
    //     var indexOfMusic = this.randomeID().indexOf(this.currentIndex)
    //     for(var i = indexOfMusic; i < this.randomeID().length -1; i++){
    //         this.randomeID()[i] = this.randomeID()[i+1]
    //     }
    //     this.randomeID().pop()
    // },
    generateRandomIndex: function(){
        let newIndex = Math.floor(Math.random()*this.songs.length) + 1
        // do{
        //     this.newIndex = Math.floor(Math.random()*this.songs.length) + 1
        // }while (generateNumber.indexOf(newIndex) !== -1)
        console.log("" + newIndex)
        return newIndex
    },

    nextToPath: function(){
        if(isRandomOn){
            this.nextToNomal(this.generateRandomIndex())
            
        }else{
            this.nextToNomal(this.currentIndex + 1)
        }
    },

    backToPath: function(){
        if(isRandomOn){
            this.backToNomal(this.generateRandomIndex())
        }else{
            this.backToNomal(this.currentIndex  - 1)
        }
    },

    nextToNomal: function(index){
        this.currentIndex = index;
        if(this.currentIndex >= this.songs.length){
            this.currentIndex = 1;
        }
        this.getPath(this.currentIndex)
        this.eventPlayMusic(toPath)
        this.pauseMessage();
    },

    backToNomal: function(index){
        this.currentIndex = index;
        if(this.currentIndex >= 1){
            this.currentIndex = this.songs.length;
        }
        this.getPath(this.currentIndex)
        this.eventPlayMusic(toPath)
        this.pauseMessage();
    },

    repeatMusic: function(){
        const repeatBtn = document.getElementById("repeat")
        isRepeat = !isRepeat
        if(isRepeat){
            repeatBtn.style.color = "#9681EB"
            setInterval(function(){
                if(toPath.ended){
                    nextBtn.click()
                }
            },1000)
        }else{
            repeatBtn.style.color = "white"
        }
    },
    

    PlayMusic: function(){
        isPlay = !isPlay;
        if(isPlay){
            this.handlePlayMusic()
        }else{
            this.handlePauseMusic()
        }
    },


    start: function(){
        //Dinh Nghia cac thuoc tinh cua object
        this.defineProperties()
        //render playlist
        this.render()
        //su ly cac su kien trong list

        //load currentSong
        this.loadCurrentSong(this.currentIndex)
        //Lay duong dan
        this.getPath(5)
        setInterval(this.handleTimeMusicFirst,1000)
        setInterval(function(){
            if(toPath.ended){
                nextBtn.click()
            }
        }, 1000)
    }
}


app.start()
