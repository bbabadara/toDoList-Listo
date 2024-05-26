//variable
const taskBtn=getElement("#taskBtn",false)
const filterTitle=getElement("#filterTitle",false)
const taskForm=getElement("#taskForm",false)
const inputs = getElement("input[type=text]",true);
const spansFilterName = document.getElementsByClassName("trieNom");
const spansFilterEtat= getElement(".trieEtat",true);
const spansFilterDate= getElement(".trieDate",true);
const taskBody=getElement("#taskBody",false)
const remove=getElement("#remove",false)
const nameFilter=getElement("#nameFilter",false)
const inputsChecked=getElement("input[type=checkbox]:checked",true);
var disabledBtn = true

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

var taches= JSON.parse(localStorage.getItem("taches")) || [];
console.log(taches);