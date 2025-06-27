import Link from "next/link"
import { Button } from "../../components/ui/button"
export default function Landing() {
    return (
        <>

            <div>Landing</div>
            <Link href={'/sign-in'}>
                <Button variant={"default"}> Sign In</Button>
            </Link>
            <Link href={'/sign-up'}>
                <Button variant={"default"}> Sign Up</Button>
            </Link>
        </>

    )
}

