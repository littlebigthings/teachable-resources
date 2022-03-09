window._wq = window._wq || [];
_wq.push({ id: "n49frfp9tf", onReady: function(video) {
    let playBtn = document.querySelector(".play-button");
    let pauseBtn = document.querySelector(".pause-button");
    let videoWrapper = document.querySelector(".video-btn-wrap");
    if((playBtn != undefined || playBtn != null) && (pauseBtn != undefined || pauseBtn != null)){
        pauseBtn.style.display = "none";
        playBtn.addEventListener("click", () => {
            playBtn.style.display = "none";
            pauseBtn.style.display = "block";
            video.play();
        })
        pauseBtn.addEventListener("click", () => {
            pauseBtn.style.display = "none";
            playBtn.style.display = "block";
            video.pause();
        })
    }
    video.bind("play", function() {
        playBtn.style.display = "none";
        pauseBtn.style.display = "block";
      });
    
      video.bind("pause", function() {
        pauseBtn.style.display = "none";
        playBtn.style.display = "block";
      });

      video.bind("end", function() {
        pauseBtn.style.display = "none";
      playBtn.style.display = "block";
    });

    videoWrapper.addEventListener("mouseover", () => {
        let state = video.state();
        if(state === "playing"){
            pauseBtn.style.display = "block";
        }
        else if(state === "paused"){
            playBtn.style.display = "block";
        }
        else if(state === "ended"){
            playBtn.style.display = "block"
        }
    })

    videoWrapper.addEventListener("mouseout", () => {
        let state = video.state();
        if(state === "playing"){
            pauseBtn.style.display = "none";
        }
        else if(state === "paused"){
            playBtn.style.display = "block";
        }
        else if(state === "ended"){
            playBtn.style.display = "none"
        }
    })

    window.addEventListener("scroll", () => {
        if (!isInViewport(videoWrapper)) {
            video.pause();
        }
    })
    
}});

//function to check the section comes into view.
function isInViewport(secEle) {
    var elementTop = $(secEle).offset().top;
    var elementBottom = elementTop + $(secEle).outerHeight();
    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();
    return elementBottom > viewportTop && elementTop < viewportBottom;
}