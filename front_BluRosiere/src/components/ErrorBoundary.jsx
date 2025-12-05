import { Component } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from './Button';
import { Card, CardContent } from './Card';
import { H3, Paragraph } from './Typography';
import { Stack } from './Layout';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo
    });
    
    // Log error to monitoring service
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-4">
          <Card variant="elevated" className="max-w-md w-full text-center">
            <CardContent>
              <Stack spacing="lg" align="center">
                <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-8 h-8 text-red-400" />
                </div>
                
                <div>
                  <H3 className="text-red-400 mb-2">Algo deu errado</H3>
                  <Paragraph color="muted" className="text-sm">
                    Ocorreu um erro inesperado. Tente recarregar a página.
                  </Paragraph>
                </div>

                <Stack spacing="sm" className="w-full">
                  <Button
                    onClick={() => window.location.reload()}
                    leftIcon={<RefreshCw className="w-4 h-4" />}
                    fullWidth
                  >
                    Recarregar Página
                  </Button>
                  
                  <Button
                    variant="ghost"
                    onClick={() => this.setState({ hasError: false, error: null, errorInfo: null })}
                    fullWidth
                  >
                    Tentar Novamente
                  </Button>
                </Stack>

                {process.env.NODE_ENV === 'development' && this.state.error && (
                  <details className="w-full text-left">
                    <summary className="cursor-pointer text-sm text-white/50 mb-2">
                      Detalhes do erro (desenvolvimento)
                    </summary>
                    <pre className="text-xs bg-red-500/10 p-3 rounded border border-red-500/20 overflow-auto">
                      {this.state.error.toString()}
                      {this.state.errorInfo.componentStack}
                    </pre>
                  </details>
                )}
              </Stack>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
export { ErrorBoundary };