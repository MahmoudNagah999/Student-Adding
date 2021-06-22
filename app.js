// Student Constructor
function students(name, dob, matriculation){
    this.name = name
    this.dob = dob
    this.matriculation = matriculation
}

// StudentUI Constructor
function studentsUI() {}

studentsUI.prototype.addStudentToList = function (student){
   const list = document.getElementById("student-list")
   const row = document.createElement('tr')

   row.innerHTML = `
   <td>${student.name}</td>
   <td>${student.dob}</td>
   <td>${student.matriculation}</td>
   <td><a href='#' class='delete'>X<a></td>
   `;

   list.appendChild(row)
}

studentsUI.prototype.clearFields = function(){
    document.getElementById("name").value = ""
    document.getElementById("dob").value = ""
    document.getElementById("matriculation").value = ""
}

studentsUI.prototype.showAlert = function(msg, className){
    const div = document.createElement('div')
    div.className = `alert ${className}`
    div.appendChild(document.createTextNode(msg))

    const container = document.querySelector(".container")
    const form = document.querySelector("#student-form")

    container.insertBefore(div, form)

    setTimeout(function (){
        document.querySelector(".alert").remove()
    }, 3000)

}

studentsUI.prototype.deleteStudent = function(target) {
    if(target.className === 'delete'){
        // console.log('ok')
        target.parentElement.parentElement.remove()
    }
}

// Event Listeners
// Event listner for create
var form = document.getElementById("student-form")
form.addEventListener('submit', function(e) {
    
    const name = document.getElementById("name").value
    const dob = document.getElementById("dob").value
    const matriculation = document.getElementById("matriculation").value
          
    const student = new students (name, dob, matriculation)
    const studentUI = new studentsUI()
    
    if(name === "" || dob === "" || matriculation === ""){
        studentUI.showAlert('Please Fill in all fields', "error")
    }else{
        studentUI.addStudentToList(student)
        studentUI.clearFields()
        studentUI.showAlert('Student Added successfully', "success")

    }

    e.preventDefault()
})

// Event listner for delete
var list = document.getElementById("student-list")
list.addEventListener('click', function(e){
    // const student = new students (name, dob, matriculation)
    const studentUI = new studentsUI()

    studentUI.deleteStudent(e.target)
    studentUI.showAlert('Student removed successfully', "success")

    e.preventDefault()
})
