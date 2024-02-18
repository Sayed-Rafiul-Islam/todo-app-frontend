"use client"
import React, { useState } from 'react'
import { Button, Card, Input, Space} from 'antd'
import { useDispatch } from 'react-redux'
import Link from 'next/link'
import { addUser } from '@/app/redux/slice'


export default function AddUsers() {
    const dispatch = useDispatch<AppDispatch>()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const handleUser = () => {
        dispatch(addUser({name,email,password}))
    }
   
  return (
    <div className='w-full flex justify-center'>
      <div>
        <h1 className='text-3xl text-center mt-10 mb-10'>Add Users</h1>
        <Input
        placeholder='User Name'
        type='text'
        onChange={e=>setName(e.target.value)}
        value={name}
        style={{width : "300px"}}
        className='text-black'
        />
        <Input
        placeholder='Email'
        type='email'
        onChange={e=>setEmail(e.target.value)}
        value={email}
        style={{width : "300px"}}
        className='text-black'
        />
        <Input
        placeholder='Password'
        type='password'
        onChange={e=>setPassword(e.target.value)}
        value={password}
        style={{width : "300px"}}
        className='text-black'
        />
        <br /><br />
        <Space size="small" style={{margin : 10}}>
          <Button className='ml-24' type='primary' onClick={handleUser}>Add User</Button>
          <Link href='/removeUser'
                 className='text-red-400 text-xs'
                 >Remove</Link>
        </Space>
      </div>
    </div>
  )
}
