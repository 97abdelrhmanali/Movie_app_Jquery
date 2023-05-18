let latest = "https://api.themoviedb.org/3/movie/latest?api_key=eba8b9a7199efdcb0ca1f96879b83c44&language=en-US"
let popular = "https://api.themoviedb.org/3/movie/popular?api_key=eba8b9a7199efdcb0ca1f96879b83c44&language=en-US&page=1"
let nowPlaying = "https://api.themoviedb.org/3/movie/now_playing?api_key=eba8b9a7199efdcb0ca1f96879b83c44&language=en-US&page=1"
let topRated = "https://api.themoviedb.org/3/movie/top_rated?api_key=eba8b9a7199efdcb0ca1f96879b83c44&language=en-US&page=1"
let upcoming ="https://api.themoviedb.org/3/movie/upcoming?api_key=eba8b9a7199efdcb0ca1f96879b83c44&language=en-US&page=1"
let trending ="https://api.themoviedb.org/3/trending/all/day?api_key=eba8b9a7199efdcb0ca1f96879b83c44"
let img = "https://image.tmdb.org/t/p/w500"
let allfilms = new Map()
let arr = [popular , nowPlaying , topRated , upcoming , trending]

$(document).ready(function () {
    $(".loadingScreen").fadeOut(1000);
})
let width = $(".sideBar .navTab").outerWidth();

function openSideNav() {
    $(".sideBar").animate({left : "0px"})
    for (let i = 0; i < 6; i++) {
        $(".sideBar .navTab .links ul li").eq(i).animate({top:"0px"},(i+3)*100)
    }
    $(".sideBar .navHeader .fa-bars").addClass("d-none");
    $(".sideBar .navHeader .fa-times").removeClass("d-none");
}


function closeSideNav(){
    $(".sideBar").animate({left : -width})
    $(".sideBar .navTab .links ul li").animate({top:"300px"},500)
    $(".sideBar .navHeader .fa-times").addClass("d-none");
    $(".sideBar .navHeader .fa-bars").removeClass("d-none");
}

///////////////////////// sidebar /////////////////////////////////////

$(".sideBar").css("left",-width)
$(".sideBar .navTab .links ul li").css("top","300px")

$(".sideBar .navHeader .fa-bars").click(function () {
    openSideNav()
})


$(".sideBar .navHeader .fa-times").click(function () {
    closeSideNav()
})



async function showitems(x){
    $(".container .films").html("")
    const api = await fetch(x)
    let response = await api.json();
    // console.log(response)


    let bank =""
    for (let i = 0; i < response.results.length; i++) {
        bank += `<div class="col-md-6 col-lg-4 my-3 myM  shadow px-3">
        <div class="position-relative movie">
            <div>
                <img src="https://image.tmdb.org/t/p/w500/${response.results[i].poster_path}" width="100%" alt="">
            </div>
            <div class="filmsOvarlay d-flex align-items-center py-5">
                <div class="my-5">
                    <h2 class="mb-2">${response.results[i].original_title}</h2>
                    <p class="mb-2">${response.results[i].overview}</p>
                    <p class="mb-2">rated:  <span>${response.results[i].vote_average}</span></p> 
                    <p class="mb-2"></p>${response.results[i].release_date}</p>
                </div>
                
            </div>
        </div>
        </div>`

        // if(allfilms.has(response.results[i].original_title) == false){
        //     allfilms.set(response.results[i].original_title.toLowerCase() , response.results[i])
        // }
        
    }

    $(".container .films").html(bank)
}

showitems(nowPlaying)



$(".sideBar .links li").click(function () {
    console.log($(this).attr("id"))
    if($(this).attr("id") == "nPlay")
        showitems(nowPlaying)
    else if($(this).attr("id") == "pop")
        showitems(popular)
    else if($(this).attr("id") == "top")
        showitems(topRated)
    else if($(this).attr("id") == "trend")
        showitems(trending)
    else if($(this).attr("id") == "upcome")
        showitems(upcoming) 
})


let emailReq = /^\w+@[a-zA-Z]+[.]{1}[a-zA-Z]{2,3}$/
let namereq = /[A-Za-z]+/
let phonereq = /^(01)[0125]\d{8}/
let agereq = /[1-9][0-9]?$|^100/
let passreq = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8}$/;
let pass
let namebool = false
let emailbool = false
let phonebool = false
let agebool = false
let passbool = false
let repassbool = false


$(".contact input").click(function (){
    $(this).next().removeClass("d-none")
})

$(".contact .formName").keyup(function () { 
    if(namereq.test($(this).val())){
        $(".contact .name").addClass("d-none")
        namebool = true
    }

    else{
        namebool = false
        $(this).next().removeClass("d-none")
    }

});


$(".contact .formEmail").keyup(function () { 
    if(emailReq.test($(this).val())){
        $(".contact .email").addClass("d-none")
        emailbool = true
    }

    else{
        emailbool = false
        $(this).next().removeClass("d-none")
    }
});


$(".contact .formPhone").keyup(function () { 
    if(phonereq.test($(this).val())){
        $(this).next().addClass("d-none")
        phonebool = true
    }

    else{
        phonebool = false
        $(this).next().removeClass("d-none")
    }
});


$(".contact .formAge").keyup(function () { 
    if(agereq.test($(this).val())){
        $(this).next().addClass("d-none")
        agebool = true
    }

    else{
        $(this).next().removeClass("d-none")
        agebool = false
    }
        
});


$(".contact .formPass").keyup(function () { 
    if(passreq.test($(this).val())){
        $(this).next().addClass("d-none")
        pass = $(this).val()
        passbool = true
    }

    else{
        $(this).next().removeClass("d-none")
        pass = ""
        passbool = false
    }
        
});

$(".contact .formRePass").keyup(function () { 

    if($(this).val() == pass){
        $(this).next().addClass("d-none")
        repassbool = true
    }

    else
        {$(this).next().removeClass("d-none")
        repassbool = false
    }
});



$(".contact").click(function(){
    console.log(namebool + "-" +emailbool + "-" +passbool + "-" +phonebool + "-"+repassbool + "-"+agebool + "-")

    if(namebool == true && emailbool == true && phonebool == true && agebool == true && passbool == true && repassbool == true ){
        $(".contact .btn").removeClass("disabled")
        console.log("ssuc")
    }

    else
        $(".contact .btn").addClass("disabled")
})


$(".sideBar .links .cont").click(function () {
    location.href = "#contact"
})



///////////////////////////////// search ///////////////////////////////////////////////


// async function saveInMap() {
//     for (let i = 0; i < arr.length; i++) {
//         const api = await fetch(arr[i])
//         let response = await api.json();
//         console.log(response.results)
//         for (let j = 0; j < response.results.length ; j++) {
//             // response.results[j].original_title.toLowerCase()
//             if(allfilms.has(response.results[j].id) == false){
//                 allfilms.set(response.results[j].id , response.results[j])
//             }
//         }
//         // console.log("///////////////////////////////////////////////")
//         console.log(allfilms)
        
//     }

// }


// 
$(".container .text").keyup(function () {
    let val = $(this).val()
    showitems(`https://api.themoviedb.org/3/search/movie?api_key=eba8b9a7199efdcb0ca1f96879b83c44&query=${val}`)
})

$(".container .char").keyup(function(){
    let val = $(this).val()
    search1STletter(val)
})


async function search1STletter(letter){
    $(".container .films").html("")
    const api = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=eba8b9a7199efdcb0ca1f96879b83c44&query=${letter}`)
    let response = await api.json();
    // console.log(response)
    let l =letter.toLowerCase()


    let bank =""
    for (let i = 0; i < response.results.length; i++) {
        let val = response.results[i].original_title.toLowerCase()
        console.log(l+"////"+val[0])
        if(l==val[0])
        {
            bank += `<div class="col-md-6 col-lg-4 my-3 myM  shadow px-3">
                    <div class="position-relative movie">
                        <div>
                            <img src="https://image.tmdb.org/t/p/w500/${response.results[i].poster_path}" width="100%" alt="">
                        </div>
                        <div class="filmsOvarlay d-flex align-items-center py-5">
                            <div class="my-5">
                                <h2 class="mb-2">${response.results[i].original_title}</h2>
                                <p class="mb-2">${response.results[i].overview}</p>
                                <p class="mb-2">rated:  <span>${response.results[i].vote_average}</span></p> 
                                <p class="mb-2"></p>${response.results[i].release_date}</p>
                            </div>
                            
                        </div>
                    </div>
                    </div>`

        }
        

        
    }

    $(".container .films").html(bank)
}