const playlist = [
  {
    trackname: "Untitled 05",
    artist: "Kendrick Lamar",
    song: "songs/untitled05.mp3",
    cover: "images/KENDRICK_UU.png",
  },
  {
    trackname: "Breathe Deeper",
    artist: "Tame Impala",
    song: "songs/breathedeeper.mp3",
    cover: "images/TAMEIMPALA_TSR.png",
  },
  {
    trackname: "We fight / We love",
    artist: "QTIP",
    song: "songs/wefightwelove.mp3",
    cover: "images/QTIP_RENAISSANCE.png",
  },
  {
    trackname: "Still dreaming",
    artist: "Nas Ft. Kanye West",
    song: "songs/stilldreaming.mp3",
    cover: "images/NAS_HHID.png",
  },
  {
    trackname: "Conrad Tokyo",
    artist: "A Tribe Called Quest",
    song: "songs/conradtokyo.mp3",
    cover: "images/ATCQ_WGIFH.png",
  },
  {
    trackname: "Purple",
    artist: "Nas",
    song: "songs/purple.mp3",
    cover: "images/NAS_TLT.png",
  },
].filter((track) => track.trackname && track.artist)


const audioElement = document.getElementById("song")
const playPauseBtn = document.getElementById("playpause")
const playIcon = playPauseBtn.querySelector(".play-icon")
const pauseIcon = playPauseBtn.querySelector(".pause-icon")
const previousButton = document.getElementById("previous")
const nextButton = document.getElementById("next")
const muteButton = document.getElementById("mute")
const volumeIcon = muteButton.querySelector(".volume-icon")
const muteIcon = muteButton.querySelector(".mute-icon")
const volumeSlider = document.getElementById("volume")
const progressBar = document.getElementById("progress")
const currentTimeEl = document.querySelector(".current-time")
const totalTimeEl = document.querySelector(".total-time")
const tracknameElement = document.getElementById("trackname")
const artistElement = document.getElementById("artist")
const coverElement = document.getElementById("cover")
const albumArt = document.querySelector(".album-art")


let currentIndex = 0
let isPlaying = false
let isMuted = false
let previousVolume = 0.5


audioElement.volume = 0.5
volumeSlider.value = audioElement.volume * 100


function formatTime(seconds) {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`
}


function updatePlayerUI() {
  // Update track info
  tracknameElement.textContent = playlist[currentIndex].trackname
  artistElement.textContent = playlist[currentIndex].artist
  coverElement.src = playlist[currentIndex].cover

 
  if (isPlaying) {
    playIcon.classList.add("hidden")
    pauseIcon.classList.remove("hidden")
    albumArt.classList.add("playing")
  } else {
    playIcon.classList.remove("hidden")
    pauseIcon.classList.add("hidden")
    albumArt.classList.remove("playing")
  }

  
  if (isMuted) {
    volumeIcon.classList.add("hidden")
    muteIcon.classList.remove("hidden")
  } else {
    volumeIcon.classList.remove("hidden")
    muteIcon.classList.add("hidden")
  }
}


function loadSong(index) {
  currentIndex = index
  audioElement.src = playlist[index].song
  updatePlayerUI()

  
  progressBar.value = 0
  currentTimeEl.textContent = "0:00"

  
  audioElement.addEventListener("loadedmetadata", () => {
    totalTimeEl.textContent = formatTime(audioElement.duration)
  })

  if (isPlaying) {
    audioElement.play().catch((error) => {
      console.error("die:", error)
      isPlaying = false
      updatePlayerUI()
    })
  }
}


function togglePlayPause() {
  if (audioElement.paused) {
    audioElement
      .play()
      .then(() => {
        isPlaying = true
        updatePlayerUI()
      })
      .catch((error) => {
        console.error("fuck you:", error)
      })
  } else {
    audioElement.pause()
    isPlaying = false
    updatePlayerUI()
  }
}


function playNextSong() {
  currentIndex = (currentIndex + 1) % playlist.length
  loadSong(currentIndex)
  if (isPlaying) {
    audioElement.play().catch((error) => {
      console.error("Playback failed:", error)
      isPlaying = false
      updatePlayerUI()
    })
  }
}


function playPreviousSong() {
  currentIndex = (currentIndex - 1 + playlist.length) % playlist.length
  loadSong(currentIndex)
  if (isPlaying) {
    audioElement.play().catch((error) => {
      console.error("Playback failed:", error)
      isPlaying = false
      updatePlayerUI()
    })
  }
}


function toggleMute() {
  if (audioElement.volume > 0) {
    previousVolume = audioElement.volume
    audioElement.volume = 0
    volumeSlider.value = 0
    isMuted = true
  } else {
    audioElement.volume = previousVolume
    volumeSlider.value = previousVolume * 100
    isMuted = false
  }
  updatePlayerUI()
}


function setVolume() {
  audioElement.volume = volumeSlider.value / 100
  if (audioElement.volume > 0) {
    isMuted = false
  } else {
    isMuted = true
  }
  updatePlayerUI()
}

// progress bar
function updateProgress() {
  const percent = (audioElement.currentTime / audioElement.duration) * 100
  progressBar.value = percent || 0
  currentTimeEl.textContent = formatTime(audioElement.currentTime)
}


function setProgress() {
  audioElement.currentTime = (progressBar.value / 100) * audioElement.duration
}


playPauseBtn.addEventListener("click", togglePlayPause)
nextButton.addEventListener("click", playNextSong)
previousButton.addEventListener("click", playPreviousSong)
muteButton.addEventListener("click", toggleMute)
volumeSlider.addEventListener("input", setVolume)
audioElement.addEventListener("timeupdate", updateProgress)
progressBar.addEventListener("input", setProgress)


audioElement.addEventListener("ended", playNextSong)

// real controls wtf real
document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    e.preventDefault()
    togglePlayPause()
  } else if (e.code === "ArrowRight") {
    playNextSong()
  } else if (e.code === "ArrowLeft") {
    playPreviousSong()
  } else if (e.code === "ArrowUp") {
    volumeSlider.value = Math.min(100, Number.parseInt(volumeSlider.value) + 10)
    setVolume()
  } else if (e.code === "ArrowDown") {
    volumeSlider.value = Math.max(0, Number.parseInt(volumeSlider.value) - 10)
    setVolume()
  } else if (e.code === "KeyM") {
    toggleMute()
  }
})


loadSong(currentIndex)
updatePlayerUI()


const color_mode = "Custom" 
const Saturation = 100 
const Lightness = 40 
const color_count = 5 
const color_1 = "#ff00ff" 
const color_2 = "#b400b4"
const color_3 = "#7000ff" 
const color_4 = "#4b0082" 
const color_5 = "#9400d3" 
const color_6 = "#ff00ff" 
const gradient_type = "Perlin" 
const effect_scale = 45 
const color_spread = 50 
const x_pos = 50 
const y_pos = 50 
const pixel_size = 6 

// some easy calculations
function HEX_to_RGB(hex) {
  hex = hex.replace(/^#/, "")
  if (hex.length === 3)
    hex = hex
      .split("")
      .map((x) => x + x)
      .join("")
  const num = Number.parseInt(hex, 16)
  return [((num >> 16) & 255) / 255, ((num >> 8) & 255) / 255, (num & 255) / 255]
}
function RGB_to_HEX(rgb) {
  return (
    "#" +
    rgb
      .map((x) => {
        const val = Math.round(x * 255).toString(16)
        return val.length === 1 ? "0" + val : val
      })
      .join("")
  )
}
function lerp(a, b, t) {
  return a + (b - a) * t
}
function wrap(x, min = 0, max = 1) {
  return x - Math.floor((x - min) / (max - min)) * (max - min)
}
function lerp_RGB(a, b, t) {
  return [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)]
}
function get_color_RGB(colors, t) {
  const len = colors.length
  t *= len
  return lerp_RGB(colors[wrap(Math.floor(t), 0, len)], colors[wrap(Math.ceil(t), 0, len)], wrap(t, 0, 1))
}
function get_color_HEX(colors, t) {
  return RGB_to_HEX(get_color_RGB(colors, t))
}
function smooth_HSL_to_RGB(h, s, l) {
  h = h - Math.floor(h)
  const tau = Math.PI * 2
  const y0 = Math.max(l * 2 - 1, 0)
  const y1 = Math.min(l * 2, 1)
  const x0 = (-1 / 3 - 1 / 2) * s + 1 / 2
  const x1 = (1 - 1 / 2) * s + 1 / 2
  const dx = (x1 - x0) * 0.5
  const p = s - y0 * 0.5 <= 0.5 ? 1 : 0.5 * ((s - y0 * 0.5 - 0.5) / 0.5) + 1
  return [
    Math.max(
      ((Math.cos((h - 0 / 3) * tau) * (1 - dx ** 2 * 0.5) + 1 - dx ** 2 * 0.5 * 0.25) * dx + x0) * (1 - y0) + y0,
      0,
    ) **
      p *
      y1,
    Math.max(
      ((Math.cos((h - 1 / 3) * tau) * (1 - dx ** 2 * 0.6) + 1 - dx ** 2 * 0.6 * 0.25) * dx + x0) * (1 - y0) + y0,
      0,
    ) **
      p *
      y1,
    Math.max(
      ((Math.cos((h - 2 / 3) * tau) * (1 - dx ** 2 * 0.0) + 1 - dx ** 2 * 0.0 * 0.25) * dx + x0) * (1 - y0) + y0,
      0,
    ) **
      p *
      y1,
  ]
}
function clamp(x, a, b) {
  return x > b ? b : x < a ? a : x
}


const noise = (() => {
  const perm = new Uint8Array(512)
  const grad3 = [
    [1, 1, 0],
    [-1, 1, 0],
    [1, -1, 0],
    [-1, -1, 0],
    [1, 0, 1],
    [-1, 0, 1],
    [1, 0, -1],
    [-1, 0, -1],
    [0, 1, 1],
    [0, -1, 1],
    [0, 1, -1],
    [0, -1, -1],
  ]
  function seed(s) {
    for (let i = 0; i < 256; i++) perm[i] = i
    for (let i = 0; i < 256; i++) {
      const j = (s = (s * 9301 + 49297) % 233280) % 256
      ;[perm[i], perm[j]] = [perm[j], perm[i]]
    }
    for (let i = 0; i < 256; i++) perm[i + 256] = perm[i]
  }
  seed(1337) //hackerman
  function fade(t) {
    return t * t * t * (t * (t * 6 - 15) + 10)
  }
  function lerp(a, b, t) {
    return a + (b - a) * t
  }
  function grad(hash, x, y, z) {
    const g = grad3[hash % 12]
    return g[0] * x + g[1] * y + g[2] * z
  }
  function perlin(x, y, z) {
    const X = Math.floor(x) & 255,
      Y = Math.floor(y) & 255,
      Z = Math.floor(z) & 255
    x -= Math.floor(x)
    y -= Math.floor(y)
    z -= Math.floor(z)
    const u = fade(x),
      v = fade(y),
      w = fade(z)
    const aaa = perm[X + perm[Y + perm[Z]]]
    const aba = perm[X + perm[Y + 1 + perm[Z]]]
    const aab = perm[X + perm[Y + perm[Z + 1]]]
    const abb = perm[X + perm[Y + 1 + perm[Z + 1]]]
    const baa = perm[X + 1 + perm[Y + perm[Z]]]
    const bba = perm[X + 1 + perm[Y + 1 + perm[Z]]]
    const bab = perm[X + 1 + perm[Y + perm[Z + 1]]]
    const bbb = perm[X + 1 + perm[Y + 1 + perm[Z + 1]]]
    return lerp(
      lerp(
        lerp(grad(aaa, x, y, z), grad(baa, x - 1, y, z), u),
        lerp(grad(aba, x, y - 1, z), grad(bba, x - 1, y - 1, z), u),
        v,
      ),
      lerp(
        lerp(grad(aab, x, y, z - 1), grad(bab, x - 1, y, z - 1), u),
        lerp(grad(abb, x, y - 1, z - 1), grad(bbb, x - 1, y - 1, z - 1), u),
        v,
      ),
      w,
    )
  }
  function perlin_normalized(x, y, z) {
    return perlin(x, y, z) * 0.5 + 0.5
  }
  return { perlin, perlin_normalized }
})()

const c = document.getElementById("exCanvas")
const ctx = c.getContext("2d")
let WIDTH = window.innerWidth,
  HEIGHT = window.innerHeight
function resizeCanvas() {
  WIDTH = window.innerWidth
  HEIGHT = window.innerHeight
  c.width = WIDTH
  c.height = HEIGHT
}
window.addEventListener("resize", resizeCanvas)
resizeCanvas()


let prev_time = performance.now()
let time = performance.now()
let colors_RGB = []
let colors_HEX = []
let c_x = WIDTH / 2
let c_y = HEIGHT / 2
let spread = 1
let scale = 1
let z = 0
const PI = Math.PI
const TWO_PI = 2 * PI


function update() {
  if (c.width !== window.innerWidth || c.height !== window.innerHeight) resizeCanvas()

  prev_time = time
  time = performance.now()


  colors_HEX = []
  colors_RGB = []
  switch (color_mode) {
    case "Custom":
      colors_HEX = [color_1, color_2, color_3, color_4, color_5, color_6].slice(0, color_count)
      colors_RGB = colors_HEX.map((c) => HEX_to_RGB(c))
      break
    case "Smooth Hues":
      const len = 24
      for (let i = 0; i < len; i++) {
        colors_RGB[i] = smooth_HSL_to_RGB(i / len, Saturation * 0.01, Lightness * 0.01)
        colors_HEX[i] = RGB_to_HEX(colors_RGB[i])
      }
      break
  }

  
  c_x = x_pos * 0.01 * WIDTH
  c_y = y_pos * 0.01 * HEIGHT
  scale = 4 ** (effect_scale / 50 - 1)
  spread = 4 ** (color_spread / 50 - 1)

  ctx.clearRect(0, 0, WIDTH, HEIGHT)

  if (colors_RGB.length === 0) {
    ctx.fillStyle = "#ff00ff"
    ctx.fillRect(0, 0, WIDTH, HEIGHT)
    console.error("No colors to display!")
  } else if (gradient_type === "Conic") {
    for (let y = 0; y < HEIGHT; y += pixel_size) {
      for (let x = 0; x < WIDTH; x += pixel_size) {
        const dx = x + pixel_size / 2 - c_x
        const dy = y + pixel_size / 2 - c_y
        const t = dx === 0 && dy === 0 ? 0 : (Math.atan2(dy, dx) / TWO_PI) * spread
        const rgb = get_color_RGB(colors_RGB, t)
        ctx.fillStyle = RGB_to_HEX(rgb)
        ctx.fillRect(x, y, pixel_size, pixel_size)
      }
    }
  } else if (gradient_type === "Linear") {
    for (let y = 0; y < HEIGHT; y += pixel_size) {
      for (let x = 0; x < WIDTH; x += pixel_size) {
        const t = ((x + pixel_size / 2) / WIDTH + (y + pixel_size / 2) / HEIGHT) * 0.5 * spread
        const rgb = get_color_RGB(colors_RGB, t)
        ctx.fillStyle = RGB_to_HEX(rgb)
        ctx.fillRect(x, y, pixel_size, pixel_size)
      }
    }
  } else if (gradient_type === "Radial") {
    for (let y = 0; y < HEIGHT; y += pixel_size) {
      for (let x = 0; x < WIDTH; x += pixel_size) {
        const dx = x + pixel_size / 2 - c_x
        const dy = y + pixel_size / 2 - c_y
        const dist = Math.sqrt(dx * dx + dy * dy) / (Math.max(WIDTH, HEIGHT) / 2)
        const t = dist * spread
        const rgb = get_color_RGB(colors_RGB, t)
        ctx.fillStyle = RGB_to_HEX(rgb)
        ctx.fillRect(x, y, pixel_size, pixel_size)
      }
    }
  } else if (gradient_type === "Perlin") {
    z += 0.01 
    const color_shift = (performance.now() * 0.0001) % 1
    const uv_scale = 0.005 * scale // Slightly increased for better detail

    
    ctx.globalAlpha = 0.9

    for (let y = 0; y < HEIGHT; y += pixel_size) {
      for (let x = 0; x < WIDTH; x += pixel_size) {
        const u = (x + pixel_size / 2 - c_x) * uv_scale
        const v = (y + pixel_size / 2 - c_y) * uv_scale
        const t = noise.perlin_normalized(u, v, z) * spread + color_shift
        const rgb = get_color_RGB(colors_RGB, t)

        
        ctx.fillStyle = RGB_to_HEX(rgb)
        ctx.fillRect(x - 1, y - 1, pixel_size + 2, pixel_size + 2)
      }
    }

    
    ctx.globalAlpha = 1.0
  } else {
    ctx.fillStyle = "#ff00ff"
    ctx.fillRect(0, 0, WIDTH, HEIGHT)
    console.error("fuck this:", gradient_type)
  }

  window.requestAnimationFrame(update)
}
window.requestAnimationFrame(update)
