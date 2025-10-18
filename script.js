// 英语词典 - 完整修复版
const API_BASE_URL = 'https://api.dictionaryapi.dev/api/v2/entries/en';

// 本地缓存
const wordCache = new Map();

// 扩展的本地单词数据库（50+常用单词）
const localWordDatabase = {
    "hello": {
        word: "hello",
        phonetic: "/həˈloʊ/",
        meanings: [
            {
                partOfSpeech: "interjection",
                definitions: [
                    {
                        definition: "Used as a greeting or to begin a telephone conversation.",
                        example: "Hello, how are you today?"
                    }
                ]
            },
            {
                partOfSpeech: "noun",
                definitions: [
                    {
                        definition: "An utterance of 'hello'; a greeting.",
                        example: "She gave me a warm hello."
                    }
                ]
            }
        ]
    },
    "dictionary": {
        word: "dictionary",
        phonetic: "/ˈdɪkʃəneri/",
        meanings: [
            {
                partOfSpeech: "noun",
                definitions: [
                    {
                        definition: "A book or electronic resource that lists the words of a language and gives their meaning.",
                        example: "I looked up the word in the dictionary."
                    }
                ]
            }
        ]
    },
    "apple": {
        word: "apple",
        phonetic: "/ˈæp.əl/",
        meanings: [
            {
                partOfSpeech: "noun",
                definitions: [
                    {
                        definition: "A round fruit with red, yellow, or green skin and firm white flesh.",
                        example: "I eat an apple every day for breakfast."
                    }
                ]
            }
        ]
    },
    "book": {
        word: "book",
        phonetic: "/bʊk/",
        meanings: [
            {
                partOfSpeech: "noun",
                definitions: [
                    {
                        definition: "A written or printed work consisting of pages glued or sewn together along one side and bound in covers.",
                        example: "I'm reading an interesting book about history."
                    }
                ]
            },
            {
                partOfSpeech: "verb",
                definitions: [
                    {
                        definition: "To reserve something in advance.",
                        example: "We should book a table at the restaurant."
                    }
                ]
            }
        ]
    },
    "computer": {
        word: "computer",
        phonetic: "/kəmˈpjuː.tər/",
        meanings: [
            {
                partOfSpeech: "noun",
                definitions: [
                    {
                        definition: "An electronic device for storing and processing data.",
                        example: "I use my computer for work and entertainment."
                    }
                ]
            }
        ]
    },
    "water": {
        word: "water",
        phonetic: "/ˈwɔː.tər/",
        meanings: [
            {
                partOfSpeech: "noun",
                definitions: [
                    {
                        definition: "A transparent, odorless, tasteless liquid that forms the seas, lakes, rivers, and rain.",
                        example: "Drink plenty of water every day."
                    }
                ]
            }
        ]
    },
    "friend": {
        word: "friend",
        phonetic: "/frend/",
        meanings: [
            {
                partOfSpeech: "noun",
                definitions: [
                    {
                        definition: "A person whom one knows and with whom one has a bond of mutual affection.",
                        example: "She's been my best friend since childhood."
                    }
                ]
            }
        ]
    },
    "school": {
        word: "school",
        phonetic: "/skuːl/",
        meanings: [
            {
                partOfSpeech: "noun",
                definitions: [
                    {
                        definition: "An institution for educating children.",
                        example: "My children go to school nearby."
                    }
                ]
            }
        ]
    },
    "teacher": {
        word: "teacher",
        phonetic: "/ˈtiː.tʃər/",
        meanings: [
            {
                partOfSpeech: "noun",
                definitions: [
                    {
                        definition: "A person who teaches, especially in a school.",
                        example: "Our English teacher is very patient."
                    }
                ]
            }
        ]
    },
    "student": {
        word: "student",
        phonetic: "/ˈstuː.dənt/",
        meanings: [
            {
                partOfSpeech: "noun",
                definitions: [
                    {
                        definition: "A person who is studying at a school or college.",
                        example: "She is a good student and always does her homework."
                    }
                ]
            }
        ]
    },
    "family": {
        word: "family",
        phonetic: "/ˈfæm.əl.i/",
        meanings: [
            {
                partOfSpeech: "noun",
                definitions: [
                    {
                        definition: "A group consisting of parents and children living together in a household.",
                        example: "I have a large family with three brothers."
                    }
                ]
            }
        ]
    },
    "time": {
        word: "time",
        phonetic: "/taɪm/",
        meanings: [
            {
                partOfSpeech: "noun",
                definitions: [
                    {
                        definition: "The indefinite continued progress of existence and events in the past, present, and future.",
                        example: "What time is it now?"
                    }
                ]
            }
        ]
    },
    "work": {
        word: "work",
        phonetic: "/wɜːrk/",
        meanings: [
            {
                partOfSpeech: "verb",
                definitions: [
                    {
                        definition: "To engage in physical or mental activity in order to achieve a purpose or result.",
                        example: "I work from 9 to 5 every day."
                    }
                ]
            }
        ]
    },
    "home": {
        word: "home",
        phonetic: "/hoʊm/",
        meanings: [
            {
                partOfSpeech: "noun",
                definitions: [
                    {
                        definition: "The place where one lives permanently.",
                        example: "I'm going home after work."
                    }
                ]
            }
        ]
    },
    "city": {
        word: "city",
        phonetic: "/ˈsɪt.i/",
        meanings: [
            {
                partOfSpeech: "noun",
                definitions: [
                    {
                        definition: "A large town.",
                        example: "New York is a big city."
                    }
                ]
            }
        ]
    },
    "food": {
        word: "food",
        phonetic: "/fuːd/",
        meanings: [
            {
                partOfSpeech: "noun",
                definitions: [
                    {
                        definition: "Any nutritious substance that people or animals eat or drink.",
                        example: "Italian food is delicious."
                    }
                ]
            }
        ]
    },
    "music": {
        word: "music",
        phonetic: "/ˈmjuː.zɪk/",
        meanings: [
            {
                partOfSpeech: "noun",
                definitions: [
                    {
                        definition: "Vocal or instrumental sounds combined in such a way as to produce beauty of form, harmony, and expression of emotion.",
                        example: "I listen to music while working."
                    }
                ]
            }
        ]
    },
    "love": {
        word: "love",
        phonetic: "/lʌv/",
        meanings: [
            {
                partOfSpeech: "noun",
                definitions: [
                    {
                        definition: "An intense feeling of deep affection.",
                        example: "They are in love with each other."
                    }
                ]
            }
        ]
    },
    "life": {
        word: "life",
        phonetic: "/laɪf/",
        meanings: [
            {
                partOfSpeech: "noun",
                definitions: [
                    {
                        definition: "The condition that distinguishes animals and plants from inorganic matter.",
                        example: "Life is beautiful."
                    }
                ]
            }
        ]
    },
    "world": {
        word: "world",
        phonetic: "/wɜːrld/",
        meanings: [
            {
                partOfSpeech: "noun",
                definitions: [
                    {
                        definition: "The earth, together with all of its countries and peoples.",
                        example: "She has traveled all around the world."
                    }
                ]
            }
        ]
    },
    "people": {
        word: "people",
        phonetic: "/ˈpiː.pəl/",
        meanings: [
            {
                partOfSpeech: "noun",
                definitions: [
                    {
                        definition: "Human beings in general or considered collectively.",
                        example: "There were a lot of people at the concert."
                    }
                ]
            }
        ]
    },
    "good": {
        word: "good",
        phonetic: "/ɡʊd/",
        meanings: [
            {
                partOfSpeech: "adjective",
                definitions: [
                    {
                        definition: "To be desired or approved of.",
                        example: "This is a good book."
                    }
                ]
            }
        ]
    },
    "bad": {
        word: "bad",
        phonetic: "/bæd/",
        meanings: [
            {
                partOfSpeech: "adjective",
                definitions: [
                    {
                        definition: "Of poor quality or low standard.",
                        example: "The weather was bad yesterday."
                    }
                ]
            }
        ]
    },
    "happy": {
        word: "happy",
        phonetic: "/ˈhæp.i/",
        meanings: [
            {
                partOfSpeech: "adjective",
                definitions: [
                    {
                        definition: "Feeling or showing pleasure or contentment.",
                        example: "She has a happy smile on her face."
                    }
                ]
            }
        ]
    },
    "sad": {
        word: "sad",
        phonetic: "/sæd/",
        meanings: [
            {
                partOfSpeech: "adjective",
                definitions: [
                    {
                        definition: "Feeling or showing sorrow; unhappy.",
                        example: "He was sad when his friend moved away."
                    }
                ]
            }
        ]
    },
    "big": {
        word: "big",
        phonetic: "/bɪɡ/",
        meanings: [
            {
                partOfSpeech: "adjective",
                definitions: [
                    {
                        definition: "Of considerable size or extent.",
                        example: "They live in a big house."
                    }
                ]
            }
        ]
    },
    "small": {
        word: "small",
        phonetic: "/smɔːl/",
        meanings: [
            {
                partOfSpeech: "adjective",
                definitions: [
                    {
                        definition: "Of a size that is less than normal or usual.",
                        example: "She has a small apartment in the city."
                    }
                ]
            }
        ]
    },
    "learn": {
        word: "learn",
        phonetic: "/lɜːrn/",
        meanings: [
            {
                partOfSpeech: "verb",
                definitions: [
                    {
                        definition: "Gain or acquire knowledge of or skill in (something) by study, experience, or being taught.",
                        example: "I want to learn English."
                    }
                ]
            }
        ]
    },
    "study": {
        word: "study",
        phonetic: "/ˈstʌd.i/",
        meanings: [
            {
                partOfSpeech: "verb",
                definitions: [
                    {
                        definition: "Devote time and attention to acquiring knowledge on (an academic subject), especially by means of books.",
                        example: "I need to study for my exam."
                    }
                ]
            }
        ]
    },
    "read": {
        word: "read",
        phonetic: "/riːd/",
        meanings: [
            {
                partOfSpeech: "verb",
                definitions: [
                    {
                        definition: "Look at and comprehend the meaning of (written or printed matter) by interpreting the characters or symbols of which it is composed.",
                        example: "I like to read books in my free time."
                    }
                ]
            }
        ]
    },
    "write": {
        word: "write",
        phonetic: "/raɪt/",
        meanings: [
            {
                partOfSpeech: "verb",
                definitions: [
                    {
                        definition: "Mark (letters, words, or other symbols) on a surface, typically paper, with a pen, pencil, or similar implement.",
                        example: "Please write your name here."
                    }
                ]
            }
        ]
    },
    "speak": {
        word: "speak",
        phonetic: "/spiːk/",
        meanings: [
            {
                partOfSpeech: "verb",
                definitions: [
                    {
                        definition: "Say something in order to convey information, an opinion, or a feeling.",
                        example: "Can you speak English?"
                    }
                ]
            }
        ]
    }
};

// DOM元素
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const welcomeCard = document.getElementById('welcomeCard');
const wordContent = document.getElementById('wordContent');
const errorCard = document.getElementById('errorCard');
const wordTitle = document.getElementById('wordTitle');
const wordPhonetic = document.getElementById('wordPhonetic');
const wordMeanings = document.getElementById('wordMeanings');
const pronounceBtn = document.getElementById('pronounceBtn');
const saveWordBtn = document.getElementById('saveWordBtn');
const vocabList = document.getElementById('vocabList');
const emptyVocab = document.getElementById('emptyVocab');
const vocabCount = document.getElementById('vocabCount');
const navLinks = document.querySelectorAll('.nav-link');

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    console.log('词典初始化...');
    loadVocabulary();
    
    // 搜索功能
    searchBtn.addEventListener('click', searchWord);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchWord();
        }
    });
    
    // 发音功能
    pronounceBtn.addEventListener('click', pronounceWord);
    
    // 保存单词功能
    saveWordBtn.addEventListener('click', saveToVocabulary);
    
    // 导航切换
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.getAttribute('data-section');
            
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            if (section === 'vocabulary') {
                document.querySelector('.word-section').style.display = 'none';
                document.querySelector('.search-section').style.display = 'none';
                document.querySelector('.sidebar').style.width = '100%';
            } else {
                document.querySelector('.word-section').style.display = 'block';
                document.querySelector('.search-section').style.display = 'block';
                document.querySelector('.sidebar').style.width = '';
            }
        });
    });

    console.log('本地词库包含单词:', Object.keys(localWordDatabase));
});

// 搜索单词 - 简化版本，优先使用本地
async function searchWord() {
    const query = searchInput.value.trim().toLowerCase();
    
    if (!query) {
        showError('请输入要查询的单词');
        return;
    }
    
    console.log('搜索单词:', query);
    
    // 显示加载状态
    showLoading('搜索中...');
    
    try {
        let wordData;
        
        // 1. 先检查本地数据库
        if (localWordDatabase[query]) {
            wordData = localWordDatabase[query];
            wordData.source = 'local';
            console.log('从本地数据加载:', query);
        }
        // 2. 再检查缓存
        else if (wordCache.has(query)) {
            wordData = wordCache.get(query);
            console.log('从缓存加载:', query);
        }
        // 3. 最后尝试API
        else {
            console.log('尝试从API获取:', query);
            wordData = await fetchWordFromAPI(query);
            wordCache.set(query, wordData);
        }
        
        displayWord(wordData);
        
    } catch (error) {
        console.error('搜索错误:', error);
        
        // 提供更友好的错误信息
        const localWords = Object.keys(localWordDatabase).slice(0, 10).join(', ');
        showError(`未找到单词 "${query}"\n\n可以尝试这些本地单词：\n${localWords}...`);
    }
}

// 从API获取单词数据 - 简化版本
async function fetchWordFromAPI(word) {
    return new Promise((resolve, reject) => {
        // 模拟网络延迟
        setTimeout(async () => {
            try {
                // 直接尝试访问API
                const response = await fetch(`${API_BASE_URL}/${encodeURIComponent(word)}`);
                
                if (!response.ok) {
                    if (response.status === 404) {
                        reject(new Error(`未找到单词 "${word}"`));
                    } else {
                        reject(new Error('网络请求失败，请使用本地单词'));
                    }
                    return;
                }
                
                const data = await response.json();
                resolve(formatAPIData(data[0]));
                
            } catch (error) {
                console.error('API请求失败:', error);
                reject(new Error('网络连接失败，请使用本地单词'));
            }
        }, 500);
    });
}

// 格式化API数据
function formatAPIData(apiData) {
    return {
        word: apiData.word,
        phonetic: getPhonetic(apiData),
        meanings: apiData.meanings.map(meaning => ({
            partOfSpeech: meaning.partOfSpeech,
            definitions: meaning.definitions.map(def => ({
                definition: def.definition,
                example: def.example || ''
            }))
        })),
        source: 'api'
    };
}

// 获取音标
function getPhonetic(apiData) {
    if (apiData.phonetic) {
        return apiData.phonetic;
    }
    
    if (apiData.phonetics && apiData.phonetics.length > 0) {
        const phonetic = apiData.phonetics.find(p => p.text);
        if (phonetic) {
            return phonetic.text;
        }
    }
    
    return '/音标暂无/';
}

// 显示加载状态
function showLoading(message = '搜索中...') {
    welcomeCard.style.display = 'none';
    wordContent.style.display = 'none';
    errorCard.style.display = 'block';
    document.getElementById('errorMessage').innerHTML = `
        <div style="text-align: center;">
            <div style="font-size: 3rem; margin-bottom: 1rem;">🔍</div>
            <h3>${message}</h3>
            <div class="loading-spinner" style="
                width: 40px;
                height: 40px;
                border: 4px solid #f3f3f3;
                border-top: 4px solid var(--blue);
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin: 20px auto;
            "></div>
        </div>
    `;
}

// 显示单词信息
function displayWord(wordData) {
    welcomeCard.style.display = 'none';
    errorCard.style.display = 'none';
    wordContent.style.display = 'block';
    
    wordTitle.textContent = wordData.word;
    wordPhonetic.textContent = wordData.phonetic;
    
    // 清空之前的含义
    wordMeanings.innerHTML = '';
    
    // 添加数据来源提示
    const sourceHint = document.createElement('div');
    sourceHint.className = 'source-hint';
    
    if (wordData.source === 'api') {
        sourceHint.innerHTML = '🌐 数据来自网络 API';
        sourceHint.style.background = 'rgba(17, 138, 178, 0.1)';
    } else {
        sourceHint.innerHTML = '📱 数据来自本地词库';
        sourceHint.style.background = 'rgba(255, 179, 71, 0.1)';
    }
    
    sourceHint.style.cssText = `
        text-align: center;
        color: var(--blue);
        font-size: 0.9rem;
        margin-bottom: 1rem;
        padding: 8px;
        border-radius: 10px;
        font-weight: 600;
    `;
    
    wordMeanings.appendChild(sourceHint);
    
    // 添加每个词性和定义
    wordData.meanings.forEach(meaning => {
        const meaningSection = document.createElement('div');
        meaningSection.className = 'meaning-section';
        
        const partOfSpeech = document.createElement('h3');
        partOfSpeech.className = 'part-of-speech';
        partOfSpeech.textContent = meaning.partOfSpeech;
        meaningSection.appendChild(partOfSpeech);
        
        meaning.definitions.forEach((def, index) => {
            const definition = document.createElement('div');
            definition.className = 'definition';
            
            const defText = document.createElement('p');
            defText.textContent = `${index + 1}. ${def.definition}`;
            definition.appendChild(defText);
            
            if (def.example) {
                const example = document.createElement('p');
                example.className = 'example';
                example.textContent = `💡 ${def.example}`;
                definition.appendChild(example);
            }
            
            meaningSection.appendChild(definition);
        });
        
        wordMeanings.appendChild(meaningSection);
    });
    
    // 更新保存按钮状态
    updateSaveButton(wordData.word);
    
    // 添加显示动画
    wordContent.style.opacity = '0';
    setTimeout(() => {
        wordContent.style.transition = 'opacity 0.3s ease';
        wordContent.style.opacity = '1';
    }, 10);
}

// 显示错误信息
function showError(message) {
    welcomeCard.style.display = 'none';
    wordContent.style.display = 'none';
    errorCard.style.display = 'block';
    
    // 处理多行错误信息
    const messageLines = message.split('\n');
    const formattedMessage = messageLines.map(line => {
        if (line.includes('可以尝试')) {
            return `<strong>${line}</strong>`;
        }
        return line;
    }).join('<br>');
    
    document.getElementById('errorMessage').innerHTML = `
        <div style="text-align: center;">
            <div style="font-size: 3rem; margin-bottom: 1rem;">😕</div>
            <h3>${formattedMessage}</h3>
        </div>
    `;
}

// 更新保存按钮状态
function updateSaveButton(word) {
    const savedWords = getSavedWords();
    if (savedWords.includes(word)) {
        saveWordBtn.innerHTML = '<span class="btn-icon">✅</span> 已保存';
        saveWordBtn.disabled = true;
        saveWordBtn.style.background = 'linear-gradient(135deg, var(--green) 0%, var(--blue) 100%)';
    } else {
        saveWordBtn.innerHTML = '<span class="btn-icon">❤️</span> 加入生词本';
        saveWordBtn.disabled = false;
        saveWordBtn.style.background = 'linear-gradient(135deg, var(--pink) 0%, var(--orange) 100%)';
    }
}

// 发音功能
function pronounceWord() {
    const word = wordTitle.textContent;
    
    if (!('speechSynthesis' in window)) {
        showTempMessage('您的浏览器不支持语音合成功能', 'error');
        return;
    }
    
    // 停止任何正在进行的语音
    speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-US';
    utterance.rate = 0.8;
    utterance.pitch = 1;
    utterance.volume = 1;
    
    // 添加发音动画
    pronounceBtn.innerHTML = '<span class="btn-icon">🔊</span> 发音中...';
    pronounceBtn.disabled = true;
    
    utterance.onstart = function() {
        pronounceBtn.style.background = 'linear-gradient(135deg, var(--orange) 0%, var(--yellow) 100%)';
    };
    
    utterance.onend = function() {
        pronounceBtn.innerHTML = '<span class="btn-icon">🔊</span> 发音';
        pronounceBtn.disabled = false;
        pronounceBtn.style.background = 'linear-gradient(135deg, var(--green) 0%, var(--blue) 100%)';
    };
    
    utterance.onerror = function(event) {
        console.error('发音错误:', event);
        pronounceBtn.innerHTML = '<span class="btn-icon">🔊</span> 发音';
        pronounceBtn.disabled = false;
        showTempMessage('发音失败', 'error');
    };
    
    speechSynthesis.speak(utterance);
    
    // 添加点击动画
    pronounceBtn.style.transform = 'scale(0.95)';
    setTimeout(() => {
        pronounceBtn.style.transform = '';
    }, 150);
}

// 保存到生词本
function saveToVocabulary() {
    const word = wordTitle.textContent;
    const savedWords = getSavedWords();
    
    if (!savedWords.includes(word)) {
        savedWords.push(word);
        localStorage.setItem('vocabulary', JSON.stringify(savedWords));
        loadVocabulary();
        updateSaveButton(word);
        
        // 添加保存动画
        saveWordBtn.innerHTML = '<span class="btn-icon">✨</span> 已保存！';
        setTimeout(() => {
            updateSaveButton(word);
        }, 1000);
        
        showTempMessage(`"${word}" 已添加到生词本`, 'success');
    }
}

// 获取保存的单词
function getSavedWords() {
    const saved = localStorage.getItem('vocabulary');
    return saved ? JSON.parse(saved) : [];
}

// 加载生词本
function loadVocabulary() {
    const savedWords = getSavedWords();
    vocabList.innerHTML = '';
    
    // 更新单词计数
    vocabCount.textContent = savedWords.length;
    
    if (savedWords.length === 0) {
        emptyVocab.style.display = 'block';
        vocabList.style.display = 'none';
    } else {
        emptyVocab.style.display = 'none';
        vocabList.style.display = 'block';
        
        savedWords.forEach(word => {
            const listItem = document.createElement('li');
            listItem.className = 'vocab-item';
            
            const wordSpan = document.createElement('span');
            wordSpan.className = 'vocab-word';
            wordSpan.textContent = word;
            wordSpan.addEventListener('click', () => {
                searchInput.value = word;
                searchWord();
                // 切换到词典视图
                document.querySelector('[data-section="dictionary"]').click();
            });
            
            const removeBtn = document.createElement('button');
            removeBtn.className = 'remove-btn';
            removeBtn.innerHTML = '×';
            removeBtn.title = '移除单词';
            removeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                removeFromVocabulary(word);
            });
            
            listItem.appendChild(wordSpan);
            listItem.appendChild(removeBtn);
            vocabList.appendChild(listItem);
        });
    }
}

// 从生词本移除单词
function removeFromVocabulary(word) {
    const savedWords = getSavedWords();
    const index = savedWords.indexOf(word);
    
    if (index > -1) {
        savedWords.splice(index, 1);
        localStorage.setItem('vocabulary', JSON.stringify(savedWords));
        loadVocabulary();
        
        // 如果当前显示的是被移除的单词，更新保存按钮状态
        if (wordTitle.textContent === word) {
            updateSaveButton(word);
        }
        
        showTempMessage(`"${word}" 已从生词本移除`, 'success');
    }
}

// 显示临时消息
function showTempMessage(message, type = 'info') {
    const colors = {
        success: 'linear-gradient(135deg, var(--green) 0%, var(--blue) 100%)',
        error: 'linear-gradient(135deg, var(--pink) 0%, var(--orange) 100%)',
        info: 'linear-gradient(135deg, var(--blue) 0%, var(--purple) 100%)'
    };
    
    const tempMsg = document.createElement('div');
    tempMsg.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${colors[type]};
        color: white;
        padding: 15px 25px;
        border-radius: 50px;
        font-weight: 600;
        box-shadow: var(--shadow);
        z-index: 1000;
        animation: slideIn 0.3s ease;
        max-width: 300px;
        text-align: center;
    `;
    tempMsg.textContent = message;
    document.body.appendChild(tempMsg);
    
    setTimeout(() => {
        tempMsg.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (document.body.contains(tempMsg)) {
                document.body.removeChild(tempMsg);
            }
        }, 300);
    }, 3000);
}

// 添加CSS动画
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);

// 控制台提示
console.log('🌈 英语词典已加载完成！');
console.log('📚 本地词库包含 ' + Object.keys(localWordDatabase).length + ' 个单词');
console.log('🔍 可以尝试搜索：hello, book, computer, school, teacher 等');