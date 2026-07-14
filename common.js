const GOOGLE_API_URL = "https://script.google.com/macros/s/AKfycbyH7U0pDNYhRZanfP0k6NiKKtwZGnKpcCMdJyx8l6xFrzGhf6yma3Y9TQv6X-0r-HAxwg/exec";

const badWords = [
    "fuck", "shit", "bitch", "pussy", "whore", "idiot", "stupid", "wtf", "mdfk", "nmsl", "retard", "psycho", "loser", "trash", "autist", "gay", "lesbian",
    "幹", "靠北", "靠杯", "靠腰", "靠夭", "靠妖", "靠么", "機掰", "雞掰", "擊敗", "姬芭", "機八", "雞巴", "雞排", "操", "肏", "草泥馬", "操你", "媽的", "他媽", "幹你娘", "幹您娘", "趕羚羊", "機車", "ㄘㄠˋ", "ㄍㄢˋ", "ㄐㄅ", "e04", "林北", "恁爸", "老木", "老母", "哭爸", "哭夭"
];

window.isMuted = false;

function toggleSound(e) {
    if (e) e.stopPropagation();
    window.isMuted = !window.isMuted;
    const btn = document.getElementById('sound-btn');
    if (window.isMuted) {
        if (btn) { btn.innerHTML = "🔇 音效：關"; btn.style.borderColor = "var(--error)"; }
        document.querySelectorAll('audio').forEach(a => a.muted = true);
    } else {
        if (btn) { btn.innerHTML = "🔊 音效：開"; btn.style.borderColor = "var(--success)"; }
        document.querySelectorAll('audio').forEach(a => a.muted = false);
    }
}

// Summer Camp 過濾機制 (如果網址帶有 ?camp=1，則只保留包含 summer 的關卡選項)
document.addEventListener('DOMContentLoaded', () => {
    if (new URLSearchParams(window.location.search).get('camp') === '1') {
        document.querySelectorAll('select').forEach(select => {
            // 排除不要過濾的特定選單 (例如 vocab-race 的題數選單)
            if (select.id === 't-rounds' || select.id === 't-time') return;
            
            Array.from(select.options).forEach(opt => {
                // 如果選項有 value 且不包含 'summer'，且不是預設的 placeholder(disabled)，就移除它
                if (opt.value && !opt.value.includes('summer') && !opt.disabled) {
                    opt.remove();
                }
            });
            // 移除空的 optgroup
            Array.from(select.querySelectorAll('optgroup')).forEach(grp => {
                if (grp.children.length === 0) grp.remove();
            });
        });
    }
});
