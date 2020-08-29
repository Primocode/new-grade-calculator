const values = {
    schoolSubject: [],
    whichSchoolSubject: [],
    rating: [],
}

// values.which.push(1)
// values.schoolSubject.push("matematyka")
// values.rating.push("5")
// values.which.push(2)
// values.schoolSubject.push("Fizyka")
// values.rating.push("3")

const generatingSchoolItems = () => {
    deletingAllAddedSchoolItems();
    let singleSchoolSubjects = [...new Set(values.schoolSubject)]

    singleSchoolSubjects.forEach(schoolSubjectName => {
        const table = document.createElement('div')
        table.className = "table";
        document.querySelector('.content').appendChild(table);
        table.dataset.whichItem = schoolSubjectName;

        const viewDOM = `
        <div class="name-of-the-school-subject">
            <h3>${schoolSubjectName}</h3>
        <div class="button-container">
            <button class="edit-name">
                <span class="fas fa-pencil-alt"></span>
            </button>
            <button class="removing-a-school-subject">
                <span class="far fa-trash-alt"></span>
            </button>
        </div>
        </div>
        <div class="rating-and-weight">
            <input type="number" class="school-grade-value" data-which-school-grade="${schoolSubjectName}" placeholder="Ocena">
            <input type="number" class="weight-of-the-rating-value" data-which-weight="${schoolSubjectName}" placeholder="Waga"> 
        </div>
        <button class="adding-btn" data-which="${schoolSubjectName}">+</button>`
    
        table.innerHTML += viewDOM;
        callForAddingSchoolGrades()
    })
}

const deletingAllAddedSchoolItems = () => {
    document.querySelectorAll('.table').forEach(item => {
        item.remove();
    })
}


const addingAnItem = () => {
    const schoolSubjectValue = document.querySelector('.adding-school-subjects-input').value
    if (schoolSubjectValue.length >= 1) {
        if (values.schoolSubject.includes(schoolSubjectValue)) {
            errorMessage("Nazwa tego przedmiotu została już dodana");
        }   
        else {
            values.schoolSubject.push(schoolSubjectValue);
        }
    }
    else {
        errorMessage("Nazwa przedmiotu szkolnego nie może być pusta");
    }
    generatingSchoolItems();
}

document.querySelector('.adding-school-subjects-btn').addEventListener('click', addingAnItem)

const addingSchoolGrades = () => {
    console.log(event.target.dataset.which)
    console.log(document.querySelector(`[data-which-school-grade="${event.target.dataset.which}"]`))
    console.log(document.querySelector(`[data-which-weight="${event.target.dataset.which}"]`))
}

const callForAddingSchoolGrades = () => {
    document.querySelectorAll('.adding-btn').forEach(item => item.addEventListener('click', addingSchoolGrades));
}


const errorMessage = (mess) => {
    const message = document.querySelector('.message')
    message.style.display = "block";
    message.textContent = mess;
	setTimeout(function(){ 
		message.style.display = "none";
	}, 2500);
}



