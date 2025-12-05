import { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { api } from '../services';
import { handleError } from '../services/errorHandler';
import { validateLoginCredentials } from '../utils/validation';
import { ROUTES, SUCCESS_MESSAGES } from '../constants';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/Card';
import { Layout, Container, Section, Stack } from '../components/Layout';
import { H3, Paragraph, Link as StyledLink } from '../components/Typography';
import toast from 'react-hot-toast';

export const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = useCallback((field) => (e) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  }, [errors]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const validation = validateLoginCredentials(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setLoading(true);
    try {
      const { user, token } = await api.login(formData.email, formData.password);
      login(user, token);
      toast.success(SUCCESS_MESSAGES.LOGIN_SUCCESS);
      navigate(ROUTES.DASHBOARD);
    } catch (error) {
      const { message } = handleError(error);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };
 
  return (
    <div className="min-h-screen flex">
      {/* Left Side - Branding */}
      <motion.div 
        className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 p-12 flex-col justify-between relative overflow-hidden"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00em0wIDI0YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00ek0xMiAxNmMwLTIuMjEgMS43OS00IDQtNHM0IDEuNzkgNCA0LTEuNzkgNC00IDQtNC0xLjc5LTQtNHptMCAyNGMwLTIuMjEgMS43OS00IDQtNHM0IDEuNzkgNCA0LTEuNzkgNC00IDQtNC0xLjc5LTQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-xl rounded-xl flex items-center justify-center">
              <img src="/logoblu.png" alt="BluRosiere" className="w-8 h-8" />
            </div>
            <span className="text-2xl font-bold text-white">BluRosiere</span>
          </div>
          
          <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
            Cuidando da<br />Saúde Mental
          </h1>
          <p className="text-xl text-white/80 leading-relaxed">
            Plataforma completa para gestão de atendimentos psicológicos
          </p>
        </div>

        <div className="relative z-10 text-white/60 text-sm">
          © 2024 BluRosiere. Todos os direitos reservados.
        </div>
      </motion.div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-secondary-900">
        <motion.div 
          className="w-full max-w-md"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-8 lg:hidden text-center">
            <div className="w-16 h-16 bg-primary-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <img src="/logoblu.png" alt="BluRosiere" className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-bold text-white">BluRosiere</h2>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Entrar</h2>
            <p className="text-white/60">Acesse sua conta para continuar</p>
          </div>
              
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="E-mail"
              type="email"
              value={formData.email}
              onChange={handleChange('email')}
              placeholder="seu@email.com"
              leftIcon={<Mail className="w-5 h-5" />}
              error={errors.email}
              required
            />
            
            <Input
              label="Senha"
              type="password"
              value={formData.password}
              onChange={handleChange('password')}
              placeholder="••••••••"
              leftIcon={<Lock className="w-5 h-5" />}
              error={errors.password}
              required
            />
            
            <Button 
              type="submit" 
              loading={loading} 
              fullWidth
              size="lg"
              className="bg-primary-500 hover:bg-primary-600 text-white font-semibold"
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>
              
          <div className="mt-8 text-center">
            <p className="text-white/60 text-sm">
              Não possui conta?{' '}
              <Link to={ROUTES.REGISTER} className="text-primary-400 hover:text-primary-300 font-semibold transition-colors">
                Criar conta gratuita
              </Link>
            </p>
          </div>

          <div className="mt-8 pt-8 border-t border-white/10">
            <p className="text-white/40 text-xs text-center">
              Ao entrar, você concorda com nossos Termos de Uso e Política de Privacidade
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
 
