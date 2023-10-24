'use client';
import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form';
import { TextField, TextArea, Button, Callout, Text } from '@radix-ui/themes'
import dynamic from 'next/dynamic';
import "easymde/dist/easymde.min.css";
import { data } from 'autoprefixer';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { issueSchema } from '@/app/validationSchemas';
import { z } from 'zod';
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';
import { Issue } from '@prisma/client';

// Dynamic import for SimpleMDE and disable SSR for it
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
    ssr: false,
});


// Let zod infer type of IssueForm based on schema
type IssueForm = z.infer<typeof issueSchema>;

const IssueForm = ({ issue }: { issue?: Issue }) => {
    // Navigation - appRouter/navigation is one that is used with app route
    const router = useRouter();

    // React Hook Form and zod schema validation
    const { register, control, handleSubmit, formState: { errors, isValid } } = useForm<IssueForm>({
        resolver: zodResolver(issueSchema),
    });

    // State Varaiables
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Submitting form data, handle POST or PATCH request

    const onSubmit = handleSubmit(async (data) => {
        try {
            setIsSubmitting(true);
            // await axios.post('/api/issues', data);
            if (issue) {
                await axios.patch(`/api/issues/${issue.id}`, data);
            }
            else {
                await axios.post('/api/issues', data);
            }
            router.push('/issues');
            router.refresh();
        } catch (error) {
            //console.log(error);
            setIsSubmitting(false);
            setError('An unexpected error occured');
        }
    })

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
                    onSubmit={onSubmit}>
                    <TextField.Root>
                        <TextField.Input defaultValue={issue?.title} placeholder='Title' {...register('title')} />
                    </TextField.Root>
                    {<ErrorMessage>{errors.title?.message}</ErrorMessage>}
                    <Controller
                        name='description'
                        control={control}
                        defaultValue={issue?.description}
                        render={({ field }) => <SimpleMDE placeholder='Description' {...field} />}
                    />
                    {<ErrorMessage>{errors.description?.message}</ErrorMessage>}
                    {/* <Button disabled={isSubmitting}>Submit New Issue {isSubmitting && <Spinner />}</Button> */}
                    <Button
                        disabled={isSubmitting}>{issue ? 'Update Issue' : 'Submit New Issue'}{''}
                        {isSubmitting && <Spinner />}
                    </Button>
                </form>
            </div>
        </>
    )
}

export default IssueForm