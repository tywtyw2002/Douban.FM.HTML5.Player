(function(){
    var makeRandomString = function (length) {
        var text = "";
        var possible = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for( var i=0; i < length; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    };

    var doubanfmhtml5 = {
        getRequestData: function(v) {
            if (v != 'n' && v != 'p'){
                console.log("error with value " + v);
                v = 'n';
            }
            return {
                type: v,
                channel: this.channel,
                from: 'mainsite',
                kbps: 192,
                r: makeRandomString(10)
            };
        },

        changeUI: function () {
            this.el = document.getElementById('fm-player');
            this.wrap = $('div.player-wrap').html('加载中...');
            this.channel = -3;
            this.playList('n');
        },

        nextSong: function (){
            //decide is the end of playList
            if (this.songId < this.songList.length) {
                    this.songId += 1;
                    this.playSound();
                } else {
                    console.log('end of list');

                    this.playList('p');
                }
        },


        playSound: function () {
            var that = this;
            var i = this.songId;
            var song = this.songList[i];
            console.log(song);

            if(this.el.mp3 != undefined){
                this.el.mp3.pause();
                this.el.mp3.src=""; //cancel the downloading
            }

            // todo change title of the page
            var html = '<img class="cover" src="'+song.picture+'">';
            var rightPanel = "<span class=\"artist\">" + song.artist +"</span>";
            rightPanel +=  "<span class=\"album\">&lt; " + song.albumtitle + " &gt; " +  song.public_time + "</span>";
            rightPanel +=  "<span class=\"title\">" + song.title + "</span>";
            var cPanel ="";
            if (song.like) {
                cPanel += '<div class="staron"></div>';
            }else{
                cPanel += '<div class="staroff"></div>';
            }
            cPanel += '<div class="trash"></div>';
            cPanel += '<div id="next_song" class="next"></div>';
            html += '<div id="r">'+rightPanel+'</div>';
            html += '<div id="c">'+cPanel+'</div>';
            this.wrap.html(html);

            $("#next_song").click( function() {
                that.reportNext(song.sid);
                that.nextSong();
            });

            $("#staron").click( function() {
                that.likeSong(song.sid);
            });

            $("#staroff").click( function() {
                that.unlikeSong(song.sid);
            });

            $("#trash").click( function() {
                that.byeSong(song.sid);
                that.nextSong();
            });

            var soundfile = song.url;
            this.el.mp3 = new Audio(soundfile);
            this.el.mp3.play();
            $(this.el.mp3).bind('ended', function () {
                that.reportEnd(song.sid);
                that.nextSong();
            });
        },

        byeSong: function(sid){
            var request = {
                type: 'b',
                sid: sid,
                channel: this.channel,
                from: 'mainsite',
                kbps: 192,
                r: makeRandomString(10)
            };
            this.reportSubmit(request);

        },

        likeSong: function(sid){
            var request = {
                type: 'r',
                sid: sid,
                channel: this.channel,
                from: 'mainsite',
                kbps: 192,
                r: makeRandomString(10)
            };
            this.reportSubmit(request);
        },

        unlikeSong: function(sid){
            var request = {
                type: 'u',
                sid: sid,
                channel: this.channel,
                from: 'mainsite',
                kbps: 192,
                r: makeRandomString(10)
            };
            this.reportSubmit(request);

        },

        reportNext: function(sid){
            var request = {
                type: 's',
                sid: sid,
                channel: this.channel,
                from: 'mainsite',
                kbps: 192,
                r: makeRandomString(10)
            };
            this.reportSubmit(request);

        },

        reportEnd: function(sid){
            var request = {
                type: 'e',
                sid: sid,
                channel: this.channel,
                from: 'mainsite',
                kbps: 192,
                r: makeRandomString(10)
            };
            this.reportSubmit(request);
        },

        reportSubmit: function(data){
            var that = this;
            $.ajaxSetup({
                async: false
            });
            $.getJSON('/j/mine/playlist', data, function(ret) {
                if (ret.r !== 0){
                    console.log('report Submit error');
                    console.log(data);
                    
                }else if (ret.song != undefined){
                    that.songList = ret.song;
                    that.songId = -1;
                    
                }
            });
            $.ajaxSetup({
                async: false
            });
        },

        playList: function (v) {
            console.log('playList');
            //var that = this;
            var that = this;
            $.getJSON('/j/mine/playlist', doubanfmhtml5.getRequestData(v), function(ret) {
                if (ret.r !== 0) {
                    alert('get playlist fail');
                    return;
                }
                that.songList = ret.song;
                that.songId = 0;
                that.playSound();
            });
        }
    };
    window.doubanfm = doubanfmhtml5;
    window.doubanfm.changeUI();
    //doubanfmhtml5.changeUI();
})();
