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

function formatTime(time){
    var minutes = Math.floor(time/60)
    var remainSecond = Math.floor(time%60)
    var formattedTime = (minutes < 10 ? '0':'')+minutes+':'+(remainSecond < 10 ? "0": '') + remainSecond;
    return formattedTime
}


const app = {

    currentIndex: "",

    songs: [
        {
            id: "1",
            name: "Tại Vì Sao",
            path: "./IMG/1/y2mate.com - 11Tại Vì Sao  RPT MCK  99 the album.mp3",
            img: "./IMG/1/TaiViSao.jpg",
            album: "",
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
        const audioElenment = $$("audio")

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
        this.loadCurrentSong(this.currentIndex);
    },

    handlePlayMusic: function(){
        this.eventPlayMusic(toPath)
    },

    handlePauseMusic: function(){
        this.eventPauseMusic(toPath)
    },

    pauseMusic: function(){
        playe.innerHTML = `<i class="bi bi-pause-circle" style = "margin-right: 8px;"></i>"TIEP TUC PHAT"`
        playee.innerHTML = `<img src="./IMG/327092961_756921215716358_372199567178802957_n-1-683x1024.jpg" alt="Lofi" class="img-lofi"><i class="bi bi-pause-circle play-icon"></i>`
    },

    eventPauseMusic: function(eventPause){
        playBtn.style.display = "block"
        pauseBtn.style.display = "none"
        playe.innerHTML = `<i class="bi bi-play-fill" style = "margin-right: 8px;"></i>"TIEP TUC PHAT"`
        playee.innerHTML = `<img src="./IMG/327092961_756921215716358_372199567178802957_n-1-683x1024.jpg" alt="Lofi" class="img-lofi"><i class="bi bi-play-circle play-icon"></i>`
        eventPause.pause()
    },

    eventPlayMusic: function(eventPlay){
        playBtn.style.display = "none"
        pauseBtn.style.display = "block"
        eventPlay.play()
    },

    eventMusic: function(){
        playBtn.addEventListener("mouseup", function(){
            this.eventPlayMusic(toPath)
        })

        pauseBtn.addEventListener("mousedown", function(){
            this.eventPauseMusic(toPath)
        })
    },

    PlayMusic: function(){
        isPlay = !isPlay;
        if(isPlay){
            this.handlePlayMusic()
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
        this.getPath(5
)
    }
}


app.start()
