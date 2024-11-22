import React, { useState } from 'react'
import { Button, Label, TextInput } from 'flowbite-react'

export default function Login() {
    const [count, setCount] = useState(0)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function handleSubmit(e){
        e.preventDefault();
        alert(`Email: ${email}\nPassword: ${password}`)
    }
    return (
        <>
            <form className='flex max-w-md flex-col gap-4'
            onSubmit={handleSubmit}
            >
                <div >
                    <Label htmlFor="email" value="Your email" />
                    <TextInput
                    className='border border-gray-500 rounded'
                    id="email" type="email" placeholder="Email"
                    onChange={e => {setEmail(e.target.value)}}
                    required />
                </div>
                <div>
                    <div className="mb-2 block ">
                        <Label htmlFor="password" value="password" />
                    </div>
                    <TextInput 
                    className='border border-gray-500 rounded-md'
                    id="password" type="password" 
                    onChange={e => {setPassword(e.target.value)}}
                    required
                    />
                </div>
                <Button 
                type="submit">Submit</Button>
            </form >
        </>
    )
}
