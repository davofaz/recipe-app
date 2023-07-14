import { MdOutlineFoodBank } from "react-icons/md";

interface TitleComponentProps {
    title: string;
}

const TitleComponent: React.FC<TitleComponentProps> = ({title}) => {
    return (
        <h1 className="text-2xl p-5 text-center flex flex-row-reverse">{title}<MdOutlineFoodBank size={34} /></h1>
    )
}

export default TitleComponent;