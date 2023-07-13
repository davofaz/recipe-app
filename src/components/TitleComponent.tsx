import { MdOutlineFoodBank } from "react-icons/md";
import { Link } from "react-router-dom";

interface TitleComponentProps {
    title: string;
}

const TitleComponent: React.FC<TitleComponentProps> = ({title}) => {
    return (
        <Link to={`/`}><h1 className="text-2xl p-5 text-center flex flex-row-reverse">{title}<MdOutlineFoodBank size={34} /></h1></Link>
    )
}

export default TitleComponent;