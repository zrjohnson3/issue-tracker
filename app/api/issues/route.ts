import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { issueSchema } from "../../validationSchemas";


/* POST Request (Add Issue) */
export async function POST(request: NextRequest, res: NextResponse) {
    console.log("Starting POST Request");
    const body = await request.json();
    console.log(body);
    const validation = issueSchema.safeParse(body);
    console.log(validation);

    if (!validation.success) {

        return NextResponse.json(validation.error.format(), { status: 400 });
    }
    else if (validation.success) {

        const newIssue = await prisma.issue.create({
            data: {
                title: body.title,
                description: body.description
            }
        })

        return NextResponse.json(newIssue, { status: 201 });
    }
    else {
        return NextResponse.json("Something went wrong", { status: 500 });
    }


    // Was having issues with wrong version for some of the dependenceis
    // if (!validation.success) {
    //     return NextResponse.json(
    //         validation.error.errors,
    //         {status: 400}
    //     );
    // }
    // else if(validation.success){
    //     const newIssue = prisma.issue.create({
    //         data: { title: body.title, description: body.description }
    //     });
    //     return NextResponse.json(newIssue, {status: 201})
    // }
    // else{
    //     return NextResponse.json("Something went wrong", {status: 500})
    // }

}

export async function GET(request: NextRequest, res: NextResponse) {
    console.log("Starting GET Request");

    const validation = await prisma.issue.findMany();
    // console.log(validation);
    if (validation != null) {
        return NextResponse.json(validation, { status: 200 });
    }
    else {
        return NextResponse.json("Error Occured", { status: 400 });
    }


}