import React, {ChangeEvent, KeyboardEvent, useState} from 'react'
import Greeting from './Greeting'
import {UserType} from './HW3'
import {keyboard} from "@testing-library/user-event/dist/keyboard";

type GreetingContainerPropsType = {
    users: UserType[] // need to fix any
    addUserCallback: (name: string) => void // need to fix any
}

export const pureAddUser = (name: string, setError: Function, setName: Function, addUserCallback: Function) => {
    // если имя пустое - показать ошибку, иначе - добавить юзера и очистить инпут
    //  !name ? setError("Ошибка! Введите имя!") : addUserCallback(name);
    // setName('')
    if(name.split("").every(name => name === " ")){
        setError("Ошибка! Введите имя!")
    }else {
        addUserCallback(name)
        setName('')
    }
}

export const pureOnBlur = (name: string, setError: Function) => { // если имя пустое - показать ошибку
    if (name.split("").every(name => name === " ")) {
        setError("Ошибка! Введите имя!")
    }
}

export const pureOnEnter = (e: KeyboardEvent<HTMLInputElement>, addUser: Function) => { // если нажата кнопка Enter - добавить
    if (e.key === "Enter") {
        addUser()
    }
}

// более простой и понятный для новичков
// function GreetingContainer(props: GreetingPropsType) {

// более современный и удобный для про :)
const GreetingContainer: React.FC<GreetingContainerPropsType> = ({
                                                                     users,
                                                                     addUserCallback,
                                                                 }) => {
    // деструктуризация пропсов
    const [name, setName] = useState<string>('') // need to fix any
    const [error, setError] = useState<string>('') // need to fix any

    const setNameCallback = (e: React.ChangeEvent<HTMLInputElement>) => { // need to fix any
        const trimmed = e.currentTarget.value
        if (trimmed) {
            setName(trimmed)
            error && setError('')
        } else {
            name && setName('')
            setError("Ошибка! Введите имя!")
        }
    }
    const addUser = () => {
        pureAddUser(name, setError, setName, addUserCallback)
    }

    const onBlur = () => {
        pureOnBlur(name, setError)
    }

    const onEnter = (e: any) => {
        pureOnEnter(e, addUser)
    }

    const totalUsers = users.length // need to fix

    const lastUserName = users.length > 0 ? users[users.length - 1].name : users.join()  // need to fix

    return (
        <Greeting
            name={name}
            setNameCallback={setNameCallback}
            addUser={addUser}
            onBlur={onBlur}
            onEnter={onEnter}
            error={error}
            totalUsers={totalUsers}
            lastUserName={lastUserName}
        />
    )
}

export default GreetingContainer
