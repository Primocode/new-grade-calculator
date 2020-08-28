// const values = {
//     which: [],
//     schoolSubject: [],
//     rating: [],
// }

// values.which.push(1)
// values.schoolSubject.push("matematyka")
// values.rating.push("5")
// values.which.push(2)
// values.schoolSubject.push("Fizyka")
// values.rating.push("3")

const addingAnItem = () => {
    const schoolSubjectValue = document.querySelector('.adding-school-subjects-input').value

    console.log(schoolSubjectValue)
}

document.querySelector('.adding-school-subjects-btn').addEventListener('click', addingAnItem)