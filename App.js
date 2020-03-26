import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
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
      <Text>{`${currentTimeMins} : ${currentTimeSecs}`}</Text>
      <Button
        buttonStyle={styles.myButton}
        onPress={startButton}
        title="Start"
      />
      <Button buttonStyle={styles.myButton} onPress={stopButton} title="Stop" />
      <Button style={styles.button} onPress={resetButton} title="Reset" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "red",
    fontSize: 28
  },
  button: {
    backgroundColor: "blue",
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 12,
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    overflow: "hidden",
    padding: 12,
    textAlign: "center"
  }
});
