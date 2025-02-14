class MusicPlayer {
    constructor() {
        this.audio = new Audio();
        this.playlist = [];
        this.currentTrackIndex = 0;
        this.isPlaying = false;

        // 初始化播放列表
        this.playlist = [
            {
                title: "Follow (Single Version)",
                artist: "梨冻紧、Wiz_H张子豪",
                url: "music/梨冻紧、Wiz_H张子豪《Follow》_(Single_Version)-醉美谋女郎-356072632-128.mp3",
                cover: "picture/微信图片_20250213211512.jpg"
            },
            {
                title: "暮色回响",
                artist: "吉星出租",
                url: "music/暮色回响-吉星出租-374636096-100.mp3",
                cover: "picture/微信图片_20250213211526.jpg"
            },
            {
                title: "你的名字 - 三叶的主题",
                artist: "豆沙团子AnDango",
                url: "music/你的名字_-_三叶的主题-豆沙团子AnDango-321468558-100.mp3",
                cover: "picture/微信图片_20250213211527.jpg"
            },
            {
                title: "有爱就不怕",
                artist: "洋澜一",
                url: "music/有爱就不怕-洋澜一-434777801-100.mp3",
                cover: "picture/微信图片_20250213211533.jpg"
            },
            {
                title: "Shadow of the Sun",
                artist: "Alexer Lyton",
                url: "music/Shadow_of_the_Sun-Alexer_Lyton-253656487-128.mp3",
                cover: "picture/微信图片_202502132115331.jpg"
            },
            {
                title: "The truth that you leave",
                artist: "Pianoboy高至豪",
                url: "music/The_truth_that_you_leave-Pianoboy高至豪-1600367-100.mp3",
                cover: "picture/d8479efd-5088-406c-8327-0dcca16f3223.png"
            }
        ];

        this.initializeEventListeners();
        // 初始化时更新第一首歌曲信息
        this.updateTrackInfo();
    }

    initializeEventListeners() {
        // 音频进度更新
        this.audio.addEventListener('timeupdate', () => {
            const progress = (this.audio.currentTime / this.audio.duration) * 100;
            document.getElementById('progress').value = progress;
        });

        // 音频结束时播放下一首
        this.audio.addEventListener('ended', () => {
            this.playNext();
        });

        // 音频加载错误处理
        this.audio.addEventListener('error', (e) => {
            console.error('音频加载错误:', e);
            alert('音频加载失败，请检查音频文件是否存在');
        });

        // 添加音频加载状态监听
        this.audio.addEventListener('loadstart', () => {
            console.log('开始加载音频...');
        });

        this.audio.addEventListener('canplay', () => {
            console.log('音频已准备好播放');
        });
    }

    play() {
        if (!this.playlist.length) return;
        
        const currentTrack = this.playlist[this.currentTrackIndex];
        if (this.audio.src !== currentTrack.url) {
            this.audio.src = currentTrack.url;
            this.updateTrackInfo();
        }
        
        this.audio.play();
        this.isPlaying = true;
        document.getElementById('playButton').innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>`;
    }

    pause() {
        this.audio.pause();
        this.isPlaying = false;
        document.getElementById('playButton').innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>`;
    }

    togglePlay() {
        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    }

    playNext() {
        this.currentTrackIndex = (this.currentTrackIndex + 1) % this.playlist.length;
        this.play();
    }

    playPrevious() {
        this.currentTrackIndex = (this.currentTrackIndex - 1 + this.playlist.length) % this.playlist.length;
        this.play();
    }

    updateTrackInfo() {
        const currentTrack = this.playlist[this.currentTrackIndex];
        document.getElementById('songTitle').textContent = currentTrack.title;
        document.getElementById('artistName').textContent = currentTrack.artist;
        document.getElementById('albumCover').src = currentTrack.cover;
    }

    setVolume(value) {
        this.audio.volume = value / 100;
    }

    setProgress(value) {
        const time = (value / 100) * this.audio.duration;
        this.audio.currentTime = time;
    }
} 