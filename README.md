<div align="center">
  <img src="https://i.ibb.co/K6HtyCB/kkkaudiostream.png" width="200">

# Audio Player

</div>

### How it works

When client receives audios list, in response there is 5 seconds long link of audio called `preBuffer`, we must load it immediatelly in `Blob` that means it loads audio locally so, it wont need to decode audio and wait when it will play

after client starts to play audio, 5 seconds of audio chunk starts playing and menawhile, we start requesting chunks, 5 by 5 seconds to receive them, and put them in stack to play it, audio is streamed, with 0 seconds of loading after click it

<img width="993" alt="image" src="https://github.com/audiostreamhq/player/assets/65135792/038b3d86-6d2e-415b-890d-3c85c1f770ca">
