
import { BarWave } from "react-cssfx-loading";

function Loading(props) {

    return (
        <div style={{ background: "#00000091", position: "absolute", top: "0", left: "0", bottom: "0", right: "0", display: "flex", flexDirection: "column" }}>
            <BarWave color="#003789" style={{ margin: "auto" }} width="40px" height="30px" duration="1.3s" />
        </div>
    );

}

export default Loading;