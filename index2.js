var prevScroll = window.pageYOffset;
window.onscroll = function () {
    var currScroll = window.pageYOffset;
    if (prevScroll > currScroll) {
        document.getElementsByClassName("navbar")[0].style.top = "0";
        document.getElementsByClassName("navbar")[0].style.transition = "0.5s";
    }
    else {
        document.getElementsByClassName("navbar")[0].style.top = "-100px";
        document.getElementsByClassName("navbar")[0].style.transition = "0.5s";
    }
    prevScroll = currScroll;
}

allContent = [];

window.onload = () => {

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // data = JSON.parse(xhttp.response);
            x = this.responseText;
            Data = JSON.parse(x);
            cards = " ";
            for (let i = 0; i < Data.length; i++) {
                cards += `
                <div class="mySlides">    
                    <div class="card" data-genre=${Data[i].genre} data-id=${Data[i].id}>
                        <img class="card-img-top" id="img" src=${Data[i].img} alt="" />
                        <div class="card-body">
                            <audio id="myaudio">
                                <source id="src" src=${Data[i].link} type="audio/ogg" />
                                <source id="src2" src=${Data[i].link} type="audio/mpeg" />
                            </audio>
                            <h4 id="name">${Data[i].name}</h4>
                            <h5>${Data[i].artist}</h5>
                            <div id="time">
                            <p id="setTime"></p>
                            <p id="Duration"></p>
                            </div>
                            <input type="range" name="seek" min="0" onchange="updateseekertime(this)" id="seek" />
                            <br />
                            <div id="controls" class="buttons">
                            <i class="fas fa-step-backward" onclick="backward(this,${i},)"></i>
                            <i id="play" class="fas fa-play-circle" onclick="media(this,${i})"></i>
                            <i class="fas fa-step-forward" onclick="forward(this,${i})"></i>
                            </div>
                            <br />
                            <input type="range" name="seek" min="0" onchange="updateseekervolume(this)" id="seek2" />
                            <i class="fas fa-volume-up" id="vol" onclick="volume(this)"></i>
                        </div>
                    </div>
                </div>
            `
            }
            var div = document.getElementById("box");
            div.innerHTML = cards;

            var buttomPlayer = " ";
            buttomPlayer += `
            <div id="bottom-player" >

                <input type="range" name="seek3" onchange="updatebottomseekertime(this)" min="0" id="bs"/>
                <div id="btm-controls">
                    <div>
                    <h3 id="setName">${Data[0].name}</h3>
                    </div>
                    <div id="controls" class="buttons2">
                        <i class="fas fa-step-backward" onclick="bottomBackward(this)"></i>
                        <i id="play2" class="fas fa-play-circle" onclick="bottomMedia(this)"></i>
                        <i class="fas fa-step-forward" onclick="bottomForward(this)"></i>
                    </div>
                </div>
            </div>
            `
            document.body.innerHTML += buttomPlayer;

            var ele = document.querySelectorAll(".mySlides .card");
            console.log(ele[0])
            for (let i = 0; i < ele.length; i++) {
                console.log(1);
                allContent.push(ele[i]);
            }



        }
    }

    xhttp.open("GET", "Data.json", true);
    xhttp.send();

}

console.log(allContent);

function genre(e) {
    var genre = e.id;
    console.log(genre);
    allContent = [];
    var ele = document.querySelectorAll(".mySlides .card");
    for (let i = 0; i < ele.length; i++) {
        // allContent.push(ele[i]);
        ele[i].style.display = "block";

    }
    for (let i = 0; i < ele.length; i++) {
        // allContent.push(ele[i]);
        if (genre == "Remove") {
            for (let i = 0; i < ele.length; i++) {
                // allContent.push(ele[i]);
                ele[i].style.display = "block";
            }
        }
        else {
            console.log(ele[i].dataset.genre)
            if (ele[i].dataset.genre != genre) {
                ele[i].style.display = "none";
            }
        }

    }

}


function search() {
    var str = document.querySelector("#search").value.toLowerCase();
    allContent = [];
    console.log(str);
    var ele = document.querySelectorAll(".mySlides .card");
    for (let i = 0; i < ele.length; i++) {
        allContent.push(ele[i]);
    }

    for (let i = 0; i < allContent.length; i++) {
        var tracks = allContent[i].querySelector(".card-body");
        console.log(tracks);
        console.log(tracks.textContent);
        let txtValue = tracks.textContent || tracks.innerText;
        if (txtValue.toLowerCase().indexOf(str) > -1) {
            allContent[i].style.display = "";
        } else {
            allContent[i].style.display = "none";
        }
    }
}

function bottomMedia(e) {
    //allContent = [];
    var cls = e.className;
    console.log(cls);
    // var ele = document.querySelectorAll(".mySlides .card");
    // for (let i = 0; i < ele.length; i++) {
    //     allContent.push(ele[i]);
    // }
    var div = e.parentElement.parentElement;
    var name = div.querySelector("#setName").innerHTML;
    var len = allContent.length;
    for (let i = 0; i < allContent.length; i++) {
        var song = allContent[i].querySelector(".card-body #name").innerHTML;
        if (song == name) {
            if (cls == "fas fa-play-circle") {
                allContent[i].querySelector(".card-body #controls #play").click();
                e.className = "fas fa-pause";
            }
            if (cls == "fas fa-pause") {
                allContent[i].querySelector(".card-body #controls #play").click();
                e.className = "fas fa-play-circle";
            }

        }
    }
}

function bottomForward(e) {
    // allContent = [];
    // var ele = document.querySelectorAll(".mySlides .card");
    // for (let i = 0; i < ele.length; i++) {
    //     allContent.push(ele[i]);
    // }
    var div = e.parentElement.parentElement;
    var name = div.querySelector("#setName").innerHTML;
    var len = allContent.length;
    for (let i = 0; i < allContent.length; i++) {
        var song = allContent[i].querySelector(".card-body #name").innerHTML;
        if (song == name) {
            if (i == len - 1) {
                allContent[0].querySelector(".card-body #controls #play").click();
                let getName = allContent[0].querySelector(".card-body #name").innerHTML;
                div.querySelector("#setName").innerHTML = getName;
                //div.querySelector("#setName").innerHTML = getName;    
            }
            else {
                allContent[i + 1].querySelector(".card-body #controls #play").click();
                let getName = allContent[i + 1].querySelector(".card-body #name").innerHTML;
                div.querySelector("#setName").innerHTML = getName;

            }
        }
    }
}

function bottomBackward(e) {
    // allContent = [];
    // var ele = document.querySelectorAll(".mySlides .card");
    // //console.log(ele[0].innerHTML)
    // for (let i = 0; i < ele.length; i++) {
    //     allContent.push(ele[i]);
    // }
    var div = e.parentElement.parentElement;
    var name = div.querySelector("#setName").innerHTML;
    var len = allContent.length;

    var currDiv;
    for (let i = 0; i < allContent.length; i++) {
        console.log(allContent[i])
        if (allContent[i].querySelector(".card-body #name").innerHTML == name) {
            currDiv = allContent[i];
            console.log(currDiv)
        }
    }
    var currTrack = currDiv.querySelector(".card-body #myaudio");
    var currTime = currTrack.currentTime;
    for (let i = 0; i < allContent.length; i++) {
        var song = allContent[i].querySelector(".card-body #name").innerHTML;
        if (song == name) {
            if (i == 0) {
                if (currTime > 5) {
                    currTrack.currentTime = 0;
                    currTrack.play();
                    currDiv.querySelector(".card-body #controls #play").className = "fas fa-pause";
                }
                else {
                    allContent[len - 1].querySelector(".card-body #controls #play").click();
                    let getName = allContent[len - 1].querySelector(".card-body #name").innerHTML;
                    div.querySelector("#setName").innerHTML = getName;
                }
            }
            else {
                if (currTime > 5) {
                    currTrack.currentTime = 0;
                    currTrack.play();
                    currDiv.querySelector(".card-body #controls #play").className = "fas fa-pause";
                }
                else {
                    allContent[i - 1].querySelector(".card-body #controls #play").click();
                    let getName = allContent[i - 1].querySelector(".card-body #name").innerHTML;
                    div.querySelector("#setName").innerHTML = getName;
                }
            }
        }
    }
}

function forward(e, n) {
    // document.getElementsByClassName("card")[0].innerHTML;
    allDivs = [];
    var currDiv = e.parentElement.parentElement.parentElement;
    console.log(currDiv);
    currDiv.querySelector(".card-body #controls #play").className = "fas fa-play-circle";
    var currTrack = currDiv.querySelector(".card-body #myaudio");
    currTrack.currentTime = 0;
    var div = e.parentElement.parentElement.parentElement.parentElement.parentElement;
    console.log(div);
    var ele = div.querySelectorAll(".mySlides .card");
    //console.log(ele[0].innerHTML)
    for (let i = 0; i < ele.length; i++) {
        allDivs.push(ele[i]);
    }
    console.log(allDivs);
    var len = allDivs.length;
    if (n == len - 1) {
        var nextDiv = allDivs[0];
        // var track = nextDiv.querySelector(".card-body #myaudio");
        var track = nextDiv.querySelector(".card-body #controls #play");
        console.log(track);
        track.click();
        console.log(track);
        console.log(nextDiv);
    }
    else {

        var nextDiv = allDivs[n + 1];
        console.log(nextDiv);
        // var track = nextDiv.querySelector(".card-body #myaudio");
        var track = nextDiv.querySelector(".card-body #controls #play");
        console.log(track);
        track.click();
        console.log(track);
        console.log(nextDiv);
    }
}
function backward(e, n) {
    // document.getElementsByClassName("card")[0].innerHTML;
    allDivs = [];
    var currDiv = e.parentElement.parentElement.parentElement;
    console.log(currDiv);
    var currTrack = currDiv.querySelector(".card-body #myaudio");
    var currTime = currTrack.currentTime;
    var div = e.parentElement.parentElement.parentElement.parentElement.parentElement;
    console.log(div);
    var ele = div.querySelectorAll(".mySlides .card");
    //console.log(ele[0].innerHTML)
    for (let i = 0; i < ele.length; i++) {
        allDivs.push(ele[i]);
    }
    console.log(allDivs);

    if (n == 0) {

        if (currTime > 5) {
            currTrack.currentTime = 0;
            currTrack.play();
            currDiv.querySelector(".card-body #controls #play").className = "fas fa-pause";
        }
        else {
            currDiv.querySelector(".card-body #controls #play").className = "fas fa-play-circle";
            var len = allDivs.length;
            var nextDiv = allDivs[len - 1];
            console.log(nextDiv);
            // var track = nextDiv.querySelector(".card-body #myaudio");
            var track = nextDiv.querySelector(".card-body #controls #play");
            console.log(track);
            track.click();
            console.log(track);
            console.log(nextDiv);
        }

    }
    else {
        if (currTime > 5) {
            currTrack.currentTime = 0;
            currTrack.play();
            currDiv.querySelector(".card-body #controls #play").className = "fas fa-pause";
        }
        else {
            currDiv.querySelector(".card-body #controls #play").className = "fas fa-play-circle";
            var nextDiv = allDivs[n - 1];
            // var track = nextDiv.querySelector(".card-body #myaudio");
            var track = nextDiv.querySelector(".card-body #controls #play");
            console.log(track);
            track.click();
            console.log(track);
            console.log(nextDiv);
        }
    }

}

function media(e, val) {
    console.log(e.parentElement.parentElement);
    let div = e.parentElement.parentElement;
    let name = div.querySelector("#name").innerHTML;
    document.getElementById("setName").innerHTML = name;
    let track = div.querySelector("#myaudio");
    let btn = div.querySelector("#play");
    let allsongs = document.querySelectorAll(".mySlides");
    for (let i = 0; i < allsongs.length; i++) {
        if (val != i) {
            allsongs[i].querySelector("#myaudio").pause();
            allsongs[i].querySelector("#myaudio").currentTime = 0;
            allsongs[i].querySelector("#play").className = "fas fa-play-circle";
        }
    }
    console.log(track.paused)
    if (track.paused == true) {
        track.play();
        //console.log(div);
        //console.log(track);
        updatetime = setInterval(function () {
            var track = div.querySelector("#myaudio");
            //console.log(div);
            //console.log(track);
            let getTime = track.currentTime;
            let getDuration = track.duration;
            let min = Math.floor(getTime / 60);
            let sec = parseInt(getTime - (min * 60));
            div.querySelector("#setTime").innerHTML = min + ":" + sec;
            let min2 = Math.floor(getDuration / 60);
            let sec2 = parseInt(getDuration - (min2 * 60));
            //console.log(min2,sec2)
            div.querySelector("#Duration").innerHTML = min2 + ":" + sec2;
        }, 1000);
        let vol = track.volume;
        div.querySelector("#seek2").value = vol;
        btn.className = "fas fa-pause";
        document.querySelector("#play2").className = "fas fa-pause";
        seekerUpdate = setInterval(function () {
            //console.log("running");
            let seeker = div.querySelector("#seek");
            let track = div.querySelector("#myaudio");
            let currtime = parseInt(track.currentTime);
            let duration = parseInt(track.duration);
            let time = parseInt((currtime * 100) / duration);
            seeker.value = time;
            console.log(name);
            let currName = div.querySelector("#name").innerHTML;
            if (document.getElementById("setName").innerHTML == currName) {
                let btmseeker = document.querySelector("#bs");
                console.log(btmseeker);
                btmseeker.value = time;
            }

        }, 500);
    }
    else {
        function haltFunction() {
            clearInterval(updatetime);
            clearInterval(seekerUpdate);
            console.log(34)
        }
        track.pause();
        haltFunction();
        btn.className = "fas fa-play-circle";
        document.querySelector("#play2").className = "fas fa-play-circle";
    }
}
function updateseekertime(e) {
    console.log(e.parentElement);
    let div = e.parentElement;
    let value = div.querySelector("#seek").value;
    console.log(value);

    let track = div.querySelector("#myaudio");
    let duration = parseInt(track.duration);
    console.log(duration);
    let time = parseInt((duration * value) / 100);
    track.currentTime = time;

    let cardName = div.querySelector("#name").innerHTML;
    let btmName = document.querySelector("#setName").innerHTML;
    if (cardName == btmName) {
        console.log(cardName, btmName);
        let btmseeker = document.querySelector("#bs");
        btmseeker.value = value;
    }

}

function updatebottomseekertime(e) {
    allContent = [];
    var ele = document.querySelectorAll(".mySlides .card");
    for (let i = 0; i < ele.length; i++) {
        allContent.push(ele[i]);
    }
    var div = e.parentElement.parentElement;
    var val = document.querySelector("#bs").value;
    console.log(val)
    var name = div.querySelector("#setName").innerHTML;
    for (let i = 0; i < allContent.length; i++) {
        var song = allContent[i].querySelector(".card-body #name").innerHTML;
        if (song == name) {
            let track = allContent[i].querySelector("#myaudio");
            let duration = parseInt(track.duration);
            console.log(duration);
            let time = parseInt((duration * val) / 100);
            track.currentTime = time;
            allContent[i].querySelector(".card-body #seek").value = val;
            // allContent[i].querySelector(".card-body #myaudio").currentTime = val;
            console.log("out")

        }
    }
}

// axios
//     .get("Data.json")
//     .then(response => {
//         console.log(response.data);
//         arr = response.data;
//         console.log(arr);
//     }
//     )
//     .catch(error => console.error(error));



function volume(e) {
    var div = e.parentElement;
    var volume = div.querySelector("#vol");
    let track = div.querySelector("#myaudio");
    if (volume.className == "fas fa-volume-up") {
        volume.className = "fas fa-volume-mute";
        track.volume = 0.0;

    }
    else {
        volume.className = "fas fa-volume-up";
        track.volume = 0.7;
    }
}

function updateseekervolume(e) {
    var div = e.parentElement;
    var volume = div.querySelector("#vol");
    let track = div.querySelector("#myaudio");
    let seek2 = div.querySelector("#seek2").value;
    var vol = (seek2 * 0.01).toFixed(1);
    console.log(vol);
    track.volume = vol;
    if (vol == 0) {
        volume.className = "fas fa-volume-mute";
    }
    else {
        volume.className = "fas fa-volume-up";
    }

}



