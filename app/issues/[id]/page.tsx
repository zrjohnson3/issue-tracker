import React from 'react'
import { notFound } from 'next/navigation'
import prisma from '@/prisma/client'
import { Box, Flex, Grid } from '@radix-ui/themes'

import EditIssueButton from './EditIssueButton'
import IssueDetails from './IssueDetails'
import DeleteIssueButton from './DeleteIssueButton'

interface Props {
    params: { id: string }
}

const IssueDetailPage = async ({ params }: Props) => {
    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(params.id) }
    })

    if (!issue) {
        notFound();
    }
    return (
        <Grid columns={{ initial: "1", md: "2" }} gap={"5"}>
            <Box className='md:col-span-4'>
                <IssueDetails issue={issue} />
            </Box>
            {/* <Box>
                <EditIssueButton issueId={issue.id} />
            </Box> */}
            <Flex direction={"column"} gap={"4"}>
                <EditIssueButton issueId={issue.id} />
                <DeleteIssueButton issueId={issue.id} />
            </Flex>
        </Grid>
    )
}

export default IssueDetailPage