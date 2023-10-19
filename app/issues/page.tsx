'use client'
import React, { useState, useEffect } from 'react'
import { Button } from '@radix-ui/themes'
import Link from 'next/link'
import axios from 'axios';
import { Issue } from '@prisma/client';

const IssuePage = () => {

    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('/api/issues').then((response) => {
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
            <h3>IssuesPage</h3><br />

            <table className='table-auto box-border border-seperate border border-spacing-3 border-stone-600'>
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
            </table>
            <br />
            <Button className='items-center text-center'><Link href={"/issues/new"}>New Issue</Link></Button>

        </div>
    )
}

export default IssuePage