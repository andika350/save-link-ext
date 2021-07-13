let myLinks = [];
const inputEl = document.getElementById("input-el");
const saveBtn = document.getElementById("save-btn");
const tabBtn = document.getElementById("tab-btn");
const clearBtn = document.getElementById("clear-btn");
let listEl = document.getElementById("list-el");

const localLinks = JSON.parse(localStorage.getItem("myLinks"))

if (localLinks) {
    myLinks = localLinks;
    render(myLinks);
}

saveBtn.addEventListener("click", function() {
    if(inputEl.value != "") {
        myLinks.push(inputEl.value);
        inputEl.value = null;

        localStorage.setItem("myLinks", JSON.stringify(myLinks))
    }
    render(myLinks);
})

function render(links) {
    let listItems = ``;
    for (let i=0; i<links.length; i++) {
        listItems += `
            <li>
                <a href=${links[i]} target="_blank">
                ${links[i]}</a>
            </li>
        `
    } listEl.innerHTML = listItems;
}

tabBtn.addEventListener("click", function() {
    chrome.tabs.query({
        active:true,
        currentWindow:true
    }, function(tabs) {
        myLinks.push(tabs[0].url);
        localStorage.setItem("myLinks", JSON.stringify(myLinks));
        render(myLinks);
    })
})

clearBtn.addEventListener("click", function(){
    let ok = confirm("Are you sure you want to delete all saved links?");
    if (ok === true) {
        localStorage.clear();
        myLinks=[];
        render(myLinks);
    }
})
