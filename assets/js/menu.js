function menuShow() {
    let menuMobile = document.querySelector('.mobile-menu');
    if (menuMobile.classList.contains('open')) {
        menuMobile.classList.remove('open');
        document.querySelector('.icon').src = "assets/images/menu.svg";
    } else {
        menuMobile.classList.add('open');
        document.querySelector('.icon').src = "assets/images/close.svg";
    }
}

function changeImageTimeline() {
        if (window.innerWidth <= 1100) {
            document.querySelector('#image-change').src = 'assets/images/timeline-awards-mobile.png';
        } else {
            document.querySelector('#image-change').src = 'assets/images/timeline-awards.png';
        }
    }
    
    window.onload = changeImageTimeline;
    window.onresize = changeImageTimeline;