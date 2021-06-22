class students {
    constructor(name, dob, matriculation){
        this.name = name
        this.dob = dob
        this.matriculation = matriculation
    }
}

class studentsUI {

    addStudentToList(student) {
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
    
    clearFields() {
        document.getElementById("name").value = ""
        document.getElementById("dob").value = ""
        document.getElementById("matriculation").value = ""
    }

    showAlert(msg, className) {
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

    deleteStudent(target) {
        if(target.className === 'delete'){
            target.parentElement.parentElement.remove()
        }
    }
}

class storage {

    static getStudents(){
        let students 
        if(localStorage.getItem('students') === null){
            students = []
        } else {
            students =JSON.parse(localStorage.getItem('students'))
        }

        return students
    }

    static displayStudents(){
        const students = storage.getStudents()
        const studentUI = new studentsUI()
        
        students.forEach(function (student) {
            studentUI.addStudentToList(student)
        });
    }

    static addStudent(student){
        const students = storage.getStudents()
        students.push(student)
        // students
        localStorage.setItem('students', JSON.stringify(students))
    }

    static removeStudent(Matriculation) {
        const students = storage.getStudents()
        students.forEach(function (student, index){
            if(student.Matriculation === Matriculation){
                students.splice(index, 1)
            }

            localStorage.setItem('students', JSON.stringify(students))
        })

    }
}

// Event Listeners

// Dom load event
document.addEventListener('DOMContentLoaded', storage.displayStudents())

// Event listner for create
var form = document.getElementById("student-form")
form.addEventListener('submit', function(e) {
    
    const name = document.getElementById("name").value
    const dob = document.getElementById("dob").value
    const matriculation = document.getElementById("matriculation").value
    
    // Instantiate student      
    const student = new students (name, dob, matriculation)
    
    // Instantiate studentUI      
    const studentUI = new studentsUI()
    
    if(name === "" || dob === "" || matriculation === ""){
        studentUI.showAlert('Please Fill in all fields', "error")
    }else{
        // Add to list 
        studentUI.addStudentToList(student)
        
        // Add student to local storage 
        storage.addStudent(student)

        // clear fields
        studentUI.clearFields()
        studentUI.showAlert('Student Added successfully', "success")
    }

    e.preventDefault()
})

// Event listner for delete
var list = document.getElementById("student-list")
list.addEventListener('click', function(e){
    
    // Instantiate studentUI      
    const studentUI = new studentsUI()

    // Remove student from the list 
    studentUI.deleteStudent(e.target)

    // Remove student from local storage
    console.log(e.target.parentElement.previousElementSibling.textContant)
    storage.removeStudent(e.target.parentElement.previousElementSibling.textContant)

    studentUI.showAlert('Student removed successfully', "success")

    e.preventDefault()
})