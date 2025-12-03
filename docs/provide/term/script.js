// script.js (完全なコード)

import { Terminal } from "https://cdn.jsdelivr.net/npm/@gytx/xterm-local-echo@0.1.8/dist/index.modern.min.js";
import LocalEchoController from "https://cdn.jsdelivr.net/npm/xterm@5.3.0/lib/xterm.min.js";


// DOM要素を取得 [1]
const connectButton = document.getElementById('connectButton');
const terminalContainer = document.getElementById('terminal');

// xterm.js インスタンスの初期化と設定 [1]
const term = new Terminal({
    rows: 24,
    cols: 80,
    cursorBlink: true,
    cursorStyle: 'block',
    convertEol: true
});

// local-echo コントローラーのインスタンスを作成し、ターミナルにロード [1]
const localEcho = new LocalEchoController();
term.loadAddon(localEcho);

// ターミナルをHTML要素にアタッチし、画面を開く [1]
term.open(terminalContainer);
localEcho.writeln('Welcome to Web Serial Terminal (using local-echo)');
localEcho.writeln('Click "USBデバイスに接続" to begin.');


let port; // シリアルポートオブジェクトを保持する変数 [1]

// 接続ボタンのイベントリスナー [1]
connectButton.addEventListener('click', async () => {
    if (!('serial' in navigator)) {
        localEcho.writeln('Error: Web Serial API is not supported in this browser.');
        return;
    }

    try {
        // ポートの選択とオープン、受信・送信ループの開始 [1]
        port = await navigator.serial.requestPort();
        await port.open({ baudRate: 115200 }); 

        localEcho.writeln('Connected! Baud Rate: 115200.');
        localEcho.writeln('Type commands below and press Enter to send.');

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
        localEcho.writeln(`\r\nConnection error: ${error.message}`);
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
