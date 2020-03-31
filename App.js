import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import { vibrate } from "./utils";

const timeBigTimer = "25";
const timeSmallTimer = "05";

export default function App() {
  const [currentTimeMins, setCurrentTimeMins] = useState(timeBigTimer);
  const [currentTimeSecs, setCurrentTimeSecs] = useState("60");
  const [timerRunning, setTimerRunning] = useState(true);
  const [bigTimerActive, setBigTimerActive] = useState(true);

  useEffect(() => {
    if (timerRunning) {
      const timer = setInterval(() => {
        if (currentTimeSecs <= 0 && currentTimeMins <= 0) {
          vibrate();
          setBigTimerActive(!bigTimerActive);
          if (bigTimerActive) {
            setCurrentTimeMins(timeBigTimer);
          } else {
            setCurrentTimeMins(timeSmallTimer);
          }
        } else if (currentTimeSecs <= 0 && currentTimeMins > 0) {
          setCurrentTimeMins((currentTimeMins - 1).toString().padStart(2, "0"));
          setCurrentTimeSecs("59");
        } else {
          setCurrentTimeSecs((currentTimeSecs - 1).toString().padStart(2, "0"));
        }
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [currentTimeSecs, currentTimeMins, timerRunning]);

  function startButton() {
    setTimerRunning(true);
  }

  function stopButton() {
    setTimerRunning(false);
  }

  function resetButton() {
    setTimerRunning(false);
    if (bigTimerActive) {
      setCurrentTimeMins(timeBigTimer);
      setCurrentTimeSecs("00");
    } else {
      setCurrentTimeMins(timeSmallTimer);
      setCurrentTimeSecs("00");
    }
  }

  return (
    <View style={styles.container}>
      <Text>Hi Murray! It's all going to be ok...</Text>
      <Text
        style={styles.timerText}
      >{`${currentTimeMins} : ${currentTimeSecs}`}</Text>
      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={startButton}
        accessibilityLabel="Start timer"
      >
        <Text style={styles.buttonText}>Start</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={stopButton}
        accessibilityLabel="Stop timer"
      >
        <Text style={styles.buttonText}>Stop</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={resetButton}
        accessibilityLabel="Reset timer"
      >
        <Text style={styles.buttonText}>Reset</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "red"
  },
  timerText: { fontSize: 40, padding: 10 },
  buttonStyle: {
    backgroundColor: "green",
    borderRadius: 10,
    padding: 15,
    margin: 5
  },
  buttonText: {
    color: "white",
    fontSize: 20
  }
});
