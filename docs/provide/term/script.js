import { LocalEchoAddon } from "https://cdn.jsdelivr.net/npm/@gytx/xterm-local-echo@0.1.8/dist/index.modern.min.js";



// DOM要素を取得 [1]
const connectButton = document.getElementById('connectButton');
const terminalContainer = document.getElementById('terminal');
const testEchoButton = document.getElementById('testEchoButton');

// xterm.js インスタンスの初期化と設定 [1]
const term = new Terminal({
    rows: 24,
    cols: 80,
    cursorBlink: true,
    cursorStyle: 'block',
    convertEol: true
});

// local-echo コントローラーのインスタンスを作成し、ターミナルにロード [1]
const localEcho = new LocalEchoAddon();
term.loadAddon(localEcho);

// ターミナルをHTML要素にアタッチし、画面を開く [1]
term.open(terminalContainer);
term.write('Welcome to Web Serial Terminal (using global variables)\r\n');
term.write('Click "USBデバイスに接続" to begin.\r\n');


let port; // シリアルポートオブジェクトを保持する変数 [1]

// 接続ボタンのイベントリスナー [1]
connectButton.addEventListener('click', async () => {
    if (!('serial' in navigator)) {
        term.write('Error: Web Serial API is not supported in this browser.\r\n');
        return;
    }
    term.write('接続ボタン.動作済\r\n');

    try {
        // ポートの選択とオープン、受信・送信ループの開始 [1]
        port = await navigator.serial.requestPort();
        await port.open({ baudRate: 115200 }); 

        term.write('Connected! Baud Rate: 112500.\r\n');
        term.write('Type commands below and press Enter to send.\r\n');
        
        // 受信ループ [1]
        const textDecoder = new TextDecoderStream();
        port.readable.pipeThrough(textDecoder);
        const reader = textDecoder.getReader();
        
        async function readLoop() {
            while (true) {
                const { value, done } = await reader.read();
                if (done) { break; }
                localEcho.write(value);
            }
        }
        
        readLoop();

        // 送信ループ [1]
        while (port && port.writable) {
            const input = await localEcho.read('> ');
            if (input) {
                const encoder = new TextEncoder();
                await port.writable.getWriter().write(encoder.encode(input + '\r\n'));
                console.log("Sent:", input + "\r\n");
            }
        }

    } catch (error) {
        console.error(error);
        term.write(`\r\nConnection error: ${error.message}\r\n`);
    }
});

// test

const testButton = document.getElementById('testButton');

testButton.addEventListener('click', () => {
    // ここにテストしたいVT-100シーケンスを入力します
    const testSequence = 
        "--- VT-100 Test Output ---\r\n" +
        // テキストを赤色に変更 (\x1b[31m)
        "\x1b[31m" + 
        "This is red text.\r\n" +
        // テキストを緑色に変更 (\x1b[32m)
        "\x1b[32m" + 
        "This is green text.\r\n" +
        // 色をリセット (\x1b[0m)
        "\x1b[0m" + 
        "Color has been reset.\r\n";
        
    term.write(testSequence);
});

const ClearButton = document.getElementById('clearButton');

ClearButton.addEventListener('click', () => {
    // ここにテストしたいVT-100シーケンスを入力します
    const clearSequence = 
        // 画面クリア (\x1b[2J)
        "\x1b[2J"
        // カーソルをホームポジションへ (\x1b[H)
        + "\x1b[H";
        
    term.write(clearSequence);
});

testEchoButton.addEventListener('click', async () => {
    term.write('Echo test mode activated. Type "exit" to quit.\r\n');
    while (true) {
        // localEcho.read() が実行されると、キー入力が可能になり、Enter待ち状態になる
        const input = await localEcho.read('>TEST> '); 
        
        console.log("Echo Test Input:", input);
        
        // inputが "exit" だったらループを抜ける
        if (input.toLowerCase() === 'exit') {
            term.write('Exiting echo test mode.\r\n');
            break; // whileループを抜ける
        }
    }
});
