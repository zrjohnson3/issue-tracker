'use client';
import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form';
import { TextField, TextArea, Button, Callout, Text } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { data } from 'autoprefixer';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { createIssueSchema } from '@/app/validationSchemas';
import { z } from 'zod';
import ErrorMessage from '@/app/components/ErrorMessage';


// Let zod infer type of IssueForm based on schema
type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
    const router = useRouter(); //appRouter/navigation is one that is used with app route
    const { register, control, handleSubmit, formState: { errors, isValid } } = useForm<IssueForm>({
        resolver: zodResolver(createIssueSchema),
    });
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
                    {<ErrorMessage>{errors.title?.message}</ErrorMessage>}
                    <Controller
                        name='description'
                        control={control}
                        render={({ field }) => <SimpleMDE placeholder='Description' {...field} />}
                    />
                    {<ErrorMessage>{errors.description?.message}</ErrorMessage>}
                    <Button>Submit New Issue</Button>
                </form>
            </div>
        </>
    )
}

export default NewIssuePage