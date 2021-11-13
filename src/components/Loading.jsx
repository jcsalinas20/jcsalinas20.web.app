
import { BarWave } from "react-cssfx-loading";

function Loading(props) {

    return (
        <div className="loaderBarWave">
            <BarWave className="loader-image" color={(props.color) ? props.color : "#FFF"} width="40px" height="30px" duration="1.3s" />
            <p style={{ color: (props.color) ? props.color : "#FFF" }} className="loader-content">Developing</p>
        </div>
    );

}

export default Loading;