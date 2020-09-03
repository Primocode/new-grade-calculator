const values = {
    schoolSubject: [],
    whichSchoolSubject: [],
    schoolGrade: [],
    weightSchoolGrade: [],
    schoolGradeID: [],
}

const generatingSchoolItems = () => {
    deletingAllAddedSchoolItems();
    let singleSchoolSubjects = [...new Set(values.schoolSubject)]
    singleSchoolSubjects.forEach(schoolSubjectName => {
        const table = document.createElement('div')
        table.className = "table";
        document.querySelector('.content').appendChild(table);
        table.dataset.whichItem = schoolSubjectName;

        const nameSchoolSubject = document.createElement('div');
        nameSchoolSubject.className = "name-of-the-school-subject";
        table.appendChild(nameSchoolSubject);

        const nameSchoolSubjectName = document.createElement('h3');
        nameSchoolSubjectName.textContent = schoolSubjectName;
        nameSchoolSubject.appendChild(nameSchoolSubjectName);

        const buttonContainer = document.createElement('div');
        buttonContainer.className = "button-container";
        nameSchoolSubject.appendChild(buttonContainer);

        const editName = document.createElement('span');
        editName.className = "fas fa-pencil-alt";
        editName.dataset.name = schoolSubjectName;
        buttonContainer.appendChild(editName);

        const removingASchoolSubject = document.createElement('span')
        removingASchoolSubject.className = "far fa-trash-alt";
        removingASchoolSubject.dataset.name = schoolSubjectName;
        buttonContainer.appendChild(removingASchoolSubject);

        const addingSchoolGradesDOM = document.createElement('div');
        addingSchoolGradesDOM.className = "adding-school-grades";

        table.appendChild(addingSchoolGradesDOM)



        const ratingAndWeight = document.createElement('div');
        ratingAndWeight.className = "rating-and-weight";
        addingSchoolGradesDOM.appendChild(ratingAndWeight);




        const schoolGradeValue = document.createElement('input');
        schoolGradeValue.className = "school-grade-value";
        schoolGradeValue.dataset.whichSchoolGrade = schoolSubjectName;
        schoolGradeValue.type = "number";
        schoolGradeValue.placeholder = "Ocena";
        ratingAndWeight.appendChild(schoolGradeValue)

        const weightTheRatingValue = document.createElement('input');
        weightTheRatingValue.className = "weight-of-the-rating-value";
        weightTheRatingValue.dataset.whichWeight = schoolSubjectName;
        weightTheRatingValue.type = "number";
        weightTheRatingValue.placeholder = "Waga";
        ratingAndWeight.appendChild(weightTheRatingValue)

        const addingBtn = document.createElement('button');
        addingBtn.className = "adding-btn";
        addingBtn.dataset.which = schoolSubjectName;
        addingBtn.textContent = "+";
        addingSchoolGradesDOM.appendChild(addingBtn);

        const countingResult = document.createElement('div');
        countingResult.className = "counting-result";
        table.appendChild(countingResult);

        countingResult.innerHTML = `<span class="counting-result-span">średnia</span><span class="counting-result-value" data-which-avg="${schoolSubjectName}"></span>`

        callForAddingSchoolGrades()
    })
    document.querySelectorAll('.fa-pencil-alt').forEach(item => item.addEventListener('click', changeNameSchoolSubjectIcon))
    document.querySelectorAll('.fa-trash-alt').forEach(item => item.addEventListener('click', removalOfSchoolItems));
    addingATile();
}

const deletingAllAddedSchoolItems = () => {
    document.querySelectorAll('.table').forEach(item => {
        item.remove();
    })
}

const changeNameSchoolSubjectIcon = () => {
    document.querySelector('.changing-name-change').dataset.name = event.target.dataset.name
    document.querySelector('.changing-the-name-of-school-subjects').classList.toggle('changing-the-name-of-school-subjects-active')
    document.querySelector('.changing-name-school-subjects-text').textContent = `Aktualna nazwa tego przedmiotu to "${event.target.dataset.name}"`
}

const changeNameSchoolSubject = () => {
    const nameSchoolSubjectChange = document.querySelector('.changing-name-change').dataset.name
    const changeNameValue = document.querySelector('.changing-name-input').value;
    let indexes = values.whichSchoolSubject.reduce(function(a,e,i){try{a[e].push(i)}catch(_){a[e]=[i]};return a},{});

    if (changeNameValue != "") {
        if (values.schoolSubject.includes(changeNameValue)) {
            errorMessage("Taka nazwa przedmiotu już jest")
        }
        else {
            if (values.whichSchoolSubject.includes(nameSchoolSubjectChange)) {
                indexes[nameSchoolSubjectChange].forEach(item => {
                    values.whichSchoolSubject.splice(item, 1, changeNameValue);
                })
            }
            values.schoolSubject.splice(values.schoolSubject.indexOf(nameSchoolSubjectChange), 1, changeNameValue);
            cancelNameChange();
            document.querySelector('.changing-name-input').value = null;
            generatingSchoolItems();
        }
    }
    else {
        errorMessage("Nowa nazwa przedmiotu nie może być pusta")
    }
}
document.querySelector('.changing-name-change').addEventListener('click', changeNameSchoolSubject);

const cancelNameChange = () => {
    document.querySelector('.changing-name-input').value = null;
    document.querySelector('.changing-the-name-of-school-subjects').classList.toggle('changing-the-name-of-school-subjects-active')
}
document.querySelector('.changing-name-cancel').addEventListener('click', cancelNameChange)

const removalOfSchoolItems = () => {
    const nameSchoolSubject = event.target.dataset.name
    document.querySelector('.remove').dataset.nameToBeDeleted = nameSchoolSubject
    document.querySelector('.notification').classList.toggle('notification-active')
    document.querySelector('.notification-text').textContent = `Czy na pewno chcesz usunąć przedmiot szkolny o nazwie "${nameSchoolSubject}"?. Wszystkie oceny z tego przedmiotu zostaną bezpowrotnie usunięte`
}

const closingTheWindow = () => {
    document.querySelector('.notification').className = "notification"
}
document.querySelector('.cancel').addEventListener('click', closingTheWindow);

const permamentRemoval = () => {
    let indexes = values.whichSchoolSubject.reduce(function(a,e,i){try{a[e].push(i)}catch(_){a[e]=[i]};return a},{});
    const nameOfTheSchoolSubject = document.querySelector('.remove').dataset.nameToBeDeleted
    if (indexes[nameOfTheSchoolSubject]) {
        indexes[nameOfTheSchoolSubject].forEach(item => {
            let indexes = values.whichSchoolSubject.reduce(function(a,e,i){try{a[e].push(i)}catch(_){a[e]=[i]};return a},{});
            let index = indexes[nameOfTheSchoolSubject]
            values.schoolGradeID.splice(index, 1)
            values.schoolGrade.splice(index, 1)
            values.weightSchoolGrade.splice(index, 1)
            values.whichSchoolSubject.splice(index, 1)
            addingATile();
        })
    }
    values.schoolSubject.splice(values.schoolSubject.indexOf(nameOfTheSchoolSubject), 1);
    generatingSchoolItems();
    closingTheWindow();
}
document.querySelector('.remove').addEventListener('click', permamentRemoval);

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
    countingTheWeightedAverage();
}
document.querySelector('.adding-school-subjects-btn').addEventListener('click', addingAnItem)

const tabColors = ["#D44242", "#7F5CB4", "#E8B200","#00A1E8", "#6BAB4C", "#16D900"];
const addingATile = () => {
    deleteAllGrades();
    values.schoolSubject.forEach(item => {
        let indexes = values.whichSchoolSubject.reduce(function(a,e,i){try{a[e].push(i)}catch(_){a[e]=[i]};return a},{});
        if (indexes[item]) {
            indexes[item].forEach(elements => {
                const tableDOM = document.querySelector(`[data-which-item="${item}"]`)
                const schoolGradeDOM = document.createElement('div');
                schoolGradeDOM.className = "school-grade";
                tableDOM.appendChild(schoolGradeDOM);

                schoolGradeDOM.style.backgroundColor = tabColors[values.schoolGrade[elements] -1];

                const schoolGradeValue = document.createElement('h4');
                schoolGradeValue.className = "school-grade-value";
                schoolGradeDOM.appendChild(schoolGradeValue);
                schoolGradeValue.textContent = values.schoolGrade[elements];

                const schoolGradeBtn = document.createElement('button');
                schoolGradeBtn.className = "removing-school-grades";
                schoolGradeBtn.dataset.id = values.schoolGradeID[elements];

                schoolGradeDOM.appendChild(schoolGradeBtn);
                schoolGradeBtn.textContent = "x";

                const weightSchoolGrade = document.createElement('h4');
                weightSchoolGrade.className = "weight-school-grade-value";
                schoolGradeDOM.appendChild(weightSchoolGrade);
                weightSchoolGrade.textContent = "waga " + values.weightSchoolGrade[elements];
            })
        }
    })
    document.querySelectorAll('.removing-school-grades').forEach(item => item.addEventListener('click', deletingSchoolGrades
    ));
    countingTheWeightedAverage();
    callForAddingSchoolGrades();
}

const deletingSchoolGrades = () => {
    const index = values.schoolGradeID.indexOf(event.target.dataset.id)
    values.schoolGrade.splice(index, 1)
    values.schoolGradeID.splice(index, 1)
    values.weightSchoolGrade.splice(index, 1)
    values.whichSchoolSubject.splice(index, 1)
    addingATile();
    countingTheWeightedAverage();
}

const deleteAllGrades = () => {
    document.querySelectorAll('.school-grade').forEach(item => {
        item.remove();
    })
}

const addingSchoolGrades = () => {
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
                values.whichSchoolSubject.push(event.target.dataset.which);
                values.schoolGrade.push(schoolGradeValue);
                values.weightSchoolGrade.push(schoolWeight);

                values.schoolGradeID.push(Math.random().toString(36).substring(7));
                
                document.querySelector(`[data-which-school-grade="${event.target.dataset.which}"]`).value = null;
                document.querySelector(`[data-which-weight="${event.target.dataset.which}"]`).value = null;

                addingATile();
                countingTheWeightedAverage();
            }
        }
    }
}

const countingTheWeightedAverage = () => {
    values.schoolSubject.forEach(item => {
        let indexes = values.whichSchoolSubject.reduce(function(a,e,i){try{a[e].push(i)}catch(_){a[e]=[i]};return a},{});
        let weight = 0;
        let avg = 0;
        if (indexes[item]) {
            indexes[item].forEach(item => {
                weight += Number(values.weightSchoolGrade[item]);
                avg += Number(values.schoolGrade[item]) * Number(values.weightSchoolGrade[item])
            })
        }
        if ((avg / weight).toFixed(2) > 0) {
            document.querySelector(`[data-which-avg="${item}"]`).textContent = (avg / weight).toFixed(2);
        }
        else {
            document.querySelector(`[data-which-avg="${item}"]`).textContent = 0;
        }
    })
    overallAverage ();
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

const overallAverage  = () => {
    document.querySelector('.average-of-all-subjects-result').textContent = 0;
    const avgSchoolSubjects = document.querySelectorAll('.counting-result-value');
    let avg = 0;
    let number = 0;
    avgSchoolSubjects.forEach(item => {
        avg += Number(item.textContent)
        if (Number(item.textContent) > 0) {
            number++
        }
        if ((avg / number).toFixed(2) > 0) {
            document.querySelector('.average-of-all-subjects-result').textContent = (avg / number).toFixed(2)
        }
        else {
            document.querySelector('.average-of-all-subjects-result').textContent = 0;
        }
    })
    avg = 0;
}
document.querySelector('.adding-selected-school-subjects-btn').addEventListener('click', overallAverage)

const openCloseForAddingSchoolSubjects = () => {
    document.querySelectorAll('.selection-list-checkbox').forEach(item => {
        item.disabled = false;
    })

    document.querySelectorAll('.selection-list-checkbox').forEach(item => {
        if (values.schoolSubject.includes(item.dataset.nameschool)) {
            item.disabled = true;
        }
    })
    document.querySelector('.choice-of-school-subjects-container').classList.toggle('choice-of-school-subjects-container-active')
}

const addingItemsFromTheList = () => {
    document.querySelectorAll('.selection-list-checkbox').forEach(item => {
        if (item.checked) {
            values.schoolSubject.push(item.dataset.nameschool)   
        } 
    })
    generatingSchoolItems();
    openCloseForAddingSchoolSubjects();
    document.querySelectorAll('.selection-list-checkbox').forEach(item => {
        item.checked = false;
    })
}
document.querySelector('.selection-list-btn-add').addEventListener('click', addingItemsFromTheList)
document.querySelector('.adding-selected-school-subjects-btn').addEventListener('click', openCloseForAddingSchoolSubjects);
document.querySelector('.selection-list-btn-cancel').addEventListener('click', openCloseForAddingSchoolSubjects)

// document.querySelectorAll('.selection-list-checkbox').forEach(item => {
//     console.log(item.dataset.nameschool.includes("Informatyka"))
// })

