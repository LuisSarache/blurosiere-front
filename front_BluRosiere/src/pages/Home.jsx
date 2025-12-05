import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Zap, Users, Calendar, Activity, FileText, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '../components/Button';
import { Layout, Container, Section, Grid } from '../components/Layout';
import { H1, H2, H3, H5, Paragraph, Lead } from '../components/Typography';
import { Card, CardContent } from '../components/Card';

export const Home = () => {
  const features = [
    {
      icon: Calendar,
      title: 'Agenda Dinâmica',
      description: 'Visualização de horários disponíveis com marcação automática e lembretes por e-mail'
    },
    {
      icon: Shield,
      title: 'Privacidade Garantida',
      description: 'Autenticação segura via JWT e proteção total dos dados sensíveis dos pacientes'
    },
    {
      icon: Activity,
      title: 'Análise Inteligente',
      description: 'Machine Learning para identificar padrões emocionais e agrupar perfis de risco'
    },
    {
      icon: Users,
      title: 'Impacto Social',
      description: 'Voltado para projetos voluntários, universidades e ONGs que oferecem apoio psicológico'
    },
    {
      icon: FileText,
      title: 'Histórico Estruturado',
      description: 'Registro organizado de sessões com temas, recomendações e evolução do paciente'
    },
    {
      icon: Zap,
      title: 'Interface Acolhedora',
      description: 'Design responsivo e acessível, pensado para conforto emocional dos usuários'
    }
  ];

  return (
    <Layout>
      {/* HERO SECTION */}
      <Section spacing="xl" className="min-h-screen flex items-center justify-center">
        <Container className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            {/* Logo */}
            <motion.div 
              className="relative mx-auto mb-8"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-32 h-32 rounded-3xl flex items-center justify-center mx-auto shadow-2xl overflow-hidden bg-gradient-to-br from-primary-900/50 to-secondary-900/50 backdrop-blur-xl border border-white/20">
                <img src="/logoblu.png" alt="BluRosiere" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -inset-4 bg-gradient-to-r from-primary-500/20 to-primary-400/20 rounded-full blur-xl animate-pulse-slow" />
            </motion.div>
            
            {/* Título principal */}
            <div className="space-y-4">
              <H1 className="text-gradient animate-fade-in">
                BluRosiere
              </H1>
              
              <H3 weight="medium" color="muted" className="animate-fade-in">
                Atendimento Psicológico
              </H3>
            </div>
            
            {/* Descrição */}
            <Lead 
              color="muted" 
              align="center" 
              className="max-w-4xl mx-auto animate-slide-up"
            >
              Sistema online voltado para facilitar o agendamento e a organização de 
              atendimentos psicológicos gratuitos. Criado para universidades, ONGs e 
              iniciativas sociais que incentivam o cuidado com a saúde mental.
            </Lead>
            
            {/* Botões de ação */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <Link to="/register">
                <Button 
                  size="lg" 
                  rightIcon={<Sparkles className="w-5 h-5" />}
                  className="w-full sm:w-auto"
                >
                  Começe Já!
                </Button>
              </Link>

              <a href="#features" onClick={(e) => {
                e.preventDefault();
                document.getElementById('features').scrollIntoView({ behavior: 'smooth' });
              }}>
                <Button 
                  variant="secondary" 
                  size="lg" 
                  rightIcon={<ArrowRight className="w-5 h-5" />}
                  className="w-full sm:w-auto"
                >
                  Conhecer Recursos
                </Button>
              </a>
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      {/* FEATURES SECTION */}
      <Section id="features" spacing="xl" className="min-h-screen flex items-center">
        <Container>
          {/* Cabeçalho da seção */}
          <motion.div 
            className="text-center mb-16 space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <H2 className="text-gradient">
              Tecnologia a Serviço do Cuidado
            </H2>
            <Lead color="muted" align="center" className="max-w-3xl mx-auto">
              Ferramentas inteligentes para organizar, acompanhar e potencializar atendimentos voluntários
            </Lead>
          </motion.div>

          {/* Grid de recursos */}
          <Grid cols={3} gap="lg">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <Card 
                    variant="elevated" 
                    hover
                    className="text-center h-full group"
                  >
                    <CardContent className="space-y-6">
                      {/* Ícone */}
                      <div className="relative">
                        <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:shadow-xl transition-all duration-300">
                          <IconComponent className="w-8 h-8 text-white" />
                        </div>
                        <div className="absolute -inset-2 bg-gradient-to-r from-primary-500/20 to-primary-400/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      
                      {/* Conteúdo */}
                      <div className="space-y-3">
                        <H5 weight="semibold">{feature.title}</H5>
                        <Paragraph color="muted" className="text-sm leading-relaxed mb-0">
                          {feature.description}
                        </Paragraph>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </Grid>
        </Container>
      </Section>

      {/* CTA SECTION */}
      <Section spacing="xl" className="min-h-screen flex items-center">
        <Container className="text-center">
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <H2 className="text-gradient">
              Faça Parte desta Transformação Social
            </H2>
            
            <Lead color="muted" align="center" className="max-w-4xl mx-auto">
              Una tecnologia e responsabilidade social. Ajude a democratizar o acesso 
              à saúde mental através de uma plataforma pensada para o bem-estar coletivo.
            </Lead>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/register">
                <Button 
                  size="xl" 
                  rightIcon={<ArrowRight className="w-6 h-6" />}
                  className="shadow-2xl"
                >
                  Criar Conta Gratuita
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </Container>
      </Section>
    </Layout>
  );
};
