//variable
const taskBtn=document.querySelector("#taskBtn")
const taskForm=document.querySelector("#taskForm")
const inputs = document.querySelectorAll("input[type=text]");
const spansFilterName = document.getElementsByClassName("trieNom");
const spansFilterEtat= document.querySelectorAll(".trieEtat");
const spansFilterDate= document.querySelectorAll(".trieDate");
const taskBody=document.querySelector("#taskBody")
const remove=document.querySelector("#remove")
const nameFilter=document.querySelector("#nameFilter")
const inputsChecked=document.querySelectorAll("input[type=checkbox]:checked");
var disabledBtn = true

let taches=[
    {
        id: 1,
        nom: "faire js",
        dateheure: "2024-01-04 12:00",
        etat: 0
    },
    {
        id: 2,
        nom: "Php",
        dateheure: "2023-05-04 12:00",
        etat: 1
    },
    {
        id: 3,
        nom: "Python",
        dateheure: "2024-06-15 10:00",
        etat: 1
    },
    {
        id: 4,
        nom: "CSS",
        dateheure: "2024-07-20 14:30",
        etat: 0
    },
    {
        id: 5,
        nom: "HTML",
        dateheure: "2024-08-10 09:00",
        etat: 1
    },
    {
        id: 6,
        nom: "Node.js",
        dateheure: "2024-09-05 15:45",
        etat: 0
    },
    {
        id: 7,
        nom: "React",
        dateheure: "2024-10-12 11:00",
        etat: 1
    },
    {
        id: 8,
        nom: "Express.js",
        dateheure: "2024-11-20 10:30",
        etat: 0
    },
    {
        id: 9,
        nom: "MongoDB",
        dateheure: "2024-12-05 13:15",
        etat: 1
    },
    {
        id: 10,
        nom: "SQL",
        dateheure: "2025-01-10 16:00",
        etat: 0
    }
];



 //appel de fonction
 init()
// activeButton(taskBtn)

//evenement
remove.addEventListener("click",function(){
    const inputsChecked=Array.from(document.querySelectorAll("input[type=checkbox]:checked"))
     taches=deleteDoneTask(inputsChecked)
    
})

for (const input of inputs) {
  input.addEventListener("input", function() {
      if (fieldsRequired(input)) {
          success(input)  
      } 
      let inputValid=document.querySelectorAll(".is-valid") 
      disabledBtn=!(Array.from(inputs).length==Array.from(inputValid).length)
      activeButton(taskBtn)
  })
}

for (const trie of spansFilterName){
    trie.addEventListener("click", function() {
        tabl=trierTache(this.getAttribute("data-order"),"nom");
        taskBody.innerHTML=generateTbody(tabl)
    })
}
for (const trie of spansFilterDate){
    trie.addEventListener("click", function() {
        tabl=trierTache(this.getAttribute("data-order"),"dateheure");
        taskBody.innerHTML=generateTbody(tabl)
    })
}
for (const trie of Array.from(spansFilterEtat)){
    // console.log(spansFilterEtat);
    trie.addEventListener("click", function() {
        // alert("ok")
        tabl=trierTache(this.getAttribute("data-order"),"etat");
        taskBody.innerHTML=generateTbody(tabl)
    })
}



taskBtn.addEventListener("click",function(){
   let  newTache=Object.fromEntries(new FormData(taskForm)) 
  newTache["id"]=Math.floor(Math.random()*1000)

  taches.push(newTache)
  // console.log(tabTache);
  init();
    // taskForm.submit()
})
 //Declaration fonction
function taskDone(checkbox) {
    const all=document.querySelector("#doneAll")
    const ligneCible = checkbox.parentElement.parentElement;
    if (checkbox.checked) {
      ligneCible.style.textDecoration = "line-through";
    } else {
      ligneCible.style.textDecoration = "none";
      all.checked=false
    }
  } 
function doneAll(checkbox) {
    const inputsToCheck=document.querySelectorAll(".coche")
    if (checkbox.checked) {
        inputsToCheck.forEach(function(input) {
            input.checked=true
             taskDone(input)
            })
    } else {
        inputsToCheck.forEach(function(input) {
            input.checked=false
            taskDone(input)
            })
    }
  } 

//   function deleteTask(button) {
//     const ligneCible = button.parentElement.parentElement;
//     ligneCible.parentElement.removeChild(ligneCible);
//   }

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
function activeButton(btn) {
    if (disabledBtn) {
        btn.setAttribute("disabled", true)
    } else(
        btn.removeAttribute("disabled")
    )

}


//fonction excuter au lancement
function init() {
    //ajout des tr sur le tbody du tableau
    taskBody.innerHTML=generateTbody(taches)

    //desactivation du bouton
    activeButton(taskBtn)
}

//concatenation des tr du tableau
function generateTbody(taches){
   let html=""
   for (const tache of taches) {
   html+=generateTr(tache)
}
   return html
}

//generer un tr
function generateTr(tache){
        return`<tr>
        <td><input type="checkbox" data-id="${tache.id}" class="coche" onclick="taskDone(this)"></td>
        <td>${tache.nom}</td>
        <td>${tache.dateheure}</td>
        </tr>`
    }
   


function trierTache(order, trie) {
    if (order == "asc") {
        return taches.sort((a, b) => a[trie].localeCompare(b[trie]) );
    } else if (order == "dsc") {
        return taches.sort((a, b) => b[trie].localeCompare(a[trie]));
    }
}



function deleteDoneTask(inputsChecked){
const ids=inputsChecked.map(function(input){
    input.parentElement.parentElement.remove()
  return parseInt(input.dataset.id)
})
const updated=taches.filter(function(t){
  return  ids.indexOf(t.id)==-1
})
return updated
}




