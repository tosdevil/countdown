// countdown script:

date = 'Jun 28, 2024 19:00:00'
const countDownDate = new Date(date).getTime();

const interval = setInterval(() => {
	const now = new Date().getTime();
	const duration = countDownDate - now;

	if (duration < 0) {
		clearInterval(interval);
		updateDuration(0);
		return;
	}
	updateDuration(duration);
}, 1000);
	
function updateDuration(duration) {
	const days = Math.floor(duration / (1000 * 60 * 60 * 24));
	const hours = Math.floor((duration % (1000 * 60 * 60 * 24))/(1000 * 60 * 60));
	const minutes = Math.floor((duration % (1000 * 60 * 60))/(1000 * 60));
	const seconds = Math.floor((duration % (1000 * 60)) / 1000);

	document.getElementById('days').innerHTML = days;
	document.getElementById('days_label').innerHTML = getDaySuffix(days);
	document.getElementById('hours').innerHTML = hours;
	document.getElementById('hours_label').innerHTML = getHourSuffix(hours);
	document.getElementById('minutes').innerHTML = minutes;
	document.getElementById('minutes_label').innerHTML = getMinuteSuffix(minutes);
	document.getElementById('seconds').innerHTML = seconds;
	document.getElementById('seconds_label').innerHTML = getSecondSuffix(seconds);

	if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
		document.getElementById('final').classList.remove('hiddenn');
		confetti();
  }

}

function getDaySuffix(day) {
  const lastDigit = day % 10;
  const lastTwoDigits = day % 100;
  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
    return "дней";
  }
  switch (lastDigit) {
    case 1:
      return "день";
    case 2:
    case 3:
    case 4:
      return "дня";
    default:
      return "дней";
  }
}

function getHourSuffix(hour) {
  const lastDigit = hour % 10;
  const lastTwoDigits = hour % 100;
  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
    return "часов";
  }
  switch (lastDigit) {
    case 1:
      return "час";
    case 2:
    case 3:
    case 4:
      return "часа";
    default:
      return "часов";
  }
}

function getMinuteSuffix(minute) {
  const lastDigit = minute % 10;
  const lastTwoDigits = minute % 100;
  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
    return "минут";
  }
  switch (lastDigit) {
    case 1:
      return "минуту";
    case 2:
    case 3:
    case 4:
      return "минуты";
    default:
      return "минут";
  }
}

function getSecondSuffix(second) {
  const lastDigit = second % 10;
  const lastTwoDigits = second % 100;
  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
    return "секунд";
  }
  switch (lastDigit) {
    case 1:
      return "секунду";
    case 2:
    case 3:
    case 4:
      return "секунды";
    default:
      return "секунд";
  }
}

// player script:

const songList = [
	{
		name: "Пора домой",
		artist: "Сектор Газа",
		src: "assets/mp3/sektor_gaza_domoy.mp3",
		cover: "assets/jpg/sektor_gaza_domoy.jpg"
	},
	{
		name: "Слово пацана",
		artist: "Макс Корж",
		src: "assets/mp3/max_korzh_slovo_pacana.mp3",
		cover: "assets/jpg/max_korzh_slovo_pacana.jpg"
	},
	{
		name: "Жить в кайф",
		artist: "Макс Корж",
		src: "assets/mp3/max_korzh_zhit_v_kayf.mp3",
		cover: "assets/jpg/max_korzh_zhit_v_kayf.jpg"
	},
	{
		name: "Get Real",
		artist: "David Bowie",
		src: "assets/mp3/david_bowie_get_real.mp3",
		cover: "assets/jpg/david_bowie_get_real.jpg"
	},
	{
		name: "BIRDS OF A FEATHER",
		artist: "Billie Eilish",
		src: "assets/mp3/Billie_Eilish_BIRDS_OF_A_FEATHER.mp3",
		cover: "assets/jpg/Billie_Eilish_BIRDS_OF_A_FEATHER.jpg"
	},
	{
		name: "October - TripSauce Mix",
		artist: "FRIENDLY THUG 52 NGG",
		src: "assets/mp3/FRIENDLY_THUG_October_Dnb_Remix.mp3",
		cover: "assets/jpg/FRIENDLY_THUG_October_Dnb_Remix.jpg"
	},
	{
		name: "Loving Machine",
		artist: "TV Girl",
		src: "assets/mp3/TV_Girl_Loving_Machine.mp3",
		cover: "assets/jpg/TV_Girl_Loving_Machine.jpg"
	},
]

const artistName = document.querySelector('.artist-name');
const musicName = document.querySelector('.song-name');
const fillBar = document.querySelector('.fill-bar');
const time = document.querySelector('.time');
const cover = document.getElementById('cover');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const prog = document.querySelector('.progress-bar');

let song = new Audio();
let currentSong = 0;
let playing = false;

document.addEventListener('DOMContentLoaded', () => {
	loadSong(currentSong);
	song.addEventListener('timeupdate', updateProgress);
	song.addEventListener('ended', nextSong);
	prevBtn.addEventListener('click', prevSong);
	nextBtn.addEventListener('click', nextSong);
	playBtn.addEventListener('click', togglePlayPause);
	prog.addEventListener('click', seek);
});

function loadSong(index)
{
	const { name, artist, src, cover: thumb } = songList[index];
	artistName.innerText = artist;
	musicName.innerText = name;
	song.src = src;
	cover.style.backgroundImage = `url(${thumb})`
}

function updateProgress()
{
	if(song.duration)
		{
			const pos = (song.currentTime / song.duration) * 100;
			fillBar.style.width = `${pos}%`

			const duration = formatTime(song.duration);
			const currentTime = formatTime(song.currentTime);
			time.innerText = `${currentTime} - ${duration}`;
		}
}

function formatTime(seconds)
{
	const minutes = Math.floor(seconds / 60);
	const secs = Math.floor(seconds % 60);
	return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

function togglePlayPause()
{
	if(playing)
		{
			song.pause();
		}else 
		{
			song.play();
		}
		playing = !playing;
		playBtn.classList.toggle('fa-pause', playing);
		playBtn.classList.toggle('fa-play', !playing);
		cover.classList.toggle('active',playing)
}

function nextSong()
{
	currentSong = (currentSong + 1) % songList.length;
	playMusic();
}

function prevSong()
{
	currentSong = (currentSong - 1 + songList.length) % songList.length;
	playMusic();
}

function playMusic()
{
	loadSong(currentSong);
	song.play();
	playing = true;
	playBtn.classList.add('fa-pause');
	playBtn.classList.remove('fa-play');
	cover.classList.add('active');
}

function seek(e)
{
	const pos = (e.offsetX / prog.clientWidth) * song.duration;
	song.currentTime = pos;
}