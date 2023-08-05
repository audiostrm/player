<div align="center">
  <img src="https://i.ibb.co/K6HtyCB/kkkaudiostream.png" width="200">

# Audio Player

</div>

### How it works

When client receives audios list, in response there is 5 seconds long link of audio called `preBuffer`

after client starts to play audio, 5 seconds of audio chunk starts playing and menawhile, we start requesting chunks, 5 by 5 seconds to receive them, and put them in array to play it, audio is streamed, with 0 seconds of loading after click it

<img width="993" alt="image" src="https://github.com/audiostreamhq/player/assets/65135792/038b3d86-6d2e-415b-890d-3c85c1f770ca">

### Play

<img width="1409" alt="image" src="https://github.com/audiostreamhq/player/assets/65135792/41ee9461-2824-44ed-9cab-bc09ccd966d9">

in player there are chunks each chunk represents 5 seconds long audio buffer which are sorted accordingly, in arraybuffer when we start playing audio we, start playing from index `0` sourcebuffer, which is already decoded and saved audio, when this audio ends playing we move on next source node and continue playing

#### Loading and slow internet connection

based on 5 seconds long audio chunk which is literally 74kb in size, it wont have effect, it plays pretty well on **Slow 3G internet connection**, except if client won't seek it, what if

Q: chunk didnt load on time?
A: we try to check if arraybuffer is there, we know that duration for example is 243 seconds long, we also have urls, if there is 49 url and source nodes are 3 in total, and current playing source is 3 we know that not all of them are decoded yet so here is what we do

```js
/*
 if current playing source index is higher than current fetched source nodes
 and source nodes are lower than totalChunk links what has to be received we
 starting checking in every 1.5 seconds if chunk got received to resume playing 
*/
if (sourceIndex > sources.length - 1 && sources.length < totalChunks) {
  const interval = setInterval(() => {
    if (sourceIndex <= sources.length - 1) {
      sources[sourceIndex].start();
      sources[sourceIndex].addEventListener('ended', playSource);
      clearInterval(interval);
    }
  }, 1500);
}
```

### Seek

<img width="1425" alt="image" src="https://github.com/audiostreamhq/player/assets/65135792/eee61e85-4617-4bc2-aa74-3e3988af0093">

for example we got 243 seconds long audio we know there is 49 chunks in total because each chunk contains 5 seconds long audio, when we want to seek it on 132, we put current source index on `25` because 132 / 5 = 26.4 and starting playing of 25th chunk in array from 2 seconds
