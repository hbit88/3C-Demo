let stream;
let recorder;

startMicrophoneButton.addEventListener("click", async () => {
  // Prompt the user to use their microphone.
  stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  recorder = new MediaRecorder(stream);
});

stopMicrophoneButton.addEventListener("click", () => {
  // Stop the stream.
  stream.getTracks().forEach(track => track.stop());
});

startRecordButton.addEventListener("click", async () => {
  // For the sake of more legible code, this sample only uses the
  // `showSaveFilePicker()` method. In production, you need to
  // cater for browsers that don't support this method, as
  // outlined in https://web.dev/patterns/files/save-a-file/.

  // Prompt the user to choose where to save the recording file.
  const suggestedName = "microphone-recording.webm";
  const handle = await window.showSaveFilePicker({ suggestedName });
  const writable = await handle.createWritable();

  // Start recording.
  recorder.start();
  recorder.addEventListener("dataavailable", async (event) => {
    // Write chunks to the file.
    await writable.write(event.data);
    if (recorder.state === "inactive") {
      // Close the file when the recording stops.
      await writable.close();
    }
  });
});

stopRecordButton.addEventListener("click", () => {
  // Stop the recording.
  recorder.stop();
});