import useSound from "use-sound";
import halsey from "./audio/halsey.mp3";
import styles from "./App.module.css";
import Draggable from "react-draggable";
import { useEffect, useState, useRef } from "react";

const audio = new Audio(halsey);
audio.currentTime = 0.5;

let time = 0;
let lineWidth = 300;

const allPhrases = [];

function App() {
    const [timeLine, setTimeLine] = useState(0);
    const [bound, setBound] = useState(0);
    const [dragPositon, setDragPosition] = useState({ x: 0 });

    const [currentPhrase, setCurrentPhrase] = useState();

    const nodeRef = useRef();
    const dotRef = useRef();

    const play = () => {
        // audio.currentTime += 5;
        setTimeLine(0);
        audio.play();
    };

    const stop = () => {
        audio.pause();
        time = audio.currentTime;
    };

    const handleStop = (e, data) => {
        let deltaX = data.x + timeLine;
        // console.log(deltaX);
        audio.currentTime = (deltaX / lineWidth) * audio.duration;

        if (dotRef) {
            console.log(dotRef.current.offsetLeft);
        }

        if (nodeRef) {
            console.log("node", nodeRef.current);
        }
    };

    useEffect(() => {
        let interval = setInterval(() => {
            if (!audio.paused && audio.currentTime < audio.duration - 5) {
                setTimeLine(
                    (prevState) => prevState + lineWidth / audio.duration
                );
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [audio.paused, audio.currentTime, audio.duration]);

    // useEffect(() => {
    //     let interval = setInterval(() => {
    //         console.log(audio.currentTime);
    //     }, 100);

    //     return () => {
    //         clearInterval(interval);
    //     };
    // }, [audio.currentTime]);

    useEffect(() => {}, [dotRef]);

    return (
        <div className={styles.main}>
            <button onClick={() => play()}>Click</button>
            <button onClick={() => stop()}>Stop</button>
            <br />
            <div className={styles.line}>
                <Draggable
                    axis="x"
                    bounds="parent"
                    onStop={handleStop}
                    ref={nodeRef}
                >
                    <div
                        ref={dotRef}
                        className={styles.dot}
                        style={{
                            top: -8.5,
                            left: timeLine,
                        }}
                    />
                </Draggable>
            </div>
        </div>
    );
}

export default App;
