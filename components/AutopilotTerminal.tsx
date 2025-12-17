"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Terminal } from "lucide-react";

export function AutopilotTerminal() {
    const [content, setContent] = useState("");
    const [isExecuting, setIsExecuting] = useState(false);
    const [output, setOutput] = useState<Array<{ text: string; delay: number; color: string; }>>([]);

    // The user's provided PowerShell code
    const scriptCode = `$script:ScriptRoot= Split-Path -Path $MyInvocation.MyCommand.Path -Parent
Start-Transcript "$ScriptRoot\\Autopilot_Tag.log" -Force
$TestConnection = Test-Connection 8.8.8.8 -Quiet
if ($TestConnection -eq $true){
    Write-Host "Internet Connection OK" -ForegroundColor Blue
    $date = (get-date).ToString("yyyyMMdd")
    New-Item -Type Directory -Path "$ScriptRoot\\AutopilotHashID" -Force
    Set-Location -Path "$ScriptRoot\\AutopilotHashID"
    $env:Path += ";C:\\Program Files\\WindowsPowerShell\\Scripts"
    [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
    Set-ExecutionPolicy -Scope Process -ExecutionPolicy RemoteSigned -Force
    Start-Process powershell.exe -WindowStyle Hidden -ArgumentList "Install-PackageProvider -Name NuGet -MinimumVersion 2.8.5.201 -Force" -Wait -Verbose
    Register-PSRepository -Default -ErrorAction SilentlyContinue
    Install-Script -Name Get-WindowsAutopilotInfo -RequiredVersion 3.8 -Force -Verbose
    $GroupTAG = Read-Host "Write one of the TAG:"
    Get-WindowsAutopilotInfo -online -GroupTag $GroupTAG -assign
    shutdown /r /t 30
}else{
    Write-Host "Check Internet Connection! Operation Aborted" -ForegroundColor Red
}`;

    useEffect(() => {
        let currentIndex = 0;
        const typeSpeed = 30; // ms per char (Slower to reduce lag)

        const typeInterval = setInterval(() => {
            if (currentIndex < scriptCode.length) {
                setContent(scriptCode.slice(0, currentIndex + 1));
                currentIndex++;
            } else {
                clearInterval(typeInterval);
                setTimeout(() => startExecution(), 1000);
            }
        }, typeSpeed);

        return () => clearInterval(typeInterval);
    }, []);

    const startExecution = () => {
        setIsExecuting(true);
        const sequence = [
            { text: "Transcript started, output file is .\\Autopilot_Tag.log", delay: 500, color: "text-stone-400" },
            { text: "Internet Connection OK", delay: 1200, color: "text-blue-400 font-bold" },
            { text: "Directory: C:\\Users\\Admin\\Desktop\\AutopilotHashID", delay: 1500, color: "text-stone-400" },
            { text: "VERBOSE: Installing package provider 'NuGet'...", delay: 2500, color: "text-gray-400" },
            { text: "VERBOSE: Installing script 'Get-WindowsAutopilotInfo'...", delay: 4000, color: "text-gray-400" },
            { text: "Write one of the TAG:", delay: 5500, color: "text-yellow-400" },
            { text: "> KIOSK_DEVICE_01", delay: 7000, color: "text-white" },
            { text: "Collecting Hardware Hash...", delay: 8000, color: "text-green-400" },
            { text: "Device hash uploaded successfully.", delay: 9500, color: "text-green-500 font-bold" },
            { text: "System will restart in 30 seconds...", delay: 11000, color: "text-red-400" }
        ];

        let cumulativeDelay = 0;
        sequence.forEach((step) => {
            cumulativeDelay += step.delay;
            setTimeout(() => {
                setOutput(prev => [...prev, step]);
            }, cumulativeDelay);
        });
    };

    return (
        <div className="w-full max-w-2xl mx-auto bg-[#012456] border border-blue-900 rounded-lg overflow-hidden font-mono text-xs sm:text-sm shadow-2xl opacity-90 my-8">
            <div className="bg-white px-2 py-1 flex items-center justify-between border-b border-stone-300">
                <div className="flex items-center gap-2 text-black text-xs">
                    <Terminal size={12} />
                    <span>Administrator: Windows PowerShell</span>
                </div>
                <div className="flex gap-1">
                    <div className="w-2.5 h-2.5 bg-stone-200 border border-stone-400" />
                    <div className="w-2.5 h-2.5 bg-stone-200 border border-stone-400" />
                    <div className="w-2.5 h-2.5 bg-red-400 border border-red-600" />
                </div>
            </div>

            <div className="p-4 h-[400px] overflow-y-auto text-white font-mono leading-relaxed relative scrollbar-hide">
                <div className="whitespace-pre-wrap text-blue-100/80 mb-4">{content}</div>

                {isExecuting && (
                    <div className="border-t border-blue-500/30 pt-4 mt-4 space-y-1">
                        {output.map((line, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -5 }}
                                animate={{ opacity: 1, x: 0 }}
                                className={line.color}
                            >
                                {line.text}
                            </motion.div>
                        ))}
                        <motion.span
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ repeat: Infinity, duration: 0.8 }}
                            className="inline-block w-2 h-4 bg-white ml-1 align-middle"
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
