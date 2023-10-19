'use client';
import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form';
import { TextField, TextArea, Button, Callout } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { data } from 'autoprefixer';
import axios from 'axios';
import { useRouter } from 'next/navigation';


interface IssueForm {
    title: string;
    description: string;
}

const NewIssuePage = () => {
    const router = useRouter(); //appRouter/navigation is one that is used with app route
    const { register, control, handleSubmit } = useForm<IssueForm>();
    const [error, setError] = useState('');
    console.log(register('title'));
    return (
        <>
            <h2 className='text-center space-y-5 p-3 border-b-2'>Submit Issue</h2>
            <br />
            <div className='max-w-full flex flex-col flex-grow justify-center items-center'>
                {error && <Callout.Root color='red' className='mb-5'>
                    <Callout.Text>{error}</Callout.Text>
                </Callout.Root>}

                <form
                    className='text-center items-center  space-y-3'
                    // onSubmit={handleSubmit((data) => { console.log(data) })}>
                    onSubmit={handleSubmit(async (data) => {
                        try {
                            await axios.post('/api/issues', data);
                            router.push('/issues');
                        } catch (error) {
                            //console.log(error);
                            setError('An unexpected error occured');
                        }

                    })}>
                    <TextField.Root>
                        <TextField.Input placeholder='Title' {...register('title')} />
                    </TextField.Root>
                    <Controller
                        name='description'
                        control={control}
                        render={({ field }) => <SimpleMDE placeholder='Description' {...field} />}
                    />

                    <Button>Submit New Issue</Button>
                </form>
            </div>
        </>
    )
}

export default NewIssuePage