//variable
const taskBtn = getElement("#taskBtn")
const filterTitle = getElement("#filterTitle")
const taskForm = getElement("#taskForm")
const inputs = getElement("input[type=text]", true);
const spansFilterName = document.getElementsByClassName("trieNom");
const spansFilterEtat = getElement(".trieEtat", true);
const spansFilterDate = getElement(".trieDate", true);
const taskBody = getElement("#taskBody")
const remove = getElement("#remove")
const nameFilter = getElement("#nameFilter")
const inputsChecked = getElement("input[type=checkbox]:checked", true);
const inputscheckbox = getElement("input[type=checkbox]", true)
const btnAll = getElement("#btnAll")
const pagination = getElement("#pagination")
const btnNext = getElement("#btnNext")
const btnPrevious = getElement("#btnPrevious")
const chooseDate = getElement("#chooseDate")
const searchUser = getElement("#searchUser")
const proposedUser = getElement("#proposedUser")
const selectedUser = getElement("#selectedUser")
const backNext = getElement(".backNext", true)
var disabledBtn = true
// var disabledBtnRemove=true

// localStorage.setItem("taches",JSON.stringify([
//     {
//         id: 1,
//         nom: "faire js",
//         dateheure: "2024-01-04 12:00",
//         etat: 0
//     },
//     {
//         id: 2,
//         nom: "Php",
//         dateheure: "2023-05-04 12:00",
//         etat: 1
//     },
//     {
//         id: 3,
//         nom: "Python",
//         dateheure: "2024-06-15 10:00",
//         etat: 1
//     },
//     {
//         id: 4,
//         nom: "CSS",
//         dateheure: "2024-07-20 14:30",
//         etat: 0
//     },
//     {
//         id: 5,
//         nom: "HTML",
//         dateheure: "2024-08-10 09:00",
//         etat: 1
//     },
//     {
//         id: 6,
//         nom: "Node.js",
//         dateheure: "2024-09-05 15:45",
//         etat: 0
//     },
//     {
//         id: 7,
//         nom: "React",
//         dateheure: "2024-10-12 11:00",
//         etat: 1
//     },
//     {
//         id: 8,
//         nom: "Express.js",
//         dateheure: "2024-11-20 10:30",
//         etat: 0
//     },
//     {
//         id: 9,
//         nom: "MongoDB",
//         dateheure: "2024-12-05 13:15",
//         etat: 1
//     },
//     {
//         id: 10,
//         nom: "SQL",
//         dateheure: "2025-01-10 16:00",
//         etat: 0
//     }
// ]));
const users = [
    {
        id: 1,
        nom: "Badara",
        photo: "6accff99.jpg"
    },
    {
        id: 2,
        nom: "Mamadou",
        photo: "6accff99.jpg"
    },
    {
        id: 3,
        nom: "Awa",
        photo: "6accff99.jpg"
    },
    {
        id: 4,
        nom: "Djamilatou",
        photo: "6accff99.jpg"
    },
    {
        id: 5,
        nom: "Amadou",
        photo: "6accff99.jpg"
    },
    {
        id: 6,
        nom: "Madieume",
        photo: "6accff99.jpg"
    },
    {
        id: 7,
        nom: "Issa",
        photo: "6accff99.jpg"
    }
]

// console.log(findUsersBySearch("d"));
// console.log(findUserById(1));

var taches = getTaches() || [];
// console.log(taches);

// activeButton(remove,disabledBtnRemove)

//appel de fonction
init()
// activeButton(taskBtn)

//evenement

searchUser.addEventListener("input",function(){
    proposedUser.innerHTML=generateProposedUsers(findUsersBySearch(searchUser.value)) 
})


pagination.addEventListener("input", function () {
    const tab = getTachesByPagination(pagination.value)
    taskBody.innerHTML = generateTbody(tab)
})

btnAll.addEventListener("click", function () {
    filterTitle.innerHTML = "All Date"
    taches = getTaches()
    taskBody.innerHTML = generateTbody(taches)
})


remove.addEventListener("click", function () {
    const inputsChecked = Array.from(document.querySelectorAll(".coche:checked"))
    taches = deleteDoneTask(inputsChecked)

    updateTaches(taches)
})

for (const input of inputs) {
    input.addEventListener("input", function () {
        if (fieldsRequired(input)) {
            success(input)
        }
        let inputValid = document.querySelectorAll(".is-valid")
        disabledBtn = !(Array.from(inputs).length == Array.from(inputValid).length)
        activeButton(taskBtn, disabledBtn)
    })
}

for (const trie of spansFilterName) {
    trie.addEventListener("click", function () {
        tabl = trierTache(this.getAttribute("data-order"), "nom");
        taskBody.innerHTML = generateTbody(tabl)
    })
}
for (const trie of spansFilterDate) {
    trie.addEventListener("click", function () {
        tabl = trierTache(this.getAttribute("data-order"), "dateheure");
        taskBody.innerHTML = generateTbody(tabl)
    })
}
for (const trie of Array.from(spansFilterEtat)) {
    // console.log(spansFilterEtat);
    trie.addEventListener("click", function () {
        // alert("ok")
        tabl = trierTache(this.getAttribute("data-order"), "etat");
        taskBody.innerHTML = generateTbody(tabl)
    })
}

for (const bn of Array.from(backNext)) {
    bn.addEventListener("click", function () {
        const dt = chooseDate.value
        const next = getNorPDate(dt, this.getAttribute("data-date"))
        chooseDate.value = next
        taskBody.innerHTML = generateTbody(getTachesByDate(next))
    })
}


taskBtn.addEventListener("click", function () {
    let newTache = Object.fromEntries(new FormData(taskForm))
    newTache["id"] = getId()

    taches.push(newTache)

    localStorage.setItem("taches", JSON.stringify(taches))
    taskForm.reset()
    //  taskForm.submit()
    taskBody.innerHTML = generateTbody(taches)

})
//Declaration fonction
function taskDone(checkbox) {
    const all = document.querySelector("#doneAll")
    const ligneCible = checkbox.parentElement.parentElement;
    if (checkbox.checked) {
        ligneCible.style.textDecoration = "line-through";
    } else {
        ligneCible.style.textDecoration = "none";
        all.checked = false
    }
}
function removeUser(span) {
    span.parentElement.remove()
}
function doneAll(checkbox) {
    const inputsToCheck = getElement(".coche", true)
    if (checkbox.checked) {
        inputsToCheck.forEach(function (input) {
            input.checked = true
            taskDone(input)
        })
    } else {
        inputsToCheck.forEach(function (input) {
            input.checked = false
            taskDone(input)
        })
    }
}



function fieldsRequired(field) {

    if (field.value.trim() === '') {
        error(field)
        return false
    }
    return true

}

//
function success(field) {
    field.classList.remove("is-invalid")
    field.classList.add("is-valid")
}

//fonction qui generer les message d'erreur pour les champs vides
function error(field, msg = "Champ est obligatoire") {
    field.classList.remove("is-valid")
    field.classList.add("is-invalid")
    field.nextElementSibling.textContent = msg
}

//active ou desactive le boutton en fonction de la variable disabledBtn
function activeButton(btn, etat) {
    if (etat) {
        btn.setAttribute("disabled", true)
    } else (
        btn.removeAttribute("disabled")
    )

}


//fonction excuter au lancement
function init() {
    const currentDate = getCurrentDate();
    chooseDate.value = currentDate
    filterTitle.innerHTML = convertDate(currentDate)
    taskBody.innerHTML = generateTbody(getTachesByDate(currentDate))
    activeButton(taskBtn, disabledBtn)
    // generateFilterTitle()



}

//concatenation des tr du tableau
function generateTbody(taches) {
    let html = ""
    for (const tache of taches) {
        html += generateTr(tache)
    }
    return html
}

//generer un tr
function generateTr(tache) {
    return `<tr>
        <td><input type="checkbox" data-id="${tache.id}" class="coche" onclick="taskDone(this)"></td>
        <td>${tache.nom}</td>
        <td>${tache.dateheure}</td>
        </tr>`
}

// function generateFilterTitle() {
//     filterTitle.innerHTML = "All Date"
// }

function trierTache(order, trie) {
    if (order == "asc") {
        return taches.sort((a, b) => a[trie].localeCompare(b[trie]));
    } else if (order == "dsc") {
        return taches.sort((a, b) => b[trie].localeCompare(a[trie]));
    }
}



function deleteDoneTask(inputsChecked) {
    const ids = inputsChecked.map(function (input) {
        input.parentElement.parentElement.remove()
        return parseInt(input.dataset.id)
    })
    const updated = taches.filter(function (t) {
        return ids.indexOf(t.id) == -1
    })
    return updated
}

function fillDate(input) {
    tachesOnDate = getTachesByDate(input.value)
    if (tachesOnDate.length != 0) {
        // filterTitle.innerHTML = convertDate(input.value)
        filterTitle.innerHTML = new Date(input.value).toLocaleDateString()
        taskBody.innerHTML = generateTbody(tachesOnDate)
    }

}



function getElement(name, bool = false) {
    if (bool == false) {
        return document.querySelector(name)
    } else {
        return document.querySelectorAll(name)
    }
}

function getId() {
    return getTaches().length + 1
}

function getTaches() {
    return JSON.parse(localStorage.getItem("taches"))
}

function updateTaches(tab) {
    localStorage.setItem("taches", JSON.stringify(tab))
}

function getTachesByDate(date) {
    return taches.filter(function (t) {
        let tacheDate = t.dateheure.split("T")[0]
        return tacheDate == date
    })
}

function getTachesByPagination(nbr = "all") {
    let taches = getTaches()
    if (nbr != "all") {
        return taches.slice(0, nbr)
    }
    return taches
}


function convertDate(date) {
    let [a, m, j] = date.split('-');
    return `${j}-${m}-${a}`;
}

function getCurrentDate() {
    return new Date().toISOString().split("T")[0]
}

function getNorPDate(dt, action) {
    if (action == "plus") {
        let date = new Date(dt);
        date.setDate(date.getDate() + 1);
        return date.toISOString().split("T")[0]
    } else {
        let date = new Date(dt);
        date.setDate(date.getDate() - 1);
        return date.toISOString().split("T")[0]
    }

}

// function findUsersBySearch(saisi) {
//     return users.filter(function (u) {
//         return u.nom.toUpperCase().indexOf(saisi.toUpperCase()) != -1
//     })
// }
function findUsersBySearch(saisi) {
    if (saisi!="") {
        return users.filter(function (u) {
        return u.nom.toUpperCase().includes(saisi.toUpperCase()) == true
    })
    }
    return []
}

function findUserById(id) {
    return users.filter(function (u) {
        return u.id == id
    })
}

function generateProposedUsers(users) {
let html=""
for (const user of users) {
    html+=generateProposedUser(user)
}
return html
}

function generateProposedUser(user) {
  return ` 
    <div class=" d-flex align-items-center border shadow px-2" data-id="${user.id}" onclick="addme(this)">
        <img src="images/${user.photo}" alt="user"  class="" style="width:50px;height:50px;">
        <span class="p-2">${user.nom}</span>
    </div>`
}
function generateselectedUser(user) {
    return `
    <div class="d-flex align-items-center rounded-pill  shadow px-2">
        <img src="images/${user.photo}" alt="userSelected" class="rounded-circle" style="width:25px;height:25px;">
         <span class="p-2">${user.nom}</span>
         <span class="material-symbols-outlined   " onclick="removeUser(this)"> cancel </span>
    </div> `
}

function addme(element) {
    let user = findUserById(element.dataset.id)
    selectedUser.innerHTML += generateselectedUser(user[0])
    // searchUser.value=" "
    element.remove()
}