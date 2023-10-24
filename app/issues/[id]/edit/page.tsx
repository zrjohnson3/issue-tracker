import React from 'react'
import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'
// import IssueForm from '@/app/components/IssueForm'
import dynamic from 'next/dynamic'
import IssueFormSkeleton from './loading'

const IssueForm = dynamic(
    () => import('@/app/components/IssueForm'),
    {
        ssr: false,
        loading: () => <IssueFormSkeleton />
    }
)

interface Props {
    params: { id: string }
}

const EditIssuePage = async ({ params }: Props) => {
    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(params.id) }
    });

    if (!issue) notFound();

    return (
        <IssueForm issue={issue} />
    )
}



export default EditIssuePage