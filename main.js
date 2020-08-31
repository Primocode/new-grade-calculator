const values = {
    schoolSubject: [],
    whichSchoolSubject: [],
    schoolGrade: [],
    weightSchoolGrade: [],
}

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
            document.querySelector(".adding-school-subjects-input").value = null;
        }
    }
    else {
        errorMessage("Nazwa przedmiotu szkolnego nie może być pusta");
    }
    generatingSchoolItems();
}

document.querySelector('.adding-school-subjects-btn').addEventListener('click', addingAnItem)

const addingATile = () => {
    deleteAllGrades();
    values.schoolSubject.forEach(item => {
        let indexes = values.whichSchoolSubject.reduce(function(a,e,i){try{a[e].push(i)}catch(_){a[e]=[i]};return a},{});
        if (indexes[item]) {
            indexes[item].forEach(elements => {
                // console.log(document.querySelector(`[data-which-item="${item}"]`))
                // console.log("oceny " + values.schoolGrade[elements]);
                // console.log("Wagi " + values.weightSchoolGrade[elements]);
                const tableDOM = document.querySelector(`[data-which-item="${item}"]`)
                const schoolGradeDOM = document.createElement('div');
                schoolGradeDOM.className = "school-grade";
                tableDOM.appendChild(schoolGradeDOM);

                const schoolGradeValue = document.createElement('h4');
                schoolGradeValue.className = "school-grade-value";
                schoolGradeDOM.appendChild(schoolGradeValue);
                schoolGradeValue.textContent = values.schoolGrade[elements];

                const schoolGradeBtn = document.createElement('button');
                schoolGradeBtn.className = "removing-school-grades";
                schoolGradeDOM.appendChild(schoolGradeBtn);
                schoolGradeBtn.textContent = "x";

                const weightSchoolGrade = document.createElement('h4');
                weightSchoolGrade.className = "weight-school-grade-value";
                schoolGradeDOM.appendChild(weightSchoolGrade);
                weightSchoolGrade.textContent = "waga " + values.weightSchoolGrade[elements];
            })
        }
    })
    callForAddingSchoolGrades();
}

// 

const deleteAllGrades = () => {
    document.querySelectorAll('.school-grade').forEach(item => {
        item.remove();
    })
}

const addingSchoolGrades = () => {
    console.log(document.querySelector(`[data-which-school-grade="${event.target.dataset.which}"]`).value)
    console.log(document.querySelector(`[data-which-weight="${event.target.dataset.which}"]`).value)

    const schoolGradeValue = document.querySelector(`[data-which-school-grade="${event.target.dataset.which}"]`).value;
    const schoolWeight = document.querySelector(`[data-which-weight="${event.target.dataset.which}"]`).value;

    if (schoolGradeValue.length <= 0 || schoolWeight <= 0) {
        errorMessage("Ocena ani waga nie mogą pozostać puste")
    }
    else {
        if (schoolGradeValue > 6 || schoolGradeValue <= 0) {
            errorMessage("Ocena nie może być mniejsza od 1 ani większa od 6")
        }
        else {
            if (schoolWeight > 99 || schoolWeight <= 0) {
                errorMessage("Waga nie może być mniejsza od 1 ani większa od 99");
            }
            else {
                console.log("wszytko działa")
                values.whichSchoolSubject.push(event.target.dataset.which);
                values.schoolGrade.push(schoolGradeValue);
                values.weightSchoolGrade.push(schoolWeight);

                document.querySelector(`[data-which-school-grade="${event.target.dataset.which}"]`).value = null;
                document.querySelector(`[data-which-weight="${event.target.dataset.which}"]`).value = null;

                addingATile();
            }
        }
    }

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

const choiceOfSchoolSubjects = () => {
    
}

document.querySelector('.adding-selected-school-subjects-btn').addEventListener('click', choiceOfSchoolSubjects)

