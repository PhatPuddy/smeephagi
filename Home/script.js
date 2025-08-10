document.addEventListener("DOMContentLoaded", function () {
    // Get section from the query string, like ?section=prequel
    const params = new URLSearchParams(window.location.search);
    let section = params.get("section");

    if (section) {
        let comic = document.getElementById("comicstrip");
        if (comic) {
            // Build path to the first image in that section
            comic.src = "../../Comics/img/" + section + '/' + section + "1.png";
            console.log("Loaded image:", comic.src);
            
            // Handle when the user clicks a button to change the page
            let pageTurnPrev = document.getElementById("page-turn-prev");
            let pageTurnNext = document.getElementById("page-turn-next");
            // let comic = document.getElementById("comicstrip");
            let i = 1;


            // Get the total count of images per section to know when to gray out the previous/next buttons
            const totalImageCount = {
                "prequel": 17,
                "main": 3
            }
        
            // Previous
            pageTurnPrev.addEventListener('click', function() {
                console.log("Prev i: " + i);
                i = i - 1;

                if (i < totalImageCount[section]){
                        pageTurnNext.style.color = "blue";
                    }
            
                if (i > 0)
                {
                    comic.src = "../../Comics/img/" + section + '/' + section + (i) + ".png";
                }

                // Graying out field if there are no more previous pages
                if (i === 1){
                    pageTurnPrev.style.color = "gray";
                }
            });
        
            // Next
            pageTurnNext.addEventListener('click', function() {
                console.log("Next i: " + i);

                // Graying out field if there are no more next pages
                if (i >= 1){
                    pageTurnPrev.style.color = "blue";
                }

                if (i+1 <= totalImageCount[section]) {
                i = i + 1;
                comic.src = "../../Comics/img/" + section + '/' + section + (i) + ".png";
                }

                // Graying out field if there are no more next pages
                if (i == totalImageCount[section]){
                    pageTurnNext.style.color = "gray";
                }
            });


        } else {
            console.warn("comicstrip element not found on the page.");
        }
    } else {
        console.warn("No section specified in the URL.");
    }


    let savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
        document.body.style.backgroundColor = "black";
        document.body.style.color = "white";
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].innerHTML = "Light Mode";
            buttons[i].style.color = "black";
        }
    } else {
        document.body.style.backgroundColor = "white";
        document.body.style.color = "black";
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].innerHTML = "Dark Mode";
            buttons[i].style.color = "black";
        }
    }


});

let buttons = document.getElementsByClassName("button");
for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function() {
        let mode = buttons[i].innerHTML;
        if (mode === "Dark Mode"){
            document.body.style.backgroundColor = "black";
            buttons[i].innerHTML = "Light Mode";
            buttons[i].style.color = "black";
            document.body.style.color = "white";
            localStorage.setItem("theme", "dark");
        } 
        else if (mode === "Light Mode"){
            document.body.style.backgroundColor = "white";
            buttons[i].innerHTML = "Dark Mode";
            buttons[i].style.color = "black";
            document.body.style.color = "black";
            localStorage.setItem("theme", "light");
        }
    });
}

// Handle logic when someone fills out activities form
let activities = document.getElementById("activities-form");

let activities_submission = document.getElementById("activities-submission");

activities_submission.addEventListener('click', function(event) {
    event.preventDefault();
    const q1 = activities.elements.q1.value;
    const q2 = activities.elements.q2.value;
    const q3 = activities.elements.q3.value;
    const q4 = activities.elements.q4.value;
    const q5 = activities.elements.q5.value;

    const questions = [q1,q2,q3,q4,q5];

    function phaScore(qs){
        pha = 0;

        if (qs[0] > 3){
            pha += 1;
        }

        if (qs[1] < 3){
            pha += 1;
        }

        if (qs[2] < 3){
            pha += 1;
        }

        if (qs[3] > 3){
            pha += 1;
        }

        if (qs[4] < 3){
            pha += 1;
        }

        return pha;
    }

    function smeeScore(qs){
        smee = 0;

        if (qs[0] < 3){
            smee += 1;
        }

        if (qs[1] > 3){
            smee += 1;
        }

        if (qs[2] > 3){
            smee += 1;
        }

        if (qs[3] < 3){
            smee += 1;
        }

        if (qs[4] > 3){
            smee += 1;
        } 

        return smee;
    }

    function giScore(qs){
        gi = 0;

        if (qs[0] < 3){
            gi += 1;
        }

        if (qs[1] < 3){
            gi += 1;
        }

        if (qs[2] > 3){
            gi += 1;
        }

        if (qs[3] < 3){
            gi += 1;
        }

        if (qs[4] < 3){
            gi += 1;
        }

        return gi;
    }

    function getMaxScore(smee, pha, gi){
        if (smee > pha & smee > gi){
            return 'Smee';
        } else if (pha > smee & pha > gi){
            return 'Pha';
        } else if (gi > pha & gi > smee){
            return 'Gi';
        } else {
            return 'Tiebreaker';
        }

    }

    function character (qs) {
            //print_r("$s1 $s2 $s3 $s4 $s5");
            smee = smeeScore(qs);
            pha = phaScore(qs);
            gi = giScore(qs);

            result = getMaxScore(smee, pha, gi);
            return result;
        }

    result = character(questions);

    let result_div = document.getElementById('activities-form-result');

    if (result != 'Tiebreaker'){
        result_div.querySelector('#act-img1').style =  "visibility: hidden";
        result_div.querySelector('#act-img2').style =  "visibility: hidden";
        result_div.querySelector('#act-img3').style =  "visibility: hidden";

        result_div.querySelector('#act-text').innerHTML = `Your spirit animal is ${result}`;
        result_div.querySelector('#act-img2').src =  `../img/${result} Headshot Hover.png`;
    } else {
        result_div.querySelector('#act-text').innerHTML = "Your spirit animal is... all of them! You are a perfect combo of Smee-Pha-Gi!";
        
        result_div.querySelector('#act-img1').style =  "visibility: visible";
        result_div.querySelector('#act-img2').style =  "visibility: visible";
        result_div.querySelector('#act-img3').style =  "visibility: visible";

        result_div.querySelector('#act-img1').src =  `../img/Smee Headshot Hover.png`;
        result_div.querySelector('#act-img2').src =  `../img/Pha Headshot Hover.png`;
        result_div.querySelector('#act-img3').src =  `../img/Gi Headshot Hover.png`;
    }
})






