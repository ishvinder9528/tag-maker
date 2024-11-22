import { Button } from "../ui/button"
import { Input } from "../ui/input"

const CreateTag = () => {
    return (
        <div className="mx-56 my-20 grid grid-cols-2 gap-10">
            <div >

                <h1 className="text-2xl font-bold">
                    Enter Details
                </h1>
                <div className="my-4 flex flex-col gap-3">
                    <div>
                        <h3>
                            Shop Id
                        </h3>
                        <Input type='text' placeholder='Enter Shop Id' />
                    </div>

                    <div>
                        <h3>
                            Code
                        </h3>
                        <Input type='text' placeholder='Enter Code' />
                    </div>

                    <div>
                        <h3>
                            Price
                        </h3>
                        <Input type='text' placeholder='Enter Price' />
                    </div>

                    <div>
                        <h3>
                            Shop Id
                        </h3>
                        <Input type='text' placeholder='Enter Shop Id' />
                    </div>
                </div>

                <div className="flex justify-end">
                    <Button className=''>Generate</Button>
                </div>

            </div>

            {/* right */}
            <div>

                <h1 className="text-2xl font-bold">
                    Your Tag
                </h1>

            </div>
        </div>
    )
}

export default CreateTag