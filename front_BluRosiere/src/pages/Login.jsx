import { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { mockApi } from '../services/mockApi';
import { handleError } from '../services/errorHandler';
import { validateLoginCredentials } from '../utils/validation';
import { ROUTES, SUCCESS_MESSAGES } from '../constants';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
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
      const { user, token } = await mockApi.login(formData.email, formData.password);
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
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4">
      <Card className="w-full max-w-md" variant="amber">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white/70 mb-2">Entrar</h1>
          <p className="text-white/70">Acesse sua conta no BluRosiere</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
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
            placeholder="Sua senha"
            error={errors.password}
            required
          />
          <Button type="submit" loading={loading} className="w-full">
            Entrar
          </Button>
        </form>
        <div className="mt-6 text-center space-y-2">
          <p className="text-white/70">Não possui conta?</p>
          <Link to={ROUTES.REGISTER} className="text-white/70 font-bold hover:text-accent">
            Criar Conta
          </Link>
        </div>
      </Card>
    </div>
  );
}
 