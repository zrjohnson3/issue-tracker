// import IssueForm from "@/app/components/IssueForm"
import dynamic from "next/dynamic"
import IssueFormSkeleton from "./LoadingNewIssuePage"

const IssueForm = dynamic(
    () => import('@/app/components/IssueForm'),
    {
        ssr: false,
        loading: () => <IssueFormSkeleton />
    }
)

const NewIssuePage = () => {


    return (
        <IssueForm />
    )
}

export default NewIssuePage