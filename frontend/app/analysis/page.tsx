import ManualTest from "@/components/custom/ManualTest";
import { RobotAnimate } from "@/components/custom/RobotAnimate";

interface Props {

}

const Analysis: React.FC<Props> = () => {
    return (
        <div className="px-6 py-4">

            <div className="flex">
                <ManualTest />
                <RobotAnimate />
            </div>


            
        </div>
    );
}

export default Analysis;