import { issueSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

/* PATCH Request (Update Issue) */
export async function PATCH(
    request: NextRequest,
    { params }: { params: { id: string } }) {
    console.log("Starting PATCH Request");

    const body = await request.json();
    const validation = issueSchema.safeParse(body);

    if (!validation.success) {
        return NextResponse.json(validation.error.format(), { status: 400 });
    }

    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(params.id) }
    })

    if (!issue) {
        return NextResponse.json("Issue not found", { status: 404 })
    }

    const updateIssue = await prisma.issue.update({
        where: { id: issue.id },
        data: {
            title: body.title,
            description: body.description
        }
    })

    return NextResponse.json(updateIssue);

}


/* DELTE Request (Delete Issue)  */
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }) {
    console.log("Starting DELETE Request");

    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(params.id) }
    })
    if (!issue) {
        return NextResponse.json("Issue not found", { status: 404 })
    }

    const deleteIssue = await prisma.issue.delete({
        where: { id: issue.id }
    })

    return NextResponse.json(deleteIssue);

}