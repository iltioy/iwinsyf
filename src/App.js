import useSound from "use-sound";
import halsey from "./audio/halsey.mp3";
import styles from "./App.module.css";
import Draggable from "react-draggable";
import { useEffect, useState, useRef } from "react";

const audio = new Audio(halsey);
audio.currentTime = 0.5;

let time = 0;
let lineWidth = 300;

function App() {
    const [timeLine, setTimeLine] = useState(0);
    const [bound, setBound] = useState(0);

    const dotRef = useRef();

    const play = () => {
        // audio.currentTime += 5;
        audio.play();
    };

    const stop = () => {
        audio.pause();
        time = audio.currentTime;
    };

    const handleStop = (e, data) => {
        audio.currentTime = (data.x / lineWidth) * audio.duration;
    };

    useEffect(() => {
        let interval = setInterval(() => {
            if (!audio.paused && audio.currentTime < audio.duration - 5) {
                setTimeLine(
                    (prevState) => prevState + lineWidth / audio.duration
                );
                setBound((prevState) => prevState - timeLine);
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [audio.paused, audio.currentTime, audio.duration]);

    return (
        <div className={styles.main}>
            <button onClick={() => play()}>Click</button>
            <button onClick={() => stop()}>Stop</button>
            <br />
            <div className={styles.line}>
                <Draggable
                    axis="x"
                    bounds={{ left: bound, right: lineWidth - 8.5 + bound }}
                    onStop={handleStop}
                >
                    <div
                        ref={dotRef}
                        className={styles.dot}
                        style={{ left: timeLine, top: -8.5 }}
                    />
                </Draggable>
            </div>
        </div>
    );
}

export default App;
