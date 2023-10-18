'use client';
import React from 'react'
import { useForm, Controller } from 'react-hook-form';
import { TextField, TextArea, Button } from '@radix-ui/themes'
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
    console.log(register('title'));
    return (
        <form
            className='max-w-xl space-y-3'
            // onSubmit={handleSubmit((data) => { console.log(data) })}>
            onSubmit={handleSubmit(async (data) => {
                await axios.post('/api/issues', data);
                router.push('/issues');
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
    )
}

export default NewIssuePage