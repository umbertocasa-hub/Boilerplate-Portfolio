import { motion } from "framer-motion";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Home } from "lucide-react";
import { item } from "@/lib/animations";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";

export function ProfileCard() {
    return (
        <motion.div
            variants={item}
            className="col-span-1 md:col-span-2 md:row-span-2 h-full"
        >
            <CardContainer className="inter-var w-full h-full" containerClassName="h-full">
                <CardBody className="bg-white/80 dark:bg-stone-900/80 backdrop-blur-sm rounded-3xl p-8 border border-white/50 dark:border-white/10 flex flex-col justify-between hover:shadow-xl transition-all duration-500 group/card w-full h-full dark:hover:shadow-2xl dark:hover:shadow-indigo-500/[0.4] neumorph-subtle">
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <Avatar className="h-28 w-28 border-4 border-white dark:border-stone-800 shadow-xl bg-white dark:bg-stone-900 group-hover:scale-105 transition-transform duration-500">
                                <div className="relative w-full h-full p-2">
                                    {/* Light Mode Logo */}
                                    <img
                                        src="/brand/logo_5.png"
                                        alt="Logo"
                                        className="w-full h-full object-contain dark:hidden"
                                    />
                                    {/* Dark Mode Logo */}
                                    <img
                                        src="/brand/logo_dark_final.png"
                                        alt="Logo Dark"
                                        className="w-full h-full object-contain hidden dark:block"
                                    />
                                </div>
                            </Avatar>
                            <div>
                                <CardItem translateZ="40" as="h1" className="text-3xl font-bold tracking-tight text-stone-800 dark:text-stone-100">
                                    Umberto Casa
                                </CardItem>
                                <CardItem translateZ="30" as="p" className="text-stone-600 dark:text-stone-300 font-bold text-lg">
                                    Full Stack Developer & SysAdmin
                                </CardItem>
                            </div>
                        </div>

                        <div className="space-y-4 text-stone-700 dark:text-stone-300 text-[0.95rem] leading-relaxed font-medium">
                            <CardItem translateZ="20" as="p">
                                Questo portfolio raccoglie una selezione dei miei lavori e delle mie competenze.
                                Al suo interno troverai progetti realizzati come sviluppatore, insieme ad alcune esperienze in ambito sistemistico, con un focus chiaro su ciò di cui mi sono occupato direttamente.
                            </CardItem>
                            <CardItem translateZ="20" as="p">
                                Accanto alla parte tecnica, c’è anche uno spazio dedicato a una mia grande passione: la <strong>fotografia</strong>. Non è un’attività professionale, ma un interesse personale che coltivo nel tempo.
                            </CardItem>
                            <CardItem translateZ="20" as="p" className="hidden md:block">
                                Questo è un portfolio semplice e illustrativo, che unisce passione, lavoro e curiosità.
                                Se hai un progetto, un’idea o semplicemente vuoi metterti in contatto, sentiti libero di scrivermi.
                            </CardItem>
                        </div>
                    </div>
                </CardBody>
            </CardContainer>
        </motion.div>
    );
}
