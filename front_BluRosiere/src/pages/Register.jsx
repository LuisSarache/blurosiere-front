import { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { mockApi } from '../services/mockApi';
import { handleError } from '../services/errorHandler';
import { validateRegisterData } from '../utils/validation';
import { USER_TYPES, ROUTES, SUCCESS_MESSAGES } from '../constants';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Input } from '../components/Input';
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

  const handleChange = useCallback((field) => (e) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  }, [errors]);

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
      const { user, token } = await mockApi.register({
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
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4">
      <Card className="w-full max-w-md" variant="amber">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white/70 mb-2">Criar Conta</h1>
          <p className="text-white/50">Cadastre-se na BluRosiere</p>
        </div>

        <div className="flex justify-center mb-6 gap-3">
          <Button
            type="button"
            variant={userType === USER_TYPES.PATIENT ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setUserType(USER_TYPES.PATIENT)}
          >
            Paciente
          </Button>
          <Button
            type="button"
            variant={userType === USER_TYPES.PSYCHOLOGIST ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setUserType(USER_TYPES.PSYCHOLOGIST)}
          >
            Psicólogo
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Nome completo"
            value={formData.name}
            onChange={handleChange('name')}
            placeholder="Seu nome completo"
            error={errors.name}
            required
          />
          <Input
            label="E-mail"
            type="email"
            value={formData.email}
            onChange={handleChange('email')}
            placeholder="seu@email.com"
            error={errors.email}
            required
          />
          <Input
            label="Senha"
            type="password"
            value={formData.password}
            onChange={handleChange('password')}
            placeholder="sua senha"
            error={errors.password}
            required
          />
          <Input
            label="Confirme sua senha"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange('confirmPassword')}
            placeholder="Confirme sua senha"
            error={errors.confirmPassword}
            required
          />
          <Input
            label="Telefone"
            type="tel"
            value={formData.phone}
            onChange={handleChange('phone')}
            placeholder="Digite seu telefone"
            error={errors.phone}
            required
          />

          {userType === USER_TYPES.PATIENT && (
            <Input
              label="Data de Nascimento"
              type="date"
              value={formData.birthDate}
              onChange={handleChange('birthDate')}
              error={errors.birthDate}
              required
            />
          )}

          {userType === USER_TYPES.PSYCHOLOGIST && (
            <>
              <Input
                label="CRP"
                value={formData.crp}
                onChange={handleChange('crp')}
                placeholder="Ex: CRP 01/12345"
                error={errors.crp}
                required
              />
              <Input
                label="Especialidade"
                value={formData.specialty}
                onChange={handleChange('specialty')}
                placeholder="Ex: Psicologia Clínica"
                error={errors.specialty}
                required
              />
            </>
          )}

          <Button type="submit" loading={loading} className="w-full">
            Criar Conta
          </Button>
        </form>

        <div className="mt-6 text-center space-y-2">
          <p className="text-white/70">Já possui conta?</p>
          <Link to={ROUTES.LOGIN} className="text-white/60 font-bold hover:text-accent">
            Faça login!
          </Link>
        </div>
      </Card>
    </div>
  );
};
