let input = document.querySelector("#uservalue");
let form = document.querySelector("form");
let saveBtn = document.querySelector("#saveValue");
let allValues = document.querySelector("#allValues");
let searchVal = document.querySelector("#search");

let valuesArray = JSON.parse(localStorage.getItem("values")) || [];
let editIndex = null;
outPut();

searchVal.addEventListener("input", ()=>{
    outPut(searchVal.value);
    input.value = "";

})

form.addEventListener("submit", (e)=>{
    e.preventDefault();
    addvalues();
    outPut();
});

function addvalues() {
    if(editIndex === null){
    let Inputval = input.value;
    valuesArray.push(Inputval);
    localStorage.setItem("values", JSON.stringify(valuesArray));
    input.value = "";
    } else{
        valuesArray[editIndex]=input.value;
        localStorage.setItem("values", JSON.stringify(valuesArray));
        editIndex = null;
        saveBtn.innerText = "Save"
    }
};

function outPut(){
    allValues.innerHTML = "";
    valuesArray
    .filter((element)=>{
        return element.toLowerCase().includes(searchVal.value.toLowerCase())
    })
    .forEach((element, index)=>{
       console.log(element)
       allValues.innerHTML += `<ul><li>${element}<button onclick="deleteItem(${index})">Delete</button><button onclick="editItem(${index})">Edit</button></li></ul>`;
    });
};

function deleteItem(index){
    valuesArray.splice(index, 1);
    localStorage.setItem("values", JSON.stringify(valuesArray));
    outPut();
};

function editItem(index){
    editIndex = index;
    input.value = valuesArray[editIndex];
    saveBtn.innerText = "Update";
    input.focus();
}
