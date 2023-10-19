'use client'
import React, { useState, useEffect } from 'react'
import { Button, Table } from '@radix-ui/themes'
import Link from 'next/link'
import axios from 'axios';
import { Issue } from '@prisma/client';
import IssueStatusBadge from '../components/IssueStatusBadge';
import IssueActions from './IssueActions';
import delay from 'delay';

const IssuePage = () => {

    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('/api/issues').then((response) => {
            delay(10000);
            setIssues(response.data);
            setLoading(false);
        }).catch((error) => {
            console.log(error);
        });
    }, [])

    // axios.get('/api/issues').then((response) => {
    //     setIssues(response.data);
    //     setLoading(false);
    // }).catch((error) => {
    //     console.log(error);
    // });

    return (
        <div>
            <h2 className='text-3xl text-center items-center'>Issues Page</h2><br />


            {/* <Button>
                <Link href={"/issues/new"}>New Issue</Link>
            </Button> */}

            <br />
            <IssueActions />
            <Table.Root className='py-3'>
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className='hidden md:table-cell'>Title</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className='hidden md:table-cell'>Description</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className='hidden md:table-cell'>Status</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className='hidden md:table-cell'>Created</Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {issues.map((issue: any) => (
                        <Table.Row key={issue.id}>
                            <Table.Cell className='hidden md:table-cell'>{issue.id}</Table.Cell>
                            <Table.Cell>
                                <Link href={`/issues/${issue.id}`}>
                                    <p className='hover:underline'>{issue.title}</p>
                                </Link>
                            </Table.Cell>

                            <Table.Cell className='hidden md:table-cell'>{issue.description}</Table.Cell>
                            <Table.Cell className='hidden md:table-cell'>
                                <IssueStatusBadge status={issue.status} />
                                {/* {issue.status} */}
                            </Table.Cell>
                            <Table.Cell className='hidden md:table-cell'>{issue.createdAt}</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>

            {/* <table className='table-auto box-border border-seperate border border-spacing-3 border-stone-600'>
                <thead>
                    <tr>
                        <th className="border p-4">ID</th>
                        <th className="border p-4">Title</th>
                        <th className="border p-4">Description</th>
                        <th className="border p-4">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan={4} className="border p-4 text-center">Loading...</td>
                        </tr>
                    ) : (
                        issues.map((issue: Issue) => (
                            <tr key={issue.id}>
                                <td className="border p-4">{issue.id}</td>
                                <td className="border p-4">{issue.title}</td>
                                <td className="border p-4">{issue.description}</td>
                                <td className="border p-4">{issue.status}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table> */}
            {/* <br />
            <Button className='items-center text-center'><Link href={"/issues/new"}>New Issue</Link></Button> */}

        </div>
    )
}

export default IssuePage