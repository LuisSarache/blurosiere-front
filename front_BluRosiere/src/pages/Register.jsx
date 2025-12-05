import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Phone, Calendar, FileText, UserCheck } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { api } from '../services';
import { handleError } from '../services/errorHandler';
import { validateRegisterData } from '../utils/validation';
import { USER_TYPES, ROUTES, SUCCESS_MESSAGES } from '../constants';
import { Button, Input } from '../components';
import toast from 'react-hot-toast';

export const Register = () => {
  const [userType, setUserType] = useState(USER_TYPES.PATIENT);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    crp: '',
    specialty: '',
    phone: '',
    birthDate: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    if (formData.password !== formData.confirmPassword) {
      setErrors({ confirmPassword: 'Senhas não coincidem' });
      return;
    }

    const validation = validateRegisterData({ ...formData, type: userType });
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setLoading(true);
    try {
      const { user, token } = await api.register({
        ...formData,
        type: userType,
      });
      login(user, token);
      toast.success(SUCCESS_MESSAGES.REGISTER_SUCCESS);
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
            Comece sua<br />Jornada
          </h1>
          <p className="text-xl text-white/80 leading-relaxed">
            Junte-se a nós e transforme o atendimento psicológico
          </p>
        </div>

        <div className="relative z-10 text-white/60 text-sm">
          © 2024 BluRosiere. Todos os direitos reservados.
        </div>
      </motion.div>

      {/* Right Side - Register Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-secondary-900 overflow-y-auto">
        <motion.div 
          className="w-full max-w-md py-8"
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
            <h2 className="text-3xl font-bold text-white mb-2">Criar Conta</h2>
            <p className="text-white/60">Preencha os dados para começar</p>
          </div>

          {/* Seletor de tipo */}
          <div className="mb-6">
            <p className="text-white/60 text-sm mb-3">Tipo de conta:</p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setUserType(USER_TYPES.PATIENT);
                  setFormData(prev => ({ ...prev, crp: '', specialty: '' }));
                  setErrors({});
                }}
                className={`flex-1 px-4 py-3 rounded-xl border-2 transition-all ${
                  userType === USER_TYPES.PATIENT
                    ? 'bg-primary-500 border-primary-500 text-white'
                    : 'bg-transparent border-white/20 text-white/60 hover:border-white/40'
                }`}
              >
                <User className="w-5 h-5 mx-auto mb-1" />
                <span className="text-sm font-medium">Paciente</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setUserType(USER_TYPES.PSYCHOLOGIST);
                  setFormData(prev => ({ ...prev, birthDate: '' }));
                  setErrors({});
                }}
                className={`flex-1 px-4 py-3 rounded-xl border-2 transition-all ${
                  userType === USER_TYPES.PSYCHOLOGIST
                    ? 'bg-primary-500 border-primary-500 text-white'
                    : 'bg-transparent border-white/20 text-white/60 hover:border-white/40'
                }`}
              >
                <UserCheck className="w-5 h-5 mx-auto mb-1" />
                <span className="text-sm font-medium">Psicólogo</span>
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off" key={userType}>
            <Input
              name="name"
              label="Nome completo"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Seu nome completo"
              leftIcon={<User className="w-5 h-5" />}
              error={errors.name}
              autoComplete="off"
              required
            />
            
            <Input
              name="email"
              label="E-mail"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="seu@email.com"
              leftIcon={<Mail className="w-5 h-5" />}
              error={errors.email}
              autoComplete="off"
              required
            />
            
            <Input
              name="phone"
              label="Telefone"
              type="tel"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="(11) 99999-9999"
              leftIcon={<Phone className="w-5 h-5" />}
              error={errors.phone}
              autoComplete="off"
              required
            />

            {userType === USER_TYPES.PATIENT && (
              <Input
                name="birthDate"
                label="Data de Nascimento"
                type="date"
                value={formData.birthDate}
                onChange={handleInputChange}
                leftIcon={<Calendar className="w-5 h-5" />}
                error={errors.birthDate}
                autoComplete="off"
                required
              />
            )}

            {userType === USER_TYPES.PSYCHOLOGIST && (
              <>
                <Input
                  name="crp"
                  label="CRP"
                  value={formData.crp}
                  onChange={handleInputChange}
                  placeholder="Ex: CRP 01/12345"
                  leftIcon={<FileText className="w-5 h-5" />}
                  error={errors.crp}
                  autoComplete="off"
                  required
                />
                <Input
                  name="specialty"
                  label="Especialidade"
                  value={formData.specialty}
                  onChange={handleInputChange}
                  placeholder="Ex: Psicologia Clínica"
                  leftIcon={<UserCheck className="w-5 h-5" />}
                  error={errors.specialty}
                  autoComplete="off"
                  required
                />
              </>
            )}

            <Input
              name="password"
              label="Senha"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="••••••••"
              leftIcon={<Lock className="w-5 h-5" />}
              error={errors.password}
              autoComplete="off"
              required
            />
            
            <Input
              name="confirmPassword"
              label="Confirme sua senha"
              type="password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="••••••••"
              leftIcon={<Lock className="w-5 h-5" />}
              error={errors.confirmPassword}
              autoComplete="off"
              required
            />
            
            <Button 
              type="submit" 
              loading={loading} 
              fullWidth
              size="lg"
              className="bg-primary-500 hover:bg-primary-600 text-white font-semibold mt-2"
            >
              {loading ? 'Criando conta...' : 'Criar Conta'}
            </Button>
          </form>
          
          <div className="mt-8 text-center">
            <p className="text-white/60 text-sm">
              Já possui conta?{' '}
              <Link to={ROUTES.LOGIN} className="text-primary-400 hover:text-primary-300 font-semibold transition-colors">
                Fazer login
              </Link>
            </p>
          </div>

          <div className="mt-8 pt-8 border-t border-white/10">
            <p className="text-white/40 text-xs text-center">
              Ao criar conta, você concorda com nossos Termos de Uso e Política de Privacidade
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
