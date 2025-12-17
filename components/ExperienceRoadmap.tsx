"use client";
import React from "react";
import { Timeline } from "@/components/ui/timeline";
import { MacWindow } from "@/components/ui/mac-window";
import { SiCisco, SiReact, SiSwift, SiFlutter, SiKalilinux, SiUdemy } from "react-icons/si";
import { FaAws, FaWindows } from "react-icons/fa";
import { Shield, Key, Server, Terminal, Smartphone, Globe, Cloud, Database, GraduationCap, Award, BookOpen, Users, Lightbulb, School } from "lucide-react";

export function ExperienceRoadmap() {
    const data = [
        {
            title: "2025 - Presente",
            content: (
                <div>
                    <h4 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200 flex items-center gap-2">
                        Infrastructure Architect ICT
                        <span className="text-sm font-normal text-stone-500">@ Primo Caredent Group</span>
                    </h4>
                    <p className="text-neutral-700 dark:text-neutral-300 text-sm mt-2 mb-4">
                        Gestione completa dell&apos;infrastruttura ICT per HQ e cliniche. Focus su cloud ibrido, automazione e sicurezza.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-neutral-800 dark:text-neutral-200 font-semibold">
                                <Cloud className="text-blue-500" /> Cloud & Azure
                            </div>
                            <ul className="list-disc pl-5 text-sm text-stone-600 dark:text-stone-400 space-y-1">
                                <li>Gestione Azure Portal & Active Directory</li>
                                <li>AutoPilot Enrollment per flotta devices</li>
                                <li>Configurazione Exchange & Ovh Mail</li>
                            </ul>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-neutral-800 dark:text-neutral-200 font-semibold">
                                <Server className="text-indigo-500" /> On-Prem & Systems
                            </div>
                            <ul className="list-disc pl-5 text-sm text-stone-600 dark:text-stone-400 space-y-1">
                                <li>Active Directory On-Prem (GPO, Join Domain)</li>
                                <li>Supporto L1/L2 Networking & Switch</li>
                                <li>DB Administration (SQL Express, Backup/Restore)</li>
                            </ul>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: "Ott 2024 - 2025",
            content: (
                <div>
                    <div className="flex flex-col gap-4">
                        <div>
                            <h4 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200 flex items-center gap-2">
                                Workplace Service Specialist ICT
                                <span className="text-sm font-normal text-stone-500">@ Prometeon</span>
                            </h4>
                            <p className="text-neutral-700 dark:text-neutral-300 text-sm mt-2 mb-2">
                                Specialista sicurezza endpoint e gestione infrastruttura workspace.
                            </p>
                            <p className="text-xs text-stone-500 mb-4">
                                Configurazione Intune, SCCM, AWS S3, Windows Server e coordinamento fornitori.
                            </p>
                            <div className="flex flex-wrap gap-2 mb-4">
                                <Badge icon={<FaAws />} text="AWS S3" />
                                <Badge icon={<FaWindows />} text="Intune & SSCM" />
                                <Badge icon={<Shield />} text="Zscaler" />
                                <Badge icon={<Globe />} text="Sharepoint" />
                            </div>
                        </div>

                        {/* Mac Terminal Autopilot Section */}
                        <MacWindow title="powershell — administrator" className="w-full md:w-3/4 shadow-2xl">
                            <div className="space-y-1">
                                <p><span className="text-blue-400">PS C:\Users\Admin&gt;</span> <span className="text-yellow-300">Get-WindowsAutoPilotInfo</span> -Online</p>
                                <p className="text-stone-500">// Retrieving Hardware Hash for Intune...</p>
                                <p><span className="text-green-400">Success:</span> Device Hash uploaded to Tenant.</p>
                                <p className="mt-2"><span className="text-blue-400">PS C:\&gt;</span> <span className="text-yellow-300">Start-Process</span> "IntuneManagementExtension.exe"</p>
                                <p className="text-stone-500">// Applying GPO & Compliance Policies...</p>
                                <p className="text-green-400 mt-1">✓ Device fully enrolled and secured.</p>
                            </div>
                        </MacWindow>
                    </div>
                </div>
            ),
        },
        {
            title: "2023 - Upskilling",
            content: (
                <div>
                    <h4 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200 mb-4 flex items-center gap-2">
                        <BookOpen className="text-amber-500" /> Certificazioni & Formazione
                    </h4>
                    <p className="text-neutral-700 dark:text-neutral-300 text-sm mb-6">
                        Anno dedicato al consolidamento delle competenze infrastrutturali e di sicurezza.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-white dark:bg-stone-900 p-4 rounded-xl border border-stone-200 dark:border-stone-800 shadow-sm">
                            <h5 className="font-bold flex items-center gap-2 mb-2 text-stone-800 dark:text-stone-200"><Award className="text-yellow-500" /> Certificazioni</h5>
                            <ul className="space-y-2 text-sm text-stone-600 dark:text-stone-400">
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> SC-100: Microsoft Cybersecurity Architect</li>
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Cisco CCNA (200-301)</li>
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-red-500" /> CompTIA Security+ (SY0-601)</li>
                            </ul>
                        </div>

                        <div className="bg-white dark:bg-stone-900 p-4 rounded-xl border border-stone-200 dark:border-stone-800 shadow-sm">
                            <h5 className="font-bold flex items-center gap-2 mb-2 text-stone-800 dark:text-stone-200"><GraduationCap className="text-indigo-500" /> Studi</h5>
                            <div className="space-y-3">
                                <div>
                                    <p className="font-semibold text-sm">SysAdmin</p>
                                    <p className="text-xs text-stone-500">Udemy (Gen 23 - Dic 23)</p>
                                    <p className="text-xs text-stone-400 mt-1">Infrastrutture on-premise/cloud, EDR, disaster recovery.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        },
        {
            title: "2020 - 2022",
            content: (
                <div>
                    <h4 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200 mb-2">
                        L'Era dello Sviluppo (Dev)
                        <span className="text-sm font-normal text-stone-500 ml-2 block sm:inline"> Freelance & Agency</span>
                    </h4>
                    <p className="text-neutral-700 dark:text-neutral-300 text-sm mb-4">
                        Gestione progetti Full Stack e Mobile per grandi clienti banking e enterprise.
                    </p>

                    <div className="space-y-8">
                        <div className="border-l-2 border-stone-200 dark:border-stone-800 pl-4 relative">
                            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-stone-200 dark:bg-stone-800 border-2 border-white dark:border-stone-950" />
                            <h5 className="font-semibold text-lg flex items-center gap-2 space-y-1">
                                <Smartphone size={18} /> Mobile Developer @ Hype
                            </h5>
                            <p className="text-sm text-stone-500 mb-2"><span className="font-mono text-xs bg-stone-100 dark:bg-stone-800 px-1 rounded">2021-2022</span> Freelance</p>
                            <Badge icon={<SiFlutter className="text-cyan-500" />} text="Flutter & iOS" />
                        </div>

                        <div className="border-l-2 border-stone-200 dark:border-stone-800 pl-4 relative">
                            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-stone-200 dark:bg-stone-800 border-2 border-white dark:border-stone-950" />
                            <h5 className="font-semibold text-lg flex items-center gap-2 space-y-1">
                                <SiSwift size={18} className="text-orange-500" /> Developer IOS (Freelancer) @ Autonomo
                            </h5>
                            <p className="text-sm text-stone-500 mb-2"><span className="font-mono text-xs bg-stone-100 dark:bg-stone-800 px-1 rounded">Dic 2021 - Dic 2022</span> Torino</p>
                            <p className="text-sm text-stone-600 dark:text-stone-400 mt-1 italic">
                                Le pubblicazioni non sono più disponibili perché non aderisco più al Developer program di Apple, ma disponibili localmente e su gitlab.
                            </p>
                            <div className="flex flex-col gap-1 mt-2 text-xs text-blue-500 truncate">
                                <span className="hover:underline cursor-pointer">apps.apple.com/it/app/meteo-flat/id1560558874</span>
                                <span className="hover:underline cursor-pointer">apps.apple.com/it/app/toolsbar/id1560190378</span>
                                <span className="hover:underline cursor-pointer">apps.apple.com/us/app/budget-money/id1563814840</span>
                                <span className="hover:underline cursor-pointer">apps.apple.com/us/app/video-frame/id1570793307</span>
                            </div>
                        </div>

                        <div className="border-l-2 border-stone-200 dark:border-stone-800 pl-4 relative">
                            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-stone-200 dark:bg-stone-800 border-2 border-white dark:border-stone-950" />
                            <h5 className="font-semibold text-lg flex items-center gap-2"><SiReact size={18} className="text-blue-400" /> React Developer @ Intesa (IBM)</h5>
                            <p className="text-sm text-stone-500 mb-2"><span className="font-mono text-xs bg-stone-100 dark:bg-stone-800 px-1 rounded">2020</span> Freelance</p>
                            <p className="text-sm text-stone-600 dark:text-stone-400 mt-1">
                                Portale TrustedHub B2B. Redux-Saga, TypeScript, Styled-Components.
                            </p>
                        </div>

                        <div className="border-l-2 border-stone-200 dark:border-stone-800 pl-4 relative">
                            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-stone-200 dark:bg-stone-800 border-2 border-white dark:border-stone-950" />
                            <h5 className="font-semibold text-lg flex items-center gap-2"><Globe size={18} className="text-purple-500" /> Front-End Developer @ Aleide</h5>
                            <p className="text-sm text-stone-500 mb-2"><span className="font-mono text-xs bg-stone-100 dark:bg-stone-800 px-1 rounded">Gen 2020 - Mar 2020</span> Milano</p>
                            <p className="text-sm text-stone-600 dark:text-stone-400 mt-1">
                                Intranet PHP/MySQL e gestionale aziendale custom (Zucchetti-like) per gestione presenze e asset.
                            </p>
                        </div>
                    </div>
                </div>
            ),
        },

        {
            title: "2019 - 2020",
            content: (
                <div>
                    <h4 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200 mb-2">
                        Cyber Security & Beginnings
                    </h4>
                    <div className="flex items-start gap-4 mt-4">
                        <div className="bg-stone-100 dark:bg-stone-800 p-3 rounded-xl">
                            <Shield className="w-6 h-6 text-red-500" />
                        </div>
                        <div>
                            <h5 className="font-bold">Cyber Security Analyst @ Accenture</h5>
                            <p className="text-sm text-stone-600 dark:text-stone-400">Identity Governance & Administration (IGA). Supporto piattaforme SailPoint.</p>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: "2017 - 2019",
            content: (
                <div className="border border-stone-100 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/50 p-6 rounded-2xl">
                    <h4 className="text-xl font-bold text-neutral-800 dark:text-neutral-200 mb-1 flex items-center gap-2">
                        <GraduationCap className="text-stone-600 dark:text-stone-400" /> Fondazione ITS-ICT Piemonte
                    </h4>
                    <p className="text-sm font-semibold text-stone-500 mb-4">Specializzazione Back-end Services</p>

                    <p className="text-sm text-stone-600 dark:text-stone-400 mb-4">
                        Degree "Tecnico Superiore" in Tecnologie e metodi per lo sviluppo software.
                    </p>
                    <div className="flex flex-wrap gap-2">
                        <span className="text-xs bg-white dark:bg-stone-800 px-2 py-1 rounded border border-stone-200 dark:border-stone-700">Java Enterprise</span>
                        <span className="text-xs bg-white dark:bg-stone-800 px-2 py-1 rounded border border-stone-200 dark:border-stone-700">Database Relazionali</span>
                        <span className="text-xs bg-white dark:bg-stone-800 px-2 py-1 rounded border border-stone-200 dark:border-stone-700">Software Architecture</span>
                    </div>
                </div>
            )
        },
        {
            title: "2011 - 2016",
            content: (
                <div>
                    <h4 className="text-lg font-bold text-neutral-800 dark:text-neutral-200 flex items-center gap-2">
                        <School className="text-stone-500" /> Istituto Tecnico Industriale Amedeo Avogadro
                    </h4>
                    <p className="text-sm text-stone-500 mb-1">Torino</p>
                    <p className="text-sm text-neutral-700 dark:text-neutral-300">
                        Diploma quinquennale di Perito Informatico in Informatica e Telecomunicazioni.
                    </p>
                </div>
            )
        },
        {
            title: "Competenze Trasversali",
            content: (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-4 rounded-xl border border-indigo-100 dark:border-indigo-800">
                        <h5 className="font-bold text-indigo-700 dark:text-indigo-400 mb-2 flex items-center gap-2"><Users size={16} /> Relazionali</h5>
                        <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
                            Sono in grado di comunicare in modo chiaro, di lavorare sia in team che individualmente in tutte le fasi del lavoro. Se si presentano criticità, mi adopero per cercare di risolvere il problema nel minor tempo possibile.
                        </p>
                    </div>
                    <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800">
                        <h5 className="font-bold text-amber-700 dark:text-amber-400 mb-2 flex items-center gap-2"><Lightbulb size={16} /> Organizzative</h5>
                        <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
                            Sono in grado di rispondere a specifiche richieste del cliente/datore di lavoro proponendo più soluzioni percorribili tra quelle che permettono di raggiungere l’obiettivo più efficacemente.
                        </p>
                    </div>
                </div>
            )
        }
    ];
    return (
        <div className="w-full">
            <Timeline data={data} />
        </div>
    );
}

const Badge = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 border border-stone-200 dark:border-stone-700">
        {icon} {text}
    </span>
);
