"use client";

import { useEffect } from "react";

export function SecurityWarning() {
    useEffect(() => {
        // Aggressive Console Trap
        const styleTitle = 'color: red; font-size: 60px; font-weight: bold; text-shadow: 2px 2px black;';
        const styleBody = 'color: white; background-color: black; font-size: 20px; padding: 10px;';

        console.clear();
        console.log('%c🔒 ACCESSO NEGATO', styleTitle);
        console.log('%cAhahah ci hai provato furbacchione! 😉\nHo preso tutte le precauzioni.\nNessuno può entrare tranne me.', styleBody);

        // Ascii Art Middle Finger (Safeish version)
        console.log(`
%c
      .......
    /       \\
   |   ( )   |
   |    |    |
   |    |    |
 __|____|____|__
|               |
|      STOP     |
|_______________|
        `, 'font-family: monospace; color: red; font-weight: bold;');

        // Attempt to show image if browser supports it (Chrome/WebKit)
        console.log('%c ', 'font-size: 1px; padding: 100px; background: url(https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3Z5Z3Z5Z3Z5Z3Z5Z3Z5Z3Z5Z3Z5Z3Z5Z3Z5Z3Z5/xT9IgkKL1SJV8kFUP6/giphy.gif) no-repeat; background-size: contain;');

    }, []);

    return null;
}
