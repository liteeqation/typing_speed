console.log("Script loaded");

const typingText = document.querySelector('.typing-text p');
const input = document.querySelector('.wrapper .input-field');
const time = document.querySelector('.time span b');
const mistakes = document.querySelector('.mistakes span');
const wpm = document.querySelector('.wpm span');
const cpm = document.querySelector('.cpm span');
const btn = document.querySelector('.button');

let timer;
let maxTime = 60;
let timeLeft = maxTime;
let charIndex = 0;
let mistake = 0;
let isTyping = false;

function loadParagraph() {
    const paragraph = [
        "In Fortnite, players battle to be the last one standing in a dynamic, ever-changing map while building structures for tactical advantages",

        "Valorant combines tactical shooting with unique agent abilities, creating intense matches where precise teamwork and strategy are key to victory",

        "In Counter-Strike: Global Offensive, terrorists and counter-terrorists face off in high-stakes missions,with teamwork and strategy being crucial for success",

        "The F1 series puts players in the driver’s seat of a Formula 1 car, simulating the speed, precision,and strategy of real-world racing circuits",

        "In Fortnite, the battle royale genre is revolutionized with its vibrant graphics, frequent updates,and cross-platform play, keeping the game fresh and exciting",

        "Valorant features a diverse roster of agents,each with unique abilities that complement their precise gunplay, making every match a blend of strategy and skill",

        "In CS:GO, iconic maps like Dust2 and Mirage have become arenas for competitive play, where tactical gameplay and sharpshooting are essential for winning",

        "F1 games replicate the thrill of racing with realistic graphics and physics,offering players the chance to experience the highs and lows of the Formula 1 season",

        "Fortnite's building mechanics allow players to create structures on-the-fly,adding a unique layer of strategy to the traditional battle royale formula",

        "Valorant’s economy system and round-based play echo classic tactical shooters,demanding both individual skill and team coordination to achieve victory",
    
        "In The Last of Us, Joel and Ellie navigate a post-apocalyptic world, forming a deep bond as they fight for survival",

        "Spider-Man swings through New York City, battling iconic villains like Green Goblin and Doctor Octopus in Marvel's Spider-Man",

        "Nathan Drake embarks on epic treasure hunts in Uncharted, uncovering ancient mysteries and battling ruthless mercenaries",

        "In Grand Theft Auto V, players experience the intertwining lives of three criminals in Los Santos, engaging in high-stakes heists and chaos",

        "Geralt of Rivia, the protagonist of The Witcher 3, hunts monstrous creatures and explores a rich, fantasy world filled with political intrigue and moral choices",

        "Link, the hero of The Legend of Zelda, ventures through dungeons and puzzles to rescue Princess Zelda and thwart the evil plans of Ganon",

        "In Red Dead Redemption 2, Arthur Morgan, an outlaw, faces the decline of the Wild West while struggling with his own moral dilemmas",

        "Lara Croft explores ancient ruins and uncovers secrets in Tomb Raider, balancing her role as an archaeologist with action-packed adventures",

        "In Halo, Master Chief battles alien forces and uncovers a galaxy-spanning conspiracy while fighting to protect humanity",

        "In Final Fantasy VII, Cloud Strife and his allies fight against the corrupt Shinra corporation and the powerful villain Sephiroth to save their world"

    ];

    const randomIndex = Math.floor(Math.random() * paragraph.length);
    typingText.innerHTML = '';
    for (const char of paragraph[randomIndex]) {
        typingText.innerHTML += `<span>${char}</span>`;
    }
    typingText.querySelectorAll('span')[0].classList.add('active');
    document.addEventListener('keydown', () => input.focus());
    typingText.addEventListener("click", () => input.focus());
}

function initTyping() {
    const char = typingText.querySelectorAll('span');
    const typeChar = input.value.charAt(charIndex);

    if (!isTyping && input.value.length > 0) {
        isTyping = true;
        timer = setInterval(initTime, 1000);
    }

    if (charIndex < char.length && timeLeft > 0) {
        char[charIndex].classList.remove('correct','incorrect');
        if (char[charIndex].innerText === typeChar) {
            char[charIndex].classList.add('correct');
        } else {
            mistake++;
            char[charIndex].classList.add('incorrect');
        }
        charIndex++;
        if (char[charIndex]) char[charIndex].classList.add('active');
        mistakes.innerText = mistake;
        cpm.innerText = charIndex - mistake;
    }

    if (charIndex >= char.length || timeLeft <= 0) {
        clearInterval(timer);
        isTyping = false;
        input.value = '';
    }
}

function initTime() {
    if (timeLeft > 0) {
        timeLeft--;
        time.innerText = timeLeft;
        const wpmVal = Math.round(((charIndex - mistake) / 5) / ((maxTime - timeLeft) / 60));
        wpm.innerText = wpmVal;
    } else {
        clearInterval(timer);
        isTyping = false;
    }
}

function reset() {
    loadParagraph();
    clearInterval(timer);
    timeLeft = maxTime;
    time.innerText = timeLeft;
    input.value = '';
    charIndex = 0;
    mistake = 0;
    isTyping = false;
    wpm.innerText = 0;
    cpm.innerText = 0;
    mistakes.innerText = 0;
}

input.addEventListener("input", initTyping);
btn.addEventListener('click', reset);
loadParagraph();

