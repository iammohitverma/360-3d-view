let reel_wrap_mv = document.querySelector(".reel_wrap_mv");
let image_box_reel = document.querySelector(".image_box_reel");
let image_box_reel_img = document.querySelector(".image_box_reel .reel_img");
let image_box_reel_left_btn = document.querySelector(".reel_wrap_mv .left_btn");
let image_box_reel_right_btn = document.querySelector(".reel_wrap_mv .right_btn");

let defaultPath = "./img/car/img_";
let defaultExt = ".jpg";
let imgCount = 1;
let imgMaxLength = 35;

// prev btn click function
function reelPrev(e) {
    imgCount = (imgCount < imgMaxLength) ? imgCount += 1 : 1;
    setImage();
}
image_box_reel_left_btn?.addEventListener("click", reelPrev);

// next btn click function
function reelNext(e) {
    imgCount = (imgCount > 1) ? imgCount -= 1 : imgMaxLength;
    setImage();
}
image_box_reel_right_btn?.addEventListener("click", reelNext);

// set image function
function setImage(e) {
    image_box_reel_img.setAttribute("src", `${defaultPath}${imgCount}${defaultExt}`);
}

// autorotate animation
let autoRotateInterval;
function autoRotateFun(e) {
    autoRotateInterval = setInterval(autoRotateAnim, 100);
    function autoRotateAnim(e) {
        imgCount = (imgCount > 1) ? imgCount -= 1 : imgMaxLength;
        setImage();
    }
}
autoRotateFun();

/************* */
// for desktop 
/**************/
let initClientX, moveClientX, clientXdiffer, speed = 5, dynSpeed, lastClientX, directionStatus, lastDirectionStatus;
// mousedown start
image_box_reel.addEventListener("mousedown", mousedownFun);
function mousedownFun(e) {
    clearInterval(autoRotateInterval);
    initClientX = e.clientX;
    dynSpeed = speed;
    image_box_reel.addEventListener("mousemove", mousemoveFun);
}

// mouseMove start when mouse down
function mousemoveFun(e) {
    moveClientX = e.clientX;
    clientXdiffer = moveClientX - initClientX;

    // check when suddenly changing direction while moving
    if (moveClientX < lastClientX) {
        directionStatus = "left";
    } else if (moveClientX > lastClientX) {
        directionStatus = "right";
    }

    if (directionStatus !== lastDirectionStatus) {
        dynSpeed = speed;
        initClientX += clientXdiffer;
    }

    if ((clientXdiffer > dynSpeed) && (directionStatus == "right")) {
        dynSpeed += speed;
        imgCount = (imgCount > 1) ? imgCount -= 1 : imgMaxLength;
        setImage();
    } else if ((clientXdiffer < "-" + dynSpeed) && (directionStatus == "left")) {
        dynSpeed += speed;
        imgCount = (imgCount < imgMaxLength) ? imgCount += 1 : 1;
        setImage();
    };

    lastClientX = moveClientX;
    lastDirectionStatus = directionStatus;
}

// mouseup start (in this fun remove mousemove also)
image_box_reel.addEventListener("mouseup", mouseupFun);
function mouseupFun(e) {
    image_box_reel.removeEventListener("mousemove", mousemoveFun, false);
}

// mouseout start (when mouse leave from an element)
image_box_reel.addEventListener("mouseout", mouseoutFun);
function mouseoutFun(e) {
    image_box_reel.removeEventListener("mousemove", mousemoveFun, false);
}

/***********************/
// for touchable devices 
/***********************/
// touch events work only for touchable devices eg: tab, mobiles
// touchstart function start
image_box_reel.addEventListener("touchstart", touchstartFun);
function touchstartFun(e) {
    initClientX = e.touches[0].clientX;
    dynSpeed = speed;
    clearInterval(autoRotateInterval);
}

// touchmove function start
image_box_reel.addEventListener("touchmove", touchmoveFun);
function touchmoveFun(e) {
    moveClientX = e.touches[0].clientX;
    clientXdiffer = moveClientX - initClientX;

    // check when suddenly changing direction while moving
    if (moveClientX < lastClientX) {
        directionStatus = "left";
    } else if (moveClientX > lastClientX) {
        directionStatus = "right";
    }

    if (directionStatus !== lastDirectionStatus) {
        dynSpeed = speed;
        initClientX += clientXdiffer;
    }

    if ((clientXdiffer > dynSpeed) && (directionStatus == "right")) {
        dynSpeed += speed;
        imgCount = (imgCount > 1) ? imgCount -= 1 : imgMaxLength;
        setImage();
    } else if ((clientXdiffer < "-" + dynSpeed) && (directionStatus == "left")) {
        dynSpeed += speed;
        imgCount = (imgCount < imgMaxLength) ? imgCount += 1 : 1;
        setImage();
    };

    lastClientX = moveClientX;
    lastDirectionStatus = directionStatus;
}

// touchend function start
image_box_reel.addEventListener("touchend", touchendFun);
function touchendFun(e) {
    // console.log("touchend");
}