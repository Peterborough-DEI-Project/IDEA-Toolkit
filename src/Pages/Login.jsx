import React, { useState } from 'react'
import { Button, Label, TextInput } from 'flowbite-react'
import { signIn } from '../../supabase'

const Login = () => {
    {
        const [count, setCount] = useState(0)
        const [email, setEmail] = useState('')
        const [password, setPassword] = useState('')

        async function handleSubmit(e) {
            e.preventDefault()
            await signIn(email, password);
        }
        return (
            <>
                <form className='flex w-full min-w-full h-full items-center justify-center max-w-md flex-col gap-4'
                    onSubmit={handleSubmit}
                >
                    <div className='rounded-lg'>
                        <Label
                            htmlFor="email" value="Your email" />
                        <TextInput
                            id="email" type="email" placeholder="Email"
                            onChange={e => { setEmail(e.target.value) }}
                            required />
                    </div>
                    <div>
                        <div className="mb-2 block ">
                            <Label htmlFor="password" value="Password" />
                        </div>
                        <TextInput
                            id="password" type="password" placeholder="Password"
                            onChange={e => { setPassword(e.target.value) }}
                            required
                        />
                    </div>
                    <Button
                        className='bg-indigo-500 hover:bg-indigo-700 text-white transition-colors duration-300'
                        type="submit">Submit</Button>
                </form >
            </>
        )
    }
}

export default Login;