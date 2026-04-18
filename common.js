const GOOGLE_API_URL = "https://script.google.com/macros/s/AKfycbyH7U0pDNYhRZanfP0k6NiKKtwZGnKpcCMdJyx8l6xFrzGhf6yma3Y9TQv6X-0r-HAxwg/exec";

const badWords = [
    "fuck", "shit", "bitch", "pussy", "whore", "idiot", "stupid", "wtf", "mdfk", "nmsl", "retard", "psycho", "loser", "trash", "autist", "gay", "lesbian",
    "幹", "靠北", "靠杯", "靠腰", "靠夭", "靠妖", "靠么", "機掰", "雞掰", "擊敗", "姬芭", "機八", "雞巴", "雞排", "操", "肏", "草泥馬", "操你", "媽的", "他媽", "幹你娘", "幹您娘", "趕羚羊", "機車", "ㄘㄠˋ", "ㄍㄢˋ", "ㄐㄅ", "e04", "林北", "恁爸", "老木", "老母", "哭爸", "哭夭"
];

function toggleSound(e) {
    if (e) e.stopPropagation();
    isMuted = !isMuted;
    const btn = document.getElementById('sound-btn');
    if (isMuted) {
        btn.innerHTML = "🔇 音效：關"; btn.style.borderColor = "var(--error)";
        document.querySelectorAll('audio').forEach(a => a.muted = true);
    } else {
        btn.innerHTML = "🔊 音效：開"; btn.style.borderColor = "var(--success)";
        document.querySelectorAll('audio').forEach(a => a.muted = false);
    }
}
