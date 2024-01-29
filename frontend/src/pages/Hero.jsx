import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import { Button } from "@/components/ui/button"

const Hero = () => {

    return (
        <div>
            <MaxWidthWrapper className='mt-20'>
                <h1 className='max-w-3xl font-bold text-center tracking-tight mx-auto text-5xl'>Write it...</h1>
                <div className="text-center mx-auto">
                    <Button className='mt-10'>Create a post</Button>
                    <Button className='mt-10 ml-5'>Read posts</Button>
                </div>
                <div>

                </div>
            </MaxWidthWrapper>
        </div>
    )
}

export default Hero
