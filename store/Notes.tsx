import { makeAutoObservable } from 'mobx'
import { Data } from '@/components/Form'
import { idText } from 'typescript'

class Notes {
    // инициируем массив объектов notes 
    notes = [
        { id: '1', title: 'Hello', note: 'My first note!' },
    ]

    // makeAutoObservable делает все свойства наблюдаемыми по умолчанию
    constructor() {
        makeAutoObservable(this)
    }

    // стор в mobx мутабельный, поэтому просто пушим в него новую задачу
    addNote(item : Data) {
        this.notes.push(item)
    }

    // удаляем по id задачу, отфильтрованный массив по id 
    deleteNote(id : string) {
        this.notes = this.notes.filter(note => note.id !== id)
    }

}

export default new Notes()