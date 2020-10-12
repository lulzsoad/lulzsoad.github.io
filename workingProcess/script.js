if(localStorage.getItem("language") === null){
    localStorage.setItem("language", "fa")
}

document.getElementById("fa").addEventListener("click", function(){
    localStorage.setItem("language", "fa")
})
document.getElementById("en").addEventListener("click", function(){
    localStorage.setItem("language", "en")
})

if(localStorage.getItem("language") == "fa"){
    document.getElementById("working-text").textContent = "سايت در دست ساخت مي باشد";
}
if(localStorage.getItem("language") == "en"){
    document.getElementById("working-text").textContent = "Website is under construction";
}