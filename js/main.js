let todoInput
let addBtn
let ulList
let errorInfo
let newTodo

let popup
let popupInfo
let popupInput
let accept
let cancel
let toDoEdit

const main = () => {
	prepareDOMElements()
	prepareDOMEvents()
}

const prepareDOMElements = () => {
	todoInput = document.querySelector('.todo-input')
	addBtn = document.querySelector('.btn-add')
	errorInfo = document.querySelector('.error-info')
	ulList = document.querySelector('.todolist ul')
	popup = document.querySelector('.popup')
	popupInput = document.querySelector('.popup-input')
	accept = document.querySelector('.accept')
	cancel = document.querySelector('.cancel')
	popupInfo = document.querySelector('.popup-info')
}

const prepareDOMEvents = () => {
	addBtn.addEventListener('click', addNewTodo)
	ulList.addEventListener('click', checkTarget)
	cancel.addEventListener('click', closePopup)
	accept.addEventListener('click', changeText)
	todoInput.addEventListener('keydown', checkEnter)
	popupInput.addEventListener('keydown', checkPop)
}

const addNewTodo = () => {
	if (todoInput.value !== '') {
		newTodo = document.createElement('li')
		newTodo.textContent = todoInput.value
		addTools()
		ulList.append(newTodo)

		errorInfo.textContent = ''
		todoInput.value = ''
	} else {
		errorInfo.textContent = 'Wpisz nowe zadanie'
	}
}

const addTools = () => {
	const newTools = document.createElement('div')
	newTools.classList.add('tools')
	newTodo.append(newTools)

	const newBtn = document.createElement('button')
	newBtn.classList.add('complete')
	newBtn.innerHTML = "<i class='fas fa-check'></i>"

	const newBtn2 = document.createElement('button')
	newBtn2.classList.add('edit')
	newBtn2.textContent = 'EDIT'

	const newBtn3 = document.createElement('button')
	newBtn3.classList.add('delete')
	newBtn3.innerHTML = "<i class='fas fa-times'></i>"

	newTools.append(newBtn, newBtn2, newBtn3)
}

const checkTarget = e => {
	if (e.target.matches('.complete')) {
		e.target.closest('li').classList.toggle('completed')
		e.target.classList.toggle('completed')
	} else if (e.target.matches('.edit')) {
		editTodo(e)
	} else if (e.target.matches('.delete')) {
		delTodo(e)
	}
}

const editTodo = e => {
	toDoEdit = e.target.closest('li')
	popup.style.display = 'flex'
	popupInput.value = toDoEdit.firstChild.textContent
}

const closePopup = () => {
	popup.style.display = 'none'
	popupInfo.textContent = ''
}

const changeText = () => {
	if (popupInput.value !== '') {
		toDoEdit.firstChild.textContent = popupInput.value
		popup.style.display = 'none'
		popupInfo.textContent = ''
	} else {
		popupInfo.textContent = 'Wpisz tekst'
	}
}

const delTodo = e => {
	// toDoEdit = e.target.closest('li')
	// toDoEdit.remove('li')
	e.target.closest('li').remove()
	const allTodos = ulList.querySelectorAll('li')
	
	if (allTodos.length === 0) {
		errorInfo.textContent = 'Brak zadań na liście.'
	}
}

const checkEnter = e => {
	if (e.key === 'Enter') {
		addNewTodo(e)
		popup.style.display = ''
	}
}

const checkPop = e => {
	if (e.key === 'Enter') {
		toDoEdit.firstChild.textContent = popupInput.value
		addNewTodo(e)
		popup.style.display = ''
	}
}

document.addEventListener('DOMContentLoaded', main)
