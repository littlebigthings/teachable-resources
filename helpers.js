function isOnMobile() {
  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  ) {
    return true;
  }
  return false;
}

function isInViewport(secEle) {
  if(secEle != undefined){
    var elementTop = $(secEle).offset().top;
    var elementBottom = elementTop + $(secEle).outerHeight();
    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();
    return elementBottom > viewportTop && elementTop < viewportBottom;
  }else{
    return false;
  }
}

export { isOnMobile, isInViewport };
