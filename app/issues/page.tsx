import React from 'react'
import { Button } from '@radix-ui/themes'
import Link from 'next/link'

const IssuePage = () => {
    return (
        <div>
            <h3>IssuesPage</h3><br />
            <Button><Link href={"/issues/new"}>New Issue</Link></Button>

        </div>
    )
}

export default IssuePage