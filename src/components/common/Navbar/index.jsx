import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate(); 

    return (
        <div className="p-3 shadow-sm flex justify-between items-center px-5">
            <div>
                <img
                    src="/logo.svg"
                    className="hover:cursor-pointer"
                    onClick={() => navigate('/')}
                    alt="Logo"
                />
            </div>
            <div>
                <Button>Sign In</Button>
            </div>
        </div>
    );
};

export default Navbar;
