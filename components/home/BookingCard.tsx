"use client";

import { CardBody, CardContainer, CardItem } from "../ui/3d-card";
import { Calendar } from "lucide-react";

export function BookingCard() {
    return (
        <CardContainer className="inter-var w-full h-full">
            <CardBody className="bg-white/90 dark:bg-black/90 backdrop-blur-sm relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:border-white/[0.2] border-black/[0.1] w-full h-full rounded-xl p-6 border flex flex-col transition-colors duration-500">
                <CardItem
                    translateZ="50"
                    className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neutral-800 to-neutral-500 dark:from-white dark:to-neutral-400 flex items-center gap-2"
                >
                    <Calendar className="text-neutral-500 dark:text-neutral-300" /> Prenota una Call
                </CardItem>
                <CardItem
                    as="p"
                    translateZ="60"
                    className="text-neutral-500 text-sm max-w-sm mt-2 mb-6 dark:text-neutral-300 font-medium"
                >
                    Scegli un orario che preferisci dal calendario qui sotto.
                </CardItem>

                <CardItem translateZ="80" className="w-full h-full min-h-[400px] flex-1 rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
                    {/* Placeholder for Cal.com or similar - Using a generic meeting placeholder for now */}
                    <iframe
                        src="https://app.cal.eu/umbertocasa"
                        className="w-full h-full min-h-[500px]"
                        width="100%"
                        height="100%"
                        frameBorder="0"
                    ></iframe>
                    {/* NOTE: You should replace 'https://cal.com/umberto-casa/30min' with your actual Cal.com or Calendly URL */}
                </CardItem>
            </CardBody>
        </CardContainer>
    );
}
