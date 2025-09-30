import { Card } from "../components/Card";
import { Smile } from "lucide-react";

export const WelcomeCard = ()  => { 
return ( 
<Card className="p-6 flex flex-col items-center space-y-3 bg-gradient-to-r from-light/10 to-accent/10 border border-accent/20">
<Smile className="w-10 h-10 text-accent"/>
<h3 className="text-lg font semibold text-white/70">
    Bem-vindo ao BluRosiere!
</h3>
<p className="text-gray-600">
    Comece adicionando seus pacientes ou criando agendamentos para organizar sua rotina
</p>
</Card>

)
};